export interface Chapter {
  id: string
  title: string
  description: string
  steps: Step[]
  icon: string
  color: string
}

export interface Step {
  id: string
  chapterId: string
  stepNumber: string
  title: string
  description: string
  content: string
  completed: boolean
  badge?: Badge
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedAt?: Date
}

export interface UserProgress {
  completedSteps: string[]
  currentStep: string
  badges: Badge[]
  startedAt: Date
  lastActiveAt: Date
  totalProgress: number
}

export interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  points: number
}