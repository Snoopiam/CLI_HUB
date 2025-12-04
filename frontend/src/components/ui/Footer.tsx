/**
 * Footer - Shared footer component for all pages
 *
 * Consistent branding and links across the application.
 */

import { motion } from 'framer-motion';
import { colors } from '../../design/system';

const APP_VERSION = 'v1.0.0 beta';

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
          {/* Left side - Branding */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold" style={{ color: colors.text.secondary }}>
              Mjölnir
            </span>
            <span className="text-xs" style={{ color: colors.text.tertiary }}>
              ·
            </span>
            <motion.a
              href="https://github.com/Snoopiam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium transition-colors"
              style={{ color: colors.text.tertiary }}
              whileHover={{ color: colors.accent.primary }}
            >
              <span className="border-b border-transparent hover:border-current">SnoopLABS</span>
            </motion.a>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: colors.bg.secondary,
                color: colors.text.tertiary,
                border: `1px solid ${colors.border.default}`,
              }}
            >
              {APP_VERSION}
            </span>
          </div>

          {/* Right side - Links */}
          <div className="flex items-center gap-6">
            <motion.a
              href="https://github.com/Snoopiam/CLI_HUB"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium flex items-center gap-2"
              style={{ color: colors.text.tertiary }}
              whileHover={{ color: colors.accent.primary }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub
            </motion.a>
            <span
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: colors.border.emphasis }}
            />
            <span className="text-sm" style={{ color: colors.text.tertiary }}>
              Powered by <span style={{ color: colors.accent.primary }}>Claude Code</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
