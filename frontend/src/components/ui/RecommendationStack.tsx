/**
 * RecommendationStack - Grouped recommendations display
 *
 * Organizes and displays recommendations by type with
 * elegant section headers and staggered animations.
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, motion as motionConfig } from '../../design/system';
import FeatureCard from './FeatureCard';
import type { ScoredFeature, RecommendationResult } from '../../types';

interface RecommendationStackProps {
  result: RecommendationResult;
  onBack?: () => void;
  /** Card variant for all recommendation cards */
  cardVariant?: 'default' | 'light';
}

// Section configuration
const sections: Array<{
  type: keyof RecommendationResult['recommendations'];
  label: string;
  icon: string;
  description: string;
}> = [
  { type: 'agents', label: 'Agents', icon: 'A', description: 'Specialized AI assistants' },
  { type: 'skills', label: 'Skills', icon: 'S', description: 'Reusable workflows' },
  { type: 'mcps', label: 'MCP Servers', icon: 'M', description: 'External integrations' },
  { type: 'hooks', label: 'Hooks', icon: 'H', description: 'Lifecycle automation' },
  { type: 'commands', label: 'Commands', icon: '/', description: 'Quick actions' },
  { type: 'settings', label: 'Settings', icon: '*', description: 'Configuration' },
  { type: 'claudemd', label: 'CLAUDE.md', icon: '#', description: 'Project context' },
];

export default function RecommendationStack({ result, onBack, cardVariant = 'default' }: RecommendationStackProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Get all recommendations as flat array for priority items
  const allRecommendations = useMemo(() => {
    const all: ScoredFeature[] = [];
    Object.values(result.recommendations).forEach((items: ScoredFeature[]) => {
      all.push(...items);
    });
    return all;
  }, [result.recommendations]);

  // Get priority items
  const priorityItems = allRecommendations.filter((r) => r.isPriority);

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={motionConfig.transition.default}
    >
      {/* Header with summary */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Back button */}
        {onBack && (
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 mb-6 text-sm transition-colors"
            style={{ color: colors.text.tertiary }}
            whileHover={{ color: colors.text.primary, x: -4 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Start over
          </motion.button>
        )}

        {/* Summary card */}
        <div
          className="p-6 rounded-xl"
          style={{
            backgroundColor: colors.bg.secondary,
            border: `1px solid ${colors.border.default}`,
          }}
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2
                className="text-2xl font-semibold mb-2"
                style={{ color: colors.text.primary }}
              >
                Your Recommendations
              </h2>
              <p style={{ color: colors.text.secondary }}>
                {result.summary.totalRecommendations} features matched for{' '}
                <span style={{ color: colors.accent.primary }}>
                  {result.analysis.topCategories.join(', ')}
                </span>
              </p>
            </div>

            {/* Stat badges */}
            <div className="flex gap-2">
              {result.summary.topPriority.length > 0 && (
                <div
                  className="px-3 py-1.5 rounded-lg text-sm font-medium"
                  style={{
                    backgroundColor: colors.accent.muted,
                    color: colors.accent.primary,
                  }}
                >
                  {result.summary.topPriority.length} priority
                </div>
              )}
            </div>
          </div>

          {/* Detected keywords */}
          {result.analysis.detectedKeywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {result.analysis.detectedKeywords.slice(0, 8).map((keyword: string) => (
                <span
                  key={keyword}
                  className="px-2 py-1 rounded text-xs font-mono"
                  style={{
                    backgroundColor: colors.bg.tertiary,
                    color: colors.text.tertiary,
                  }}
                >
                  {keyword}
                </span>
              ))}
              {result.analysis.detectedKeywords.length > 8 && (
                <span
                  className="px-2 py-1 rounded text-xs"
                  style={{ color: colors.text.tertiary }}
                >
                  +{result.analysis.detectedKeywords.length - 8} more
                </span>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Priority section */}
      {priorityItems.length > 0 && (
        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: colors.accent.muted }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{ color: colors.accent.primary }}
              >
                <path
                  d="M8 2L10 6l4 .5-3 3 .5 4L8 11.5 4.5 13.5l.5-4-3-3L6 6l2-4z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: colors.text.primary }}>
                Top Priority
              </h3>
              <p className="text-sm" style={{ color: colors.text.tertiary }}>
                Start with these for best results
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {priorityItems.map((item: ScoredFeature, index: number) => (
              <FeatureCard
                key={`${item.type}-${item.feature.id}`}
                type={item.type}
                name={item.feature.name}
                description={item.feature.description}
                installCommand={item.feature.installCommand}
                score={item.score}
                matchReasons={item.matchReasons}
                isPriority={true}
                index={index}
                variant={cardVariant}
              />
            ))}
          </div>
        </motion.section>
      )}

      {/* All sections */}
      <div className="space-y-4">
        {sections.map((section, sectionIndex) => {
          const items = result.recommendations[section.type];
          if (!items || items.length === 0) return null;

          const isExpanded = expandedSection === section.type;
          const displayItems = isExpanded ? items : items.slice(0, 2);
          const hasMore = items.length > 2;

          return (
            <motion.section
              key={section.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + sectionIndex * 0.05 }}
            >
              {/* Section header */}
              <div
                className="flex items-center justify-between p-4 rounded-xl mb-3 cursor-pointer transition-colors"
                style={{
                  backgroundColor: colors.bg.secondary,
                  border: `1px solid ${colors.border.default}`,
                }}
                onClick={() => setExpandedSection(isExpanded ? null : section.type)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-semibold text-sm"
                    style={{
                      backgroundColor: colors.bg.tertiary,
                      color: colors.text.secondary,
                    }}
                  >
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ color: colors.text.primary }}>
                      {section.label}
                    </h3>
                    <p className="text-sm" style={{ color: colors.text.tertiary }}>
                      {items.length} {items.length === 1 ? 'recommendation' : 'recommendations'}
                    </p>
                  </div>
                </div>

                {hasMore && (
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      style={{ color: colors.text.tertiary }}
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </div>

              {/* Section items */}
              <AnimatePresence mode="popLayout">
                <div className="grid gap-3 pl-4">
                  {displayItems.map((item: ScoredFeature, index: number) => (
                    <FeatureCard
                      key={`${item.type}-${item.feature.id}`}
                      type={item.type}
                      name={item.feature.name}
                      description={item.feature.description}
                      installCommand={item.feature.installCommand}
                      score={item.score}
                      matchReasons={item.matchReasons}
                      index={index}
                      variant={cardVariant}
                    />
                  ))}
                </div>
              </AnimatePresence>

              {/* Show more button */}
              {hasMore && !isExpanded && (
                <motion.button
                  className="w-full mt-3 py-2 text-sm transition-colors"
                  style={{ color: colors.text.tertiary }}
                  whileHover={{ color: colors.text.secondary }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedSection(section.type);
                  }}
                >
                  Show {items.length - 2} more
                </motion.button>
              )}
            </motion.section>
          );
        })}
      </div>
    </motion.div>
  );
}
