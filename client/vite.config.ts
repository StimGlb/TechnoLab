import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import react from '@vitejs/plugin-react'

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env vars (we keep an empty prefix to access non-VITE vars if needed)
  const env = loadEnv(mode, process.cwd(), '')

  // Prefer VITE_API_URL; fallback to SERVER_URL or localhost
  const apiTarget = env.VITE_API_URL ?? env.VITE_SERVER_URL ?? 'http://localhost:5001'
  const devPort = Number(env.VITE_PORT ?? env.PORT ?? 5173)

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // Let PostCSS / Tailwind be configured via postcss.config.cjs.
    // If you prefer to keep plugins here, replace this block accordingly.
    css: {
      postcss: {},
    },
    server: {
      port: devPort,
      host: true,
      open: true,
      // Proxy API calls to the backend during development
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
          ws: true,
          // If your backend doesn't expect the /api prefix, you can remove it:
          // rewrite: (path) => path.replace(/^\/api/, '')
        },
      },
    },
    // Preview server used by `vite preview`
    preview: {
      port: Number(env.VITE_PREVIEW_PORT ?? 5173),
    },
    // Small handy replacement available at build time (optional)
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV ?? mode),
    },
  }
})