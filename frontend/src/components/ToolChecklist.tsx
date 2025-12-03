/**
 * =============================================================================
 * TOOL CHECKLIST COMPONENT
 * =============================================================================
 * 
 * Displays a list of required/recommended tools for a workflow.
 * 
 * Features:
 * - Visual icons for tool types (CLI, Web, App)
 * - Copyable install commands with one-click copy button
 * - Links to documentation
 * - Clean card-based layout
 * 
 * Used in: LogoTask.tsx and other workflow pages
 * Data source: task.requiredTools from the workflow config
 * 
 * @example
 * <ToolChecklist tools={task.requiredTools} />
 * =============================================================================
 */

import type { Tool } from '../types';

/**
 * Props for the ToolChecklist component
 */
interface ToolChecklistProps {
  /** Array of Tool objects to display */
  tools: Tool[];
}

/**
 * ToolChecklist - Renders a list of tools with install commands and docs links.
 * 
 * Each tool is displayed as a card showing:
 * - Icon based on type (⚙️ CLI, 🌐 Web, 💻 App)
 * - Tool name and type badge
 * - Description
 * - Install commands with copy buttons (if provided)
 * - Documentation link (if provided)
 */
export default function ToolChecklist({ tools }: ToolChecklistProps) {
  /**
   * Copies text to the user's clipboard.
   * Uses the modern Clipboard API (requires HTTPS or localhost).
   */
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Future enhancement: Show a toast notification on successful copy
  };

  return (
    <div className="space-y-4">
      {/* Render each tool as a card */}
      {tools.map((tool, index) => (
        <div 
          key={index}
          className="p-5 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
        >
          <div className="flex items-start gap-4">
            {/* Tool type icon - provides visual categorization */}
            <div className="mt-1 text-2xl">
              {tool.type === 'cli' && '⚙️'}
              {tool.type === 'web' && '🌐'}
              {tool.type === 'app' && '💻'}
            </div>
            
            <div className="flex-1">
              {/* Header: Tool name and type badge */}
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-lg">{tool.name}</h3>
                <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded uppercase">
                  {tool.type}
                </span>
              </div>
              
              {/* Tool description */}
              <p className="text-gray-400 text-sm mb-3">{tool.description}</p>
              
              {/* Install commands section - only shown if commands exist */}
              {tool.installCommands && tool.installCommands.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 font-medium">Install Command:</p>
                  {tool.installCommands.map((cmd, cmdIndex) => (
                    <div key={cmdIndex} className="flex items-center gap-2">
                      {/* Command displayed in monospace with syntax highlighting */}
                      <code className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm font-mono text-green-400">
                        {cmd}
                      </code>
                      {/* Copy button - copies command to clipboard */}
                      <button
                        onClick={() => copyToClipboard(cmd)}
                        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                        title="Copy to clipboard"
                      >
                        📋
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Documentation link - opens in new tab */}
              {tool.docsUrl && (
                <a
                  href={tool.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-3 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  📚 View Documentation →
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

