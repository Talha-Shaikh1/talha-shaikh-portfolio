// app/page.tsx
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Contact from '../components/Contact'

export default function Home() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-black overflow-hidden">
        {/* Animated background gradient */}
        <motion.div 
          className="fixed inset-0 pointer-events-none"
          style={{ y: backgroundY }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.1),transparent_50%)]" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <div className="pt-16 md:pt-20">
            <Hero />
          </div>
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </main>
    </>
  )
}