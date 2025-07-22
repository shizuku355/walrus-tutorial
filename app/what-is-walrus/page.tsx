import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Walrusとは | Walrus Sites Tutorial',
  description: 'Walrus分散型ストレージプロトコルの概要と特徴について',
}

export default function WhatIsWalrus() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Walrusとは
            </h1>
            <p className="text-xl text-gray-600">
              分散型ブロブストレージプロトコルの革新
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">概要</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Walrusは、大容量バイナリファイル（ブロブ）のための分散型ストレージプロトコルです。
                Suiブロックチェーンと統合され、可用性の証明を提供する革新的なストレージソリューションです。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">主な特徴</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">可用性の証明</h3>
                  <p className="text-gray-700">
                    ストレージノードが複数利用できない状況でも、コンテンツへのアクセスを保証します。
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">コスト効率</h3>
                  <p className="text-gray-700">
                    消去符号化技術により、ストレージコストを大幅に削減します。
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">Sui統合</h3>
                  <p className="text-gray-700">
                    Suiブロックチェーンとの統合により、調整と支払いを効率化します。
                  </p>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-orange-800 mb-3">柔軟なアクセス</h3>
                  <p className="text-gray-700">
                    CLI、SDK、HTTP技術を通じて柔軟なアクセス方法を提供します。
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">技術的仕組み</h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <h3 className="text-lg font-semibold mb-3">消去符号化</h3>
                <p className="text-gray-700 mb-3">
                  Walrusは線形ファウンテンコードを使用したエラー訂正技術を採用しています。
                  この技術により、元のファイルサイズの約5倍のストレージコストで高い冗長性を実現します。
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <h3 className="text-lg font-semibold mb-3">動的ストレージノード</h3>
                <p className="text-gray-700 mb-3">
                  ストレージノードセットは動的に変化し、委任されたプルーフオブステーク機構を通じて選択されます。
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">重要な注意事項</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                <div className="flex">
                  <div className="text-yellow-400 mr-3">⚠️</div>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">パブリックストレージ</h3>
                    <p className="text-yellow-700">
                      Walrusに保存されるすべてのブロブは<strong>パブリック</strong>で、
                      すべてのユーザーによって発見可能です。機密情報の保存には適していません。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">ユースケース</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span className="text-gray-700">大容量メディアファイルの分散ホスティング</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span className="text-gray-700">Webサイトの静的アセット配信</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span className="text-gray-700">分散型アプリケーションのデータストレージ</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span className="text-gray-700">コンテンツ配信ネットワーク（CDN）の代替</span>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </main>
  )
}