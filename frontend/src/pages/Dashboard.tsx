/**
 * =============================================================================
 * DASHBOARD - Mjölnir Home
 * =============================================================================
 *
 * A refined landing page that introduces the Claude Code optimization guide.
 * Minimalist. NOT boring. Purposeful. Distinctive.
 * =============================================================================
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '../design/system';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import MorphInput from '../components/ui/MorphInput';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import Card, { CardIcon, CardTitle, CardDescription, CardBadge } from '../components/ui/Card';
import PageLoader from '../components/ui/PageLoader';
import { fetchTasks, getAllFeatures } from '../services/api';
import type { Task } from '../types';

// Feature type data with visual identity
const FEATURE_TYPES = [
  { type: 'agents', label: 'Agents', icon: '◆', desc: 'Specialized AI assistants for specific domains', accent: true },
  { type: 'skills', label: 'Skills', icon: '✦', desc: 'Reusable workflows activated automatically', accent: false },
  { type: 'mcps', label: 'MCPs', icon: '◎', desc: 'External integrations and connections', accent: false },
  { type: 'hooks', label: 'Hooks', icon: '↻', desc: 'Lifecycle automation and triggers', accent: false },
  { type: 'commands', label: 'Commands', icon: '/', desc: 'Quick actions via slash commands', accent: false },
  { type: 'claudemd', label: 'CLAUDE.md', icon: '#', desc: 'Project context and conventions', accent: true },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [taskInput, setTaskInput] = useState('');
  const [workflows, setWorkflows] = useState<Pick<Task, 'id' | 'name' | 'description'>[]>([]);
  const [featureCounts, setFeatureCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [workflowsData, featuresData] = await Promise.all([
          fetchTasks().catch(() => []),
          getAllFeatures(true).catch(() => ({ counts: {} })),
        ]);
        setWorkflows(workflowsData);
        setFeatureCounts((featuresData as { counts: Record<string, number> }).counts || {});
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAnalyze = () => {
    if (taskInput.trim().length >= 3) {
      navigate(`/analyze?task=${encodeURIComponent(taskInput.trim())}`);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <PageLoader
        title="Loading Mjölnir ⚡"
        subtitle="Preparing your feature discovery experience"
        backgroundVariant="hero"
      />
    );
  }

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: colors.bg.primary }}>
      {/* Living background */}
      <AnimatedBackground variant="hero" />

      <Header />

      {/* Hero Section - DRAMATIC */}
      <section className="pt-32 pb-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          {/* Hero headline with gradient */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
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
                Mjölnir · Feature Discovery
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
                  fill="url(#bolt-gradient)"
                />
                <defs>
                  <linearGradient id="bolt-gradient" x1="14" y1="0" x2="14" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#67e8f9" />
                    <stop offset="1" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Main headline - animated gradient */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 gradient-text">
              What are you building?
            </h1>

            {/* Subheadline with fade */}
            <motion.p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: colors.text.secondary }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Describe your task. Get the exact features, agents, and tools{' '}
              <span style={{ color: colors.accent.primary }}>tailored for you</span>.
            </motion.p>
          </motion.div>

          {/* Task input - signature element */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <MorphInput
              value={taskInput}
              onChange={setTaskInput}
              onSubmit={handleAnalyze}
              placeholder="Build a React dashboard with authentication..."
            />
          </motion.div>

          {/* Quick examples - more refined */}
          <motion.div
            className="mt-10 flex flex-wrap justify-center items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-sm font-medium" style={{ color: colors.text.tertiary }}>
              Quick start →
            </span>
            {['API integration', 'debug code', 'write tests', 'review PR'].map((example, i) => (
              <motion.button
                key={example}
                onClick={() => setTaskInput(example)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all hover-lift"
                style={{
                  backgroundColor: colors.bg.secondary,
                  color: colors.text.secondary,
                  border: `1px solid ${colors.border.default}`,
                }}
                whileHover={{
                  borderColor: colors.accent.primary,
                  color: colors.text.primary,
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.05 }}
              >
                {example}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Types Grid */}
      <section className="py-16 px-6 relative">
        {/* Section divider with glow */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.accent.primary}30, transparent)`,
          }}
        />

        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl font-bold mb-3"
              style={{ color: colors.text.primary }}
            >
              Claude Code Features
            </h2>
            <p className="text-lg" style={{ color: colors.text.secondary }}>
              Six powerful ways to enhance your workflow
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {FEATURE_TYPES.map((feature, index) => (
              <motion.div
                key={feature.type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <Card
                  variant={feature.accent ? 'accent' : 'default'}
                  tilt
                  interactive
                >
                  <div className="flex items-start gap-4">
                    <CardIcon variant="accent">{feature.icon}</CardIcon>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle>{feature.label}</CardTitle>
                        {featureCounts[feature.type] && (
                          <CardBadge variant="accent">
                            {featureCounts[feature.type]}
                          </CardBadge>
                        )}
                      </div>
                      <CardDescription className="line-clamp-2">
                        {feature.desc}
                      </CardDescription>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflows Section */}
      <AnimatePresence>
        {workflows.length > 0 && (
          <motion.section
            className="py-16 px-6 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Section divider */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${colors.border.emphasis}, transparent)`,
              }}
            />

            <div className="max-w-5xl mx-auto">
              <motion.div
                className="flex items-center justify-between mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div>
                  <h2
                    className="text-2xl font-bold mb-1"
                    style={{ color: colors.text.primary }}
                  >
                    Guided Workflows
                  </h2>
                  <p style={{ color: colors.text.tertiary }}>
                    Step-by-step assistance for specific tasks
                  </p>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {workflows.map((workflow, index) => (
                  <motion.div
                    key={workflow.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Link to={`/tasks/${workflow.id}`} className="block">
                      <Card variant="default" tilt interactive>
                        <div className="flex items-center gap-4 mb-3">
                          <CardIcon variant="accent">
                            {workflow.id === 'logo' ? '◆' : '✦'}
                          </CardIcon>
                          <CardTitle className="text-lg">{workflow.name}</CardTitle>
                        </div>
                        <CardDescription className="pl-14">
                          {workflow.description}
                        </CardDescription>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
