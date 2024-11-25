// components/ui/loading-spinner.tsx
import React from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullScreen?: boolean
}

export function LoadingSpinner({ 
  size = 'md', 
  text = 'Loading...', 
  fullScreen = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const Spinner = (
    <motion.div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="inline-block"
      >
        <Loader2 className={`${sizeClasses[size]} text-primary`} />
      </motion.div>
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-muted-foreground"
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  )

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        {Spinner}
      </div>
    )
  }

  return Spinner
}