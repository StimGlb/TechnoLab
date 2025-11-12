// ============================================
// 📦 Configuration Express
// ============================================

import express from 'express';
import helmet from 'helmet';
import { config } from './config/env.config.js';
import { corsOptions } from './config/cors.config.js';
import { apiLimiter } from './config/rate-limit.config.js';
import { requestLogger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { ApiError } from './utils/ApiError.js';
import routes from './routes/index.js';
import logger from './utils/logger.js';

const app = express();

// ============================================
// MIDDLEWARES DE SÉCURITÉ
// ============================================

// Protection headers HTTP
app.use(helmet({
  contentSecurityPolicy: config.nodeEnv === 'production',
  crossOriginEmbedderPolicy: config.nodeEnv === 'production'
}));

// CORS
app.use(corsOptions);

// Rate limiting sur toutes les routes API
app.use('/api/', apiLimiter);

// ============================================
// MIDDLEWARES DE PARSING
// ============================================

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================
// MIDDLEWARE DE LOGGING
// ============================================

if (config.nodeEnv !== 'test') {
  app.use(requestLogger);
}

// ============================================
// ROUTES
// ============================================

app.use('/api', routes);

// Route racine (redirection)
app.get('/', (req, res) => {
  res.json({
    message: '🎓 Bienvenue sur l\'API TechnoLab',
    version: '2.0.0',
    documentation: `${req.protocol}://${req.get('host')}/api/docs`,
    health: `${req.protocol}://${req.get('host')}/api/health`
  });
});

// ============================================
// GESTION DES ROUTES NON TROUVÉES
// ============================================

app.use((req, res, next) => {
  next(new ApiError(404, `Route non trouvée : ${req.originalUrl}`));
});

// ============================================
// GESTIONNAIRE D'ERREURS GLOBAL
// ============================================

app.use(errorHandler);

export default app;