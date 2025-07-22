'use client'

import Link from 'next/link'
import { Chapter } from '@/app/types'
import { isStepCompleted } from '@/app/lib/progress'

interface ChapterCardProps {
  chapter: Chapter
}

export function ChapterCard({ chapter }: ChapterCardProps) {
  const completedSteps = chapter.steps.filter(step => isStepCompleted(step.id)).length
  const totalSteps = chapter.steps.length
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0

  return (
    <Link href={`/chapters/${chapter.id}`}>
      <div className={`chapter-card bg-gradient-to-br ${chapter.color}`}>
        {chapter.icon && <div className="text-5xl mb-4">{chapter.icon}</div>}
        <h3 className="text-2xl font-bold mb-2">{chapter.title}</h3>
        <p className="text-white/90 mb-4">{chapter.description}</p>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>進捗</span>
            <span>{completedSteps}/{totalSteps} 完了</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  )
}