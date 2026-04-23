'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface MagicCardProps {
  children: ReactNode
  className?: string
  borderColor?: string
  id?: string
}

export default function MagicCard({ children, className = '', borderColor = 'rgba(139, 92, 246, 0.5)', id }: MagicCardProps) {
  return (
    <div id={id} className={`group relative rounded-3xl bg-[#0a0a0f] border border-white/10 overflow-hidden ${className}`}>
      {/* Border Beam Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-0 w-24 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent blur-[1px]"
          style={{
            offsetPath: "inset(0 round 24px)",
            offsetRotate: "auto",
          }}
        />
      </div>

      {/* Inner Glow on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div 
          className="absolute inset-0 blur-3xl opacity-20"
          style={{ background: `radial-gradient(circle at center, ${borderColor}, transparent)` }}
        />
      </div>

      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  )
}
