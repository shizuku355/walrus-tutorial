import { UserProgress, Badge } from '@/app/types'

const PROGRESS_KEY = 'walrus-challenge-progress'

export function getProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return getDefaultProgress()
  }

  const saved = localStorage.getItem(PROGRESS_KEY)
  if (!saved) {
    const defaultProgress = getDefaultProgress()
    saveProgress(defaultProgress)
    return defaultProgress
  }

  try {
    const progress = JSON.parse(saved)
    progress.startedAt = new Date(progress.startedAt)
    progress.lastActiveAt = new Date(progress.lastActiveAt)
    progress.badges = progress.badges.map((badge: any) => ({
      ...badge,
      earnedAt: badge.earnedAt ? new Date(badge.earnedAt) : undefined
    }))
    return progress
  } catch {
    const defaultProgress = getDefaultProgress()
    saveProgress(defaultProgress)
    return defaultProgress
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return
  
  localStorage.setItem(PROGRESS_KEY, JSON.stringify({
    ...progress,
    lastActiveAt: new Date()
  }))
}

export function markStepCompleted(stepId: string, badge?: Badge): UserProgress {
  const progress = getProgress()
  
  if (!progress.completedSteps.includes(stepId)) {
    progress.completedSteps.push(stepId)
  }
  
  if (badge && !progress.badges.find(b => b.id === badge.id)) {
    progress.badges.push({
      ...badge,
      earnedAt: new Date()
    })
  }
  
  progress.currentStep = stepId
  progress.totalProgress = calculateProgress(progress.completedSteps)
  
  saveProgress(progress)
  return progress
}

export function setCurrentStep(stepId: string): UserProgress {
  const progress = getProgress()
  progress.currentStep = stepId
  saveProgress(progress)
  return progress
}

export function isStepCompleted(stepId: string): boolean {
  const progress = getProgress()
  return progress.completedSteps.includes(stepId)
}

export function calculateProgress(completedSteps: string[]): number {
  // Total number of steps across all chapters
  const totalSteps = 20 // 5 chapters with varying steps
  return Math.round((completedSteps.length / totalSteps) * 100)
}

export function resetProgress(): UserProgress {
  const defaultProgress = getDefaultProgress()
  saveProgress(defaultProgress)
  return defaultProgress
}

function getDefaultProgress(): UserProgress {
  return {
    completedSteps: [],
    currentStep: 'step-1-1',
    badges: [],
    startedAt: new Date(),
    lastActiveAt: new Date(),
    totalProgress: 0
  }
}