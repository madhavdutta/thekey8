import React from 'react'
import { cn } from "../../lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null
  alt?: string
  initials?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Avatar({ 
  src, 
  alt, 
  initials, 
  size = 'md', 
  className,
  ...props 
}: AvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-16 w-16 text-xl'
  }

  if (src) {
    return (
      <div
        className={cn(
          "relative rounded-full overflow-hidden bg-gray-100",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <img
          src={src}
          alt={alt || "Avatar"}
          className="h-full w-full object-cover"
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden bg-primary/10 flex items-center justify-center font-medium text-primary",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {initials || (alt?.charAt(0).toUpperCase() || '?')}
    </div>
  )
}
