/**
 * =============================================================================
 * LLM SERVICE - Claude AI Integration
 * =============================================================================
 * 
 * This service handles all communication with the Claude AI API.
 * It's the "brain" of the application - turning user input into personalized plans.
 * 
 * Main Function: generatePlan()
 * 1. Takes task config (with prompt templates) and user's questionnaire answers
 * 2. Builds a prompt by combining templates with answers
 * 3. Calls Claude API with the prompt
 * 4. Parses Claude's response into a structured PlanResponse
 * 
 * Requirements:
 * - ANTHROPIC_API_KEY environment variable must be set
 * - Task config must have promptTemplates.system and promptTemplates.planningPrompt
 * 
 * Model: Claude 3.5 Sonnet (claude-3-5-sonnet-20241022)
 * - Good balance of speed and quality
 * - Upgrade to claude-3-opus for more complex tasks if needed
 * 
 * Future Enhancements:
 * - Add OpenAI support as fallback
 * - Improve response parsing with JSON mode
 * - Add streaming support for real-time updates
 * - Cache responses for identical inputs
 * =============================================================================
 */

import Anthropic from '@anthropic-ai/sdk';
import type { Task } from './configLoader.js';

// Initialize Anthropic client with API key from environment
// The client will throw an error on API calls if the key is invalid
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Structure of the plan returned to the frontend.
 * This is what gets displayed in the PlanDisplay component.
 */
export interface PlanResponse {
  /** Ordered list of action steps */
  steps: Array<{
    number: number;
    title: string;
    description: string;
    commands?: string[];
  }>;
  /** Recommended AI agents with instructions */
  agents: Array<{
    name: string;
    purpose: string;
    howToEnable: string;
  }>;
  /** Ready-to-use prompts for AI image generators */
  prompts: Array<{
    title: string;
    content: string;
    platform: string;
  }>;
  /** Additional tips and best practices */
  additionalNotes?: string[];
}

/**
 * Generates a personalized plan using Claude AI.
 * 
 * This is the main entry point for AI-powered plan generation.
 * 
 * @param task - The workflow configuration (contains prompt templates)
 * @param answers - User's questionnaire answers (key-value pairs)
 * @returns PlanResponse with steps, agents, prompts, and notes
 * @throws Error if ANTHROPIC_API_KEY is not set or API call fails
 * 
 * @example
 * const plan = await generatePlan(logoTask, {
 *   brandName: 'SnoopLabs',
 *   industry: 'Technology',
 *   logoStyle: 'Minimalist/Modern'
 * });
 */
export async function generatePlan(
  task: Task,
  answers: Record<string, any>
): Promise<PlanResponse> {
  // Validate API key is configured
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  // ==========================================================================
  // STEP 1: Build the prompt from task config and user answers
  // ==========================================================================
  
  // Convert answers object to readable text format
  // Example: "brandName: SnoopLabs\nindustry: Technology\n..."
  const userAnswersText = Object.entries(answers)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  // Get prompt templates from task config
  const systemPrompt = task.promptTemplates.system;
  
  // Replace {userAnswers} placeholder with actual answers
  const planningPrompt = task.promptTemplates.planningPrompt
    .replace('{userAnswers}', userAnswersText);

  // ==========================================================================
  // STEP 2: Call Claude API
  // ==========================================================================
  
  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',  // Fast and capable
      max_tokens: 4096,                      // Allow long responses
      system: systemPrompt,                  // Sets Claude's role/behavior
      messages: [
        {
          role: 'user',
          content: planningPrompt            // The actual request
        }
      ]
    });

    // Extract text content from response
    const responseText = message.content[0].type === 'text' 
      ? message.content[0].text 
      : '';

    // ==========================================================================
    // STEP 3: Parse response into structured format
    // ==========================================================================
    
    const plan = parsePlanResponse(responseText, task);
    return plan;

  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw new Error('Failed to generate plan with LLM');
  }
}

/**
 * Parses Claude's text response into a structured PlanResponse.
 * 
 * This function attempts to extract:
 * - Numbered steps from the response
 * - Image generation prompts
 * - Combines with recommended agents from task config
 * 
 * Note: This is a basic parser. For production, consider:
 * - Using Claude's JSON mode for structured output
 * - More robust regex patterns
 * - Validation of extracted content
 * 
 * @param text - Raw text response from Claude
 * @param task - Task config (for recommended agents)
 * @returns Structured PlanResponse
 */
function parsePlanResponse(text: string, task: Task): PlanResponse {
  const steps: PlanResponse['steps'] = [];
  const agents: PlanResponse['agents'] = [];
  const prompts: PlanResponse['prompts'] = [];
  
  // ==========================================================================
  // PARSE STEPS: Look for numbered items with markdown formatting
  // Pattern: "1. **Title** Description..."
  // ==========================================================================
  
  const stepMatches = text.matchAll(/(\d+)\.\s*\*\*(.+?)\*\*[:\s]*(.+?)(?=\n\d+\.|\n\n|$)/gs);
  let stepNum = 1;
  for (const match of stepMatches) {
    steps.push({
      number: stepNum++,
      title: match[2].trim(),
      description: match[3].trim()
    });
  }

  // Fallback: If no markdown steps found, try simpler numbered list parsing
  if (steps.length === 0) {
    const lines = text.split('\n');
    let currentStep = 1;
    for (const line of lines) {
      if (/^\d+\./.test(line)) {
        const content = line.replace(/^\d+\.\s*/, '').trim();
        steps.push({
          number: currentStep++,
          title: content.slice(0, 50),  // First 50 chars as title
          description: content
        });
      }
    }
  }

  // ==========================================================================
  // PARSE PROMPTS: Look for image generation prompts in the response
  // ==========================================================================
  
  const promptSection = text.match(/(?:image|logo|design)\s+prompt[s]?:?\s*(.+?)(?=\n\n|$)/is);
  if (promptSection) {
    prompts.push({
      title: 'Logo Image Prompt',
      content: promptSection[1].trim(),
      platform: 'Any AI Image Generator (Midjourney, DALL·E, Stable Diffusion)'
    });
  }

  // ==========================================================================
  // ADD AGENTS: Include recommended agents from task config
  // These are pre-defined in the config, not extracted from Claude's response
  // ==========================================================================
  
  for (const agent of task.recommendedAgents) {
    agents.push({
      name: agent.name,
      purpose: agent.description,
      howToEnable: `Run: npx claude-code-templates@latest and select ${agent.name}`
    });
  }

  // ==========================================================================
  // BUILD FINAL RESPONSE
  // ==========================================================================
  
  return {
    steps,
    agents,
    prompts,
    // Default tips - could be customized per task in the future
    additionalNotes: [
      'Review all generated prompts before using them',
      'Iterate on designs based on your brand guidelines',
      'Save multiple versions for comparison'
    ]
  };
}

