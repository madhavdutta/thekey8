// components/layouts/AuthLayout.tsx
import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  showAltLink?: boolean
  altText?: string
  altLinkText?: string
  altLinkTo?: string
}

export function AuthLayout({ 
  children, 
  title, 
  description,
  showAltLink = true,
  altText = "Don't have an account?",
  altLinkText = "Sign up",
  altLinkTo = "/register"
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 relative flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl relative"
      >
        {/* Logo and Heading */}
        <div className="text-center mb-8">
        
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="mt-6 text-3xl font-bold tracking-tight">
              {title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {description}
            </p>
          </motion.div>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-border/50"
        >
          {children}
        </motion.div>

        {/* Alternative Link */}
        {showAltLink && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            {altText}{' '}
            <Link 
              to={altLinkTo}
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              {altLinkText}
            </Link>
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}