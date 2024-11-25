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
  { icon: FileText, label: 'Applications', path: '/dashboard/applications' },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          {/* Sidebar */}
          {/* <div className="lg:w-64 flex-shrink-0">
            <div className="bg-card rounded-lg border border-border p-4">
              <nav className="space-y-2">
                <Link 
                  to="/"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors"
                >
                  <Home className="h-4 w-4" />
                  Back to Home
                </Link>
                <div className="h-px bg-border my-2" />
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                      location.pathname === item.path
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div> */}

          {/* Main Content */}
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