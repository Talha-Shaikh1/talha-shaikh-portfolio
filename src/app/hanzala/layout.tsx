import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hanzala Qadri - Full Stack Developer | AI Specialist',
  description: 'Portfolio of Hanzala Qadri, specializing in AI Agents, Next.js 15, and autonomous web systems.',
}

export default function HanzalaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
