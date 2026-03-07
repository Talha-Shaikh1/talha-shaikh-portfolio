'use client'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { 
  ExternalLink, 
  Github, 
  ArrowUpRight, 
  Sparkles,
  Layers,
  Cpu,
  Palette,
  Globe
} from 'lucide-react'
import Link from 'next/link'

const projects = [
  {
    title: 'AI Chatbot Integration Platform',
    description: 'Enterprise-grade platform for integrating AI chatbots into business workflows with custom knowledge bases and real-time analytics.',
    longDescription: 'A comprehensive SaaS platform enabling businesses to deploy custom AI chatbots with their own knowledge bases. Features include multi-tenant architecture, conversation analytics, and seamless API integrations.',
    tech: ['Next.js 16', 'OpenAI SDK', 'Supabase', 'Tailwind CSS', 'TypeScript'],
    features: [
      'Multi-tenant architecture with custom knowledge bases',
      'Real-time streaming responses with SSE',
      'Analytics dashboard for conversation tracking',
      'API rate limiting and usage monitoring',
    ],
    category: 'AI / SaaS',
    categoryIcon: Cpu,
    accent: { from: '#a78bfa', to: '#ec4899', glow: 'rgba(167,139,250,0.25)' },
    image: '/projects/ai-chatbot.png',
    github: 'https://github.com/Talha-Shaikh1',
    demo: '#',
    stats: { users: '500+', conversations: '10K+', uptime: '99.9%' },
    delay: 0,
  },
  {
    title: 'Library Management System',
    description: 'Comprehensive library management solution with advanced search, user management, and real-time availability tracking.',
    longDescription: 'A full-stack library management system featuring advanced search capabilities, role-based access control, and automated notification systems for book due dates.',
    tech: ['Next.js', 'Neon PostgreSQL', 'TypeScript', 'Prisma'],
    features: [
      'Advanced search with filters and categories',
      'User authentication with role-based access',
      'Real-time availability tracking',
      'Automated notification system',
    ],
    category: 'Full Stack',
    categoryIcon: Database,
    accent: { from: '#60a5fa', to: '#818cf8', glow: 'rgba(96,165,250,0.25)' },
    image: '/projects/library.png',
    github: 'https://github.com/Talha-Shaikh1',
    demo: '#',
    stats: { books: '50K+', users: '1K+', searches: '100K+' },
    delay: 0.15,
  },
  {
    title: 'Secure Admin Dashboard',
    description: 'Production-ready admin dashboard with granular access control, audit logging, and real-time data visualization.',
    longDescription: 'A secure, scalable admin dashboard featuring role-based access control, comprehensive audit logs, and beautiful data visualizations for business intelligence.',
    tech: ['Next.js', 'Supabase', 'TypeScript', 'Recharts'],
    features: [
      'Role-based access control (RBAC)',
      'Audit logs for all critical operations',
      'Data visualization with real-time updates',
      'Two-factor authentication support',
    ],
    category: 'Dashboard',
    categoryIcon: Layers,
    accent: { from: '#34d399', to: '#06b6d4', glow: 'rgba(52,211,153,0.25)' },
    image: '/projects/dashboard.png',
    github: 'https://github.com/Talha-Shaikh1',
    demo: '#',
    stats: { endpoints: '50+', requests: '1M+', latency: '<50ms' },
    delay: 0.3,
  },
  {
    title: 'E-Commerce Store Platform',
    description: 'Modern e-commerce solution with Sanity CMS, payment integration, and comprehensive admin panel.',
    longDescription: 'A complete e-commerce platform featuring product management, cart functionality, payment processing, and an intuitive admin dashboard for store management.',
    tech: ['Next.js', 'Sanity CMS', 'Stripe', 'Tailwind CSS'],
    features: [
      'Product catalog with variants',
      'Shopping cart and checkout',
      'Payment processing with Stripe',
      'Admin dashboard for management',
    ],
    category: 'E-Commerce',
    categoryIcon: Globe,
    accent: { from: '#f472b6', to: '#fb7185', glow: 'rgba(244,114,182,0.25)' },
    image: '/projects/ecommerce.png',
    github: 'https://github.com/Talha-Shaikh1',
    demo: '#',
    stats: { products: '1K+', orders: '5K+', revenue: '$100K+' },
    delay: 0.45,
  },
]

