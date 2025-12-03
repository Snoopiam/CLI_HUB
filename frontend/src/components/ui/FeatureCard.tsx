/**
 * FeatureCard - Recommendation display card
 *
 * Elegant card for displaying Claude Code features with
 * sophisticated hover states and copy interaction.
 * Now uses the unified Card component with Tilt support.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, motion as motionConfig } from '../../design/system';
import Card from './Card';

interface FeatureCardProps {
  type: string;
  name: string;
  description: string;
  installCommand?: string;
  score?: number;
  matchReasons?: string[];
  isPriority?: boolean;
  index?: number;
  variant?: 'default' | 'light';
}

// Type icons - minimal, monochrome
const typeIcons: Record<string, string> = {
  agent: 'A',
  skill: 'S',
  mcp: 'M',
  hook: 'H',
  command: '/',
  setting: '*',
  claudemd: '#',
};

// Type labels
const typeLabels: Record<string, string> = {
  agent: 'Agent',
  skill: 'Skill',
  mcp: 'MCP Server',
  hook: 'Hook',
  command: 'Command',
  setting: 'Setting',
  claudemd: 'CLAUDE.md',
};

export default function FeatureCard({
  type,
  name,
  description,
  installCommand,
  score,
  matchReasons = [],
  isPriority = false,
  index = 0,
  variant = 'default',
}: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!installCommand) return;

    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Determine text colors based on variant
  const textColors = variant === 'light'
    ? {
        primary: colors.text.light.primary,
        secondary: colors.text.light.secondary,
        tertiary: colors.text.light.tertiary,
      }
    : {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
        tertiary: colors.text.tertiary,
      };

  // Background colors for internal elements based on variant
  const bgColors = variant === 'light'
    ? {
        badge: 'rgba(0, 0, 0, 0.06)',
        code: 'rgba(0, 0, 0, 0.04)',
        codeBorder: 'rgba(0, 0, 0, 0.1)',
      }
    : {
        badge: colors.bg.tertiary,
        code: colors.bg.primary,
        codeBorder: colors.border.subtle,
      };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        ...motionConfig.transition.default,
        delay: index * 0.05,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Priority indicator line */}
      {isPriority && (
        <motion.div
          className="absolute -left-3 top-4 bottom-4 w-0.5 rounded-full z-10"
          style={{ backgroundColor: colors.accent.primary }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: index * 0.05 + 0.2 }}
        />
      )}

      <Card
        variant={variant}
        tilt
        interactive
        onClick={handleCopy}
        className="p-5 rounded-xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            {/* Type badge */}
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono font-semibold transition-all duration-300 group-hover:scale-110"
              style={{
                backgroundColor: bgColors.badge,
                color: textColors.secondary,
              }}
            >
              {typeIcons[type] || '?'}
            </div>

            <div>
              <h3 className="font-semibold" style={{ color: textColors.primary }}>
                {name}
              </h3>
              <span className="text-xs" style={{ color: textColors.tertiary }}>
                {typeLabels[type] || type}
              </span>
            </div>
          </div>

          {/* Score badge */}
          {score !== undefined && (
            <div
              className="px-2 py-1 rounded text-xs font-mono"
              style={{
                backgroundColor: bgColors.badge,
                color: score >= 80 ? colors.accent.primary : textColors.tertiary,
              }}
            >
              {score}%
            </div>
          )}
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: textColors.secondary }}
        >
          {description}
        </p>

        {/* Match reasons */}
        <AnimatePresence>
          {isHovered && matchReasons.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-1.5 mb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {matchReasons.map((reason, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded text-xs"
                  style={{
                    backgroundColor: colors.accent.muted,
                    color: colors.accent.primary,
                  }}
                >
                  {reason}
                </span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Install command */}
        {installCommand && (
          <div
            className="relative p-3 rounded-lg font-mono text-sm overflow-hidden"
            style={{
              backgroundColor: bgColors.code,
              border: `1px solid ${bgColors.codeBorder}`,
            }}
          >
            <code style={{ color: textColors.secondary }}>{installCommand}</code>

            {/* Copy feedback */}
            <AnimatePresence>
              {copied && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center rounded-lg"
                  style={{ backgroundColor: colors.accent.primary }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="text-sm font-medium" style={{ color: colors.text.inverse }}>
                    Copied!
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Hover hint */}
        <AnimatePresence>
          {isHovered && installCommand && !copied && (
            <motion.div
              className="absolute top-3 right-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="text-xs" style={{ color: textColors.tertiary }}>
                Click to copy
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle hover gradient */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            background: variant === 'light'
              ? `linear-gradient(135deg, transparent 60%, rgba(212, 165, 116, 0.1))`
              : `linear-gradient(135deg, transparent 60%, ${colors.accent.muted})`,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
}

// Compact variant for inline display
export function FeatureChip({
  type,
  name,
  onClick,
}: {
  type: string;
  name: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
      style={{
        backgroundColor: colors.bg.secondary,
        border: `1px solid ${colors.border.default}`,
        color: colors.text.secondary,
      }}
      whileHover={{
        borderColor: colors.border.emphasis,
        color: colors.text.primary,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <span
        className="w-5 h-5 rounded flex items-center justify-center text-xs font-mono"
        style={{ backgroundColor: colors.bg.tertiary }}
      >
        {typeIcons[type] || '?'}
      </span>
      {name}
    </motion.button>
  );
}
