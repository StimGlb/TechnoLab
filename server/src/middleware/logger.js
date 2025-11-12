// ============================================
// 📊 Middleware de logging des requêtes
// ============================================

import logger from '../utils/logger.js';

export const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  
  // Intercepter la fin de la réponse
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logData = {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('user-agent')
    };
    
    // Logger selon le code de statut
    if (res.statusCode >= 500) {
      logger.error('❌ Requête échouée', logData);
    } else if (res.statusCode >= 400) {
      logger.warn('⚠️ Requête invalide', logData);
    } else {
      logger.info(`✅ ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
    }
  });
  
  next();
};