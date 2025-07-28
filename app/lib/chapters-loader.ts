import fs from 'fs'
import path from 'path'
import { Chapter, Step } from '@/app/types'
import { getAllStepsForChapter, getChapterMetadata } from './markdown'

const contentDirectory = path.join(process.cwd(), 'content', 'chapters')

export function loadChapters(): Chapter[] {
  try {
    const chapterDirs = fs.readdirSync(contentDirectory)
      .filter(dir => fs.statSync(path.join(contentDirectory, dir)).isDirectory())
      .sort()
    
    const chapters: Chapter[] = []
    
    for (const chapterDir of chapterDirs) {
      const metadata = getChapterMetadata(chapterDir)
      if (!metadata) continue
      
      const steps = getAllStepsForChapter(chapterDir)
      
      const chapterSteps: Step[] = steps.map(stepData => ({
        id: stepData.id,
        chapterId: stepData.chapterId,
        stepNumber: stepData.stepNumber,
        title: stepData.title,
        description: stepData.description,
        content: '', // Content will be loaded dynamically
        completed: false,
        badge: stepData.badge
      }))
      
      chapters.push({
        ...metadata,
        steps: chapterSteps
      })
    }
    
    return chapters
  } catch (error) {
    console.error('Error loading chapters:', error)
    // Fallback to hardcoded chapters if loading fails
    return []
  }
}