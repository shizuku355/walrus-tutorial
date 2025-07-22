'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { getProgress } from '@/app/lib/progress'
import { BadgeDisplay } from '@/app/components/ui/BadgeDisplay'
import { UserProgress } from '@/app/types'

export default function CompletionPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null)

  useEffect(() => {
    setProgress(getProgress())
  }, [])

  if (!progress) {
    return null
  }

  const completionTime = progress.lastActiveAt.getTime() - progress.startedAt.getTime()
  const days = Math.floor(completionTime / (1000 * 60 * 60 * 24))
  const hours = Math.floor((completionTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <motion.div
              className="text-8xl mb-4"
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              🎉
            </motion.div>
            <h1 className="text-5xl font-bold gradient-text mb-4">
              おめでとうございます！
            </h1>
            <p className="text-2xl text-gray-600">
              WalrusChallengeを完了しました！
            </p>
          </div>

          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">完了証明書</h2>
            
            <div className="border-4 border-double border-gold-500 p-8 rounded-lg bg-gradient-to-br from-yellow-50 to-white">
              <div className="text-6xl mb-4">👑</div>
              <h3 className="text-3xl font-bold mb-2">Walrusマスター</h3>
              <p className="text-gray-600 mb-6">
                すべてのChallengeを完了し、Walrusの達人となりました
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-left max-w-md mx-auto mb-6">
                <div>
                  <p className="text-sm text-gray-500">完了ステップ数</p>
                  <p className="text-xl font-bold">{progress.completedSteps.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">獲得バッジ数</p>
                  <p className="text-xl font-bold">{progress.badges.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">所要時間</p>
                  <p className="text-xl font-bold">{days}日 {hours}時間</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">完了日</p>
                  <p className="text-xl font-bold">
                    {new Date().toLocaleDateString('ja-JP')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">獲得したバッジ</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {progress.badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <BadgeDisplay badge={badge} size="sm" showEarnedDate />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-4">次のステップ</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">🚀 あなたのWalrus Siteを公開しよう！</h3>
              <p className="text-gray-600">
                学んだ知識を活かして、実際にWalrus上にあなたのサイトをデプロイしてみましょう。
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">👥 コミュニティに参加</h3>
              <p className="text-gray-600">
                Walrusコミュニティで他の開発者と交流し、さらなる学びを深めましょう。
              </p>
            </div>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Link href="/">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                ホームに戻る
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}