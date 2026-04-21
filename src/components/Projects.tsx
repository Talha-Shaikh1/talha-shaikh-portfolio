'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import {
  FolderGit2,
  FileJson,
  Github,
  ExternalLink,
  Star,
  GitFork,
  Eye,
  Code2,
  Cpu,
  ShoppingCart,
  BookOpen,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react'
import Link from 'next/link'

/* ═══════════════════════════════════════════════════════════════
   DEVELOPER MODE PROJECTS - GitHub Repository Inspired
   ═══════════════════════════════════════════════════════════════ */

const projects = [
  {
    name: 'humanoid-robotic-book',
    title: 'AI Humanoid Robotics Book',
    description: 'Interactive digital book teaching Physical AI and Humanoid Robotics with ROS 2 architecture and AI-powered robot control',
    fullDescription: 'An interactive open-source learning platform that teaches the fundamentals of Physical AI and Humanoid Robotics. Covers ROS 2 architecture, robot simulation, perception systems, and AI-powered robot control.',
    topics: ['react', 'openai-sdk', 'neon', 'docusaurus', 'python', 'robotics', 'ai'],
    language: 'TypeScript',
    languageColor: '59, 130, 246',
    stars: '500+',
    forks: '50+',
    watchers: '100+',
    category: 'AI / Robotics',
    categoryIcon: Cpu,
    accentColor: '139, 92, 246',
    image: '/projects/humanoid-robotics.png',
    github: 'https://github.com/Hanzala-Shaikh1/humanoid-robotic-book',
    demo: 'https://humanoid-robotic-book-eight.vercel.app/',
    delay: 0,
  },
  {
    name: 'library-management-system',
    title: 'Library Management System',
    description: 'Comprehensive library management with advanced search, user management, and real-time availability tracking',
    fullDescription: 'A full-stack library management system featuring advanced search capabilities, role-based access control, and automated notification systems for book due dates.',
    topics: ['nextjs', 'neon-postgresql', 'typescript', 'prisma', 'python', 'openai-agent'],
    language: 'TypeScript',
    languageColor: '59, 130, 246',
    stars: '200+',
    forks: '30+',
    watchers: '50+',
    category: 'Full Stack',
    categoryIcon: Code2,
    accentColor: '59, 130, 246',
    image: '/projects/library.png',
    github: 'https://github.com/Hanzala-Shaikh1',
    demo: 'https://bait-ul-kutub.vercel.app/',
    delay: 0.15,
  },
  {
    name: 'the-arqa-ecommerce',
    title: 'The Arqa E-Commerce Store',
    description: 'Full-featured e-commerce platform with custom admin panel, real-time inventory, and modern checkout',
    fullDescription: 'A scalable e-commerce platform built with Next.js and Sanity CMS featuring a fully custom admin dashboard for product management, order tracking, and inventory control.',
    topics: ['nextjs', 'sanity-cms', 'typescript', 'tailwindcss', 'stripe', 'ecommerce'],
    language: 'TypeScript',
    languageColor: '59, 130, 246',
    stars: '150+',
    forks: '20+',
    watchers: '40+',
    category: 'E-Commerce',
    categoryIcon: ShoppingCart,
    accentColor: '245, 158, 11',
    image: '/projects/ecommerce.png',
    github: 'https://github.com/Hanzala-Shaikh1',
    demo: 'https://thearqa.com/',
    delay: 0.3,
  },
  {
    name: 'beeroot-hair-oil',
    title: 'BeeRoot Hair Oil E-Commerce',
    description: 'D2C hair care brand store with optimized checkout, WhatsApp order confirmation, and product-focused landing',
    fullDescription: 'A high-conversion e-commerce store built for the BeeRoot Hair Oil brand. Features product storytelling, fast checkout, and custom order system with WhatsApp confirmation.',
    topics: ['nextjs', 'sanity-cms', 'supabase', 'tailwindcss', 'twilio-whatsapp', 'd2c'],
    language: 'TypeScript',
    languageColor: '59, 130, 246',
    stars: '100+',
    forks: '15+',
    watchers: '30+',
    category: 'E-Commerce',
    categoryIcon: ShoppingCart,
    accentColor: '249, 115, 22',
    image: '/projects/beeroot.png',
    github: 'https://github.com/Hanzala-Shaikh1',
    demo: 'https://beerootpk.com/',
    delay: 0.45,
  },
]

