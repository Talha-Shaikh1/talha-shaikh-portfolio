// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/theme-provider'
import ChatWidget from '../components/ChatWidget'


const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="portfolio-theme"
        >
          {children}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}