// components/layouts/Layout.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollProvider } from '../providers/ScrollProvider';
import React from 'react';

export function Layout({ children }) {
  return (
    <ScrollProvider>
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-background text-foreground relative overflow-hidden"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </ScrollProvider>
  );
}