/**
 * =============================================================================
 * PERSONAL AI HUB - CLAUDE CODE OPTIMIZATION GUIDE
 * =============================================================================
 *
 * This is the main entry point for the Express backend server.
 *
 * The server provides:
 * - REST API endpoints for the frontend
 * - Task analysis and Claude Code feature recommendations
 * - Integration with Claude AI for plan generation
 * - Config file loading from the frontend directory
 * - CORS support for local development
 *
 * Environment Variables (from .env):
 * - PORT: Server port (default: 3001)
 * - FRONTEND_URL: Allowed CORS origin (default: http://localhost:5174)
 * - ANTHROPIC_API_KEY: Required for Claude AI integration
 *
 * API Routes:
 * - /api/analyze   - Task analysis and recommendations (NEW)
 * - /api/features  - Browse Claude Code features (NEW)
 * - /api/tasks     - Workflow management (legacy, preserved)
 * - /api/agents    - AITMPL agent discovery (legacy, preserved)
 * - /api/checks    - Tool installation checks
 * - /health        - Server health check
 *
 * To start: npm run dev (development) or npm start (production)
 * =============================================================================
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { taskRoutes } from './routes/tasks.js';
import { agentRoutes } from './routes/agents.js';
import { toolRoutes } from './routes/tools.js';
import { analyzeRoutes } from './routes/analyze.js';
import { featuresRoutes } from './routes/features.js';

// Load environment variables from .env file
// Must be called before accessing process.env
dotenv.config();

// Create Express application
const app = express();
const PORT = process.env.PORT || 3001;

// =============================================================================
// MIDDLEWARE CONFIGURATION
// =============================================================================

// CORS: Allow requests from the frontend during development
// In production, you'd want to restrict this to your actual domain
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174'
}));

// JSON body parser: Enables req.body for POST requests
app.use(express.json());

// =============================================================================
// ROUTE MOUNTING
// =============================================================================

// NEW: Task analysis and recommendation routes (core feature)
app.use('/api/analyze', analyzeRoutes);

// NEW: Feature browser routes
app.use('/api/features', featuresRoutes);

// Task routes: Workflow listing, details, and plan generation (preserved)
app.use('/api/tasks', taskRoutes);

// Agent routes: AITMPL/Claude agent discovery and recommendations (preserved)
app.use('/api/agents', agentRoutes);

// Tool check routes: Verify which tools are installed
app.use('/api/checks', toolRoutes);

// =============================================================================
// HEALTH CHECK ENDPOINT
// =============================================================================

/**
 * GET /health
 * Simple health check endpoint for monitoring and debugging.
 * Returns 200 OK with current timestamp.
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// =============================================================================
// SERVER STARTUP
// =============================================================================

app.listen(PORT, () => {
  console.log(`🚀 MjolnirAI Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔍 Task Analysis: POST http://localhost:${PORT}/api/analyze`);
  console.log(`📚 Feature Browser: GET http://localhost:${PORT}/api/features`);
});

