'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import {
  Terminal,
  Code2,
  Cpu,
  Database,
  Globe,
  Zap,
  GitBranch,
  GitCommit,
  FolderOpen,
  FileCode,
  Layers,
  ChevronRight,
} from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════
   DEVELOPER MODE ABOUT - IDE/Code Editor Inspired
   ═══════════════════════════════════════════════════════════════ */

// File Explorer Component
function FileExplorer({ isLight }: { isLight: boolean }) {
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['src', 'components', 'lib'])

  type FileTree = {
    name: string
    icon: React.ElementType
    children?: FileTree[]
  }

  const files: FileTree[] = [
    {
      name: 'src',
      icon: FolderOpen,
      children: [
        { name: 'app', icon: FolderOpen, children: [
          { name: 'page.tsx', icon: FileCode },
          { name: 'layout.tsx', icon: FileCode },
        ]},
        { name: 'components', icon: FolderOpen, children: [
          { name: 'Hero.tsx', icon: FileCode },
          { name: 'About.tsx', icon: FileCode },
          { name: 'Projects.tsx', icon: FileCode },
        ]},
        { name: 'lib', icon: FolderOpen, children: [
          { name: 'utils.ts', icon: FileCode },
          { name: 'api.ts', icon: FileCode },
        ]},
      ],
    },
  ]

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev =>
      prev.includes(folderName)
        ? prev.filter(f => f !== folderName)
        : [...prev, folderName]
    )
  }

  const renderTree = (items: FileTree[], depth = 0) => {
    return items.map((item) => (
      <div key={item.name}>
        <motion.div
          className={`flex items-center gap-2 py-1.5 px-2 rounded-md cursor-pointer transition-colors ${
            isLight ? 'hover:bg-violet-100' : 'hover:bg-violet-900/20'
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => item.children && toggleFolder(item.name)}
          whileHover={{ x: 2 }}
        >
          {item.children && (
            <ChevronRight
              className={`w-3 h-3 transition-transform ${
                expandedFolders.includes(item.name) ? 'rotate-90' : ''
              }`}
              style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
            />
          )}
          <item.icon className="w-4 h-4" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
          <span
            className="text-xs font-mono"
            style={{ color: isLight ? '#4b5563' : '#d1d5db' }}
          >
            {item.name}
          </span>
        </motion.div>
        {item.children && expandedFolders.includes(item.name) && (
          <div>{renderTree(item.children, depth + 1)}</div>
        )}
      </div>
    ))
  }

  return (
    <div
      className="rounded-xl overflow-hidden backdrop-blur-xl"
      style={{
        background: isLight ? 'rgba(249, 250, 251, 0.9)' : 'rgba(15, 15, 25, 0.9)',
        border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(139, 92, 246, 0.3)'}`,
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{
          background: isLight ? 'rgba(243, 244, 246, 0.8)' : 'rgba(30, 30, 46, 0.8)',
          borderBottom: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.15)' : 'rgba(139, 92, 246, 0.2)'}`,
        }}
      >
        <div className="flex items-center gap-2">
          <FolderOpen className="w-4 h-4" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
          <span className="text-xs font-mono" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>
            EXPLORER
          </span>
        </div>
        <span className="text-[10px] font-mono" style={{ color: isLight ? '#9ca3af' : '#6b7280' }}>
          PORTFOLIO
        </span>
      </div>

      {/* File tree */}
      <div className="p-2">{renderTree(files)}</div>
    </div>
  )
}

