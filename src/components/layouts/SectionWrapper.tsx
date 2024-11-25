// components/layout/SectionWrapper.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useScroll } from '../providers/ScrollProvider';

export const SectionWrapper = ({ children, className = '' }) => {
  const { scrollY } = useScroll();
  
  return (
    <motion.section
      style={{
        y: scrollY * 0.1
      }}
      className={`relative ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 pointer-events-none" />
      {children}
    </motion.section>
  );
};