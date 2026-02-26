'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useState } from 'react'
import { ExternalLink, Github, ArrowUpRight, Sparkles } from 'lucide-react'

const projects = [
  {
    title: 'AI Chatbot Integration Platform',
    description:
      'Enterprise-grade platform for integrating AI chatbots into business workflows with custom knowledge bases.',
    tech: ['Next.js', 'OpenAI SDK', 'Supabase', 'Tailwind CSS'],
    features: [
      'Multi-tenant architecture with custom knowledge bases',
      'Real-time streaming responses',
      'Analytics dashboard for conversation tracking',
      'API rate limiting and usage monitoring',
    ],
    accent: { from: '#a78bfa', to: '#ec4899', glow: 'rgba(167,139,250,0.2)' },
    tag: 'AI / SaaS',
    github: '#',
    demo: '#',
  },
  {
    title: 'Library Management System',
    description:
      'Comprehensive library management solution with advanced search and user management capabilities.',
    tech: ['Next.js', 'Neon PostgreSQL', 'TypeScript', 'Prisma'],
    features: [
      'Advanced search with filters and categories',
      'User authentication with role-based access',
      'Real-time availability tracking',
      'Automated notification system for due dates',
    ],
    accent: { from: '#60a5fa', to: '#818cf8', glow: 'rgba(96,165,250,0.2)' },
    tag: 'Full Stack',
    github: '#',
    demo: '#',
  },
  {
    title: 'Secure Admin Dashboard',
    description:
      'Production-ready admin dashboard with granular access control and audit logging.',
    tech: ['Next.js', 'Supabase', 'TypeScript', 'Recharts'],
    features: [
      'Role-based access control (RBAC)',
      'Audit logs for all critical operations',
      'Data visualization with real-time updates',
      'Two-factor authentication support',
    ],
    accent: { from: '#34d399', to: '#06b6d4', glow: 'rgba(52,211,153,0.2)' },
    tag: 'Dashboard',
    github: '#',
    demo: '#',
  },
]

/* ─── Project Card ──────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[0]
  index: number
  inView: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-80, 80], [6, -6])
  const rotateY = useTransform(mouseX, [-80, 80], [-6, 6])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl overflow-hidden flex flex-col h-full group transition-shadow duration-300"
        animate={{
          boxShadow: hovered ? `0 20px 60px ${project.accent.glow}` : '0 0 0px transparent',
        }}
        style={{
          background: hovered
            ? 'rgba(255,255,255,0.045)'
            : 'rgba(255,255,255,0.025)',
          border: hovered
            ? `1px solid ${project.accent.from}35`
            : '1px solid rgba(139,92,246,0.12)',
          backdropFilter: 'blur(16px)',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        } as any}
      >
        {/* Top gradient bar */}
        <div
          className="h-[2px] w-full"
          style={{
            background: `linear-gradient(90deg, ${project.accent.from}, ${project.accent.to})`,
            opacity: hovered ? 1 : 0.4,
            transition: 'opacity 0.3s',
          }}
        />

        {/* Spotlight glow on hover */}
        <div
          className="absolute -top-20 -right-20 w-48 h-48 rounded-full pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, ${project.accent.glow}, transparent 70%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        <div className="p-6 flex flex-col flex-1" style={{ transform: 'translateZ(20px)' }}>
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <span
              className="text-xs font-mono px-2.5 py-1 rounded-full"
              style={{
                background: `${project.accent.from}18`,
                color: project.accent.from,
                border: `1px solid ${project.accent.from}30`,
              }}
            >
              {project.tag}
            </span>
            <div className="flex gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-gray-500 hover:text-white dark:hover:text-white light-hover transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-gray-500 hover:text-white dark:hover:text-white transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Title */}
          <h3
            className="text-lg font-bold text-white dark:text-white mb-2 leading-snug transition-colors duration-300 group-hover:bg-gradient-to-r"
            style={{
              fontFamily: "'Syne', sans-serif",
              backgroundImage: hovered
                ? `linear-gradient(to right, ${project.accent.from}, ${project.accent.to})`
                : 'none',
              WebkitBackgroundClip: hovered ? 'text' : 'unset',
              WebkitTextFillColor: hovered ? 'transparent' : 'white',
              backgroundClip: hovered ? 'text' : 'unset',
            }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-4"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: 'rgba(156,163,175,1)',
            }}
          >
            {project.description}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map(t => (
              <span
                key={t}
                className="text-xs font-mono px-2 py-1 rounded-md"
                style={{
                  background: 'rgba(139,92,246,0.08)',
                  color: '#c4b5fd',
                  border: '1px solid rgba(139,92,246,0.2)',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-2 flex-1">
            {project.features.map(f => (
              <div key={f} className="flex items-start gap-2.5">
                <div
                  className="w-1 h-1 rounded-full mt-[7px] shrink-0"
                  style={{
                    background: `linear-gradient(to right, ${project.accent.from}, ${project.accent.to})`,
                  }}
                />
                <span
                  className="text-xs leading-relaxed"
                  style={{ color: 'rgba(107,114,128,1)', fontFamily: "'DM Sans', sans-serif" }}
                >
                  {f}
                </span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div
            className="mt-5 pt-4 flex items-center justify-between"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono transition-colors duration-200"
              style={{
                color: hovered ? project.accent.from : 'rgba(107,114,128,1)',
              }}
            >
              View Live
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 rounded-full transition-all duration-300"
                  style={{
                    background: hovered ? project.accent.from : 'rgba(75,85,99,1)',
                    opacity: hovered ? 1 - i * 0.25 : 0.4,
                    transitionDelay: `${i * 50}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Main Section ──────────────────────────────────────────────── */
export default function Projects() {
  const [headingRef, headingInView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section
      id="projects"
      className="relative py-32 px-6 overflow-hidden
        bg-[#050508]
        dark:bg-[#050508]
        light-section"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)' }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.2), transparent)' }}
        />
        <motion.div
          className="absolute -top-60 left-[-150px] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-60 right-[-150px] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1], x: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'radial-gradient(rgba(139,92,246,0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-[50px]" style={{ background: 'rgba(139,92,246,0.5)' }} />
            <span className="text-xs font-mono text-violet-400 tracking-[0.3em] uppercase">What I've built</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2
              className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Featured{' '}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <motion.a
              href="#"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-violet-400 transition-colors shrink-0"
            >
              <span className="border-b border-gray-700 hover:border-violet-400 transition-colors">
                View all projects
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
          <p
            className="text-gray-500 mt-4 text-base max-w-lg"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            A selection of projects I've built — ranging from AI-powered platforms to full-stack web applications.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={gridInView} />
          ))}
        </div>

        {/* Bottom line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={gridInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 flex items-center gap-4"
        >
          <div className="h-px flex-1" style={{ background: 'rgba(139,92,246,0.1)' }} />
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-violet-500" />
            <span className="text-xs font-mono text-gray-600 tracking-widest uppercase">More coming soon</span>
            <Sparkles className="w-3 h-3 text-pink-500" />
          </div>
          <div className="h-px flex-1" style={{ background: 'rgba(139,92,246,0.1)' }} />
        </motion.div>
      </div>

      {/* Light mode overrides */}
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: [
            "@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');",
            "html.light #projects, :root:not(.dark) #projects { background: #f8f7ff !important; }",
            "html.light #projects h2, :root:not(.dark) #projects h2 { color: #0f0a1e !important; }",
            "html.light #projects h3 { -webkit-text-fill-color: #0f0a1e !important; }",
            "html.light #projects p { color: #6b7280 !important; }",
          ].join('\n'),
        }}
      />
    </section>
  )
}