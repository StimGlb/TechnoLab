// src/features/Robotique/MBot2Activity/MBot2Activity.tsx
import React, { useState } from 'react'
import { 
  Cpu, 
  CheckCircle, 
  AlertCircle, 
  Lightbulb, 
  Zap, 
  ChevronDown, 
  ChevronUp,
  Download,
  Play,
  Book,
  Target
} from 'lucide-react'

interface MBot2ActivityProps {
  level?: 'débutant' | 'intermédiaire' | 'avancé'
}

export function MBot2Activity({ level = 'débutant' }: MBot2ActivityProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [showTroubleshooting, setShowTroubleshooting] = useState(false)

  const toggleStep = (stepIndex: number) => {
    setCompletedSteps(prev =>
      prev.includes(stepIndex)
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    )
  }

  const steps = [
    {
      title: "Connexion du robot",
      description: "Allume ton mBot2 et connecte-le à mBlock via Bluetooth",
      details: [
        "Appuie sur le bouton Power du mBot2",
        "Lance l'application mBlock 5",
        "Clique sur 'Connexion' puis 'Bluetooth'",
        "Sélectionne ton mBot2 dans la liste"
      ]
    },
    {
      title: "Création du programme",
      description: "Construis la séquence de blocs dans l'éditeur",
      details: [
        "Glisse le bloc 'Quand le drapeau vert est cliqué'",
        "Ajoute 'Avancer à 50% pendant 2 secondes'",
        "Ajoute 'Reculer à 50% pendant 2 secondes'",
        "Vérifie l'ordre des blocs"
      ]
    },
    {
      title: "Test et ajustement",
      description: "Lance le programme et observe le comportement",
      details: [
        "Clique sur le drapeau vert",
        "Observe si le robot avance puis recule",
        "Ajuste la vitesse si nécessaire",
        "Modifie la durée selon tes besoins"
      ]
    }
  ]

  const progress = (completedSteps.length / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* 🎯 En-tête harmonisé avec App.tsx */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1 shadow-2xl mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-8 sm:p-12">
            
            {/* Badge niveau */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
              <Cpu size={14} />
              <span>Niveau {level}</span>
            </div>

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Premier Programme mBot2
                </h1>
                
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 max-w-2xl">
                  Apprends à programmer ton robot pour qu'il avance et recule automatiquement ! 
                  Cette activité te permettra de découvrir les bases de la programmation par blocs.
                </p>

                {/* Objectifs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm flex items-center gap-1">
                    <Target size={14} />
                    Compétence 6
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm">
                    ⏱️ 30 minutes
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm">
                    🎓 3ème
                  </span>
                </div>
              </div>

              {/* Icône robot */}
              <div className="hidden md:block">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center">
                  <Cpu className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
            </div>

            {/* Barre de progression */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Progression
                </span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 📋 Matériel nécessaire */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
              <Book className="text-indigo-600 dark:text-indigo-400" size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Matériel nécessaire
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <MaterialCard icon="🤖" text="1 robot mBot2" />
            <MaterialCard icon="💻" text="Application mBlock 5" />
            <MaterialCard icon="🔋" text="Batteries chargées" />
            <MaterialCard icon="📱" text="Connexion Bluetooth" />
          </div>
        </div>

        {/* 🚀 Étapes du projet */}
        <div className="space-y-4 mb-6">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              stepNumber={index + 1}
              title={step.title}
              description={step.description}
              details={step.details}
              isCompleted={completedSteps.includes(index)}
              onToggle={() => toggleStep(index)}
            />
          ))}
        </div>

        {/* 💡 Code à réaliser */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50">
              <Play className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Code à réaliser
            </h2>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <div className="space-y-3 font-mono text-sm">
              <CodeBlock color="bg-yellow-500" text="🚩 Quand le drapeau vert est cliqué" />
              <CodeBlock color="bg-green-500" text="▶️ Avancer à 50% pendant 2 secondes" />
              <CodeBlock color="bg-blue-500" text="◀️ Reculer à 50% pendant 2 secondes" />
            </div>
          </div>
        </div>

        {/* 🎯 Défis supplémentaires */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
              <Zap className="text-indigo-600 dark:text-indigo-400" size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Défis supplémentaires
            </h2>
          </div>
          <div className="space-y-3">
            <ChallengeCard 
              level="Facile" 
              text="Fais avancer le robot pendant 3 secondes au lieu de 2" 
              color="green"
            />
            <ChallengeCard 
              level="Moyen" 
              text="Ajoute un virage à gauche entre l'avancée et le recul" 
              color="yellow"
            />
            <ChallengeCard 
              level="Difficile" 
              text="Crée une boucle pour que le robot répète l'action 3 fois" 
              color="red"
            />
          </div>
        </div>

        {/* ⚠️ Dépannage */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <button
            onClick={() => setShowTroubleshooting(!showTroubleshooting)}
            className="w-full flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/50">
                <AlertCircle className="text-orange-600 dark:text-orange-400" size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Problèmes fréquents et solutions
              </h2>
            </div>
            {showTroubleshooting ? <ChevronUp /> : <ChevronDown />}
          </button>

          {showTroubleshooting && (
            <div className="px-6 pb-6 space-y-4">
              <TroubleshootCard
                problem="Le robot ne se connecte pas"
                solutions={[
                  "Vérifie que le Bluetooth est activé sur ton ordinateur",
                  "Assure-toi que le robot est allumé (LED bleue)",
                  "Redémarre mBlock et le robot"
                ]}
              />
              <TroubleshootCard
                problem="Le robot ne bouge pas"
                solutions={[
                  "Vérifie que les batteries sont chargées",
                  "Assure-toi que les moteurs sont bien branchés",
                  "Teste d'abord avec le mode 'Jouer' de mBlock"
                ]}
              />
              <TroubleshootCard
                problem="Le robot tourne au lieu d'avancer"
                solutions={[
                  "Vérifie que tu utilises 'Avancer' et non 'Tourner'",
                  "Assure-toi que les deux moteurs tournent à la même vitesse",
                  "Contrôle le câblage des moteurs"
                ]}
              />
            </div>
          )}
        </div>

        {/* 📥 Boutons d'action */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-lg">
            <Download size={18} />
            Télécharger la fiche PDF
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors">
            <Book size={18} />
            Voir d'autres activités
          </button>
        </div>

      </div>
    </div>
  )
}

// 🧩 Composants réutilisables

function MaterialCard({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
      <span className="text-2xl">{icon}</span>
      <span className="text-slate-700 dark:text-slate-300 font-medium">{text}</span>
    </div>
  )
}

function StepCard({ 
  stepNumber, 
  title, 
  description, 
  details, 
  isCompleted, 
  onToggle 
}: {
  stepNumber: number
  title: string
  description: string
  details: string[]
  isCompleted: boolean
  onToggle: () => void
}) {
  return (
    <div className={`
      bg-white dark:bg-slate-800 rounded-xl p-6 border-2 transition-all
      ${isCompleted 
        ? 'border-green-500 dark:border-green-600' 
        : 'border-slate-200 dark:border-slate-700'
      }
    `}>
      <div className="flex items-start gap-4">
        <button
          onClick={onToggle}
          className={`
            flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all
            ${isCompleted
              ? 'bg-green-500 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
            }
          `}
        >
          {isCompleted ? <CheckCircle size={20} /> : stepNumber}
        </button>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
            {title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-3">
            {description}
          </p>
          <ul className="space-y-2">
            {details.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="text-indigo-600 dark:text-indigo-400 mt-0.5">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function CodeBlock({ color, text }: { color: string; text: string }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-slate-700 dark:text-slate-300">{text}</span>
    </div>
  )
}

function ChallengeCard({ level, text, color }: { level: string; text: string; color: string }) {
  const colors = {
    green: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700'
  }

  return (
    <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      <span className={`px-2 py-1 rounded-full text-xs font-bold border ${colors[color as keyof typeof colors]}`}>
        {level}
      </span>
      <p className="text-slate-700 dark:text-slate-300 flex-1">{text}</p>
    </div>
  )
}

function TroubleshootCard({ problem, solutions }: { problem: string; solutions: string[] }) {
  return (
    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
      <h4 className="font-bold text-orange-900 dark:text-orange-300 mb-2 flex items-center gap-2">
        <AlertCircle size={18} />
        {problem}
      </h4>
      <ul className="space-y-1 ml-6">
        {solutions.map((solution, idx) => (
          <li key={idx} className="text-sm text-orange-800 dark:text-orange-400">
            ✓ {solution}
          </li>
        ))}
      </ul>
    </div>
  )
}
