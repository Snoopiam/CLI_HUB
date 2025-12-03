/**
 * =============================================================================
 * DESIGN SYSTEM - Mjölnir
 * =============================================================================
 *
 * A distinctive design language: Refined. Intelligent. Purposeful.
 *
 * Philosophy:
 * - Monochrome foundation with intentional accent
 * - Motion that feels natural, not decorative
 * - Interactions that reward attention
 * - Typography that commands respect
 * =============================================================================
 */

// Color System - Sophisticated monochrome with a warm accent
export const colors = {
  // Core grays - warm undertones
  bg: {
    primary: '#0A0A0A',    // Near black
    secondary: '#111111',  // Card backgrounds
    tertiary: '#1A1A1A',   // Elevated surfaces
    hover: '#222222',      // Hover states
  },

  // Text hierarchy
  text: {
    primary: '#FAFAFA',    // Headlines
    secondary: '#A3A3A3',  // Body text
    tertiary: '#6B6B6B',   // Muted/labels
    inverse: '#0A0A0A',    // On light backgrounds
    // Light mode variants (for light card backgrounds)
    light: {
      primary: '#0A0A0A',    // Dark text on light bg
      secondary: '#4A4A4A',  // Medium gray on light bg
      tertiary: '#6B6B6B',   // Light gray on light bg
    },
  },

  // Borders and dividers
  border: {
    subtle: '#1F1F1F',     // Barely visible
    default: '#2A2A2A',    // Standard borders
    emphasis: '#3A3A3A',   // Emphasized borders
  },

  // Accent - A warm, sophisticated tone (not typical AI blue/purple)
  accent: {
    primary: '#D4A574',    // Warm gold/bronze
    secondary: '#B8956A',  // Darker variant
    muted: 'rgba(212, 165, 116, 0.1)',  // Background tint
    glow: 'rgba(212, 165, 116, 0.2)',   // Glow effect
  },

  // Semantic
  success: '#4ADE80',
  warning: '#FBBF24',
  error: '#F87171',
} as const;

// Typography - Arboria from Adobe Fonts
export const typography = {
  // Font families
  family: {
    sans: '"arboria", sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
  },

  // Size scale (rem)
  size: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '2rem',     // 32px
    '4xl': '2.5rem',   // 40px
    '5xl': '3.5rem',   // 56px
  },

  // Font weights
  weight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line heights
  leading: {
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Letter spacing
  tracking: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// Spacing scale
export const spacing = {
  px: '1px',
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
} as const;

// Animation - Smooth, natural motion
export const motion = {
  // Durations
  duration: {
    instant: 0.1,
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8,
  },

  // Easing curves
  ease: {
    // Standard easing
    default: [0.4, 0, 0.2, 1],
    // Smooth deceleration
    out: [0, 0, 0.2, 1],
    // Quick acceleration
    in: [0.4, 0, 1, 1],
    // Bouncy for emphasis
    bounce: [0.34, 1.56, 0.64, 1],
    // Elastic for playful interactions
    elastic: [0.68, -0.55, 0.265, 1.55],
  },

  // Common transitions
  transition: {
    default: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    fast: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    slow: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    spring: { type: 'spring', stiffness: 400, damping: 30 },
    springBouncy: { type: 'spring', stiffness: 300, damping: 20 },
  },
} as const;

// Shadows - Subtle, layered depth
export const shadows = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  md: '0 4px 6px rgba(0, 0, 0, 0.3)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.4)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.4)',
  glow: '0 0 20px rgba(212, 165, 116, 0.15)',
  glowStrong: '0 0 40px rgba(212, 165, 116, 0.25)',
} as const;

// Border radius
export const radius = {
  none: '0',
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
} as const;

// Z-index scale
export const zIndex = {
  behind: -1,
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  popover: 500,
  toast: 600,
  tooltip: 700,
} as const;

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Export combined system
export const designSystem = {
  colors,
  typography,
  spacing,
  motion,
  shadows,
  radius,
  zIndex,
  breakpoints,
} as const;

export default designSystem;
