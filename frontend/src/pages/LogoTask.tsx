/**
 * =============================================================================
 * WORKFLOW PAGE - Task-Based Guided Experience
 * =============================================================================
 *
 * A step-by-step workflow for specific tasks like logo creation.
 * Consistent with Mjölnir design language.
 * =============================================================================
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { colors } from '../design/system';
import { fetchTask, generatePlan } from '../services/api';
import type { Task, PlanResponse } from '../types';
import Header from '../components/ui/Header';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import ToolChecklist from '../components/ToolChecklist';
import TaskForm from '../components/TaskForm';
import PlanDisplay from '../components/PlanDisplay';

export default function LogoTask() {
  const [task, setTask] = useState<Task | null>(null);
  const [plan, setPlan] = useState<PlanResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    try {
      setIsLoading(true);
      const data = await fetchTask('logo');
      setTask(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load task');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (answers: Record<string, unknown>) => {
    try {
      setIsGenerating(true);
      setError(null);
      const planData = await generatePlan('logo', answers);
      setPlan(planData);
      setTimeout(() => {
        document.getElementById('plan-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate plan');
    } finally {
      setIsGenerating(false);
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen relative" style={{ backgroundColor: colors.bg.primary }}>
        <AnimatedBackground variant="subtle" />
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: colors.accent.muted }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <span className="text-2xl">◆</span>
            </motion.div>
            <p style={{ color: colors.text.tertiary }}>Loading workflow...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Error State (no task loaded)
  if (error && !task) {
    return (
      <div className="min-h-screen relative" style={{ backgroundColor: colors.bg.primary }}>
        <AnimatedBackground variant="subtle" />
        <Header />
        <main className="pt-24 pb-16 px-6 relative">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors"
              style={{ color: colors.text.tertiary }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Home
            </Link>

            <motion.div
              className="p-8 rounded-2xl text-center"
              style={{
                backgroundColor: colors.bg.secondary,
                border: `1px solid ${colors.error}30`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div
                className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${colors.error}20` }}
              >
                <span style={{ color: colors.error }}>!</span>
              </div>
              <h2 className="text-xl font-bold mb-2" style={{ color: colors.text.primary }}>
                Error Loading Workflow
              </h2>
              <p style={{ color: colors.text.secondary }}>{error}</p>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  if (!task) return null;

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: colors.bg.primary }}>
      <AnimatedBackground variant="subtle" />
      <Header />

      <main className="pt-24 pb-16 px-6 relative">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors"
              style={{ color: colors.text.tertiary }}
              onMouseEnter={(e) => { e.currentTarget.style.color = colors.text.primary; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = colors.text.tertiary; }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Home
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.p
              className="text-sm font-medium tracking-widest uppercase mb-4"
              style={{ color: colors.accent.primary }}
            >
              Mjölnir · Guided Workflow
            </motion.p>
            <h1
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
              style={{ color: colors.text.primary }}
            >
              {task.name}
            </h1>
            <p className="text-lg" style={{ color: colors.text.secondary }}>
              {task.description}
            </p>
            {task.estimatedTime && (
              <motion.div
                className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-xl"
                style={{
                  backgroundColor: colors.accent.muted,
                  color: colors.accent.primary,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span>⏱️</span>
                <span className="text-sm font-medium">Estimated: {task.estimatedTime}</span>
              </motion.div>
            )}
          </motion.header>

          {/* Steps */}
          <div className="space-y-8">
            {/* Step 1: Required Tools */}
            <motion.section
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: colors.bg.secondary,
                border: `1px solid ${colors.border.default}`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                  style={{
                    backgroundColor: colors.accent.muted,
                    color: colors.accent.primary,
                  }}
                >
                  1
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: colors.text.primary }}>
                    Required Tools
                  </h2>
                  <p className="text-sm" style={{ color: colors.text.tertiary }}>
                    Ensure these are installed before proceeding
                  </p>
                </div>
              </div>
              <ToolChecklist tools={task.requiredTools} />
            </motion.section>

            {/* Recommended Agents */}
            {task.recommendedAgents.length > 0 && (
              <motion.section
                className="p-6 rounded-2xl"
                style={{
                  backgroundColor: colors.bg.secondary,
                  border: `1px solid ${colors.border.default}`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: colors.accent.muted,
                      color: colors.accent.primary,
                    }}
                  >
                    ◆
                  </div>
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: colors.text.primary }}>
                      Recommended Agents
                    </h2>
                    <p className="text-sm" style={{ color: colors.text.tertiary }}>
                      These agents will help with this workflow
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {task.recommendedAgents.map((agent, idx) => (
                    <motion.div
                      key={idx}
                      className="p-4 rounded-xl"
                      style={{
                        backgroundColor: colors.bg.tertiary,
                        border: `1px solid ${colors.border.subtle}`,
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                    >
                      <h3 className="font-semibold mb-1" style={{ color: colors.accent.primary }}>
                        {agent.name}
                      </h3>
                      <p className="text-sm mb-2" style={{ color: colors.text.secondary }}>
                        {agent.description}
                      </p>
                      {agent.recommendedUsage && (
                        <p className="text-xs" style={{ color: colors.text.tertiary }}>
                          <strong>Usage:</strong> {agent.recommendedUsage}
                        </p>
                      )}
                      {agent.docsUrl && (
                        <a
                          href={agent.docsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-2 text-xs font-medium transition-colors"
                          style={{ color: colors.accent.primary }}
                        >
                          Learn more →
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Step 2: Questionnaire */}
            <motion.section
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: colors.bg.secondary,
                border: `1px solid ${colors.border.default}`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                  style={{
                    backgroundColor: colors.accent.muted,
                    color: colors.accent.primary,
                  }}
                >
                  2
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: colors.text.primary }}>
                    Tell Us About Your Project
                  </h2>
                  <p className="text-sm" style={{ color: colors.text.tertiary }}>
                    Answer these questions to generate your personalized plan
                  </p>
                </div>
              </div>

              {error && (
                <motion.div
                  className="mb-4 p-4 rounded-xl"
                  style={{
                    backgroundColor: `${colors.error}10`,
                    border: `1px solid ${colors.error}30`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-sm" style={{ color: colors.error }}>{error}</p>
                </motion.div>
              )}

              <TaskForm
                questions={task.questions}
                onSubmit={handleSubmit}
                isLoading={isGenerating}
              />
            </motion.section>

            {/* Step 3: Generated Plan */}
            {plan && (
              <motion.section
                id="plan-section"
                className="p-6 rounded-2xl scroll-mt-24"
                style={{
                  backgroundColor: colors.bg.secondary,
                  border: `1px solid ${colors.accent.primary}30`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                    style={{
                      backgroundColor: colors.accent.primary,
                      color: colors.text.inverse,
                    }}
                  >
                    3
                  </div>
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: colors.text.primary }}>
                      Your Custom Plan
                    </h2>
                    <p className="text-sm" style={{ color: colors.text.tertiary }}>
                      Follow these steps to complete your project
                    </p>
                  </div>
                </div>
                <PlanDisplay plan={plan} />
              </motion.section>
            )}

            {/* Waiting State */}
            {!plan && !isGenerating && (
              <motion.section
                className="p-8 rounded-2xl text-center"
                style={{
                  backgroundColor: colors.bg.secondary,
                  border: `1px dashed ${colors.border.default}`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: colors.accent.muted }}
                >
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.text.primary }}>
                  Ready to Generate Your Plan
                </h3>
                <p className="text-sm" style={{ color: colors.text.tertiary }}>
                  Complete the questionnaire above to receive your personalized workflow
                </p>
              </motion.section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
