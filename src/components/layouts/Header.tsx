import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDown, User, LogOut, LayoutDashboard, Settings } from 'lucide-react'
import { config } from '../../lib/config'
import { Avatar } from '../ui/avatar'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'
import React from 'react'

export function Header() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const avatarUrl = user?.avatar_url 
    ? `${config.supabase.url}/storage/v1/object/public/avatars/${user.avatar_url}`
    : null

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {config.app.name}
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="hover:scale-105 transition-transform">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="hover:scale-105 transition-transform">Register</Button>
                </Link>
              </>
            ) : (
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="flex items-center space-x-2 hover:bg-gray-50 rounded-full p-1 transition-colors">
                  <Avatar
                    src={avatarUrl}
                    alt={user.name}
                    initials={getInitials(user.name)}
                    size="sm"
                  />
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/dashboard"
                            className={`${
                              active ? 'bg-gray-50' : ''
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                          >
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={`${
                              active ? 'bg-gray-50' : ''
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                          >
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/settings"
                            className={`${
                              active ? 'bg-gray-50' : ''
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${
                              active ? 'bg-gray-50' : ''
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-600`}
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
        </div>
      </nav>
    </header>
  )
}
