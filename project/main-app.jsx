// src/components/TechnoLabPresentation.jsx

import React, { useEffect, useState } from 'react';
import './main-app.css';

/**
 * 🎯 TechnoLabPresentation - Composant de présentation principale
 * 
 * Présente les deux applications TechnoKit et TechnoChat
 * avec animations, particules et design FabLab
 * 
 * @component
 */
const TechnoLabPresentation = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Animation d'entrée au montage
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div className="technolab-container">
      {/* Particules animées d'arrière-plan */}
      <ParticlesBackground />

      {/* En-tête principal */}
      <header className={`main-header ${isLoaded ? 'loaded' : ''}`}>
        <h1 className="main-title">
          <span className="emoji">🔧</span>
          TechnoLab
          <span className="emoji">🤖</span>
        </h1>
        <p className="subtitle">Tes outils numériques pour les cours de Technologie</p>
      </header>

      {/* Section TechnoKit */}
      <AppSection
        id="technokit"
        icon="🛠️"
        title="TechnoKit"
        badges={[
          { text: "Cours", color: "green" },
          { text: "Activités", color: "green" }
        ]}
        description="Génère des fiches de cours structurées et des activités pédagogiques adaptées au programme de Technologie au collège."
        features={[
          {
            icon: "📚",
            title: "Fiches de cours",
            description: "Génère automatiquement des fiches structurées avec objectifs, contenus et évaluations."
          },
          {
            icon: "🎯",
            title: "Activités pratiques",
            description: "Crée des activités adaptées au niveau (6ème à 3ème) avec consignes claires."
          },
          {
            icon: "⚙️",
            title: "Export multi-formats",
            description: "Exporte tes documents en PDF, Word ou HTML pour faciliter le partage."
          },
          {
            icon: "💾",
            title: "Sauvegarde cloud",
            description: "Garde tes cours en ligne et accède-y depuis n'importe quel appareil."
          }
        ]}
        ctaText="🛠️ Ouvrir TechnoKit"
        ctaLink="/technokit"
      />

      {/* Technologies utilisées */}
      <TechStack />

      {/* Call to Action final */}
      <CTASection />

      {/* Footer */}
      <footer className="footer">
        Développé avec ❤️ pour les cours de Technologie au collège | 
        Powered by React & Claude AI | Version 1.0.0
      </footer>
    </div>
  );
};

/**
 * 🎨 ParticlesBackground - Particules animées d'arrière-plan
 */
const ParticlesBackground = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 15}s`,
    animationDuration: `${15 + Math.random() * 10}s`
  }));

  return (
    <div className="particles" aria-hidden="true">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.left,
            animationDelay: particle.animationDelay,
            animationDuration: particle.animationDuration
          }}
        />
      ))}
    </div>
  );
};

/**
 * 📦 AppSection - Section de présentation d'une app
 */
const AppSection = ({ 
  id, 
  icon, 
  title, 
  badges, 
  description, 
  features, 
  example, 
  ctaText, 
  ctaLink 
}) => (
  <section className="app-section" id={id}>
    <div className="app-title">
      <h2>
        <span className="emoji">{icon}</span>
        {title}
      </h2>
      <div className="badges">
        {badges.map((badge, index) => (
          <span key={index} className={`badge ${badge.color}`}>
            {badge.text}
          </span>
        ))}
      </div>
    </div>

    <p className="app-description">{description}</p>

    <div className="features-grid">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>

    {example && <ExampleBox {...example} />}

    <div className="cta-inline">
      <a href={ctaLink} className="btn btn-primary">
        {ctaText}
      </a>
    </div>
  </section>
);

/**
 * 🎴 FeatureCard - Carte de fonctionnalité
 */
const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h4>{title}</h4>
    <p>{description}</p>
  </div>
);

/**
 * 💬 ExampleBox - Boîte d'exemple d'interaction
 */
const ExampleBox = ({ title, question, answer }) => (
  <div className="example-box">
    <h4>{title}</h4>
    <div className="chat-bubble user">{question}</div>
    <div className="chat-bubble ai">
      {answer.split('\n').map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i < answer.split('\n').length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
  </div>
);

/**
 * 🔧 TechStack - Technologies utilisées
 */
const TechStack = () => {
  const techs = [
    "Claude AI (Anthropic)",
    "React 18",
    "Node.js + Express",
    "React Markdown",
    "Tailwind CSS",
    "Vite"
  ];

  return (
    <section className="tech-section">
      <h3>⚙️ Technologies utilisées</h3>
      <div className="tech-stack">
        {techs.map((tech, index) => (
          <span key={index} className="tech-tag">{tech}</span>
        ))}
      </div>
    </section>
  );
};

/**
 * 📣 CTASection - Section d'appel à l'action finale
 */
const CTASection = () => (
  <section className="cta-section">
    <h2>🚀 Prêt à explorer ?</h2>
    <p>Découvre comment ces outils vont transformer tes cours de technologie !</p>
    
    <div className="btn-group">
      <a href="/technokit" className="btn btn-primary">
        🛠️ Ouvrir TechnoKit
      </a>
      <a href="/docs" className="btn btn-secondary">
        📖 Documentation complète
      </a>
    </div>
  </section>
);

export default TechnoLabPresentation;
