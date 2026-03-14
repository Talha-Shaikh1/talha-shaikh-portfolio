'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Terminal, Code2, Bug } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'

export default function NotFound() {
  const [glitchText, setGlitchText] = useState('404')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Array<{ x: number; y: number; duration: number; delay: number; offsetY: number }>>([])
  const [sessionId, setSessionId] = useState('')

  // Generate random particles on mount
  const initializeParticles = useCallback(() => {
    const generatedParticles = Array.from({ length: 20 }, () => ({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      offsetY: Math.random() * -100 - 50,
    }))
    setParticles(generatedParticles)
    setSessionId(Math.random().toString(36).substring(7).toUpperCase())
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    initializeParticles()
  }, [initializeParticles])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const original = '404'
      const glitchChars = '!@#$%^&*<>?/\\'
      let iterations = 0
      
      const glitch = setInterval(() => {
        setGlitchText(
          original
            .split('')
            .map((char, index) => {
              if (index < iterations) return original[index]
              return glitchChars[Math.floor(Math.random() * glitchChars.length)]
            })
            .join('')
        )
        
        if (iterations >= original.length) {
          clearInterval(glitch)
          setGlitchText(original)
        }
        
        iterations += 1 / 3
      }, 30)
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  const codeLines = [
    { number: 1, code: 'const page = find("/wanted-page")', error: false },
    { number: 2, code: 'if (!page) {', error: false },
    { number: 3, code: '  throw new PageNotFoundError()', error: true },
    { number: 4, code: '}', error: false },
    { number: 5, code: '// Status: 404 - Page not found', error: false },
    { number: 6, code: '// Developer note: This route does not exist', error: false },
  ]

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `perspective(500px) rotateX(60deg) translateY(${mousePosition.y}px) translateX(${mousePosition.x}px)`,
            transformOrigin: 'center top',
          }}
        />
      </div>

      {/* Floating particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-violet-500/50 rounded-full"
          initial={{
            x: particle.x,
            y: particle.y,
          }}
          animate={{
            y: [null, particle.offsetY],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-4xl w-full">
          {/* Glitch 404 */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 
              className="text-[12rem] md:text-[18rem] font-black leading-none font-mono"
              style={{
                textShadow: `
                  2px 2px 0px rgba(139, 92, 246, 0.8),
                  -2px -2px 0px rgba(59, 130, 246, 0.8),
                  4px 4px 0px rgba(236, 72, 153, 0.6)
                `,
                letterSpacing: '-0.1em',
              }}
            >
              <span className="relative inline-block">
                {glitchText}
                <span 
                  className="absolute inset-0 opacity-50"
                  style={{
                    transform: 'translate(-2px, -2px)',
                    filter: 'blur(1px)',
                  }}
                >
                  {glitchText}
                </span>
              </span>
            </h1>
          </motion.div>

          {/* Error message */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Terminal className="w-6 h-6 text-violet-400" />
              <span className="text-violet-400 font-mono text-sm">ERROR: PAGE_NOT_FOUND</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Oops! This page seems to have wandered off.
            </h2>
            
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been moved. 
              Let&apos;s get you back on track.
            </p>
          </motion.div>

          {/* Code block */}
          <motion.div
            className="bg-[#0d1117] rounded-xl border border-gray-800 overflow-hidden mb-12 font-mono text-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-gray-800">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-gray-500 text-xs">error.log</span>
            </div>
            
            <div className="p-6 overflow-x-auto">
              {codeLines.map((line, index) => (
                <motion.div
                  key={line.number}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <span className="text-gray-600 select-none w-8 text-right">
                    {line.number}
                  </span>
                  <pre className={line.error ? 'text-red-400' : 'text-gray-300'}>
                    <code>{line.code}</code>
                  </pre>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Link
              href="/"
              className="group relative px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <Link
              href="/#projects"
              className="group px-8 py-4 bg-transparent border-2 border-gray-700 hover:border-violet-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                View Projects
              </span>
            </Link>

            <Link
              href="/#contact"
              className="group px-8 py-4 bg-transparent border-2 border-gray-700 hover:border-pink-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <Bug className="w-5 h-5" />
                Report Issue
              </span>
            </Link>
          </motion.div>

          {/* Easter egg */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <p className="text-gray-600 text-sm font-mono">
              Error Code: <span className="text-violet-500">404_NOT_FOUND</span>
              {' '}|{' '}
              Session: <span className="text-fuchsia-500">{sessionId}</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scanlines effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 92, 246, 0.1) 2px, rgba(139, 92, 246, 0.1) 4px)',
        }}
      />

      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  )
}
