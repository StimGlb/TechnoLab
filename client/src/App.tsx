import { useState } from 'react'
import { Menu, X, Moon, Sun, Key, BookOpen, Bot, FileText, Settings } from 'lucide-react'

export default function App() {
  const [isDark, setIsDark] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [isApiKeyVisible, setIsApiKeyVisible] = useState(false)
  const [activeSection, setActiveSection] = useState<'home' | 'sequences' | 'chat' | 'fiches'>('home')

  // Toggle dark mode
  const toggleDarkMode = () => setIsDark(!isDark)

  // Simulation de sauvegarde de la clé API
  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('anthropic_api_key', apiKey)
      alert('✅ Clé API sauvegardée avec succès!')
    }
  }

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        
        {/* Navigation Bar */}
        <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              {/* Logo et titre */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    TechnoLab
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Cycle 4 • Collège</p>
                </div>
              </div>

              {/* Navigation Desktop */}
              <div className="hidden md:flex items-center gap-1">
                <NavButton 
                  icon={<BookOpen size={18} />} 
                  label="Accueil" 
                  active={activeSection === 'home'}
                  onClick={() => setActiveSection('home')}
                />
                <NavButton 
                  icon={<FileText size={18} />} 
                  label="Séquences" 
                  active={activeSection === 'sequences'}
                  onClick={() => setActiveSection('sequences')}
                />
                <NavButton 
                  icon={<Bot size={18} />} 
                  label="TechnoChat" 
                  active={activeSection === 'chat'}
                  onClick={() => setActiveSection('chat')}
                />
                <NavButton 
                  icon={<Settings size={18} />} 
                  label="Fiches" 
                  active={activeSection === 'fiches'}
                  onClick={() => setActiveSection('fiches')}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>

            {/* Menu Mobile */}
            {isMenuOpen && (
              <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex flex-col gap-2">
                  <MobileNavButton icon={<BookOpen size={18} />} label="Accueil" onClick={() => setActiveSection('home')} />
                  <MobileNavButton icon={<FileText size={18} />} label="Séquences" onClick={() => setActiveSection('sequences')} />
                  <MobileNavButton icon={<Bot size={18} />} label="TechnoChat" onClick={() => setActiveSection('chat')} />
                  <MobileNavButton icon={<Settings size={18} />} label="Fiches" onClick={() => setActiveSection('fiches')} />
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section - Configuration API */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Section Hero avec gradient */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1 shadow-2xl">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 sm:p-12">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
                <Key size={14} />
                <span>Configuration requise</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Bienvenue sur TechnoLab
              </h2>
              
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl">
                Configure ton assistant IA pour générer des séquences pédagogiques, des fiches d'activités et des évaluations adaptées au programme de Technologie Cycle 4.
              </p>

              {/* Zone de configuration API */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <label className="block text-sm font-semibold mb-3 text-slate-700 dark:text-slate-200">
                  Clé API Anthropic
                </label>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type={isApiKeyVisible ? 'text' : 'password'}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-ant-api03-..."
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-shadow"
                    />
                    <button
                      onClick={() => setIsApiKeyVisible(!isApiKeyVisible)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      {isApiKeyVisible ? '🙈' : '👁️'}
                    </button>
                  </div>
                  
                  <button
                    onClick={handleSaveApiKey}
                    disabled={!apiKey.trim()}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-700 dark:disabled:to-slate-600 text-white font-medium shadow-lg hover:shadow-xl disabled:shadow-none transition-all disabled:cursor-not-allowed"
                  >
                    Sauvegarder
                  </button>
                </div>

                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2">
                  <span className="text-amber-500">⚠️</span>
                  <span>
                    Ta clé API est stockée localement dans le navigateur. Obtiens-la sur{' '}
                    <a 
                      href="https://console.anthropic.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      console.anthropic.com
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Cards de fonctionnalités */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<FileText className="text-indigo-500" size={24} />}
              title="Séquences pédagogiques"
              description="Crée des séquences complètes alignées sur le programme Cycle 4"
              badge="9 compétences"
            />
            <FeatureCard
              icon={<Bot className="text-purple-500" size={24} />}
              title="Assistant IA"
              description="Génère des activités, évaluations et corrections personnalisées"
              badge="Powered by Claude"
            />
            <FeatureCard
              icon={<BookOpen className="text-pink-500" size={24} />}
              title="Fiches d'activités"
              description="Exporte des PDF prêts à imprimer avec Firebase"
              badge="HTML + PDF"
            />
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Séquences" value="12" />
            <StatCard label="Activités" value="48" />
            <StatCard label="Élèves" value="128" />
            <StatCard label="Heures" value="256" />
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 border-t border-slate-200 dark:border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} TechnoLab • Collège Moulin à Vent • React + Vite + Tailwind + Claude AI
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

// Composants réutilisables
function NavButton({ 
  icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        active 
          ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' 
          : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  )
}

function MobileNavButton({ 
  icon, 
  label, 
  onClick 
}: { 
  icon: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  )
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  badge 
}: { 
  icon: React.ReactNode
  title: string
  description: string
  badge: string
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-lg group">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-medium text-slate-600 dark:text-slate-400">
          {badge}
        </span>
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 text-center">
      <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-1">
        {value}
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-400">{label}</div>
    </div>
  )
}