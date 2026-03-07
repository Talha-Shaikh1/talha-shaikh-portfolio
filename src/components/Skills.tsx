'use client'

import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import {
  SiTypescript, SiPython, SiNextdotjs, SiTailwindcss,
  SiOpenai, SiPostgresql, SiSupabase, SiSanity,
  SiReact, SiNodedotjs, SiDocker, SiRedis,
  SiPrisma, SiFastapi, SiShadcnui, SiFramer
} from 'react-icons/si'

const skillCategories = [
  {
    name: 'Frontend',
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-indigo-500',
    skills: [
      { name: 'TypeScript', icon: SiTypescript, level: 92, desc: 'Type-safe development' },
      { name: 'Next.js', icon: SiNextdotjs, level: 90, desc: 'Full-stack React framework' },
      { name: 'React', icon: SiReact, level: 88, desc: 'Component-based UIs' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, level: 95, desc: 'Utility-first styling' },
      { name: 'Framer Motion', icon: SiFramer, level: 85, desc: 'Advanced animations' },
    ],
  },
  {
    name: 'Backend',
    color: '#34d399',
    gradient: 'from-emerald-500 to-teal-500',
    skills: [
      { name: 'Python', icon: SiPython, level: 88, desc: 'Backend & AI scripting' },
      { name: 'Node.js', icon: SiNodedotjs, level: 85, desc: 'Server-side JavaScript' },
      { name: 'FastAPI', icon: SiFastapi, level: 82, desc: 'Modern Python APIs' },
      { name: 'PostgreSQL', icon: SiPostgresql, level: 80, desc: 'Relational databases' },
      { name: 'Prisma', icon: SiPrisma, level: 88, desc: 'Type-safe ORM' },
    ],
  },
  {
    name: 'AI & Tools',
    color: '#f472b6',
    gradient: 'from-pink-500 to-rose-500',
    skills: [
      { name: 'OpenAI SDK', icon: SiOpenai, level: 90, desc: 'AI agent orchestration' },
      { name: 'Supabase', icon: SiSupabase, level: 85, desc: 'Auth & realtime backend' },
      { name: 'Sanity CMS', icon: SiSanity, level: 82, desc: 'Structured content' },
      { name: 'Docker', icon: SiDocker, level: 75, desc: 'Container deployment' },
      { name: 'Redis', icon: SiRedis, level: 70, desc: 'Caching & queues' },
    ],
  },
]

