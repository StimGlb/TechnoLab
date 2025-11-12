// ============================================
// 🏥 Routes de santé et monitoring
// ============================================

import express from 'express';
import { getHealth, getDetailedHealth } from '../controllers/health.controller.js';

const router = express.Router();

// GET /api/health - Healthcheck simple
router.get('/', getHealth);

// GET /api/health/detailed - Healthcheck détaillé
router.get('/detailed', getDetailedHealth);

export default router;