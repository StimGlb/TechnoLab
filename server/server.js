import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuration ESM pour __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables d'environnement
dotenv.config();

// Initialisation Express
const app = express();
const PORT = process.env.PORT || 5001;

// ============================================
// MIDDLEWARES DE SÉCURITÉ
// ============================================

// Protection headers HTTP
app.use(helmet());

// CORS - Autoriser le client React
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate limiting - Protection anti-spam
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requêtes par IP
  message: 'Trop de requêtes depuis cette IP, réessayez plus tard.'
});
app.use('/api/', limiter);

// Parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger des requêtes (développement)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ============================================
// ROUTES API
// ============================================

// Route de santé (healthcheck)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'TechnoLab API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ============================================
// ROUTE CLAUDE API (COMMENTÉE)
// ============================================
/*
import Anthropic from '@anthropic-ai/sdk';

// Initialiser le client Claude
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

// Endpoint pour interagir avec Claude
app.post('/api/claude/chat', async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ 
        error: 'Le champ "message" est requis' 
      });
    }

    // Appel à l'API Claude
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: message
        }
      ],
      // Contexte optionnel pour l'assistant pédagogique
      system: context || `Tu es un assistant pédagogique spécialisé en technologie au collège (cycle 4). 
                          Tu aides les enseignants à structurer leurs cours et activités.`
    });

    res.json({
      success: true,
      response: response.content[0].text,
      usage: response.usage
    });

  } catch (error) {
    console.error('Erreur Claude API:', error);
    res.status(500).json({
      error: 'Erreur lors de la communication avec Claude',
      details: error.message
    });
  }
});

// Endpoint pour générer une fiche d'activité
app.post('/api/claude/generate-activity', async (req, res) => {
  try {
    const { niveau, theme, competences } = req.body;

    const prompt = `Génère une fiche d'activité de technologie pour un élève de ${niveau} sur le thème "${theme}".
                    Compétences visées : ${competences.join(', ')}.
                    
                    Format attendu :
                    - Titre de l'activité
                    - Objectifs pédagogiques
                    - Matériel nécessaire
                    - Déroulé en 3-4 étapes
                    - Critères d'évaluation`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }]
    });

    res.json({
      success: true,
      activity: response.content[0].text
    });

  } catch (error) {
    console.error('Erreur génération activité:', error);
    res.status(500).json({
      error: 'Erreur lors de la génération',
      details: error.message
    });
  }
});
*/

// ============================================
// ROUTES PRINCIPALES DE L'APP
// ============================================

// Route racine API
app.get('/api', (req, res) => {
  res.json({
    message: 'Bienvenue sur l\'API TechnoLab',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      // claude: '/api/claude/chat (décommenter pour activer)',
      documentation: '/api/docs (à venir)'
    }
  });
});

// ============================================
// GESTION DES ERREURS 404
// ============================================

app.use((req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    path: req.originalUrl,
    suggestion: 'Consultez /api pour voir les endpoints disponibles'
  });
});

// ============================================
// GESTION DES ERREURS GLOBALES
// ============================================

app.use((err, req, res, next) => {
  console.error('❌ Erreur serveur:', err.stack);
  
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Erreur interne du serveur' 
      : err.message,
    timestamp: new Date().toISOString()
  });
});

// ============================================
// DÉMARRAGE DU SERVEUR
// ============================================

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║                                           ║
║     🚀 TECHNOLAB SERVER RUNNING 🚀        ║
║                                           ║
║  Port:        ${PORT}                        ║
║  Environment: ${process.env.NODE_ENV || 'development'}         ║
║  Client URL:  ${process.env.CLIENT_URL || 'http://localhost:5173'} ║
║                                           ║
║  API Health:  http://localhost:${PORT}/api/health ║
║                                           ║
╚═══════════════════════════════════════════╝
  `);
});

// Gestion propre de l'arrêt
process.on('SIGTERM', () => {
  console.log('👋 Signal SIGTERM reçu - Arrêt du serveur...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n👋 Signal SIGINT reçu - Arrêt du serveur...');
  process.exit(0);
});
