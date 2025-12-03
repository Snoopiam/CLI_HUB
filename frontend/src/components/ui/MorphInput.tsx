/**
 * MorphInput - The Signature Element
 *
 * A commanding input that demands attention. Features:
 * - Animated gradient border that flows
 * - Responsive glow effects
 * - Smooth transformations
 * - Visual feedback that feels alive
 *
 * This is THE focal point of the application.
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, motion as motionConfig } from '../../design/system';
import { InlineLoader } from './Loader';

interface MorphInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  minLength?: number;
  className?: string;
}

export default function MorphInput({
  placeholder = 'What would you like to build?',
  value,
  onChange,
  onSubmit,
  isLoading = false,
  minLength = 3,
  className = '',
}: MorphInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isValid = value.trim().length >= minLength;
  const showButton = value.length > 0 || isFocused;

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && isValid && !isLoading) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <motion.div
      className={`relative w-full max-w-2xl mx-auto ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={motionConfig.transition.default}
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl overflow-hidden"
        style={{
          background: isFocused
            ? `linear-gradient(135deg, ${colors.accent.primary}, ${colors.accent.secondary}, ${colors.accent.primary})`
            : `linear-gradient(135deg, ${colors.border.emphasis}, ${colors.border.default}, ${colors.border.emphasis})`,
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: isFocused ? ['0% 0%', '100% 100%', '0% 0%'] : '0% 0%',
        }}
        transition={{
          duration: 3,
          repeat: isFocused ? Infinity : 0,
          ease: 'linear',
        }}
      />

      {/* Outer glow */}
      <motion.div
        className="absolute -inset-4 rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${colors.accent.primary}15, transparent 70%)`,
        }}
        animate={{
          opacity: isFocused ? 1 : isHovered ? 0.4 : 0,
          scale: isFocused ? 1.05 : 1,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Main container */}
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        style={{
          backgroundColor: colors.bg.secondary,
        }}
      >
        {/* Input area */}
        <div className="relative p-5 pb-14">
          {/* Animated placeholder */}
          <AnimatePresence>
            {!value && !isFocused && (
              <motion.span
                className="absolute left-5 top-5 pointer-events-none text-lg"
                style={{ color: colors.text.tertiary }}
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {placeholder}
              </motion.span>
            )}
          </AnimatePresence>

          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            rows={1}
            className="w-full bg-transparent text-lg resize-none focus:outline-none"
            style={{
              color: colors.text.primary,
              minHeight: '28px',
            }}
          />

          {/* Character hint */}
          <AnimatePresence>
            {value.length > 0 && value.length < minLength && (
              <motion.span
                className="absolute right-5 top-5 text-xs"
                style={{ color: colors.text.tertiary }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {minLength - value.length} more
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom bar with submit button */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 px-5 py-3 flex items-center justify-between"
          style={{
            backgroundColor: colors.bg.tertiary,
            borderTop: `1px solid ${colors.border.subtle}`,
          }}
        >
          {/* Hint text */}
          <motion.span
            className="text-xs"
            style={{ color: colors.text.tertiary }}
            animate={{ opacity: isFocused ? 1 : 0.5 }}
          >
            Press <kbd className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bg.hover }}>Enter</kbd> to analyze
          </motion.span>

          {/* Submit button */}
          <AnimatePresence>
            {showButton && (
              <motion.button
                onClick={onSubmit}
                disabled={!isValid || isLoading}
                className="px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2"
                style={{
                  backgroundColor: isValid ? colors.accent.primary : colors.bg.hover,
                  color: isValid ? colors.text.inverse : colors.text.tertiary,
                  boxShadow: isValid ? `0 4px 20px ${colors.accent.glow}` : 'none',
                }}
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                whileHover={isValid && !isLoading ? { scale: 1.05, boxShadow: `0 8px 30px ${colors.accent.glow}` } : {}}
                whileTap={isValid && !isLoading ? { scale: 0.95 } : {}}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {isLoading ? (
                  <>
                    <InlineLoader />
                    <span>Analyzing</span>
                  </>
                ) : (
                  <>
                    <span>Analyze</span>
                    <motion.svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      animate={{ x: isValid ? [0, 4, 0] : 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1.5 }}
                    >
                      <path
                        d="M3.5 9h11M10 4.5l4.5 4.5-4.5 4.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </>
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
