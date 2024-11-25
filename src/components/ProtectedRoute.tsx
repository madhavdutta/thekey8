// components/ProtectedRoute.tsx
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { User } from '@supabase/supabase-js'
import { LoadingSpinner } from './ui/loading-spinner'
import { motion } from 'framer-motion'

export function ProtectedRoute() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading your account..." />
  }

  if (!user) {
    return (
      <Navigate 
        to="/login" 
        replace 
        state={{ from: window.location.pathname }}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Outlet />
    </motion.div>
  )
}