// Terminal Window Component
function TerminalWindow({ isLight }: { isLight: boolean }) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [showingOutput, setShowingOutput] = useState(false)
  const [outputCharIndex, setOutputCharIndex] = useState(0)

  useEffect(() => {
    const commands = [
      { cmd: '$ whoami', output: 'Talha Shaikh - Full Stack Developer' },
      { cmd: '$ cat skills.json', output: '["Next.js", "TypeScript", "Python", "AI Agents", "PostgreSQL"]' },
      { cmd: '$ npm run build', output: '✓ Build completed successfully in 2.4s' },
      { cmd: '$ git status', output: 'On branch main - Your branch is up to date.' },
    ]

    const timeout = setTimeout(() => {
      const currentCmd = commands[currentCommandIndex]

      if (!showingOutput) {
        // Typing the command
        if (currentCharIndex < currentCmd.cmd.length) {
          setDisplayedLines(prev => {
            const newLines = [...prev]
            if (newLines.length === 0 || newLines[newLines.length - 1].startsWith('$')) {
              newLines.push(currentCmd.cmd.slice(0, currentCharIndex + 1))
            } else {
              newLines[newLines.length - 1] = currentCmd.cmd.slice(0, currentCharIndex + 1)
            }
            return newLines
          })
          setCurrentCharIndex(prev => prev + 1)
        } else {
          // Command complete, show output next
          setShowingOutput(true)
        }
      } else {
        // Showing output
        if (outputCharIndex < currentCmd.output.length) {
          setDisplayedLines(prev => [...prev, currentCmd.output.slice(0, outputCharIndex + 1)])
          setOutputCharIndex(prev => prev + 1)
        } else {
          // Output complete, move to next command
          setTimeout(() => {
            setCurrentCommandIndex(prev => (prev + 1) % commands.length)
            setCurrentCharIndex(0)
            setShowingOutput(false)
            setOutputCharIndex(0)
            setDisplayedLines(prev => [...prev, ''])
          }, 800)
        }
      }
    }, showingOutput ? 30 : 80)

    return () => clearTimeout(timeout)
  }, [currentCommandIndex, currentCharIndex, outputCharIndex, showingOutput])

  return (
    <div
      className="rounded-xl overflow-hidden backdrop-blur-xl font-mono text-xs"
      style={{
        background: isLight ? 'rgba(15, 15, 25, 0.95)' : 'rgba(10, 10, 15, 0.95)',
        border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.3)' : 'rgba(139, 92, 246, 0.4)'}`,
      }}
    >
      {/* Terminal header */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{
          background: isLight ? 'rgba(30, 30, 46, 0.9)' : 'rgba(20, 20, 30, 0.9)',
          borderBottom: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(139, 92, 246, 0.25)'}`,
        }}
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4" style={{ color: '#34d399' }} />
          <span className="text-xs" style={{ color: '#9ca3af' }}>
            bash — 80x24
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>

      {/* Terminal content */}
      <div className="p-4 h-[200px] overflow-hidden">
        {displayedLines.slice(-6).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-1.5 whitespace-pre-wrap"
          >
            <span
              style={{
                color: line.startsWith('$') ? '#34d399' : '#9ca3af',
              }}
            >
              {line}
            </span>
          </motion.div>
        ))}
        <motion.span
          className="inline-block w-2 h-4 bg-emerald-400 align-middle ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({
  icon: Icon,
  label,
  value,
  color,
  isLight,
  delay,
  inView,
}: {
  icon: React.ElementType
  label: string
  value: string
  color: string
  isLight: boolean
  delay: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05, y: -3 }}
      className="relative p-5 rounded-xl overflow-hidden"
      style={{
        background: isLight
          ? `rgba(${color}, 0.08)`
          : `rgba(${color}, 0.12)`,
        border: `1px solid rgba(${color}, ${isLight ? 0.2 : 0.3})`,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <Icon className="w-6 h-6" style={{ color: `rgb(${color})` }} />
        <GitCommit className="w-4 h-4" style={{ color: `rgba(${color}, 0.5)` }} />
      </div>
      <motion.p
        className="text-3xl font-black mb-1"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: `rgb(${color})`,
        }}
        initial={{ scale: 0.5 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: delay + 0.2, type: 'spring', stiffness: 300 }}
      >
        {value}
      </motion.p>
      <p
        className="text-xs font-mono uppercase tracking-wider"
        style={{ color: isLight ? '#6b7280' : '#9ca3af' }}
      >
        {label}
      </p>
    </motion.div>
  )
}

