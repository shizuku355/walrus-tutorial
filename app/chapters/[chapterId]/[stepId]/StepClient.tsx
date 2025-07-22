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
      
      <h3>Suiupを使用したインストール（推奨）</h3>
      <p>Suiupは、SuiエコシステムのCLIツールを管理するためのツールです。RustのRustupのようなもので、複数のバージョンを管理できます。</p>
      
      <h4>1. Suiupのインストール</h4>
      
      <h5>macOS / Linux</h5>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p>curl -sSfL https://raw.githubusercontent.com/Mystenlabs/suiup/main/install.sh | sh</p>
      </div>
      
      <h5>Windows</h5>
      <ol>
        <li>GitHubリリースページから <code>suiup-windows.zip</code> をダウンロード</li>
        <li>専用フォルダを作成：<code>%USERPROFILE%\\bin</code></li>
        <li><code>suiup.exe</code>をフォルダに配置</li>
        <li>環境変数を設定してコマンドを認識させる</li>
      </ol>
      
      <div class="bg-yellow-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">📝 Windows環境変数の設定</p>
        <ol>
          <li>「システムの詳細設定」を開く</li>
          <li>「環境変数」ボタンをクリック</li>
          <li>「Path」変数に <code>%USERPROFILE%\\bin</code> を追加</li>
          <li>コマンドプロンプトを再起動</li>
        </ol>
      </div>
      
      <h4>2. Sui CLIのインストール</h4>
      <p>Suiupを使ってSui CLIをインストールします：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 最新のテストネット版をインストール</p>
        <p>suiup install sui@testnet</p>
        <br>
        <p># 最新のDevnet版をインストール</p>
        <p>suiup install sui@devnet</p>
      </div>
      
      <h4>3. インストールの確認</h4>
      <p>正しくインストールされたか確認しましょう：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p>sui --version</p>
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
      <p>Sui CLIをインストールしたので、次はウォレットの作成、ネットワークの切り替え、そして基本的なコマンドの使い方を学びましょう。</p>
      
      <h3>事前準備：インストール確認</h3>
      <p>まず、Sui CLIが正しくインストールされているか確認します：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># インストール確認</p>
        <p>sui --version</p>
      </div>
      
      <h3>アドレス（ウォレット）の管理</h3>
      
      <h4>1. 既存アドレスの確認</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 作成済みのアドレス一覧を表示</p>
        <p>sui client addresses</p>
        <br>
        <p># 現在アクティブなアドレスを確認</p>
        <p>sui client active-address</p>
      </div>
      
      <h4>2. 新しいアドレスの作成</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># Ed25519暗号方式で新しいアドレスを作成</p>
        <p>sui client new-address ed25519</p>
      </div>
      
      <div class="bg-yellow-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">⚠️ 重要：秘密鍵の保管</p>
        <p>新しいアドレスを作成すると、復旧フレーズ（Recovery phrase）が表示されます。これは<strong>非常に重要</strong>なので、安全な場所に保存してください。</p>
      </div>
      
      <h4>3. アクティブアドレスの切り替え</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># アドレスまたはエイリアスを指定して切り替え</p>
        <p>sui client switch --address &lt;ADDRESS_or_ALIAS&gt;</p>
      </div>
      
      <h3>ネットワークの管理</h3>
      
      <h4>1. 利用可能なネットワークの確認</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 設定済みのネットワーク一覧を表示</p>
        <p>sui client envs</p>
      </div>
      
      <h4>2. ネットワークの切り替え</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># Devnetに切り替え（開発・テスト用）</p>
        <p>sui client switch --env devnet</p>
        <br>
        <p># Testnetに切り替え（より本番に近い環境）</p>
        <p>sui client switch --env testnet</p>
        <br>
        <p># Mainnetに切り替え（本番環境）</p>
        <p>sui client switch --env mainnet</p>
      </div>
      
      <div class="bg-blue-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">📚 ネットワークの違い</p>
        <ul>
          <li><strong>Devnet</strong>：開発用。頻繁にリセットされる（10 SUI Faucet）</li>
          <li><strong>Testnet</strong>：テスト用。より安定している（1 SUI Faucet）</li>
          <li><strong>Mainnet</strong>：本番環境。実際のSUIトークンを使用</li>
        </ul>
      </div>
      
      <h3>Moveプロジェクトの作成</h3>
      <p>基本的なSui Moveプロジェクトを作成してみましょう：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 新しいプロジェクトを作成</p>
        <p>sui move new hello_sui</p>
        <br>
        <p># プロジェクトディレクトリに移動</p>
        <p>cd hello_sui</p>
      </div>
      
      <h3>ビルドとデプロイ</h3>
      
      <h4>1. プロジェクトのビルド</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># Moveコードをコンパイル</p>
        <p>sui move build</p>
      </div>
      
      <h4>2. パッケージのデプロイ</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># ブロックチェーンにパッケージをデプロイ</p>
        <p>sui client publish --gas-budget 5000000</p>
      </div>
      
      <div class="bg-red-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">⚠️ デプロイ前の確認事項</p>
        <ul>
          <li>適切なネットワーク（devnet/testnet）に接続している</li>
          <li>アクティブアドレスに十分なSUIトークンがある</li>
          <li>Faucetからテスト用トークンを取得済み</li>
        </ul>
      </div>
      
      <h3>テスト用トークンの取得</h3>
      <p>DevnetやTestnetでの開発には、Faucetからテスト用のSUIトークンを取得できます：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># Sui Faucet（Discord）でトークンを請求</p>
        <p># または以下のウェブサイトを利用</p>
        <p># Devnet: https://faucet.devnet.sui.io/</p>
        <p># Testnet: https://faucet.testnet.sui.io/</p>
      </div>
      
      <h3>よく使うコマンド一覧</h3>
      
      <div class="bg-gray-100 p-4 rounded-lg">
        <table class="w-full text-sm">
          <tbody>
            <tr class="border-b">
              <td class="font-mono py-1">sui client addresses</td>
              <td class="py-1">アドレス一覧表示</td>
            </tr>
            <tr class="border-b">
              <td class="font-mono py-1">sui client active-address</td>
              <td class="py-1">アクティブアドレス確認</td>
            </tr>
            <tr class="border-b">
              <td class="font-mono py-1">sui client envs</td>
              <td class="py-1">ネットワーク一覧表示</td>
            </tr>
            <tr class="border-b">
              <td class="font-mono py-1">sui move build</td>
              <td class="py-1">プロジェクトをビルド</td>
            </tr>
            <tr>
              <td class="font-mono py-1">sui client publish</td>
              <td class="py-1">パッケージをデプロイ</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="bg-green-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">✅ チェックポイント</p>
        <ul>
          <li>ウォレットアドレスを作成できる</li>
          <li>ネットワークを切り替えできる</li>
          <li>Moveプロジェクトを作成できる</li>
          <li>基本的なビルド・デプロイの流れを理解している</li>
        </ul>
      </div>
    `,
    'step-2-3': `
      <h2>Walrusのインストール</h2>
      <p>Walrusは分散型ストレージシステムで、Walrus SitesはこのWalrusを活用してウェブサイトをホスティングします。Walrus CLIをインストールして、ストレージ機能を利用できるようにしましょう。</p>
      
      <h3>前提条件</h3>
      <ul>
        <li>Sui CLIがインストール済み（Step 2-1, 2-2で完了）</li>
        <li>Rustがインストール済み（Cargoコマンドが利用可能）</li>
        <li>安定したインターネット接続</li>
      </ul>
      
      <h3>Walrus CLIのインストール</h3>
      
      <h4>方法1: インストールスクリプト（推奨）</h4>
      <p>最も簡単で推奨される方法です：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># macOS / Linux / WSL</p>
        <p>curl -sSf https://install.wal.app | sh</p>
        <br>
        <p># インストール後、パスを更新</p>
        <p>source ~/.bashrc  # または ~/.zshrc</p>
      </div>
      
      <h4>方法2: Cargoからのインストール</h4>
      <p>Rustの開発環境がある場合、ソースからビルドできます：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># メインネット版（推奨）</p>
        <p>cargo install --git https://github.com/MystenLabs/walrus --branch mainnet walrus-cli --locked</p>
        <br>
        <p># テストネット版</p>
        <p>cargo install --git https://github.com/MystenLabs/walrus --branch testnet walrus-cli --locked</p>
      </div>
      
      <h4>方法3: プリビルドバイナリ</h4>
      <p>GitHubリリースページから対応するプラットフォーム用のバイナリをダウンロード：</p>
      <ul>
        <li><strong>Ubuntu</strong>: x86_64, ARM64対応</li>
        <li><strong>macOS</strong>: Intel、Apple Silicon対応</li>
        <li><strong>Windows</strong>: x86_64対応</li>
      </ul>
      
      <h3>設定ファイルの準備</h3>
      <p>Walrus CLIの設定を行います：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 設定ディレクトリの作成</p>
        <p>mkdir -p ~/.config/walrus</p>
        <br>
        <p># 公式設定ファイルのダウンロード</p>
        <p>curl https://docs.wal.app/setup/client_config.yaml -o ~/.config/walrus/client_config.yaml</p>
      </div>
      
      <h3>インストールの確認</h3>
      <p>Walrus CLIが正しくインストールされたか確認します：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># バージョン確認</p>
        <p>walrus --version</p>
        <br>
        <p># ヘルプ表示</p>
        <p>walrus --help</p>
        <br>
        <p># 設定ファイル確認</p>
        <p>walrus info</p>
      </div>
      
      <h3>Sui CLIとの連携設定</h3>
      <p>Walrus CLIはSui CLIの設定を使用します。事前にSuiの設定が正しく行われているか確認しましょう：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 現在のSui設定を確認</p>
        <p>sui client active-env</p>
        <p>sui client active-address</p>
        <br>
        <p># 必要に応じてテストネットに切り替え</p>
        <p>sui client switch --env testnet</p>
      </div>
      
      <h3>ネットワーク接続の確認</h3>
      <p>Walrusストレージネットワークへの接続を確認します：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># ストレージノードの健全性チェック</p>
        <p>walrus health</p>
        <br>
        <p># システム情報の確認</p>
        <p>walrus info</p>
      </div>
      
      <div class="bg-blue-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">💡 Walrusとの対話方法</p>
        <ul>
          <li><strong>CLI</strong>: コマンドライン インターフェース（このチュートリアル）</li>
          <li><strong>JSON API</strong>: プログラムからのアクセス用</li>
          <li><strong>HTTP API</strong>: ローカルまたはパブリッククライアントデーモン経由</li>
          <li><strong>Site-Builder</strong>: ウェブサイト専用のデプロイツール</li>
        </ul>
      </div>
      
      <div class="bg-yellow-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">📝 重要な注意事項</p>
        <ul>
          <li><strong>パブリックデータ</strong>: Walrusに保存されるすべてのデータは公開されます</li>
          <li><strong>保存期間</strong>: データは指定したエポック数（期間）だけ保存されます</li>
          <li><strong>ガス代</strong>: ファイル保存にはSUIトークンが必要です</li>
          <li><strong>ネットワーク</strong>: テストネットとメインネットでは設定が異なります</li>
        </ul>
      </div>
      
      <div class="bg-green-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">✅ チェックポイント</p>
        <ul>
          <li>Walrus CLIがインストールされている</li>
          <li><code>walrus --version</code>でバージョンが確認できる</li>
          <li>設定ファイルが正しく配置されている</li>
          <li><code>walrus health</code>でネットワーク接続が確認できる</li>
        </ul>
      </div>
    `,
    'step-2-4': `
      <h2>Walrus CLIの基本的な使い方</h2>
      <p>Walrus CLIがインストールできたので、基本的な操作を学びましょう。ファイルの保存、取得、および管理の基本操作を実際に試してみます。</p>
      
      <h3>事前準備</h3>
      <p>Walrusを使用する前に以下を確認してください：</p>
      
      <div class="bg-blue-50 p-4 rounded-lg">
        <p class="font-semibold">💡 前提条件チェック</p>
        <ul>
          <li>Walrus CLIがインストール済み</li>
          <li>Sui CLIがテストネットに設定済み</li>
          <li>アクティブなSuiアドレスにSUIトークンがある</li>
        </ul>
      </div>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 現在の設定を確認</p>
        <p>sui client active-env</p>
        <p>sui client active-address</p>
        <p>sui client gas</p>
      </div>
      
      <h3>基本的なファイル操作</h3>
      
      <h4>1. テスト用ファイルの作成</h4>
      <p>まず、テスト用のファイルを作成しましょう：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># テキストファイルの作成</p>
        <p>echo "Hello from Walrus!" > hello.txt</p>
        <br>
        <p># 簡単なJSONファイルの作成</p>
        <p>echo '{"message": "分散型ストレージのテスト", "timestamp": "'$(date)'"}'> test.json</p>
      </div>
      
      <h4>2. ファイルの保存（Store）</h4>
      <p>作成したファイルをWalrusに保存します：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 単一ファイルの保存</p>
        <p>walrus store hello.txt</p>
        <br>
        <p># 複数ファイルを同時に保存</p>
        <p>walrus store hello.txt test.json</p>
        <br>
        <p># 保存期間を指定（エポック数）</p>
        <p>walrus store --epochs 10 hello.txt</p>
      </div>
      
      <div class="bg-yellow-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">📝 保存結果について</p>
        <p>ファイルを保存すると、以下の情報が表示されます：</p>
        <ul>
          <li><strong>Blob ID</strong>：ファイルを識別するユニークなID</li>
          <li><strong>Size</strong>：ファイルサイズ</li>
          <li><strong>Cost</strong>：保存にかかったSUIの量</li>
          <li><strong>Epochs</strong>：保存期間</li>
        </ul>
      </div>
      
      <h4>3. ファイルの読み取り（Read）</h4>
      <p>保存したファイルを読み取ります：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># Blob IDを使ってファイルを読み取り</p>
        <p>walrus read &lt;blob-id&gt;</p>
        <br>
        <p># ファイルに出力</p>
        <p>walrus read &lt;blob-id&gt; --out recovered.txt</p>
      </div>
      
      <h4>4. ブロブの状態確認</h4>
      <p>保存したファイルの情報を確認します：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># ブロブの詳細情報を表示</p>
        <p>walrus blob-status &lt;blob-id&gt;</p>
        <br>
        <p># 所有しているブロブ一覧</p>
        <p>walrus list-blobs</p>
      </div>
      
      <h3>システム情報とネットワーク確認</h3>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># システム情報の表示</p>
        <p>walrus info</p>
        <br>
        <p># ストレージノードの健全性確認</p>
        <p>walrus health</p>
        <br>
        <p># ネットワーク統計情報</p>
        <p>walrus stats</p>
      </div>
      
      <h3>実際の使用例</h3>
      
      <h4>画像ファイルの保存例</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 画像をダウンロード（テスト用）</p>
        <p>curl -o sample.jpg "https://via.placeholder.com/300x200/blue/white?text=Walrus+Test"</p>
        <br>
        <p># Walrusに保存</p>
        <p>walrus store sample.jpg</p>
      </div>
      
      <h4>HTMLファイルの保存例</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># HTMLファイルの作成</p>
        <p>cat &lt;&lt; 'EOF' &gt; index.html
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;&lt;title&gt;Walrus Test&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;&lt;h1&gt;Hello from Walrus Storage!&lt;/h1&gt;&lt;/body&gt;
&lt;/html&gt;
EOF</p>
        <br>
        <p># Walrusに保存</p>
        <p>walrus store index.html</p>
      </div>
      
      <h3>トラブルシューティング</h3>
      
      <div class="bg-red-50 p-4 rounded-lg">
        <p class="font-semibold">⚠️ よくある問題</p>
        <ul>
          <li><strong>「insufficient funds」エラー</strong>：SUIトークンが不足。Faucetから取得</li>
          <li><strong>「network error」</strong>：ネットワーク接続を確認</li>
          <li><strong>「blob not found」</strong>：Blob IDが正しいか確認</li>
          <li><strong>「config error」</strong>：設定ファイルの配置を確認</li>
        </ul>
      </div>
      
      <h3>コマンドリファレンス</h3>
      
      <div class="bg-gray-100 p-4 rounded-lg">
        <table class="w-full text-sm">
          <tbody>
            <tr class="border-b">
              <td class="font-mono py-1">walrus store [file]</td>
              <td class="py-1">ファイルをWalrusに保存</td>
            </tr>
            <tr class="border-b">
              <td class="font-mono py-1">walrus read [blob-id]</td>
              <td class="py-1">Blob IDでファイルを読み取り</td>
            </tr>
            <tr class="border-b">
              <td class="font-mono py-1">walrus blob-status [blob-id]</td>
              <td class="py-1">ブロブの状態を確認</td>
            </tr>
            <tr class="border-b">
              <td class="font-mono py-1">walrus list-blobs</td>
              <td class="py-1">所有ブロブの一覧表示</td>
            </tr>
            <tr class="border-b">
              <td class="font-mono py-1">walrus info</td>
              <td class="py-1">システム情報を表示</td>
            </tr>
            <tr>
              <td class="font-mono py-1">walrus health</td>
              <td class="py-1">ネットワーク健全性チェック</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="bg-green-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">✅ チェックポイント</p>
        <ul>
          <li>テストファイルをWalrusに保存できる</li>
          <li>Blob IDを使ってファイルを読み取れる</li>
          <li>ブロブの状態確認ができる</li>
          <li>基本的なコマンドの使い方を理解している</li>
        </ul>
      </div>
    `,
    'step-2-5': `
      <h2>サイトビルダーのインストール</h2>
      <p>Walrus Site-Builderは、静的ウェブサイトをWalrusネットワークにデプロイするための公式ツールです。HTMLやJavaScriptで作成したサイトを分散型ネットワーク上でホスティングできます。</p>
      
      <h3>前提条件</h3>
      <p>Site-Builderを使用する前に以下を確認してください：</p>
      <ul>
        <li>Sui CLIがインストール済み（Step 2-1, 2-2で完了）</li>
        <li>Walrus CLIがインストール済み（Step 2-3, 2-4で完了）</li>
        <li>安定したインターネット接続</li>
      </ul>
      
      <h3>Site-Builderのインストール</h3>
      
      <h4>方法1: プリビルドバイナリ（推奨）</h4>
      <p>お使いのOSに対応したバイナリをダウンロードします：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># Linux (x86_64)の例</p>
        <p>wget https://storage.googleapis.com/mysten-walrus-sites/site-builder-linux-amd64</p>
        <p>chmod +x site-builder-linux-amd64</p>
        <p>sudo mv site-builder-linux-amd64 /usr/local/bin/site-builder</p>
        <br>
        <p># macOS (Intel)の例</p>
        <p>wget https://storage.googleapis.com/mysten-walrus-sites/site-builder-macos-x86_64</p>
        <p>chmod +x site-builder-macos-x86_64</p>
        <p>sudo mv site-builder-macos-x86_64 /usr/local/bin/site-builder</p>
        <br>
        <p># macOS (Apple Silicon)の例</p>
        <p>wget https://storage.googleapis.com/mysten-walrus-sites/site-builder-macos-arm64</p>
        <p>chmod +x site-builder-macos-arm64</p>
        <p>sudo mv site-builder-macos-arm64 /usr/local/bin/site-builder</p>
      </div>
      
      <h4>方法2: Cargoからのインストール</h4>
      <p>ソースコードからビルドする場合：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># Walrus Sitesリポジトリをクローン</p>
        <p>git clone https://github.com/MystenLabs/walrus-sites.git</p>
        <p>cd walrus-sites</p>
        <br>
        <p># site-builderをビルド・インストール</p>
        <p>cargo install --path site-builder</p>
      </div>
      
      <h3>設定ファイルの準備</h3>
      <p>Site-Builderの設定ファイルをダウンロードします：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 設定ディレクトリの作成</p>
        <p>mkdir -p ~/.config/walrus</p>
        <br>
        <p># 公式設定ファイルのダウンロード</p>
        <p>curl -o ~/.config/walrus/sites-config.yaml \
  https://raw.githubusercontent.com/MystenLabs/walrus-sites/mainnet/config/sites-config.yaml</p>
      </div>
      
      <h3>インストールの確認</h3>
      <p>Site-Builderが正しくインストールされたか確認：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># バージョン確認</p>
        <p>site-builder --version</p>
        <br>
        <p># ヘルプ表示</p>
        <p>site-builder --help</p>
        <br>
        <p># 利用可能なコマンド一覧</p>
        <p>site-builder help</p>
      </div>
      
      <h3>シンプルなテストサイトの作成</h3>
      <p>動作確認のため、最小限のHTMLサイトを作成してみましょう：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># テスト用ディレクトリの作成</p>
        <p>mkdir test-walrus-site</p>
        <p>cd test-walrus-site</p>
        <br>
        <p># シンプルなindex.htmlの作成</p>
        <p>cat &lt;&lt; 'EOF' &gt; index.html
