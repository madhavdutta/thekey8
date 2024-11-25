
// components/sections/home/Features.tsx
import React from 'react'
import { motion, useScroll } from 'framer-motion'
import { Shield, TrendingUp, Clock, BadgePercent, Building2, Heart } from 'lucide-react'
import { SectionWrapper } from '../ui/section-wrapper'
import { SectionHeading } from './SectionHeading';

export function Features() {
  const { scrollY } = useScroll();

  const features = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your data is protected with enterprise-grade encryption and security measures.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Best Rates Guaranteed",
      description: "We partner with leading UAE banks to ensure you get the most competitive rates.",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: Clock,
      title: "Fast Processing",
      description: "Get your mortgage approved in record time with our streamlined process.",
      gradient: "from-orange-500 to-pink-500"
    },
    {
      icon: BadgePercent,
      title: "Special Offers",
      description: "Exclusive mortgage deals and preferential rates through our banking partnerships.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Building2,
      title: "Property Insights",
      description: "Access detailed market analysis and property valuations.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: Heart,
      title: "Dedicated Support",
      description: "Personal mortgage advisors available 7 days a week to guide you.",
      gradient: "from-amber-500 to-orange-500"
    }
  ]

   // Calculate the reveal progress
   const calculateProgress = (index: number) => {
    const baseOffset = 800; // Starting point for reveals
    const stagger = 100; // Stagger between items
    const threshold = baseOffset + (index * stagger);
    
    return scrollY.get() > threshold ? 1 : 0;
  };


  return (
     <SectionWrapper 
      container="default"
      className="min-h-[calc(100vh-4rem)]"
    >
    <section className="py-20">
      <div className="mx-auto px-4 sm:px-6">
      <SectionHeading
          label="Why Choose TheKey8"
          title="TheKey8 Advantage"
          subtitle="Discover the benefits of working with TheKey8 for your mortgage needs."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-card hover:bg-card/50 border border-border rounded-2xl p-6 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-2.5 mb-6 transition-transform duration-300 group-hover:scale-110`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>

                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
            Start Your Journey
          </button>
        </motion.div>
      </div>
    </section>
    </SectionWrapper>
  )
}