/**
 * =============================================================================
 * API SERVICE - Backend Communication Layer
 * =============================================================================
 * 
 * This module handles all HTTP communication with the backend API server.
 * 
 * The frontend uses Vite's proxy (configured in vite.config.ts) to forward
 * /api requests to the backend at http://localhost:3001. This avoids CORS
 * issues during development.
 * 
 * API Endpoints:
 * - GET  /api/tasks          - List all available workflows
 * - GET  /api/tasks/:id      - Get full config for a specific workflow
 * - POST /api/tasks/:id/plan - Generate a personalized plan using Claude AI
 * - GET  /api/checks/tools   - Check which tools are installed
 * - GET  /api/agents         - Get recommended agents (with ?task= filter)
 * 
 * Error Handling:
 * All functions throw Error objects with descriptive messages on failure.
 * Components should wrap calls in try/catch and display errors to users.
 * =============================================================================
 */

import type { Task, PlanResponse } from '../types';

/**
 * Base URL for all API calls.
 * In development, Vite proxies /api to the backend server.
 * In production, this would be the actual backend URL.
 */
const API_BASE = '/api';

/**
 * Fetches the list of all available workflows.
 * 
 * Used by the Dashboard to display workflow cards. Returns a summary
 * (not the full config) to keep the response lightweight.
 * 
 * @returns Array of task summaries with id, name, description, tags, estimatedTime
 * @throws Error if the request fails
 * 
 * @example
 * const tasks = await fetchTasks();
 * // [{ id: 'logo', name: 'Logo Creation', ... }, ...]
 */
export async function fetchTasks(): Promise<Array<Pick<Task, 'id' | 'name' | 'description' | 'tags' | 'estimatedTime'>>> {
  const response = await fetch(`${API_BASE}/tasks`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
}

/**
 * Fetches the complete configuration for a specific workflow.
 * 
 * Used by task pages (LogoTask, etc.) to get all the details needed
 * to render the workflow UI: tools, agents, questions, prompt templates.
 * 
 * @param id - The task identifier (e.g., 'logo', 'brand-guidelines')
 * @returns Full Task object with all configuration
 * @throws Error if task not found or request fails
 * 
 * @example
 * const logoTask = await fetchTask('logo');
 * // { id: 'logo', requiredTools: [...], questions: [...], ... }
 */
export async function fetchTask(id: string): Promise<Task> {
  const response = await fetch(`${API_BASE}/tasks/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch task ${id}`);
  }
  return response.json();
}

/**
 * Generates a personalized plan using Claude AI.
 * 
 * This is the core AI functionality! It sends the user's questionnaire
 * answers to the backend, which combines them with the task's prompt
 * templates and calls Claude to generate a custom plan.
 * 
 * The response includes:
 * - Step-by-step instructions
 * - Recommended agents
 * - Ready-to-use prompts for AI image generators
 * - Pro tips
 * 
 * @param taskId - The task identifier (e.g., 'logo')
 * @param answers - Object mapping question IDs to user's answers
 * @returns PlanResponse with steps, agents, prompts, and notes
 * @throws Error if generation fails (often due to missing API key)
 * 
 * @example
 * const plan = await generatePlan('logo', {
 *   brandName: 'SnoopLabs',
 *   industry: 'Technology',
 *   logoStyle: 'Minimalist/Modern',
 *   // ... other answers
 * });
 */
