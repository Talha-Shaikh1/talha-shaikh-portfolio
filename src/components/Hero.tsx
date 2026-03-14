'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState, useRef } from 'react'
import {
  Terminal,
  Code2,
  Github,
  Linkedin,
  Mail,
  Cpu,
  Globe,
  Database,
  ChevronDown,
  Play,
  Maximize2,
  X,
  FolderOpen,
  FileCode,
  GitBranch,
  Zap,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

/* ═══════════════════════════════════════════════════════════════
   DEVELOPER MODE HERO - IDE/Terminal Inspired
   ═══════════════════════════════════════════════════════════════ */

// Animated matrix-style background
function CodeRain({ isLight }: { isLight: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animationId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    const charArray = chars.split('')
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = Array(Math.ceil(columns)).fill(1)

    const draw = () => {
      ctx.fillStyle = isLight ? 'rgba(250, 250, 252, 0.05)' : 'rgba(10, 10, 15, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = isLight ? 'rgba(124, 58, 237, 0.5)' : 'rgba(139, 92, 246, 0.5)'
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`

      drops.forEach((y, i) => {
        const char = charArray[Math.floor(Math.random() * charArray.length)]
        const x = i * fontSize
        ctx.fillText(char, x, y * fontSize)

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      })

      animationId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [isLight])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-30"
      style={{ filter: isLight ? 'none' : 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))' }}
    />
  )
}

// IDE Window Component
function IDEWindow({ children, title, icon: Icon, isLight }: { 
  children: React.ReactNode
  title: string
  icon: React.ElementType
  isLight: boolean
}) {
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: isMinimized ? 0 : 1, 
        scale: isMinimized ? 0.9 : isMaximized ? 1 : 0.95,
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`
        relative rounded-xl overflow-hidden backdrop-blur-xl
        ${isMaximized ? 'fixed inset-4 z-50' : 'relative'}
      `}
      style={{
        background: isLight 
          ? 'rgba(250, 250, 252, 0.85)' 
          : 'rgba(15, 15, 25, 0.85)',
        border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(139, 92, 246, 0.3)'}`,
        boxShadow: isLight
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.1)'
          : '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(139, 92, 246, 0.1)',
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          background: isLight 
            ? 'rgba(243, 244, 246, 0.8)' 
            : 'rgba(30, 30, 46, 0.8)',
          borderBottom: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.15)' : 'rgba(139, 92, 246, 0.2)'}`,
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
            >
              <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100" />
            </button>
            <button 
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
            />
            <button 
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
            <span 
              className="text-xs font-mono"
              style={{ color: isLight ? '#6b7280' : '#9ca3af' }}
            >
              {title}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4" style={{ color: isLight ? '#9ca3af' : '#6b7280' }} />
          <span 
            className="text-xs font-mono"
            style={{ color: isLight ? '#9ca3af' : '#6b7280' }}
          >
            main
          </span>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <div className="p-6">
          {children}
        </div>
      )}
    </motion.div>
  )
}

