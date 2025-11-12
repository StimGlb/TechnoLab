// ============================================
// 🚀 TechnoLab Server - Point d'entrée
// ============================================

import app from './src/app.js';
import { config } from './src/config/env.config.js';
import logger from './src/utils/logger.js';

const PORT = config.port;

// Démarrage du serveur
const server = app.listen(PORT, () => {
  logger.info(`
╔═══════════════════════════════════════════╗
║                                           ║
║     🚀 TECHNOLAB SERVER RUNNING 🚀        ║
║                                           ║
║  Port:        ${PORT.toString().padEnd(29)}║
║  Environment: ${config.nodeEnv.padEnd(29)}║
║  Client URL:  ${config.clientUrl.padEnd(29)}║
║                                           ║
║  API Health:  http://localhost:${PORT}/api/health ║
║  API Docs:    http://localhost:${PORT}/api/docs   ║
║                                           ║
╚═══════════════════════════════════════════╝
  `);
});

// ============================================
// GESTION GRACEFUL SHUTDOWN
// ============================================

const gracefulShutdown = (signal) => {
  logger.warn(`👋 Signal ${signal} reçu - Arrêt du serveur...`);
  
  server.close(() => {
    logger.info('✅ Serveur arrêté proprement');
    process.exit(0);
  });

  // Forcer l'arrêt après 10 secondes
  setTimeout(() => {
    logger.error('⚠️ Arrêt forcé après timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Gestion des erreurs non capturées
process.on('unhandledRejection', (reason, promise) => {
  logger.error('❌ Unhandled Rejection:', { reason, promise });
  gracefulShutdown('unhandledRejection');
});

process.on('uncaughtException', (error) => {
  logger.error('❌ Uncaught Exception:', error);
  gracefulShutdown('uncaughtException');
});

export default server;