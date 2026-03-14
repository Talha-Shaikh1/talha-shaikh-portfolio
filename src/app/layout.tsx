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

const siteUrl = 'https://talhaweb.xyz'

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: 'Talha Shaikh - Full Stack Developer | AI Automation Engineer',
    template: '%s | Talha Shaikh',
  },
  description:
    'Full Stack Web Developer and AI Automation Engineer specializing in Next.js, AI Agents, SaaS, and business automation solutions. Building modern web applications with cutting-edge technology.',
  keywords: [
    'Full Stack Developer',
    'AI Automation Engineer',
    'Next.js Developer',
    'TypeScript',
    'Python',
    'AI Agents',
    'SaaS Development',
    'Web Applications',
    'Business Automation',
    'React Developer',
    'Frontend Developer',
    'Backend Developer',
  ].join(', '),
  authors: [{ name: 'Talha Shaikh', url: siteUrl }],
  creator: 'Talha Shaikh',
  publisher: 'Talha Shaikh',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // OpenGraph / Facebook
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Talha Shaikh Portfolio',
    title: 'Talha Shaikh - Full Stack Developer | AI Automation Engineer',
    description:
      'Full Stack Web Developer and AI Automation Engineer specializing in Next.js, AI Agents, SaaS, and business automation solutions.',
    images: [
      {
        url: `${siteUrl}/ogImage.png`,
        width: 1200,
        height: 630,
        alt: 'Talha Shaikh - Full Stack Web Developer and AI Automation Engineer',
        type: 'image/png',
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Talha Shaikh - Full Stack Developer | AI Automation Engineer',
    description:
      'Full Stack Web Developer and AI Automation Engineer specializing in Next.js, AI Agents, SaaS, and business automation solutions.',
    images: [`${siteUrl}/ogImage.png`],
    creator: '@talhadev', // Replace with your actual Twitter handle if available
  },

  // Additional metadata
  alternates: {
    canonical: siteUrl,
  },

  // Verification
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
    yandex: 'your-yandex-verification-code',
  },

  // App icons (if you have them)
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },

  // Manifest
  manifest: '/site.webmanifest',
}

// Structured data for JSON-LD
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Talha Shaikh',
  url: siteUrl,
  image: `${siteUrl}/ogImage.png`,
  sameAs: [
    'https://github.com/yourusername', // Replace with your actual profiles
    'https://linkedin.com/in/yourusername',
    'https://twitter.com/yourusername',
  ],
  jobTitle: 'Full Stack Developer & AI Automation Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance',
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Your University', // Replace with your actual university
  },
  description:
    'Full Stack Web Developer and AI Automation Engineer specializing in Next.js, AI Agents, SaaS, and business automation solutions.',
  knowsAbout: [
    'Next.js',
    'React',
    'TypeScript',
    'JavaScript',
    'Python',
    'AI Agents',
    'SaaS Development',
    'Business Automation',
    'Web Development',
    'Frontend Development',
    'Backend Development',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
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