import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../components/ui/section-wrapper';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export function Contact() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+971 4 XXX XXXX", "+971 50 XXX XXXX"],
      action: "tel:+97140000000"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["support@thekey8.com", "info@thekey8.com"],
      action: "mailto:support@thekey8.com"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Business Bay", "Dubai, United Arab Emirates"],
      action: "#"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Sunday - Thursday", "9:00 AM - 6:00 PM"],
      action: "#"
    }
  ];

  return (
    <>
      <SectionWrapper container="default" className="section-spacing">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary text-sm font-medium tracking-wider uppercase"
          >
            Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mt-4 mb-6"
          >
            We're Here to Help
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lg text-muted-foreground"
          >
            Have questions about mortgages? Our team of experts is ready to assist you.
          </motion.p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((item, index) => (
            <motion.a
              href={item.action}
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-card rounded-2xl border border-border/50 hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              {item.details.map((detail, i) => (
                <p key={i} className="text-muted-foreground">
                  {detail}
                </p>
              ))}
            </motion.a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl border border-border/50 p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                <label className="text-sm text-muted-foreground">Message</label>
                <textarea
                  rows={4}
                  className="mt-1 w-full rounded-lg bg-background border border-border px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-primary text-primary-foreground rounded-lg font-medium"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>
      </SectionWrapper>

      {/* Map Section */}
      <div className="h-[400px] bg-accent/5">
        {/* Add your map component here */}
      </div>
    </>
  );
}