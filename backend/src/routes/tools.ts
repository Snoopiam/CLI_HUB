import { Router } from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const toolRoutes = Router();

// GET /api/checks/tools - Check which tools are installed
toolRoutes.get('/tools', async (req, res) => {
  const results: Record<string, { installed: boolean; version?: string }> = {};

  // Check for claude-code-templates
  try {
    const { stdout } = await execAsync('npx claude-code-templates@latest --version');
    results['claude-code-templates'] = { 
      installed: true, 
      version: stdout.trim() 
    };
  } catch {
    results['claude-code-templates'] = { installed: false };
  }

  res.json(results);
});

