'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Chapter } from '@/app/types'
import { isStepCompleted } from '@/app/lib/progress'

export default function ChapterClient({ chapter }: { chapter: Chapter }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">ホーム</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{chapter.title}</span>
          </div>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className={`text-center mb-12 p-8 rounded-2xl bg-gradient-to-br ${chapter.color} text-white`}>
              <div className="text-6xl mb-4">{chapter.icon}</div>
              <h1 className="text-4xl font-bold mb-4">{chapter.title}</h1>
              <p className="text-xl text-white/90">{chapter.description}</p>
            </div>

            <div className="space-y-4">
              {chapter.steps.map((step: any, index: number) => {
                const completed = isStepCompleted(step.id)
                const locked = index > 0 && !isStepCompleted(chapter.steps[index - 1].id)
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link 
                      href={locked ? '#' : `/chapters/${chapter.id}/${step.id}`}
                      className={locked ? 'cursor-not-allowed' : ''}
                    >
                      <div className={`
                        p-6 rounded-lg border-2 transition-all
                        ${completed ? 'step-complete' : locked ? 'step-locked' : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-md'}
                      `}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`
                              w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold
                              ${completed ? 'bg-green-500 text-white' : locked ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white'}
                            `}>
                              {completed ? '✓' : locked ? '🔒' : index + 1}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold">{step.title}</h3>
                              <p className="text-sm text-gray-600">{step.description}</p>
                            </div>
                          </div>
                          {step.badge && (
                            <div className="text-2xl">
                              {completed ? step.badge.icon : '🏆'}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-12 text-center">
              <Link href="/">
                <button className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">
                  ← チャプター一覧に戻る
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}