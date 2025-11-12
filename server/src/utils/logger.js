// ============================================
// 📝 Configuration Winston Logger
// ============================================

import winston from 'winston';
import { config } from '../config/env.config.js';

// Format personnalisé pour les logs
const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    let log = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    if (stack) {
      log += `\n${stack}`;
    }
    return log;
  })
);

// Format coloré pour la console
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  customFormat
);

// Configuration des transports
const transports = [
  // Console en développement
  new winston.transports.Console({
    format: consoleFormat,
    level: config.logLevel
  })
];

// Ajouter fichiers de logs en production
if (config.nodeEnv === 'production') {
  transports.push(
    // Logs d'erreurs uniquement
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: customFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    // Tous les logs
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: customFormat,
      maxsize: 5242880,
      maxFiles: 5
    })
  );
}

// Création du logger
const logger = winston.createLogger({
  level: config.logLevel,
  format: customFormat,
  transports,
  exitOnError: false
});

// Logs de démarrage
if (config.nodeEnv !== 'test') {
  logger.info(`Logger initialisé en mode ${config.nodeEnv}`);
}

export default logger;