import { Chapter } from '@/app/types'

export const chapters: Chapter[] = [
  {
    id: 'chapter-1',
    title: 'Walrusの世界へようこそ',
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
    title: '開発環境の準備',
    description: 'Walrus開発に必要なツールをセットアップしよう',
    icon: '',
    color: 'from-purple-400 to-purple-600',
    steps: [
      {
        id: 'step-2-1',
        chapterId: 'chapter-2',
        stepNumber: '2-1',
        title: 'Rustのインストール',
        description: 'Rust開発環境を整えよう',
        content: '',
        completed: false
      },
      {
        id: 'step-2-2',
        chapterId: 'chapter-2',
        stepNumber: '2-2',
        title: 'Suiウォレットの作成',
        description: 'Walrus用のウォレットをセットアップしよう',
        content: '',
        completed: false
      },
      {
        id: 'step-2-3',
        chapterId: 'chapter-2',
        stepNumber: '2-3',
        title: 'テストネットトークンの取得',
        description: '開発・テスト用のトークンを取得しよう',
        content: '',
        completed: false
      },
      {
        id: 'step-2-4',
        chapterId: 'chapter-2',
        stepNumber: '2-4',
        title: 'Site-Builderのインストール',
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
    id: 'chapter-3',
    title: 'はじめてのWalrus Site',
    description: 'シンプルなサイトを作ってデプロイしてみよう',
    icon: '',
    color: 'from-green-400 to-green-600',
    steps: [
      {
        id: 'step-3-1',
        chapterId: 'chapter-3',
        stepNumber: '3-1',
        title: 'シンプルなHTMLサイトの作成',
        description: '基本的なウェブサイトを作ろう',
        content: '',
        completed: false
      },
      {
        id: 'step-3-2',
        chapterId: 'chapter-3',
        stepNumber: '3-2',
        title: 'Site Builderでのデプロイ',
        description: 'Walrusにサイトをアップロードしよう',
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
        title: 'サイトの確認とデバッグ',
        description: 'デプロイしたサイトをチェックしよう',
        content: '',
        completed: false
      },
      {
        id: 'step-3-4',
        chapterId: 'chapter-3',
        stepNumber: '3-4',
        title: 'アップデートの実施',
        description: 'サイトを更新してみよう',
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
  },
  {
    id: 'chapter-4',
    title: '実践的なサイト構築',
    description: 'より高度なウェブサイトを構築しよう',
    icon: '',
    color: 'from-orange-400 to-orange-600',
    steps: [
      {
        id: 'step-4-1',
        chapterId: 'chapter-4',
        stepNumber: '4-1',
        title: 'Next.jsサイトの準備',
        description: 'モダンなフレームワークを使おう',
        content: '',
        completed: false
      },
      {
        id: 'step-4-2',
        chapterId: 'chapter-4',
        stepNumber: '4-2',
        title: '静的サイトジェネレーション',
        description: 'Walrus用にサイトをビルドしよう',
        content: '',
        completed: false
      },
      {
        id: 'step-4-3',
        chapterId: 'chapter-4',
        stepNumber: '4-3',
        title: 'カスタムドメインの設定',
        description: '独自ドメインを使ってみよう',
        content: '',
        completed: false
      },
      {
        id: 'step-4-4',
        chapterId: 'chapter-4',
        stepNumber: '4-4',
        title: 'GitHub Actionsでの自動デプロイ',
        description: 'CI/CDパイプラインを構築しよう',
        content: '',
        completed: false,
        badge: {
          id: 'badge-chapter-4',
          name: '上級開発者',
          description: '実践的なWalrusサイト構築をマスターしました！',
          icon: '🏆'
        }
      }
    ]
  },
  {
    id: 'chapter-5',
    title: '上級テクニック',
    description: 'Walrusの高度な機能を活用しよう',
    icon: '',
    color: 'from-indigo-400 to-indigo-600',
    steps: [
      {
        id: 'step-5-1',
        chapterId: 'chapter-5',
        stepNumber: '5-1',
        title: 'パフォーマンス最適化',
        description: 'サイトの速度を向上させよう',
        content: '',
        completed: false
      },
      {
        id: 'step-5-2',
        chapterId: 'chapter-5',
        stepNumber: '5-2',
        title: '複数バージョンの管理',
        description: 'バージョニングを活用しよう',
        content: '',
        completed: false
      },
      {
        id: 'step-5-3',
        chapterId: 'chapter-5',
        stepNumber: '5-3',
        title: '他のdAppsとの連携',
        description: '分散型アプリケーションと統合しよう',
        content: '',
        completed: false,
        badge: {
          id: 'badge-master',
          name: 'Walrusマスター',
          description: 'すべてのChallengeを完了しました！',
          icon: '👑'
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