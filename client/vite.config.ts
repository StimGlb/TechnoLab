import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env vars from .env, .env.local, etc.
  const env = loadEnv(mode, process.cwd(), '')

  // Prefer VITE_API_URL for values exposed to client code (Vite exposes VITE_* to import.meta.env)
  const apiTarget = env.VITE_API_URL || env.SERVER_URL || 'http://localhost:5001'
  const devPort = Number(env.PORT) || 5173

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // Configure PostCSS plugins (Tailwind + Autoprefixer)
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
    // Dev server helpers
    server: {
      port: devPort,
      // Proxy API calls to your backend during development to avoid CORS and to mirror production paths
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})