import React from 'react';
import { Moon, Sun, Stars } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/themecontext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative h-10 w-10 rounded-full overflow-hidden glass-light dark:glass-dark hover-lift shadow-custom"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {theme === 'dark' ? (
            <div className="relative">
              <Moon className="h-5 w-5 text-primary" />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-0 right-0"
              >
                <Stars className="h-3 w-3 text-secondary" />
              </motion.div>
            </div>
          ) : (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sun className="h-5 w-5 text-primary" />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}