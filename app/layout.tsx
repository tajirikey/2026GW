import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'

const noto = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ぶっ飛べ！ゴールデンウィーク2026 🎌',
  description: '家族でたのしむ！白馬・松本 GW旅行しおり',
  openGraph: {
    title: 'ぶっ飛べ！ゴールデンウィーク2026',
    description: '家族でたのしむ！白馬・松本 GW旅行しおり',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${noto.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
