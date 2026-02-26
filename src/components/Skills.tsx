'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import {
  SiTypescript, SiPython, SiNextdotjs, SiTailwindcss,
  SiOpenai, SiPostgresql, SiSupabase, SiSanity,
} from 'react-icons/si'

const skills = [
  { name: 'TypeScript',        icon: SiTypescript, colorDark: '#3178C6', colorLight: '#2563eb', glow: 'rgba(49,120,198,0.35)',    desc: 'Type-safe development' },
  { name: 'Python',            icon: SiPython,     colorDark: '#FFD845', colorLight: '#ca8a04', glow: 'rgba(55,118,171,0.35)',    desc: 'Backend & AI scripting' },
  { name: 'Next.js',           icon: SiNextdotjs,  colorDark: '#FFFFFF', colorLight: '#111827', glow: 'rgba(100,100,100,0.2)',    desc: 'Full-stack React framework' },
  { name: 'Tailwind CSS',      icon: SiTailwindcss,colorDark: '#06B6D4', colorLight: '#0891b2', glow: 'rgba(6,182,212,0.35)',     desc: 'Utility-first styling' },
  { name: 'OpenAI Agents SDK', icon: SiOpenai,     colorDark: '#a78bfa', colorLight: '#7c3aed', glow: 'rgba(167,139,250,0.35)',   desc: 'AI agent orchestration' },
  { name: 'Neon PostgreSQL',   icon: SiPostgresql, colorDark: '#4169E1', colorLight: '#1d4ed8', glow: 'rgba(65,105,225,0.35)',    desc: 'Serverless SQL database' },
  { name: 'Supabase',          icon: SiSupabase,   colorDark: '#3ECF8E', colorLight: '#059669', glow: 'rgba(62,207,142,0.35)',    desc: 'Auth & realtime backend' },
  { name: 'Sanity CMS',        icon: SiSanity,     colorDark: '#F03E2F', colorLight: '#dc2626', glow: 'rgba(240,62,47,0.35)',     desc: 'Structured content platform' },
]

function SkillCard({ skill, index, inView, isLight }: {
  skill: typeof skills[0]; index: number; inView: boolean; isLight: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-60, 60], [10, -10])
  const rotateY = useTransform(mouseX, [-60, 60], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleMouseLeave = () => { setHovered(false); mouseX.set(0); mouseY.set(0) }

  const color = isLight ? skill.colorLight : skill.colorDark

  const cardBg = hovered
    ? isLight
      ? `radial-gradient(circle at 50% 0%, ${skill.glow.replace('0.35', '0.1')}, rgba(255,255,255,0.8) 70%)`
      : `radial-gradient(circle at 50% 0%, ${skill.glow.replace('0.35', '0.12')}, rgba(255,255,255,0.02) 70%)`
    : isLight
      ? 'rgba(255,255,255,0.7)'
      : 'rgba(255,255,255,0.02)'

  const cardBorder = hovered
    ? `1px solid ${color}50`
    : isLight
      ? '1px solid rgba(109,40,217,0.12)'
      : '1px solid rgba(139,92,246,0.12)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.85 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl p-6 cursor-pointer group overflow-hidden"
        whileTap={{ scale: 0.97 }}
        animate={{ boxShadow: hovered ? `0 0 40px ${skill.glow}` : isLight ? '0 2px 16px rgba(109,40,217,0.06)' : '0 0 0px transparent' }}
        transition={{ duration: 0.3 }}
        style={{
          background: cardBg,
          border: cardBorder,
          backdropFilter: 'blur(12px)',
          rotateX, rotateY,
          transformStyle: 'preserve-3d',
        } as any}
      >
        {/* Shimmer top line */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}80, transparent)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Icon */}
        <motion.div
          className="flex items-center justify-center w-14 h-14 rounded-xl mx-auto mb-4"
          style={{ background: `${color}18`, transform: 'translateZ(20px)' }}
          animate={{ scale: hovered ? 1.12 : 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <skill.icon
            className="w-8 h-8"
            style={{
              color,
              filter: hovered ? `drop-shadow(0 0 8px ${color})` : 'none',
              transition: 'filter 0.3s',
            }}
          />
        </motion.div>

        {/* Name */}
        <h3
          className="text-sm font-bold text-center mb-1 tracking-tight transition-colors duration-300"
          style={{
            fontFamily: "'Syne', sans-serif",
            transform: 'translateZ(10px)',
            color: isLight ? '#0f0a1e' : '#ffffff',
          }}
        >
          {skill.name}
        </h3>

        {/* Desc */}
        <p
          className="text-xs text-center leading-relaxed"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: hovered
              ? isLight ? '#4b5563' : '#9ca3af'
              : isLight ? '#9ca3af' : '#6b7280',
            transition: 'color 0.3s',
          }}
        >
          {skill.desc}
        </p>

        {/* Dot */}
        <div className="flex justify-center mt-3">
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: color }}
            animate={{ opacity: hovered ? 1 : 0.3, scale: hovered ? 1.3 : 1 }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Skills() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isLight = mounted && theme === 'light'

  const [headingRef, headingInView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section
      id="skills"
      className="relative py-32 px-6 overflow-hidden transition-colors duration-500"
      style={{ background: isLight ? '#f8f7ff' : '#050508' }}
    >
      <style dangerouslySetInnerHTML={{ __html: "@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');" }} />

      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${isLight ? 'rgba(109,40,217,0.25)' : 'rgba(139,92,246,0.3)'}, transparent)` }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${isLight ? 'rgba(219,39,119,0.15)' : 'rgba(236,72,153,0.2)'}, transparent)` }}
        />
        <motion.div
          className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full"
          style={{ background: `radial-gradient(circle, ${isLight ? 'rgba(109,40,217,0.06)' : 'rgba(139,92,246,0.07)'} 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full"
          style={{ background: `radial-gradient(circle, ${isLight ? 'rgba(219,39,119,0.05)' : 'rgba(236,72,153,0.06)'} 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${isLight ? 'rgba(109,40,217,0.12)' : 'rgba(139,92,246,0.2)'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            opacity: isLight ? 0.15 : 0.2,
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
            <div className="h-px w-[50px]" style={{ background: isLight ? 'rgba(109,40,217,0.4)' : 'rgba(139,92,246,0.5)' }} />
            <span
              className="text-xs font-mono tracking-[0.3em] uppercase"
              style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
            >
              What I use
            </span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-black tracking-tighter leading-none"
            style={{ fontFamily: "'Syne', sans-serif", color: isLight ? '#0f0a1e' : '#ffffff' }}
          >
            Technical{' '}
            <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p
            className="mt-4 text-base max-w-md"
            style={{ fontFamily: "'DM Sans', sans-serif", color: isLight ? '#6b7280' : '#6b7280' }}
          >
            The tools and technologies I rely on to build modern, scalable, and intelligent applications.
          </p>
        </motion.div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} inView={gridInView} isLight={isLight} />
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={gridInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-12 flex items-center gap-4"
        >
          <div className="h-px flex-1" style={{ background: isLight ? 'rgba(109,40,217,0.1)' : 'rgba(139,92,246,0.1)' }} />
          <span
            className="text-xs font-mono tracking-widest uppercase"
            style={{ color: isLight ? '#9ca3af' : '#4b5563' }}
          >
            & always learning more
          </span>
          <div className="h-px flex-1" style={{ background: isLight ? 'rgba(109,40,217,0.1)' : 'rgba(139,92,246,0.1)' }} />
        </motion.div>
      </div>
    </section>
  )
}