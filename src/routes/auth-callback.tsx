import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import React from 'react'

export function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Auth callback error:', error)
        navigate('/login')
        return
      }

      if (session) {
        navigate('/dashboard')
      } else {
        navigate('/login')
      }
    }

    handleAuthCallback()
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Verifying your email...</h2>
        <p className="text-gray-600">Please wait while we confirm your email address.</p>
      </div>
    </div>
  )
}
