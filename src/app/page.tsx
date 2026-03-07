// app/page.tsx
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Contact from '../components/Contact'

export default function Home() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden page-transition">
        {/* Animated background gradient mesh */}
        <motion.div
          className="fixed inset-0 pointer-events-none"
          style={{ y: backgroundY }}
        >
          <div className="gradient-mesh" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <Hero />
          <About />
          <Services />
          <Skills />
          <Projects />
          <Contact />
        </div>

        {/* Footer */}
        <footer className="relative py-12 border-t border-violet-500/10">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-sm font-mono text-gray-500">
              © {new Date().getFullYear()} Talha Shaikh. Crafted with{' '}
              <span className="text-pink-500">♥</span> and{' '}
              <span className="text-violet-500">⚡</span>
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}