/**
 * =============================================================================
 * RECOMMENDATION SERVICE
 * =============================================================================
 *
 * Generates Claude Code feature recommendations based on task analysis.
 *
 * This service:
 * 1. Takes analyzed task data
 * 2. Matches to relevant features (skills, agents, MCPs, etc.)
 * 3. Scores and ranks recommendations
 * 4. Returns prioritized list with install commands
 *
 * IMPORTANT: Only returns features with genuine relevance to the task.
 * =============================================================================
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import type { AnalysisResult, TaskCategory } from './analyzerService.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load features database
const featuresData = JSON.parse(
  readFileSync(join(__dirname, '../data/features.json'), 'utf-8')
);

// Feature type definitions
export type FeatureType = 'skill' | 'agent' | 'mcp' | 'hook' | 'command' | 'setting' | 'claudemd';

export interface Feature {
  id: string;
  name: string;
  description: string;
  whenToUse: string;
  installCommand: string;
  source: string;
  category: string;
  keywords: string[];
  configExample?: object;
  fileContent?: string;
  templateExample?: string;
}

export interface ScoredFeature {
  feature: Feature;
  type: FeatureType;
  score: number;
  matchReasons: string[];
  isPriority: boolean;
}

export interface RecommendationResult {
  /** Task analysis summary */
  analysis: {
    task: string;
    complexity: string;
    topCategories: string[];
    detectedKeywords: string[];
  };
  /** Grouped recommendations by type */
  recommendations: {
    skills: ScoredFeature[];
    agents: ScoredFeature[];
    mcps: ScoredFeature[];
    hooks: ScoredFeature[];
    commands: ScoredFeature[];
    settings: ScoredFeature[];
    claudemd: ScoredFeature[];
  };
  /** Overall recommendation summary */
  summary: {
    totalRecommendations: number;
    topPriority: ScoredFeature[];
    quickWins: ScoredFeature[];
  };
}

// Minimum score thresholds
const MIN_FEATURE_SCORE = 15;  // Features below this won't be shown
const MIN_PRIORITY_SCORE = 40; // Features above this are marked as priority

/**
 * Check if a word exists as a whole word in text (not as substring)
 */
function hasWholeWord(text: string, word: string): boolean {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`\\b${escaped}\\b`, 'i');
  return regex.test(text);
}

/**
 * Score a single feature against the analysis
 * Uses strict whole-word matching to prevent false positives
 */
function scoreFeature(
  feature: Feature,
  type: FeatureType,
  analysis: AnalysisResult
): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  const featureKeywords = feature.keywords.map(k => k.toLowerCase());

  // 1. Direct keyword matching (highest weight)
  // User's extracted keywords that match feature keywords
  analysis.keywords.forEach(keyword => {
    if (featureKeywords.includes(keyword.toLowerCase())) {
      score += 25;
      reasons.push(`Matches keyword: ${keyword}`);
    }
  });

  // 2. Category default features
  // Only boost if feature is in category's default list
  analysis.categories.forEach((catMatch, index) => {
    const categoryDefaults = catMatch.category.defaultFeatures;
    const typeKey = type === 'claudemd' ? 'claudemd' : `${type}s`;

    if (categoryDefaults[typeKey as keyof typeof categoryDefaults]?.includes(feature.id)) {
      // Higher score for primary category, less for secondary
      const categoryBonus = index === 0 ? 20 : 10;
      score += categoryBonus;
      reasons.push(`Recommended for ${catMatch.category.name}`);
    }
  });

  // 3. Feature type boost from detected patterns
  if (analysis.boostFeatureTypes.includes(`${type}s`) ||
      analysis.boostFeatureTypes.includes(type)) {
    score += 10;
    reasons.push('Matches task pattern');
  }

  // 4. Priority agent boost
  if (analysis.priorityAgents.includes(feature.id)) {
    score += 30;
    reasons.push('Priority for this task type');
  }

  // 5. Whole-word keyword match in task text
  // Feature keywords that appear as whole words in the task
  featureKeywords.forEach(keyword => {
    // Only match if keyword is 3+ characters to avoid noise
    if (keyword.length >= 3 && hasWholeWord(analysis.normalizedTask, keyword)) {
      // Avoid double-counting already matched keywords
      if (!analysis.keywords.includes(keyword)) {
        score += 10;
        reasons.push(`Task mentions: ${keyword}`);
      }
    }
  });

  return { score, reasons };
}

