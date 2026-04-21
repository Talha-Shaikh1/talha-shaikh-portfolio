'use client'

import { motion } from 'framer-motion'

const orbs = [
  { size: 600, x: '10%', y: '15%', color: 'rgba(124,58,237,0.06)', duration: 18, delay: 0 },
  { size: 500, x: '75%', y: '5%',  color: 'rgba(219,39,119,0.05)', duration: 22, delay: 3 },
  { size: 700, x: '50%', y: '50%', color: 'rgba(99,102,241,0.04)', duration: 26, delay: 6 },
  { size: 400, x: '85%', y: '70%', color: 'rgba(236,72,153,0.05)', duration: 20, delay: 2 },
  { size: 450, x: '5%',  y: '75%', color: 'rgba(139,92,246,0.05)', duration: 24, delay: 8 },
]

export default function AmbientOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: 'blur(60px)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 40, -20, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  )
}
