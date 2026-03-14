'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { 
  Code2, 
  Brain, 
  Rocket, 
  Users, 
  Sparkles, 
  ArrowUpRight, 
  Award,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
  Trophy,
  Zap
} from 'lucide-react'

const highlights = [
  {
    icon: Code2,
    title: 'Practical Experience',
    description: 'Building production-ready applications with modern tech stack',
    accent: 'from-violet-500 to-indigo-500',
    color: '#8b5cf6',
    stat: '4+',
    statLabel: 'Years',
  },
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Specialized in OpenAI Agents SDK and intelligent chatbot systems',
    accent: 'from-fuchsia-500 to-pink-500',
    color: '#d946ef',
    stat: '15+',
    statLabel: 'AI Projects',
  },
  {
    icon: Rocket,
    title: 'Continuous Growth',
    description: 'Deepening backend architecture and scalable systems knowledge',
    accent: 'from-pink-500 to-rose-500',
    color: '#ec4899',
    stat: '30+',
    statLabel: 'Projects',
  },
  {
    icon: Users,
    title: 'Problem Solver',
    description: 'Approaching challenges with innovative and practical solutions',
    accent: 'from-indigo-500 to-violet-500',
    color: '#6366f1',
    stat: '100%',
    statLabel: 'Commitment',
  },
]

const timeline = [
  {
    icon: GraduationCap,
    title: 'Learning Journey Begins',
    period: '2023',
    description: 'Started programming with Python and web development fundamentals',
    details: ['Self-taught programming', 'Built first web applications', 'Explored multiple languages'],
    color: '#8b5cf6',
  },
  {
    icon: Briefcase,
    title: 'First Professional Projects',
    period: '2024',
    description: 'Transitioned to professional development with client projects',
    details: ['Freelance web development', 'Built e-commerce solutions', 'Learned React & Next.js'],
    color: '#34d399',
  },
  {
    icon: Code2,
    title: 'Full-Stack Specialization',
    period: '2025',
    description: 'Deepened expertise in full-stack development and databases',
    details: ['Mastered TypeScript', 'PostgreSQL & Prisma', 'Production deployments'],
    color: '#60a5fa',
  },
  {
    icon: Brain,
    title: 'AI Integration Focus',
    period: '2026-Present',
    description: 'Specializing in AI-powered applications and LLM integrations',
    details: ['OpenAI SDK expertise', 'Custom chatbot solutions', 'RAG systems'],
    color: '#f472b6',
  },
]

const skills = [
  'Next.js', 'TypeScript', 'Python', 'OpenAI SDK',
  'Node.js', 'PostgreSQL', 'Prisma', 'TailwindCSS',
  'FastAPI', 'Docker', 'Redis', 'LangChain',
]