&lt;!DOCTYPE html&gt;
&lt;html lang="ja"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;My First Walrus Site&lt;/title&gt;
    &lt;style&gt;
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #2563eb; }
        .highlight { background: #dbeafe; padding: 10px; border-radius: 5px; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;🌊 Hello from Walrus!&lt;/h1&gt;
    &lt;div class="highlight"&gt;
        &lt;p&gt;このサイトは分散型ウェブ上でホストされています。&lt;/p&gt;
        &lt;p&gt;Walrus Sitesへようこそ！&lt;/p&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
EOF</p>
      </div>
      
      <h3>ローカルでのプレビュー</h3>
      <p>デプロイ前にローカルでサイトを確認：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># Python 3を使った簡易サーバー</p>
        <p>python3 -m http.server 8000</p>
        <br>
        <p># Node.jsのhttp-serverを使う場合</p>
        <p>npx http-server</p>
        <br>
        <p># ブラウザでアクセス</p>
        <p># http://localhost:8000</p>
      </div>
      
      <h3>Site-Builderの主要コマンド</h3>
      
      <div class="bg-blue-50 p-4 rounded-lg">
        <p class="font-semibold">📝 よく使うコマンド</p>
        <ul>
          <li><strong>deploy</strong>: サイトをWalrusネットワークにデプロイ</li>
          <li><strong>update</strong>: 既存サイトの更新</li>
          <li><strong>list</strong>: デプロイ済みサイトの一覧表示</li>
          <li><strong>serve</strong>: ローカルでサイトをプレビュー</li>
          <li><strong>info</strong>: サイトの詳細情報を表示</li>
        </ul>
      </div>
      
      <h3>プロジェクト構造のベストプラクティス</h3>
      
      <div class="bg-yellow-50 p-4 rounded-lg">
        <p class="font-semibold">🏗️ 推奨構造</p>
        <pre>my-walrus-site/
├── index.html      # 必須：エントリーポイント
├── css/           # スタイルシート
│   └── style.css
├── js/            # JavaScriptファイル
│   └── app.js
├── images/        # 画像ファイル
│   └── logo.png
└── assets/        # その他の静的ファイル</pre>
      </div>
      
      <h3>テストデプロイの準備</h3>
      <p>次のステップでのデプロイに向けて：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 現在の設定を確認</p>
        <p>sui client active-env</p>
        <p>sui client active-address</p>
        <p>sui client gas</p>
        <br>
        <p># テストネットに切り替え（必要に応じて）</p>
        <p>sui client switch --env testnet</p>
      </div>
      
      <div class="bg-green-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">✅ チェックポイント</p>
        <ul>
          <li>site-builderコマンドが実行できる</li>
          <li>設定ファイルが正しい場所に配置されている</li>
          <li>テスト用のHTMLファイルが作成できた</li>
          <li>ローカルでサイトをプレビューできる</li>
        </ul>
      </div>
      
      <div class="bg-purple-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">💡 Site-Builderのポイント</p>
        <ul>
          <li><strong>静的サイト専用</strong>：PHPやNode.jsなどのサーバーサイド処理は不可</li>
          <li><strong>SPAに最適</strong>：React、Vue、AngularなどのSPAフレームワークと相性が良い</li>
          <li><strong>自動最適化</strong>：ファイルは自動的に圧縮・最適化される</li>
          <li><strong>グローバル配信</strong>：世界中のノードから高速配信</li>
        </ul>
      </div>
      
      <div class="bg-green-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">🎉 開発環境の構築完了！</p>
        <p>おめでとうございます！Walrus Sites開発に必要なすべてのツールがインストールされました。次は実際にサイトをデプロイしてみましょう。</p>
      </div>
    `,
    'step-3-1': `
      <h2>Walrus Sitesとは</h2>
      <p>Walrus Sitesは、SuiブロックチェーンとWalrusストレージ技術を組み合わせた革新的な分散型ウェブサイトプラットフォームです。</p>
      
      <h3>Walrus Sitesの特徴</h3>
      <ul>
        <li><strong>サーバー不要</strong>：従来のウェブホスティングサーバーが不要</li>
        <li><strong>ブロックチェーン統合</strong>：SuiオブジェクトとWebサイトを直接リンク可能</li>
        <li><strong>所有権管理</strong>：Suiアドレスによってサイトを所有・交換・更新</li>
        <li><strong>SuiNS対応</strong>：人間が読みやすいドメイン名をサポート</li>
        <li><strong>高可用性</strong>：分散型のため高い稼働率を実現</li>
      </ul>
      
      <h3>革新的な使用例</h3>
      <p>従来のWebサイトとは異なる、ユニークな活用方法：</p>
      
      <div class="bg-blue-50 p-4 rounded-lg">
        <p class="font-semibold">🎨 NFT専用サイト</p>
        <p>各NFTが独自のパーソナライズされたWebサイトを持つことができます。例えば、Flatland NFTコレクションでは、各NFTが固有の特性に基づいた専用サイトを持っています。</p>
      </div>
      
      <h3>Site-Builderのインストール</h3>
      <p>Walrus Sitesをデプロイするためのツールをインストールしましょう：</p>
      
      <h4>前提条件</h4>
      <ul>
        <li>最新版のRustがインストール済み</li>
        <li>Walrusの基本セットアップが完了</li>
        <li>SuiウォレットとWALトークンが利用可能</li>
      </ul>
      
      <h4>Site-Builderのダウンロード</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># あなたのOS/CPUに対応するバイナリをダウンロード</p>
        <p># (Linux x86_64の例)</p>
        <p>wget https://storage.googleapis.com/mysten-walrus-sites/site-builder-linux-amd64</p>
        <br>
        <p># 実行可能にする</p>
        <p>chmod +x site-builder-linux-amd64</p>
        <br>
        <p># PATHの通った場所に移動</p>
        <p>sudo mv site-builder-linux-amd64 /usr/local/bin/site-builder</p>
      </div>
      
      <h4>設定ファイルの作成</h4>
      <p>Site-Builderの設定ファイルを準備します：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 設定ディレクトリの作成</p>
        <p>mkdir -p ~/.config/walrus</p>
        <br>
        <p># 公式設定ファイルのダウンロード</p>
        <p>curl -o ~/.config/walrus/sites-config.yaml \
  https://raw.githubusercontent.com/MystenLabs/walrus-sites/mainnet/config/sites-config.yaml</p>
      </div>
      
      <h3>シンプルなHTMLサイトの作成</h3>
      <p>最初のWalrus Siteを作成しましょう：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># プロジェクトディレクトリの作成</p>
        <p>mkdir my-first-walrus-site</p>
        <p>cd my-first-walrus-site</p>
      </div>
      
      <h4>必須のindex.htmlファイル</h4>
      <p>Walrus Sitesには<code>index.html</code>ファイルが必要です：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
        <pre>&lt;!DOCTYPE html&gt;
&lt;html lang="ja"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;私の最初のWalrus Site&lt;/title&gt;
    &lt;style&gt;
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        h1 {
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.5em;
        }
        .feature {
            margin: 25px 0;
            padding: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            border-left: 4px solid #fff;
        }
        .badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8em;
            margin: 10px 5px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div class="container"&gt;
        &lt;h1&gt;🌊 私の最初のWalrus Site&lt;/h1&gt;
        
        &lt;div class="feature"&gt;
            &lt;h2&gt;🏗️ 分散型ホスティング&lt;/h2&gt;
            &lt;p&gt;このサイトは従来のサーバーではなく、Walrusの分散型ストレージネットワーク上でホストされています。世界中のノードに分散して保存されているため、単一障害点がありません。&lt;/p&gt;
            &lt;span class="badge"&gt;サーバー不要&lt;/span&gt;
            &lt;span class="badge"&gt;高可用性&lt;/span&gt;
        &lt;/div&gt;
        
        &lt;div class="feature"&gt;
            &lt;h2&gt;🔒 永続性と所有権&lt;/h2&gt;
            &lt;p&gt;このサイトはSuiブロックチェーン上のオブジェクトとして管理されています。所有権が明確で、ブロックチェーンの特性により改ざん耐性を持ちます。&lt;/p&gt;
            &lt;span class="badge"&gt;ブロックチェーン管理&lt;/span&gt;
            &lt;span class="badge"&gt;改ざん耐性&lt;/span&gt;
        &lt;/div&gt;
        
        &lt;div class="feature"&gt;
            &lt;h2&gt;🌐 検閲耐性&lt;/h2&gt;
            &lt;p&gt;分散型の性質により、特定の管理者や組織がコンテンツを一方的に削除したり変更したりすることができません。真の表現の自由を実現します。&lt;/p&gt;
            &lt;span class="badge"&gt;検閲耐性&lt;/span&gt;
            &lt;span class="badge"&gt;表現の自由&lt;/span&gt;
        &lt;/div&gt;
        
        &lt;footer style="text-align: center; margin-top: 40px; opacity: 0.9; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 20px;"&gt;
            &lt;p&gt;✨ Powered by Walrus Sites ✨&lt;/p&gt;
            &lt;p style="font-size: 0.9em; opacity: 0.8;"&gt;分散型ウェブの未来をあなたの手で&lt;/p&gt;
        &lt;/footer&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
      </div>
      
      <div class="bg-green-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">✅ サイト作成のポイント</p>
        <ul>
          <li><strong>index.html必須</strong>：サイトのルートには必ずindex.htmlが必要</li>
          <li><strong>静的ファイルのみ</strong>：HTML、CSS、JavaScript、画像などが対応</li>
          <li><strong>相対パス使用</strong>：ファイル間の参照は相対パスで記述</li>
          <li><strong>レスポンシブ対応</strong>：様々なデバイスで表示されることを考慮</li>
        </ul>
      </div>
    `,
    'step-3-2': `
      <h2>Site-Builderでのデプロイ</h2>
      <p>作成したHTMLサイトをWalrus Sitesにデプロイしましょう。公式のsite-builderツールを使用して、分散型ウェブサイトを公開します。</p>
      
      <h3>デプロイ前の確認</h3>
      <p>デプロイを実行する前に、以下を確認してください：</p>
      
      <div class="bg-blue-50 p-4 rounded-lg">
        <p class="font-semibold">✅ デプロイ前チェックリスト</p>
        <ul>
          <li><strong>index.html存在</strong>：プロジェクトディレクトリにindex.htmlがある</li>
          <li><strong>site-builderインストール済み</strong>：site-builderコマンドが利用可能</li>
          <li><strong>設定ファイル準備済み</strong>：sites-config.yamlが正しく配置されている</li>
          <li><strong>ウォレット準備</strong>：SUIとWALトークンが十分にある</li>
        </ul>
      </div>
      
      <h3>基本的なデプロイコマンド</h3>
      <p>最もシンプルなデプロイ方法：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># サイトディレクトリに移動</p>
        <p>cd my-first-walrus-site</p>
        <br>
        <p># site-builderでデプロイ（1エポック保存）</p>
        <p>site-builder deploy --epochs 1 .</p>
      </div>
      
      <h3>エポック数の指定</h3>
      <p>サイトの保存期間を指定できます：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># 短期テスト用（1エポック ≈ 24時間）</p>
        <p>site-builder deploy --epochs 1 .</p>
        <br>
        <p># 1週間程度（7エポック）</p>
        <p>site-builder deploy --epochs 7 .</p>
        <br>
        <p># 長期保存（365エポック ≈ 1年）</p>
        <p>site-builder deploy --epochs 365 .</p>
      </div>
      
      <h3>デプロイプロセスの詳細</h3>
      <p>site-builderは以下の手順でサイトをデプロイします：</p>
      
      <div class="bg-yellow-50 p-4 rounded-lg">
        <p class="font-semibold">🔄 デプロイフロー</p>
        <ol>
          <li><strong>ファイル解析</strong>：ディレクトリ内のすべてのファイルを確認</li>
          <li><strong>Walrusブロブ作成</strong>：各ファイルを個別のブロブとして保存</li>
          <li><strong>サイトオブジェクト生成</strong>：Suiブロックチェーン上にサイト管理オブジェクトを作成</li>
          <li><strong>リソースマッピング</strong>：ファイルパスとブロブIDの関連付け</li>
          <li><strong>メタデータ記録</strong>：サイト構造の情報をブロックチェーンに記録</li>
        </ol>
      </div>
      
      <h3>デプロイ結果の確認</h3>
      <p>デプロイが成功すると、以下のような出力が表示されます：</p>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p>Creating site...</p>
        <p>Site created with object ID: 0xabcd1234...</p>
        <p>Browse the site at: https://abcd1234.wal.app</p>
        <br>
        <p>Resources published:</p>
        <p>  index.html -> 0xef567890...</p>
        <p>  style.css -> 0x12345678...</p>
      </div>
      
      <h3>サイトへのアクセス方法</h3>
      <p>デプロイされたサイトには複数の方法でアクセスできます：</p>
      
      <h4>1. 自動生成URL</h4>
      <div class="bg-gray-100 p-4 rounded-lg">
        <p><strong>形式</strong>: <code>https://&lt;site-object-id&gt;.wal.app</code></p>
        <p><strong>例</strong>: <code>https://abcd1234.wal.app</code></p>
      </div>
      
      <h4>2. ローカルポータル（開発用）</h4>
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <p># ローカルポータルの起動</p>
        <p>site-builder serve --object-id &lt;site-object-id&gt;</p>
        <br>
        <p># ブラウザでアクセス</p>
        <p># http://localhost:8080</p>
      </div>
      
      <h3>よくある問題と解決法</h3>
      
      <div class="bg-red-50 p-4 rounded-lg">
        <p class="font-semibold">⚠️ トラブルシューティング</p>
        <ul>
          <li><strong>「not enough WAL tokens」エラー</strong>：WALトークンが不足しています。faucetから取得してください</li>
          <li><strong>「site-builder not found」エラー</strong>：site-builderがPATHに追加されていません</li>
          <li><strong>「config file not found」エラー</strong>：sites-config.yamlが正しい場所にありません</li>
          <li><strong>「index.html not found」エラー</strong>：デプロイディレクトリにindex.htmlが必要です</li>
        </ul>
      </div>
      
      <div class="bg-green-50 p-4 rounded-lg mt-4">
        <p class="font-semibold">🎉 デプロイ成功！</p>
        <p>おめでとうございます！あなたの最初のWalrus Siteが分散型ネットワーク上で稼働中です。サイトはSuiブロックチェーン上のオブジェクトとして管理され、Walrusストレージに分散保存されています。</p>
      </div>
    `,
    'step-3-3': `
      <h2>サイトの更新とバージョン管理</h2>
      <p>既存のWalrus Siteを更新し、効率的にバージョン管理を行う方法を学びましょう。</p>
      
      <h3>サイトの更新方法</h3>
      <p>Walrus Sitesでは、サイトの所有者のみが更新を行うことができます。</p>
      
      <h4>更新の基本手順</h4>
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