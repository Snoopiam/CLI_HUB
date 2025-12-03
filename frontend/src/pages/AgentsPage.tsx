/**
 * =============================================================================
 * EXPLORE PAGE - Browse Claude Code Features
 * =============================================================================
 *
 * Browse all available features, agents, and integrations.
 * Consistent with MjolnirAI design language.
 * =============================================================================
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '../design/system';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import Card, { CardIcon, CardTitle, CardDescription, CardBadge } from '../components/ui/Card';
import PageLoader from '../components/ui/PageLoader';

interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  installed: boolean;
}

interface AgentsResponse {
  agents: Agent[];
  cliInstalled: boolean;
  installInstructions: {
    global: string;
    oneTime: string;
    docsUrl: string;
  };
}

export default function AgentsPage() {
  const [data, setData] = useState<AgentsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      const response = await fetch('/api/agents');
      const agentsData = await response.json();
      setData(agentsData);
    } catch (error) {
      console.error('Failed to load agents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedCommand(id);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  // Filter agents
  const filteredAgents = (data?.agents ?? []).filter(agent => {
    const matchesCategory = !selectedCategory || agent.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = !searchQuery ||
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = [...new Set(data?.agents.map(a => a.category) || [])];

  if (isLoading) {
    return (
      <PageLoader
        title="Loading features"
        subtitle="Discovering Claude Code capabilities"
        backgroundVariant="hero"
      />
    );
  }

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: colors.bg.primary }}>
      <AnimatedBackground variant="hero" />
      <Header />

      <main className="pt-32 pb-16 px-6 relative">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.p
              className="text-sm font-medium tracking-widest uppercase mb-6"
              style={{ color: colors.accent.primary }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              MjolnirAI · Feature Explorer
            </motion.p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-text">
              Explore Features
            </h1>
            <motion.p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: colors.text.secondary }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Browse agents, skills, and integrations to{' '}
              <span style={{ color: colors.accent.primary }}>enhance your Claude Code workflow</span>
            </motion.p>
          </motion.div>

          {/* CLI Status Banner */}
          {data && !data.cliInstalled && (
            <motion.div
              className="mb-8 p-6 rounded-2xl"
              style={{
                backgroundColor: `${colors.accent.primary}10`,
                border: `1px solid ${colors.accent.primary}30`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: colors.accent.muted }}
                >
                  <span style={{ color: colors.accent.primary }}>⚡</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2" style={{ color: colors.text.primary }}>
                    Install CLI for Full Access
                  </h3>
                  <p className="text-sm mb-4" style={{ color: colors.text.secondary }}>
                    Install the claude-code-templates CLI to use these features:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <code
                        className="flex-1 px-4 py-2.5 rounded-xl text-sm font-mono"
                        style={{
                          backgroundColor: colors.bg.tertiary,
                          color: colors.accent.primary,
                        }}
                      >
                        {data.installInstructions.global}
                      </code>
                      <motion.button
                        onClick={() => copyToClipboard(data.installInstructions.global, 'global')}
                        className="px-3 py-2.5 rounded-xl text-sm font-medium"
                        style={{
                          backgroundColor: colors.bg.tertiary,
                          color: copiedCommand === 'global' ? colors.success : colors.text.secondary,
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {copiedCommand === 'global' ? '✓' : '📋'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Search and Filter */}
          <motion.div
            className="mb-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Section divider */}
            <div
              className="absolute -top-4 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${colors.accent.primary}30, transparent)`,
              }}
            />
            {/* Search Input */}
            <div className="mb-4">
              <div
                className="relative max-w-md mx-auto"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search features..."
                  className="w-full px-5 py-3 pl-12 rounded-xl text-sm focus:outline-none"
                  style={{
                    backgroundColor: colors.bg.secondary,
                    border: `1px solid ${colors.border.default}`,
                    color: colors.text.primary,
                  }}
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ color: colors.text.tertiary }}
                >
                  <path
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              <motion.button
                onClick={() => setSelectedCategory(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  backgroundColor: selectedCategory === null ? colors.accent.primary : colors.bg.secondary,
                  color: selectedCategory === null ? colors.text.inverse : colors.text.secondary,
                  border: `1px solid ${selectedCategory === null ? colors.accent.primary : colors.border.default}`,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                All ({data?.agents.length || 0})
              </motion.button>
              {categories.map(category => {
                const count = data?.agents.filter(a => a.category === category).length || 0;
                const isActive = selectedCategory === category;
                return (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                    style={{
                      backgroundColor: isActive ? colors.accent.primary : colors.bg.secondary,
                      color: isActive ? colors.text.inverse : colors.text.secondary,
                      border: `1px solid ${isActive ? colors.accent.primary : colors.border.default}`,
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {category} ({count})
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            className="mb-8 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {/* Section divider */}
            <div
              className="absolute -top-4 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${colors.border.emphasis}, transparent)`,
              }}
            />
            <p className="text-sm text-center pt-4" style={{ color: colors.text.tertiary }}>
              {filteredAgents.length} {filteredAgents.length === 1 ? 'feature' : 'features'} found
            </p>
          </motion.div>

          {/* Agents Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredAgents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Card variant={(index === 0 || index === filteredAgents.length - 1) ? 'accent' : 'default'} tilt interactive>
                    <div className="flex items-start gap-4">
                      <CardIcon variant="accent">◆</CardIcon>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle>{agent.name}</CardTitle>
                          <CardBadge variant="accent">{agent.category}</CardBadge>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {agent.description}
                        </CardDescription>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredAgents.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div
                className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: colors.bg.secondary }}
              >
                <span className="text-2xl" style={{ color: colors.text.tertiary }}>◇</span>
              </div>
              <p className="font-medium mb-2" style={{ color: colors.text.secondary }}>
                No features found
              </p>
              <p className="text-sm" style={{ color: colors.text.tertiary }}>
                Try adjusting your search or filters
              </p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
