// components/layouts/DashboardLayout.tsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  User,
  Home
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: FileText, label: 'Applications', path: '/application' },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          <div className="flex-grow">
          <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 shadow-sm">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}