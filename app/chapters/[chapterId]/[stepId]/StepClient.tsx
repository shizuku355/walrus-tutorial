'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { markStepCompleted, setCurrentStep, isStepCompleted } from '@/app/lib/progress'
import { StepNavigation } from '@/app/components/ui/StepNavigation'
import { BadgeDisplay } from '@/app/components/ui/BadgeDisplay'
import Link from 'next/link'

export default function StepClient({ stepData }: { stepData: any }) {
  const [isCompleted, setIsCompleted] = useState(false)
  const [showBadge, setShowBadge] = useState(false)
  const { chapter, step } = stepData

  useEffect(() => {
    setIsCompleted(isStepCompleted(step.id))
    setCurrentStep(step.id)
  }, [step.id])

  const handleCompleteStep = () => {
    markStepCompleted(step.id, step.badge)
    setIsCompleted(true)
    
    if (step.badge) {
      setShowBadge(true)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">ホーム</Link>
            <span>/</span>
            <Link href={`/chapters/${chapter.id}`} className="hover:text-blue-600">
              {chapter.title}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{step.title}</span>
          </div>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className={`text-5xl p-4 rounded-full bg-gradient-to-br ${chapter.color} text-white`}>
                  {chapter.icon}
                </div>
                <div>
                  <div className="text-sm text-gray-600">ステップ {step.stepNumber}</div>
                  <h1 className="text-3xl font-bold text-gray-900">{step.title}</h1>
                  <p className="text-gray-600 mt-1">{step.description}</p>
                </div>
              </div>

              <div className="prose max-w-none mt-8">
                <StepContent stepId={step.id} />
              </div>

              {!isCompleted && (
                <motion.div
                  className="mt-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    onClick={handleCompleteStep}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
                  >
                    ステップを完了する ✓
                  </button>
                </motion.div>
              )}

              {isCompleted && (
                <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <p className="text-green-800 font-semibold">
                    ✅ このステップは完了しています！
                  </p>
                </div>
              )}

              <StepNavigation currentStepId={step.id} />
            </div>
          </div>
        </motion.div>
      </div>

      {showBadge && step.badge && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowBadge(false)}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-md w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-center mb-6">
              🎉 バッジを獲得しました！
            </h2>
            <BadgeDisplay badge={step.badge} size="lg" />
            <button
              onClick={() => setShowBadge(false)}
              className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              閉じる
            </button>
          </motion.div>
        </motion.div>
      )}
    </main>
  )
}

function StepContent({ stepId }: { stepId: string }) {
  const content = getStepContent(stepId)
  return <div dangerouslySetInnerHTML={{ __html: content }} />
}

