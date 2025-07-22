'use client'

import Link from 'next/link'
import { getNextStep, getPreviousStep } from '@/app/lib/chapters'

interface StepNavigationProps {
  currentStepId: string
}

export function StepNavigation({ currentStepId }: StepNavigationProps) {
  const previous = getPreviousStep(currentStepId)
  const next = getNextStep(currentStepId)

  return (
    <div className="flex justify-between items-center mt-8 pt-8 border-t">
      {previous ? (
        <Link 
          href={`/chapters/${previous.chapter.id}/${previous.step.id}`}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <span>←</span>
          <div className="text-left">
            <div className="text-xs text-gray-600">前のステップ</div>
            <div className="font-semibold">{previous.step.title}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link 
          href={`/chapters/${next.chapter.id}/${next.step.id}`}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          <div className="text-right">
            <div className="text-xs text-blue-100">次のステップ</div>
            <div className="font-semibold">{next.step.title}</div>
          </div>
          <span>→</span>
        </Link>
      ) : (
        <Link 
          href="/completion"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white rounded-lg transition-all"
        >
          <div className="text-right">
            <div className="text-xs">すべて完了！</div>
            <div className="font-semibold">完了証明を見る</div>
          </div>
          <span>🎉</span>
        </Link>
      )}
    </div>
  )
}