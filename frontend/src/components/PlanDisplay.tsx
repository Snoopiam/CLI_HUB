/**
 * =============================================================================
 * PLAN DISPLAY COMPONENT
 * =============================================================================
 * 
 * Renders the AI-generated plan returned from the backend after submitting
 * the questionnaire. This is where users see their personalized results.
 * 
 * The plan consists of four main sections:
 * 1. Step-by-Step Plan - Numbered action items with descriptions
 * 2. Recommended Agents - AI assistants to enable for help
 * 3. AI Image Prompts - Ready-to-use prompts for image generators (THE GOLD!)
 * 4. Pro Tips - Additional advice and best practices
 * 
 * Key Features:
 * - Copy buttons on prompts for easy clipboard access
 * - Visual hierarchy with icons and colors
 * - Commands displayed in monospace with syntax highlighting
 * - Graceful handling of empty sections (they simply don't render)
 * 
 * Used in: LogoTask.tsx and other workflow pages
 * Data source: PlanResponse from generatePlan() API call
 * 
 * @example
 * {plan && <PlanDisplay plan={plan} />}
 * =============================================================================
 */

import type { PlanResponse } from '../types';

/**
 * Props for the PlanDisplay component
 */
interface PlanDisplayProps {
  /** The complete plan response from the backend */
  plan: PlanResponse;
}

/**
 * PlanDisplay - Renders the AI-generated plan with all its sections.
 * 
 * Each section only renders if it has content, so the component
 * gracefully handles partial responses from the AI.
 */
export default function PlanDisplay({ plan }: PlanDisplayProps) {
  /**
   * Copies text to the user's clipboard.
   * Used for the copy buttons on prompts.
   */
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Future enhancement: Show toast notification on copy
  };

  return (
    <div className="space-y-8">
      {/* ================================================================
          SECTION 1: STEP-BY-STEP PLAN
          Numbered action items the user should follow
          ================================================================ */}
      {plan.steps.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>📋</span> Step-by-Step Plan
          </h3>
          <div className="space-y-4">
            {plan.steps.map((step) => (
              <div 
                key={step.number}
                className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  {/* Step number badge */}
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    {/* Step title and description */}
                    <h4 className="font-semibold mb-1">{step.title}</h4>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                    
                    {/* Optional commands for this step */}
                    {step.commands && step.commands.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {step.commands.map((cmd, idx) => (
                          <code key={idx} className="block px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm font-mono text-green-400">
                            {cmd}
                          </code>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================================================================
          SECTION 2: RECOMMENDED AGENTS
          AI assistants from AITMPL/Claude ecosystem
          ================================================================ */}
      {plan.agents.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>🤖</span> Recommended Agents
          </h3>
          <div className="space-y-3">
            {plan.agents.map((agent, idx) => (
              <div 
                key={idx}
                className="p-4 bg-blue-900/20 border border-blue-800/50 rounded-lg"
              >
                <h4 className="font-semibold text-blue-300 mb-1">{agent.name}</h4>
                <p className="text-gray-400 text-sm mb-2">{agent.purpose}</p>
                <p className="text-xs text-gray-500">
                  <strong>How to enable:</strong> {agent.howToEnable}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================================================================
          SECTION 3: AI IMAGE GENERATION PROMPTS
          The "gold" - ready-to-use prompts for Midjourney, DALL-E, etc.
          These have copy buttons for easy clipboard access.
          ================================================================ */}
      {plan.prompts.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>✨</span> AI Image Generation Prompts
          </h3>
          <div className="space-y-4">
            {plan.prompts.map((prompt, idx) => (
              <div 
                key={idx}
                className="p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/50 rounded-lg"
              >
                {/* Prompt header with title and platform badge */}
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-purple-300">{prompt.title}</h4>
                  <span className="text-xs px-2 py-1 bg-purple-700/50 rounded">
                    {prompt.platform}
                  </span>
                </div>
                
                {/* Prompt content with copy button */}
                <div className="relative">
                  <p className="text-sm text-gray-300 bg-gray-900/50 p-3 rounded border border-gray-700 font-mono leading-relaxed">
                    {prompt.content}
                  </p>
                  {/* Copy button positioned in top-right corner */}
                  <button
                    onClick={() => copyToClipboard(prompt.content)}
                    className="absolute top-2 right-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs transition-colors"
                    title="Copy prompt"
                  >
                    📋 Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================================================================
          SECTION 4: PRO TIPS / ADDITIONAL NOTES
          Extra advice and best practices
          ================================================================ */}
      {plan.additionalNotes && plan.additionalNotes.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>💡</span> Pro Tips
          </h3>
          <ul className="space-y-2">
            {plan.additionalNotes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                <span className="text-yellow-500 flex-shrink-0">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

