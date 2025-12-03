/**
 * Header - Mjölnir Navigation
 *
 * A refined, distinctive header with the Mjölnir brand identity.
 * Clean navigation with visual feedback.
 */

import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { colors } from '../../design/system';

const navItems = [
  { path: '/', label: 'Home', icon: '◇' },
  { path: '/analyze', label: 'Analyze', icon: '◈' },
  { path: '/agents', label: 'Explore', icon: '◆' },
];

export default function Header() {
  const location = useLocation();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: `${colors.bg.primary}dd`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Bottom border with gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.border.default}, ${colors.accent.primary}30, ${colors.border.default}, transparent)`,
        }}
      />

      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo - Mjölnir */}
        <Link to="/" className="flex items-center gap-3 group">
          {/* Logo mark */}
          <motion.div
            className="relative w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${colors.accent.primary}, ${colors.accent.secondary})`,
            }}
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Mjolnir icon (hammer) */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              style={{ color: colors.text.inverse }}
            >
              <path
                d="M6 2h12v6H6V2z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8v14M9 22h6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2), transparent 50%)',
              }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
          </motion.div>

          {/* Logo text */}
          <div className="hidden sm:flex flex-col">
            <span
              className="text-lg font-bold tracking-wide"
              style={{ color: colors.text.primary }}
            >
              Mjölnir ⚡
            </span>
            <span
              className="text-[10px] font-medium tracking-widest uppercase -mt-1"
              style={{ color: colors.text.tertiary }}
            >
              Claude Optimizer
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  className="relative px-4 py-2 rounded-xl flex items-center gap-2"
                  style={{
                    backgroundColor: isActive ? colors.bg.secondary : 'transparent',
                    color: isActive ? colors.text.primary : colors.text.tertiary,
                  }}
                  whileHover={{
                    backgroundColor: colors.bg.secondary,
                    color: colors.text.primary,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-[1px] left-3 right-3 h-0.5 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${colors.accent.primary}, transparent)`,
                      }}
                      layoutId="nav-indicator"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* CTA / External link */}
        <motion.a
          href="https://github.com/Snoopiam"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
          style={{
            backgroundColor: colors.bg.secondary,
            color: colors.text.secondary,
            border: `1px solid ${colors.border.default}`,
          }}
          whileHover={{
            borderColor: colors.accent.primary,
            color: colors.text.primary,
            y: -1,
          }}
          whileTap={{ scale: 0.98 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <span>SnoopLabs</span>
        </motion.a>
      </div>
    </header>
  );
}
