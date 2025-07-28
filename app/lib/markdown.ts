import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDirectory = path.join(process.cwd(), 'content')

export async function getStepContent(chapterId: string, stepId: string) {
  const fullPath = path.join(contentDirectory, 'chapters', chapterId, `${stepId}.md`)
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const processedContent = await remark()
      .use(html)
      .process(content)
    
    const contentHtml = processedContent.toString()
    
    return {
      ...data,
      contentHtml
    }
  } catch (error) {
    console.error(`Error reading markdown file: ${fullPath}`, error)
    return null
  }
}

export function getAllStepsForChapter(chapterId: string) {
  const chapterPath = path.join(contentDirectory, 'chapters', chapterId)
  
  try {
    const fileNames = fs.readdirSync(chapterPath)
    const markdownFiles = fileNames.filter(name => name.endsWith('.md'))
    
    const steps = markdownFiles.map(fileName => {
      const fullPath = path.join(chapterPath, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      
      return data
    })
    
    return steps.sort((a, b) => {
      const aNum = parseInt(a.stepNumber.replace('-', ''))
      const bNum = parseInt(b.stepNumber.replace('-', ''))
      return aNum - bNum
    })
  } catch (error) {
    console.error(`Error reading chapter directory: ${chapterPath}`, error)
    return []
  }
}

export function getChapterMetadata(chapterId: string) {
  const metadataPath = path.join(contentDirectory, 'chapters', chapterId, 'metadata.json')
  
  try {
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'))
    return metadata
  } catch (error) {
    console.error(`Error reading chapter metadata: ${metadataPath}`, error)
    return null
  }
}