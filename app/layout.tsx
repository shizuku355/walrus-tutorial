import './globals.css'
import type { Metadata } from 'next'
import Header from './components/Header'

export const metadata: Metadata = {
  title: 'Walrus Sites Tutorial',
  description: 'Walrus分散型ストレージでホスティングされたウェブサイト',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}