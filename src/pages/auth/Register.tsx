import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { supabase } from '../../lib/supabase'
import React from 'react'
import { AuthLayout } from '../../components/layouts/AuthLayout'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.passwordConfirm) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
          // This is the URL that Supabase will redirect to after email confirmation
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (signUpError) throw signUpError

      if (data.user) {
        // Show success message
        alert('Please check your email to confirm your account.')
        navigate('/login')
      }
    } catch (error: any) {
      console.error('Registration error:', error)
      setError(error.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  
  return (
    <AuthLayout
      title="Create an account"
      description="Register to access all features"
      altText="Already have an account?"
      altLinkText="Sign in"
      altLinkTo="/login"
    >
      <motion.form 
        onSubmit={handleRegister}
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Full name
            </Label>
            <Input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-2 bg-background/50 border-border/50 focus:border-primary"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email address
            </Label>
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-2 bg-background/50 border-border/50 focus:border-primary"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-2 bg-background/50 border-border/50 focus:border-primary"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <Label htmlFor="passwordConfirm" className="text-sm font-medium">
                Confirm Password
              </Label>
              <Input
                type="password"
                id="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
                className="mt-2 bg-background/50 border-border/50 focus:border-primary"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
          >
            {error}
          </motion.div>
        )}

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90"
          disabled={loading}
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mr-2 h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
            />
          ) : null}
          {loading ? 'Creating account...' : 'Create account'}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By registering, you agree to our{' '}
          <Link to="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </motion.form>
    </AuthLayout>
  )
}