// Simple icon component for Database since it's not imported
function Database({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  )
}

// Premium project card with 3D effects
function ProjectCard({ 
  project, 
  index, 
  inView,
  isLight 
}: { 
  project: typeof projects[0]; 
  index: number; 
  inView: boolean;
  isLight: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8])
  
  const springConfig = { damping: 25, stiffness: 400 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  const CategoryIcon = project.categoryIcon || Database

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: project.delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX: springRotateX, 
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative h-full rounded-3xl overflow-hidden group"
      >
        {/* Card background */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: isLight 
              ? hovered 
                ? `radial-gradient(circle at 50% 0%, ${project.accent.glow.replace('0.25', '0.1')}, rgba(255,255,255,0.9) 70%)`
                : 'rgba(255,255,255,0.8)'
              : hovered
                ? `radial-gradient(circle at 50% 0%, ${project.accent.glow}, rgba(255,255,255,0.03) 70%)`
                : 'rgba(255,255,255,0.02)',
            border: hovered
              ? `1px solid ${project.accent.from}40`
              : isLight 
                ? '1px solid rgba(109,40,217,0.12)' 
                : '1px solid rgba(139,92,246,0.12)',
            backdropFilter: 'blur(20px)',
            boxShadow: hovered 
              ? `0 30px 80px ${project.accent.glow}` 
              : isLight 
                ? '0 4px 30px rgba(109,40,217,0.08)' 
                : 'none',
          }}
        />

        {/* Animated gradient border */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${project.accent.from}, ${project.accent.to})`,
            padding: '1px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        {/* Content */}
        <div className="relative p-6 h-full flex flex-col" style={{ transform: 'translateZ(30px)' }}>
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono"
              style={{
                background: `${project.accent.from}15`,
                border: `1px solid ${project.accent.from}30`,
                color: project.accent.from,
              }}
              whileHover={{ scale: 1.05 }}
            >
              <CategoryIcon className="w-3.5 h-3.5" />
              {project.category}
            </motion.div>

            <div className="flex gap-2">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                style={{
                  background: isLight ? 'rgba(124,58,237,0.08)' : 'rgba(124,58,237,0.1)',
                  border: `1px solid ${isLight ? 'rgba(124,58,237,0.2)' : 'rgba(124,58,237,0.25)'}`,
                }}
              >
                <Github className="w-4 h-4" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
              </motion.a>
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                style={{
                  background: isLight ? 'rgba(124,58,237,0.08)' : 'rgba(124,58,237,0.1)',
                  border: `1px solid ${isLight ? 'rgba(124,58,237,0.2)' : 'rgba(124,58,237,0.25)'}`,
                }}
              >
                <ExternalLink className="w-4 h-4" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
              </motion.a>
            </div>
          </div>

          {/* Title */}
          <motion.h3
            className="text-xl font-bold mb-3 transition-all duration-300"
            style={{
              fontFamily: "'Syne', sans-serif",
            }}
          >
            <span
              style={{
                backgroundImage: hovered
                  ? `linear-gradient(135deg, ${project.accent.from}, ${project.accent.to})`
                  : 'none',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: hovered ? 'transparent' : isLight ? '#0f0a1e' : '#ffffff',
                WebkitTextFillColor: hovered ? 'transparent' : isLight ? '#0f0a1e' : '#ffffff',
              }}
            >
              {project.title}
            </span>
          </motion.h3>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-4 flex-1"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: isLight ? '#6b7280' : '#9ca3af',
            }}
          >
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: project.delay + 0.3 + i * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1.5 rounded-lg"
                style={{
                  background: isLight ? 'rgba(124,58,237,0.08)' : 'rgba(124,58,237,0.1)',
                  border: `1px solid ${isLight ? 'rgba(124,58,237,0.15)' : 'rgba(124,58,237,0.2)'}`,
                  color: isLight ? '#7c3aed' : '#c4b5fd',
                }}
              >
                {t}
              </motion.span>
            ))}
          </div>

          {/* Features list */}
          <div className="space-y-2 mb-5">
            {project.features.slice(0, 3).map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: project.delay + 0.4 + i * 0.1 }}
                className="flex items-start gap-2.5"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                  style={{ background: project.accent.from }}
                />
                <span
                  className="text-xs"
                  style={{ 
                    color: isLight ? '#6b7280' : '#9ca3af',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Footer with CTA */}
          <div
            className="pt-4 flex items-center justify-between"
            style={{ 
              borderTop: `1px solid ${isLight ? 'rgba(124,58,237,0.15)' : 'rgba(124,58,237,0.2)'}`,
            }}
          >
            <Link href={project.demo}>
              <motion.div
                className="inline-flex items-center gap-2 text-xs font-mono"
                style={{ color: project.accent.from }}
                whileHover={{ x: 5 }}
              >
                <span>View Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.div>
            </Link>

            {/* Animated dots */}
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: project.accent.from }}
                  animate={{
                    opacity: hovered ? 1 - i * 0.2 : 0.4,
                    scale: hovered ? 1.2 : 1,
                  }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Corner glow effect */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${project.accent.glow}, transparent 70%)`,
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isLight = mounted && theme === 'light'

  const [sectionRef, sectionInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [headingRef, headingInView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden transition-colors duration-500"
      style={{ background: 'var(--bg-primary)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: "@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');" }} />

      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Grid lines */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${isLight ? 'rgba(109,40,217,0.25)' : 'rgba(139,92,246,0.3)'}, transparent)` }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${isLight ? 'rgba(219,39,119,0.15)' : 'rgba(236,72,153,0.2)'}, transparent)` }}
        />
        
        {/* Animated orbs */}
        <motion.div
          className="absolute -top-60 left-[-150px] w-[500px] h-[500px] rounded-full"
          style={{ background: `radial-gradient(circle, ${isLight ? 'rgba(109,40,217,0.06)' : 'rgba(139,92,246,0.08)'} 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-60 right-[-150px] w-[500px] h-[500px] rounded-full"
          style={{ background: `radial-gradient(circle, ${isLight ? 'rgba(219,39,119,0.05)' : 'rgba(236,72,153,0.06)'} 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.15, 1], x: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${isLight ? 'rgba(109,40,217,0.12)' : 'rgba(139,92,246,0.2)'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            opacity: isLight ? 0.15 : 0.2,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-[50px]" style={{ background: isLight ? 'rgba(109,40,217,0.4)' : 'rgba(139,92,246,0.5)' }} />
            <span
              className="text-xs font-mono tracking-[0.3em] uppercase"
              style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
            >
              Portfolio
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2
              className="text-5xl md:text-6xl font-black tracking-tighter leading-none"
              style={{ fontFamily: "'Syne', sans-serif", color: isLight ? '#0f0a1e' : '#ffffff' }}
            >
              Featured{' '}
              <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <motion.a
              href="https://github.com/Talha-Shaikh1"
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 text-sm font-mono transition-colors shrink-0"
              style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
            >
              <span className="border-b" style={{ borderColor: isLight ? 'rgba(124,58,237,0.4)' : 'rgba(167,139,250,0.4)' }}>
                View all on GitHub
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
          <p
            className="mt-4 text-base max-w-2xl"
            style={{ fontFamily: "'DM Sans', sans-serif", color: isLight ? '#6b7280' : '#6b7280' }}
          >
            A curated selection of projects showcasing modern web development, AI integration, 
            and premium user experiences.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={i} 
              inView={sectionInView}
              isLight={isLight}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl"
            style={{
              background: isLight 
                ? 'linear-gradient(135deg, rgba(109,40,217,0.06), rgba(219,39,119,0.05))'
                : 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(236,72,153,0.08))',
              border: `1px solid ${isLight ? 'rgba(109,40,217,0.15)' : 'rgba(139,92,246,0.2)'}`,
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
            <span
              className="text-sm font-mono"
              style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
            >
              More projects coming soon
            </span>
            <Sparkles className="w-4 h-4" style={{ color: isLight ? '#f59e0b' : '#fbbf24' }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
