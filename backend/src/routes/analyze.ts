/**
 * =============================================================================
 * ANALYZE ROUTES - Task Analysis API
 * =============================================================================
 *
 * Endpoints for analyzing user tasks and generating recommendations.
 *
 * POST /api/analyze          - Full task analysis with recommendations
 * POST /api/analyze/quick    - Quick analysis (keywords + categories only)
 * GET  /api/analyze/categories - List all available categories
 * =============================================================================
 */

import { Router, Request, Response } from 'express';
import { analyzeTask, quickAnalyze, getAllCategories } from '../services/analyzerService.js';
import { generateRecommendations } from '../services/recommendationService.js';

export const analyzeRoutes = Router();

/**
 * POST /api/analyze
 *
 * Full task analysis with recommendations.
 *
 * Request Body:
 * {
 *   "task": "I need to build a React dashboard with user authentication"
 * }
 *
 * Response:
 * {
 *   "analysis": { ... },
 *   "recommendations": { ... },
 *   "summary": { ... }
 * }
 */
analyzeRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const { task } = req.body;

    if (!task || typeof task !== 'string') {
      return res.status(400).json({
        error: 'Missing or invalid task',
        details: 'Please provide a task description as a string'
      });
    }

    if (task.trim().length < 3) {
      return res.status(400).json({
        error: 'Task too short',
        details: 'Please provide a more detailed task description'
      });
    }

    // Analyze the task
    const analysis = analyzeTask(task);

    // Generate recommendations based on analysis
    const recommendations = generateRecommendations(analysis);

    res.json(recommendations);
  } catch (error) {
    console.error('Error analyzing task:', error);
    res.status(500).json({
      error: 'Failed to analyze task',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * POST /api/analyze/quick
 *
 * Quick analysis - just keywords, categories, and complexity.
 * Useful for real-time suggestions as user types.
 *
 * Request Body:
 * {
 *   "task": "React authentication"
 * }
 *
 * Response:
 * {
 *   "keywords": ["react", "authentication"],
 *   "topCategories": ["web-frontend", "security"],
 *   "complexity": "moderate"
 * }
 */
analyzeRoutes.post('/quick', async (req: Request, res: Response) => {
  try {
    const { task } = req.body;

    if (!task || typeof task !== 'string') {
      return res.status(400).json({
        error: 'Missing or invalid task',
        details: 'Please provide a task description as a string'
      });
    }

    const result = quickAnalyze(task);
    res.json(result);
  } catch (error) {
    console.error('Error in quick analysis:', error);
    res.status(500).json({
      error: 'Failed to analyze task',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/analyze/categories
 *
 * List all available task categories.
 * Useful for category-based browsing.
 *
 * Response:
 * [
 *   {
 *     "id": "web-frontend",
 *     "name": "Web Frontend Development",
 *     "description": "...",
 *     "keywords": [...]
 *   },
 *   ...
 * ]
 */
analyzeRoutes.get('/categories', async (req: Request, res: Response) => {
  try {
    const categories = getAllCategories();

    // Return simplified category list (without defaultFeatures for cleaner response)
    const simplified = categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      keywords: cat.keywords.slice(0, 10)  // Limit keywords in response
    }));

    res.json(simplified);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      error: 'Failed to fetch categories',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});