export async function generatePlan(taskId: string, answers: Record<string, any>): Promise<PlanResponse> {
  const response = await fetch(`${API_BASE}/tasks/${taskId}/plan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(answers),
  });
  
  if (!response.ok) {
    // Try to get detailed error message from backend
    const error = await response.json();
    throw new Error(error.details || 'Failed to generate plan');
  }
  
  return response.json();
}

/**
 * Checks which required tools are installed on the system.
 *
 * The backend attempts to run check commands (like `npx claude-code-templates --version`)
 * and reports which tools are available.
 *
 * Note: This is currently basic and may not detect all tools accurately.
 * It's meant as a helpful hint, not a definitive check.
 *
 * @returns Object mapping tool names to { installed: boolean, version?: string }
 * @throws Error if the check request fails
 *
 * @example
 * const tools = await checkTools();
 * // { 'claude-code-templates': { installed: true, version: '1.0.0' } }
 */
export async function checkTools(): Promise<Record<string, { installed: boolean; version?: string }>> {
  const response = await fetch(`${API_BASE}/checks/tools`);
  if (!response.ok) {
    throw new Error('Failed to check tools');
  }
  return response.json();
}

// =============================================================================
// NEW: TASK ANALYSIS AND RECOMMENDATION API
// =============================================================================

import type {
  RecommendationResult,
  QuickAnalysisResult,
  TaskCategory,
  Feature,
  FeatureSearchResult,
  FeatureType
} from '../types';

/**
 * Analyzes a task description and returns full recommendations.
 *
 * This is the core API for the Claude Code optimization guide.
 * It takes a natural language task description and returns:
 * - Detected keywords and categories
 * - Recommended skills, agents, MCPs, hooks, commands, settings
 * - Priority recommendations and quick wins
 *
 * @param task - Natural language description of what the user wants to do
 * @returns Full recommendation result with scored features
 * @throws Error if analysis fails
 *
 * @example
 * const result = await analyzeTask('Build a React dashboard with authentication');
 */
export async function analyzeTask(task: string): Promise<RecommendationResult> {
  const response = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ task }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.details || 'Failed to analyze task');
  }

  return response.json();
}

/**
 * Quick analysis for real-time suggestions.
 *
 * Useful for providing instant feedback as the user types.
 * Returns just keywords, top categories, and complexity.
 *
 * @param task - Task description (can be partial)
 * @returns Quick analysis with keywords and categories
 */
export async function quickAnalyze(task: string): Promise<QuickAnalysisResult> {
  const response = await fetch(`${API_BASE}/analyze/quick`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ task }),
  });

  if (!response.ok) {
    throw new Error('Failed to analyze task');
  }

  return response.json();
}

/**
 * Get all available task categories.
 *
 * @returns Array of task categories with their keywords
 */
export async function getCategories(): Promise<TaskCategory[]> {
  const response = await fetch(`${API_BASE}/analyze/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}

/**
 * Get all available Claude Code features.
 *
 * @param summary - If true, returns only counts per type
 * @returns Object with features grouped by type
 */
export async function getAllFeatures(summary?: boolean): Promise<Record<string, Feature[]>> {
  const url = summary ? `${API_BASE}/features?summary=true` : `${API_BASE}/features`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch features');
  }
  return response.json();
}

/**
 * Get features of a specific type.
 *
 * @param type - Feature type (skill, agent, mcp, hook, command, setting, claudemd)
 * @returns Array of features of that type
 */
export async function getFeaturesByType(type: FeatureType): Promise<Feature[]> {
  const response = await fetch(`${API_BASE}/features/${type}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${type} features`);
  }
  return response.json();
}

/**
 * Get a specific feature by type and ID.
 *
 * @param type - Feature type
 * @param id - Feature ID
 * @returns Feature details
 */
export async function getFeature(type: FeatureType, id: string): Promise<Feature> {
  const response = await fetch(`${API_BASE}/features/${type}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch feature ${id}`);
  }
  return response.json();
}

/**
 * Search features by keyword.
 *
 * @param query - Search query
 * @param type - Optional filter by feature type
 * @returns Search results with match scores
 */
export async function searchFeatures(
  query: string,
  type?: FeatureType
): Promise<{ results: FeatureSearchResult[]; query: string; count: number }> {
  const url = type
    ? `${API_BASE}/features/search?q=${encodeURIComponent(query)}&type=${type}`
    : `${API_BASE}/features/search?q=${encodeURIComponent(query)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to search features');
  }
  return response.json();
}

/**
 * Get features by category.
 *
 * @param category - Category ID (e.g., 'development', 'security')
 * @returns Features grouped by type for that category
 */
export async function getFeaturesByCategory(
  category: string
): Promise<{ category: string; features: Record<string, Feature[]>; count: number }> {
  const response = await fetch(`${API_BASE}/features/category/${category}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch features for category ${category}`);
  }
  return response.json();
}

