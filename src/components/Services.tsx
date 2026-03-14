'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import {
  Code2,
  Brain,
  Database,
  Cloud,
  Zap,
  Terminal,
  FolderGit2,
  FileJson,
  Server,
  Cpu,
  Globe,
  Shield,
  Rocket,
  ChevronRight,
  Play,
  CheckCircle2,
} from 'lucide-react'
import Link from 'next/link'

/* ═══════════════════════════════════════════════════════════════
   DEVELOPER MODE SERVICES - API/Endpoint Inspired
   ═══════════════════════════════════════════════════════════════ */

const services = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    endpoint: 'POST /api/fullstack',
    description: 'End-to-end web applications with Next.js, TypeScript & modern architectures',
    tech: ['Next.js 14', 'TypeScript', 'Node.js', 'React'],
    status: 'stable',
    version: 'v2.0',
    accentColor: '139, 92, 246',
    delay: 0,
  },
  {
    icon: Brain,
    title: 'AI Integration',
    endpoint: 'POST /api/ai-integration',
    description: 'Intelligent chatbots & AI-powered features using OpenAI Agents SDK',
    tech: ['OpenAI SDK', 'LangChain', 'RAG', 'Custom Agents'],
    status: 'beta',
    version: 'v1.5',
    accentColor: '236, 72, 153',
    delay: 0.1,
  },
  {
    icon: Database,
    title: 'Database Architecture',
    endpoint: 'GET /api/database',
    description: 'Scalable database solutions with PostgreSQL, Supabase & Prisma',
    tech: ['PostgreSQL', 'Supabase', 'Prisma', 'Neon'],
    status: 'stable',
    version: 'v2.1',
    accentColor: '59, 130, 246',
    delay: 0.2,
  },
  {
    icon: Cloud,
    title: 'E-Commerce Solutions',
    endpoint: 'POST /api/ecommerce',
    description: 'Complete online stores with Sanity CMS, payments & admin dashboards',
    tech: ['Sanity CMS', 'Stripe', 'Admin Panels', 'SEO'],
    status: 'stable',
    version: 'v1.8',
    accentColor: '52, 211, 153',
    delay: 0.3,
  },
  {
    icon: Cpu,
    title: 'API Development',
    endpoint: 'GET /api/rest',
    description: 'RESTful & GraphQL APIs with proper authentication & documentation',
    tech: ['FastAPI', 'Express', 'GraphQL', 'Swagger'],
    status: 'stable',
    version: 'v2.0',
    accentColor: '251, 191, 36',
    delay: 0.4,
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    endpoint: 'PUT /api/optimize',
    description: 'Lightning-fast load times, optimized bundles & Core Web Vitals',
    tech: ['Bundle Analysis', 'Image Opt', 'Caching', 'CDN'],
    status: 'stable',
    version: 'v1.2',
    accentColor: '249, 115, 22',
    delay: 0.5,
  },
]

