// ============================================
// ⏱️ Configuration Rate Limiting
// ============================================

import rateLimit from 'express-rate-limit';
import { config } from './env.config.js';

// Rate limiter général pour toutes les API
export const apiLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs, // 15 minutes par défaut
  max: config.rateLimit.maxRequests, // 100 requêtes par défaut
  message: {
    error: 'Trop de requêtes depuis cette IP, réessayez plus tard.',
    retryAfter: Math.ceil(config.rateLimit.windowMs / 60000) + ' minutes'
  },
  standardHeaders: true, // Retourne les headers RateLimit-*
  legacyHeaders: false,  // Désactive les headers X-RateLimit-*
  handler: (req, res) => {
    res.status(429).json({
      error: 'Rate limit dépassé',
      message: 'Trop de requêtes depuis cette IP',
      retryAfter: req.rateLimit.resetTime
    });
  }
});

// Rate limiter strict pour les endpoints sensibles (Claude AI)
export const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 20, // 20 requêtes/heure
  message: {
    error: 'Quota API dépassé',
    retryAfter: '1 heure'
  },
  skipSuccessfulRequests: false,
  skipFailedRequests: false
});

// Rate limiter pour les routes de création (POST)
export const createLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 créations max
  message: {
    error: 'Trop de créations, ralentissez',
    retryAfter: '15 minutes'
  }
});