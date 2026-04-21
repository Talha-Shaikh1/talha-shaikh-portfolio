'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import {
  Terminal,
  FolderGit2,
  FileJson,
  Package,
  Cpu,
  Code2,
  Database,
  Cloud,
  Zap,
  CheckCircle2,
  Download,
  ExternalLink,
} from 'lucide-react'
import {
  SiTypescript, SiPython, SiNextdotjs, SiTailwindcss,
  SiOpenai, SiPostgresql, SiSupabase, SiSanity,
  SiReact, SiNodedotjs, SiDocker, SiRedis,
  SiPrisma, SiFastapi, SiFramer, SiGit
} from 'react-icons/si'

/* ═══════════════════════════════════════════════════════════════
   DEVELOPER MODE SKILLS - package.json / Dependencies Inspired
   ═══════════════════════════════════════════════════════════════ */

const skillCategories = [
  {
    name: 'dependencies',
    label: 'Frontend Core',
    icon: Code2,
    color: '139, 92, 246', // violet
    skills: [
      { name: 'next', version: '14.2.0', icon: SiNextdotjs, desc: 'React framework' },
      { name: 'react', version: '18.2.0', icon: SiReact, desc: 'UI library' },
      { name: 'typescript', version: '5.3.0', icon: SiTypescript, desc: 'Type safety' },
      { name: 'tailwindcss', version: '4.0.0', icon: SiTailwindcss, desc: 'Styling' },
      { name: 'framer-motion', version: '11.0.0', icon: SiFramer, desc: 'Animations' },
    ],
  },
  {
    name: 'backend',
    label: 'Backend & Database',
    icon: Database,
    color: '59, 130, 246', // blue
    skills: [
      { name: 'python', version: '3.11', icon: SiPython, desc: 'Backend scripting' },
      { name: 'node', version: '20.x', icon: SiNodedotjs, desc: 'Runtime' },
      { name: 'postgresql', version: '15', icon: SiPostgresql, desc: 'Database' },
      { name: 'prisma', version: '5.8.0', icon: SiPrisma, desc: 'ORM' },
      { name: 'fastapi', version: '0.109.0', icon: SiFastapi, desc: 'API framework' },
    ],
  },
  {
    name: 'devDependencies',
    label: 'AI & DevTools',
    icon: Cpu,
    color: '236, 72, 153', // pink
    skills: [
      { name: 'openai', version: '4.x', icon: SiOpenai, desc: 'AI integration' },
      { name: 'supabase', version: '1.x', icon: SiSupabase, desc: 'Backend-as-a-Service' },
      { name: 'sanity', version: '3.x', icon: SiSanity, desc: 'CMS' },
      { name: 'docker', version: '24', icon: SiDocker, desc: 'Containers' },
      { name: 'redis', version: '4.6', icon: SiRedis, desc: 'Caching' },
      { name: 'git', version: '2.43', icon: SiGit, desc: 'Version control' },
    ],
  },
]

// Package Card Component
function PackageCard({ skill, color, delay, inView, isLight }: {
  skill: typeof skillCategories[0]['skills'][0];
  color: string;
  delay: number;
  inView: boolean;
  isLight: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = skill.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 200 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div
        className="rounded-xl p-4 backdrop-blur-xl transition-all duration-300"
        style={{
          background: isLight ? 'rgba(15, 15, 25, 0.95)' : 'rgba(10, 10, 15, 0.95)',
          border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.2)' : `rgba(${color}, 0.3)`}`,
          boxShadow: isHovered
            ? `0 0 30px rgba(${color}, 0.3)`
            : 'none',
        }}
      >
        {/* Package header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, rgb(${color}), rgba(${color}, 0.7))`,
                boxShadow: `0 0 15px rgba(${color}, 0.4)`,
              }}
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4
                className="text-sm font-mono font-bold"
                style={{ color: isLight ? '#f3f4f6' : '#ffffff' }}
              >
                {skill.name}
              </h4>
              <span
                className="text-xs font-mono"
                style={{ color: `rgb(${color})` }}
              >
                v{skill.version}
              </span>
            </div>
          </div>
          <CheckCircle2
            className="w-4 h-4"
            style={{ color: '#34d399', opacity: isHovered ? 1 : 0.5 }}
          />
        </div>

        {/* Description */}
        <p
          className="text-xs font-mono mb-3"
          style={{ color: isLight ? '#9ca3af' : '#d1d5db' }}
        >
          {skill.desc}
        </p>

        {/* Install command preview */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div
            className="mt-3 p-2 rounded-lg font-mono text-xs"
            style={{
              background: isLight ? 'rgba(30, 30, 46, 0.9)' : 'rgba(20, 20, 30, 0.9)',
              border: `1px solid rgba(${color}, 0.2)`,
            }}
          >
            <span style={{ color: '#34d399' }}>npm install</span>{' '}
            <span style={{ color: `rgb(${color})` }}>{skill.name}</span>
          </div>
        </motion.div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t" style={{
          borderColor: isLight ? 'rgba(124, 58, 237, 0.15)' : `rgba(${color}, 0.15)`,
        }}>
          <div className="w-2 h-2 rounded-full" style={{ background: '#34d399' }} />
          <span className="text-[10px] font-mono" style={{ color: '#34d399' }}>
            Installed
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// Category Section
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
    >
      {/* Category Header */}
      <div className="flex items-center gap-3 mb-4">
        <FolderGit2 className="w-5 h-5" style={{ color: `rgb(${category.color})` }} />
        <span
          className="text-sm font-mono font-bold"
          style={{ color: `rgb(${category.color})` }}
        >
          &quot;{category.name}&quot;:
        </span>
        <span
          className="text-xs font-mono"
          style={{ color: isLight ? '#6b7280' : '#9ca3af' }}
        >
          {category.label}
        </span>
      </div>

      {/* Packages Grid */}
      <div
        className="rounded-xl p-4 mb-6"
        style={{
          background: isLight ? 'rgba(249, 250, 251, 0.5)' : 'rgba(15, 15, 25, 0.5)',
          border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.15)' : `rgba(${category.color}, 0.2)`}`,
        }}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {category.skills.map((skill, i) => (
            <PackageCard
              key={skill.name}
              skill={skill}
              color={category.color}
              delay={index * 0.1 + i * 0.05}
              inView={inView}
              isLight={isLight}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Animated countup hook
function useCountUp(target: number, inView: boolean, duration = 1500) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])
  return count
}