/**
 * Get features of a specific type
 */
function getFeaturesByType(type: FeatureType): Feature[] {
  const typeMapping: Record<FeatureType, string> = {
    skill: 'skills',
    agent: 'agents',
    mcp: 'mcps',
    hook: 'hooks',
    command: 'commands',
    setting: 'settings',
    claudemd: 'claudemd'
  };

  return featuresData[typeMapping[type]] || [];
}

/**
 * Generate recommendations for a specific feature type
 */
function recommendFeatureType(
  type: FeatureType,
  analysis: AnalysisResult,
  maxResults: number = 5
): ScoredFeature[] {
  const features = getFeaturesByType(type);
  const scored: ScoredFeature[] = [];

  features.forEach(feature => {
    const { score, reasons } = scoreFeature(feature, type, analysis);

    // Only include features that meet minimum relevance threshold
    if (score >= MIN_FEATURE_SCORE) {
      scored.push({
        feature,
        type,
        score,
        matchReasons: reasons,
        isPriority: score >= MIN_PRIORITY_SCORE
      });
    }
  });

  // Sort by score and limit
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

/**
 * Main recommendation function
 */
export function generateRecommendations(analysis: AnalysisResult): RecommendationResult {
  // Generate recommendations for each type
  const skills = recommendFeatureType('skill', analysis);
  const agents = recommendFeatureType('agent', analysis);
  const mcps = recommendFeatureType('mcp', analysis);
  const hooks = recommendFeatureType('hook', analysis);
  const commands = recommendFeatureType('command', analysis);
  const settings = recommendFeatureType('setting', analysis);
  const claudemd = recommendFeatureType('claudemd', analysis);

  // Collect all recommendations
  const allRecommendations = [
    ...skills,
    ...agents,
    ...mcps,
    ...hooks,
    ...commands,
    ...settings,
    ...claudemd
  ];

  // Get top priority items
  const topPriority = allRecommendations
    .filter(r => r.isPriority)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  // Quick wins: high score, easy to install (built-in agents, simple commands)
  const quickWins = allRecommendations
    .filter(r =>
      r.score >= 30 &&
      (r.feature.source === 'built-in' ||
       r.type === 'command' ||
       r.feature.installCommand.includes('Built-in'))
    )
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return {
    analysis: {
      task: analysis.originalTask,
      complexity: analysis.complexity,
      topCategories: analysis.categories.slice(0, 3).map(c => c.category.name),
      detectedKeywords: analysis.keywords.slice(0, 10)
    },
    recommendations: {
      skills,
      agents,
      mcps,
      hooks,
      commands,
      settings,
      claudemd
    },
    summary: {
      totalRecommendations: allRecommendations.length,
      topPriority,
      quickWins
    }
  };
}

/**
 * Get all available features
 */
export function getAllFeatures(): Record<string, Feature[]> {
  return {
    skills: featuresData.skills,
    agents: featuresData.agents,
    mcps: featuresData.mcps,
    hooks: featuresData.hooks,
    commands: featuresData.commands,
    settings: featuresData.settings,
    claudemd: featuresData.claudemd
  };
}

/**
 * Get a specific feature by type and id
 */
export function getFeature(type: FeatureType, id: string): Feature | null {
  const features = getFeaturesByType(type);
  return features.find(f => f.id === id) || null;
}

/**
 * Get features by category
 */
export function getFeaturesByCategory(category: string): Record<string, Feature[]> {
  const result: Record<string, Feature[]> = {
    skills: [],
    agents: [],
    mcps: [],
    hooks: [],
    commands: [],
    settings: [],
    claudemd: []
  };

  Object.entries(featuresData).forEach(([type, features]) => {
    if (Array.isArray(features)) {
      result[type] = (features as Feature[]).filter(f => f.category === category);
    }
  });

  return result;
}
