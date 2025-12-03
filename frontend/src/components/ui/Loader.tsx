/**
 * Loader - Elegant loading indicator
 *
 * A sophisticated, minimal loader that feels intentional.
 * Three concentric rings that pulse with purpose.
 */

import { motion } from 'framer-motion';
import { colors } from '../../design/system';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

const sizes = {
  sm: { outer: 32, middle: 24, inner: 16, stroke: 1.5 },
  md: { outer: 56, middle: 42, inner: 28, stroke: 2 },
  lg: { outer: 80, middle: 60, inner: 40, stroke: 2.5 },
};

export default function Loader({ size = 'md', label, className = '' }: LoaderProps) {
  const s = sizes[size];
  const center = s.outer / 2;

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className="relative" style={{ width: s.outer, height: s.outer }}>
        <svg
          width={s.outer}
          height={s.outer}
          viewBox={`0 0 ${s.outer} ${s.outer}`}
          fill="none"
        >
          {/* Outer ring - slowest */}
          <motion.circle
            cx={center}
            cy={center}
            r={(s.outer - s.stroke * 2) / 2}
            stroke={colors.border.emphasis}
            strokeWidth={s.stroke}
            strokeLinecap="round"
            strokeDasharray={`${Math.PI * (s.outer - s.stroke * 2) * 0.25} ${Math.PI * (s.outer - s.stroke * 2) * 0.75}`}
            initial={{ rotate: 0, opacity: 0.3 }}
            animate={{
              rotate: 360,
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              rotate: { duration: 3, ease: 'linear', repeat: Infinity },
              opacity: { duration: 2, ease: 'easeInOut', repeat: Infinity },
            }}
            style={{ transformOrigin: 'center' }}
          />

          {/* Middle ring - medium speed */}
          <motion.circle
            cx={center}
            cy={center}
            r={(s.middle - s.stroke * 2) / 2}
            stroke={colors.accent.secondary}
            strokeWidth={s.stroke}
            strokeLinecap="round"
            strokeDasharray={`${Math.PI * (s.middle - s.stroke * 2) * 0.3} ${Math.PI * (s.middle - s.stroke * 2) * 0.7}`}
            initial={{ rotate: 180 }}
            animate={{
              rotate: -180,
            }}
            transition={{
              duration: 2,
              ease: 'linear',
              repeat: Infinity,
            }}
            style={{ transformOrigin: 'center' }}
          />

          {/* Inner ring - fastest, accent color */}
          <motion.circle
            cx={center}
            cy={center}
            r={(s.inner - s.stroke * 2) / 2}
            stroke={colors.accent.primary}
            strokeWidth={s.stroke}
            strokeLinecap="round"
            strokeDasharray={`${Math.PI * (s.inner - s.stroke * 2) * 0.4} ${Math.PI * (s.inner - s.stroke * 2) * 0.6}`}
            initial={{ rotate: 0 }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1.2,
              ease: 'linear',
              repeat: Infinity,
            }}
            style={{ transformOrigin: 'center' }}
          />

          {/* Center dot - breathing */}
          <motion.circle
            cx={center}
            cy={center}
            r={2}
            fill={colors.accent.primary}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
          />
        </svg>
      </div>

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
