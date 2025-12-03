/**
 * =============================================================================
 * PERSONAL AI PROJECT HUB - TYPE DEFINITIONS
 * =============================================================================
 * 
 * This file contains all shared TypeScript interfaces used throughout the
 * frontend application. These types mirror the structure of:
 * - Config files in /config/tasks/*.json
 * - API responses from the backend
 * 
 * When adding new features, define types here first to ensure type safety
 * across components, pages, and API calls.
 * =============================================================================
 */

// =============================================================================
// WORKFLOW CONFIGURATION TYPES
// These types define the structure of workflow configs (e.g., logo.json)
// =============================================================================

/**
 * Tool - Represents a software tool required or recommended for a workflow.
 * 
 * Tools are displayed in the ToolChecklist component with install commands
 * and documentation links.
 * 
 * @example
 * {
 *   type: 'cli',
 *   name: 'Claude Code Templates',
 *   description: 'CLI for managing Claude agents',
 *   installCommands: ['npm install -g claude-code-templates'],
 *   docsUrl: 'https://aitmpl.com'
 * }
 */
export interface Tool {
  /** Tool category: 'cli' (command-line), 'web' (browser-based), or 'app' (desktop) */
  type: 'cli' | 'web' | 'app';
  /** Display name of the tool */
  name: string;
  /** Brief description of what the tool does */
  description: string;
  /** Optional array of installation commands (shown with copy buttons) */
  installCommands?: string[];
  /** Optional URL to tool documentation */
  docsUrl?: string;
  /** Optional command to check if tool is installed (used by backend) */
  checkCommand?: string;
}

/**
 * Agent - Represents an AI agent from the AITMPL/Claude ecosystem.
 * 
 * Agents are recommended helpers that users can enable via the
 * claude-code-templates CLI to assist with specific tasks.
 */
export interface Agent {
  /** Source ecosystem (e.g., 'aitmpl', 'custom') */
  source: string;
  /** Unique identifier/slug for the agent */
  slug: string;
  /** Human-readable agent name */
  name: string;
  /** What the agent helps with */
  description: string;
  /** When/how to use this agent */
  recommendedUsage?: string;
  /** Link to agent documentation */
  docsUrl?: string;
}

/**
 * Question - Defines a form field in the workflow questionnaire.
 * 
 * The TaskForm component dynamically renders these as form inputs.
 * Supported types: text, textarea, select (dropdown), multiselect (checkboxes).
 */
export interface Question {
  /** Unique identifier, used as the key in answers object */
  id: string;
  /** Input type determining how the field is rendered */
  type: 'text' | 'textarea' | 'select' | 'multiselect';
  /** Label shown above the input */
  label: string;
  /** Placeholder text for text/textarea inputs */
  placeholder?: string;
  /** Options for select/multiselect types */
  options?: string[];
  /** Whether the field must be filled (shows * indicator) */
  required?: boolean;
}

/**
 * Task - Complete workflow definition loaded from config files.
 * 
 * This is the main configuration object that drives the entire workflow UI.
 * Each task (logo, brand-guidelines, etc.) has its own JSON file in /config/tasks/.
 */
export interface Task {
  /** Unique task identifier (matches filename without .json) */
  id: string;
  /** Display name shown in cards and headers */
  name: string;
  /** Brief description of what this workflow helps with */
  description: string;
  /** Category tags for filtering/display (e.g., 'creative', 'design') */
  tags?: string[];
  /** Estimated time to complete (e.g., '2-4 hours') */
  estimatedTime?: string;
  /** Tools needed for this workflow */
  requiredTools: Tool[];
  /** AI agents that can help with this workflow */
  recommendedAgents: Agent[];
  /** Form fields for gathering user input */
  questions: Question[];
  /** LLM prompt templates for plan generation */
  promptTemplates: {
    /** System prompt defining the AI's role */
    system: string;
    /** User prompt template with {userAnswers} placeholder */
    planningPrompt: string;
  };
}

// =============================================================================
// PLAN RESPONSE TYPES
// These types define the structure of AI-generated plans from the backend
// =============================================================================

/**
 * PlanStep - A single step in the generated action plan.
 * 
 * Steps are numbered and displayed in order in the PlanDisplay component.
 */
export interface PlanStep {
  /** Step number (1, 2, 3...) */
  number: number;
  /** Short title for the step */
  title: string;
  /** Detailed description of what to do */
  description: string;
  /** Optional shell commands to run */
  commands?: string[];
}

/**
 * PlanAgent - An agent recommendation in the generated plan.
 * 
 * These are specific agents the AI recommends based on the user's answers.
 */
export interface PlanAgent {
  /** Agent name */
  name: string;
  /** Why this agent is useful for this specific task */
  purpose: string;
  /** Instructions for enabling the agent */
  howToEnable: string;
}

/**
 * PlanPrompt - A ready-to-use prompt for external AI tools.
 * 
 * These are the "gold" of the workflow - prompts users can copy directly
 * into Midjourney, DALL·E, or other AI image generators.
 */
export interface PlanPrompt {
  /** Descriptive title (e.g., 'Minimalist Logo Prompt') */
  title: string;
  /** The actual prompt text to copy */
  content: string;
  /** Target platform (e.g., 'Midjourney', 'Any AI Image Generator') */
  platform: string;
}

/**
 * PlanResponse - Complete response from the /api/tasks/:id/plan endpoint.
 *
 * This is what the backend returns after calling Claude AI with the
 * user's questionnaire answers. The PlanDisplay component renders this.
 */
export interface PlanResponse {
  /** Ordered list of action steps */
  steps: PlanStep[];
  /** Recommended AI agents for this specific task */
  agents: PlanAgent[];
  /** Ready-to-use prompts for image generators */
  prompts: PlanPrompt[];
  /** Additional tips and notes */
  additionalNotes?: string[];
}

// =============================================================================
// NEW: CLAUDE CODE FEATURE TYPES
// These types support the new task analysis and recommendation system
// =============================================================================

/**
 * Feature types available in Claude Code
 */
export type FeatureType = 'skill' | 'agent' | 'mcp' | 'hook' | 'command' | 'setting' | 'claudemd';

/**
 * Feature - A Claude Code extensibility feature (skill, agent, MCP, etc.)
 */
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

/**
 * ScoredFeature - A feature with its relevance score and match reasons
 */
export interface ScoredFeature {
  feature: Feature;
  type: FeatureType;
  score: number;
  matchReasons: string[];
  isPriority: boolean;
}

/**
 * TaskCategory - A category of tasks for classification
 */
export interface TaskCategory {
  id: string;
  name: string;
  description: string;
  keywords: string[];
}

/**
 * QuickAnalysisResult - Lightweight analysis for real-time suggestions
 */
export interface QuickAnalysisResult {
  keywords: string[];
  topCategories: string[];
  complexity: 'simple' | 'moderate' | 'complex';
}

/**
 * RecommendationResult - Full recommendation response from analysis
 */
export interface RecommendationResult {
  analysis: {
    task: string;
    complexity: string;
    topCategories: string[];
    detectedKeywords: string[];
  };
  recommendations: {
    skills: ScoredFeature[];
    agents: ScoredFeature[];
    mcps: ScoredFeature[];
    hooks: ScoredFeature[];
    commands: ScoredFeature[];
    settings: ScoredFeature[];
    claudemd: ScoredFeature[];
  };
  summary: {
    totalRecommendations: number;
    topPriority: ScoredFeature[];
    quickWins: ScoredFeature[];
  };
}

/**
 * FeatureSearchResult - Result from feature search
 */
export interface FeatureSearchResult {
  type: string;
  feature: Feature;
  matchScore: number;
}

