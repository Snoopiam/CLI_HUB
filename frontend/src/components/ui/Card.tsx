/**
 * Card - Unified card abstraction for PRISM
 *
 * Provides consistent card styling across all pages with variant support:
 * - default: Standard dark card
 * - accent: Warm accent-tinted card (Home feature types)
 * - light: Light background card (Analyze results)
 * - category: Category-aware tinted cards (Explore)
 *
 * Includes optional built-in Tilt effect for interactive cards.
 */

import { ReactNode, useState, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { colors } from '../../design/system';
import Tilt from './Tilt';

// Category color mappings for Explore cards
// Each category gets a subtle, distinctive tint while staying within the warm palette
const categoryColors: Record<string, string> = {
  // Agent-related categories - warm gold tones
  agents: 'rgba(212, 165, 116, 0.08)',
  agent: 'rgba(212, 165, 116, 0.08)',

  // Skills - neutral with slight warmth
  skills: 'rgba(200, 180, 160, 0.06)',
  skill: 'rgba(200, 180, 160, 0.06)',

  // MCP Servers - cool blue-gray for technical feel
  mcps: 'rgba(150, 180, 200, 0.07)',
  mcp: 'rgba(150, 180, 200, 0.07)',
  integration: 'rgba(150, 180, 200, 0.07)',

  // Hooks - soft mauve/purple for lifecycle events
  hooks: 'rgba(200, 160, 180, 0.06)',
  hook: 'rgba(200, 160, 180, 0.06)',
  lifecycle: 'rgba(200, 160, 180, 0.06)',

  // Commands - teal for action-oriented
  commands: 'rgba(160, 200, 180, 0.06)',
  command: 'rgba(160, 200, 180, 0.06)',

  // CLAUDE.md - warm gold (prominent like agents)
  claudemd: 'rgba(212, 165, 116, 0.08)',
  context: 'rgba(212, 165, 116, 0.08)',

  // Settings - neutral gray
  settings: 'rgba(180, 180, 180, 0.06)',
  setting: 'rgba(180, 180, 180, 0.06)',
  configuration: 'rgba(180, 180, 180, 0.06)',

  // Development categories
  development: 'rgba(180, 200, 160, 0.06)',
  testing: 'rgba(160, 180, 200, 0.06)',
  debugging: 'rgba(200, 160, 160, 0.06)',
  documentation: 'rgba(180, 180, 200, 0.06)',

  // Fallback
  default: 'rgba(180, 180, 180, 0.04)',
};

export type CardVariant = 'default' | 'accent' | 'light' | 'category';

export interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  category?: string;
  tilt?: boolean | { rotationFactor?: number; isReverse?: boolean };
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  style?: React.CSSProperties;
}

