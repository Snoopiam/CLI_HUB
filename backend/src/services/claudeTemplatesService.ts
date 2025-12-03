import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface ClaudeAgent {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  installed: boolean;
}

/**
 * Check if claude-code-templates CLI is available
 */
export async function isClaudeTemplatesInstalled(): Promise<boolean> {
  try {
    await execAsync('npx claude-code-templates@latest --version', { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Get a curated list of agents for a specific task
 * This is a manual curation based on AITMPL agent categories
 * In the future, this could parse actual CLI output
 */
export function getCuratedAgents(taskId: string): ClaudeAgent[] {
  const agentDatabase: Record<string, ClaudeAgent[]> = {
    logo: [
      {
        id: 'design-strategist',
        name: 'Design Strategist',
        description: 'Expert in design thinking, visual identity, and brand strategy',
        category: 'Creative',
        tags: ['design', 'branding', 'strategy'],
        installed: false
      },
      {
        id: 'prompt-engineer',
        name: 'Prompt Engineer',
        description: 'Specializes in crafting optimized prompts for AI image generation',
        category: 'AI Tools',
        tags: ['ai', 'prompts', 'image-generation'],
        installed: false
      },
      {
        id: 'brand-consultant',
        name: 'Brand Consultant',
        description: 'Provides expert feedback on brand consistency and visual identity',
        category: 'Marketing',
        tags: ['branding', 'consulting', 'identity'],
        installed: false
      },
      {
        id: 'ui-ux-designer',
        name: 'UI/UX Designer',
        description: 'Ensures designs are user-friendly and visually appealing',
        category: 'Design',
        tags: ['ui', 'ux', 'design'],
        installed: false
      },
      {
        id: 'color-theory-expert',
        name: 'Color Theory Expert',
        description: 'Advises on color palettes, psychology, and accessibility',
        category: 'Design',
        tags: ['color', 'design', 'accessibility'],
        installed: false
      }
    ],
    'brand-guidelines': [
      {
        id: 'brand-consultant',
        name: 'Brand Consultant',
        description: 'Comprehensive brand strategy and guidelines expert',
        category: 'Marketing',
        tags: ['branding', 'strategy', 'guidelines'],
        installed: false
      },
      {
        id: 'design-strategist',
        name: 'Design Strategist',
        description: 'Visual identity systems and design language',
        category: 'Creative',
        tags: ['design', 'systems', 'visual-identity'],
        installed: false
      },
      {
        id: 'copywriter',
        name: 'Copywriter',
        description: 'Tone of voice and brand messaging',
        category: 'Content',
        tags: ['writing', 'messaging', 'voice'],
        installed: false
      }
    ],
    'pitch-deck': [
      {
        id: 'pitch-coach',
        name: 'Pitch Coach',
        description: 'Expert in crafting compelling investor pitches',
        category: 'Business',
        tags: ['pitching', 'presenting', 'fundraising'],
        installed: false
      },
      {
        id: 'business-analyst',
        name: 'Business Analyst',
        description: 'Helps structure business models and market analysis',
        category: 'Business',
        tags: ['analysis', 'business', 'strategy'],
        installed: false
      },
      {
        id: 'presentation-designer',
        name: 'Presentation Designer',
        description: 'Creates visually stunning and clear slides',
        category: 'Design',
        tags: ['presentation', 'slides', 'visual-design'],
        installed: false
      }
    ]
  };

  return agentDatabase[taskId] || [];
}

/**
 * Get general agents that are useful across all tasks
 */
export function getGeneralAgents(): ClaudeAgent[] {
  return [
    {
      id: 'code-architect',
      name: 'Code Architect',
      description: 'Expert in software architecture and best practices',
      category: 'Development',
      tags: ['code', 'architecture', 'development'],
      installed: false
    },
    {
      id: 'project-manager',
      name: 'Project Manager',
      description: 'Helps plan, organize, and track project progress',
      category: 'Management',
      tags: ['project-management', 'planning', 'organization'],
      installed: false
    },
    {
      id: 'research-assistant',
      name: 'Research Assistant',
      description: 'Conducts thorough research and analysis',
      category: 'Research',
      tags: ['research', 'analysis', 'information'],
      installed: false
    }
  ];
}

/**
 * Attempt to list installed agents (if CLI is available)
 * This is a placeholder for future implementation
 */
export async function listInstalledAgents(): Promise<string[]> {
  try {
    // In the future, this could actually parse CLI output
    // For now, we return an empty array
    // Example command: npx claude-code-templates@latest list --agents --json
    return [];
  } catch {
    return [];
  }
}

/**
 * Get installation instructions for claude-code-templates
 */
export function getInstallationInstructions(): {
  global: string;
  oneTime: string;
  docsUrl: string;
} {
  return {
    global: 'npm install -g claude-code-templates',
    oneTime: 'npx claude-code-templates@latest',
    docsUrl: 'https://www.aitmpl.com/agents'
  };
}

