// ============================================
// 🚀 TechnoLab Server - Point d'entrée (VERSION COLORÉE)
// ============================================

import app from './src/app.js';
import { config } from './src/config/env.config.js';
import logger from './src/utils/logger.js';

const PORT = config.port;

// ============================================
// CODES COULEURS ANSI
// ============================================

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  
  // Couleurs de texte
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  white: '\x1b[37m',
  
  // Couleurs de fond
  bgBlue: '\x1b[44m',
  bgGreen: '\x1b[42m'
};

// ============================================
// DÉMARRAGE DU SERVEUR
// ============================================

const server = app.listen(PORT, () => {
  const boxWidth = 62;
  const portStr = PORT.toString();
  
  // Emoji selon l'environnement
  const envEmoji = {
    development: '🔧',
    production: '🚀',
    test: '🧪'
  }[config.nodeEnv] || '⚙️';
  
  // URLs
  const healthUrl = `http://localhost:${PORT}/api/health`;
  const docsUrl = `http://localhost:${PORT}/api/docs`;
  
  // Helper pour centrer le texte
  const center = (text, width) => {
    const padding = width - text.length;
    const left = Math.floor(padding / 2);
    const right = Math.ceil(padding / 2);
    return ' '.repeat(left) + text + ' '.repeat(right);
  };
  
  // Helper pour ligne de donnée avec couleur
  const dataLine = (label, value, color = colors.cyan) => {
    const labelColored = `${colors.dim}${label}:${colors.reset}`;
    const valueColored = `${color}${colors.bright}${value}${colors.reset}`;
    const content = `  ${labelColored} ${valueColored}`;
    // Retirer les codes ANSI pour calculer la longueur réelle
    const contentLength = content.replace(/\x1b\[[0-9;]*m/g, '').length;
    return '║' + content + ' '.repeat(boxWidth - contentLength) + '║';
  };
  
  // Construction du banner
  const banner = [
    '',
    colors.cyan + '╔' + '═'.repeat(boxWidth) + '╗' + colors.reset,
    colors.cyan + '║' + ' '.repeat(boxWidth) + '║' + colors.reset,
    colors.cyan + '║' + colors.green + colors.bright + center('🚀 TECHNOLAB SERVER RUNNING 🚀', boxWidth) + colors.cyan + '║' + colors.reset,
    colors.cyan + '║' + ' '.repeat(boxWidth) + '║' + colors.reset,
    colors.cyan + '╠' + '═'.repeat(boxWidth) + '╣' + colors.reset,
    dataLine('Port', portStr, colors.green),
    dataLine('Environment', `${envEmoji} ${config.nodeEnv}`, colors.yellow),
    dataLine('Client URL', config.clientUrl, colors.blue),
    colors.cyan + '╠' + '═'.repeat(boxWidth) + '╣' + colors.reset,
    dataLine('API Health', healthUrl, colors.magenta),
    dataLine('API Docs', docsUrl, colors.magenta),
    colors.cyan + '║' + ' '.repeat(boxWidth) + '║' + colors.reset,
    colors.cyan + '╚' + '═'.repeat(boxWidth) + '╝' + colors.reset,
    ''
  ].join('\n');
  
  console.log(banner);
  
  logger.info(`✅ Server started successfully on port ${PORT}`);
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