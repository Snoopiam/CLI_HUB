/**
 * AnimatedBackground - Living, breathing backdrop
 *
 * Creates visual interest through:
 * - Slow-moving gradient orbs
 * - Subtle grain texture
 * - Depth through layering
 *
 * Minimalist doesn't mean static.
 */

import { useEffect, useRef } from 'react';
import { motion, type Easing } from 'framer-motion';
import { colors } from '../../design/system';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'hero' | 'subtle';
}

// Animation config for orbs
const createOrbAnimation = (index: number) => ({
  x: [0, 30, -20, 10, 0],
  y: [0, -40, 20, -10, 0],
  scale: [1, 1.1, 0.95, 1.05, 1],
  transition: {
    duration: 20 + index * 5,
    repeat: Infinity,
    ease: 'easeInOut' as Easing,
  },
});

export default function AnimatedBackground({ variant = 'default' }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container || variant === 'subtle') return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;

      container.style.setProperty('--mouse-x', `${x}px`);
      container.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [variant]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -1 }}
    >
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, ${colors.accent.primary}08, transparent),
            radial-gradient(ellipse 60% 40% at 100% 100%, ${colors.accent.secondary}05, transparent),
            ${colors.bg.primary}
          `,
        }}
      />

      {/* Animated orbs */}
      {variant !== 'subtle' && (
        <>
          {/* Primary orb - warm accent */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
            style={{
              background: `radial-gradient(circle, ${colors.accent.primary}15, transparent 70%)`,
              left: '10%',
              top: '20%',
              transform: 'translate(var(--mouse-x, 0), var(--mouse-y, 0))',
            }}
            animate={createOrbAnimation(0)}
          />

          {/* Secondary orb */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
            style={{
              background: `radial-gradient(circle, ${colors.accent.secondary}12, transparent 70%)`,
              right: '5%',
              top: '60%',
              transform: 'translate(calc(var(--mouse-x, 0) * -0.5), calc(var(--mouse-y, 0) * -0.5))',
            }}
            animate={createOrbAnimation(1)}
          />

          {/* Accent orb - smaller, more saturated */}
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full blur-[80px]"
            style={{
              background: `radial-gradient(circle, ${colors.accent.primary}20, transparent 70%)`,
              left: '60%',
              top: '10%',
            }}
            animate={createOrbAnimation(2)}
          />
        </>
      )}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(${colors.text.primary}10 1px, transparent 1px),
            linear-gradient(90deg, ${colors.text.primary}10 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 70% at 50% 50%, transparent, ${colors.bg.primary}90)`,
        }}
      />
    </div>
  );
}

/**
 * GlowOrb - A reusable glowing orb for accent
 */
export function GlowOrb({
  size = 200,
  color = colors.accent.primary,
  blur = 60,
  opacity = 0.3,
  className = '',
}: {
  size?: number;
  color?: string;
  blur?: number;
  opacity?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        filter: `blur(${blur}px)`,
        opacity,
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [opacity, opacity * 1.2, opacity],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}
