/**
 * =============================================================================
 * RECOMMENDATION RESULTS COMPONENT
 * =============================================================================
 *
 * Displays the recommendations generated from task analysis.
 * Shows prioritized features grouped by type with install commands.
 *
 * Features:
 * - Priority recommendations highlighted at top
 * - Grouped by feature type (agents, skills, MCPs, etc.)
 * - Expandable details with install commands
 * - Copy-to-clipboard for all commands
 * - Match reasons showing why each was recommended
 * =============================================================================
 */

import { useState, useCallback } from 'react';
import type { RecommendationResult, ScoredFeature, FeatureType } from '../types';

interface RecommendationResultsProps {
  result: RecommendationResult;
  onBack: () => void;
}

// Feature type icons and colors
const FEATURE_CONFIG: Record<FeatureType, { icon: string; color: string; label: string; description: string }> = {
  agent: {
    icon: '🤖',
    color: 'from-blue-500 to-cyan-500',
    label: 'Agents',
    description: 'Specialized AI assistants for specific domains'
  },
  skill: {
    icon: '⚡',
    color: 'from-purple-500 to-pink-500',
    label: 'Skills',
    description: 'Reusable workflows and domain expertise'
  },
  mcp: {
    icon: '🔌',
    color: 'from-green-500 to-emerald-500',
    label: 'MCP Servers',
    description: 'External service integrations'
  },
  hook: {
    icon: '🪝',
    color: 'from-orange-500 to-amber-500',
    label: 'Hooks',
    description: 'Lifecycle automation triggers'
  },
  command: {
    icon: '⌨️',
    color: 'from-indigo-500 to-violet-500',
    label: 'Commands',
    description: 'Custom slash commands'
  },
  setting: {
    icon: '⚙️',
    color: 'from-gray-500 to-slate-500',
    label: 'Settings',
    description: 'Configuration options'
  },
  claudemd: {
    icon: '📄',
    color: 'from-teal-500 to-cyan-500',
    label: 'CLAUDE.md',
    description: 'Project context files'
  }
};

