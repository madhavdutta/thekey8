export const config = {
  app: {
    name: import.meta.env.VITE_APP_NAME || 'TheKey8',
    url: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  },
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },
  support: {
    email: import.meta.env.VITE_SUPPORT_EMAIL || 'support@thekey8.com',
    phone: import.meta.env.VITE_SUPPORT_PHONE || '+971XXXXXXXX',
  },
} as const
