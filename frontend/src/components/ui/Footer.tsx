/**
 * Footer - Shared footer component for all pages
 *
 * Consistent branding and links across the application.
 */

import { motion } from 'framer-motion';
import { colors } from '../../design/system';

export default function Footer() {
  return (
    <footer className="py-12 px-6 relative">
      {/* Section divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.border.subtle}, transparent)`,
        }}
      />

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span
              className="text-sm font-bold"
              style={{ color: colors.text.secondary }}
            >
              Mjölnir ⚡
            </span>
            <span
              className="text-xs"
              style={{ color: colors.text.tertiary }}
            >
              by SnoopLabs
            </span>
          </div>
          <div className="flex items-center gap-6">
            <motion.a
              href="https://github.com/Snoopiam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium"
              style={{ color: colors.text.tertiary }}
              whileHover={{ color: colors.accent.primary }}
            >
              GitHub
            </motion.a>
            <span
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: colors.border.emphasis }}
            />
            <span
              className="text-sm"
              style={{ color: colors.text.tertiary }}
            >
              Powered by{' '}
              <span style={{ color: colors.accent.primary }}>Claude Code</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
