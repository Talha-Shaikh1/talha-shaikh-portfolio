'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, MessageSquare, Github, Linkedin, Terminal } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

/* ─── Glitch CSS (no styled-jsx) ───────────────────────────────── */
const GLITCH_CSS = `
  .glitch-wrap { position: relative; display: inline-block; }
  .glitch-wrap::before, .glitch-wrap::after {
    content: attr(data-text);
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100%;
  }
  .glitch-wrap::before {
    animation: gh1 4s infinite;
    clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
    background: linear-gradient(to right, #a855f7, #ec4899);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; opacity: 0;
  }
  .glitch-wrap::after {
    animation: gh2 4s infinite;
    clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
    background: linear-gradient(to right, #ec4899, #a855f7);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; opacity: 0;
  }
  @keyframes gh1 {
    0%,90%,100%{opacity:0;transform:translateX(0)}
    92%{opacity:.8;transform:translateX(-3px)}
    94%{opacity:0;transform:translateX(0)}
    96%{opacity:.6;transform:translateX(-2px)}
    98%{opacity:0}
  }
  @keyframes gh2 {
    0%,90%,100%{opacity:0;transform:translateX(0)}
    93%{opacity:.8;transform:translateX(3px)}
    95%{opacity:0;transform:translateX(0)}
    97%{opacity:.6;transform:translateX(2px)}
    99%{opacity:0}
  }
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
`

/* ─── Typewriter Hook ───────────────────────────────────────────── */
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    let t: ReturnType<typeof setTimeout>
    if (!deleting && charIdx <= current.length) {
      t = setTimeout(() => setCharIdx(c => c + 1), speed)
      setDisplay(current.slice(0, charIdx))
    } else if (!deleting && charIdx > current.length) {
      t = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx >= 0) {
      t = setTimeout(() => setCharIdx(c => c - 1), speed / 2)
      setDisplay(current.slice(0, charIdx))
    } else {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length)
    }
    return () => clearTimeout(t)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return display
}

/* ─── Particle Canvas ───────────────────────────────────────────── */
function ParticleField({ light }: { light: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.4 + 0.1,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const color = light ? '109,40,217' : '139,92,246'
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${p.alpha})`; ctx.fill()
      })
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${color},${0.07 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [light])

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10" style={{ opacity: light ? 0.4 : 0.6 }} />
}

/* ─── Hero ──────────────────────────────────────────────────────── */
export default function Hero() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isLight = mounted && theme === 'light'

  const roles = useTypewriter([
    'Junior Full Stack Developer',
    'Next.js & Sanity Developer',
    'E-commerce Store Builder',
    'AI Chatbot Integrator',
  ])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const cardX = useTransform(mouseX, [-300, 300], [-8, 8])
  const cardY = useTransform(mouseY, [-300, 300], [-8, 8])

  const handleMouse = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const stats = [
    { label: 'Projects Completed', value: '12+' },
    { label: 'E-commerce Stores', value: '6+' },
    { label: 'Chatbot Integrations', value: '5+' },
  ]

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500"
      style={{ background: isLight ? '#f8f7ff' : '#050508' }}
      onMouseMove={handleMouse}
    >
      <style dangerouslySetInnerHTML={{ __html: GLITCH_CSS }} />

      {mounted && <ParticleField light={isLight} />}

      {/* Grid */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(${isLight ? 'rgba(109,40,217,0.05)' : 'rgba(139,92,246,0.04)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isLight ? 'rgba(109,40,217,0.05)' : 'rgba(139,92,246,0.04)'} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Blobs */}
      <motion.div
        className="absolute top-[-200px] left-[-200px] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: isLight ? 'radial-gradient(circle, rgba(109,40,217,0.1) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: isLight ? 'radial-gradient(circle, rgba(219,39,119,0.08) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ rotateX: cardY, rotateY: cardX } as any}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono mb-8 backdrop-blur-sm"
          style={{
            border: isLight ? '1px solid rgba(109,40,217,0.25)' : '1px solid rgba(139,92,246,0.3)',
            background: isLight ? 'rgba(109,40,217,0.08)' : 'rgba(139,92,246,0.1)',
            color: isLight ? '#6d28d9' : '#c4b5fd',
          }}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Available for freelance & full-time</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-4 leading-none"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <span style={{ color: isLight ? '#0f0a1e' : '#ffffff' }}>Talha </span>
          <span
            className="glitch-wrap bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent"
            data-text="Shaikh"
          >
            Shaikh
          </span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="h-10 flex items-center justify-center mb-6"
        >
          <span className="text-xl md:text-2xl font-mono" style={{ color: isLight ? '#7c3aed' : '#c4b5fd' }}>
            {'> '}
            <span style={{ color: isLight ? '#be185d' : '#f0abfc' }}>{roles}</span>
            <span
              className="inline-block w-0.5 h-6 ml-0.5 animate-pulse align-middle"
              style={{ background: isLight ? '#be185d' : '#e879f9' }}
            />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif", color: isLight ? '#6b7280' : '#9ca3af' }}
        >
          I build modern e-commerce stores, admin dashboards, and AI-powered chatbot integrations
          using Next.js and Sanity — focused on clean code, fast performance, and solutions that{' '}
          <em className="not-italic font-semibold" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}>
            actually work
          </em>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link href="#projects">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-base overflow-hidden"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="absolute inset-0" style={{ background: 'linear-gradient(to right, #7c3aed, #db2777)' }} />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to right, #6d28d9, #be185d)' }} />
              <span className="relative">View Projects</span>
              <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
          </Link>

          <Link href="#contact">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base backdrop-blur-sm transition-all duration-300"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                border: isLight ? '1px solid rgba(124,58,237,0.35)' : '1px solid rgba(139,92,246,0.4)',
                color: isLight ? '#7c3aed' : '#ddd6fe',
                background: isLight ? 'rgba(124,58,237,0.06)' : 'rgba(139,92,246,0.05)',
              }}
            >
              Contact Me
              <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="flex items-center justify-center gap-8 md:gap-16"
        >
          {stats.map((s, i) => (
            <div key={s.label} className="text-center">
              <motion.p
                className="text-3xl md:text-4xl font-black bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent"
                style={{ fontFamily: "'Syne', sans-serif" }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.1, type: 'spring', stiffness: 200 }}
              >
                {s.value}
              </motion.p>
              <p className="text-xs mt-1 font-mono uppercase tracking-widest" style={{ color: isLight ? '#9ca3af' : '#6b7280' }}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex items-center justify-center gap-5 mt-10"
        >
          {[
            { href: 'https://github.com', icon: Github, label: 'GitHub' },
            { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
          ].map(({ href, icon: Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm font-mono transition-colors duration-200"
              style={{ color: isLight ? '#9ca3af' : '#6b7280' }}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden sm:inline">{label}</span>
            </motion.a>
          ))}
          <div className="w-px h-5" style={{ background: isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.1)' }} />
          <span className="text-xs font-mono" style={{ color: isLight ? '#c4b5fd' : '#4b5563' }}>talha.dev</span>
        </motion.div>
      </motion.div>

      {/* Scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: isLight ? '#d1d5db' : '#374151' }}>
          Scroll
        </span>
        <motion.div
          className="w-px h-12"
          style={{ background: 'linear-gradient(to bottom, rgba(139,92,246,0.6), transparent)' }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}