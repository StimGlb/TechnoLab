// ============================================
// 🌐 Configuration CORS
// ============================================

import cors from 'cors';
import { config } from './env.config.js';
import logger from '../utils/logger.js';

// Liste blanche des origines autorisées
const allowedOrigins = [
  config.clientUrl,
  'http://localhost:5173',
  'http://localhost:3000',
  'https://technolab.vercel.app' // Ajoutez votre domaine de production
];

// Configuration CORS
const corsOptions = cors({
  origin: (origin, callback) => {
    // Autoriser les requêtes sans origine (ex: Postman, curl)
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      logger.warn(`🚫 Origine CORS refusée: ${origin}`);
      callback(new Error('Non autorisé par CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

export { corsOptions };