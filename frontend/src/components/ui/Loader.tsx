/**
 * Loader - Mjölnir Triquetra loading indicator
 *
 * Features the triquetra symbol from the Mjölnir brand,
 * with a pulsing glow animation.
 */

import { motion } from 'framer-motion';
import { colors } from '../../design/system';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

const sizes = {
  sm: { icon: 32 },
  md: { icon: 56 },
  lg: { icon: 80 },
};

export default function Loader({ size = 'md', label, className = '' }: LoaderProps) {
  const s = sizes[size];

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <motion.div
        className="relative"
        style={{ width: s.icon, height: s.icon }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      >
        {/* Glow effect behind the icon */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${colors.accent.primary}40 0%, transparent 70%)`,
            filter: 'blur(8px)',
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        />

        {/* Triquetra icon */}
        <motion.img
          src="/triquetra-icon.png"
          alt="Loading..."
          className="relative z-10"
          style={{ width: s.icon, height: s.icon }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            ease: 'linear',
            repeat: Infinity,
          }}
        />
      </motion.div>

      {label && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm font-medium tracking-wide"
          style={{ color: colors.text.tertiary }}
        >
          {label}
        </motion.p>
      )}
    </div>
  );
}

// Inline variant for buttons/small spaces
export function InlineLoader({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`flex gap-1 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: colors.accent.primary }}
          animate={{
            y: [-2, 2, -2],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 0.8,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </motion.div>
  );
}
