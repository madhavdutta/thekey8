import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../components/ui/section-wrapper';
import { Shield, Users, TrendingUp, Award, Building2, Scale } from 'lucide-react';

export function AboutUs() {
  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description: "We prioritize the security of your information and maintain the highest standards of trust in all our dealings."
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Your success is our priority. We provide personalized solutions tailored to your unique financial needs."
    },
    {
      icon: TrendingUp,
      title: "Market Expertise",
      description: "Our team of experts stays ahead of market trends to offer you the most competitive mortgage solutions."
    }
  ];

  const achievements = [
    { number: "5000+", label: "Happy Customers" },
    { number: "10+", label: "Banking Partners" },
    { number: "98%", label: "Success Rate" },
    { number: "24/7", label: "Customer Support" }
  ];

  return (
    <>
      {/* Hero Section */}
      <SectionWrapper container="default" className="section-spacing">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary text-sm font-medium tracking-wider uppercase"
          >
            About TheKey8
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mt-4 mb-6"
          >
            Simplifying Mortgages in UAE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lg text-muted-foreground"
          >
            We're on a mission to make mortgage financing accessible, transparent,
            and hassle-free for everyone in the UAE.
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">
                {achievement.number}
              </div>
              <div className="text-muted-foreground">
                {achievement.label}
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Values Section */}
      <SectionWrapper container="default" className="section-spacing bg-accent/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-card rounded-2xl border border-border/50"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Team Section */}
      <SectionWrapper container="default" className="section-spacing">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
          <p className="text-muted-foreground">
            Meet the experts behind TheKey8's success
          </p>
        </div>
        {/* Add team members grid here */}
      </SectionWrapper>
    </>
  );
}