import { getChapterById, chapters } from '@/app/lib/chapters'
import ChapterClient from './ChapterClient'

export async function generateStaticParams() {
  return chapters.map((chapter) => ({
    chapterId: chapter.id
  }))
}

interface Params {
  chapterId: string
}

export default async function ChapterPage({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params
  const chapter = getChapterById(resolvedParams.chapterId)
  
  if (!chapter) {
    return null
  }
  
  return <ChapterClient chapter={chapter} />
}