// Skill Bar Component
function SkillBar({
  name,
  level,
  color,
  isLight,
  index,
  inView,
}: {
  name: string
  level: number
  color: string
  isLight: boolean
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-4"
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-sm font-mono"
          style={{ color: isLight ? '#4b5563' : '#d1d5db' }}
        >
          {name}
        </span>
        <span
          className="text-xs font-mono"
          style={{ color: `rgb(${color})` }}
        >
          {level}%
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{
          background: isLight ? 'rgba(124, 58, 237, 0.1)' : 'rgba(139, 92, 246, 0.15)',
        }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, rgb(${color}), rgba(${color}, 0.7))`,
            boxShadow: `0 0 10px rgba(${color}, 0.5)`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

export default function About() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])
  const isLight = mounted && theme === 'light'

  const sectionRef = useRef<HTMLElement>(null)
  const [headingRef, headingInView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  const stats = [
    { icon: Code2, label: 'Projects', value: '6+', color: '139, 92, 246' },
    { icon: Cpu, label: 'AI Agents', value: '5+', color: '236, 72, 153' },
    { icon: Database, label: 'Databases', value: '4', color: '59, 130, 246' },
    { icon: Globe, label: 'Technologies', value: '12+', color: '167, 139, 250' },
  ]

  const skills = [
    { name: 'Next.js / React', level: 92, color: '96, 165, 250' },
    { name: 'TypeScript / JavaScript', level: 90, color: '234, 179, 8' },
    { name: 'Python / FastAPI', level: 88, color: '139, 92, 246' },
    { name: 'AI Agents (OpenAI SDK)', level: 85, color: '236, 72, 153' },
    { name: 'PostgreSQL / Prisma', level: 82, color: '59, 130, 246' },
    { name: 'TailwindCSS', level: 95, color: '56, 189, 248' },
  ]

  return (
    <section
      id="about"
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

      {/* Animated background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
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

        {/* Floating code snippets */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xs font-mono"
            style={{
              color: isLight ? 'rgba(124, 58, 237, 0.1)' : 'rgba(139, 92, 246, 0.15)',
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [0, -100, -200],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 1.5,
            }}
          >
            {['const', 'function', 'import', 'export', 'async', 'await'][i]}
          </motion.div>
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <GitBranch className="w-4 h-4" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
            <span
              className="text-xs font-mono tracking-[0.3em] uppercase"
              style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
            >
              git log --about
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Terminal className="w-8 h-8" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter leading-none"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: isLight ? '#0f0a1e' : '#ffffff',
              }}
            >
              ABOUT{' '}
              <span
                className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent"
                style={{
                  textShadow: isLight ? 'none' : '0 0 80px rgba(124,58,237,0.5)',
                }}
              >
                ME
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Main grid */}
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Terminal Window */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <TerminalWindow isLight={isLight} />
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, i) => (
                <StatCard
                  key={stat.label}
                  icon={stat.icon}
                  label={stat.label}
                  value={stat.value}
                  color={stat.color}
                  isLight={isLight}
                  delay={i * 0.1}
                  inView={contentInView}
                />
              ))}
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* File Explorer */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <FileExplorer isLight={isLight} />
            </motion.div>

            {/* Skills Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-xl p-6 backdrop-blur-xl"
              style={{
                background: isLight
                  ? 'rgba(249, 250, 251, 0.9)'
                  : 'rgba(15, 15, 25, 0.9)',
                border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(139, 92, 246, 0.3)'}`,
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Layers className="w-5 h-5" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
                <h3
                  className="text-sm font-mono uppercase tracking-widest"
                  style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
                >
                  Tech Stack Proficiency
                </h3>
              </div>

              <div className="space-y-2">
                {skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={skill.color}
                    isLight={isLight}
                    index={i}
                    inView={contentInView}
                  />
                ))}
              </div>
            </motion.div>

            {/* Bio Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="rounded-xl p-6 backdrop-blur-xl"
              style={{
                background: isLight
                  ? 'rgba(255, 255, 255, 0.7)'
                  : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(139, 92, 246, 0.3)'}`,
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4" style={{ color: '#34d399' }} />
                <span
                  className="text-xs font-mono uppercase tracking-widest"
                  style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
                >
                  Status: Available
                </span>
              </div>
              <p
                className="text-sm leading-relaxed font-mono mb-4"
                style={{ color: isLight ? '#4b5563' : '#d1d5db' }}
              >
                <span style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}>{'// '}</span>
                Full Stack Developer specializing in modern web applications and AI-powered solutions.
              </p>
              <p
                className="text-sm leading-relaxed font-mono mb-4"
                style={{ color: isLight ? '#6b7280' : '#9ca3af' }}
              >
                <span style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}>{'// '}</span>
                Building with Next.js, TypeScript, Python & OpenAI SDK.
              </p>
              <p
                className="text-sm leading-relaxed font-mono"
                style={{ color: isLight ? '#6b7280' : '#9ca3af' }}
              >
                <span style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}>{'// '}</span>
                Location: <span style={{ color: isLight ? '#db2777' : '#f0abfc' }}>Pakistan</span> | Open to remote opportunities
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
