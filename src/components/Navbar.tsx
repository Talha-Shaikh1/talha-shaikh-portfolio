'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, Home, User, Code, Briefcase, Mail, Moon, Sun, Sparkles } from 'lucide-react'
import { useTheme } from 'next-themes'

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Services', href: '#services', icon: Code },
  { name: 'Skills', href: '#skills', icon: Code },
  { name: 'Projects', href: '#projects', icon: Briefcase },
  { name: 'Contact', href: '#contact', icon: Mail },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })
  
  const navOpacity = useTransform(scrollY, [0, 100], [0, 1])
  const navBlur = useTransform(scrollY, [0, 100], [0, 20])
  const navY = useTransform(scrollY, [0, 100], [-100, 0])

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navItems.map(item => item.href.replace('#', ''))
      const current = sections.find(section => {
        const el = document.getElementById(section === 'home' ? '' : section)
        if (el) {
          const rect = el.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })
      if (current) setActiveSection(current === '' ? 'home' : current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setIsOpen(false)
    if (href === '/') { 
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return 
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const isLight = theme === 'light'

  if (!mounted) return null

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #7c3aed, #ec4899, #7c3aed)',
          backgroundSize: '200% 100%',
        }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          opacity: navOpacity,
          y: navY,
        }}
      >
        {/* Main nav container */}
        <div
          className="max-w-6xl mx-auto px-6 mt-4"
        >
          <div
            className="flex justify-between items-center h-16 rounded-2xl transition-all duration-500"
            style={{
              background: scrolled
                ? isLight
                  ? 'rgba(248,247,255,0.85)'
                  : 'rgba(5,5,8,0.85)'
                : 'transparent',
              backdropFilter: scrolled ? 'blur(20px)' : 'none',
              border: scrolled
                ? `1px solid ${isLight ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.12)'}`
                : '1px solid transparent',
              boxShadow: scrolled
                ? isLight
                  ? '0 4px 30px rgba(109,40,217,0.08)'
                  : '0 4px 30px rgba(0,0,0,0.3)'
                : 'none',
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
            }}
          >
            {/* Logo */}
            <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2"
              >
                {/* Logo icon */}
                <motion.div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                    boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
                  }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <span className="text-white font-black text-sm">TS</span>
                </motion.div>
                
                <div className="flex items-center">
                  <span
                    className="text-xl font-black tracking-tight"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      background: 'linear-gradient(135deg, #a78bfa, #ec4899)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Hanzala
                  </span>
                  <span
                    className="text-xl font-black tracking-tight ml-1"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      color: isLight ? '#0f0a1e' : '#ffffff',
                    }}
                  >
                    Shaikh
                  </span>
                </div>
                
                {/* Animated dot */}
                <motion.span
                  className="w-2 h-2 rounded-full bg-violet-400 ml-1 mt-1"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.5, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(139,92,246,0.4)',
                      '0 0 10px 5px rgba(139,92,246,0)',
                      '0 0 0 0 rgba(139,92,246,0)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(item => {
                const isActive = activeSection === item.href.replace('#', '') || (item.href === '/' && activeSection === 'home')
                const Icon = item.icon

                return (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: isActive
                        ? isLight ? '#7c3aed' : '#a78bfa'
                        : isLight ? '#6b7280' : '#9ca3af',
                      background: isActive
                        ? isLight ? 'rgba(124,58,237,0.1)' : 'rgba(124,58,237,0.15)'
                        : 'transparent',
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="navActive"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <motion.button
                whileHover={{ scale: 1.08, rotate: 15 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setTheme(isLight ? 'dark' : 'light')}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: isLight ? 'rgba(124,58,237,0.08)' : 'rgba(124,58,237,0.12)',
                  border: `1px solid ${isLight ? 'rgba(124,58,237,0.2)' : 'rgba(124,58,237,0.25)'}`,
                }}
              >
                <AnimatePresence mode="wait">
                  {isLight ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="w-4 h-4 text-violet-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className="w-4 h-4 text-yellow-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Hire me button — desktop */}
              <motion.a
                href="#contact"
                onClick={e => { e.preventDefault(); scrollToSection('#contact') }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold relative overflow-hidden group"
                style={{ 
                  fontFamily: "'DM Sans', sans-serif",
                  background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                  boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
                }}
              >
                <motion.span
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, #6d28d9, #be185d)' }}
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Hire Me
                </span>
              </motion.a>

              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(124,58,237,0.08)',
                  border: '1px solid rgba(124,58,237,0.2)',
                  color: isLight ? '#7c3aed' : '#a78bfa',
                }}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="x"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden"
            >
              <div
                className="mx-4 mt-2 px-6 py-4 rounded-2xl space-y-1"
                style={{
                  background: isLight ? 'rgba(248,247,255,0.97)' : 'rgba(5,5,8,0.97)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${isLight ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.12)'}`,
                }}
              >
                {navItems.map((item, i) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.href.replace('#', '') || (item.href === '/' && activeSection === 'home')

                  return (
                    <motion.button
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ x: 8 }}
                      onClick={() => scrollToSection(item.href)}
                      className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-left transition-all duration-200"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        color: isActive ? '#7c3aed' : isLight ? '#6b7280' : '#9ca3af',
                        background: isActive ? 'rgba(124,58,237,0.1)' : 'transparent',
                      }}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {item.name}
                      {isActive && (
                        <motion.div
                          className="ml-auto w-2 h-2 rounded-full"
                          style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}
                          layoutId="mobileActive"
                        />
                      )}
                    </motion.button>
                  )
                })}

                {/* Mobile bottom CTA */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pt-3 mt-3"
                  style={{ borderTop: `1px solid ${isLight ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.12)'}` }}
                >
                  <button
                    onClick={() => scrollToSection('#contact')}
                    className="w-full py-3.5 rounded-xl text-white text-sm font-semibold relative overflow-hidden"
                    style={{ 
                      fontFamily: "'DM Sans', sans-serif",
                      background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                    }}
                  >
                    <span className="relative flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Let's Work Together
                    </span>
                  </button>
                  <p
                    className="text-center text-xs mt-3 font-mono"
                    style={{ color: isLight ? '#9ca3af' : '#4b5563' }}
                  >
                    hanzala.dev
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer for fixed nav */}
      <div className="h-20" />
    </>
  )
}
