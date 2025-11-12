// ============================================
// 🛡️ Middleware de gestion d'erreurs
// ============================================

import { config } from '../config/env.config.js';
import { ApiError } from '../utils/ApiError.js';
import logger from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  
  // Si ce n'est pas une ApiError, considérer comme erreur 500
  if (!(err instanceof ApiError)) {
    statusCode = 500;
    message = config.nodeEnv === 'production' 
      ? 'Erreur interne du serveur' 
      : err.message;
  }
  
  // Construire la réponse d'erreur
  const response = {
    success: false,
    statusCode,
    message,
    ...(config.nodeEnv === 'development' && {
      stack: err.stack,
      originalError: err.message
    })
  };
  
  // Logger l'erreur
  if (statusCode >= 500) {
    logger.error(`❌ ${statusCode} - ${message}`, {
      method: req.method,
      path: req.path,
      ip: req.ip,
      error: err.stack
    });
  } else {
    logger.warn(`⚠️ ${statusCode} - ${message}`, {
      method: req.method,
      path: req.path,
      ip: req.ip
    });
  }
  
  res.status(statusCode).json(response);
};

// Wrapper pour les fonctions async (évite les try/catch répétitifs)
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};