// Copy button component
function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors flex items-center gap-1"
    >
      {copied ? (
        <>
          <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}

// Single feature card component
function FeatureCard({ scoredFeature, isExpanded, onToggle }: {
  scoredFeature: ScoredFeature;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const { feature, type, score, matchReasons, isPriority } = scoredFeature;
  const config = FEATURE_CONFIG[type];

  return (
    <div
      className={`bg-gray-900 border rounded-xl overflow-hidden transition-all ${
        isPriority ? 'border-purple-500/50 ring-1 ring-purple-500/20' : 'border-gray-800'
      }`}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full p-4 text-left flex items-start gap-4 hover:bg-gray-800/50 transition-colors"
      >
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center text-xl flex-shrink-0`}>
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-gray-100">{feature.name}</h4>
            {isPriority && (
              <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                Priority
              </span>
            )}
            <span className="px-2 py-0.5 text-xs bg-gray-700 text-gray-400 rounded-full">
              Score: {score}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1 line-clamp-2">{feature.description}</p>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-800 space-y-4 animate-in slide-in-from-top-2 duration-200">
          {/* When to use */}
          <div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">When to use</span>
            <p className="text-sm text-gray-300 mt-1">{feature.whenToUse}</p>
          </div>

          {/* Match Reasons */}
          {matchReasons.length > 0 && (
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Why recommended</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {matchReasons.map((reason, i) => (
                  <span key={i} className="px-2 py-0.5 text-xs bg-gray-800 text-gray-400 rounded">
                    {reason}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Install Command */}
          <div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Installation</span>
            <div className="mt-1 flex items-center gap-2">
              <code className="flex-1 px-3 py-2 bg-gray-800 text-green-400 rounded font-mono text-sm overflow-x-auto">
                {feature.installCommand}
              </code>
              <CopyButton text={feature.installCommand} />
            </div>
          </div>

          {/* Config Example if available */}
          {feature.configExample && (
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Configuration Example</span>
              <div className="mt-1 relative">
                <pre className="px-3 py-2 bg-gray-800 text-gray-300 rounded font-mono text-xs overflow-x-auto">
                  {JSON.stringify(feature.configExample, null, 2)}
                </pre>
                <div className="absolute top-2 right-2">
                  <CopyButton text={JSON.stringify(feature.configExample, null, 2)} />
                </div>
              </div>
            </div>
          )}

          {/* Source badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Source:</span>
            <span className={`px-2 py-0.5 text-xs rounded ${
              feature.source === 'built-in' ? 'bg-green-500/20 text-green-300' :
              feature.source === 'anthropic-plugin' ? 'bg-blue-500/20 text-blue-300' :
              'bg-gray-700 text-gray-400'
            }`}>
              {feature.source}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Feature type section
function FeatureSection({ type, features }: { type: FeatureType; features: ScoredFeature[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const config = FEATURE_CONFIG[type];

  if (features.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center text-lg`}>
          {config.icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-100">{config.label}</h3>
          <p className="text-xs text-gray-500">{config.description}</p>
        </div>
        <span className="ml-auto px-2 py-0.5 text-xs bg-gray-800 text-gray-400 rounded-full">
          {features.length}
        </span>
      </div>
      <div className="space-y-2">
        {features.map((sf) => (
          <FeatureCard
            key={sf.feature.id}
            scoredFeature={sf}
            isExpanded={expandedId === sf.feature.id}
            onToggle={() => setExpandedId(expandedId === sf.feature.id ? null : sf.feature.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default function RecommendationResults({ result, onBack }: RecommendationResultsProps) {
  const { analysis, recommendations, summary } = result;

  // Check if we have any recommendations
  const hasRecommendations = summary.totalRecommendations > 0;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header with back button */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors mb-4"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          New Analysis
        </button>

        <h1 className="text-3xl font-bold text-gray-100 mb-2">
          Recommendations for Your Task
        </h1>
        <p className="text-gray-400">
          {summary.totalRecommendations} features recommended based on your task
        </p>
      </div>

      {/* Analysis Summary */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-100 mb-4">Task Analysis</h2>

        <div className="space-y-4">
          {/* Original Task */}
          <div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Your Task</span>
            <p className="text-gray-200 mt-1 italic">"{analysis.task}"</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Categories */}
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Categories</span>
              <div className="flex flex-wrap gap-1 mt-2">
                {analysis.topCategories.map((cat) => (
                  <span key={cat} className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-300 rounded">
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Keywords */}
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Keywords</span>
              <div className="flex flex-wrap gap-1 mt-2">
                {analysis.detectedKeywords.slice(0, 6).map((kw) => (
                  <span key={kw} className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-300 rounded">
                    {kw}
                  </span>
                ))}
                {analysis.detectedKeywords.length > 6 && (
                  <span className="px-2 py-0.5 text-xs bg-gray-700 text-gray-400 rounded">
                    +{analysis.detectedKeywords.length - 6} more
                  </span>
                )}
              </div>
            </div>

            {/* Complexity */}
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Complexity</span>
              <div className="mt-2">
                <span className={`px-2 py-0.5 text-xs rounded ${
                  analysis.complexity === 'simple' ? 'bg-green-500/20 text-green-300' :
                  analysis.complexity === 'moderate' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {analysis.complexity}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {hasRecommendations ? (
        <>
          {/* Priority Recommendations */}
          {summary.topPriority.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🎯</span>
                <h2 className="text-xl font-semibold text-gray-100">Top Priority</h2>
                <span className="text-sm text-gray-500">Start with these</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {summary.topPriority.slice(0, 4).map((sf) => (
                  <div
                    key={`${sf.type}-${sf.feature.id}`}
                    className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">{FEATURE_CONFIG[sf.type].icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-100">{sf.feature.name}</h4>
                        <span className="text-xs text-purple-300">{FEATURE_CONFIG[sf.type].label}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{sf.feature.description}</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-2 py-1 bg-gray-900/50 text-green-400 rounded text-xs font-mono truncate">
                        {sf.feature.installCommand}
                      </code>
                      <CopyButton text={sf.feature.installCommand} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Wins */}
          {summary.quickWins.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🚀</span>
                <h2 className="text-xl font-semibold text-gray-100">Quick Wins</h2>
                <span className="text-sm text-gray-500">Easy to set up, high impact</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {summary.quickWins.map((sf) => (
                  <div
                    key={`qw-${sf.type}-${sf.feature.id}`}
                    className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 flex items-center gap-3"
                  >
                    <span>{FEATURE_CONFIG[sf.type].icon}</span>
                    <span className="font-medium text-gray-200">{sf.feature.name}</span>
                    <span className="text-xs text-gray-500">{FEATURE_CONFIG[sf.type].label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Recommendations by Type */}
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-100">All Recommendations</h2>

            <FeatureSection type="agent" features={recommendations.agents} />
            <FeatureSection type="skill" features={recommendations.skills} />
            <FeatureSection type="mcp" features={recommendations.mcps} />
            <FeatureSection type="command" features={recommendations.commands} />
            <FeatureSection type="hook" features={recommendations.hooks} />
            <FeatureSection type="setting" features={recommendations.settings} />
            <FeatureSection type="claudemd" features={recommendations.claudemd} />
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-4">
            No specific recommendations found for this task.
          </p>
          <p className="text-gray-500">
            Try being more specific about the technologies or tools you're using.
          </p>
        </div>
      )}
    </div>
  );
}
