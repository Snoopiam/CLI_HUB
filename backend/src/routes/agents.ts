import { Router } from 'express';
import { 
  getCuratedAgents, 
  getGeneralAgents, 
  isClaudeTemplatesInstalled,
  getInstallationInstructions 
} from '../services/claudeTemplatesService.js';

export const agentRoutes = Router();

// GET /api/agents - Get recommended agents for a task
agentRoutes.get('/', async (req, res) => {
  const { task } = req.query;
  
  try {
    const cliInstalled = await isClaudeTemplatesInstalled();
    const installInstructions = getInstallationInstructions();
    
    let agents;
    if (task) {
      agents = getCuratedAgents(task as string);
    } else {
      agents = getGeneralAgents();
    }

    res.json({
      agents,
      cliInstalled,
      installInstructions
    });
  } catch (error) {
    console.error('Error fetching agents:', error);
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
});

// GET /api/agents/categories - Get all agent categories
agentRoutes.get('/categories', (req, res) => {
  const categories = [
    { id: 'creative', name: 'Creative', icon: '🎨' },
    { id: 'development', name: 'Development', icon: '💻' },
    { id: 'business', name: 'Business', icon: '📊' },
    { id: 'marketing', name: 'Marketing', icon: '📣' },
    { id: 'content', name: 'Content', icon: '✍️' },
    { id: 'design', name: 'Design', icon: '🎭' },
    { id: 'ai-tools', name: 'AI Tools', icon: '🤖' },
    { id: 'research', name: 'Research', icon: '🔍' }
  ];
  
  res.json(categories);
});

