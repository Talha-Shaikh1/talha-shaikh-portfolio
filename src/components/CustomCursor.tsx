'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const cursorSpringX = useSpring(cursorX, springConfig)
  const cursorSpringY = useSpring(cursorY, springConfig)
  
  const dotSpringConfig = { damping: 30, stiffness: 500, mass: 0.3 }
  const dotSpringX = useSpring(dotX, dotSpringConfig)
  const dotSpringY = useSpring(dotY, dotSpringConfig)

  useEffect(() => {
    // Check if device is touch-based
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    // Add hover listeners for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, [data-cursor="hover"]')
      
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true))
        el.addEventListener('mouseleave', () => setIsHovering(false))
      })
    }

    window.addEventListener('mousemove', updateCursor)
    window.addEventListener('mouseleave', handleMouseLeave)
    
    // Initial setup
    addHoverListeners()

    // Re-setup listeners when DOM changes
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      window.removeEventListener('mouseleave', handleMouseLeave)
      observer.disconnect()
    }
  }, [cursorX, cursorY, dotX, dotY])

  // Don't render on touch devices
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  if (isTouchDevice) return null

  return (
    <>
      {/* Outer cursor ring */}
      <motion.div
        className="custom-cursor"
        style={{
          x: cursorSpringX,
          y: cursorSpringY,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.5 : 1,
        }}
      />
      
      {/* Inner dot */}
      <motion.div
        className="custom-cursor-dot"
        style={{
          x: dotSpringX,
          y: dotSpringY,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  )
}
