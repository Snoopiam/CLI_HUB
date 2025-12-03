/**
 * =============================================================================
 * CONFIG LOADER SERVICE
 * =============================================================================
 * 
 * This service reads workflow configurations from JSON files in the frontend
 * config directory. It provides the data layer for the task routes.
 * 
 * File Locations:
 * - Tasks: frontend/config/tasks/*.json (one file per workflow)
 * - Projects: frontend/config/projects.json (SnoopLabs project catalog)
 * 
 * Important: The CONFIG_DIR path points to the frontend directory.
 * This means frontend and backend share the same config files.
 * Changes to configs require a backend restart to take effect.
 * 
 * Type Definitions:
 * The interfaces here mirror those in frontend/src/types/index.ts.
 * Keep them in sync when adding new fields!
 * =============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module compatibility: Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Path to the config directory in the frontend project.
 * 
 * Structure:
 * frontend/config/
 *   ├── projects.json      - SnoopLabs project catalog
 *   └── tasks/
 *       ├── logo.json      - Logo creation workflow
 *       └── *.json         - Other workflows
 */
const CONFIG_DIR = path.join(__dirname, '../../frontend/config');

// =============================================================================
// TYPE DEFINITIONS
// These mirror the frontend types in frontend/src/types/index.ts
// =============================================================================

/**
 * Tool - A software tool required or recommended for a workflow.
 */
export interface Tool {
  /** Tool category: 'cli' (command-line), 'web' (browser-based), or 'app' (desktop) */
  type: 'cli' | 'web' | 'app';
  name: string;
  description: string;
  installCommands?: string[];
  docsUrl?: string;
  /** Command to check if tool is installed (e.g., 'npx tool --version') */
  checkCommand?: string;
}

/**
 * Agent - An AI agent from the AITMPL/Claude ecosystem.
 */
export interface Agent {
  source: string;
  slug: string;
  name: string;
  description: string;
  recommendedUsage?: string;
  docsUrl?: string;
}

/**
 * Question - A form field in the workflow questionnaire.
 */
export interface Question {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect';
  label: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

/**
 * Task - Complete workflow configuration loaded from JSON.
 */
export interface Task {
  id: string;
  name: string;
  description: string;
  tags?: string[];
  estimatedTime?: string;
  requiredTools: Tool[];
  recommendedAgents: Agent[];
  questions: Question[];
  /** Templates for Claude AI prompts */
  promptTemplates: {
    /** System prompt defining Claude's role */
    system: string;
    /** User prompt with {userAnswers} placeholder */
    planningPrompt: string;
  };
}

// =============================================================================
// LOADER FUNCTIONS
// =============================================================================

/**
 * Loads all task configurations from the tasks directory.
 * 
 * Reads all .json files in frontend/config/tasks/ and parses them as Task objects.
 * Invalid files are logged but don't break the entire load.
 * 
 * @returns Array of Task objects (empty array if directory doesn't exist)
 */
export function loadTasks(): Task[] {
  const tasksDir = path.join(CONFIG_DIR, 'tasks');
  
  // Return empty array if tasks directory doesn't exist
  if (!fs.existsSync(tasksDir)) {
    return [];
  }

  // Get all .json files in the tasks directory
  const files = fs.readdirSync(tasksDir).filter(f => f.endsWith('.json'));
  const tasks: Task[] = [];

  // Load each task file
  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(tasksDir, file), 'utf-8');
      const task = JSON.parse(content);
      tasks.push(task);
    } catch (error) {
      // Log error but continue loading other tasks
      console.error(`Error loading task file ${file}:`, error);
    }
  }

  return tasks;
}

/**
 * Loads a specific task configuration by ID.
 * 
 * The ID corresponds to the filename without .json extension.
 * For example, loadTask('logo') loads frontend/config/tasks/logo.json
 * 
 * @param id - Task identifier (filename without .json)
 * @returns Task object or null if not found/invalid
 */
export function loadTask(id: string): Task | null {
  const taskPath = path.join(CONFIG_DIR, 'tasks', `${id}.json`);
  
  // Return null if file doesn't exist
  if (!fs.existsSync(taskPath)) {
    return null;
  }

  try {
    const content = fs.readFileSync(taskPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading task ${id}:`, error);
    return null;
  }
}

/**
 * Loads the projects catalog.
 * 
 * This contains metadata about SnoopLabs projects that can be
 * referenced or launched from the hub.
 * 
 * @returns Array of project objects (empty array if file doesn't exist)
 */
export function loadProjects() {
  const projectsPath = path.join(CONFIG_DIR, 'projects.json');
  
  if (!fs.existsSync(projectsPath)) {
    return [];
  }

  try {
    const content = fs.readFileSync(projectsPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

