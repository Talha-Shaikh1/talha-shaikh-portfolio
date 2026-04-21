'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  Code2, 
  Cpu, 
  User, 
  Briefcase, 
  Mail, 
  ArrowLeft,
  Terminal,
  Activity,
  Zap,
  Globe
} from 'lucide-react'

// Import existing sections to render them inside our new paradigm
import About from '../components/About'
import Services from '../components/Services'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import Navbar from '../components/Navbar'
import ParticleNetwork from '../components/ParticleNetwork'

type ViewState = 'core' | 'about' | 'projects' | 'skills' | 'services' | 'contact'

const CORE_NODES = [
  { id: 'about', title: 'ABOUT ME', subtitle: 'Identity / Auth', icon: User, angle: 0, color: '#ec4899' },
  { id: 'projects', title: 'PROJECTS', subtitle: 'Deployed Systems', icon: Code2, angle: 72, color: '#8b5cf6' },
  { id: 'skills', title: 'SKILLS', subtitle: 'Neural Weights', icon: Zap, angle: 144, color: '#3b82f6' },
  { id: 'services', title: 'SERVICES', subtitle: 'Agentic Services', icon: Cpu, angle: 216, color: '#10b981' },
  { id: 'contact', title: 'CONTACT', subtitle: 'Establish Link', icon: Mail, angle: 288, color: '#f59e0b' },
]

