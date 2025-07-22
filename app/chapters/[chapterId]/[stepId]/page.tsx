import { getStepById, chapters } from '@/app/lib/chapters'
import StepClient from './StepClient'

export async function generateStaticParams() {
  const params = []
  for (const chapter of chapters) {
    for (const step of chapter.steps) {
      params.push({
        chapterId: chapter.id,
        stepId: step.id
      })
    }
  }
  return params
}

interface Params {
  chapterId: string
  stepId: string
}

export default async function StepPage({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params
  const stepData = getStepById(resolvedParams.stepId)
  
  if (!stepData) {
    return null
  }
  
  return <StepClient stepData={stepData} />
}
