'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { 
  Code2, 
  Brain, 
  Palette, 
  Rocket, 
  Database, 
  Cloud,
  ArrowRight,
  Sparkles,
  Zap,
  Shield
} from 'lucide-react'

const services = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'End-to-end web applications built with Next.js, TypeScript, and modern architectures. Clean, scalable code that grows with your business.',
    features: ['Next.js & React', 'TypeScript', 'API Development', 'SSR/SSG'],
    gradient: 'from-violet-500 to-indigo-500',
    accentColor: '#8b5cf6',
    delay: 0,
  },
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Intelligent chatbots and AI-powered features using OpenAI Agents SDK, LangChain, and custom LLM integrations.',
    features: ['OpenAI SDK', 'LangChain', 'Custom Agents', 'RAG Systems'],
    gradient: 'from-fuchsia-500 to-pink-500',
    accentColor: '#d946ef',
    delay: 0.1,
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces with modern animations and premium aesthetics. Design that converts visitors into customers.',
    features: ['Framer Motion', 'Tailwind CSS', 'Design Systems', 'Responsive'],
    gradient: 'from-pink-500 to-rose-500',
    accentColor: '#ec4899',
    delay: 0.2,
  },
  {
    icon: Database,
    title: 'Database Architecture',
    description: 'Scalable database solutions with PostgreSQL, Supabase, and Prisma. Optimized queries and efficient data models.',
    features: ['PostgreSQL', 'Supabase', 'Prisma ORM', 'Neon Serverless'],
    gradient: 'from-cyan-500 to-blue-500',
    accentColor: '#06b6d4',
    delay: 0.3,
  },
  {
    icon: Cloud,
    title: 'E-Commerce Solutions',
    description: 'Complete online stores with Sanity CMS, payment integration, and admin dashboards. Built for conversion and scale.',
    features: ['Sanity CMS', 'Payment APIs', 'Admin Panels', 'SEO Optimized'],
    gradient: 'from-emerald-500 to-teal-500',
    accentColor: '#34d399',
    delay: 0.4,
  },
  {
    icon: Rocket,
    title: 'Performance Optimization',
    description: 'Lightning-fast load times, optimized bundles, and Core Web Vitals excellence. Speed that improves SEO and UX.',
    features: ['Bundle Analysis', 'Image Optimization', 'Caching', 'CDN'],
    gradient: 'from-orange-500 to-amber-500',
    accentColor: '#f59e0b',
    delay: 0.5,
  },
]

function ServiceCard({ service, inView, isLight }: { 
  service: typeof services[0]; 
  inView: boolean;
  isLight: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: service.delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Card container */}
      <div
        className="relative h-full rounded-2xl p-6 overflow-hidden transition-all duration-500"
        style={{
          background: isLight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.02)',
          border: `1px solid ${isLight ? 'rgba(109,40,217,0.15)' : 'rgba(139,92,246,0.12)'}`,
          backdropFilter: 'blur(12px)',
          boxShadow: isHovered 
            ? `0 20px 60px ${service.accentColor}20` 
            : isLight ? '0 2px 20px rgba(109,40,217,0.06)' : 'none',
        }}
      >
        {/* Animated gradient background on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at top right, ${service.accentColor}15, transparent 60%)`,
          }}
        />

        {/* Top gradient line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, ${service.accentColor}, transparent)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
            style={{
              background: `linear-gradient(135deg, ${service.accentColor}, ${service.accentColor}80)`,
              boxShadow: `0 4px 20px ${service.accentColor}40`,
            }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>

          {/* Title */}
          <h3
            className="text-lg font-bold mb-3 transition-colors duration-300"
            style={{
              fontFamily: "'Syne', sans-serif",
              color: isLight ? '#0f0a1e' : '#ffffff',
            }}
          >
            {service.title}
          </h3>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-4"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: isLight ? '#6b7280' : '#9ca3af',
            }}
          >
            {service.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-5">
            {service.features.map((feature, i) => (
              <span
                key={feature}
                className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md"
                style={{
                  background: `${service.accentColor}15`,
                  color: service.accentColor,
                  border: `1px solid ${service.accentColor}25`,
                }}
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Learn more link */}
          <motion.div
            className="flex items-center gap-2 text-xs font-mono"
            style={{ color: service.accentColor }}
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <span>Explore service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.div>
        </div>

        {/* Corner accent */}
        <div
          className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle, ${service.accentColor}20, transparent 70%)`,
          }}
        />
      </div>
    </motion.div>
  )
}

export default function Services() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isLight = mounted && theme === 'light'

  const [sectionRef, sectionInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [headingRef, headingInView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: "@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');" }} />

      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
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
          className="absolute -top-40 right-[-100px] w-[500px] h-[500px] rounded-full"
          style={{ background: `radial-gradient(circle, ${isLight ? 'rgba(109,40,217,0.06)' : 'rgba(139,92,246,0.08)'} 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 left-[-100px] w-[500px] h-[500px] rounded-full"
          style={{ background: `radial-gradient(circle, ${isLight ? 'rgba(219,39,119,0.05)' : 'rgba(236,72,153,0.06)'} 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.15, 1], x: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
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
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-[50px]" style={{ background: isLight ? 'rgba(109,40,217,0.4)' : 'rgba(139,92,246,0.5)' }} />
            <span
              className="text-xs font-mono tracking-[0.3em] uppercase"
              style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
            >
              What I do
            </span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-black tracking-tighter leading-none"
            style={{ fontFamily: "'Syne', sans-serif", color: isLight ? '#0f0a1e' : '#ffffff' }}
          >
            Services &{' '}
            <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p
            className="mt-4 text-base max-w-2xl"
            style={{ fontFamily: "'DM Sans', sans-serif", color: isLight ? '#6b7280' : '#6b7280' }}
          >
            Comprehensive development services from concept to deployment. 
            Every project receives the same attention to detail, performance, and design excellence.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <ServiceCard 
              key={service.title} 
              service={service} 
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
          className="mt-16 text-center"
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl"
            style={{
              background: isLight 
                ? 'linear-gradient(135deg, rgba(109,40,217,0.06), rgba(219,39,119,0.05))'
                : 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(236,72,153,0.08))',
              border: `1px solid ${isLight ? 'rgba(109,40,217,0.15)' : 'rgba(139,92,246,0.2)'}`,
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
            <span
              className="text-sm font-mono"
              style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
            >
              Need a custom solution? Let's discuss your project
            </span>
            <Zap className="w-4 h-4" style={{ color: isLight ? '#f59e0b' : '#fbbf24' }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