// API Endpoint Card Component
function EndpointCard({ service, inView, isLight }: {
  service: typeof services[0];
  inView: boolean;
  isLight: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = service.icon

  const statusColors = {
    stable: { bg: 'rgba(52, 211, 153, 0.15)', text: '#34d399', border: 'rgba(52, 211, 153, 0.3)' },
    beta: { bg: 'rgba(251, 191, 36, 0.15)', text: '#fbbf24', border: 'rgba(251, 191, 36, 0.3)' },
  }

  const currentStatus = statusColors[service.status as keyof typeof statusColors]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: service.delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
      className="group cursor-pointer"
    >
      <div
        className="relative rounded-xl overflow-hidden backdrop-blur-xl transition-all duration-300"
        style={{
          background: isLight ? 'rgba(15, 15, 25, 0.95)' : 'rgba(10, 10, 15, 0.95)',
          border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.3)' : `rgba(${service.accentColor}, 0.4)`}`,
          boxShadow: isHovered
            ? `0 0 40px rgba(${service.accentColor}, 0.3)`
            : 'none',
        }}
      >
        {/* Card Header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            background: isLight ? 'rgba(30, 30, 46, 0.9)' : 'rgba(20, 20, 30, 0.9)',
            borderBottom: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.2)' : `rgba(${service.accentColor}, 0.25)`}`,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, rgb(${service.accentColor}), rgba(${service.accentColor}, 0.7))`,
                boxShadow: `0 0 15px rgba(${service.accentColor}, 0.4)`,
              }}
            >
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: isLight ? '#e5e7eb' : '#f3f4f6' }}
                >
                  {service.endpoint.split(' ')[0]}
                </span>
                <span
                  className="text-xs font-mono"
                  style={{ color: `rgb(${service.accentColor})` }}
                >
                  {service.endpoint.split(' ')[1]}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded"
                  style={{
                    background: currentStatus.bg,
                    color: currentStatus.text,
                    border: `1px solid ${currentStatus.border}`,
                  }}
                >
                  {service.status}
                </span>
                <span className="text-[10px] font-mono" style={{ color: '#9ca3af' }}>
                  {service.version}
                </span>
              </div>
            </div>
          </div>
          <ChevronRight
            className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
            style={{ color: `rgb(${service.accentColor})` }}
          />
        </div>

        {/* Card Content */}
        <div className="p-4">
          {/* Title */}
          <h3
            className="text-base font-bold mb-2"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: isLight ? '#f3f4f6' : '#ffffff',
            }}
          >
            {service.title}
          </h3>

          {/* Description */}
          <p
            className="text-xs leading-relaxed mb-4"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: isLight ? '#9ca3af' : '#d1d5db',
            }}
          >
            {service.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {service.tech.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: service.delay + 0.2 + i * 0.05 }}
                className="text-[10px] font-mono px-2 py-1 rounded"
                style={{
                  background: `rgba(${service.accentColor}, 0.1)`,
                  color: `rgb(${service.accentColor})`,
                  border: `1px solid rgba(${service.accentColor}, 0.2)`,
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Expanded Content */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isExpanded ? 'auto' : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className="pt-3 mt-3 border-t"
              style={{
                borderColor: `rgba(${service.accentColor}, 0.2)`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-3 h-3" style={{ color: '#34d399' }} />
                <span className="text-xs font-mono" style={{ color: '#34d399' }}>
                  Available for projects
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-2 py-2 rounded-lg text-xs font-mono font-semibold flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(135deg, rgb(${service.accentColor}), rgba(${service.accentColor}, 0.8))`,
                  color: 'white',
                  boxShadow: `0 0 20px rgba(${service.accentColor}, 0.4)`,
                }}
              >
                <Play className="w-3 h-3" />
                Start Project
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Animated corner glow */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgb(${service.accentColor}), transparent 70%)`,
          }}
        />
      </div>
    </motion.div>
  )
}

export default function Services() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])
  const isLight = mounted && theme === 'light'

  const [sectionRef, sectionInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [headingRef, headingInView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section
      id="services"
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

        {/* Floating API endpoints */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xs font-mono"
            style={{
              color: isLight ? 'rgba(124, 58, 237, 0.08)' : 'rgba(139, 92, 246, 0.12)',
              left: `${5 + i * 12}%`,
              top: `${10 + (i % 4) * 20}%`,
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: [0, 0.5, 0],
              x: [0, 100, 200],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 2,
            }}
          >
            {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'][i % 5]} /api/...
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
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <FolderGit2 className="w-4 h-4" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
            <span
              className="text-xs font-mono tracking-[0.3em] uppercase"
              style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
            >
              API Endpoints
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
              SERVICES &{' '}
              <span
                className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent"
                style={{
                  textShadow: isLight ? 'none' : '0 0 80px rgba(124,58,237,0.5)',
                }}
              >
                CAPABILITIES
              </span>
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 flex items-center gap-4"
          >
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-lg"
              style={{
                background: isLight ? 'rgba(124, 58, 237, 0.1)' : 'rgba(139, 92, 246, 0.15)',
                border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(139, 92, 246, 0.25)'}`,
              }}
            >
              <Server className="w-4 h-4" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
              <span className="text-xs font-mono" style={{ color: isLight ? '#7c3aed' : '#c4b5fd' }}>
                6 Endpoints Available
              </span>
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-lg"
              style={{
                background: isLight ? 'rgba(52, 211, 153, 0.1)' : 'rgba(52, 211, 153, 0.15)',
                border: `1px solid rgba(52, 211, 153, 0.25)`,
              }}
            >
              <Shield className="w-4 h-4" style={{ color: '#34d399' }} />
              <span className="text-xs font-mono" style={{ color: '#34d399' }}>
                Production Ready
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <EndpointCard
              key={service.title}
              service={service}
              inView={sectionInView}
              isLight={isLight}
            />
          ))}
        </div>

        {/* Bottom CTA - API Documentation Style */}
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
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3
                  className="text-sm font-bold mb-2"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: isLight ? '#f3f4f6' : '#ffffff',
                  }}
                >
                  Ready to Start Your Project?
                </h3>
                <p
                  className="text-xs mb-4"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: isLight ? '#9ca3af' : '#d1d5db',
                  }}
                >
                  Let&apos;s discuss your requirements and build something amazing together. 
                  All endpoints are available for immediate deployment.
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
                    <Link href="#contact" className="flex items-center gap-2">
                      <Globe className="w-3 h-3" />
                      Contact Me
                    </Link>
                  </motion.button>
                  <motion.div
                    className="flex items-center gap-2 text-xs font-mono"
                    style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
                  >
                    <FileJson className="w-3 h-3" />
                    <span>API Documentation Available</span>
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
