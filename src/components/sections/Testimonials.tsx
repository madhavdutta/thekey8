// components/sections/home/Testimonials.tsx
import React from 'react'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { SectionWrapper } from '../ui/section-wrapper'
import { SectionHeading } from './SectionHeading'

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "First-time Homebuyer",
      image: "/api/placeholder/100/100",
      quote: "TheKey8 made getting my first mortgage incredibly simple. Their team guided me through every step of the process.",
      rating: 5
    },
    {
      name: "Mohammed Rahman",
      role: "Property Investor",
      image: "/api/placeholder/100/100",
      quote: "The best mortgage rates in UAE. I've used TheKey8 for multiple properties and they never disappoint.",
      rating: 5
    },
    {
      name: "Lisa Chen",
      role: "Home Owner",
      image: "/api/placeholder/100/100",
      quote: "Their digital process is seamless, and the customer service is exceptional. Highly recommended!",
      rating: 5
    }
  ]

  return (
     <SectionWrapper 
      container="default"
      className="min-h-[calc(100vh-4rem)]"
    >
    <section className="py-20 bg-card">
      <div className="mx-auto px-4 sm:px-6">
      <SectionHeading
          label="Testimonials"
          title="What Our Clients Say"
          subtitle="Read what our clients have to say about their experience with TheKey8."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
              <div className="relative bg-background border border-border hover:border-primary/50 rounded-2xl p-8 transition-all duration-300">
                <Quote className="w-10 h-10 text-primary/20 mb-6" />
                
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-foreground mb-6">{testimonial.quote}</p>
                
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
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