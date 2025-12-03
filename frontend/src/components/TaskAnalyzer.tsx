/**
 * =============================================================================
 * TASK ANALYZER COMPONENT
 * =============================================================================
 *
 * The main input component for the Claude Code optimization guide.
 * Users describe their task in natural language and get real-time feedback
 * on detected keywords and categories.
 *
 * Features:
 * - Large textarea for task input
 * - Real-time keyword detection (debounced)
 * - Category suggestions
 * - Complexity indicator
 * - Example prompts for inspiration
 * =============================================================================
 */

import { useState, useEffect, useCallback } from 'react';
import { quickAnalyze } from '../services/api';
import type { QuickAnalysisResult } from '../types';

interface TaskAnalyzerProps {
  onAnalyze: (task: string) => void;
  isLoading?: boolean;
}

// Example tasks for inspiration
const EXAMPLE_TASKS = [
  'Build a React dashboard with user authentication',
  'Set up a FastAPI backend with PostgreSQL database',
  'Create CI/CD pipeline for Kubernetes deployment',
  'Debug performance issues in my Node.js API',
  'Add comprehensive test coverage to my project',
  'Implement security audit for my web application',
  'Build an AI chatbot with RAG capabilities',
  'Create API documentation for my REST endpoints',
];

export default function TaskAnalyzer({ onAnalyze, isLoading = false }: TaskAnalyzerProps) {
  const [task, setTask] = useState('');
  const [quickResult, setQuickResult] = useState<QuickAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Debounced quick analysis as user types
  useEffect(() => {
    if (task.length < 5) {
      setQuickResult(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsAnalyzing(true);
      try {
        const result = await quickAnalyze(task);
        setQuickResult(result);
      } catch (error) {
        console.error('Quick analysis failed:', error);
      } finally {
        setIsAnalyzing(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [task]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim().length >= 3) {
      onAnalyze(task.trim());
    }
  }, [task, onAnalyze]);

  const handleExampleClick = useCallback((example: string) => {
    setTask(example);
  }, []);

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'moderate': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'complex': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          What do you want to build?
        </h1>
        <p className="text-gray-400 text-lg">
          Describe your task and get personalized Claude Code recommendations
        </p>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="e.g., Build a React dashboard with user authentication and real-time data updates..."
            className="w-full h-40 px-6 py-4 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none text-lg transition-all"
            disabled={isLoading}
          />

          {/* Character count and analyzing indicator */}
          <div className="absolute bottom-3 right-3 flex items-center gap-3">
            {isAnalyzing && (
              <span className="text-xs text-purple-400 flex items-center gap-1">
                <span className="animate-pulse">Analyzing...</span>
              </span>
            )}
            <span className="text-xs text-gray-500">
              {task.length} characters
            </span>
          </div>
        </div>

        {/* Real-time analysis feedback */}
        {quickResult && task.length >= 5 && (
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 space-y-4 animate-in fade-in duration-300">
            {/* Detected Keywords */}
            {quickResult.keywords.length > 0 && (
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Detected Keywords
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {quickResult.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-2 py-1 text-sm bg-purple-500/20 text-purple-300 rounded-md border border-purple-500/30"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Top Categories */}
            {quickResult.topCategories.length > 0 && (
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categories
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {quickResult.topCategories.map((category) => (
                    <span
                      key={category}
                      className="px-2 py-1 text-sm bg-blue-500/20 text-blue-300 rounded-md border border-blue-500/30"
                    >
                      {category.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Complexity */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Complexity:
              </span>
              <span className={`px-2 py-0.5 text-xs rounded border ${getComplexityColor(quickResult.complexity)}`}>
                {quickResult.complexity}
              </span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={task.trim().length < 3 || isLoading}
          className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Analyzing...
            </span>
          ) : (
            'Get Recommendations'
          )}
        </button>
      </form>

      {/* Example Tasks */}
      <div className="mt-10">
        <p className="text-sm text-gray-500 mb-3 text-center">
          Or try one of these examples:
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {EXAMPLE_TASKS.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="px-3 py-1.5 text-sm bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-gray-100 transition-colors border border-gray-700 hover:border-gray-600"
            >
              {example.length > 40 ? `${example.slice(0, 40)}...` : example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
