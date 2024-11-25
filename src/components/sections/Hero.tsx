import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import { QuickCalculator } from './Calculator';
import { SectionWrapper } from '../ui/section-wrapper';
import { useScroll } from '../providers/ScrollProvider';

export const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = Math.max(1 - scrollY / 500, 0);
  const translateY = scrollY * 0.5;

  return (
    <section className="w-full relative min-h-screen pt-20 md:pt-32 overflow-hidden">
      {/* Background Spline */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          transform: `translateY(${translateY}px)`,
          opacity: opacity
        }}
      >
        <Spline scene="https://prod.spline.design/n1iI7dHc7qrQmmib/scene.splinecode" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>
      
      <SectionWrapper 
        container="default"
        className="min-h-[calc(100vh-4rem)]"
      >
        {/* Content */}
        <div className="relative z-10 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
            {/* Left Side - Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                translateY: -scrollY * 0.2
              }}
              className="space-y-8 md:space-y-12 text-center lg:text-left"
            >
              <div className="relative">
                <h1 className="text-[clamp(2.5rem,5vw,4rem)] md:text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.1] md:leading-none">
                  <span className="block">Future of</span>
                  <span className="block">Mortgage</span>
                  <span className="relative block">
                    {/* Background gradient for clip effect */}
                    <span className="absolute inset-0 bg-gradient-primary blur-3xl opacity-25" />
                    <span className="relative bg-gradient-primary bg-clip-text text-transparent">
                      Simplified.
                    </span>
                  </span>
                </h1>
              </div>

              <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Experience seamless mortgage solutions with competitive rates and expert guidance
                tailored to your needs.
              </p>

              <div className="flex items-center justify-center lg:justify-start gap-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  {/* Enhanced glow effect */}
                  <span className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" />
                  <span className="relative px-8 py-4 bg-primary text-primary-foreground rounded-full inline-flex items-center gap-2 font-medium">
                    Start Journey 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </motion.button>
              </div>
            </motion.div>

            {/* Right Side - Calculator */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                translateY: -scrollY * 0.1
              }}
              transition={{ delay: 0.3 }}
              className="relative w-full max-w-xl mx-auto lg:mx-0"
            >
              <div className="relative">
                {/* Calculator glow effect */}
                <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-3xl" />
                <QuickCalculator />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            opacity: scrollY > 100 ? 0 : 1
          }}
          transition={{ 
            y: { repeat: Infinity, duration: 1.5 },
            opacity: { duration: 0.3 }
          }}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
        </motion.div>
      </SectionWrapper>
    </section>
  );
};