'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Code2, Brain, Rocket, Users, Sparkles, ArrowUpRight } from 'lucide-react'

const highlights = [
  {
    icon: Code2,
    title: 'Practical Experience',
    description: 'Building production-ready applications with modern tech stack',
    accent: 'from-violet-500 to-indigo-500',
    darkBg: 'rgba(139,92,246,0.06)',
    darkBorder: 'rgba(139,92,246,0.2)',
    lightBg: 'rgba(139,92,246,0.04)',
    lightBorder: 'rgba(139,92,246,0.25)',
    gradFrom: '#8b5cf6',
    gradTo: '#6366f1',
  },
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Specialized in OpenAI Agents SDK and intelligent chatbot systems',
    accent: 'from-fuchsia-500 to-pink-500',
    darkBg: 'rgba(217,70,239,0.06)',
    darkBorder: 'rgba(217,70,239,0.2)',
    lightBg: 'rgba(217,70,239,0.04)',
    lightBorder: 'rgba(217,70,239,0.25)',
    gradFrom: '#d946ef',
    gradTo: '#ec4899',
  },
  {
    icon: Rocket,
    title: 'Continuous Growth',
    description: 'Deepening backend architecture and scalable systems knowledge',
    accent: 'from-pink-500 to-rose-500',
    darkBg: 'rgba(236,72,153,0.06)',
    darkBorder: 'rgba(236,72,153,0.2)',
    lightBg: 'rgba(236,72,153,0.04)',
    lightBorder: 'rgba(236,72,153,0.25)',
    gradFrom: '#ec4899',
    gradTo: '#f43f5e',
  },
  {
    icon: Users,
    title: 'Problem Solver',
    description: 'Approaching challenges with innovative and practical solutions',
    accent: 'from-indigo-500 to-violet-500',
    darkBg: 'rgba(99,102,241,0.06)',
    darkBorder: 'rgba(99,102,241,0.2)',
    lightBg: 'rgba(99,102,241,0.04)',
    lightBorder: 'rgba(99,102,241,0.25)',
    gradFrom: '#6366f1',
    gradTo: '#8b5cf6',
  },
]

const skills = [
  'Next.js', 'TypeScript', 'Python', 'OpenAI SDK',
  'Node.js', 'PostgreSQL', 'Prisma', 'TailwindCSS',
  'FastAPI', 'Docker', 'Redis', 'LangChain',
]

function SkillPill({ skill, delay, isLight }: { skill: string; delay: number; isLight: boolean }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay, type: 'spring', stiffness: 180 }}
      whileHover={{ scale: 1.08, y: -2 }}
      className="px-3 py-1.5 rounded-full text-xs font-mono cursor-default transition-colors duration-300"
      style={{
        background: isLight ? 'rgba(109,40,217,0.07)' : 'rgba(139,92,246,0.08)',
        border: `1px solid ${isLight ? 'rgba(109,40,217,0.2)' : 'rgba(139,92,246,0.25)'}`,
        color: isLight ? '#6d28d9' : '#c4b5fd',
      }}
    >
      {skill}
    </motion.span>
  )
}

