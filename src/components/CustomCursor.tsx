'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

interface TrailPoint {
  x: number
  y: number
  id: number
}

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const trailIdRef = useRef(0)

  const cursorX = useMotionValue(-200)
  const cursorY = useMotionValue(-200)

  // Outer ring follows with spring lag
  const ringX = useSpring(cursorX, { stiffness: 200, damping: 28 })
  const ringY = useSpring(cursorY, { stiffness: 200, damping: 28 })

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)

      // Add trail point
      const id = ++trailIdRef.current
      setTrail(prev => [...prev.slice(-10), { x: e.clientX, y: e.clientY, id }])
    }

    const onLeave = () => setIsVisible(false)
    const onEnter = () => setIsVisible(true)
    const onDown = () => setIsClicking(true)
    const onUp = () => setIsClicking(false)

    const handleHoverOn = () => setIsHovering(true)
    const handleHoverOff = () => setIsHovering(false)

    const attachHover = () => {
      document.querySelectorAll('a, button, input, textarea, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', handleHoverOn)
        el.addEventListener('mouseleave', handleHoverOff)
      })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('mouseenter', onEnter)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    attachHover()

    const observer = new MutationObserver(attachHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      observer.disconnect()
    }
  }, [cursorX, cursorY])

  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  if (isTouchDevice) return null

  return (
    <>
      {/* Trail dots */}
      {trail.map((point, i) => {
        const opacity = ((i + 1) / trail.length) * 0.35
        const size = ((i + 1) / trail.length) * 8
        return (
          <motion.div
            key={point.id}
            className="fixed pointer-events-none z-[99998] rounded-full"
            initial={{ opacity, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              left: point.x - size / 2,
              top: point.y - size / 2,
              width: size,
              height: size,
              background: 'radial-gradient(circle, rgba(167,139,250,0.8) 0%, rgba(236,72,153,0.4) 100%)',
            }}
          />
        )
      })}

      {/* Outer glow ring */}
      <motion.div
        className="fixed pointer-events-none z-[99999] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isClicking ? 24 : isHovering ? 44 : 32,
          height: isClicking ? 24 : isHovering ? 44 : 32,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        {/* Rotating gradient border */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, #7c3aed, #ec4899, #7c3aed)',
            padding: '1.5px',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{ background: isHovering ? 'rgba(124,58,237,0.15)' : 'transparent' }}
          />
        </motion.div>

        {/* Glow bloom */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isHovering
              ? '0 0 20px rgba(139,92,246,0.6), 0 0 40px rgba(236,72,153,0.3)'
              : '0 0 10px rgba(139,92,246,0.3)',
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Inner precision dot */}
      <motion.div
        className="fixed pointer-events-none z-[99999] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          width: isClicking ? 3 : 4,
          height: isClicking ? 3 : 4,
          background: '#ec4899',
          boxShadow: '0 0 6px rgba(236,72,153,0.8)',
        }}
      />
    </>
  )
}
