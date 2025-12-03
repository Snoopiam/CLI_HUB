/**
 * =============================================================================
 * FEATURES ROUTES - Feature Browser API
 * =============================================================================
 *
 * Endpoints for browsing and searching Claude Code features.
 *
 * GET /api/features              - List all features
 * GET /api/features/:type        - List features by type
 * GET /api/features/:type/:id    - Get specific feature details
 * GET /api/features/search       - Search features by keyword
 * GET /api/features/category/:cat - Get features by category
 * =============================================================================
 */

import { Router, Request, Response } from 'express';
import {
  getAllFeatures,
  getFeature,
  getFeaturesByCategory,
  type FeatureType
} from '../services/recommendationService.js';

export const featuresRoutes = Router();

const validTypes: FeatureType[] = ['skill', 'agent', 'mcp', 'hook', 'command', 'setting', 'claudemd'];

/**
 * GET /api/features
 *
 * List all available features grouped by type.
 *
 * Query params:
 * - summary: if "true", returns only counts per type
 *
 * Response:
 * {
 *   "skills": [...],
 *   "agents": [...],
 *   "mcps": [...],
 *   "hooks": [...],
 *   "commands": [...],
 *   "settings": [...],
 *   "claudemd": [...]
 * }
 */
featuresRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const { summary } = req.query;
    const features = getAllFeatures();

    if (summary === 'true') {
      // Return just counts
      const counts: Record<string, number> = {};
      Object.entries(features).forEach(([type, items]) => {
        counts[type] = items.length;
      });
      return res.json({ counts, total: Object.values(counts).reduce((a, b) => a + b, 0) });
    }

    res.json(features);
  } catch (error) {
    console.error('Error fetching features:', error);
    res.status(500).json({
      error: 'Failed to fetch features',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/features/search
 *
 * Search features by keyword.
 *
 * Query params:
 * - q: search query (required)
 * - type: filter by feature type (optional)
 *
 * Response:
 * {
 *   "results": [...],
 *   "query": "react",
 *   "count": 5
 * }
 */
featuresRoutes.get('/search', async (req: Request, res: Response) => {
  try {
    const { q, type } = req.query;

    if (!q || typeof q !== 'string') {
      return res.status(400).json({
        error: 'Missing search query',
        details: 'Please provide a search query with ?q=keyword'
      });
    }

    const query = q.toLowerCase().trim();
    const features = getAllFeatures();
    const results: Array<{ type: string; feature: any; matchScore: number }> = [];

    Object.entries(features).forEach(([featureType, items]) => {
      // Skip if type filter is specified and doesn't match
      if (type && type !== featureType.replace(/s$/, '')) {
        return;
      }

      items.forEach(feature => {
        let matchScore = 0;

        // Check name
        if (feature.name.toLowerCase().includes(query)) {
          matchScore += 30;
        }

        // Check description
        if (feature.description.toLowerCase().includes(query)) {
          matchScore += 20;
        }

        // Check keywords
        feature.keywords.forEach((kw: string) => {
          if (kw.toLowerCase().includes(query) || query.includes(kw.toLowerCase())) {
            matchScore += 15;
          }
        });

        // Check whenToUse
        if (feature.whenToUse.toLowerCase().includes(query)) {
          matchScore += 10;
        }

        if (matchScore > 0) {
          results.push({
            type: featureType.replace(/s$/, ''),  // Remove trailing 's'
            feature,
            matchScore
          });
        }
      });
    });

    // Sort by match score
    results.sort((a, b) => b.matchScore - a.matchScore);

    res.json({
      results: results.slice(0, 20),  // Limit results
      query: q,
      count: results.length
    });
  } catch (error) {
    console.error('Error searching features:', error);
    res.status(500).json({
      error: 'Failed to search features',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/features/category/:category
 *
 * Get features by category.
 *
 * Response:
 * {
 *   "category": "development",
 *   "features": {
 *     "skills": [...],
 *     "agents": [...],
 *     ...
 *   }
 * }
 */
featuresRoutes.get('/category/:category', async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const features = getFeaturesByCategory(category);

    // Check if any features found
    const totalFeatures = Object.values(features).reduce((sum, arr) => sum + arr.length, 0);

    if (totalFeatures === 0) {
      return res.status(404).json({
        error: 'Category not found',
        details: `No features found for category: ${category}`
      });
    }

    res.json({
      category,
      features,
      count: totalFeatures
    });
  } catch (error) {
    console.error('Error fetching features by category:', error);
    res.status(500).json({
      error: 'Failed to fetch features',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/features/:type
 *
 * List all features of a specific type.
 *
 * Response:
 * [
 *   { "id": "...", "name": "...", ... },
 *   ...
 * ]
 */
featuresRoutes.get('/:type', async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const pluralType = type.endsWith('s') ? type : `${type}s`;

    const features = getAllFeatures();
    const typeFeatures = features[pluralType];

    if (!typeFeatures) {
      return res.status(404).json({
        error: 'Invalid feature type',
        details: `Valid types: ${validTypes.join(', ')}`
      });
    }

    res.json(typeFeatures);
  } catch (error) {
    console.error('Error fetching features by type:', error);
    res.status(500).json({
      error: 'Failed to fetch features',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/features/:type/:id
 *
 * Get details for a specific feature.
 *
 * Response:
 * {
 *   "id": "...",
 *   "name": "...",
 *   "description": "...",
 *   "whenToUse": "...",
 *   "installCommand": "...",
 *   ...
 * }
 */
featuresRoutes.get('/:type/:id', async (req: Request, res: Response) => {
  try {
    const { type, id } = req.params;

    if (!validTypes.includes(type as FeatureType)) {
      return res.status(400).json({
        error: 'Invalid feature type',
        details: `Valid types: ${validTypes.join(', ')}`
      });
    }

    const feature = getFeature(type as FeatureType, id);

    if (!feature) {
      return res.status(404).json({
        error: 'Feature not found',
        details: `No ${type} found with id: ${id}`
      });
    }

    res.json(feature);
  } catch (error) {
    console.error('Error fetching feature:', error);
    res.status(500).json({
      error: 'Failed to fetch feature',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});
