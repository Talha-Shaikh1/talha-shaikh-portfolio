'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, MessageSquare, Github, Linkedin, Terminal, Sparkles, ChevronDown, Zap, Code2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

/* ═══════════════════════════════════════════════════════════════
   PREMIUM HERO SECTION - Awwwards Style
   ═══════════════════════════════════════════════════════════════ */

// Animated background with gradient orbs and particles
function PremiumBackground({ isLight }: { isLight: boolean }) {
  return (
    <>
      {/* Gradient mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw]"
          style={{
            background: `radial-gradient(circle, ${isLight ? 'rgba(124,58,237,0.12)' : 'rgba(124,58,237,0.15)'} 0%, transparent 60%)`,
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw]"
          style={{
            background: `radial-gradient(circle, ${isLight ? 'rgba(219,39,119,0.1)' : 'rgba(219,39,119,0.12)'} 0%, transparent 60%)`,
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, -50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[40%] left-[60%] w-[40vw] h-[40vw]"
          style={{
            background: `radial-gradient(circle, ${isLight ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.1)'} 0%, transparent 60%)`,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Animated grid */}
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

      {/* Floating particles */}
      <ParticleField isLight={isLight} />
    </>
  )
}

// Particle system with canvas
function ParticleField({ isLight }: { isLight: boolean }) {
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

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const color = isLight ? '124,58,237' : '139,92,246'

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${p.alpha})`
        ctx.fill()

        // Connect nearby particles
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(${color},${0.1 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
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
      className="absolute inset-0 -z-10"
      style={{ opacity: isLight ? 0.5 : 0.7 }}
    />
  )
}

// Typewriter effect for roles
function TypewriterText({ words }: { words: string[] }) {
  const [displayText, setDisplayText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    const typingSpeed = 80
    const deletingSpeed = 40
    const pauseTime = 2000

    let timeout: NodeJS.Timeout

    if (!isDeleting && charIndex <= currentWord.length) {
      timeout = setTimeout(() => {
        setCharIndex(charIndex + 1)
        setDisplayText(currentWord.slice(0, charIndex + 1))
      }, typingSpeed)
    } else if (!isDeleting && charIndex > currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime)
    } else if (isDeleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setCharIndex(charIndex - 1)
        setDisplayText(currentWord.slice(0, charIndex - 1))
      }, deletingSpeed)
    } else {
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % words.length)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, wordIndex, words])

  return (
    <span className="inline-block min-h-[1.5em]">
      {displayText}
      <motion.span
        className="inline-block w-[3px] h-[1.2em] ml-1 align-middle"
        style={{
          background: 'linear-gradient(180deg, #7c3aed, #db2777)',
        }}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </span>
  )
}

// 3D tilt card effect
function TiltCard({ children, isLight }: { children: React.ReactNode; isLight: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 400 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="relative"
    >
      {children}
    </motion.div>
  )
}

// Stats counter animation
function AnimatedCounter({ value, label, delay }: { value: string; label: string; delay: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <motion.p
        className="text-4xl md:text-5xl font-black mb-1"
        style={{
          fontFamily: "'Syne', sans-serif",
          background: 'linear-gradient(135deg, #a78bfa, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        initial={{ scale: 0.5 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.8, delay: delay + 0.2, type: 'spring', stiffness: 200 }}
      >
        {value}
      </motion.p>
      <p
        className="text-xs font-mono uppercase tracking-widest"
        style={{ color: 'rgba(156,163,175,0.8)' }}
      >
        {label}
      </p>
    </motion.div>
  )
}

export default function Hero() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isLight = mounted && theme === 'light'

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const roles = [
    'Full Stack Developer',
    'AI Engineer',
    'Next.js Expert',
    'E-commerce Builder',
  ]

  const stats = [
    { value: '6+', label: 'Projects' },
    { value: '5+', label: 'AI Integrations' },
    { value: '2+', label: 'Years Active' },
  ]

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Font imports */}
      <style dangerouslySetInnerHTML={{ __html: "@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');" }} />

      {/* Background */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 -z-10">
        <PremiumBackground isLight={isLight} />
      </motion.div>

      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-32"
      >
        <TiltCard isLight={isLight}>
          <div className="text-center">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
              style={{
                background: isLight 
                  ? 'rgba(124,58,237,0.08)' 
                  : 'rgba(124,58,237,0.12)',
                border: `1px solid ${isLight ? 'rgba(124,58,237,0.2)' : 'rgba(124,58,237,0.3)'}`,
                backdropFilter: 'blur(10px)',
              }}
            >
              <Terminal className="w-3.5 h-3.5" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
              <span
                className="text-xs font-mono"
                style={{ color: isLight ? '#7c3aed' : '#c4b5fd' }}
              >
                Available for opportunities
              </span>
              <motion.span
                className="w-2 h-2 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <span style={{ color: isLight ? '#0f0a1e' : '#ffffff' }}>Talha</span>
              <br className="md:hidden" />
              {' '}
              <span
                className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent"
                style={{
                  textShadow: isLight ? 'none' : '0 0 80px rgba(124,58,237,0.5)',
                }}
              >
                Shaikh
              </span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="h-12 flex items-center justify-center mb-8"
            >
              <span
                className="text-lg md:text-xl font-mono"
                style={{ color: isLight ? '#6b7280' : '#9ca3af' }}
              >
                <span style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}>{'>> '}</span>
                <TypewriterText words={roles} />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: isLight ? '#6b7280' : '#9ca3af',
              }}
            >
              I craft{' '}
              <span className="font-semibold" style={{ color: isLight ? '#7c3aed' : '#c4b5fd' }}>
                modern web applications
              </span>{' '}
              and{' '}
              <span className="font-semibold" style={{ color: isLight ? '#db2777' : '#f0abfc' }}>
                AI-powered solutions
              </span>{' '}
              with clean architecture, premium design, and performance at the core.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link href="#projects">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-semibold text-base overflow-hidden"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <span className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }} />
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, #6d28d9, #be185d)' }} />
                  <motion.span
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2), transparent)' }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                  <span className="relative">View My Work</span>
                  <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link href="#contact">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base backdrop-blur-sm transition-all duration-300"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: isLight ? 'rgba(124,58,237,0.08)' : 'rgba(124,58,237,0.1)',
                    border: `1px solid ${isLight ? 'rgba(124,58,237,0.2)' : 'rgba(124,58,237,0.3)'}`,
                    color: isLight ? '#7c3aed' : '#c4b5fd',
                  }}
                >
                  Contact Me
                  <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="flex items-center justify-center gap-12 md:gap-20 mb-16"
            >
              {stats.map((stat, i) => (
                <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} delay={i * 0.1} />
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex items-center justify-center gap-6"
            >
              {[
                { href: 'https://github.com/Talha-Shaikh1', icon: Github, label: 'GitHub' },
                { href: 'https://linkedin.com/in/muhammad-talha-938b75377', icon: Linkedin, label: 'LinkedIn' },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-sm font-mono transition-colors"
                  style={{ color: isLight ? '#9ca3af' : '#6b7280' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isLight ? 'rgba(124,58,237,0.08)' : 'rgba(124,58,237,0.1)',
                      border: `1px solid ${isLight ? 'rgba(124,58,237,0.2)' : 'rgba(124,58,237,0.25)'}`,
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
                  </div>
                  <span className="hidden sm:inline">{label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </TiltCard>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span
          className="text-[10px] font-mono tracking-[0.3em] uppercase"
          style={{ color: isLight ? '#d1d5db' : '#4b5563' }}
        >
          Scroll to explore
        </span>
        <motion.div
          className="w-[1px] h-16"
          style={{ background: 'linear-gradient(180deg, #7c3aed, transparent)' }}
          animate={{ scaleY: [0, 1, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5" style={{ color: isLight ? '#a78bfa' : '#6b7280' }} />
        </motion.div>
      </motion.div>

      {/* Side decorations */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4">
        {[
          { icon: Code2, label: 'Code' },
          { icon: Zap, label: 'Fast' },
          { icon: Sparkles, label: 'AI' },
        ].map(({ icon: Icon, label }) => (
          <motion.div
            key={label}
            whileHover={{ scale: 1.1, x: 5 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: isLight ? 'rgba(124,58,237,0.06)' : 'rgba(124,58,237,0.08)',
              border: `1px solid ${isLight ? 'rgba(124,58,237,0.15)' : 'rgba(124,58,237,0.2)'}`,
            }}
          >
            <Icon className="w-4 h-4" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