// Stats Component
function SkillStats({ inView, isLight }: { inView: boolean; isLight: boolean }) {
  const stats = [
    { icon: Package, label: 'Packages', value: '16+', numeric: 16, suffix: '+', color: '139, 92, 246', progress: 100 },
    { icon: Zap, label: 'Proficiency', value: '90%', numeric: 90, suffix: '%', color: '236, 72, 153', progress: 90 },
    { icon: Cloud, label: 'Deployments', value: '50+', numeric: 50, suffix: '+', color: '59, 130, 246', progress: 100 },
    { icon: Cpu, label: 'AI Models', value: '5+', numeric: 5, suffix: '+', color: '52, 211, 153', progress: 100 },
  ]

  const circumference = 2 * Math.PI * 20 // radius 20

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const countedValue = useCountUp(stat.numeric, inView)
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1, type: 'spring', stiffness: 200 }}
            className="relative p-4 rounded-xl overflow-hidden flex items-center gap-4"
            style={{
              background: isLight
                ? `rgba(${stat.color}, 0.08)`
                : `rgba(${stat.color}, 0.12)`,
              border: `1px solid rgba(${stat.color}, ${isLight ? 0.2 : 0.3})`,
            }}
          >
            {/* Circular Progress Ring */}
            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="28" cy="28" r="20"
                  fill="none"
                  strokeWidth="4"
                  stroke={`rgba(${stat.color}, 0.2)`}
                />
                {/* Animated Progress Ring */}
                <motion.circle
                  cx="28" cy="28" r="20"
                  fill="none"
                  strokeWidth="4"
                  stroke={`rgb(${stat.color})`}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={inView ? { strokeDashoffset: circumference - (circumference * stat.progress) / 100 } : {}}
                  transition={{ duration: 1.5, delay: i * 0.1 + 0.2, ease: "easeOut" }}
                />
              </svg>
              <stat.icon className="w-5 h-5 relative z-10" style={{ color: `rgb(${stat.color})` }} />
            </div>

            <div>
              <motion.p
                className="text-2xl font-black mb-0"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: `rgb(${stat.color})`,
                }}
              >
                {inView ? countedValue : 0}{stat.suffix}
              </motion.p>
              <p
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: isLight ? '#6b7280' : '#9ca3af' }}
              >
                {stat.label}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function Skills() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])
  const isLight = mounted && theme === 'light'

  const [sectionRef, sectionInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [headingRef, headingInView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section
      id="skills"
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

        {/* Floating package names */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xs font-mono"
            style={{
              color: isLight ? 'rgba(124, 58, 237, 0.08)' : 'rgba(139, 92, 246, 0.12)',
              left: `${5 + i * 9}%`,
              top: `${10 + (i % 5) * 18}%`,
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: [0, 0.5, 0],
              x: [0, 150, 300],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
          >
            {['react', 'next', 'ts', 'node', 'py', 'docker'][i % 6]}@latest
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
            <FileJson className="w-4 h-4" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
            <span
              className="text-xs font-mono tracking-[0.3em] uppercase"
              style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
            >
              package.json
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
              TECH{' '}
              <span
                className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent"
                style={{
                  textShadow: isLight ? 'none' : '0 0 80px rgba(124,58,237,0.5)',
                }}
              >
                STACK
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
            My development dependencies and devDependencies. 
            All packages tested and production-ready.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <SkillStats inView={sectionInView} isLight={isLight} />

        {/* Skill Categories */}
        <div className="space-y-8">
          {skillCategories.map((category, i) => (
            <SkillCategory
              key={category.name}
              category={category}
              index={i}
              inView={sectionInView}
              isLight={isLight}
            />
          ))}
        </div>

        {/* Bottom CTA - Install Command */}
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
                <Download className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3
                  className="text-sm font-bold mb-2"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: isLight ? '#f3f4f6' : '#ffffff',
                  }}
                >
                  Ready to Work Together?
                </h3>
                <p
                  className="text-xs mb-4"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: isLight ? '#9ca3af' : '#d1d5db',
                  }}
                >
                  <span style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}>{'// '}</span>
                  All dependencies installed. Ready to deploy.
                </p>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                      color: 'white',
                      boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
                    }}
                  >
                    <Package className="w-3 h-3" />
                    Hire Me
                  </motion.button>
                  <motion.div
                    className="flex items-center gap-2 text-xs font-mono"
                    style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Available for opportunities</span>
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
