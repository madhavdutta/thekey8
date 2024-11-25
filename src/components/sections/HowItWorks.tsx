// components/sections/home/HowItWorks.tsx
import React from 'react'
import { motion } from 'framer-motion'
import { FileCheck, Search, Calculator, CheckCircle } from 'lucide-react'
import { SectionWrapper } from '../ui/section-wrapper'
import { useScroll } from '../providers/ScrollProvider';
import { SectionHeading } from './SectionHeading';

export function HowItWorks() {
  const { scrollY } = useScroll();

  const steps = [
    {
      icon: Calculator,
      title: "Quick Pre-Check",
      description: "Get instant feedback on your mortgage eligibility with our 2-minute assessment.",
      color: "from-violet-500 to-violet-700"
    },
    {
      icon: FileCheck,
      title: "Smart Document Upload",
      description: "Upload your documents securely - we'll tell you exactly what's needed.",
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: Search,
      title: "Compare Bank Offers",
      description: "Receive and compare personalized mortgage offers from UAE's top banks.",
      color: "from-emerald-500 to-emerald-700"
    },
    {
      icon: CheckCircle,
      title: "Fast Approval",
      description: "Get your mortgage approved quickly with our streamlined process.",
      color: "from-orange-500 to-orange-700"
    }
  ]
  const getScrollProgress = () => {
    const element = document.getElementById('how-it-works');
    if (!element) return 0;
    
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const offsetTop = rect.top + window.scrollY;
    
    return Math.max(0, Math.min(1, (scrollY - offsetTop + windowHeight * 0.5) / windowHeight));
  };

  return (
    <SectionWrapper 
    container="default"
    className="min-h-[calc(100vh-4rem)]"
  >
    <section id="how-it-works" className="py-20 bg-card">
      <div className="mx-auto px-4 sm:px-6">
      <SectionHeading
          label="Our Process"
          title="4 Simple Steps to Your Dream Home"
          subtitle="We've streamlined the mortgage process to make it faster and easier than ever before."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  scale: scrollY > 1000 ? 1 : 0.95 // Scale up when scrolled into view
                }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.2,
                  duration: 0.5
                }}
                style={{
                  transform: `translateY(${Math.min(scrollY * 0.1 * (index + 1), 50)}px)` // Staggered parallax
                }}
              >
              <div className="relative group">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-px bg-border z-0" />
                )}
                
                {/* Card Content */}
                <div className="relative bg-background p-6 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-4 mb-6`}>
                    <step.icon className="w-full h-full text-white" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </SectionWrapper>
  )
}
