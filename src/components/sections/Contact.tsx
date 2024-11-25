
// components/sections/home/Contact.tsx
import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, Clock, ArrowRight } from 'lucide-react'
import { SectionWrapper } from '../ui/section-wrapper'

export function Contact() {
  return (
     <SectionWrapper 
      container="default"
      className="min-h-[calc(100vh-4rem)]"
    >
    <section className="py-20">
      <div className="mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Talk to a Mortgage Expert</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Get personalized mortgage guidance from our experienced advisors.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: Phone,
                  title: "Call Us",
                  description: "+971 50 123 4567",
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  description: "mortgages@thekey8.com",
                },
                {
                  icon: Clock,
                  title: "Working Hours",
                  description: "Sun-Thu: 9am-6pm",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Schedule Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Schedule a Call</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-muted-foreground">First Name</label>
                    <input
                      type="text"
                      className="mt-1 w-full rounded-lg bg-background border border-border px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Last Name</label>
                    <input
                      type="text"
                      className="mt-1 w-full rounded-lg bg-background border border-border px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <input
                    type="email"
                    className="mt-1 w-full rounded-lg bg-background border border-border px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Phone</label>
                  <input
                    type="tel"
                    className="mt-1 w-full rounded-lg bg-background border border-border px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Preferred Time</label>
                  <select className="mt-1 w-full rounded-lg bg-background border border-border px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>Morning (9am - 12pm)</option>
                    <option>Afternoon (12pm - 3pm)</option>
                    <option>Evening (3pm - 6pm)</option>
                  </select>
                </div>
                <button className="w-full bg-primary text-primary-foreground rounded-lg px-6 py-3 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  Schedule Call
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </SectionWrapper>
  )
}