// Repository Card Component
function RepoCard({
  project,
  inView,
  isLight
}: {
  project: typeof projects[0];
  inView: boolean;
  isLight: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false)
  const CategoryIcon = project.categoryIcon || Code2

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: project.delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
      className="group"
    >
      <motion.div
        className="rounded-xl overflow-hidden backdrop-blur-xl transition-shadow duration-300 h-full relative"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: isLight ? 'rgba(15, 15, 25, 0.95)' : 'rgba(10, 10, 15, 0.95)',
          border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.2)' : `rgba(${project.accentColor}, 0.3)`}`,
          boxShadow: isHovered
            ? `0 20px 40px rgba(${project.accentColor}, 0.25)`
            : '0 10px 30px rgba(0,0,0,0.5)',
        }}
      >
        {/* Glow overlay */}
        <motion.div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%'])} ${useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%'])}, rgba(${project.accentColor}, 0.15) 0%, transparent 60%)`,
          }}
        />

        {/* Repo Header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            background: isLight ? 'rgba(30, 30, 46, 0.9)' : 'rgba(20, 20, 30, 0.9)',
            borderBottom: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.15)' : `rgba(${project.accentColor}, 0.2)`}`,
          }}
        >
          <div className="flex items-center gap-3">
            <FolderGit2
              className="w-5 h-5"
              style={{ color: `rgb(${project.accentColor})` }}
            />
            <span
              className="text-sm font-mono font-bold"
              style={{ color: isLight ? '#f3f4f6' : '#ffffff' }}
            >
              {project.name}
            </span>
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-full font-mono"
              style={{
                background: `rgba(${project.accentColor}, 0.15)`,
                color: `rgb(${project.accentColor})`,
                border: `1px solid rgba(${project.accentColor}, 0.3)`,
              }}
            >
              Public
            </span>
          </div>
          <div className="flex items-center gap-2">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: isLight ? 'rgba(124, 58, 237, 0.1)' : 'rgba(124, 58, 237, 0.15)',
                border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(124, 58, 237, 0.25)'}`,
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
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: `rgba(${project.accentColor}, 0.15)`,
                border: `1px solid rgba(${project.accentColor}, 0.3)`,
              }}
            >
              <ExternalLink className="w-4 h-4" style={{ color: `rgb(${project.accentColor})` }} />
            </motion.a>
          </div>
        </div>

        {/* Repo Content */}
        <div className="p-4">
          {/* Title & Description */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <CategoryIcon className="w-4 h-4" style={{ color: `rgb(${project.accentColor})` }} />
              <span
                className="text-xs font-mono"
                style={{ color: `rgb(${project.accentColor})` }}
              >
                {project.category}
              </span>
            </div>
            <h3
              className="text-base font-bold mb-2"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: isLight ? '#f3f4f6' : '#ffffff',
              }}
            >
              {project.title}
            </h3>
            <p
              className="text-xs leading-relaxed"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: isLight ? '#9ca3af' : '#d1d5db',
              }}
            >
              {project.description}
            </p>
          </div>

          {/* Topics */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.topics.map((topic, i) => (
              <motion.span
                key={topic}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: project.delay + 0.2 + i * 0.03 }}
                className="text-[10px] font-mono px-2 py-1 rounded-md"
                style={{
                  background: isLight ? 'rgba(124, 58, 237, 0.1)' : 'rgba(124, 58, 237, 0.15)',
                  color: isLight ? '#7c3aed' : '#a78bfa',
                  border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(124, 58, 237, 0.25)'}`,
                }}
              >
                {topic}
              </motion.span>
            ))}
          </div>

          {/* Language & Stats */}
          <div className="flex items-center justify-between mb-4 pb-4" style={{
            borderBottom: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.15)' : `rgba(${project.accentColor}, 0.15)`}`,
          }}>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: `rgb(${project.languageColor})` }}
              />
              <span className="text-xs font-mono" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>
                {project.language}
              </span>
            </div>
            {/* <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3" style={{ color: '#fbbf24' }} />
                <span className="text-xs font-mono" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>
                  {project.stars}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="w-3 h-3" style={{ color: '#34d399' }} />
                <span className="text-xs font-mono" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>
                  {project.forks}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" style={{ color: `rgb(${project.accentColor})` }} />
                <span className="text-xs font-mono" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>
                  {project.watchers}
                </span>
              </div>
            </div> */}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link href={project.demo} className="flex-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2 rounded-lg text-xs font-mono font-semibold flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(135deg, rgb(${project.accentColor}), rgba(${project.accentColor}, 0.8))`,
                  color: 'white',
                  boxShadow: `0 0 20px rgba(${project.accentColor}, 0.4)`,
                }}
              >
                <BookOpen className="w-3 h-3" />
                View Demo
              </motion.button>
            </Link>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-2 rounded-lg text-xs font-mono font-semibold flex items-center justify-center gap-2"
              style={{
                background: isLight ? 'rgba(124, 58, 237, 0.1)' : 'rgba(124, 58, 237, 0.15)',
                color: isLight ? '#7c3aed' : '#a78bfa',
                border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(124, 58, 237, 0.25)'}`,
              }}
            >
              <Github className="w-3 h-3" />
              Source Code
            </motion.a>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 mt-4 pt-4" style={{
            borderTop: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.15)' : `rgba(${project.accentColor}, 0.15)`}`,
          }}>
            <CheckCircle2 className="w-3 h-3" style={{ color: '#34d399' }} />
            <span className="text-[10px] font-mono" style={{ color: '#34d399' }}>
              Active Development
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])
  const isLight = mounted && theme === 'light'

  const [sectionRef, sectionInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [headingRef, headingInView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{
        background: isLight ? '#fafafc' : '#0a0a0f',
      }}
    >
      {/* Font imports */}
      <style
        dangerouslySetInnerHTML={{
          __html: "@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap');",
        }}
      />

      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Grid lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(${isLight ? 'rgba(124,58,237,0.06)' : 'rgba(139,92,246,0.05)'} 1px, transparent 1px),
              linear-gradient(90deg, ${isLight ? 'rgba(124,58,237,0.06)' : 'rgba(139,92,246,0.05)'} 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            opacity: isLight ? 0.4 : 0.5,
          }}
        />

        {/* Floating repo names */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xs font-mono"
            style={{
              color: isLight ? 'rgba(124, 58, 237, 0.08)' : 'rgba(139, 92, 246, 0.12)',
              left: `${5 + i * 12}%`,
              top: `${10 + (i % 4) * 20}%`,
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: [0, 0.5, 0],
              x: [0, 100, 200],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 2,
            }}
          >
            {['Hanzala-Shaikh1', 'github', 'repo', 'commit', 'push'][i % 5]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Github className="w-4 h-4" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
            <span
              className="text-xs font-mono tracking-[0.3em] uppercase"
              style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
            >
              GitHub Repositories
            </span>
          </div>
          <div className="flex items-center gap-4">
            <FolderGit2 className="w-8 h-8" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter leading-none"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: isLight ? '#0f0a1e' : '#ffffff',
              }}
            >
              FEATURED{' '}
              <span
                className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent"
                style={{
                  textShadow: isLight ? 'none' : '0 0 80px rgba(124,58,237,0.5)',
                }}
              >
                PROJECTS
              </span>
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 text-sm max-w-2xl"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: isLight ? '#6b7280' : '#9ca3af',
            }}
          >
            <span style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}>{'// '}</span>
            A collection of production-ready repositories.
            All projects are open-source and actively maintained.
          </motion.p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8 flex items-center gap-4 flex-wrap"
        >
          <div
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg"
            style={{
              background: isLight ? 'rgba(124, 58, 237, 0.1)' : 'rgba(124, 58, 237, 0.15)',
              border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(124, 58, 237, 0.25)'}`,
            }}
          >
            <FileJson className="w-4 h-4" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
            <span className="text-xs font-mono" style={{ color: isLight ? '#7c3aed' : '#c4b5fd' }}>
              4 Public Repositories
            </span>
          </div>
          <div
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg"
            style={{
              background: isLight ? 'rgba(52, 211, 153, 0.1)' : 'rgba(52, 211, 153, 0.15)',
              border: `1px solid rgba(52, 211, 153, 0.25)`,
            }}
          >
            <CheckCircle2 className="w-4 h-4" style={{ color: '#34d399' }} />
            <span className="text-xs font-mono" style={{ color: '#34d399' }}>
              All Active
            </span>
          </div>
          <div
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg"
            style={{
              background: isLight ? 'rgba(251, 191, 36, 0.1)' : 'rgba(251, 191, 36, 0.15)',
              border: `1px solid rgba(251, 191, 36, 0.25)`,
            }}
          >
            <Star className="w-4 h-4" style={{ color: '#fbbf24' }} />
            <span className="text-xs font-mono" style={{ color: '#fbbf24' }}>
              950+ Total Stars
            </span>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <RepoCard
              key={project.name}
              project={project}
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
          className="mt-12"
        >
          <div
            className="rounded-xl p-6 backdrop-blur-xl"
            style={{
              background: isLight ? 'rgba(15, 15, 25, 0.95)' : 'rgba(10, 10, 15, 0.95)',
              border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.3)' : 'rgba(139, 92, 246, 0.4)'}`,
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                  boxShadow: '0 0 20px rgba(124, 58, 237, 0.5)',
                }}
              >
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3
                  className="text-sm font-bold mb-2"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: isLight ? '#f3f4f6' : '#ffffff',
                  }}
                >
                  Want to See More?
                </h3>
                <p
                  className="text-xs mb-4"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: isLight ? '#9ca3af' : '#d1d5db',
                  }}
                >
                  <span style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}>{'// '}</span>
                  Check out my GitHub for more projects and contributions.
                </p>
                <div className="flex items-center gap-3">
                  <motion.a
                    href="https://github.com/Hanzala-Shaikh1"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #24292f, #1a1f24)',
                      color: 'white',
                      boxShadow: '0 0 20px rgba(36, 41, 47, 0.5)',
                    }}
                  >
                    <Github className="w-3 h-3" />
                    @Hanzala-Shaikh1
                  </motion.a>
                  <motion.div
                    className="flex items-center gap-2 text-xs font-mono"
                    style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
                  >
                    <Code2 className="w-3 h-3" />
                    <span>Follow for updates</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
