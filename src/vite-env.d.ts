/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_PROJECT_KEY: string;
}

interface ImpotMeta {
  readonly env: ImportMetaEnv;
}
