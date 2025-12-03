/**
 * PageLoader - Unified full-page loading state
 *
 * Provides a consistent loading experience across all pages with:
 * - AnimatedBackground for visual continuity
 * - Header for navigation context
 * - Centered Loader with branded copy
 * - Optional preview text for context
 */

import { motion } from 'framer-motion';
import { colors, motion as motionConfig } from '../../design/system';
import AnimatedBackground from './AnimatedBackground';
import Header from './Header';
import Loader from './Loader';

interface PageLoaderProps {
  /** Main title shown during loading */
  title: string;
  /** Subtitle/description shown below the title */
  subtitle: string;
  /** Optional preview text (e.g., task being analyzed) */
  previewText?: string;
  /** Background variant for AnimatedBackground */
  backgroundVariant?: 'default' | 'hero' | 'subtle';
  /** Whether to show the header */
  showHeader?: boolean;
  /** Loader size */
  loaderSize?: 'sm' | 'md' | 'lg';
}

export default function PageLoader({
  title,
  subtitle,
  previewText,
  backgroundVariant = 'hero',
  showHeader = true,
  loaderSize = 'lg',
}: PageLoaderProps) {
  return (
    <div className="min-h-screen relative" style={{ backgroundColor: colors.bg.primary }}>
      <AnimatedBackground variant={backgroundVariant} />
      {showHeader && <Header />}

      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={motionConfig.transition.default}
        >
          <Loader size={loaderSize} />

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: colors.text.primary }}
            >
              {title}
            </h2>
            <p style={{ color: colors.text.tertiary }}>{subtitle}</p>
          </motion.div>

          {/* Optional preview text */}
          {previewText && (
            <motion.div
              className="mt-6 max-w-md px-5 py-4 rounded-xl text-center mx-auto"
              style={{
                backgroundColor: colors.bg.secondary,
                border: `1px solid ${colors.border.default}`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p
                className="text-sm truncate"
                style={{ color: colors.text.secondary }}
              >
                "{previewText}"
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/**
 * InlinePageLoader - For use within page content (not full-screen)
 *
 * Used for loading states that appear within the page layout,
 * like the Analyze page's loading state during API calls.
 */
export function InlinePageLoader({
  title,
  subtitle,
  previewText,
  loaderSize = 'lg',
}: Omit<PageLoaderProps, 'backgroundVariant' | 'showHeader'>) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Loader size={loaderSize} />

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2
          className="text-2xl font-bold mb-2"
          style={{ color: colors.text.primary }}
        >
          {title}
        </h2>
        <p style={{ color: colors.text.tertiary }}>{subtitle}</p>
      </motion.div>

      {/* Optional preview text */}
      {previewText && (
        <motion.div
          className="mt-6 max-w-md px-5 py-4 rounded-xl text-center"
          style={{
            backgroundColor: colors.bg.secondary,
            border: `1px solid ${colors.border.default}`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p
            className="text-sm truncate"
            style={{ color: colors.text.secondary }}
          >
            "{previewText}"
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

