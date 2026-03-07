// app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/theme-provider'
import SmoothScroll from '../components/SmoothScroll'
import CustomCursor from '../components/CustomCursor'
import ChatWidget from '../components/ChatWidget'

// Premium font configuration
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const syne = Syne({ 
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Talha Shaikh - Full Stack Developer | AI-Focused',
  description: 'Full Stack Developer specializing in modern web applications and AI-powered chatbot solutions. Building with Next.js, TypeScript, and Python.',
  keywords: 'Full Stack Developer, AI Developer, Next.js, TypeScript, Python, Chatbot Development',
  authors: [{ name: 'Talha Shaikh' }],
  openGraph: {
    title: 'Talha Shaikh - Full Stack Developer | AI-Focused',
    description: 'Building modern web applications and AI-powered chatbot solutions.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="portfolio-theme"
        >
          <SmoothScroll />
          <CustomCursor />
          {children}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}