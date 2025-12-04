/**
 * =============================================================================
 * ANALYZE PAGE - Main Claude Code Recommendation Flow
 * =============================================================================
 *
 * The core page of Mjölnir. Clean, focused, purposeful.
 * =============================================================================
 */

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '../design/system';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import MorphInput from '../components/ui/MorphInput';
import RecommendationStack from '../components/ui/RecommendationStack';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import { InlinePageLoader } from '../components/ui/PageLoader';
import Card, { CardIcon, CardDescription } from '../components/ui/Card';
import { analyzeTask } from '../services/api';
import type { RecommendationResult } from '../types';

type ViewState = 'input' | 'loading' | 'results' | 'error';

export default function AnalyzePage() {
  const [searchParams] = useSearchParams();
  const [viewState, setViewState] = useState<ViewState>('input');
  const [taskInput, setTaskInput] = useState('');
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle initial task from URL
  useEffect(() => {
    const taskFromUrl = searchParams.get('task');
    if (taskFromUrl && taskFromUrl.trim().length >= 3) {
      setTaskInput(taskFromUrl);
      handleAnalyze(taskFromUrl);
    }
  }, [searchParams]);

  const handleAnalyze = useCallback(
    async (task?: string) => {
      const taskToAnalyze = task || taskInput;
      if (taskToAnalyze.trim().length < 3) return;

      setViewState('loading');
      setError(null);

      try {
        const analysisResult = await analyzeTask(taskToAnalyze);
        setResult(analysisResult);
        setViewState('results');
      } catch (err) {
        console.error('Analysis failed:', err);
        setError(err instanceof Error ? err.message : 'Failed to analyze task');
        setViewState('error');
      }
    },
    [taskInput]
  );

  const handleBack = useCallback(() => {
    setViewState('input');
    setResult(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: colors.bg.primary }}>
      <AnimatedBackground variant="hero" />
      <Header />

      <main className="pt-32 pb-16 px-6 relative">
        <AnimatePresence mode="wait">
          {/* Input State */}
          {viewState === 'input' && (
            <motion.div
              key="input"
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-center mb-12">
                {/* Section tag - Pill design */}
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                  style={{
                    backgroundColor: `${colors.accent.primary}15`,
                    border: `1px solid ${colors.accent.primary}30`,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span
                    className="text-xs font-semibold tracking-widest uppercase"
                    style={{ color: colors.accent.primary }}
                  >
                    Mjölnir · Analysis
                  </span>
                </motion.div>

                {/* Lightning bolt separator - SVG for clean transparency */}
                <motion.div
                  className="mx-auto mb-8 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <svg
                    width="28"
                    height="40"
                    viewBox="0 0 28 40"
                    fill="none"
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.6))',
                    }}
                  >
                    <path
                      d="M16 0L0 22h11L8 40l20-24H16L22 0H16z"
                      fill="url(#bolt-gradient-analyze)"
                    />
                    <defs>
                      <linearGradient
                        id="bolt-gradient-analyze"
                        x1="14"
                        y1="0"
                        x2="14"
                        y2="40"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#67e8f9" />
                        <stop offset="1" stopColor="#22d3ee" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 gradient-text">
                  Analyze Your Task
                </h1>
                <motion.p
                  className="text-lg max-w-2xl mx-auto"
                  style={{ color: colors.text.secondary }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Describe what you're building to get{' '}
                  <span style={{ color: colors.accent.primary }}>personalized recommendations</span>
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <MorphInput
                  value={taskInput}
                  onChange={setTaskInput}
                  onSubmit={() => handleAnalyze()}
                  placeholder="I want to build a React dashboard with user authentication and API integration..."
                />
              </motion.div>

              {/* Tips */}
              <motion.div
                className="mt-16 max-w-5xl mx-auto relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {/* Section divider */}
                <div
                  className="absolute -top-8 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${colors.border.default}, transparent)`,
                  }}
                />
                <h3
                  className="text-sm font-medium mb-4 text-center"
                  style={{ color: colors.text.tertiary }}
                >
                  Tips for better results
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {[
                    {
                      icon: '◎',
                      text: 'Be specific about technologies (React, Python, etc.)',
                      accent: true,
                    },
                    {
                      icon: '◆',
                      text: 'Mention your goals (debug, test, deploy, etc.)',
                      accent: false,
                    },
                    {
                      icon: '✦',
                      text: 'Include context (API, database, frontend, etc.)',
                      accent: true,
                    },
                  ].map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <Card variant={tip.accent ? 'accent' : 'default'} tilt interactive>
                        <div className="flex items-start gap-4">
                          <CardIcon variant="accent">{tip.icon}</CardIcon>
                          <div className="min-w-0 flex-1">
                            <CardDescription className="text-sm">{tip.text}</CardDescription>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Loading State */}
          {viewState === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <InlinePageLoader
                title="Analyzing your task"
                subtitle="Finding the best Claude Code features for you"
                previewText={taskInput}
              />
            </motion.div>
          )}

          {/* Results State */}
          {viewState === 'results' && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <RecommendationStack result={result} onBack={handleBack} cardVariant="light" />
            </motion.div>
          )}

          {/* Error State */}
          {viewState === 'error' && (
            <motion.div
              key="error"
              className="max-w-md mx-auto text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  backgroundColor: colors.bg.secondary,
                  border: `1px solid ${colors.border.default}`,
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ color: colors.error }}
                >
                  <path
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h2 className="text-xl font-semibold mb-2" style={{ color: colors.text.primary }}>
                Something went wrong
              </h2>
              <p className="mb-6" style={{ color: colors.text.secondary }}>
                {error || 'An unexpected error occurred'}
              </p>

              <motion.button
                onClick={handleBack}
                className="px-6 py-3 rounded-lg font-medium"
                style={{
                  backgroundColor: colors.bg.secondary,
                  color: colors.text.primary,
                  border: `1px solid ${colors.border.default}`,
                }}
                whileHover={{
                  borderColor: colors.border.emphasis,
                  y: -1,
                }}
                whileTap={{ scale: 0.98 }}
              >
                Try Again
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
