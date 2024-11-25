///<reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_URL: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_SUPPORT_EMAIL: string
  readonly VITE_SUPPORT_PHONE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
