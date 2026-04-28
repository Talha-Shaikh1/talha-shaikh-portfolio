'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { 
  Code2, 
  Cpu, 
  Globe, 
  Layers, 
  Terminal, 
  Zap, 
  Database, 
  Flame, 
  Cloud, 
  Lock, 
  Box, 
  Atom,
  Cpu as Chip,
  Binary,
  Code
} from 'lucide-react'

const icons = [
  { icon: Code2, color: '#60a5fa', name: 'React' },
  { icon: Chip, color: '#a78bfa', name: 'AI' },
  { icon: Globe, color: '#34d399', name: 'Web' },
  { icon: Layers, color: '#f472b6', name: 'Stack' },
  { icon: Terminal, color: '#fbbf24', name: 'Bash' },
  { icon: Zap, color: '#818cf8', name: 'Fast' },
  { icon: Database, color: '#4ade80', name: 'SQL' },
  { icon: Flame, color: '#f87171', name: 'Hot' },
  { icon: Cloud, color: '#38bdf8', name: 'Docker' },
  { icon: Lock, color: '#fb7185', name: 'Secure' },
  { icon: Box, color: '#fb923c', name: 'Pack' },
  { icon: Atom, color: '#22d3ee', name: 'Next' }
]

export default function IconCloud() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Mouse tracking for 3D tilt
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex items-center justify-center perspective-1000 group/container"
    >
      {/* 3D Tilting Frame */}
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Holographic Background Grid */}
        <div className="absolute inset-0 opacity-10 group-hover/container:opacity-20 transition-opacity duration-700 pointer-events-none">
           <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        {/* Orbiting Rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full border border-violet-500/10 pointer-events-none"
            style={{
              width: typeof window !== 'undefined' && window.innerWidth < 768 ? 180 + i * 40 : 250 + i * 60,
              height: typeof window !== 'undefined' && window.innerWidth < 768 ? 180 + i * 40 : 250 + i * 60,
              transformStyle: 'preserve-3d',
            }}
            animate={{ 
              rotateX: [0, 360],
              rotateY: [360, 0],
              rotateZ: [0, 360]
            }}
            transition={{
              duration: 20 + i * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Floating Icons Cloud */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
          {icons.map((item, i) => {
            const angle = (i / icons.length) * (2 * Math.PI)
            const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 90 : 130
            
            return (
              <motion.div
                key={i}
                className="absolute p-4 rounded-2xl bg-white/10 border border-white/10 flex flex-col items-center justify-center shadow-lg group cursor-pointer"
                style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                initial={{ 
                  x: Math.cos(angle) * radius, 
                  y: Math.sin(angle) * radius,
                  z: Math.random() * 200 - 100,
                  opacity: 0
                }}
                animate={{
                  x: [
                    Math.cos(angle) * radius,
                    Math.cos(angle + Math.PI * 2) * radius
                  ],
                  y: [
                    Math.sin(angle) * radius,
                    Math.sin(angle + Math.PI * 2) * radius
                  ],
                  z: [Math.random() * 80, Math.random() * -80, Math.random() * 80],
                  opacity: [0.4, 1, 0.4],
                  scale: [0.9, 1.1, 0.9]
                }}
                transition={{
                  duration: 12 + i,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.2
                }}
                whileHover={{ scale: 1.3, z: 100, transition: { duration: 0.2 } }}
              >
                <item.icon className="w-8 h-8 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all" style={{ color: item.color }} />
                
                {/* Floating Tooltip/Name */}
                <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-white/50 uppercase tracking-widest whitespace-nowrap">
                   {item.name}
                </span>

                {/* Individual Icon Glow */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none scale-150"
                  style={{ background: `radial-gradient(circle at center, ${item.color} 0%, transparent 70%)` }}
                />
              </motion.div>
            )
          })}

          {/* Core System Heartbeat */}
          <div className="absolute w-24 h-24 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            <motion.div 
              className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.3)_0%,transparent_70%)]"
              style={{ willChange: 'transform, opacity' }}
              animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative w-16 h-16 rounded-full border border-violet-500/20 bg-black/40 flex items-center justify-center overflow-hidden">
               <motion.div 
                 className="absolute inset-0 bg-gradient-to-t from-violet-500/50 to-transparent"
                 animate={{ y: ["100%", "-100%"] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               />
               <Binary className="w-6 h-6 text-violet-400 opacity-50" />
            </div>
          </div>
        </div>

        {/* Data Particles / Meteors */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-20"
            initial={{ 
              x: Math.random() * 600 - 300, 
              y: Math.random() * 600 - 300, 
              z: -500 
            }}
            animate={{ 
              z: [ -500, 500 ],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
