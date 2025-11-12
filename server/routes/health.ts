import { Router } from 'express';

const router = Router();

/**
 * @route GET /api/health
 * @desc Vérifie l'état de santé de l'API
 * @access Public
 */
router.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'TechnoLab API est en bonne santé ✅',
    timestamp: new Date().toISOString(),
    data: {
      version: '1.0.0', // À synchroniser avec votre package.json
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      // Ajoutez ici des checks supplémentaires (ex: base de données)
      database: process.env.DATABASE_URL ? 'configured' : 'not configured',
    },
  });
});

export default router;
