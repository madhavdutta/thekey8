import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeading = ({ 
  title, 
  subtitle, 
  label,
  className = "", 
  align = "center",
  labelColor = "primary" 
}) => {
  const alignClass = {
    center: "text-center mx-auto",
    left: "text-left",
    right: "text-right ml-auto",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`max-w-3xl mb-16 ${alignClass[align]} ${className}`}
    >
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`inline-block text-${labelColor} text-sm font-medium tracking-wider uppercase mb-4`}
        >
          {label}
        </motion.span>
      )}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold mt-4 mb-6"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-muted-foreground"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};