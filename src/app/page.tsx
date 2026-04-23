'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  User,
  Briefcase,
  Github,
  Linkedin,
  Zap,
  Download,
  Activity,
  ArrowRight,
} from 'lucide-react'



// Import components
import Navbar from '../components/Navbar'
import AmbientOrbs from '../components/AmbientOrbs'
import MagicCard from '../components/MagicCard'
import IconCloud from '../components/IconCloud'
import Projects from '../components/Projects'
import ContactForm from '../components/ContactForm'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDownloadResume = () => {
    window.open('/resume', '_blank')
  }

  if (!mounted) return null

  return (
    <main className="relative min-h-screen bg-[#030303] text-white selection:bg-violet-500/30 overflow-x-hidden font-inter">
      <Navbar />
      <AmbientOrbs />

      {/* Grainy Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-[90]" />

      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* HERO SECTION - BENTO STYLE */}
          <div className="lg:col-span-8 space-y-6">

            {/* Main Intro Card */}
            <MagicCard className="p-6 md:p-10 lg:p-14 min-h-[450px] flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-violet-400 uppercase tracking-widest font-bold">
                      Available for Hire
                    </span>
                  </div>
                </div>

                <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-6 leading-none">
                  Talha <br />
                  <span className="bg-gradient-to-r from-violet-400 via-pink-500 to-violet-600 bg-clip-text text-transparent">Shaikh</span>
                </h1>

                <p className="text-xl text-gray-400 font-medium max-w-xl leading-relaxed mb-10">
                  Full Stack Developer & AI Automation Engineer. <br />
                  <span className="text-white">Crafting high-performance web systems and autonomous AI agents.</span>
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownloadResume}
                    className="px-8 py-4 rounded-2xl bg-white text-black font-bold flex items-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                  >
                    <Download className="w-5 h-5" />
                    Get Resume
                  </motion.button>
                  <div className="flex items-center gap-2">
                    {[
                      { icon: Github, href: 'https://github.com/Talha-Shaikh1' },
                      { icon: Linkedin, href: 'https://linkedin.com/in/talha-shaikh' }
                    ].map((social, i) => (
                      <motion.a
                        key={i}
                        href={social.href}
                        target="_blank"
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.05)' }}
                        className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center transition-colors"
                      >
                        <social.icon className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </MagicCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Biography Bento */}
              <MagicCard className="p-8" id="about">
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-5 h-5 text-violet-500" />
                  <h2 className="text-lg font-bold uppercase tracking-widest font-syne">Biography</h2>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  I'm a self-taught developer exploring the intersection of modern web tech and AI. My journey is fueled by a passion for building practical solutions—from clean full-stack apps to experimental AI agents. I focus on learning fast, writing clean code, and contributing to projects that challenge me to grow every day.
                </p>
              </MagicCard>

              {/* Experience Bento */}
              <MagicCard className="p-8" id="experience">
                <div className="flex items-center gap-3 mb-6">
                  <Briefcase className="w-5 h-5 text-violet-500" />
                  <h2 className="text-lg font-bold uppercase tracking-widest font-syne">Experience</h2>
                </div>
                <div className="space-y-4">
                  {[
                    { role: 'Learning AI & Modern Web', company: 'Self-Directed', date: '2024 - Present' },
                    { role: 'Full Stack Projects', company: 'Personal Portfolio', date: '2023 - 2024' },
                    { role: 'Frontend Explorer', company: 'Open Source', date: '2022 - 2023' }
                  ].map((exp, i) => (
                    <div key={i} className="flex justify-between items-center group/item">
                      <div>
                        <h4 className="text-sm font-bold group-hover/item:text-violet-400 transition-colors">{exp.role}</h4>
                        <p className="text-[10px] text-gray-500 font-mono">{exp.company}</p>
                      </div>
                      <span className="text-[10px] font-mono text-gray-600">{exp.date}</span>
                    </div>
                  ))}
                </div>
              </MagicCard>
            </div>
          </div>

          {/* SIDEBAR - ICON CLOUD & METRICS */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tech Cloud Bento */}
            <MagicCard className="h-[350px] md:h-[400px] flex flex-col items-center justify-center p-6 md:p-8 bg-gradient-to-b from-[#0a0a0f] to-[#030303]" id="skills">
              <div className="absolute top-8 left-8 flex items-center justify-between w-[calc(100%-64px)]">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-violet-500" />
                  <span className="text-xs font-bold uppercase tracking-widest font-syne">Stack</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest">Live Connection</span>
                </div>
              </div>
              <IconCloud />
            </MagicCard>

            {/* Profile / Stats Bento */}
            <MagicCard className="p-8 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-3xl border border-white/10 p-2 relative group mb-6">
                <div className="absolute inset-0 bg-violet-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <img
                  src="/ogImage.png"
                  alt="Talha"
                  className="w-full h-full rounded-2xl object-cover relative z-10"
                />
              </div>
              <h3 className="text-xl font-bold font-syne mb-1">Karachi, Pakistan</h3>
              <p className="text-xs text-gray-500 font-mono mb-8 uppercase tracking-widest">Available Remotely</p>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-1">
                  <span className="text-3xl font-black font-syne">30+</span>
                  <span className="text-[10px] text-gray-500 uppercase font-mono tracking-tighter">Projects</span>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-1">
                  <span className="text-3xl font-black font-syne">500+</span>
                  <span className="text-[10px] text-gray-500 uppercase font-mono tracking-tighter">Commits</span>
                </div>
              </div>
            </MagicCard>
          </div>

          {/* PROJECTS SECTION - FULL WIDTH */}
          <div className="lg:col-span-12 mt-12" id="projects">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-5xl font-black font-syne tracking-tighter">SELECTED <span className="text-violet-500">WORKS</span></h2>
                <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em] mt-3">Architecting digital excellence</p>
              </div>
              <motion.a
                href="https://github.com/Talha-Shaikh1"
                target="_blank"
                className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
              >
                VIEW GITHUB <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
            <Projects />
          </div>

          {/* CONTACT SECTION */}
          <div className="lg:col-span-12 mt-24 py-24 border-t border-white/5" id="contact">
            <div className="text-center mb-16">
              <h2 className="text-5xl lg:text-7xl font-black font-syne tracking-tighter uppercase mb-4">
                Ready to bring your <span className="text-violet-500">ideas</span> to life?
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8">
                I'm a passionate developer always looking for new challenges and opportunities to learn and grow.
              </p>
              <div className="flex justify-center mb-12">
                <motion.a
                  href="https://wa.me/923121964939"
                  target="_blank"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-2xl bg-emerald-600 text-white font-black flex items-center gap-3 shadow-[0_20px_40px_rgba(16,185,129,0.2)]"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.316 1.592 5.43.003 9.85-4.415 9.854-9.845.002-5.43-4.415-9.851-9.841-9.851-5.429 0-9.848 4.421-9.85 9.85-.001 2.124.582 3.303 1.691 5.224l-.898 3.289 3.228-.851zM10.515 8.039c-.195-.433-.4-.442-.585-.45l-.497-.006c-.171 0-.45.064-.685.318-.235.253-.897.876-.897 2.138 0 1.262.919 2.48 1.046 2.649.127.17 1.809 2.762 4.383 3.87.621.266 1.105.423 1.485.544.624.198 1.192.171 1.641.103.501-.075 1.539-.628 1.756-1.235.217-.607.217-1.126.152-1.235-.065-.109-.239-.175-.506-.308-.268-.134-1.585-.781-1.831-.871-.246-.09-.426-.134-.606.134-.18.269-.696.871-.853 1.05-.157.179-.313.201-.58.067-.267-.134-1.128-.417-2.148-1.326-.793-.707-1.329-1.581-1.485-1.848-.156-.267-.017-.411.117-.544.121-.12.268-.314.401-.471.134-.157.179-.269.268-.449.09-.179.045-.336-.022-.471-.067-.134-.585-1.408-.802-1.921z" /></svg>
                  Chat on WhatsApp
                </motion.a>
              </div>
            </div>
            <ContactForm />
          </div>

        </div>

        <footer className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
          <p className="text-[10px] font-mono uppercase tracking-[0.5em]">Talha Shaikh © 2024</p>
          <div className="flex items-center gap-8">
            <span className="text-[10px] font-mono uppercase tracking-widest">Built with Next.js & Framer Motion</span>
            <span className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-3 h-3 text-emerald-500" /> System Active
            </span>
          </div>
        </footer>
      </div>
    </main>
  )
}