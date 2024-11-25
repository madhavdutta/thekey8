import { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Avatar } from '../components/ui/avatar'
import { supabase } from '../lib/supabase'
import { Camera } from 'lucide-react'
import React from 'react'

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string | null
  emirates_id: string | null
  nationality: string | null
  monthly_income: number | null
  employment_status: string | null
  company_name: string | null
  employment_duration: number | null
  preferred_language: string
  avatar_url: string | null
}

export function Profile() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [formData, setFormData] = useState<Partial<UserProfile>>({})

  useEffect(() => {
    fetchProfile()
  }, [])

  async function fetchProfile() {
    try {
      setLoading(true)
      const { data: { user: authUser } } = await supabase.auth.getUser()
      
      if (authUser) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', authUser.id)
          .single()

        if (error) throw error

        setUser(data)
        setFormData(data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      alert('Error fetching profile data!')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true)
      if (!event.target.files || !event.target.files[0]) return

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${user?.id}-${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Update user profile with new avatar URL
      const { error: updateError } = await supabase
        .from('users')
        .update({ avatar_url: filePath })
        .eq('id', user?.id)

      if (updateError) throw updateError

      fetchProfile()
    } catch (error) {
      console.error('Error uploading avatar:', error)
      alert('Error uploading avatar!')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)

      const { error } = await supabase
        .from('users')
        .update(formData)
        .eq('id', user?.id)

      if (error) throw error

      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile!')
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '??'
  }

  const avatarUrl = user?.avatar_url 
    ? `${supabase.storage.from('avatars').getPublicUrl(user.avatar_url).data.publicUrl}`
    : null

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account information</p>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          {/* Avatar Section */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="relative">
              <Avatar
                src={avatarUrl}
                alt={user.name}
                initials={getInitials(user.name)}
                size="lg"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 p-1 rounded-full bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <Camera className="h-4 w-4 text-gray-600" />
                <input
                  id="avatar-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={loading}
                />
              </label>
            </div>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emirates_id">Emirates ID</Label>
                <Input
                  id="emirates_id"
                  value={formData.emirates_id || ''}
                  onChange={(e) => setFormData({ ...formData, emirates_id: e.target.value })}
                  placeholder="784-1234-1234567-1"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  value={formData.nationality || ''}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthly_income">Monthly Income (AED)</Label>
                <Input
                  id="monthly_income"
                  type="number"
                  value={formData.monthly_income || ''}
                  onChange={(e) => setFormData({ ...formData, monthly_income: Number(e.target.value) })}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employment_status">Employment Status</Label>
                <select
                  id="employment_status"
                  className="w-full border rounded-md p-2"
                  value={formData.employment_status || ''}
                  onChange={(e) => setFormData({ ...formData, employment_status: e.target.value })}
                  disabled={loading}
                >
                  <option value="">Select Status</option>
                  <option value="Employed">Employed</option>
                  <option value="Self-Employed">Self-Employed</option>
                  <option value="Business Owner">Business Owner</option>
                  <option value="Retired">Retired</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  id="company_name"
                  value={formData.company_name || ''}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employment_duration">Employment Duration (Years)</Label>
                <Input
                  id="employment_duration"
                  type="number"
                  value={formData.employment_duration || ''}
                  onChange={(e) => setFormData({ ...formData, employment_duration: Number(e.target.value) })}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferred_language">Preferred Language</Label>
                <select
                  id="preferred_language"
                  className="w-full border rounded-md p-2"
                  value={formData.preferred_language || 'English'}
                  onChange={(e) => setFormData({ ...formData, preferred_language: e.target.value })}
                  disabled={loading}
                >
                  <option value="English">English</option>
                  <option value="Arabic">Arabic</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" loading={loading}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
