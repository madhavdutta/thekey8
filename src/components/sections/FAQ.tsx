
// components/sections/home/FAQ.tsx
import React from 'react'
import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { SectionWrapper } from '../ui/section-wrapper';
import { SectionHeading } from './SectionHeading';

export function FAQ() {
  const faqs = [
    {
      question: "What documents do I need for a mortgage in UAE?",
      answer: "Typically, you'll need your Emirates ID, passport, visa, salary certificate, bank statements, and property details. We'll guide you through the exact requirements based on your situation."
    },
    {
      question: "How much down payment do I need?",
      answer: "For UAE residents, the minimum down payment is typically 20% for properties under AED 5 million. For non-residents, it's 30%. Additional fees apply for registration and processing."
    },
    {
      question: "How long does the mortgage process take?",
      answer: "With TheKey8, most mortgages are approved within 1-2 weeks. The entire process from application to closing typically takes 4-6 weeks."
    },
    {
      question: "Can expats get mortgages in UAE?",
      answer: "Yes, expats can get mortgages in UAE. However, terms and conditions may vary. We help navigate these requirements and find the best options for your situation."
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
          label="FAQ"
          title="Frequently Asked Questions"
          subtitle="Get answers to common questions about mortgages in the UAE."
        />

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
    </SectionWrapper>
  )
}
