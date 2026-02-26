'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, Home, User, Code, Briefcase, Mail, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '#about', icon: User },
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

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 30)

      const sections = navItems.map(item => item.href.replace('#', ''))
      const current = sections.find(section => {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          return rect.top <= 120 && rect.bottom >= 120
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setIsOpen(false)
    if (href === '/') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const isLight = theme === 'light'

  if (!mounted) return null

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled
            ? isLight
              ? 'rgba(248,247,255,0.88)'
              : 'rgba(5,5,8,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? isLight
              ? '1px solid rgba(139,92,246,0.15)'
              : '1px solid rgba(139,92,246,0.12)'
            : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Scrolled top glow line */}
        {scrolled && (
          <div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)' }}
          />
        )}

        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16 md:h-[68px]">

            {/* Logo */}
            <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-1"
              >
                <span
                  className="text-2xl font-black tracking-tighter"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    background: 'linear-gradient(to right, #a78bfa, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Talha
                </span>
                <span
                  className="text-2xl font-black tracking-tighter"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    color: isLight ? '#0f0a1e' : '#ffffff',
                  }}
                >
                  Shaikh
                </span>
                {/* Animated dot */}
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-violet-400 ml-0.5 mt-1 self-start"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(item => {
                const isActive =
                  activeSection === item.href.replace('#', '') ||
                  (item.href === '/' && activeSection === 'home')
                const Icon = item.icon

                return (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: isActive
                        ? '#a78bfa'
                        : isLight
                        ? '#6b7280'
                        : '#9ca3af',
                      background: isActive
                        ? 'rgba(139,92,246,0.1)'
                        : 'transparent',
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.name}

                    {/* Active underline */}
                    {isActive && (
                      <motion.div
                        layoutId="navActive"
                        className="absolute bottom-1 left-3 right-3 h-[1.5px] rounded-full"
                        style={{ background: 'linear-gradient(to right, #a78bfa, #ec4899)' }}
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
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setTheme(isLight ? 'dark' : 'light')}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200"
                style={{
                  background: isLight ? 'rgba(139,92,246,0.08)' : 'rgba(255,255,255,0.05)',
                  border: isLight ? '1px solid rgba(139,92,246,0.2)' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <AnimatePresence mode="wait">
                  {isLight ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-4 h-4 text-violet-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-4 h-4 text-yellow-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Hire me pill — desktop */}
              <motion.a
                href="#contact"
                onClick={e => { e.preventDefault(); scrollToSection('#contact') }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-sm font-semibold relative overflow-hidden"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <span
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to right, #7c3aed, #db2777)' }}
                />
                <span className="relative flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  Hire Me
                </span>
              </motion.a>

              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(139,92,246,0.08)',
                  border: '1px solid rgba(139,92,246,0.2)',
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
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
              style={{
                background: isLight ? 'rgba(248,247,255,0.97)' : 'rgba(5,5,8,0.97)',
                backdropFilter: 'blur(20px)',
                borderTop: isLight
                  ? '1px solid rgba(139,92,246,0.12)'
                  : '1px solid rgba(139,92,246,0.1)',
              }}
            >
              <div className="px-6 py-4 space-y-1">
                {navItems.map((item, i) => {
                  const Icon = item.icon
                  const isActive =
                    activeSection === item.href.replace('#', '') ||
                    (item.href === '/' && activeSection === 'home')

                  return (
                    <motion.button
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ x: 6 }}
                      onClick={() => scrollToSection(item.href)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-colors duration-150"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        color: isActive ? '#a78bfa' : isLight ? '#6b7280' : '#9ca3af',
                        background: isActive ? 'rgba(139,92,246,0.08)' : 'transparent',
                      }}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {item.name}
                      {isActive && (
                        <div
                          className="ml-auto w-1 h-1 rounded-full"
                          style={{ background: '#a78bfa' }}
                        />
                      )}
                    </motion.button>
                  )
                })}

                {/* Mobile bottom */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="pt-3 mt-2"
                  style={{ borderTop: '1px solid rgba(139,92,246,0.1)' }}
                >
                  <button
                    onClick={() => scrollToSection('#contact')}
                    className="w-full py-3 rounded-xl text-white text-sm font-semibold relative overflow-hidden"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to right, #7c3aed, #db2777)' }}
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                      Let's Work Together
                    </span>
                  </button>
                  <p
                    className="text-center text-xs mt-3 font-mono"
                    style={{ color: isLight ? '#9ca3af' : '#4b5563' }}
                  >
                    talha.dev
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Font import — no styled-jsx */}
      <style dangerouslySetInnerHTML={{
        __html: "@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');"
      }} />
    </>
  )
}