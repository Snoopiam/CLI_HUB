/**
 * =============================================================================
 * TASK ROUTES - Workflow Management API
 * =============================================================================
 * 
 * These routes handle all task/workflow-related operations:
 * - Listing available workflows
 * - Getting full workflow configurations
 * - Generating AI-powered plans from user input
 * 
 * Endpoints:
 * - GET  /api/tasks          - List all workflows (summary only)
 * - GET  /api/tasks/:id      - Get full config for a specific workflow
 * - POST /api/tasks/:id/plan - Generate a personalized plan using Claude AI
 * 
 * Data Source:
 * Workflows are defined in JSON files at: frontend/config/tasks/*.json
 * The configLoader service reads these files and returns typed Task objects.
 * 
 * Error Handling:
 * - 404 for missing tasks
 * - 500 for server errors with details in response
 * =============================================================================
 */

import { Router } from 'express';
import { loadTasks, loadTask } from '../services/configLoader.js';
import { generatePlan } from '../services/llmService.js';

export const taskRoutes = Router();

/**
 * GET /api/tasks
 * 
 * Returns a summary list of all available workflows.
 * Used by the Dashboard to display workflow cards.
 * 
 * Response: Array of task summaries (id, name, description, tags, estimatedTime)
 * Note: Does NOT include full config (tools, questions, etc.) to keep response light.
 */
taskRoutes.get('/', (req, res) => {
  try {
    // Load all task configs from disk
    const tasks = loadTasks();
    
    // Return only summary fields (not the full config)
    const summary = tasks.map(task => ({
      id: task.id,
      name: task.name,
      description: task.description,
      tags: task.tags || [],
      estimatedTime: task.estimatedTime
    }));
    
    res.json(summary);
  } catch (error) {
    console.error('Error loading tasks:', error);
    res.status(500).json({ error: 'Failed to load tasks' });
  }
});

/**
 * GET /api/tasks/:id
 * 
 * Returns the full configuration for a specific workflow.
 * Used by task pages to render tools, agents, and questionnaire.
 * 
 * Params: id - Task identifier (e.g., 'logo', 'brand-guidelines')
 * Response: Full Task object including tools, agents, questions, promptTemplates
 * Errors: 404 if task not found
 */
taskRoutes.get('/:id', (req, res) => {
  try {
    const task = loadTask(req.params.id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error(`Error loading task ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to load task' });
  }
});

/**
 * POST /api/tasks/:id/plan
 * 
 * Generates a personalized plan using Claude AI.
 * This is the core AI functionality of the application!
 * 
 * Flow:
 * 1. Load task config (for prompt templates)
 * 2. Combine user answers with prompt templates
 * 3. Call Claude API with the combined prompt
 * 4. Parse response into structured plan
 * 5. Return plan to frontend
 * 
 * Params: id - Task identifier
 * Body: Object mapping question IDs to user's answers
 * Response: PlanResponse with steps, agents, prompts, additionalNotes
 * 
 * Errors:
 * - 404 if task not found
 * - 500 if Claude API fails (often due to missing ANTHROPIC_API_KEY)
 */
taskRoutes.post('/:id/plan', async (req, res) => {
  try {
    // Load task config to get prompt templates
    const task = loadTask(req.params.id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Get user's questionnaire answers from request body
    const answers = req.body;
    
    // Generate plan using Claude AI
    const plan = await generatePlan(task, answers);
    
    res.json(plan);
  } catch (error) {
    console.error(`Error generating plan for task ${req.params.id}:`, error);
    
    // Include error details to help with debugging
    res.status(500).json({ 
      error: 'Failed to generate plan',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