function getStepContent(stepId: string): string {
  const contents: Record<string, string> = {
    'step-1-1': `
      <h2>分散型ストレージとは？</h2>
      <p>従来のウェブサイトは、単一のサーバーやデータセンターでホスティングされています。これには以下のような問題があります：</p>
      <ul>
        <li><strong>単一障害点</strong>：サーバーがダウンすると、サイト全体がアクセス不能に</li>
        <li><strong>検閲のリスク</strong>：中央管理者による内容の削除や変更</li>
        <li><strong>高コスト</strong>：信頼性の高いホスティングには高額な費用が必要</li>
      </ul>
      
      <h3>Walrusの分散型アプローチ</h3>
      <p>Walrusは、データを複数のノードに分散して保存します：</p>
      <ol>
        <li>データは小さな断片（シャード）に分割される</li>
        <li>各シャードは複数のノードに複製される</li>
        <li>特定のノードがダウンしても、データは復元可能</li>
      </ol>
      
      <div class="bg-blue-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">💡 ポイント</p>
        <p>Walrusでは、あなたのウェブサイトは世界中のノードに分散して保存されるため、どこか一つのノードに問題が起きても、サイトは正常に動作し続けます。</p>
      </div>
    `,
    'step-1-2': `
      <h2>Walrusの仕組み</h2>
      <p>Walrusは以下の要素で構成されています：</p>
      
      <h3>1. ストレージノード</h3>
      <p>データの実際の保存を担当するコンピューター群です。世界中に分散して配置されています。</p>
      
      <h3>2. Suiブロックチェーン</h3>
      <p>ストレージの調整と支払いを管理します。データの所有権と利用権限を記録します。</p>
      
      <h3>3. WALトークン</h3>
      <p>ストレージの利用料金として使用される暗号通貨です。</p>
      
      <h3>4. イレージャーコーディング</h3>
      <p>データを効率的に分散保存するための技術：</p>
      <ul>
        <li>元データを複数の断片に分割</li>
        <li>一部の断片が失われても復元可能</li>
        <li>必要なストレージ容量を最小限に抑制</li>
      </ul>
      
      <div class="bg-purple-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">🔒 セキュリティ</p>
        <p>すべてのデータは暗号学的に検証可能で、改ざんを検出できます。</p>
      </div>
    `,
    'step-1-3': `
      <h2>Walrusを使う理由</h2>
      
      <h3>1. 永続性</h3>
      <p>一度アップロードしたコンテンツは、指定した期間確実に保存されます。サービスプロバイダーの都合で突然削除されることはありません。</p>
      
      <h3>2. 検閲耐性</h3>
      <p>分散型の性質により、特定の管理者がコンテンツを一方的に削除することができません。</p>
      
      <h3>3. 高可用性</h3>
      <p>世界中のノードにデータが分散しているため、99.9%以上の稼働率を実現します。</p>
      
      <h3>4. コスト効率</h3>
      <p>イレージャーコーディングにより、従来の3重複製と比べて67%もストレージコストを削減できます。</p>
      
      <h3>実際の使用例</h3>
      <ul>
        <li><strong>個人ブログ</strong>：永続的で検閲されないブログプラットフォーム</li>
        <li><strong>NFTメタデータ</strong>：確実に保存されるNFTの画像やメタデータ</li>
        <li><strong>dAppフロントエンド</strong>：分散型アプリケーションのUI</li>
        <li><strong>アーカイブ</strong>：重要な文書や記録の長期保存</li>
      </ul>
      
      <div class="bg-green-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">✨ まとめ</p>
        <p>Walrusは、ウェブサイトやデータを永続的、分散的、そして検閲耐性のある方法で保存するための革新的なソリューションです。</p>
      </div>
    `,
    'step-2-1': `
      <h2>Suiのインストール</h2>
      <p>Walrus SitesはSuiブロックチェーン上で動作します。まずはSui CLIをインストールして、Suiエコシステムの開発環境を整えましょう。</p>
      
      <h3>1. Suiupのインストール</h3>
      <p>Suiupは、SuiエコシステムのCLIツールを管理するためのツールです。RustのRustupのようなもので、複数のバージョンを管理できます。</p>
      
      <h4>macOS / Linux</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p>curl -sSfL https://raw.githubusercontent.com/Mystenlabs/suiup/main/install.sh | sh</p>
      </div>
      
      <h4>Windows</h4>
      <p><strong>1. ダウンロード</strong></p>
      <p><a href="https://github.com/Mystenlabs/suiup/releases" target="_blank" class="text-blue-600 hover:text-blue-800">Suiup Releases</a>から<code>suiup-windows.zip</code>をダウンロードして展開します。</p>
      
      <p><strong>2. 専用フォルダの作成</strong></p>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p>mkdir "$env:USERPROFILE\\bin" -Force</p>
      </div>
      
      <p><strong>3. 環境変数の設定</strong></p>
      <ol class="list-decimal ml-6 mt-2">
        <li>Windowsキー + Rを押して「ファイル名を指定して実行」を開く</li>
        <li><code>sysdm.cpl</code>を入力してEnter</li>
        <li>「環境変数」ボタンをクリック</li>
        <li>「Path」変数に<code>%USERPROFILE%\\bin</code>を追加</li>
      </ol>
      
      <p><strong>4. インストール確認</strong></p>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p>suiup --help</p>
      </div>
      
      <h3>2. Sui CLIのインストール</h3>
      <p>suiupを使ってSui CLIをインストールします：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p>suiup install sui</p>
      </div>
      
      <p><strong>実際の実行例：</strong></p>
      <div class="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-2">
        <p>$ suiup install sui</p>
        <p>Downloading release list</p>
        <p>Saving releases list to cache</p>
        <p>Detected: macos-arm64...</p>
        <p>Last testnet release: v1.52.1</p>
        <p>Downloading release:   [00:02:22] [========================================] 330.17 MiB/330.17 MiB (0s) Download complete</p>
        <p>Adding binary: sui-v1.52.1</p>
        <p>Extracting file: sui</p>
        <p>'sui' extracted successfully!</p>
        <p>Do you want to set this new installed version as the default one? [y/N] y</p>
        <p>Installing binary to /Users/[user]/.local/share/suiup/binaries/testnet/sui-v1.52.1</p>
      </div>
      
      <div class="bg-blue-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">💡 ポイント</p>
        <ul class="list-disc ml-6">
          <li><strong>プラットフォーム自動検出</strong>：システムに適したバイナリを自動選択</li>
          <li><strong>ファイルサイズ</strong>：約330MBのダウンロードが必要（時間がかかる場合があります）</li>
          <li><strong>デフォルト設定</strong>：「y」を選択して新しいバージョンをデフォルトに設定</li>
        </ul>
      </div>
      
      <h3>3. インストールの確認</h3>
      <p>新しいターミナルを開くか、環境変数を再読み込みしてからバージョンを確認します：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 環境変数の再読み込み（macOS/Linux）</p>
        <p>source ~/.zshrc</p>
        <br>
        <p># バージョン確認</p>
        <p>sui --version</p>
        <br>
        <p># suiupでの管理状況確認</p>
        <p>suiup show</p>
      </div>
      
      <p><strong>実際の実行例：</strong></p>
      <div class="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-2">
        <p>$ sui --version</p>
        <p>sui 1.52.1-6656ec8446e4</p>
        <br>
        <p>$ suiup show</p>
        <p>Default binaries:</p>
        <p>[testnet release/branch]</p>
        <p>    sui-v1.52.1</p>
        <br>
        <p>Installed binaries:</p>
        <p>[testnet release/branch]</p>
        <p>    sui-v1.52.1</p>
      </div>
      
      <div class="bg-green-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">✅ インストール完了！</p>
        <p>Sui CLIが正常にインストールされ、suiup経由で管理されています。次のステップでは、テストネット環境への接続とウォレットの設定を行います。</p>
      </div>
      
      <div class="bg-blue-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">💡 Suiupの主な機能</p>
        <ul>
          <li><strong>複数ネットワーク対応</strong>：testnet、devnet、mainnetに対応</li>
          <li><strong>バージョン管理</strong>：異なるバージョンのSui CLIを管理</li>
          <li><strong>簡単な切り替え</strong>：プロジェクトに応じてバージョンを切り替え</li>
          <li><strong>特定バージョン指定</strong>：具体的なバージョン番号での指定も可能</li>
        </ul>
      </div>
      
      <h3>代替インストール方法</h3>
      
      <h4>Cargoを使用したインストール</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># Rustがインストールされている場合</p>
        <p>cargo install --locked --git https://github.com/MystenLabs/sui.git --branch testnet sui</p>
      </div>
      
      <h4>プリビルドバイナリ</h4>
      <p>GitHubリリースページからプラットフォーム別のバイナリをダウンロードすることも可能です。</p>
      
      <div class="bg-green-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">✅ チェックポイント</p>
        <ul>
          <li>Suiupがインストールされている</li>
          <li>Sui CLIがインストールされている</li>
          <li><code>sui --version</code>でバージョンが確認できる</li>
        </ul>
      </div>
    `,
    'step-2-2': `
      <h2>Sui CLIの基本的な使い方</h2>
      <p>Sui CLIをインストールしたので、次はテストネット環境への切り替え、ウォレットの確認、そしてWalrus Sites開発に必要な基本操作を学びましょう。</p>
      
      <h3>1. ネットワークの切り替え（テストネット）</h3>
      <p>Walrus Sitesの開発にはテストネット環境を使用します。まず現在のネットワーク環境を確認し、テストネットに切り替えましょう。</p>
      
      <h4>現在の環境確認</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p>sui client active-env</p>
      </div>
      
      <p><strong>実際の実行例：</strong></p>
      <div class="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-2">
        <p>$ sui client active-env</p>
        <p>[warning] Client/Server api version mismatch, client api version : 1.52.1, server api version : 1.52.2</p>
        <p>mainnet</p>
      </div>
      
      <h4>テストネットへの切り替え</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p>sui client switch --env testnet</p>
      </div>
      
      <p><strong>実際の実行例：</strong></p>
      <div class="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-2">
        <p>$ sui client switch --env testnet</p>
        <p>[warning] Client/Server api version mismatch, client api version : 1.52.1, server api version : 1.51.5</p>
        <p>Active environment switched to [testnet]</p>
      </div>
      
      <div class="bg-blue-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">💡 API バージョン警告について</p>
        <p>クライアントとサーバーのバージョンが微妙に異なる場合、警告が表示されることがありますが、通常は機能に影響ありません。これは実際の開発でよく遭遇する状況です。</p>
      </div>
      
      <h3>2. ウォレット（アドレス）の確認</h3>
      
      <h4>アクティブアドレスの確認</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p>sui client active-address</p>
      </div>
      
      <p><strong>実際の実行例：</strong></p>
      <div class="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-2">
        <p>$ sui client active-address</p>
        <p>[warning] Client/Server api version mismatch, client api version : 1.52.1, server api version : 1.52.2</p>
        <p>0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef</p>
      </div>
      
      <h4>アドレス管理の詳細操作</h4>
      
      <h5>新規アドレス作成・インポート・エクスポート</h5>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 新しいアドレスを作成</p>
        <p>sui client new-address ed25519</p>
        <br>
        <p># 既存のニーモニックフレーズからインポート</p>
        <p>sui keytool import "&lt;12語ニーモニック&gt;" ed25519</p>
        <br>
        <p># アドレスの秘密鍵をエクスポート</p>
        <p>sui keytool export --key-identity &lt;ADDRESSまたはALIAS&gt;</p>
      </div>
      
      <div class="bg-blue-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">💡 ADDRESSとALIASについて</p>
        <ul class="list-disc ml-6 mt-2">
          <li><strong>ADDRESS</strong>：<code>0x...</code>で始まるウォレットアドレスそのもの</li>
          <li><strong>ALIAS</strong>：<code>0x...</code>に付けた分かりやすい名前（自動生成または手動設定）</li>
          <li>生成時に自動でエイリアスが作成され、後で変更も可能</li>
        </ul>
      </div>
      
      <h5>秘密鍵の相互利用</h5>
      <p>Sui CLIで管理している秘密鍵は、GUIウォレット（Slushウォレット等）との間でインポート・エクスポートが可能です：</p>
      
      <div class="bg-gray-100 p-4 rounded-lg mt-2">
        <p class="font-semibold mb-2">相互利用の流れ</p>
        <ul class="list-disc ml-6 space-y-1">
          <li><strong>CLI → GUI</strong>：<code>sui keytool export</code>でエクスポートした秘密鍵をGUIウォレットにインポート</li>
          <li><strong>GUI → CLI</strong>：GUIウォレットからエクスポートした秘密鍵を<code>sui keytool import</code>でCLIに追加</li>
        </ul>
        <p class="mt-2 text-sm text-gray-600">これにより同じアドレスをCLIとGUIの両方で使い分けできます。</p>
      </div>
      
      <div class="bg-yellow-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">⚠️ 重要：秘密鍵の保管</p>
        <ul class="list-disc ml-6 mt-2">
          <li>新しいアドレスを作成すると、復旧フレーズ（Recovery phrase）が表示されます</li>
          <li>この情報は<strong>非常に重要</strong>なので、安全な場所に保存してください</li>
          <li>秘密鍵やニーモニックフレーズは第三者と絶対に共有しないでください</li>
        </ul>
      </div>
      
      <h3>3. SUIトークン残高の確認</h3>
      <p>Walrus Sitesの運用にはSUIトークンが必要です。現在の残高を確認しましょう：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p>sui client gas</p>
      </div>
      
      <p><strong>実際の実行例：</strong></p>
      <div class="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-2">
        <p>$ sui client gas</p>
        <p>[warning] Client/Server api version mismatch, client api version : 1.52.1, server api version : 1.52.2</p>
        <p>╭─────────────────┬──────────────┬─────────────╮</p>
        <p>│ gasCoinId       │ MIST Balance │ SUI Balance │</p>
        <p>├─────────────────┼──────────────┼─────────────┤</p>
        <p>│ 0xabc123...     │ 1000000000   │ 1.00        │</p>
        <p>│ 0x789def...     │ 1961838124   │ 1.96        │</p>
        <p>╰─────────────────┴──────────────┴─────────────╯</p>
      </div>
      
      <h3>4. テストネットフォーセット（トークンの取得）</h3>
      <p>テストネットでSUIトークンが不足している場合は、フォーセットから無料で取得できます：</p>
      
      <h4>方法1: CLIコマンド（推奨）</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p>sui client faucet</p>
      </div>
      
      <h4>方法2: Webフォーセット</h4>
      <p>ブラウザで<a href="https://faucet.sui.io/" target="_blank" class="text-blue-600 hover:text-blue-800">https://faucet.sui.io/</a>にアクセスして、ウォレットアドレスを入力してトークンを取得します。</p>
      
      <div class="bg-blue-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">💡 フォーセットについて</p>
        <ul class="list-disc ml-6">
          <li><strong>Devnet</strong>：1回あたり約10 SUI取得可能</li>
          <li><strong>Testnet</strong>：1回あたり約1 SUI取得可能</li>
          <li><strong>取得間隔</strong>：一定時間経過後に再度取得可能</li>
          <li><strong>用途</strong>：ガス代、Walrusトークンの交換に使用</li>
        </ul>
      </div>
      
      <h3>やってみよう！ 🎯</h3>
      <p>実際にSui CLIを使ってテストネット環境をセットアップしてみましょう：</p>
      
      <div class="bg-green-50 p-4 rounded-lg">
        <p class="font-semibold">チェックリスト</p>
        <div class="mt-2 space-y-2">
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            <code>sui client active-env</code>でtestnetに設定されている
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            <code>sui client active-address</code>でウォレットアドレスが表示される
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            <code>sui client gas</code>で1 SUI以上の残高がある
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            必要に応じてフォーセットからSUIトークンを取得した
          </label>
        </div>
      </div>
      
      <div class="bg-blue-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">✨ 次のステップ</p>
        <p>Sui CLIの基本設定が完了しました！次はWalrus CLIをインストールして、分散型ストレージの世界に足を踏み入れましょう。</p>
      </div>
      
    `,
    'step-2-3': `
      <h2>Walrusのインストール</h2>
      <p>Walrusは分散型ストレージシステムで、Walrus SitesはこのWalrusを活用してウェブサイトをホスティングします。Step 2-1で使用したsuiupを活用して、統一された方法でWalrus CLIをインストールしましょう。</p>
      
      <h3>1. suiupを使用したインストール（推奨）</h3>
      <p>SuiとWalrusを統一された方法で管理できるsuiupを使用します：</p>
      
      <h4>利用可能なバイナリの確認</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p>suiup list</p>
      </div>
      
      <p><strong>実際の実行例：</strong></p>
      <div class="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-2">
        <p>$ suiup list</p>
        <p>Available binaries to install:</p>
        <p> - sui</p>
        <p> - walrus</p>
        <p> - mvr</p>
      </div>
      
      <h4>Walrus CLIのインストール</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p>suiup install walrus</p>
      </div>
      
      <p><strong>実際の実行例：</strong></p>
      <div class="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-2">
        <p>$ suiup install walrus</p>
        <p>Downloading release list</p>
        <p>Saving releases list to cache</p>
        <p>Detected: macos-arm64...</p>
        <p>Last testnet release: v1.28.3</p>
        <p>Downloading release:   [00:00:02] [========================================] 33.34 MiB/33.34 MiB (0s) Download complete</p>
        <p>Adding binary: walrus-v1.28.3</p>
        <p>Extracting file: walrus</p>
        <p>'walrus' extracted successfully!</p>
        <p>Do you want to set this new installed version as the default one? [y/N] y</p>
        <p>Installing binary to /Users/[user]/.local/share/suiup/binaries/testnet/walrus-v1.28.3</p>
        <p>Setting walrus as default</p>
        <p>[testnet] walrus-v1.28.3 set as default</p>
      </div>
      
      <div class="bg-blue-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">💡 ポイント</p>
        <ul class="list-disc ml-6">
          <li><strong>高速ダウンロード</strong>：約33MBと軽量（Suiの約330MBと比較）</li>
          <li><strong>統一管理</strong>：SuiとWalrusを同じツールで管理</li>
          <li><strong>自動バージョン選択</strong>：testnet用の最新版を自動選択</li>
          <li><strong>簡単更新</strong>：将来のアップデートも<code>suiup update walrus</code>で可能</li>
        </ul>
      </div>
      
      <h3>2. インストールの確認</h3>
      <p>Walrus CLIが正常にインストールされたか確認します：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># バージョン確認</p>
        <p>walrus --version</p>
        <br>
        <p># suiupでの管理状況確認</p>
        <p>suiup show</p>
      </div>
      
      <p><strong>実際の実行例：</strong></p>
      <div class="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-2">
        <p>$ walrus --version</p>
        <p>walrus 1.28.3-0b68158aeb6f</p>
        <br>
        <p>$ suiup show</p>
        <p>Default binaries:</p>
        <p>[testnet release/branch]</p>
        <p>    sui-v1.52.1</p>
        <p>    walrus-v1.28.3</p>
        <br>
        <p>Installed binaries:</p>
        <p>[testnet release/branch]</p>
        <p>    sui-v1.52.1</p>
        <p>    walrus-v1.28.3</p>
      </div>
      
      <h3>3. 代替インストール方法</h3>
      <p>suiupが利用できない場合の代替インストール方法です：</p>
      
      <h4>方法A: 公式インストールスクリプト</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># macOS / Linux / WSL</p>
        <p>curl -sSf https://install.wal.app | sh</p>
        <br>
        <p># インストール後、パスを更新</p>
        <p>source ~/.bashrc  # または ~/.zshrc</p>
      </div>
      
      <h4>方法B: Cargoからのインストール</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># テストネット版（Walrus Sites開発用）</p>
        <p>cargo install --git https://github.com/MystenLabs/walrus walrus</p>
      </div>
      
      <h3>4. 設定ファイルの作成</h3>
      <p>Walrus CLIを使用するために、設定ファイルを作成する必要があります：</p>
      
      <h4>設定ディレクトリの作成</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 設定ディレクトリを作成</p>
        <p>mkdir -p ~/.config/walrus</p>
      </div>
      
      <h4>設定ファイルのダウンロード</h4>
      <p>公式の設定ファイルをダウンロードします：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 公式設定ファイルをダウンロード</p>
        <p>curl https://docs.wal.app/setup/client_config.yaml -o ~/.config/walrus/client_config.yaml</p>
      </div>
      
      <h4>設定ファイルの確認</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 設定ファイルが作成されたか確認</p>
        <p>ls ~/.config/walrus/</p>
        <br>
        <p># 設定内容を確認</p>
        <p>cat ~/.config/walrus/client_config.yaml</p>
      </div>
      
      <div class="bg-blue-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">📝 設定ファイルについて</p>
        <ul class="list-disc ml-6">
          <li><strong>デフォルト設定</strong>：mainnetとtestnetの両方の設定を含む</li>
          <li><strong>自動選択</strong>：デフォルトではmainnetコンテキストを使用</li>
          <li><strong>testnet用設定</strong>：次のステップで詳しく説明</li>
          <li><strong>Sui設定連携</strong>：既存のSui CLIの設定を自動で読み込み</li>
        </ul>
      </div>
      
      <div class="bg-green-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">✅ インストール完了！</p>
        <p>Walrus CLIのインストールと基本設定が完了しました！SuiとWalrusの両方がsuiup経由で管理され、設定ファイルも準備できました。次のステップでは、testnet環境でのWAL交換と基本的な使い方を学習します。</p>
      </div>
    `,
    'step-2-4': `
      <h2>Walrus CLIの基本的な使い方</h2>
      <p>Walrus CLIがインストールできたので、testnet環境でSUIからWALトークンの交換を実際に試してみましょう。Walrus Sitesの運用に必要なWALトークンの取得方法を学びます。</p>
      
      <h3>1. 設定ファイルの編集</h3>
      <p>Walrus CLIをtestnet環境で使用するために、設定ファイルを編集する必要があります。</p>
      
      <h4>設定ファイルの確認</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 設定ファイルの場所を確認</p>
        <p>ls ~/.config/walrus/</p>
        <br>
        <p># 現在の設定内容を確認</p>
        <p>cat ~/.config/walrus/client_config.yaml</p>
      </div>
      
      <p><strong>実際の実行例：</strong></p>
      <div class="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-2">
        <p>$ ls ~/.config/walrus/</p>
        <p>client_config.yaml      sites-config.yaml</p>
      </div>
      
      <h4>testnet設定への変更</h4>
      <p>デフォルトでは設定がmainnetになっているため、testnet用に編集します：</p>
      
      <div class="bg-yellow-50 p-4 rounded-lg">
        <p class="font-semibold">📝 設定ファイルの編集方法</p>
        <div class="mt-2">
          <p><strong>方法1: nano（推奨・初心者向け）</strong></p>
          <div class="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mt-1">
            <p>nano ~/.config/walrus/client_config.yaml</p>
          </div>
          <p class="text-sm mt-1">保存: Ctrl + O → Enter、終了: Ctrl + X</p>
          
          <p class="mt-2"><strong>方法2: VS Code</strong></p>
          <div class="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mt-1">
            <p>code ~/.config/walrus/client_config.yaml</p>
          </div>
          
          <p class="mt-2"><strong>方法3: デフォルトエディタ（Mac）</strong></p>
          <div class="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mt-1">
            <p>open -e ~/.config/walrus/client_config.yaml</p>
          </div>
        </div>
      </div>
      
      <h4>必要な設定変更</h4>
      <p>設定ファイルで以下の変更を行います：</p>
      
      <div class="bg-blue-50 p-4 rounded-lg">
        <p class="font-semibold">🔧 変更箇所</p>
        <ol class="list-decimal ml-6 mt-2">
          <li>testnet設定を追加</li>
          <li><code>default_context: mainnet</code> → <code>default_context: testnet</code>に変更</li>
          <li>testnet用のexchange_objectsを設定</li>
        </ol>
      </div>
      
      <h3>2. SUI→WAL交換の実行</h3>
      <p>設定ファイルを正しく編集したら、SUIトークンをWALトークンに交換してみましょう。</p>
      
      <h4>事前確認</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># SUIトークン残高確認</p>
        <p>sui client gas</p>
        <br>
        <p># テストネット環境確認</p>
        <p>sui client active-env</p>
      </div>
      
      <h4>WAL交換コマンドの実行</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># デフォルトの交換（0.5 SUI分）</p>
        <p>walrus get-wal</p>
      </div>
      
      <p><strong>実際の実行例：</strong></p>
      <div class="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-2">
        <p>$ walrus get-wal</p>
        <p>2025-07-22T11:22:02.704562Z  INFO walrus_sdk::config: using Walrus configuration from '/Users/[user]/.config/walrus/client_config.yaml' with 'testnet' context</p>
        <p>2025-07-22T11:22:02.704872Z  INFO walrus_sui::config: using Sui wallet configuration from '/Users/[user]/.sui/sui_config/client.yaml'</p>
        <p>2025-07-22T11:22:05.510525Z  INFO walrus_service::client::cli::runner: exchanging 0.500 SUI for WAL using exchange object 0x83b454e5...</p>
        <p>Success: Exchanged 0.500 SUI for WAL.</p>
        <p>2025-07-22T11:22:07.195814Z  INFO walrus_sdk::client::refresh: the channel is closed, stopping the refresher</p>
      </div>
      
      <div class="bg-blue-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">💡 交換処理の詳細</p>
        <ul class="list-disc ml-6">
          <li><strong>testnetコンテキスト</strong>：設定ファイルが正しく読み込まれている</li>
          <li><strong>交換量</strong>：デフォルトで0.5 SUI（500,000,000 MIST）</li>
          <li><strong>exchange object</strong>：testnet用の交換オブジェクトが自動選択</li>
          <li><strong>処理時間</strong>：約5秒程度で完了</li>
        </ul>
      </div>
      
      <h4>特定の量を指定した交換</h4>
      <p>より多くのWALトークンが必要な場合は、交換量を指定できます：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 1 SUI分を交換（MIST単位で指定）</p>
        <p>walrus get-wal --amount 1000000000</p>
        <br>
        <p># 2 SUI分を交換</p>
        <p>walrus get-wal --amount 2000000000</p>
      </div>
      
      <div class="bg-yellow-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">📊 単位の理解</p>
        <ul class="list-disc ml-6">
          <li><strong>1 SUI</strong> = 1,000,000,000 MIST</li>
          <li><strong>1 WAL</strong> = 1,000,000,000 FROST</li>
          <li><strong>交換レート</strong>：1:1（1 SUI = 1 WAL）</li>
          <li><strong>デフォルト交換量</strong>：500,000,000 MIST = 0.5 SUI</li>
        </ul>
      </div>
      
      <h3>3. やってみよう！ 🎯</h3>
      <p>実際に設定ファイルを編集してWAL交換を試してみましょう：</p>
      
      <div class="bg-green-50 p-4 rounded-lg">
        <p class="font-semibold">チェックリスト</p>
        <div class="mt-2 space-y-2">
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            設定ファイル（<code>~/.config/walrus/client_config.yaml</code>）を編集した
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            <code>default_context: testnet</code>に変更した
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            <code>sui client gas</code>で1 SUI以上の残高を確認した
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            <code>walrus get-wal</code>でWAL交換に成功した
          </label>
        </div>
      </div>
      
      <div class="bg-blue-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">💡 トラブルシューティング</p>
        <ul class="list-disc ml-6">
          <li><strong>「mainnet context」エラー</strong>：設定ファイルの<code>default_context</code>を確認</li>
          <li><strong>「exchange object must be specified」エラー</strong>：testnet設定のexchange_objectsを追加</li>
          <li><strong>残高不足エラー</strong>：<code>sui client faucet</code>でSUIを取得</li>
        </ul>
      </div>
      
      <div class="bg-green-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">✅ 完了！</p>
        <p>Walrus CLIの基本設定とWAL交換が完了しました！これでWalrus Sitesをデプロイするための準備が整いました。次のステップでは、Site-Builderツールをインストールして、実際にウェブサイトをデプロイする準備をします。</p>
      </div>
    `,
    'step-2-5': `
      <h2>サイトビルダーのインストール</h2>
      <p>Walrus Site-Builderは、静的ウェブサイトをWalrusネットワークにデプロイするための公式ツールです。HTMLやJavaScriptで作成したサイトを分散型ネットワーク上でホスティングできます。</p>
      
      <h3>1. testnet版のインストール（推奨）</h3>
      <p>学習・開発用にはtestnet版を使用します。実際の検証結果に基づいた手順を説明します。</p>
      
      <h4>システム変数の設定</h4>
      <p>CPU アーキテクチャに応じた変数を設定します：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># Apple Silicon Mac の場合</p>
        <p>SYSTEM=macos-arm64</p>
        <br>
        <p># Intel Mac の場合</p>
        <p>SYSTEM=macos-x86_64</p>
        <br>
        <p># 設定確認</p>
        <p>echo $SYSTEM</p>
      </div>
      
      <p><strong>実際の実行例：</strong></p>
      <div class="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-2">
        <p>$ SYSTEM=macos-arm64</p>
        <p>$ echo $SYSTEM</p>
        <p>macos-arm64</p>
      </div>
      
      <h4>testnet版のダウンロード</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p>curl https://storage.googleapis.com/mysten-walrus-binaries/site-builder-testnet-latest-$SYSTEM -o site-builder</p>
      </div>
      
      <p><strong>実際の実行例：</strong></p>
      <div class="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-2">
        <p>$ curl https://storage.googleapis.com/mysten-walrus-binaries/site-builder-testnet-latest-$SYSTEM -o site-builder</p>
        <p>  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current</p>
        <p>                                 Dload  Upload   Total   Spent    Left  Speed</p>
        <p>100 15.3M    0 15.3M    0     0  5685k      0 --:--:--  0:00:02 --:--:-- 5684k</p>
      </div>
      
      <h4>実行権限の付与とインストール</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 実行権限を付与</p>
        <p>chmod +x site-builder</p>
        <br>
        <p># PATHの通った場所に移動</p>
        <p>mv site-builder /usr/local/bin/</p>
      </div>
      
      <h4>testnet用設定ファイルのダウンロード</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p>curl https://raw.githubusercontent.com/MystenLabs/walrus-sites/refs/heads/testnet/sites-config.yaml -o ~/.config/walrus/sites-config.yaml</p>
      </div>
      
      <p><strong>実際の実行例：</strong></p>
      <div class="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-2">
        <p>$ curl https://raw.githubusercontent.com/MystenLabs/walrus-sites/refs/heads/testnet/sites-config.yaml -o ~/.config/walrus/sites-config.yaml</p>
        <p>  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current</p>
        <p>                                 Dload  Upload   Total   Spent    Left  Speed</p>
        <p>100  1510  100  1510    0     0   5054      0 --:--:-- --:--:-- --:--:--  5050</p>
      </div>
      
      <h4>インストール確認</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p>site-builder --version</p>
      </div>
      
      <p><strong>実際の実行例：</strong></p>
      <div class="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-2">
        <p>$ site-builder --version</p>
        <p>2025-07-22T12:27:00.199945Z  INFO site_builder: initializing site builder</p>
        <p>site-builder 1.0.1-f6b08ee5dc8d</p>
      </div>
      
      <h4>設定ファイルの確認</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 設定ファイルが正しく配置されているか確認</p>
        <p>ls ~/.config/walrus/</p>
      </div>
      
      <p><strong>実際の実行例：</strong></p>
      <div class="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-2">
        <p>$ ls ~/.config/walrus/</p>
        <p>client_config.yaml      sites-config.yaml</p>
      </div>
      
      <div class="bg-blue-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">📝 testnet設定について</p>
        <p>インストールされた設定ファイルは、testnetとmainnet両方の設定を含んでいますが、デフォルトはmainnetに設定されています。testnet環境で開発する場合は、次のチャプターで設定を変更します。</p>
      </div>
      
      <h3>2. mainnet版のインストール（本番運用時）</h3>
      <p>実際のサービス運用時には、mainnet版を使用します：</p>
      
      <div class="bg-yellow-50 p-4 rounded-lg">
        <p class="font-semibold">💼 mainnet版インストール</p>
        <div class="mt-2">
          <div class="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
            <p># mainnet版をダウンロード</p>
            <p>SYSTEM=macos-arm64</p>
            <p>curl https://storage.googleapis.com/mysten-walrus-binaries/site-builder-mainnet-latest-$SYSTEM -o site-builder</p>
            <p>chmod +x site-builder</p>
            <p>mv site-builder /usr/local/bin/</p>
          </div>
          <div class="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mt-2">
            <p># mainnet用設定ファイル</p>
            <p>curl https://raw.githubusercontent.com/MystenLabs/walrus-sites/refs/heads/mainnet/sites-config.yaml -o ~/.config/walrus/sites-config.yaml</p>
          </div>
        </div>
      </div>
      
      <div class="bg-red-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">⚠️ 注意：mainnet vs testnet</p>
        <ul class="list-disc ml-6">
          <li><strong>testnet</strong>：学習・開発・テスト用（無料）</li>
          <li><strong>mainnet</strong>：本番運用用（実際のSUI/WALトークンが必要）</li>
          <li><strong>設定の違い</strong>：package IDやstaking objectが異なります</li>
          <li><strong>このチュートリアル</strong>：testnet版で進めます</li>
        </ul>
      </div>
      
      <h3>3. やってみよう！ 🎯</h3>
      <p>Site-Builderのインストールが正しく完了したか確認してみましょう：</p>
      
      <div class="bg-green-50 p-4 rounded-lg">
        <p class="font-semibold">チェックリスト</p>
        <div class="mt-2 space-y-2">
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            <code>site-builder --version</code>でバージョンが表示される
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            <code>~/.config/walrus/sites-config.yaml</code>ファイルが存在する
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            環境変数<code>SYSTEM</code>が正しく設定されている
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            testnet版をインストールした（学習用）
          </label>
        </div>
      </div>
      
      <div class="bg-green-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">✅ 開発環境完了！</p>
        <p>Site-Builderのインストールが完了しました！これで Sui CLI、Walrus CLI、Site-Builder の3つのツールが揃い、Walrus Sitesの開発環境が完全に整いました。次のチャプターでは、実際に簡単なHTMLサイトを作成してWalrusネットワークにデプロイしてみましょう。</p>
      </div>
    `,
    'step-3-1': `
      <h2>シンプルなHTMLサイトの作成</h2>
      <p>実際にWalrusネットワークにデプロイできるシンプルなHTMLサイトを作成してみましょう。このステップでは、基本的なHTML構造とスタイリングを使用したサンプルサイトを作成します。</p>
      
      <h3>1. プロジェクトディレクトリの作成</h3>
      <p>まず、テスト用のプロジェクトディレクトリを作成します：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># プロジェクトディレクトリの作成</p>
        <p>mkdir test-walrus-site</p>
        <p>cd test-walrus-site</p>
      </div>
      
      <h3>2. HTML ファイルの作成</h3>
      <p>Walrus Sitesの基本的なHTMLサイトを作成します。<code>index.html</code>ファイルを作成して以下の内容を記述します：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># HTMLファイルの作成</p>
        <p>cat &lt;&lt; 'EOF' &gt; index.html</p>
        <p>&lt;!DOCTYPE html&gt;</p>
        <p>&lt;html lang="ja"&gt;</p>
        <p>&lt;head&gt;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;meta charset="UTF-8"&gt;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;title&gt;My First Walrus Site&lt;/title&gt;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;style&gt;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;body { </p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;font-family: Arial, sans-serif; </p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max-width: 800px; </p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;margin: 0 auto; </p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;padding: 20px;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min-height: 100vh;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;color: white;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;h1 { color: #ffffff; text-align: center; font-size: 3em; }</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.highlight { </p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;background: rgba(255, 255, 255, 0.1);</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;padding: 20px; </p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;border-radius: 15px;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text-align: center;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;backdrop-filter: blur(10px);</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/style&gt;</p>
        <p>&lt;/head&gt;</p>
        <p>&lt;body&gt;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;🌊 Hello from Walrus!&lt;/h1&gt;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="highlight"&gt;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;&lt;strong&gt;このサイトは分散型ウェブ上でホストされています。&lt;/strong&gt;&lt;/p&gt;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;Walrus Sitesへようこそ！&lt;/p&gt;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</p>
        <p>&lt;/body&gt;</p>
        <p>&lt;/html&gt;</p>
        <p>EOF</p>
      </div>
      
      <h3>3. サイトの基本構成</h3>
      
      <div class="bg-blue-50 p-4 rounded-lg">
        <p class="font-semibold">📁 プロジェクト構造</p>
        <div class="bg-gray-100 p-3 rounded font-mono text-sm mt-2">
          <p>test-walrus-site/</p>
          <p>└── index.html     # メインのHTMLファイル</p>
        </div>
      </div>
      
      <h3>4. デプロイの実行</h3>
      <p>作成したサイトをWalrusネットワークにデプロイします。実際の実行結果をもとに手順を説明します：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># Walrusネットワークにデプロイ（5エポック=約10週間保存）</p>
        <p>site-builder deploy --epochs 5 .</p>
      </div>
      
      <div class="bg-red-50 p-4 rounded-lg mb-4">
        <p class="font-semibold">⚠️ 重要な注意事項</p>
        <p><strong>デプロイディレクトリには必要なファイルのみを配置してください！</strong></p>
        <p>Site-Builderは指定したディレクトリ内の<strong>すべてのファイル</strong>をWalrusにアップロードします。不要なファイルは事前に削除または別の場所に移動してください。</p>
      </div>
      
      <p><strong>実際の実行結果（testnet）：</strong></p>
      <div class="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-2">
        <p>$ site-builder deploy --epochs 5 .</p>
        <p>2025-07-22T13:27:06.728825Z  INFO site_builder: initializing site builder</p>
        <p>2025-07-22T13:27:06.735912Z  INFO site_builder::config: loading the multi config context="testnet"</p>
        <p>2025-07-22T13:27:06.736022Z  INFO site_builder: configuration loaded</p>
        <p>Parsing the directory . and locally computing blob IDs ... [Ok]</p>
        <p>Storing resources on Walrus: batch 1 of 1 ... [Ok]</p>
        <p>Applying the Walrus Site object updates on Sui ... [Ok]</p>
        <p>2025-07-22T13:29:35.368562Z  INFO site_builder::publish: New site published.</p>
        <p>Creating ws-resources.json (Site Object ID: 0xd22dbb5d66428f43a7a96d0f612473ae7024318b713cfb8f4a70370a01596b1b)</p>
        <br>
        <p>Execution completed</p>
        <p>Resource operations performed:</p>
        <p>  - created resource /index.html with blob ID wPQg3TW2mPumG62D9nZBbDExFJF2vl5bLLOFBrPkae4</p>
        <p>  - created resource /ws-resources-mainnet.json with blob ID HimCcmOUvwTZpfkpU2DKESyyjPN46SbmrjxP9cz7oW0</p>
        <br>
        <p>Created new site: My Walrus Site</p>
        <p>New site object ID: 0xd22dbb5d66428f43a7a96d0f612473ae7024318b713cfb8f4a70370a01596b1b</p>
        <p>To browse the site, run a testnet portal locally and visit:</p>
        <p>    http://58l2c8iw5tsmpj6bfvq43kfo0l9wj1j2wskq78hmuiyxgl7l0b.localhost:3000</p>
      </div>
      
      <h3>5. デプロイ結果の理解</h3>
      
      <div class="bg-green-50 p-4 rounded-lg">
        <p class="font-semibold">✅ デプロイ成功！</p>
        <ul class="mt-2 space-y-1">
          <li><strong>ネットワーク</strong>: testnet</li>
          <li><strong>サイトオブジェクトID</strong>: 0xd22dbb5d66428f43a7a96d0f612473ae7024318b713cfb8f4a70370a01596b1b</li>
          <li><strong>リソースファイル</strong>: ws-resources.json が作成されました</li>
          <li><strong>ストレージ期間</strong>: 5エポック（約10週間）</li>
          <li><strong>処理時間</strong>: 約2分半（リソース保存とSuiオブジェクト更新）</li>
        </ul>
      </div>
      
      <div class="bg-yellow-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">🔧 作成されるファイル</p>
        <ul>
          <li><strong>ws-resources.json</strong>: サイトのメタデータとリソース情報</li>
          <li>サイトの更新や管理に必要な情報が含まれています</li>
          <li>このファイルは大切に保管してください</li>
        </ul>
      </div>
      
      <h3>6. サイトへのアクセス方法</h3>
      <p>デプロイしたサイトには2つの方法でアクセスできます：</p>
      
      <div class="bg-blue-50 p-4 rounded-lg">
        <p class="font-semibold">🌐 testnetでのアクセス方法</p>
        <div class="mt-2">
          <p><strong>現時点での唯一の方法: ローカルポータル</strong></p>
          <p class="text-sm bg-gray-100 p-2 rounded font-mono mt-1">
            http://58l2c8iw5tsmpj6bfvq43kfo0l9wj1j2wskq78hmuiyxgl7l0b.localhost:3000
          </p>
          <p class="text-sm text-gray-600 mt-1">※ ローカルにWalrus Portalの設定が必要（Step 3-3で詳しく説明）</p>
          
          <p class="mt-3"><strong>SuiNSドメインについて</strong></p>
          <p class="text-sm text-gray-600 mt-1">※ testnetポータルが廃止されたため、SuiNSドメインを設定してもwal.appでのアクセスはできません。SuiNSドメイン経由のアクセスはmainnetのみ可能です。</p>
        </div>
      </div>
      
      <h3>7. 🎯 やってみよう！</h3>
      <p>実際に自分のサイトを作成してデプロイしてみましょう：</p>
      
      <div class="bg-green-50 p-4 rounded-lg">
        <p class="font-semibold">チャレンジ</p>
        <div class="mt-2 space-y-2">
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            プロジェクトディレクトリを作成
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            HTMLファイルを作成（自分なりにカスタマイズ）
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            <code>site-builder deploy</code>コマンドを実行
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            サイトオブジェクトIDを確認
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            ws-resources.jsonファイルが作成されたことを確認
          </label>
        </div>
      </div>
      
      <div class="bg-purple-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">💡 重要なポイント</p>
        <ul>
          <li><strong>Site Object ID</strong>: Walrus Site の一意な識別子（0xd22dbb...）</li>
          <li><strong>Blob ID</strong>: 各ファイルの一意な識別子（wPQg3TW2...）</li>
          <li><strong>Base36エンコード</strong>: Object IDをURL用に変換した文字列（58l2c8iw...）</li>
          <li><strong>エポック数</strong>: ストレージ期間を指定（1エポック ≈ 2週間）</li>
          <li><strong>testnet</strong>: 学習・テスト用（無料のWALトークンで実験可能）</li>
          <li><strong>ディレクトリ注意</strong>: 指定フォルダ内の全ファイルがアップロード対象</li>
        </ul>
      </div>
      
      <div class="bg-green-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">🎉 Step 3-1 完了！</p>
        <p>シンプルなHTMLサイトの作成とtestnetへのデプロイが完了しました！次のステップでは、ローカルポータルを使ってデプロイしたサイトを実際に確認してみましょう。</p>
      </div>
    `,
    'step-3-2': `
      <h2>ローカルポータルでサイト確認</h2>
      <p>testnetにデプロイしたWalrus Siteは、ローカルポータルを起動することで実際に確認できます。このステップでは、Walrus Sitesのローカルポータルをセットアップして、デプロイしたサイトを表示してみましょう。</p>
      
      <div class="bg-yellow-50 p-4 rounded-lg mb-4">
        <p class="font-semibold">⚠️ 重要な制約</p>
        <p><strong>testnetポータルは廃止されました</strong>。testnetサイトは<code>wal.app</code>では表示できず、ローカルポータルでのみアクセス可能です。</p>
      </div>
      
      <h3>1. 必要なツールの確認</h3>
      <p>ローカルポータルの実行には以下のツールが必要です：</p>
      
      <div class="bg-blue-50 p-4 rounded-lg">
        <p class="font-semibold">📋 必要なツール</p>
        <ul class="mt-2">
          <li><strong>Git</strong>: リポジトリのクローン用</li>
          <li><strong>Bun</strong>: Node.jsランタイムとパッケージマネージャー</li>
        </ul>
      </div>
      
      <h3>2. Bunの確認・インストール</h3>
      <p>まず、Bunがインストールされているか確認します：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># Bunのバージョン確認</p>
        <p>bun --version</p>
      </div>
      
      <p>Bunがインストールされていない場合は、以下のコマンドでインストールします：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># Bunのインストール</p>
        <p>curl -fsSL https://bun.sh/install | bash</p>
        <br>
        <p># 環境変数の再読み込み</p>
        <p>source ~/.bashrc</p>
        <p># または</p>
        <p>source ~/.zshrc</p>
      </div>
      
      <h3>3. Walrus Sitesリポジトリのクローン</h3>
      <p>Walrus Sitesのソースコードをクローンします：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># リポジトリをクローン</p>
        <p>git clone https://github.com/MystenLabs/walrus-sites.git</p>
        <p>cd walrus-sites</p>
        <br>
        <p># mainnetブランチに切り替え（安定版）</p>
        <p>git checkout mainnet</p>
      </div>
      
      <h3>4. testnet環境の設定</h3>
      <p>testnetサイトを表示するための環境設定を行います：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># portalディレクトリに移動</p>
        <p>cd portal</p>
        <br>
        <p># testnet用環境変数をコピー</p>
        <p>cp ./server/.env.testnet.example ./server/.env.local</p>
      </div>
      
      <h3>5. 依存関係のインストールと起動</h3>
      <p>必要なパッケージをインストールしてポータルを起動します：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 依存関係のインストール</p>
        <p>bun install</p>
        <br>
        <p># サーバーサイドポータルを起動</p>
        <p>bun run server</p>
      </div>
      
      <p>正常に起動すると、以下のようなメッセージが表示されます：</p>
      
      <div class="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-2">
        <p>$ bun run server</p>
        <p>▲ Next.js 14.x.x</p>
        <p>- Local:        http://localhost:3000</p>
        <p>- Environments: .env.local</p>
        <p>✓ Ready in 2.1s</p>
      </div>
      
      <h3>6. デプロイしたサイトへのアクセス</h3>
      <p>ローカルポータルが起動したら、Step 3-1でデプロイしたサイトにアクセスできます：</p>
      
      <div class="bg-green-50 p-4 rounded-lg">
        <p class="font-semibold">🌐 サイトURL</p>
        <p class="text-sm bg-gray-100 p-2 rounded font-mono mt-2">
          http://58l2c8iw5tsmpj6bfvq43kfo0l9wj1j2wskq78hmuiyxgl7l0b.localhost:3000
        </p>
        <p class="text-sm text-gray-600 mt-1">※ あなたのデプロイ結果に表示されたURLを使用してください</p>
      </div>
      
      <p>ブラウザでこのURLにアクセスすると、Step 3-1で作成したHTMLサイトが表示されます！</p>
      
      <h3>7. ローカルポータルの機能</h3>
      
      <div class="bg-blue-50 p-4 rounded-lg">
        <p class="font-semibold">✨ ローカルポータルでできること</p>
        <ul class="mt-2">
          <li><strong>testnetサイト表示</strong>: testnetにデプロイしたサイトの閲覧</li>
          <li><strong>b36サブドメイン対応</strong>: オブジェクトIDベースのURL</li>
          <li><strong>開発・テスト</strong>: 公開前のサイト確認</li>
          <li><strong>オフライン対応</strong>: インターネット接続に依存しない</li>
        </ul>
      </div>
      
      <h3>8. トラブルシューティング</h3>
      
      <div class="bg-red-50 p-4 rounded-lg">
        <p class="font-semibold">⚠️ よくある問題</p>
        <ul class="mt-2">
          <li><strong>ポート3000が使用中</strong>: 他のサービスを停止するか、別のポートを使用</li>
          <li><strong>Bunが見つからない</strong>: PATHの設定を確認、ターミナル再起動</li>
          <li><strong>サイトが表示されない</strong>: URLのオブジェクトIDが正しいか確認</li>
          <li><strong>ネットワークエラー</strong>: testnet用の設定ファイルが正しく設定されているか確認</li>
        </ul>
      </div>
      
      <h3>9. 🎯 やってみよう！</h3>
      <p>実際にローカルポータルを起動してサイトを確認してみましょう：</p>
      
      <div class="bg-green-50 p-4 rounded-lg">
        <p class="font-semibold">チェックリスト</p>
        <div class="mt-2 space-y-2">
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            Bunがインストールされている
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            walrus-sitesリポジトリをクローンした
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            testnet用環境変数を設定した
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            <code>bun run server</code>でポータルを起動した
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            デプロイしたサイトが正常に表示された
          </label>
        </div>
      </div>
      
      <div class="bg-purple-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">🎉 Step 3-2 完了！</p>
        <p>おめでとうございます！ローカルポータルを使って、分散型ネットワーク上のサイトを実際に確認できました。次のステップでは、mainnetでの本格運用とSuiNSドメイン設定について学びましょう。</p>
      </div>
    `,
    'step-3-3': `
      <h2>mainnet本格運用とSuiNS設定</h2>
      <p>testnetでの学習が完了したら、mainnetで本格的なWalrus Siteを公開してみましょう。このステップでは、実際のSUIトークンを使用してサイトをデプロイし、SuiNSドメインを設定してwal.appで世界に公開する方法を学びます。</p>
      
      <div class="bg-red-50 p-4 rounded-lg mb-4">
        <p class="font-semibold">⚠️ mainnet利用時の注意</p>
        <p><strong>実際のSUIトークンが必要です</strong>。mainnetでは実際の暗号通貨を使用するため、十分な残高があることを確認してから進めてください。</p>
      </div>
      
      <h3>1. mainnet環境への切り替え</h3>
      <p>まず、Sui CLIをmainnetネットワークに切り替えます：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># mainnetに切り替え</p>
        <p>sui client switch --env mainnet</p>
        <br>
        <p># 現在の環境を確認</p>
        <p>sui client active-env</p>
        <br>
        <p># アクティブアドレスを確認</p>
        <p>sui client active-address</p>
      </div>
      
      <h3>2. SUIとWALトークンの準備</h3>
      <p>SUIとWALのトークンがウォレットに入っていることを確認してください：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># SUI残高確認</p>
        <p>sui client gas</p>
      </div>
      
      <h3>3. site-builderの設定確認</h3>
      <p>site-builderがmainnetに設定されていることを確認します：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 設定ファイルの確認</p>
        <p>cat ~/.config/walrus/sites-config.yaml | grep default_context</p>
      </div>
      
      <p>もし<code>default_context: testnet</code>になっている場合は、<code>mainnet</code>に変更してください：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 設定ファイルを編集</p>
        <p>nano ~/.config/walrus/sites-config.yaml</p>
        <p># default_context: mainnet に変更</p>
      </div>
      
      <h3>4. mainnetへのサイトデプロイ</h3>
      <p>testnetと同じHTMLサイトをmainnetにデプロイします：</p>
      
      <div class="bg-yellow-50 p-4 rounded-lg mb-4">
        <p class="font-semibold">💡 デプロイ前の準備</p>
        <p>mainnet用に新しいディレクトリを作成することをお勧めします。testnetとmainnetのリソースファイル（ws-resources.json）を分けて管理できます。</p>
      </div>
      
      <div class="bg-blue-50 p-4 rounded-lg mb-4">
        <p class="font-semibold">📅 エポック期間について</p>
        <ul class="mt-2">
          <li><strong>1エポック</strong> = 約2週間</li>
          <li><strong>最大エポック数</strong> = 53エポック（約2年）</li>
          <li><strong>推奨</strong>: 最初は1〜3エポックでテスト後、必要に応じて延長</li>
        </ul>
      </div>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># mainnet用ディレクトリを作成</p>
        <p>mkdir mainnet-walrus-site</p>
        <p>cd mainnet-walrus-site</p>
        <br>
        <p># testnetで作成したHTMLファイルをコピー</p>
        <p>cp ../test-walrus-site/index.html .</p>
      </div>
      
      <p><strong>実際のmainnetデプロイコマンド：</strong>（※実行結果は後で追加します）</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># mainnetにデプロイ（1エポック=約2週間）</p>
        <p>site-builder deploy --epochs 1 .</p>
      </div>
      
      <div class="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-2">
        <p>※ 実際の実行結果をここに追加予定</p>
      </div>
      
      <h3>5. SuiNSドメインの購入</h3>
      <p>wal.appで表示するためにSuiNSドメインを購入します：</p>
      
      <div class="bg-blue-50 p-4 rounded-lg">
        <p class="font-semibold">🌐 SuiNS購入手順</p>
        <ol class="mt-2">
          <li><strong>サイトアクセス</strong>: <a href="https://suins.io" target="_blank" class="text-blue-600 underline">https://suins.io</a> にアクセス</li>
          <li><strong>ウォレット接続</strong>: Sui Walletを接続</li>
          <li><strong>ドメイン検索</strong>: 希望する名前を検索（英数字のみ、3文字以上）</li>
          <li><strong>購入</strong>: 利用可能であれば価格を確認して購入</li>
        </ol>
      </div>
      
      <div class="bg-yellow-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">📝 ドメイン名のルール</p>
        <ul class="mt-2">
          <li><strong>文字制限</strong>: a-z（小文字）と0-9（数字）のみ</li>
          <li><strong>最小文字数</strong>: 3文字以上</li>
          <li><strong>特殊文字不可</strong>: ハイフン（-）やアンダースコア（_）は使用不可</li>
          <li><strong>例</strong>: <code>mysite123</code>, <code>portfolio2024</code>, <code>blogsite</code></li>
        </ul>
      </div>
      
      <h3>6. SuiNSドメインとWalrus Siteの関連付け</h3>
      <p>購入したドメインをデプロイしたサイトに関連付けます：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># デプロイ結果からサイトオブジェクトIDをコピー</p>
        <p># 例: 0x1234abcd5678ef90...</p>
      </div>
      
      <div class="bg-blue-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">🔗 ドメイン設定手順</p>
        <ol class="mt-2">
          <li><strong>SuiNSサイトで管理</strong>: suins.io の「Names you own」セクションに移動</li>
          <li><strong>ドメイン選択</strong>: 設定したいドメインの三点メニュー（...）をクリック</li>
          <li><strong>リンク設定</strong>: 「Link To Walrus Site」を選択</li>
          <li><strong>オブジェクトID入力</strong>: サイトのオブジェクトIDを貼り付け</li>
          <li><strong>トランザクション承認</strong>: ウォレットでトランザクションを承認</li>
        </ol>
      </div>
      
      <h3>7. wal.appでの公開確認</h3>
      <p>ドメイン設定が完了すると、wal.appでサイトにアクセスできます：</p>
      
      <div class="bg-green-50 p-4 rounded-lg">
        <p class="font-semibold">🎉 公開URL</p>
        <p class="text-sm bg-gray-100 p-2 rounded font-mono mt-2">
          https://yourdomain.wal.app
        </p>
        <p class="text-sm text-gray-600 mt-1">※ 購入したドメイン名に置き換えてください</p>
      </div>
      
      <div class="bg-blue-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">⏰ 反映時間について</p>
        <p>ドメイン設定後、通常5〜10分でwal.appに反映されます。即座に表示されない場合は少し待ってから再度アクセスしてください。</p>
      </div>
      
      <h3>8. mainnet運用のベストプラクティス</h3>
      
      <div class="bg-purple-50 p-4 rounded-lg">
        <p class="font-semibold">💡 運用のコツ</p>
        <ul class="mt-2">
          <li><strong>バックアップ</strong>: ws-resources.jsonファイルを安全に保管</li>
          <li><strong>エポック管理</strong>: サイトの保存期間を定期的に確認</li>
          <li><strong>コスト管理</strong>: SUI/WALトークンの使用量を監視</li>
          <li><strong>ドメイン更新</strong>: SuiNSドメインの年次更新を忘れずに</li>
          <li><strong>セキュリティ</strong>: ウォレットの秘密鍵を安全に管理</li>
        </ul>
      </div>
      
      <h3>9. 🎯 やってみよう！</h3>
      <p>実際にmainnetでサイトを公開してみましょう：</p>
      
      <div class="bg-green-50 p-4 rounded-lg">
        <p class="font-semibold">mainnet公開チェックリスト</p>
        <div class="mt-2 space-y-2">
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            Sui CLIをmainnetに切り替え
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            mainnet用SUIトークンを準備
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            WALトークンに交換
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            site-builderでmainnetにデプロイ
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            SuiNSドメインを購入
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            ドメインとサイトを関連付け
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2"> 
            wal.appでサイト表示を確認
          </label>
        </div>
      </div>
      
      <div class="bg-green-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">🎉 Step 3-3 完了！</p>
        <p>おめでとうございます！あなたのWalrus Siteがmainnetで世界に公開されました！分散型ウェブの一員として、検閲耐性があり永続的なサイトを作成することに成功しました。</p>
      </div>
      <div class="bg-blue-50 p-4 rounded-lg">
        <p class="font-semibold">📝 更新プロセス</p>
        <ol>
          <li><strong>ローカルファイルの編集</strong>：HTML、CSS、JSファイルを修正</li>
          <li><strong>変更の確認</strong>：ローカルでプレビューして動作確認</li>
          <li><strong>再デプロイ</strong>：同じsite-builderコマンドを実行</li>
          <li><strong>自動更新</strong>：変更されたリソースのみが更新される</li>
        </ol>
      </div>
      
      <h4>実際の更新例</h4>
      <p>サイトに新しいコンテンツを追加してみましょう：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># index.htmlを編集</p>
        <p>nano my-first-walrus-site/index.html</p>
        <br>
        <p># 変更後、同じコマンドで再デプロイ</p>
        <p>cd my-first-walrus-site</p>
        <p>site-builder deploy --epochs 7 .</p>
      </div>
      
      <h3>効率的なリソース管理</h3>
      <p>site-builderは変更されたファイルのみを更新します：</p>
      
      <div class="bg-yellow-50 p-4 rounded-lg">
        <p class="font-semibold">🔄 自動差分更新</p>
        <ul>
          <li><strong>変更検知</strong>：ファイルのハッシュ値で変更を自動検知</li>
          <li><strong>選択的更新</strong>：変更されたファイルのみ新しいブロブを作成</li>
          <li><strong>コスト削減</strong>：未変更ファイルの再アップロード費用を節約</li>
          <li><strong>高速更新</strong>：大規模サイトでも迅速な更新が可能</li>
        </ul>
      </div>
      
      <h3>サイト情報の確認</h3>
      <p>デプロイされたサイトの詳細情報を確認する方法：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># サイトの詳細情報表示</p>
        <p>site-builder list --object-id &lt;site-object-id&gt;</p>
        <br>
        <p># 特定のリソース情報を確認</p>
        <p>site-builder list-resources --object-id &lt;site-object-id&gt;</p>
        <br>
        <p># ローカルプレビュー</p>
        <p>site-builder serve --object-id &lt;site-object-id&gt;</p>
      </div>
      
      <h3>一般的な問題とデバッグ</h3>
      
      <h4>1. ファイルパスの問題</h4>
      <div class="bg-red-50 p-4 rounded-lg">
        <p class="font-semibold">⚠️ よくある問題</p>
        <ul>
          <li><strong>絶対パス使用</strong>：<code>/css/style.css</code> ❌</li>
          <li><strong>相対パス推奨</strong>：<code>css/style.css</code> ✅</li>
          <li><strong>大文字小文字</strong>：ファイル名の大文字小文字は区別される</li>
        </ul>
      </div>
      
      <h4>2. リソースの読み込み確認</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># ブラウザの開発者ツールで確認</p>
        <p># F12 → Network タブ → ページリロード</p>
        <p># 404エラーがないかチェック</p>
      </div>
      
      <h3>サイト所有権の確認</h3>
      <p>サイトを更新できるのは所有者のみです：</p>
      
      <div class="bg-blue-50 p-4 rounded-lg">
        <p class="font-semibold">🔐 所有権管理</p>
        <ul>
          <li><strong>所有者確認</strong>：デプロイ時に使用したウォレットアドレス</li>
          <li><strong>更新権限</strong>：所有者のみがサイトを更新可能</li>
          <li><strong>譲渡可能</strong>：Suiオブジェクトとして他のアドレスに譲渡可能</li>
        </ul>
      </div>
      
      <div class="bg-green-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">💡 更新のベストプラクティス</p>
        <ul>
          <li><strong>ローカルテスト</strong>：更新前に必ずローカルで動作確認</li>
          <li><strong>段階的更新</strong>：大規模な変更は段階的に実施</li>
          <li><strong>バックアップ</strong>：更新前のファイルをローカルに保管</li>
          <li><strong>エポック管理</strong>：適切な保存期間を設定</li>
        </ul>
      </div>
    `,
    'step-3-4': `
      <h2>SuiNSドメイン名の設定</h2>
      <p>Walrus SiteにSuiNS（Sui Name Service）ドメイン名を設定して、覚えやすいURLでアクセスできるようにしましょう。</p>
      
      <h3>SuiNSとは</h3>
      <p>SuiNSは、Suiブロックチェーン上の分散型ドメイン名サービスです。長いオブジェクトIDの代わりに、人間が読みやすい名前でWalrus Siteにアクセスできます。</p>
      
      <div class="bg-blue-50 p-4 rounded-lg">
        <p class="font-semibold">🌐 SuiNSの利点</p>
        <ul>
          <li><strong>覚えやすいURL</strong>：<code>mysite.wal.app</code> のような分かりやすいアドレス</li>
          <li><strong>ブランディング</strong>：独自のドメイン名でブランド構築</li>
          <li><strong>永続性</strong>：オブジェクトIDが変わってもドメインは維持</li>
          <li><strong>所有権管理</strong>：NFTとして取引・管理可能</li>
        </ul>
      </div>
      
      <h3>SuiNSドメインの取得</h3>
      
      <h4>1. SuiNSサイトにアクセス</h4>
      <ul>
        <li><strong>メインネット（実際の利用）</strong>：<a href="https://suins.io" target="_blank">suins.io</a></li>
        <li><strong>テストネット（練習用）</strong>：<a href="https://testnet.suins.io" target="_blank">testnet.suins.io</a></li>
      </ul>
      
      <h4>2. ドメイン名の検索と購入</h4>
      <p>希望するドメイン名を検索して購入します：</p>
      
      <div class="bg-yellow-50 p-4 rounded-lg">
        <p class="font-semibold">📝 ドメイン名のルール</p>
        <ul>
          <li><strong>使用可能文字</strong>：a-z（小文字のみ）と0-9の数字</li>
          <li><strong>文字数制限</strong>：一般的に3文字以上</li>
          <li><strong>一意性</strong>：同じ名前は一つのアドレスのみが所有可能</li>
          <li><strong>年次更新</strong>：ドメインは年単位で更新が必要</li>
        </ul>
      </div>
      
      <h4>3. ウォレット接続と購入</h4>
      <ol>
        <li>SuiNSサイトでSlush Walletを接続</li>
        <li>希望するドメイン名を入力（例：<code>myawesomesite</code>）</li>
        <li>利用可能であれば価格が表示される</li>
        <li>購入期間を選択（1年、2年など）</li>
        <li>トランザクションを承認してドメインを購入</li>
      </ol>
      
      <h3>Walrus SiteとSuiNSの連携</h3>
      
      <h4>1. 所有ドメインの管理</h4>
      <p>購入後、SuiNSサイトで「names you own」セクションにアクセス：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># SuiNSサイトでの操作</p>
        <p>1. "names you own" セクションを開く</p>
        <p>2. 対象ドメインの三点メニュー（...）をクリック</p>
        <p>3. "Link To Walrus Site" を選択</p>
      </div>
      
      <h4>2. Walrus SiteのオブジェクトIDを設定</h4>
      <p>デプロイ時に取得したサイトのオブジェクトIDを入力：</p>
      
      <div class="bg-blue-50 p-4 rounded-lg">
        <p class="font-semibold">🔗 リンク設定手順</p>
        <ol>
          <li><strong>オブジェクトID取得</strong>：site-builderのデプロイ結果からコピー</li>
          <li><strong>ID入力</strong>：SuiNSの設定画面にペースト</li>
          <li><strong>トランザクション承認</strong>：ブロックチェーンに設定を記録</li>
          <li><strong>設定完了</strong>：数分後にドメインが有効になる</li>
        </ol>
      </div>
      
      <h3>ドメインでのアクセス確認</h3>
      <p>設定完了後、新しいドメインでサイトにアクセスできます：</p>
      
      <div class="bg-gray-100 p-4 rounded-lg">
        <p><strong>新しいURL例</strong>:</p>
        <p><code>https://myawesomesite.wal.app</code></p>
        <br>
        <p><strong>従来のURL</strong>:</p>
        <p><code>https://0xabcd1234...efgh.wal.app</code></p>
      </div>
      
      <h3>ドメイン管理のベストプラクティス</h3>
      
      <div class="bg-green-50 p-4 rounded-lg">
        <p class="font-semibold">💡 管理のコツ</p>
        <ul>
          <li><strong>定期更新</strong>：ドメインの有効期限を管理</li>
          <li><strong>バックアップ</strong>：ウォレットの秘密鍵を安全に保管</li>
          <li><strong>テスト環境</strong>：テストネットで操作を練習</li>
          <li><strong>ブランド保護</strong>：関連するドメイン名も取得検討</li>
        </ul>
      </div>
      
      <h3>トラブルシューティング</h3>
      
      <div class="bg-red-50 p-4 rounded-lg">
        <p class="font-semibold">⚠️ よくある問題</p>
        <ul>
          <li><strong>ドメインが反映されない</strong>：設定後5-10分待ってから確認</li>
          <li><strong>「already taken」エラー</strong>：ドメイン名が既に使用済み</li>
          <li><strong>リンク設定失敗</strong>：正しいオブジェクトIDを確認</li>
          <li><strong>アクセスできない</strong>：ウォレットの所有権を確認</li>
        </ul>
      </div>
      
      <h3>重要な注意事項</h3>
      
      <div class="bg-yellow-50 p-4 rounded-lg">
        <p class="font-semibold">📢 アクセス方法の変更</p>
        <p><strong>重要</strong>：現在、wal.appポータルでは、b36サブドメインを使用したサイトの閲覧ができなくなっています。サイトにアクセスするにはSuiNSドメイン名の設定が必要です。</p>
      </div>
      
      <div class="bg-purple-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">🎉 完全なWalrus Site完成！</p>
        <p>おめでとうございます！Walrus Siteの作成からSuiNSドメイン設定まで、分散型ウェブサイトの基本的な構築プロセスを完全にマスターしました。あなたのサイトは今や真の分散型ウェブの一部として、永続的で検閲耐性のある形で世界中からアクセス可能です。</p>
      </div>
    `
  }
  
  return contents[stepId] || '<p>コンテンツを準備中です...</p>'
}