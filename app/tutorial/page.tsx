import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '初心者でもわかるWalrusサイトの作り方 | Walrus Sites Tutorial',
  description: 'Walrus Sitesでのウェブサイト作成から公開までの完全ガイド',
}

export default function Tutorial() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              初心者でもわかるWalrusサイトの作り方
            </h1>
            <p className="text-xl text-gray-600">
              ステップバイステップで学ぶ分散型ウェブサイト構築
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">必要な準備</h2>
              <div className="bg-blue-50 p-6 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">事前に準備するもの</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Node.js（バージョン18以上）</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>テキストエディタ（VS Code推奨）</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>基本的なHTML/CSSの知識</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>コマンドライン操作の基本知識</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">ステップ1: プロジェクトの作成</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Next.jsプロジェクトの初期化</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm mb-4">
                  <div>npx create-next-app@latest my-walrus-site</div>
                  <div>cd my-walrus-site</div>
                </div>
                <p className="text-gray-700 mb-3">
                  プロジェクト作成時の設定：
                </p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• TypeScript: Yes</li>
                  <li>• ESLint: Yes</li>
                  <li>• Tailwind CSS: Yes</li>
                  <li>• App Router: Yes</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">ステップ2: 静的サイト用の設定</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">next.config.jsの設定</h3>
                <div className="bg-gray-900 text-gray-300 p-4 rounded font-mono text-sm mb-4 overflow-x-auto">
                  <pre>{`/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig`}</pre>
                </div>
                <p className="text-gray-700">
                  この設定により、Next.jsが静的ファイルとしてエクスポートされ、
                  Walrus Sitesでホスティング可能になります。
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">ステップ3: コンテンツの作成</h2>
              <div className="space-y-4">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">ページの作成例</h3>
                  <div className="bg-gray-900 text-gray-300 p-4 rounded font-mono text-sm mb-4 overflow-x-auto">
                    <pre>{`// app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to My Walrus Site
        </h1>
        <p className="text-xl text-center text-gray-600">
          分散型ストレージで動作するウェブサイト
        </p>
      </div>
    </main>
  )
}`}</pre>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">ステップ4: ビルドとテスト</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">ローカルでの確認</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm mb-4">
                  <div># 開発サーバーの起動</div>
                  <div>npm run dev</div>
                  <div className="mt-2"># 静的ファイルの生成</div>
                  <div>npm run build</div>
                </div>
                <p className="text-gray-700">
                  `npm run build`を実行すると、`out`フォルダに静的ファイルが生成されます。
                  これらのファイルをWalrusにアップロードします。
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">ステップ5: Walrusへのデプロイ</h2>
              <div className="space-y-4">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">Walrus CLIのインストール</h3>
                  <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm mb-4">
                    <div># Walrus CLIのインストール</div>
                    <div>cargo install walrus-cli</div>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-800 mb-3">サイトのアップロード</h3>
                  <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm mb-4">
                    <div># outフォルダをWalrusにアップロード</div>
                    <div>walrus blob store ./out</div>
                  </div>
                  <p className="text-gray-700">
                    アップロード完了後、Walrus SitesのURLが表示されます。
                    このURLから分散型ウェブサイトにアクセスできます。
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">ベストプラクティス</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">📦 ファイルサイズの最適化</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• 画像の圧縮</li>
                    <li>• CSS/JSの最小化</li>
                    <li>• 不要なファイルの削除</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">🔧 SEO対策</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• メタタグの設定</li>
                    <li>• 構造化データ</li>
                    <li>• サイトマップの生成</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">⚡ パフォーマンス</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• 遅延読み込み</li>
                    <li>• キャッシュ戦略</li>
                    <li>• コード分割</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-800 mb-3">🛡️ セキュリティ</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• CSPヘッダー</li>
                    <li>• XSS対策</li>
                    <li>• HTTPS対応</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">トラブルシューティング</h2>
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-400 p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">よくある問題</h3>
                  <div className="space-y-3 text-gray-700">
                    <div>
                      <strong>Q: ビルドエラーが発生する</strong>
                      <p className="text-sm mt-1">A: next.config.jsの設定を確認し、静的エクスポートに対応していないコンポーネントがないかチェックしてください。</p>
                    </div>
                    <div>
                      <strong>Q: 画像が表示されない</strong>
                      <p className="text-sm mt-1">A: next.config.jsで`images.unoptimized: true`が設定されているか確認してください。</p>
                    </div>
                    <div>
                      <strong>Q: ルーティングが動作しない</strong>
                      <p className="text-sm mt-1">A: Walrus Sitesは静的サイトのため、クライアントサイドルーティングの設定が必要です。</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">次のステップ</h2>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  基本的なWalrus Siteの作成ができたら、以下の高度な機能も試してみてください：
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>カスタムドメインの設定</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>CI/CDパイプラインの構築</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>アナリティクスの導入</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>PWA機能の追加</span>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  )
}