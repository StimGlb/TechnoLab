import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env vars
  const env = loadEnv(mode, process.cwd(), '')

  // Prefer VITE_API_URL; fallback to SERVER_URL or localhost
  const apiTarget = env.VITE_API_URL ?? env.VITE_SERVER_URL ?? 'http://localhost:5001'
  const devPort = Number(env.VITE_PORT ?? env.PORT ?? 5173)

  return {
    plugins: [react(), tailwind()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // En v4, pas besoin de configurer PostCSS ici
    server: {
      port: devPort,
      host: true,
      open: true,
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
    preview: {
      port: Number(env.VITE_PREVIEW_PORT ?? 5173),
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV ?? mode),
    },
  }
})
