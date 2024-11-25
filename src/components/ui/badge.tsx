import React from 'react'
import { cn } from "../../lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

export function Badge({ 
  className, 
  variant = 'default',
  ...props 
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-primary/10 text-primary": variant === 'default',
          "bg-green-100 text-green-800": variant === 'success',
          "bg-yellow-100 text-yellow-800": variant === 'warning',
          "bg-red-100 text-red-800": variant === 'danger',
        },
        className
      )}
      {...props}
    />
  )
}