export default function Home() {
  const [view, setViewState] = useState<ViewState>('core')
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [mouseActual, setMouseActual] = useState({ x: -1000, y: -1000 })
  const [bootSequence, setBootSequence] = useState(true)

  useEffect(() => {
    setMounted(true)
    
    // Boot sequence timer
    const timer = setTimeout(() => {
      setBootSequence(false)
    }, 3500)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
      setMouseActual({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timer)
    }
  }, [])

  if (!mounted) return null

  const renderContent = () => {
    switch (view) {
      case 'about': return <About />
      case 'projects': return <Projects />
      case 'skills': return <Skills />
      case 'services': return <Services />
      case 'contact': return <Contact />
      default: return null
    }
  }

  // Boot Sequence Overlay
  if (bootSequence) {
    return (
      <div className="fixed inset-0 bg-[#030205] z-[9999] flex flex-col items-center justify-center font-mono text-sm">
        <motion.div 
          className="w-full max-w-2xl p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="w-6 h-6 text-violet-500" />
            <h1 className="text-violet-500 font-bold tracking-widest uppercase">Hanzala.OS Bootloader v2.0</h1>
          </div>
          <div className="space-y-2 text-gray-400">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <span className="text-emerald-500">[SYS]</span> Initializing neural pathways... OK
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              <span className="text-emerald-500">[SYS]</span> Loading autonomous agent models... OK
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
              <span className="text-emerald-500">[SYS]</span> Connecting to primary data sources... OK
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}>
              <span className="text-emerald-500">[SYS]</span> Rendering Cybernetic Core Interface... OK
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}>
              <span className="text-violet-400">[READY]</span> Handing over control to User.
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: [0, 1, 0] }} 
              transition={{ duration: 0.5, repeat: Infinity, delay: 3.0 }}
              className="mt-4 w-4 h-6 bg-white"
            />
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <main className={`relative w-full ${view === 'core' ? 'h-screen overflow-hidden' : 'min-h-screen overflow-x-hidden'} bg-[#030205] text-white selection:bg-violet-500/30`}>
      {/* Dynamic Background Noise / Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(139,92,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      />

      <AnimatePresence mode="wait">
        {view === 'core' ? (
          <motion.div 
            key="core-view"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px) hue-rotate(-90deg)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px) hue-rotate(0deg)' }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px) brightness(2)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Interactive Particle Network Background */}
            <ParticleNetwork isLight={false} />

            {/* Laser Data Link from Core to Cursor */}
            {mounted && (
              <svg className="absolute inset-0 z-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                <defs>
                  <linearGradient id="laserGradient" x1="50%" y1="50%" x2={mouseActual.x} y2={mouseActual.y} gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <motion.line
                  x1={window.innerWidth / 2}
                  y1={window.innerHeight / 2}
                  x2={mouseActual.x}
                  y2={mouseActual.y}
                  stroke="url(#laserGradient)"
                  strokeWidth="2"
                  filter="url(#glow)"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </svg>
            )}

            {/* Top Bar for Core View */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center backdrop-blur-md">
                  <Terminal className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h1 className="text-sm font-bold font-mono text-violet-300">HANZALA.OS // v2.0.4</h1>
                  <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">System Online</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 flex items-center gap-2">
                  <motion.div 
                    animate={{ opacity: [1, 0.4, 1] }} 
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-emerald-400"
                  />
                  <span className="text-[10px] font-mono text-emerald-400">Core Stable</span>
                </div>
              </div>
            </div>

            {/* The Central Neural Core - 3D Tilt Container */}
            <motion.div 
              className="relative w-[600px] h-[600px] flex items-center justify-center"
              style={{
                perspective: 1000,
              }}
              animate={{
                rotateX: (mousePos.y / 20) * -20,
                rotateY: (mousePos.x / 20) * 20,
              }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            >
              {/* Pulsing center orb */}
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 60px rgba(139,92,246,0.2)',
                    '0 0 100px rgba(139,92,246,0.5)',
                    '0 0 60px rgba(139,92,246,0.2)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-32 h-32 rounded-full z-10 flex items-center justify-center backdrop-blur-xl border border-white/10"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(139,92,246,0.8), rgba(88,28,135,0.9))',
                }}
              >
                <Activity className="w-12 h-12 text-white opacity-80" />
              </motion.div>

              {/* Orbiting Rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute w-full h-full rounded-full border border-violet-500/10 border-dashed opacity-50"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[450px] h-[450px] rounded-full border border-pink-500/10 opacity-30"
              />

              {/* Orbital Nodes */}
              {CORE_NODES.map((node) => {
                const radius = 220
                // Calculate position on the circle
                const x = Math.cos((node.angle * Math.PI) / 180) * radius
                const y = Math.sin((node.angle * Math.PI) / 180) * radius

                return (
                  <motion.div
                    key={node.id}
                    className="absolute z-20 group cursor-pointer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      x, y
                    }}
                    transition={{ 
                      type: 'spring', 
                      damping: 12, 
                      stiffness: 100, 
                      delay: node.angle / 360 
                    }}
                    whileHover={{ scale: 1.15 }}
                    onClick={() => setViewState(node.id as ViewState)}
                  >
                    <div 
                      className="relative w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-xl border transition-all duration-300"
                      style={{
                        background: 'rgba(20,20,30,0.8)',
                        borderColor: `${node.color}40`,
                        boxShadow: `0 0 20px ${node.color}20`
                      }}
                    >
                      <node.icon 
                        className="w-6 h-6 transition-all duration-300"
                        style={{ color: node.color }}
                      />
                      
                      {/* Always Visible Label */}
                      <div className="absolute top-full mt-3 flex flex-col items-center pointer-events-none">
                        <span 
                          className="text-sm font-black tracking-wider whitespace-nowrap"
                          style={{ color: node.color }}
                        >
                          {node.title}
                        </span>
                        <span 
                          className="text-[9px] font-mono whitespace-nowrap opacity-60 uppercase"
                          style={{ color: node.color }}
                        >
                          {node.subtitle}
                        </span>
                      </div>

                      {/* Connection line to center */}
                      <motion.svg 
                        className="absolute top-1/2 left-1/2 -z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ overflow: 'visible' }}
                      >
                        <line 
                          x1="0" 
                          y1="0" 
                          x2={-x} 
                          y2={-y} 
                          stroke={node.color} 
                          strokeWidth="1" 
                          strokeDasharray="4 4"
                          opacity="0.3"
                        />
                      </motion.svg>
                    </div>
                  </motion.div>
                )
              })}
              {/* Helper CTA Text */}
              <motion.div 
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                animate={{ opacity: [0.4, 1, 0.4], y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="px-6 py-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex flex-col items-center gap-1">
                  <span className="text-sm font-bold tracking-widest uppercase text-white">Select a Module to Explore</span>
                  <span className="text-[10px] text-gray-400 font-mono">Click on Projects, Skills, or About</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Sidebar Data Rain (Left) */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-30 pointer-events-none mix-blend-screen">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-8 rounded-full bg-violet-500"
                  animate={{ height: [8, Math.random() * 40 + 10, 8], opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }}
                />
              ))}
            </div>

            {/* Sidebar Data Rain (Right) */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-end gap-2 opacity-30 pointer-events-none mix-blend-screen">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-8 rounded-full bg-emerald-500"
                  animate={{ height: [8, Math.random() * 40 + 10, 8], opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, delay: Math.random() }}
                />
              ))}
            </div>

            {/* Bottom Terminal Log */}
            <div className="absolute bottom-6 left-6 right-6 h-32 rounded-xl bg-black/40 border border-white/5 backdrop-blur-md p-4 overflow-hidden font-mono text-xs">
              <div className="flex items-center gap-2 mb-2 text-gray-400 border-b border-white/5 pb-2">
                <Terminal className="w-3 h-3" />
                <span>System Logs - Guide</span>
              </div>
              <div className="space-y-1 opacity-70">
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                  <span className="text-emerald-400">[OK]</span> Core matrices loaded successfully.
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}>
                  <span className="text-emerald-400">[HINT]</span> This is an interactive portfolio.
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }}>
                  <span className="text-violet-400">[INFO]</span> Please click on the floating "PROJECTS" or "SKILLS" nodes above to proceed.
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: [0, 1, 0] }} 
                  transition={{ duration: 1.5, repeat: Infinity, delay: 2 }}
                >
                  <span className="text-gray-500">_</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content-view"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px) hue-rotate(90deg)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px) hue-rotate(0deg)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px) hue-rotate(-90deg)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-h-screen bg-[#030205]"
          >
            {/* Minimal navbar specifically for sub-views */}
            <div className="sticky top-0 z-50 p-6 flex justify-between items-center pointer-events-none w-full">
              <motion.button
                onClick={() => {
                  window.scrollTo(0, 0)
                  setViewState('core')
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-wider">Return to Core</span>
              </motion.button>
            </div>

            {/* Render the actual selected section */}
            <div className="-mt-16 w-full">
               {renderContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}