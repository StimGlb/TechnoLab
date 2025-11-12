/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Activation du mode sombre
  theme: {
    extend: {
      colors: {
        // Couleurs primaires (peut être utilisé pour les boutons, en-têtes)
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        // Palette pédagogique étendue avec des nuances
        pedagogie: {
          math: {
            light: '#60a5fa',   // Bleu clair
            DEFAULT: '#3b82f6', // Bleu par défaut
            dark: '#2563eb',    // Bleu foncé
          },
          science: {
            light: '#34d399',
            DEFAULT: '#10b981',
            dark: '#059669',
          },
          literature: {
            light: '#a78bfa',
            DEFAULT: '#8b5cf6',
            dark: '#7c3aed',
          },
          history: {
            light: '#fbbf24',
            DEFAULT: '#f59e0b',
            dark: '#d97706',
          },
          // Couleurs supplémentaires pour les statuts
          success: '#10b981',  // Vert pour les succès
          warning: '#f59e0b',  // Orange pour les avertissements
          danger: '#ef4444',   // Rouge pour les erreurs
          info: '#3b82f6',     // Bleu pour les informations
        },
      },
      // Tailles spécifiques pour les composants pédagogiques
      spacing: {
        '128': '32rem',
        '144': '36rem', // Pour les grands tableaux de bord
      },
      // Personnalisation des grilles
      gridTemplateColumns: {
        'courses': 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
        'dashboard': 'repeat(auto-fit, minmax(250px, 1fr))',
      },
      // Personnalisation des ombres pour les cartes
      boxShadow: {
        'course': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'assignment': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      // Personnalisation des bordures pour les notes/évaluations
      borderWidth: {
        '3': '3px',
      },
      // Animation pour les notifications
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // Plugin personnalisé pour les composants pédagogiques
    function({ addComponents }) {
      addComponents({
        '.course-badge': {
          '@apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium':
            {},
        },
        '.assignment-card': {
          '@apply bg-white dark:bg-gray-800 rounded-lg shadow-course p-4 border border-gray-200 dark:border-gray-700':
            {},
        },
      });
    },
  ],
};
