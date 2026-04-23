'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Github, Linkedin, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // Navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pointer-events-auto"
        >
          <Link href="/" className="text-xl font-black font-syne tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-xs text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]">TS</div>
            <span className="hidden sm:inline">Talha.dev</span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            hidden md:flex items-center gap-1 p-1 rounded-2xl border pointer-events-auto transition-all duration-500
            ${scrolled ? 'bg-black/50 border-white/10 backdrop-blur-xl' : 'bg-transparent border-transparent'}
          `}
        >
          {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="px-5 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              {item}
            </button>
          ))}
        </motion.div>

        {/* Socials / Actions */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 pointer-events-auto"
        >
          <div className="hidden sm:flex items-center gap-2">
            {[
              { icon: Github, href: 'https://github.com/Talha-Shaikh1' },
              { icon: Linkedin, href: 'https://linkedin.com/in/talha-shaikh' }
            ].map((social, i) => (
              <a 
                key={i}
                href={social.href}
                target="_blank"
                className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                <social.icon className="w-4 h-4 text-gray-400" />
              </a>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
            className="px-6 py-2.5 rounded-xl bg-white text-black text-sm font-bold shadow-[0_8px_30px_rgb(255,255,255,0.2)]"
          >
            Hire Me
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 pointer-events-auto md:hidden backdrop-blur-3xl shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="w-full text-left px-4 py-3 rounded-xl text-lg font-bold hover:bg-white/5 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