function TimelineItem({ item, index, inView, isLight }: {
  item: typeof timeline[0];
  index: number;
  inView: boolean;
  isLight: boolean;
}) {
  const Icon = item.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-12 pb-12 last:pb-0"
    >
      {/* Timeline line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{
          background: `linear-gradient(180deg, ${item.color}60, ${item.color}20, transparent)`,
        }}
      />
      
      {/* Timeline dot */}
      <motion.div
        className="absolute left-0 top-0 w-8 h-8 -translate-x-1/2 rounded-full flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${item.color}, ${item.color}80)`,
          boxShadow: `0 0 20px ${item.color}60`,
        }}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.2, type: 'spring', stiffness: 300 }}
      >
        <Icon className="w-4 h-4 text-white" />
      </motion.div>

      {/* Content card */}
      <motion.div
        className="relative rounded-2xl p-5 transition-all duration-300"
        whileHover={{ scale: 1.02, x: 8 }}
        style={{
          background: isLight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.02)',
          border: `1px solid ${isLight ? 'rgba(109,40,217,0.15)' : 'rgba(139,92,246,0.12)'}`,
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Period badge */}
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-3.5 h-3.5" style={{ color: item.color }} />
          <span
            className="text-xs font-mono uppercase tracking-wider"
            style={{ color: item.color }}
          >
            {item.period}
          </span>
        </div>

        {/* Title */}
        <h4
          className="text-lg font-bold mb-2"
          style={{
            fontFamily: "'Syne', sans-serif",
            color: isLight ? '#0f0a1e' : '#ffffff',
          }}
        >
          {item.title}
        </h4>

        {/* Description */}
        <p
          className="text-sm mb-4"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: isLight ? '#6b7280' : '#9ca3af',
          }}
        >
          {item.description}
        </p>

        {/* Details */}
        <div className="flex flex-wrap gap-2">
          {item.details.map((detail, i) => (
            <motion.span
              key={detail}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.15 + 0.3 + i * 0.05 }}
              className="text-xs px-2.5 py-1 rounded-lg"
              style={{
                background: `${item.color}15`,
                color: item.color,
                border: `1px solid ${item.color}25`,
              }}
            >
              {detail}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function About() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isLight = mounted && theme === 'light'

  const sectionRef = useRef<HTMLElement>(null)
  const [headingRef, headingInView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden transition-colors duration-500"
      style={{ background: 'var(--bg-primary)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: "@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');" }} />

      {/* Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10 pointer-events-none">
        {/* Grid lines */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${isLight ? 'rgba(109,40,217,0.25)' : 'rgba(139,92,246,0.3)'}, transparent)` }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${isLight ? 'rgba(219,39,119,0.15)' : 'rgba(236,72,153,0.2)'}, transparent)` }}
        />
        
        {/* Animated orbs */}
        <motion.div
          className="absolute -top-40 right-[-200px] w-[500px] h-[500px] rounded-full"
          style={{ background: `radial-gradient(circle, ${isLight ? 'rgba(109,40,217,0.06)' : 'rgba(139,92,246,0.08)'} 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 left-[-200px] w-[500px] h-[500px] rounded-full"
          style={{ background: `radial-gradient(circle, ${isLight ? 'rgba(219,39,119,0.05)' : 'rgba(236,72,153,0.07)'} 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.15, 1], x: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Dot grid pattern */}
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
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-[50px]" style={{ background: isLight ? 'rgba(109,40,217,0.4)' : 'rgba(139,92,246,0.5)' }} />
            <span
              className="text-xs font-mono tracking-[0.3em] uppercase"
              style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
            >
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
        <div ref={contentRef} className="grid lg:grid-cols-[1fr_1fr] gap-12 items-start">
          
          {/* Left — Bio + Skills */}
          <div className="space-y-8">
            {/* Bio card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl p-8 backdrop-blur-md overflow-hidden"
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

              {/* Location & availability */}
              <div className="flex items-center gap-6 mt-6 pt-6" style={{ borderTop: `1px solid ${isLight ? 'rgba(109,40,217,0.15)' : 'rgba(139,92,246,0.15)'}` }}>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
                  <span className="text-sm" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>Pakistan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" style={{ color: '#34d399' }} />
                  <span className="text-sm text-emerald-500">Available for work</span>
                </div>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xs font-mono tracking-[0.25em] uppercase mb-4" style={{ color: isLight ? '#9ca3af' : '#6b7280' }}>
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={contentInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.03, type: 'spring', stiffness: 180 }}
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
                ))}
              </div>
            </motion.div>

            {/* Resume link */}
            {/* <motion.a
              href="#"
              initial={{ opacity: 0, x: -50 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
            </motion.a> */}
          </div>

          {/* Right — Timeline + Highlights */}
          <div className="space-y-8">
            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl p-6"
              style={{
                background: isLight ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.01)',
                border: `1px solid ${isLight ? 'rgba(109,40,217,0.1)' : 'rgba(139,92,246,0.1)'}`,
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-4 h-4" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
                <span className="text-xs font-mono tracking-widest uppercase" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}>Journey</span>
              </div>
              
              <div className="space-y-2">
                {timeline.map((item, i) => (
                  <TimelineItem 
                    key={item.title} 
                    item={item} 
                    index={i} 
                    inView={contentInView}
                    isLight={isLight}
                  />
                ))}
              </div>
            </motion.div>

            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl p-6 overflow-hidden"
              style={{
                background: isLight 
                  ? 'linear-gradient(135deg, rgba(109,40,217,0.06), rgba(219,39,119,0.05))'
                  : 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(236,72,153,0.08))',
                border: `1px solid ${isLight ? 'rgba(109,40,217,0.15)' : 'rgba(139,92,246,0.2)'}`,
              }}
            >
              <div className="flex items-center justify-between">
                {[
                  { label: 'Projects', val: '6+' },
                  { label: 'AI Integrations', val: '5+' },
                  { label: 'Years Active', val: '2+' },
                  { label: 'Technologies', val: '12+' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="text-center flex-1"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={contentInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200 }}
                  >
                    <p
                      className="text-2xl md:text-3xl font-black bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {stat.val}
                    </p>
                    <p
                      className="text-xs font-mono mt-1 uppercase tracking-widest"
                      style={{ color: isLight ? '#9ca3af' : '#6b7280' }}
                    >
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
