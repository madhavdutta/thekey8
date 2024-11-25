// types/supabase.ts
import { Database } from './database.types'

export type Profile = Database['public']['Tables']['applications']['Row']

export type UserMetadata = {
  avatar_url?: string
  name?: string
}

export interface SupabaseUser {
  id: string
  aud: string
  role?: string
  email?: string
  email_confirmed_at?: string
  phone?: string
  confirmed_at?: string
  last_sign_in_at?: string
  app_metadata: {
    provider?: string
    providers?: string[]
  }
  user_metadata: UserMetadata
  identities?: {
    id: string
    user_id: string
    identity_data: {
      email?: string
      sub?: string
    }
    provider: string
    last_sign_in_at: string
    created_at: string
    updated_at: string
  }[]
  created_at: string
  updated_at: string
}