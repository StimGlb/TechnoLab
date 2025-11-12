// ============================================
// 🏥 Contrôleur Health
// ============================================

import { config } from '../config/env.config.js';
import os from 'os';

// Healthcheck simple (pour monitoring automatique)
export const getHealth = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'TechnoLab API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
};

// Healthcheck détaillé (pour diagnostic)
export const getDetailedHealth = (req, res) => {
  const memoryUsage = process.memoryUsage();
  
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    server: {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      uptime: `${Math.floor(process.uptime())}s`
    },
    memory: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`
    },
    system: {
      totalMemory: `${Math.round(os.totalmem() / 1024 / 1024)}MB`,
      freeMemory: `${Math.round(os.freemem() / 1024 / 1024)}MB`,
      cpus: os.cpus().length,
      loadAverage: os.loadavg()
    }
  });
};