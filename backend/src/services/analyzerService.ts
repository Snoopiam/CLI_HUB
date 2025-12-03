/**
 * =============================================================================
 * TASK ANALYZER SERVICE
 * =============================================================================
 *
 * Analyzes user task descriptions to:
 * 1. Extract relevant keywords
 * 2. Identify task categories
 * 3. Determine complexity level
 * 4. Detect action patterns (create, fix, review, etc.)
 *
 * This service powers the recommendation engine by understanding
 * what the user is trying to accomplish.
 * =============================================================================
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load categories data
const categoriesData = JSON.parse(
  readFileSync(join(__dirname, '../data/categories.json'), 'utf-8')
);

export interface TaskCategory {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  defaultFeatures: {
    agents?: string[];
    skills?: string[];
    mcps?: string[];
    hooks?: string[];
    commands?: string[];
    settings?: string[];
    claudemd?: string[];
  };
}

export interface TaskPattern {
  pattern: string;
  boost: string[];
  priorityAgents?: string[];
  description: string;
}

export interface AnalysisResult {
  /** Original task description */
  originalTask: string;
  /** Normalized/cleaned task */
  normalizedTask: string;
  /** Extracted keywords found in the task */
  keywords: string[];
  /** Matched categories with confidence scores */
  categories: Array<{
    category: TaskCategory;
    score: number;
    matchedKeywords: string[];
  }>;
  /** Detected action patterns */
  patterns: TaskPattern[];
  /** Estimated complexity */
  complexity: 'simple' | 'moderate' | 'complex';
  /** Feature types that should be boosted */
  boostFeatureTypes: string[];
  /** Priority agents to recommend first */
  priorityAgents: string[];
}

// Minimum score for a category to be considered relevant
const MIN_CATEGORY_SCORE = 10;

/**
 * Normalizes task text for analysis
 */
function normalizeTask(task: string): string {
  return task
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')  // Remove special chars except hyphens
    .replace(/\s+/g, ' ')        // Normalize whitespace
    .trim();
}

/**
 * Check if a word exists as a whole word in text (not as substring)
 */
function hasWholeWord(text: string, word: string): boolean {
  // Create regex that matches whole word only
  const regex = new RegExp(`\\b${escapeRegex(word)}\\b`, 'i');
  return regex.test(text);
}

/**
 * Escape special regex characters
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Extracts keywords from task that match our known keywords
 */
function extractKeywords(normalizedTask: string): string[] {
  const allKeywords = new Set<string>();

  // Collect all keywords from categories
  categoriesData.categories.forEach((cat: TaskCategory) => {
    cat.keywords.forEach(kw => allKeywords.add(kw.toLowerCase()));
  });

  const matched: string[] = [];

  // Check for whole word matches only
  allKeywords.forEach(keyword => {
    if (hasWholeWord(normalizedTask, keyword)) {
      matched.push(keyword);
    }
  });

  return [...new Set(matched)];
}

/**
 * Matches task to categories based on keyword overlap
 * Uses whole word matching to prevent false positives
 */
function matchCategories(
  normalizedTask: string,
  keywords: string[]
): Array<{ category: TaskCategory; score: number; matchedKeywords: string[] }> {
  const results: Array<{ category: TaskCategory; score: number; matchedKeywords: string[] }> = [];

  categoriesData.categories.forEach((category: TaskCategory) => {
    const categoryKeywords = category.keywords.map(k => k.toLowerCase());
    const matchedKeywords: string[] = [];
    let score = 0;

    // Check keyword matches (extracted keywords that match category)
    keywords.forEach(keyword => {
      if (categoryKeywords.includes(keyword)) {
        matchedKeywords.push(keyword);
        score += 10;
      }
    });

    // Check for whole word matches in the full task text
    // This catches keywords not in our extracted list
    categoryKeywords.forEach(catKeyword => {
      if (!matchedKeywords.includes(catKeyword) && hasWholeWord(normalizedTask, catKeyword)) {
        matchedKeywords.push(catKeyword);
        score += 5;
      }
    });

    // Boost if category name appears in task
    if (hasWholeWord(normalizedTask, category.name.toLowerCase()) ||
        hasWholeWord(normalizedTask, category.id.toLowerCase())) {
      score += 15;
    }

    // Only include categories that meet minimum relevance threshold
    if (score >= MIN_CATEGORY_SCORE) {
      results.push({ category, score, matchedKeywords });
    }
  });

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Detects action patterns in the task
 */
function detectPatterns(normalizedTask: string): TaskPattern[] {
  const matched: TaskPattern[] = [];

  categoriesData.taskPatterns.forEach((pattern: TaskPattern) => {
    const regex = new RegExp(`\\b(${pattern.pattern})\\b`, 'i');
    if (regex.test(normalizedTask)) {
      matched.push(pattern);
    }
  });

  return matched;
}

/**
 * Determines task complexity based on indicators
 */
function determineComplexity(normalizedTask: string): 'simple' | 'moderate' | 'complex' {
  const indicators = categoriesData.complexityIndicators;

  let simpleScore = 0;
  let moderateScore = 0;
  let complexScore = 0;

  indicators.simple.forEach((word: string) => {
    if (hasWholeWord(normalizedTask, word)) simpleScore++;
  });

  indicators.moderate.forEach((word: string) => {
    if (hasWholeWord(normalizedTask, word)) moderateScore++;
  });

  indicators.complex.forEach((word: string) => {
    if (hasWholeWord(normalizedTask, word)) complexScore++;
  });

  // Weight by specificity (complex indicators are more specific)
  const totalSimple = simpleScore;
  const totalModerate = moderateScore * 1.5;
  const totalComplex = complexScore * 2;

  if (totalComplex >= totalModerate && totalComplex >= totalSimple) {
    return 'complex';
  } else if (totalModerate >= totalSimple) {
    return 'moderate';
  }
  return 'simple';
}

/**
 * Main analysis function - analyzes a task description
 */
export function analyzeTask(taskDescription: string): AnalysisResult {
  const normalizedTask = normalizeTask(taskDescription);
  const keywords = extractKeywords(normalizedTask);
  const categories = matchCategories(normalizedTask, keywords);
  const patterns = detectPatterns(normalizedTask);
  const complexity = determineComplexity(normalizedTask);

  // Collect feature type boosts from patterns
  const boostFeatureTypes = new Set<string>();
  patterns.forEach(p => p.boost.forEach(b => boostFeatureTypes.add(b)));

  // Collect priority agents from patterns
  const priorityAgents = new Set<string>();
  patterns.forEach(p => {
    if (p.priorityAgents) {
      p.priorityAgents.forEach(a => priorityAgents.add(a));
    }
  });

  return {
    originalTask: taskDescription,
    normalizedTask,
    keywords,
    categories,
    patterns,
    complexity,
    boostFeatureTypes: [...boostFeatureTypes],
    priorityAgents: [...priorityAgents]
  };
}

/**
 * Quick analysis - returns just the top categories and keywords
 */
export function quickAnalyze(taskDescription: string): {
  keywords: string[];
  topCategories: string[];
  complexity: string;
} {
  const result = analyzeTask(taskDescription);
  return {
    keywords: result.keywords.slice(0, 10),
    topCategories: result.categories.slice(0, 3).map(c => c.category.id),
    complexity: result.complexity
  };
}

/**
 * Get all available categories
 */
export function getAllCategories(): TaskCategory[] {
  return categoriesData.categories;
}