// Typewriter effect for code
function TypewriterCode({ lines }: { lines: string[] }) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentLine < lines.length) {
        if (currentChar < lines[currentLine].length) {
          const newLines = [...displayedLines]
          newLines[currentLine] = lines[currentLine].slice(0, currentChar + 1)
          setDisplayedLines(newLines)
          setCurrentChar(currentChar + 1)
        } else {
          setCurrentLine(currentLine + 1)
          setCurrentChar(0)
        }
      }
    }, currentChar === 0 ? 300 : 50)

    return () => clearTimeout(timeout)
  }, [currentLine, currentChar, lines, displayedLines])

  return (
    <div className="font-mono text-sm leading-relaxed">
      {displayedLines.map((line, i) => (
        <div key={i} className="flex">
          <span 
            className="select-none mr-4"
            style={{ color: isLight ? '#9ca3af' : '#6b7280' }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <pre dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }} />
        </div>
      ))}
      {currentLine < lines.length && (
        <motion.span
          className="inline-block w-2 h-4 ml-1 align-middle"
          style={{ background: '#7c3aed' }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </div>
  )
}

// Tech stack badge
function TechBadge({ icon: Icon, name, color, isLight }: { 
  icon: React.ElementType
  name: string
  color: string
  isLight: boolean
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="flex items-center gap-3 px-4 py-3 rounded-lg backdrop-blur-sm"
      style={{
        background: isLight 
          ? `rgba(${color}, 0.08)` 
          : `rgba(${color}, 0.12)`,
        border: `1px solid rgba(${color}, ${isLight ? 0.2 : 0.3})`,
      }}
    >
      <Icon className="w-5 h-5" style={{ color: `rgb(${color})` }} />
      <span 
        className="text-sm font-mono font-medium"
        style={{ color: isLight ? '#4b5563' : '#d1d5db' }}
      >
        {name}
      </span>
    </motion.div>
  )
}

// Social link button
function SocialButton({ 
  href, 
  icon: Icon, 
  label, 
  isLight 
}: { 
  href: string
  icon: React.ElementType
  label: string
  isLight: boolean
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="group flex items-center gap-3 px-5 py-3 rounded-lg transition-all duration-300"
      style={{
        background: isLight 
          ? 'rgba(124, 58, 237, 0.08)' 
          : 'rgba(124, 58, 237, 0.12)',
        border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(124, 58, 237, 0.3)'}`,
      }}
    >
      <Icon 
        className="w-5 h-5 group-hover:scale-110 transition-transform"
        style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
      />
      <span 
        className="text-sm font-mono font-medium"
        style={{ color: isLight ? '#4b5563' : '#d1d5db' }}
      >
        {label}
      </span>
    </motion.a>
  )
}

const isLight = false

export default function Hero() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])
  const activeIsLight = mounted && theme === 'light'

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ['start start', 'end start'] 
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, 80])

  const codeLines = [
    '<span style="color: #c084fc">const</span> <span style="color: #7dd3fc">developer</span> = {',
    '&nbsp;&nbsp;name: <span style="color: #86efac">"Talha Shaikh"</span>,',
    '&nbsp;&nbsp;role: <span style="color: #86efac">"Full Stack Developer"</span>,',
    '&nbsp;&nbsp;skills: [<span style="color: #86efac">"Next.js"</span>, <span style="color: #86efac">"AI"</span>, <span style="color: #86efac">"TypeScript"</span>],',
    '&nbsp;&nbsp;available: <span style="color: #f472b6">true</span>',
    '};',
    '&nbsp;',
    '<span style="color: #c084fc">await</span> <span style="color: #7dd3fc">developer</span>.<span style="color: #fbbf24">buildAwesome</span>();',
  ]

  const techStack = [
    { icon: Code2, name: 'Next.js 16', color: '255, 255, 255' },
    { icon: Database, name: 'PostgreSQL', color: '59, 130, 246' },
    { icon: Cpu, name: 'AI Agents', color: '139, 92, 246' },
    { icon: Globe, name: 'React', color: '96, 165, 250' },
    { icon: Zap, name: 'TypeScript', color: '59, 130, 246' },
    { icon: Sparkles, name: 'Python', color: '234, 179, 8' },
  ]

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        background: activeIsLight ? '#fafafc' : '#0a0a0f',
      }}
    >
      {/* Font imports */}
      <style dangerouslySetInnerHTML={{ 
        __html: "@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap');" 
      }} />

      {/* Animated background */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        <CodeRain isLight={activeIsLight} />
      </motion.div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(${activeIsLight ? 'rgba(124,58,237,0.1)' : 'rgba(139,92,246,0.08)'} 1px, transparent 1px),
            linear-gradient(90deg, ${activeIsLight ? 'rgba(124,58,237,0.1)' : 'rgba(139,92,246,0.08)'} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-20"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: IDE Window with code */}
          <IDEWindow 
            title="developer.tsx" 
            icon={FileCode}
            isLight={activeIsLight}
          >
            <div className="mb-6">
              <TypewriterCode lines={codeLines} />
            </div>

            <div className="flex items-center gap-3 pt-4 border-t" style={{ 
              borderColor: activeIsLight ? 'rgba(124, 58, 237, 0.15)' : 'rgba(139, 92, 246, 0.2)' 
            }}>
              <button 
                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-mono transition-all"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                  color: 'white',
                }}
              >
                <Play className="w-4 h-4" />
                Run Code
              </button>
              <button 
                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-mono transition-all"
                style={{
                  background: activeIsLight 
                    ? 'rgba(124, 58, 237, 0.08)' 
                    : 'rgba(124, 58, 237, 0.12)',
                  color: activeIsLight ? '#7c3aed' : '#a78bfa',
                  border: `1px solid ${activeIsLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(124, 58, 237, 0.3)'}`,
                }}
              >
                <FolderOpen className="w-4 h-4" />
                Open File
              </button>
            </div>
          </IDEWindow>

          {/* Right: Content */}
          <div className="space-y-6">
            {/* Terminal badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
              style={{
                background: activeIsLight 
                  ? 'rgba(124, 58, 237, 0.1)' 
                  : 'rgba(124, 58, 237, 0.15)',
                border: `1px solid ${activeIsLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(124, 58, 237, 0.3)'}`,
              }}
            >
              <Terminal className="w-4 h-4" style={{ color: activeIsLight ? '#7c3aed' : '#a78bfa' }} />
              <span 
                className="text-xs font-mono"
                style={{ color: activeIsLight ? '#7c3aed' : '#c4b5fd' }}
              >
                ~/portfolio $ whoami
              </span>
              <motion.span
                className="w-2 h-4 rounded-sm bg-emerald-400"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none"
              style={{ 
                fontFamily: "'JetBrains Mono', monospace",
                color: activeIsLight ? '#0f0a1e' : '#ffffff',
              }}
            >
              <span>TALHA</span>
              <br />
              <span 
                className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent"
                style={{
                  textShadow: activeIsLight ? 'none' : '0 0 80px rgba(124,58,237,0.5)',
                }}
              >
                SHAIKH
              </span>
            </motion.h1>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl font-mono"
              style={{ color: activeIsLight ? '#6b7280' : '#9ca3af' }}
            >
              <span style={{ color: activeIsLight ? '#7c3aed' : '#a78bfa' }}>{'>'} </span>
              Full Stack Developer <span style={{ color: activeIsLight ? '#9ca3af' : '#6b7280' }}>&</span>{' '}
              <span style={{ color: activeIsLight ? '#db2777' : '#f0abfc' }}>AI Engineer</span>
            </motion.p>

            {/* Description */}
            {/* <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base leading-relaxed max-w-xl"
              style={{ 
                fontFamily: "'JetBrains Mono', monospace",
                color: activeIsLight ? '#6b7280' : '#9ca3af',
              }}
            >
              Building <span style={{ color: activeIsLight ? '#7c3aed' : '#c4b5fd' }}>scalable web apps</span> and{' '}
              <span style={{ color: activeIsLight ? '#db2777' : '#f0abfc' }}>AI-powered solutions</span> with{' '}
              clean code, modern architecture, and developer-first mindset.
            </motion.p> */}

            {/* Tech stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              {techStack.map((tech) => (
                <TechBadge 
                  key={tech.name}
                  icon={tech.icon}
                  name={tech.name}
                  color={tech.color}
                  isLight={activeIsLight}
                />
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="#projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center gap-3 px-6 py-3 rounded-lg font-mono text-sm font-semibold transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                    color: 'white',
                    boxShadow: '0 4px 20px rgba(124, 58, 237, 0.4)',
                  }}
                >
                  <Maximize2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  View Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link href="#contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center gap-3 px-6 py-3 rounded-lg font-mono text-sm font-semibold transition-all"
                  style={{
                    background: activeIsLight 
                      ? 'rgba(124, 58, 237, 0.08)' 
                      : 'rgba(124, 58, 237, 0.12)',
                    color: activeIsLight ? '#7c3aed' : '#a78bfa',
                    border: `1px solid ${activeIsLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(124, 58, 237, 0.3)'}`,
                  }}
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Contact Me
                </motion.button>
              </Link>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex gap-3"
            >
              <SocialButton
                href="https://github.com/Talha-Shaikh1"
                icon={Github}
                label="GitHub"
                isLight={activeIsLight}
              />
              <SocialButton
                href="https://linkedin.com/in/muhammad-talha-938b75377"
                icon={Linkedin}
                label="LinkedIn"
                isLight={activeIsLight}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span
          className="text-[10px] font-mono tracking-widest uppercase"
          style={{ color: activeIsLight ? '#9ca3af' : '#6b7280' }}
        >
          Scroll to explore
        </span>
        <motion.div
          className="w-[1px] h-16"
          style={{ background: 'linear-gradient(180deg, #7c3aed, transparent)' }}
          animate={{ scaleY: [0, 1, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5" style={{ color: activeIsLight ? '#a78bfa' : '#6b7280' }} />
        </motion.div>
      </motion.div>

      {/* Floating status bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 right-6 px-4 py-2 rounded-lg backdrop-blur-sm"
        style={{
          background: activeIsLight 
            ? 'rgba(250, 250, 252, 0.9)' 
            : 'rgba(15, 15, 25, 0.9)',
          border: `1px solid ${activeIsLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(139, 92, 246, 0.3)'}`,
        }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <motion.span
              className="w-2 h-2 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span 
              className="text-xs font-mono"
              style={{ color: activeIsLight ? '#6b7280' : '#9ca3af' }}
            >
              Available for work
            </span>
          </div>
          <div 
            className="w-px h-4"
            style={{ background: activeIsLight ? 'rgba(124, 58, 237, 0.3)' : 'rgba(139, 92, 246, 0.3)' }}
          />
          <span 
            className="text-xs font-mono"
            style={{ color: activeIsLight ? '#7c3aed' : '#a78bfa' }}
          >
            UTC{new Date().getTimezoneOffset() / -60 > 0 ? '+' : ''}{Math.abs(new Date().getTimezoneOffset() / -60)}:00
          </span>
        </div>
      </motion.div>
    </section>
  )
}
