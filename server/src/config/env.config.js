// ============================================
// 🔐 Configuration et validation environnement
// ============================================

import dotenv from 'dotenv';
import { z } from 'zod';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuration ESM pour __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables d'environnement
dotenv.config({ path: path.join(__dirname, '../../.env') });

// ============================================
// SCHÉMA DE VALIDATION ZOD
// ============================================

const envSchema = z.object({
  // Configuration serveur
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).pipe(z.number().min(1000).max(65535)).default('5001'),
  
  // URLs
  CLIENT_URL: z.string().url().default('http://localhost:5173'),
  
  // Claude API (optionnel)
  CLAUDE_API_KEY: z.string().optional(),
  
  // Logs
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  
  // Rate limiting
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default('900000'), // 15 min
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default('100')
});

// ============================================
// VALIDATION ET EXPORT
// ============================================

let config;

try {
  config = envSchema.parse(process.env);
  
  // Transformation en format lisible
  config = {
    nodeEnv: config.NODE_ENV,
    port: config.PORT,
    clientUrl: config.CLIENT_URL,
    claudeApiKey: config.CLAUDE_API_KEY,
    logLevel: config.LOG_LEVEL,
    rateLimit: {
      windowMs: config.RATE_LIMIT_WINDOW_MS,
      maxRequests: config.RATE_LIMIT_MAX_REQUESTS
    }
  };
  
} catch (error) {
  console.error('❌ Erreur de configuration des variables d\'environnement:');
  console.error(error.errors.map(e => `  - ${e.path.join('.')}: ${e.message}`).join('\n'));
  process.exit(1);
}

export { config };