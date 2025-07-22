import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Walrus Sitesとは | Walrus Sites Tutorial',
  description: 'Walrus Sites分散型ウェブサイトホスティングの概要と特徴について',
}

export default function WalrusSites() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Walrus Sitesとは
            </h1>
            <p className="text-xl text-gray-600">
              分散型ウェブサイトホスティングの新時代
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">概要</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Walrus Sitesは、Walrus分散型ストレージネットワーク上でWebサイトをホスティングするための
                革新的なプラットフォームです。従来の中央集権的なホスティングサービスとは異なり、
                分散型インフラストラクチャを活用してWebサイトを配信します。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">従来のホスティングとの違い</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-red-800 mb-3">従来のホスティング</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">×</span>
                      <span>単一障害点が存在</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">×</span>
                      <span>検閲される可能性</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">×</span>
                      <span>サーバーダウンでアクセス不可</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">×</span>
                      <span>月額料金が必要</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">Walrus Sites</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>分散型で障害に強い</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>検閲耐性がある</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>高い可用性を保証</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>低コストで永続的</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Walrus Sitesの特徴</h2>
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">🌐 分散型ホスティング</h3>
                  <p className="text-gray-700">
                    WebサイトのファイルはWalrusネットワーク上の複数のノードに分散して保存されます。
                    これにより、単一のサーバーに依存することなく、高い可用性を実現します。
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">🔒 検証可能な完全性</h3>
                  <p className="text-gray-700">
                    すべてのコンテンツは暗号学的に検証可能で、改ざんされていないことが保証されます。
                    ユーザーは信頼できるコンテンツにアクセスできます。
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">💰 コスト効率</h3>
                  <p className="text-gray-700">
                    従来のホスティングサービスと比較して、長期的に非常にコスト効率が良いです。
                    一度の支払いで長期間のホスティングが可能です。
                  </p>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-orange-800 mb-3">⚡ 高速アクセス</h3>
                  <p className="text-gray-700">
                    分散ネットワークにより、ユーザーに最も近いノードからコンテンツが配信され、
                    高速なアクセスが可能です。
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">技術的な仕組み</h2>
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">1. ファイルのアップロード</h3>
                  <p className="text-gray-700">
                    WebサイトのファイルをWalrusネットワークにアップロードします。
                    HTML、CSS、JavaScript、画像などすべてのWebアセットが対象です。
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">2. 分散ストレージ</h3>
                  <p className="text-gray-700">
                    アップロードされたファイルは消去符号化により冗長化され、
                    複数のストレージノードに分散して保存されます。
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">3. アクセス</h3>
                  <p className="text-gray-700">
                    ユーザーは専用のURLを通じてWebサイトにアクセスします。
                    リクエストは分散ネットワークから最適なノードを選択して配信されます。
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">対応しているWebサイトタイプ</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white border-2 border-blue-200 p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">📝</div>
                  <h3 className="font-semibold mb-2">静的サイト</h3>
                  <p className="text-sm text-gray-600">HTML/CSS/JSの静的サイト</p>
                </div>
                <div className="bg-white border-2 border-blue-200 p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">⚛️</div>
                  <h3 className="font-semibold mb-2">SPAアプリ</h3>
                  <p className="text-sm text-gray-600">React/Vue.jsなどのSPA</p>
                </div>
                <div className="bg-white border-2 border-blue-200 p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">📚</div>
                  <h3 className="font-semibold mb-2">ドキュメント</h3>
                  <p className="text-sm text-gray-600">技術文書やポートフォリオ</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">制限事項</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                <div className="flex">
                  <div className="text-yellow-400 mr-3">⚠️</div>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">静的コンテンツのみ</h3>
                    <p className="text-yellow-700 mb-3">
                      Walrus Sitesは静的コンテンツのみをサポートします。
                      サーバーサイドの処理やデータベースは利用できません。
                    </p>
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">パブリックアクセス</h3>
                    <p className="text-yellow-700">
                      すべてのコンテンツはパブリックで、アクセス制限をかけることはできません。
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  )
}