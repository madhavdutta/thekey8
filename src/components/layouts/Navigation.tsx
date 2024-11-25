// components/layout/Navigation.tsx
import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import {
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
  Settings,
  Menu as MenuIcon,
  X,
  Home,
  Calculator,
  TrendingUp,
  FileText,
  Phone
} from 'lucide-react'
import { Button } from '../ui/button'
import { Avatar } from '../ui/avatar'
import { useAuth } from '../../hooks/useAuth'
import { ThemeToggle } from '../theme/ThemeToggle'


// const mainNavItems = [
//   { title: 'Home', path: '/' },
//   { title: 'About Us', path: '/about' },
//   { title: 'Blog', path: '/blog' },
//   // My Eligibility redirects to Signup
//   { 
//     title: 'My Eligibility', 
//     path: '/auth/signup', 
//     highlight: true 
//   }
// ]

const mainNavItems = [
  { title: 'Home', path: '/', icon: Home },
  { title: 'About', path: '/about', icon: FileText },
  { title: 'Blog', path: '/blog', icon: Calculator },
  { title: 'Market Insight', path: '/market-insight', icon: TrendingUp },
  { title: 'Contact', path: '/contact', icon: Phone },
  { 
    title: 'My Eligibility', 
    path: '/auth/signup', 
    highlight: true 
  }
]

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const getInitials = (name: string = 'User') => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : ''
        }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent"
            >
              TheKey8
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 text-sm transition-colors ${location.pathname === item.path
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.title}</span>
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Get Pre-Qualify</Button>
                </Link>
              </>
            ) : (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-2 hover:bg-accent rounded-full p-1 transition-colors">
                  <Avatar
                    className="h-8 w-8"
                    alt={getInitials(user.name)}
                  />
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Menu.Button>

                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 rounded-md bg-card border border-border shadow-lg focus:outline-none">
                    <div className="p-1 space-y-0.5">
                      {[
                        { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
                        { title: 'Profile', path: '/profile', icon: User },
                        { title: 'Settings', path: '/settings', icon: Settings }
                      ].map((item) => (
                        <Menu.Item key={item.path}>
                          {({ active }) => (
                            <Link
                              to={item.path}
                              className={`${active ? 'bg-accent text-accent-foreground' : 'text-foreground'
                                } group flex w-full items-center rounded-md px-3 py-2 text-sm`}
                            >
                              <item.icon className="mr-2 h-4 w-4" />
                              {item.title}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${active ? 'bg-accent' : ''
                              } group flex w-full items-center rounded-md px-3 py-2 text-sm text-destructive`}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <Transition
        show={isMenuOpen}
        as={React.Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base ${location.pathname === item.path
                    ? 'text-primary font-medium bg-primary/5'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon && <item.icon className="h-5 w-5" />}
                <span>{item.title}</span>
              </Link>
            ))}
            {!user ? (
              <div className="pt-4 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full">
                    Get Pre-Qualify
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="pt-4 border-t border-border">
                {[
                  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
                  { title: 'Profile', path: '/profile', icon: User },
                  { title: 'Settings', path: '/settings', icon: Settings }
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-destructive hover:bg-accent rounded-md"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </Transition>
    </nav>
  )
}