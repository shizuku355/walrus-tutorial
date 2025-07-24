'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { chapters } from '@/app/lib/chapters'
import { getProgress } from '@/app/lib/progress'
import { ChapterCard } from '@/app/components/ui/ChapterCard'
import { ProgressBar } from '@/app/components/ui/ProgressBar'

export default function Home() {
  const [progress, setProgress] = useState<number>(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const userProgress = getProgress()
    setProgress(userProgress.totalProgress)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-[500px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/sitelogo.png)' }}
      >
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
          </motion.div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative">
        {isClient && (
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="max-w-md mx-auto">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">全体の進捗</span>
                  <span>{progress}%</span>
                </div>
                <ProgressBar progress={progress} />
              </div>
            </div>
          </motion.div>
        )}

        <motion.div 
          className="max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            チャプター一覧
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* 上段：Chapter 1 & 2 */}
            {chapters.filter(chapter => chapter.id === 'chapter-1' || chapter.id === 'chapter-2').map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ChapterCard chapter={chapter} />
              </motion.div>
            ))}
            {/* 下段：Chapter 4 & 3 */}
            {chapters.filter(chapter => chapter.id === 'chapter-4' || chapter.id === 'chapter-3').map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (index + 2) * 0.1 }}
              >
                <ChapterCard chapter={chapter} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-4">
              🎯 Challengeの特徴
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-4xl mb-2">🎮</div>
                <h3 className="font-semibold mb-1">ゲーム感覚で学習</h3>
                <p className="text-sm text-blue-100">
                  ステップをクリアしてバッジを獲得
                </p>
              </div>
              <div>
                <div className="text-4xl mb-2">🛠️</div>
                <h3 className="font-semibold mb-1">実践的な内容</h3>
                <p className="text-sm text-blue-100">
                  実際にサイトを作りながら学習
                </p>
              </div>
              <div>
                <div className="text-4xl mb-2">🚀</div>
                <h3 className="font-semibold mb-1">段階的な学習</h3>
                <p className="text-sm text-blue-100">
                  初心者から上級者まで対応
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Link href="/chapters/chapter-1/step-1-1">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
              Challengeを開始する →
            </button>
          </Link>
        </motion.div>

        <footer className="mt-20 text-center text-gray-500">
          <p>Deployed on Walrus Network | {new Date().getFullYear()}</p>
        </footer>
      </div>
    </main>
  )
}