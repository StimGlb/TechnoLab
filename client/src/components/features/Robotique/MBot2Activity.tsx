import React, { useState } from 'react'
import { Cpu, CheckCircle, AlertCircle, Lightbulb, Zap, ChevronDown, ChevronUp } from 'lucide-react'

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* En-tête */}
        <header className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-3xl shadow-2xl p-8 md:p-12 text-white mb-8">
          <div className="text-center">
            {/* Utilise l'emoji ou l'icône Bot */}
            <div className="flex justify-center mb-4">
              <Cpu className="w-20 h-20 animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Premier Programme mBot2
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Apprends à programmer ton robot pour qu'il avance et recule automatiquement !
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Zap size={18} />
              <span className="font-semibold">Niveau {level}</span>
            </div>
          </div>
        </header>

        {/* Objectif */}
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-3 flex-shrink-0">
              <Lightbulb className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                🎯 Objectif de la séance
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Ton robot va apprendre à <span className="font-bold text-blue-600">avancer pendant 2 secondes</span>, 
                puis à <span className="font-bold text-blue-600">reculer pendant 2 secondes</span>. 
                C'est un programme simple mais essentiel pour comprendre comment commander un robot !
              </p>
            </div>
          </div>
        </section>

        {/* Matériel nécessaire */}
        <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Cpu className="text-purple-600" size={28} />
            🔧 Matériel nécessaire
          </h2>
          <ul className="grid md:grid-cols-2 gap-3">
            {materials.map((item, index) => (
              <li key={index} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Étapes du programme */}
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            📋 Étapes du Programme
          </h2>
          
          <div className="space-y-4">
            {programSteps.map((step, index) => (
              <ProgramStepCard
                key={index}
                step={step}
                stepNumber={index + 1}
                isCompleted={completedSteps.includes(index)}
                onToggle={() => toggleStep(index)}
              />
            ))}
          </div>

          {/* Barre de progression */}
          <div className="mt-6 bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${(completedSteps.length / programSteps.length) * 100}%` }}
            />
          </div>
          <p className="text-center mt-2 text-sm text-gray-600">
            {completedSteps.length} / {programSteps.length} étapes complétées
          </p>
        </section>

        {/* Dépannage */}
        <section className="mb-6">
          <button
            onClick={() => setShowTroubleshooting(!showTroubleshooting)}
            className="w-full bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <AlertCircle size={28} />
              <span className="text-xl font-bold">
                🚨 Ton robot ne fonctionne pas ?
              </span>
            </div>
            <span className="text-2xl">{showTroubleshooting ? '▼' : '▶'}</span>
          </button>

          {showTroubleshooting && (
            <div className="bg-white rounded-b-2xl shadow-lg p-6 -mt-2">
              <h3 className="font-bold text-lg mb-4 text-gray-800">
                Vérifie ces points :
              </h3>
              <ul className="space-y-3">
                {troubleshootingSteps.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold flex-shrink-0">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Prochaines étapes */}
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            🎯 Prochaines Étapes
          </h2>
          <p className="text-gray-700 mb-6">
            Une fois que tu maîtrises ce programme simple, tu peux essayer ces défis :
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {nextSteps.map((step, index) => (
              <NextStepCard key={index} step={step} />
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

// Composant Étape de Programme
function ProgramStepCard({ 
  step, 
  stepNumber, 
  isCompleted, 
  onToggle 
}: { 
  step: ProgramStep
  stepNumber: number
  isCompleted: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`border-2 rounded-xl p-4 transition-all cursor-pointer ${
        isCompleted
          ? 'border-green-400 bg-green-50 shadow-md'
          : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
          isCompleted 
            ? 'bg-green-500 text-white' 
            : 'bg-blue-500 text-white'
        }`}>
          {isCompleted ? '✓' : stepNumber}
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800 mb-2">{step.title}</h3>
          <p className="text-gray-700 mb-3">{step.description}</p>
          
          {step.blocks && (
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-3 font-mono text-sm">
              {step.blocks.map((block, i) => (
                <div key={i} className="mb-1 last:mb-0">→ {block}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Composant Prochaine Étape
function NextStepCard({ step }: { step: NextStep }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 border-2 border-blue-200 hover:border-blue-400 hover:shadow-md transition-all">
      <h3 className="font-bold text-lg text-gray-800 mb-2">{step.title}</h3>
      <p className="text-gray-700 text-sm">{step.description}</p>
    </div>
  )
}

// Données statiques
const materials = [
  "Un robot mBot2",
  "Un ordinateur avec mBlock 5 installé",
  "Un câble USB pour connecter le robot",
  "De l'espace au sol pour tester le robot"
]

const programSteps: ProgramStep[] = [
  {
    title: "🚀 Démarrer quand on clique sur le drapeau vert",
    description: "C'est le bloc qui lance ton programme",
    blocks: ["Quand 🚩 cliqué"]
  },
  {
    title: "⏱️ Avancer pendant 2 secondes",
    description: "Le robot va avancer tout droit",
    blocks: ["Avancer à vitesse 50%", "Attendre 2 secondes"]
  },
  {
    title: "🔄 Reculer pendant 2 secondes",
    description: "Le robot fait marche arrière",
    blocks: ["Reculer à vitesse 50%", "Attendre 2 secondes"]
  },
  {
    title: "🛑 Arrêter les moteurs",
    description: "Important pour que le robot ne continue pas indéfiniment !",
    blocks: ["Arrêter tous les moteurs"]
  }
]

const troubleshootingSteps = [
  "Le robot est bien allumé (voyant lumineux visible)",
  "Les piles sont chargées",
  "Le câble USB est bien branché",
  "mBlock 5 est ouvert et connecté au robot",
  "Tu as bien cliqué sur le drapeau vert pour lancer le programme",
  "Tu as bien ajouté le bloc 'drapeau vert' au début",
  "Le robot est sur une surface qui permet aux roues de bien adhérer"
]

const nextSteps: NextStep[] = [
  {
    title: "Modifier les durées",
    description: "Change les valeurs 'attendre X secondes' pour voir comment le comportement du robot change"
  },
  {
    title: "Créer un parcours",
    description: "Fais un parcours au sol avec du ruban adhésif et programme le robot pour le suivre"
  },
  {
    title: "Ajouter des lumières",
    description: "Utilise les blocs 'allumer les LED' pour faire clignoter les lumières du robot"
  },
  {
    title: "Faire un carré",
    description: "Programme le robot pour qu'il trace un carré : avance, tourne à 90°, répète 4 fois"
  }
]

export default MBot2Activity
