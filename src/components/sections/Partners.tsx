
// components/sections/home/Partners.tsx
import React from 'react'
import { motion } from 'framer-motion'
import { SectionWrapper } from '../ui/section-wrapper'
import { SectionHeading } from './SectionHeading'

export function Partners() {
  const banks = [
    { name: "First Abu Dhabi Bank", logo: "/api/placeholder/200/80" },
    { name: "Emirates NBD", logo: "/api/placeholder/200/80" },
    { name: "Abu Dhabi Commercial Bank", logo: "/api/placeholder/200/80" },
    { name: "Dubai Islamic Bank", logo: "/api/placeholder/200/80" },
    { name: "Mashreq Bank", logo: "/api/placeholder/200/80" },
    { name: "Abu Dhabi Islamic Bank", logo: "/api/placeholder/200/80" }
  ]

  return (
     <SectionWrapper 
      container="default"
      className="min-h-[calc(100vh-4rem)]"
    >
    <section className="py-20">
      <div className="mx-auto px-4 sm:px-6">
      <SectionHeading
          label="Our Partners"
          title="Trusted by Leading Banks"
          subtitle="We work with the top banks in the UAE to provide you with the best mortgage options."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center">
          {banks.map((bank, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-card hover:bg-card/50 border border-border rounded-xl p-8 transition-all duration-300">
                <img
                  src={bank.logo}
                  alt={bank.name}
                  className="w-full h-auto opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </SectionWrapper>
  )
}
