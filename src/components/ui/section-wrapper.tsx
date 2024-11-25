// components/ui/section-wrapper.tsx
import React from 'react'
import { cn } from '../../lib/utils'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  background?: 'default' | 'card' | 'gradient'
  container?: 'full' | 'default' | 'narrow' | 'compact' | 'wide'
}

export function SectionWrapper({ 
  children, 
  className,
  containerClassName,
  background = 'default',
  container = 'wide'
}: SectionWrapperProps) {
  const backgrounds = {
    default: 'bg-background',
    card: 'bg-card',
    gradient: 'bg-gradient-to-b from-background to-card'
  }

  const containers = {
    full: 'w-full px-4 sm:px-6 lg:px-8',
    wide: 'max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8', // For large screens
    default: 'max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8', // Modern standard
    narrow: 'max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8',  // Traditional
    compact: 'max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8'       // For text-heavy content
  }

  return (
    <section className={cn(
      'py-20',
      backgrounds[background],
      className
    )}>
      <div className={cn(
        containers[container],
        containerClassName
      )}>
        {children}
      </div>
    </section>
  )
}