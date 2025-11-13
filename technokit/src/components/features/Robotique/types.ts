// src/features/robotique/components/MBot2Activity/types.ts

export interface ProgramStep {
  title: string
  description: string
  blocks?: string[]
}

export interface NextStep {
  title: string
  description: string
}

export interface MBot2ActivityData {
  id: string
  title: string
  level: 'débutant' | 'intermédiaire' | 'avancé'
  objectives: string[]
  materials: string[]
  steps: ProgramStep[]
  troubleshooting: string[]
  nextSteps: NextStep[]
  competencies: string[]
}
