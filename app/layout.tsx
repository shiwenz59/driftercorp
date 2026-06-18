import type { Metadata, Viewport } from 'next'
import { Leckerli_One, Josefin_Sans } from 'next/font/google'
import './globals.css'

const leckerliOne = Leckerli_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-leckerli',
  display: 'swap',
})

const josefinSans = Josefin_Sans({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-josefin',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Drifter Corp.',
  description: "Drifter Corp. is a four-piece prog rock band from New York City. Debut album Ebbs N’ Flows coming soon.",
  icons: {
    icon: '/favicon.png',
    apple: '/favicon-180.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0c0e10',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${leckerliOne.variable} ${josefinSans.variable}`} suppressHydrationWarning>
      <body>
        {/* Runs before React hydration: enables timed reveal animation and preserves scroll */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js-ready');if('scrollRestoration'in history)history.scrollRestoration='manual';` }} />
        {children}
      </body>
    </html>
  )
}
