// ============================================
// 🛣️ Routeur principal
// ============================================

import express from 'express';
import healthRoutes from './health.routes.js';
// import claudeRoutes from './claude.routes.js'; // Décommenter quand prêt

const router = express.Router();

// ============================================
// MONTAGE DES ROUTES
// ============================================

router.use('/health', healthRoutes);
// router.use('/claude', claudeRoutes);

// Route racine de l'API
router.get('/', (req, res) => {
  res.json({
    message: '🎓 API TechnoLab v2.0',
    documentation: 'https://docs.technolab.fr',
    endpoints: {
      health: '/api/health',
      claude: '/api/claude (à venir)'
    },
    version: '2.0.0',
    status: 'operational'
  });
});

export default router;