export default function About() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isLight = mounted && theme === 'light'

  const sectionRef = useRef<HTMLElement>(null)
  const [headingRef, headingInView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [textRef, textInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [cardsRef, cardsInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden transition-colors duration-500"
      style={{ background: isLight ? '#f8f7ff' : '#050508' }}
    >
      {/* Font import */}
      <style dangerouslySetInnerHTML={{ __html: "@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');" }} />

      {/* Background decorations */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${isLight ? 'rgba(109,40,217,0.25)' : 'rgba(139,92,246,0.3)'}, transparent)` }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${isLight ? 'rgba(219,39,119,0.15)' : 'rgba(236,72,153,0.2)'}, transparent)` }}
        />
        <div
          className="absolute -top-40 right-[-200px] w-[500px] h-[500px] rounded-full"
          style={{ background: `radial-gradient(circle, ${isLight ? 'rgba(109,40,217,0.06)' : 'rgba(139,92,246,0.08)'} 0%, transparent 70%)` }}
        />
        <div
          className="absolute -bottom-40 left-[-200px] w-[500px] h-[500px] rounded-full"
          style={{ background: `radial-gradient(circle, ${isLight ? 'rgba(219,39,119,0.05)' : 'rgba(236,72,153,0.07)'} 0%, transparent 70%)` }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${isLight ? 'rgba(109,40,217,0.1)' : 'rgba(139,92,246,0.15)'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            opacity: isLight ? 0.2 : 0.3,
          }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[60px]" style={{ background: isLight ? 'rgba(109,40,217,0.4)' : 'rgba(139,92,246,0.4)' }} />
            <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}>
              Who I am
            </span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-black tracking-tighter leading-none"
            style={{ fontFamily: "'Syne', sans-serif", color: isLight ? '#0f0a1e' : '#ffffff' }}
          >
            About{' '}
            <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-start">

          {/* Left — Bio + Skills */}
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, x: -50 }}
            animate={textInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Bio card */}
            <div
              className="relative rounded-3xl p-8 backdrop-blur-md overflow-hidden transition-colors duration-300"
              style={{
                background: isLight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isLight ? 'rgba(109,40,217,0.15)' : 'rgba(139,92,246,0.15)'}`,
                boxShadow: isLight ? '0 4px 40px rgba(109,40,217,0.06)' : 'none',
              }}
            >
              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-bl-[100px]"
                style={{ background: `radial-gradient(circle at top right, ${isLight ? 'rgba(109,40,217,0.08)' : 'rgba(139,92,246,0.12)'}, transparent 70%)` }}
              />
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
                <span className="text-xs font-mono tracking-widest uppercase" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}>Bio</span>
              </div>
              <div className="space-y-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <p className="leading-[1.85] text-base" style={{ color: isLight ? '#374151' : '#d1d5db' }}>
                  I'm a{' '}
                  <span className="font-medium" style={{ color: isLight ? '#7c3aed' : '#c4b5fd' }}>
                    confident early-career developer
                  </span>{' '}
                  focused on building modern web applications and AI-powered solutions. My work blends clean architecture with practical AI integrations.
                </p>
                <p className="leading-[1.85] text-base" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>
                  I specialize in integrating AI systems using{' '}
                  <span className="font-medium" style={{ color: isLight ? '#be185d' : '#f0abfc' }}>
                    OpenAI Agents SDK
                  </span>{' '}
                  and building scalable platforms with Next.js, TypeScript, and Python — constantly leveling up backend architecture.
                </p>
                <p className="leading-[1.85] text-base" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>
                  I don't just code — I{' '}
                  <span className="font-medium" style={{ color: isLight ? '#db2777' : '#f9a8d4' }}>
                    craft solutions
                  </span>{' '}
                  that meet real-world needs while maintaining high standards of quality and design.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <p className="text-xs font-mono tracking-[0.25em] uppercase mb-4" style={{ color: isLight ? '#9ca3af' : '#6b7280' }}>
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <SkillPill key={skill} skill={skill} delay={0.05 * i} isLight={isLight} />
                ))}
              </div>
            </div>

            {/* Resume link */}
            <motion.a
              href="#"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 text-sm font-mono transition-colors group"
              style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
            >
              <span
                className="border-b transition-colors"
                style={{ borderColor: isLight ? 'rgba(124,58,237,0.4)' : 'rgba(167,139,250,0.4)' }}
              >
                Download Resume
              </span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Right — Highlight cards */}
          <motion.div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative rounded-2xl p-6 overflow-hidden group cursor-default transition-all duration-300"
                style={{
                  background: isLight ? item.lightBg : item.darkBg,
                  border: `1px solid ${isLight ? item.lightBorder : item.darkBorder}`,
                  backdropFilter: 'blur(12px)',
                  boxShadow: isLight ? '0 2px 20px rgba(109,40,217,0.04)' : 'none',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = isLight
                    ? `0 8px 40px ${item.lightBorder}`
                    : `0 0 40px ${item.darkBorder}`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = isLight ? '0 2px 20px rgba(109,40,217,0.04)' : 'none'
                }}
              >
                {/* Top-right glow */}
                <div
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle, ${isLight ? item.lightBorder : item.darkBorder.replace('0.2', '0.3')}, transparent 70%)` }}
                />

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 bg-gradient-to-br ${item.accent}`}
                  style={{ boxShadow: `0 4px 20px ${isLight ? item.lightBorder : item.darkBorder}` }}
                >
                  <item.icon className="w-5 h-5 text-white" />
                </div>

                <h3
                  className="font-bold text-base mb-2 transition-colors duration-300"
                  style={{ fontFamily: "'Syne', sans-serif", color: isLight ? '#0f0a1e' : '#ffffff' }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: isLight ? '#6b7280' : '#9ca3af' }}
                >
                  {item.description}
                </p>

                {/* Bottom gradient line */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: `linear-gradient(to right, ${item.gradFrom}, ${item.gradTo})` }}
                />
              </motion.div>
            ))}

            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="sm:col-span-2 rounded-2xl p-6 relative overflow-hidden transition-colors duration-300"
              style={{
                background: isLight
                  ? 'linear-gradient(135deg, rgba(109,40,217,0.06), rgba(219,39,119,0.05))'
                  : 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(236,72,153,0.08))',
                border: `1px solid ${isLight ? 'rgba(109,40,217,0.15)' : 'rgba(139,92,246,0.2)'}`,
                boxShadow: isLight ? '0 2px 20px rgba(109,40,217,0.05)' : 'none',
              }}
            >
              <div className="flex items-center justify-between">
                {[
                  { label: 'Projects', val: '30+' },
                  { label: 'AI Integrations', val: '15+' },
                  { label: 'Years Active', val: '4+' },
                  { label: 'Tech Stack', val: '12+' },
                ].map(s => (
                  <div key={s.label} className="text-center flex-1">
                    <p
                      className="text-2xl md:text-3xl font-black bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {s.val}
                    </p>
                    <p
                      className="text-xs font-mono mt-0.5 uppercase tracking-widest"
                      style={{ color: isLight ? '#9ca3af' : '#6b7280' }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}