interface CardContentProps {
  children: ReactNode;
  variant: CardVariant;
  category?: string;
  interactive: boolean;
  className: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, variant, category, interactive, className, onClick, style }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    // Compute background color based on variant
    const getBackgroundColor = () => {
      switch (variant) {
        case 'accent':
          return `rgba(212, 165, 116, 0.03)`;
        case 'light':
          return '#FAFAFA';
        case 'category':
          return categoryColors[category?.toLowerCase() || 'default'] || categoryColors.default;
        default:
          return colors.bg.secondary;
      }
    };

    // Compute border style based on variant
    const getBorderStyle = () => {
      if (variant === 'accent') {
        return 'none'; // Uses border-gradient class
      }
      if (variant === 'light') {
        return `1px solid ${colors.border.default}`;
      }
      return `1px solid ${colors.border.default}`;
    };

    // Compute text colors for light variant
    const getTextColors = () => {
      if (variant === 'light') {
        return {
          primary: colors.text.light.primary,
          secondary: colors.text.light.secondary,
          tertiary: colors.text.light.tertiary,
        };
      }
      return {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
        tertiary: colors.text.tertiary,
      };
    };

    const textColors = getTextColors();

    return (
      <motion.div
        ref={ref}
        className={`relative p-6 rounded-2xl overflow-hidden ${
          variant === 'accent' ? 'border-gradient' : ''
        } ${interactive ? 'cursor-pointer group' : ''} ${className}`}
        style={{
          backgroundColor: getBackgroundColor(),
          border: getBorderStyle(),
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          // Expose text colors as CSS custom properties for children
          '--card-text-primary': textColors.primary,
          '--card-text-secondary': textColors.secondary,
          '--card-text-tertiary': textColors.tertiary,
          ...style,
        } as React.CSSProperties}
        onMouseEnter={(e) => {
          setIsHovered(true);
          if (interactive && variant !== 'accent') {
            e.currentTarget.style.borderColor = colors.accent.primary;
          }
          if (interactive) {
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
          }
        }}
        onMouseLeave={(e) => {
          setIsHovered(false);
          if (interactive && variant !== 'accent') {
            e.currentTarget.style.borderColor = colors.border.default;
          }
          if (interactive) {
            e.currentTarget.style.boxShadow = 'none';
          }
        }}
        onClick={onClick}
      >
        {/* Shimmer effect on hover for interactive cards */}
        {interactive && (
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, transparent, ${colors.accent.primary}05, transparent)`,
              }}
            />
          </div>
        )}

        {/* Content wrapper with relative positioning */}
        <div className="relative">{children}</div>
      </motion.div>
    );
  }
);

CardContent.displayName = 'CardContent';

export default function Card({
  children,
  variant = 'default',
  category,
  tilt = false,
  className = '',
  onClick,
  interactive = true,
  style,
}: CardProps) {
  // Determine tilt configuration
  const tiltEnabled = tilt !== false;
  const tiltConfig = typeof tilt === 'object' ? tilt : {};
  const rotationFactor = tiltConfig.rotationFactor ?? 8;
  const isReverse = tiltConfig.isReverse ?? true;

  const cardContent = (
    <CardContent
      variant={variant}
      category={category}
      interactive={interactive}
      className={className}
      onClick={onClick}
      style={style}
    >
      {children}
    </CardContent>
  );

  if (tiltEnabled) {
    return (
      <Tilt rotationFactor={rotationFactor} isReverse={isReverse}>
        {cardContent}
      </Tilt>
    );
  }

  return cardContent;
}

/**
 * CardIcon - Consistent icon container for cards
 */
export function CardIcon({
  children,
  variant = 'default',
  className = '',
}: {
  children: ReactNode;
  variant?: 'default' | 'accent';
  className?: string;
}) {
  return (
    <div
      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg] ${className}`}
      style={{
        backgroundColor: variant === 'accent' ? colors.accent.muted : colors.bg.tertiary,
        color: variant === 'accent' ? colors.accent.primary : colors.text.tertiary,
      }}
    >
      {children}
    </div>
  );
}

/**
 * CardTitle - Consistent title styling for cards
 */
export function CardTitle({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={`font-semibold ${className}`}
      style={{ color: 'var(--card-text-primary, ' + colors.text.primary + ')' }}
    >
      {children}
    </h3>
  );
}

/**
 * CardDescription - Consistent description styling for cards
 */
export function CardDescription({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-sm ${className}`}
      style={{ color: 'var(--card-text-tertiary, ' + colors.text.tertiary + ')' }}
    >
      {children}
    </p>
  );
}

/**
 * CardBadge - Consistent badge/tag styling for cards
 */
export function CardBadge({
  children,
  variant = 'default',
  className = '',
}: {
  children: ReactNode;
  variant?: 'default' | 'accent';
  className?: string;
}) {
  return (
    <span
      className={`px-2.5 py-1 rounded-lg text-xs font-medium ${className}`}
      style={{
        backgroundColor: variant === 'accent' ? colors.accent.muted : colors.bg.tertiary,
        color: variant === 'accent' ? colors.accent.primary : colors.text.tertiary,
      }}
    >
      {children}
    </span>
  );
}

