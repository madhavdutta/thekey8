// components/sections/Process.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Upload, FileCheck, Search, CheckCircle } from 'lucide-react';
import { SectionWrapper } from '../ui/section-wrapper';
import { useScroll } from '../providers/ScrollProvider';
import { SectionHeading } from './SectionHeading';

export const Process = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { scrollY } = useScroll();

  const steps = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Upload Documents",
      desc: "Upload your UAE ID and documents securely for mortgage review",
      detail: "Our secure platform ensures your documents are protected while our system analyzes them for pre-qualification."
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Receive Proposal",
      desc: "Get tailored mortgage options in minutes",
      detail: "Our AI-powered system processes your information to generate personalized mortgage proposals that match your profile."
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Compare Offers",
      desc: "Review and choose competitive offers from leading banks",
      detail: "Compare interest rates, terms, and conditions from multiple banks side by side to make an informed decision."
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Finalize Mortgage",
      desc: "Complete your mortgage process on schedule",
      detail: "Our team guides you through the final steps, ensuring a smooth closing process with your chosen bank."
    }
  ];

  return (
    <SectionWrapper 
      container="default"
      background="card"
      className="relative min-h-screen flex items-center justify-center py-20"
    >
      <div className="w-full">
        {/* Section Header */}
        <SectionHeading
          label="Our Process"
          title="4 Simple Steps to Your Dream Home"
          subtitle="We've streamlined the mortgage process to make it faster and easier than ever before."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left Side - Steps */}
          <div className="space-y-6 lg:space-y-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => setActiveStep(idx)}
                className={`group relative p-6 lg:p-8 rounded-2xl transition-all duration-500 ${
                  activeStep === idx ? 'bg-primary/5' : 'hover:bg-primary/5'
                }`}
              >
                <div className="flex items-start gap-4 lg:gap-6">
                  {/* Step Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    activeStep === idx ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                  }`}>
                    {step.icon}
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <span className="text-sm font-mono text-muted-foreground ml-4">0{idx + 1}</span>
                    </div>
                    <p className="text-muted-foreground text-base">{step.desc}</p>
                    
                    <motion.div 
                      initial={false}
                      animate={{
                        height: activeStep === idx ? 'auto' : 0,
                        opacity: activeStep === idx ? 1 : 0,
                        marginTop: activeStep === idx ? 16 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-muted-foreground">{step.detail}</p>
                    </motion.div>
                  </div>
                </div>

                {/* Connection Line */}
                {idx < steps.length - 1 && (
                  <div className="absolute left-10 top-[5rem] bottom-[-1rem] w-px bg-border" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Right Side - Interactive Visual */}
          <div className="relative lg:sticky lg:top-32 h-[600px]">
            <motion.div 
              className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-xl"
              animate={{
                scale: [1, 1.02, 1],
                rotate: [0, 1, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="absolute inset-0 bg-background/50" />
              <div className="relative h-full flex flex-col items-center justify-center p-8">
                <motion.div
                  key={activeStep}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                    {steps[activeStep].icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-4">{steps[activeStep].title}</h4>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    {steps[activeStep].desc}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};