// Animated skill orb that pulses and glows
function SkillOrb({ skill, color, delay, isLight }: { 
  skill: typeof skillCategories[0]['skills'][0]; 
  color: string;
  delay: number;
  isLight: boolean;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  const [hovered, setHovered] = useState(false)
  const Icon = skill.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 200 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group cursor-pointer"
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(circle, ${color}30, transparent 70%)`,
        }}
        animate={{ scale: hovered ? 1.3 : 1, opacity: hovered ? 0.8 : 0.3 }}
        transition={{ duration: 0.3 }}
      />

      {/* Main orb */}
      <motion.div
        className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${color}20, ${color}10)`,
          border: `1px solid ${color}40`,
          backdropFilter: 'blur(10px)',
        }}
        animate={{
          scale: hovered ? 1.1 : 1,
          rotate: hovered ? 5 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* Inner glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${color}40, transparent 60%)`,
          }}
        />

        {/* Icon */}
        <motion.div
          animate={{ scale: hovered ? 1.2 : 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Icon 
            className="w-8 h-8 md:w-10 md:h-10" 
            style={{ 
              color,
              filter: hovered ? `drop-shadow(0 0 12px ${color})` : 'none',
              transition: 'filter 0.3s',
            }} 
          />
        </motion.div>

        {/* Level indicator dots */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{ 
                background: i < Math.floor(skill.level / 20) ? color : isLight ? '#d1d5db' : '#4b5563',
              }}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: delay + 0.3 + i * 0.05 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: -50, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute left-1/2 -translate-x-1/2 px-4 py-3 rounded-xl whitespace-nowrap z-50"
            style={{
              background: isLight ? 'rgba(255,255,255,0.95)' : 'rgba(15,15,20,0.95)',
              border: `1px solid ${color}40`,
              backdropFilter: 'blur(20px)',
              boxShadow: `0 10px 40px ${color}30`,
            }}
          >
            <p className="text-sm font-bold" style={{ color }}>{skill.name}</p>
            <p className="text-xs mt-0.5" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>{skill.desc}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-1 rounded-full" style={{ background: isLight ? '#e5e7eb' : '#374151' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </div>
              <span className="text-xs font-mono" style={{ color }}>{skill.level}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Category section with orbit layout
function SkillCategory({ 
  category, 
  index, 
  inView,
  isLight 
}: { 
  category: typeof skillCategories[0]; 
  index: number; 
  inView: boolean;
  isLight: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-1 h-8 rounded-full"
          style={{ background: `linear-gradient(180deg, ${category.color}, transparent)` }}
        />
        <h3
          className="text-lg font-bold"
          style={{ 
            fontFamily: "'Syne', sans-serif",
            color: isLight ? '#0f0a1e' : '#ffffff',
          }}
        >
          {category.name}
        </h3>
        <div
          className="flex-1 h-px"
          style={{ background: `linear-gradient(90deg, ${category.color}40, transparent)` }}
        />
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
        {category.skills.map((skill, i) => (
          <div key={skill.name} className="flex flex-col items-center">
            <SkillOrb 
              skill={skill} 
              color={category.color} 
              delay={index * 0.1 + i * 0.05}
              isLight={isLight}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.1 + i * 0.05 + 0.3 }}
              className="text-xs font-mono mt-4 text-center"
              style={{ color: isLight ? '#6b7280' : '#9ca3af' }}
            >
              {skill.name}
            </motion.p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// Animated skill bar component
function SkillBar({ skill, color, delay, inView, isLight }: {
  skill: typeof skillCategories[0]['skills'][0];
  color: string;
  delay: number;
  inView: boolean;
  isLight: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-sm font-medium"
          style={{ color: isLight ? '#374151' : '#e5e7eb' }}
        >
          {skill.name}
        </span>
        <span
          className="text-xs font-mono"
          style={{ color }}
        >
          {skill.level}%
        </span>
      </div>
      <div className="relative h-2 rounded-full overflow-hidden" style={{ background: isLight ? '#e5e7eb' : '#374151' }}>
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-y-0 right-0 w-20"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          }}
          animate={{ x: inView ? [-100, 300] : 0 }}
          transition={{ duration: 1.5, delay: delay + 0.5, repeat: Infinity, repeatDelay: 3 }}
        />
      </div>
      <p
        className="text-xs mt-1.5"
        style={{ color: isLight ? '#9ca3af' : '#6b7280' }}
      >
        {skill.desc}
      </p>
    </motion.div>
  )
}

export default function Skills() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isLight = mounted && theme === 'light'

  const [sectionRef, sectionInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [headingRef, headingInView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [viewMode, setViewMode] = useState<'orbit' | 'list'>('orbit')

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden transition-colors duration-500"
      style={{ background: 'var(--bg-primary)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: "@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');" }} />

      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Grid lines */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${isLight ? 'rgba(109,40,217,0.25)' : 'rgba(139,92,246,0.3)'}, transparent)` }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${isLight ? 'rgba(219,39,119,0.15)' : 'rgba(236,72,153,0.2)'}, transparent)` }}
        />
        
        {/* Animated orbs */}
        <motion.div
          className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full"
          style={{ background: `radial-gradient(circle, ${isLight ? 'rgba(109,40,217,0.06)' : 'rgba(139,92,246,0.07)'} 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full"
          style={{ background: `radial-gradient(circle, ${isLight ? 'rgba(219,39,119,0.05)' : 'rgba(236,72,153,0.06)'} 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.15, 1], rotate: [360, 180, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
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

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-[50px]" style={{ background: isLight ? 'rgba(109,40,217,0.4)' : 'rgba(139,92,246,0.5)' }} />
            <span
              className="text-xs font-mono tracking-[0.3em] uppercase"
              style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
            >
              Expertise
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2
              className="text-5xl md:text-6xl font-black tracking-tighter leading-none"
              style={{ fontFamily: "'Syne', sans-serif", color: isLight ? '#0f0a1e' : '#ffffff' }}
            >
              Technical{' '}
              <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
                Skills
              </span>
            </h2>
            
            {/* View toggle */}
            <div
              className="inline-flex items-center gap-1 p-1 rounded-xl"
              style={{
                background: isLight ? 'rgba(124,58,237,0.08)' : 'rgba(124,58,237,0.1)',
                border: `1px solid ${isLight ? 'rgba(124,58,237,0.15)' : 'rgba(124,58,237,0.2)'}`,
              }}
            >
              <motion.button
                onClick={() => setViewMode('orbit')}
                className="px-4 py-2 rounded-lg text-xs font-mono transition-colors"
                style={{
                  background: viewMode === 'orbit' 
                    ? `linear-gradient(135deg, #7c3aed, #db2777)` 
                    : 'transparent',
                  color: viewMode === 'orbit' ? '#ffffff' : isLight ? '#6b7280' : '#9ca3af',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Orbit View
              </motion.button>
              <motion.button
                onClick={() => setViewMode('list')}
                className="px-4 py-2 rounded-lg text-xs font-mono transition-colors"
                style={{
                  background: viewMode === 'list' 
                    ? `linear-gradient(135deg, #7c3aed, #db2777)` 
                    : 'transparent',
                  color: viewMode === 'list' ? '#ffffff' : isLight ? '#6b7280' : '#9ca3af',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                List View
              </motion.button>
            </div>
          </div>
          <p
            className="mt-4 text-base max-w-2xl"
            style={{ fontFamily: "'DM Sans', sans-serif", color: isLight ? '#6b7280' : '#6b7280' }}
          >
            The tools and technologies I use to build modern, scalable, and intelligent applications.
          </p>
        </motion.div>

        {/* Skills content */}
        <AnimatePresence mode="wait">
          {viewMode === 'orbit' ? (
            <motion.div
              key="orbit"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              {skillCategories.map((category, i) => (
                <SkillCategory 
                  key={category.name}
                  category={category}
                  index={i}
                  inView={sectionInView}
                  isLight={isLight}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {skillCategories.map((category, i) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="p-6 rounded-2xl"
                  style={{
                    background: isLight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isLight ? 'rgba(109,40,217,0.15)' : 'rgba(139,92,246,0.12)'}`,
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <h3
                    className="text-lg font-bold mb-4"
                    style={{ 
                      fontFamily: "'Syne', sans-serif",
                      color: isLight ? '#0f0a1e' : '#ffffff',
                    }}
                  >
                    {category.name}
                  </h3>
                  <div className="space-y-4">
                    {category.skills.map((skill, j) => (
                      <SkillBar 
                        key={skill.name}
                        skill={skill}
                        color={category.color}
                        delay={i * 0.1 + j * 0.05}
                        inView={sectionInView}
                        isLight={isLight}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={sectionInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-16 flex items-center gap-4"
        >
          <div className="h-px flex-1" style={{ background: isLight ? 'rgba(109,40,217,0.1)' : 'rgba(139,92,246,0.1)' }} />
          <span
            className="text-xs font-mono tracking-widest uppercase"
            style={{ color: isLight ? '#9ca3af' : '#4b5563' }}
          >
            Continuously learning & expanding
          </span>
          <div className="h-px flex-1" style={{ background: isLight ? 'rgba(109,40,217,0.1)' : 'rgba(139,92,246,0.1)' }} />
        </motion.div>
      </div>
    </section>
  )
}
