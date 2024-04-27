import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    'process.env.VITE_RECAPTCHA_SITE_KEY':JSON.stringify(process.env.VITE_RECAPTCHA_SITE_KEY),
    'process.env.VITE_SECRET_KEY':JSON.stringify(process.env.VITE_SECRET_KEY),
    'process.env.VITE_BASE_URL':JSON.stringify(process.env.VITE_BASE_URL),
    'process.env.VITE_ORIGIN':JSON.stringify(process.env.VITE_ORIGIN)
  }
})
