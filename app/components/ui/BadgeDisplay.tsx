'use client'

import { Badge } from '@/app/types'

interface BadgeDisplayProps {
  badge: Badge
  size?: 'sm' | 'md' | 'lg'
  showEarnedDate?: boolean
}

export function BadgeDisplay({ badge, size = 'md', showEarnedDate = false }: BadgeDisplayProps) {
  const sizeClasses = {
    sm: 'text-2xl p-2',
    md: 'text-4xl p-3',
    lg: 'text-6xl p-4'
  }

  return (
    <div className="flex flex-col items-center">
      <div className={`badge-earned rounded-full ${sizeClasses[size]} shadow-lg`}>
        <span>{badge.icon}</span>
      </div>
      <h3 className="mt-2 font-semibold text-gray-800">{badge.name}</h3>
      <p className="text-sm text-gray-600">{badge.description}</p>
      {showEarnedDate && badge.earnedAt && (
        <p className="text-xs text-gray-500 mt-1">
          取得日: {new Date(badge.earnedAt).toLocaleDateString('ja-JP')}
        </p>
      )}
    </div>
  )
}