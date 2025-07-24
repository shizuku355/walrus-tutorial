import { Chapter } from '@/app/types'

export const chapters: Chapter[] = [
  {
    id: 'chapter-1',
    title: 'Chapter 1: Walrusの世界へようこそ',
    description: '分散型ストレージの基本概念を学びましょう',
    icon: '',
    color: 'from-blue-400 to-blue-600',
    steps: [
      {
        id: 'step-1-1',
        chapterId: 'chapter-1',
        stepNumber: '1-1',
        title: '分散型ストレージとは？',
        description: '従来のストレージとの違いを理解しよう',
        content: '',
        completed: false,
        badge: {
          id: 'badge-first-step',
          name: '最初の一歩',
          description: 'Walrusの学習を始めました！',
          icon: '🎯'
        }
      },
      {
        id: 'step-1-2',
        chapterId: 'chapter-1',
        stepNumber: '1-2',
        title: 'Walrusの特徴と仕組み',
        description: 'Walrusがどのように動作するか学ぼう',
        content: '',
        completed: false
      },
      {
        id: 'step-1-3',
        chapterId: 'chapter-1',
        stepNumber: '1-3',
        title: 'なぜWalrusを使うのか？',
        description: 'Walrusの利点と使用例を探ろう',
        content: '',
        completed: false,
        badge: {
          id: 'badge-chapter-1',
          name: 'Walrus初心者',
          description: 'チャプター1を完了しました！',
          icon: '🐋'
        }
      }
    ]
  },
  {
    id: 'chapter-2',
    title: 'Chapter 2: 開発環境の準備',
    description: 'Walrus開発に必要なツールをセットアップしよう',
    icon: '',
    color: 'from-purple-400 to-purple-600',
    steps: [
      {
        id: 'step-2-1',
        chapterId: 'chapter-2',
        stepNumber: '2-1',
        title: 'Suiのインストール',
        description: 'Sui CLIをインストールしよう',
        content: '',
        completed: false
      },
      {
        id: 'step-2-2',
        chapterId: 'chapter-2',
        stepNumber: '2-2',
        title: 'Sui CLIの基本的な使い方',
        description: 'ウォレット作成とネットワーク設定を学ぼう',
        content: '',
        completed: false
      },
      {
        id: 'step-2-3',
        chapterId: 'chapter-2',
        stepNumber: '2-3',
        title: 'Walrusのインストール',
        description: 'Walrus CLIをセットアップしよう',
        content: '',
        completed: false
      },
      {
        id: 'step-2-4',
        chapterId: 'chapter-2',
        stepNumber: '2-4',
        title: 'Walrus CLIの基本的な使い方',
        description: 'ファイル保存と取得の基本操作を学ぼう',
        content: '',
        completed: false
      },
      {
        id: 'step-2-5',
        chapterId: 'chapter-2',
        stepNumber: '2-5',
        title: 'サイトビルダーのインストール',
        description: 'Walrus Site-Builderをセットアップしよう',
        content: '',
        completed: false,
        badge: {
          id: 'badge-chapter-2',
          name: '環境構築マスター',
          description: '開発環境の準備が完了しました！',
          icon: '⚙️'
        }
      }
    ]
  },
  {
    id: 'chapter-4',
    title: 'Chapter 4: 高度な機能と最適化',
    description: 'Walrus Sitesの高度な機能を活用しよう',
    icon: '',
    color: 'from-orange-400 to-orange-600',
    steps: [
      {
        id: 'step-4-1',
        chapterId: 'chapter-4',
        stepNumber: '4-1',
        title: 'ws-resources.jsonの高度な設定',
        description: 'ルーティング、ヘッダー、リダイレクトを設定しよう',
        content: '',
        completed: false
      },
      {
        id: 'step-4-2',
        chapterId: 'chapter-4',
        stepNumber: '4-2',
        title: 'サイトの更新とバージョン管理',
        description: 'デプロイ済みサイトの効率的な更新方法を学ぼう',
        content: '',
        completed: false
      },
      {
        id: 'step-4-3',
        chapterId: 'chapter-4',
        stepNumber: '4-3',
        title: 'GitHub Actionsでの自動デプロイ',
        description: 'CI/CDパイプラインを構築しよう',
        content: '',
        completed: false
      },
      {
        id: 'step-4-4',
        chapterId: 'chapter-4',
        stepNumber: '4-4',
        title: 'パフォーマンス最適化',
        description: 'サイトの読み込み速度とユーザー体験を向上させよう',
        content: '',
        completed: false,
        badge: {
          id: 'badge-chapter-4',
          name: '上級開発者',
          description: 'Walrus Sitesの高度な機能をマスターしました！',
          icon: '🏆'
        }
      }
    ]
  },
  {
    id: 'chapter-3',
    title: 'Chapter 3: はじめてのWalrus Site',
    description: 'シンプルなサイトを作ってデプロイしてみよう',
    icon: '',
    color: 'from-green-400 to-green-600',
    steps: [
      {
        id: 'step-3-1',
        chapterId: 'chapter-3',
        stepNumber: '3-1',
        title: 'HTMLサイト作成とWalrusデプロイ',
        description: '基本的なサイトを作成してtestnetにデプロイしよう',
        content: '',
        completed: false
      },
      {
        id: 'step-3-2',
        chapterId: 'chapter-3',
        stepNumber: '3-2',
        title: 'ローカルポータルでサイト確認',
        description: 'testnetサイトをローカルポータルで表示してみよう',
        content: '',
        completed: false,
        badge: {
          id: 'badge-first-deploy',
          name: '初デプロイ',
          description: '初めてWalrusにサイトを公開しました！',
          icon: '🎉'
        }
      },
      {
        id: 'step-3-3',
        chapterId: 'chapter-3',
        stepNumber: '3-3',
        title: 'mainnet本格運用とSuiNS設定',
        description: 'mainnetでサイトを公開してwal.appで世界に発信しよう',
        content: '',
        completed: false,
        badge: {
          id: 'badge-chapter-3',
          name: 'Walrus開発者',
          description: 'サイトの作成とデプロイをマスターしました！',
          icon: '🌟'
        }
      }
    ]
  }
]

export function getChapterById(id: string): Chapter | undefined {
  return chapters.find(chapter => chapter.id === id)
}

export function getStepById(stepId: string): { chapter: Chapter; step: any } | undefined {
  for (const chapter of chapters) {
    const step = chapter.steps.find(s => s.id === stepId)
    if (step) {
      return { chapter, step }
    }
  }
  return undefined
}

export function getNextStep(currentStepId: string): { chapter: Chapter; step: any } | undefined {
  let foundCurrent = false
  
  for (const chapter of chapters) {
    for (const step of chapter.steps) {
      if (foundCurrent) {
        return { chapter, step }
      }
      if (step.id === currentStepId) {
        foundCurrent = true
      }
    }
  }
  
  return undefined
}

export function getPreviousStep(currentStepId: string): { chapter: Chapter; step: any } | undefined {
  let previousStep = undefined
  let previousChapter = undefined
  
  for (const chapter of chapters) {
    for (const step of chapter.steps) {
      if (step.id === currentStepId && previousStep) {
        return { chapter: previousChapter!, step: previousStep }
      }
      previousStep = step
      previousChapter = chapter
    }
  }
  
  return undefined
}