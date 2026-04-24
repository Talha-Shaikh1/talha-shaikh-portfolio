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
  Cpu,
  Mail,
  Smartphone,
  MessageSquare
} from 'lucide-react'

// Import components
import Navbar from '../../components/Navbar'
import AmbientOrbs from '../../components/AmbientOrbs'
import MagicCard from '../../components/MagicCard'
import IconCloud from '../../components/IconCloud'
import Projects from '../../components/Projects'
import ContactForm from '../../components/ContactForm'
import { hanzalaData } from '../../lib/data'

export default function HanzalaPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDownloadResume = () => {
    window.open('/resume-hanzala', '_blank')
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
            <MagicCard className="p-6 md:p-10 lg:p-14 min-h-[450px] flex flex-col justify-center border-violet-500/30">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-violet-400 uppercase tracking-widest font-bold">
                      Available for Projects
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20">
                    <Cpu className="w-3 h-3 text-fuchsia-400" />
                    <span className="text-[10px] font-mono text-fuchsia-400 uppercase tracking-widest font-bold">
                      AI Specialist
                    </span>
                  </div>
                </div>

                <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-6 leading-none">
                  {hanzalaData.firstName} <br />
                  <span className="bg-gradient-to-r from-violet-400 via-pink-500 to-fuchsia-600 bg-clip-text text-transparent">{hanzalaData.lastName}</span>
                </h1>

                <p className="text-xl text-gray-400 font-medium max-w-xl leading-relaxed mb-10">
                  {hanzalaData.role}. <br />
                  <span className="text-white">Building intelligent systems that push the boundaries of the web.</span>
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownloadResume}
                    className="px-8 py-4 rounded-2xl bg-white text-black font-bold flex items-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                  >
                    <Download className="w-5 h-5" />
                    Download CV
                  </motion.button>
                  <div className="flex items-center gap-2">
                    {[
                      { icon: Github, href: hanzalaData.github },
                      { icon: Linkedin, href: hanzalaData.linkedin }
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
                  <h2 className="text-lg font-bold uppercase tracking-widest font-syne">Vision</h2>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {hanzalaData.bio}
                </p>
              </MagicCard>

              {/* Experience Bento */}
              <MagicCard className="p-8" id="experience">
                <div className="flex items-center gap-3 mb-6">
                  <Briefcase className="w-5 h-5 text-violet-500" />
                  <h2 className="text-lg font-bold uppercase tracking-widest font-syne">Track Record</h2>
                </div>
                <div className="space-y-4">
                  {hanzalaData.experience.map((exp, i) => (
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
                  <span className="text-xs font-bold uppercase tracking-widest font-syne">Intelligence Stack</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest">Neural Link Active</span>
                </div>
              </div>
              <IconCloud />
            </MagicCard>

            {/* Profile / Stats Bento */}
            <MagicCard className="p-8 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-3xl border border-white/10 p-2 relative group mb-6">
                <div className="absolute inset-0 bg-fuchsia-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center text-4xl font-black relative z-10">
                  HQ
                </div>
              </div>
              <h3 className="text-xl font-bold font-syne mb-1">{hanzalaData.location}</h3>
              <p className="text-xs text-gray-500 font-mono mb-8 uppercase tracking-widest">Autonomous Agent Ready</p>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-1">
                  <span className="text-3xl font-black font-syne">{hanzalaData.stats.projects}</span>
                  <span className="text-[10px] text-gray-500 uppercase font-mono tracking-tighter">Deploys</span>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-1">
                  <span className="text-3xl font-black font-syne">{hanzalaData.stats.commits}</span>
                  <span className="text-[10px] text-gray-500 uppercase font-mono tracking-tighter">Optimizations</span>
                </div>
              </div>
            </MagicCard>
          </div>

          {/* PROJECTS SECTION - FULL WIDTH */}
          <div className="lg:col-span-12 mt-12" id="projects">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-5xl font-black font-syne tracking-tighter">REVOLUTIONARY <span className="text-fuchsia-500">ENGINES</span></h2>
                <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em] mt-3">Scaling intelligence through code</p>
              </div>
              <motion.a
                href={hanzalaData.github}
                target="_blank"
                className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
              >
                OPEN SOURCE REPOS <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
            <Projects />
          </div>

          {/* CONTACT SECTION */}
          <div className="lg:col-span-12 mt-24 py-24 border-t border-white/5" id="contact">
            <div className="text-center mb-16">
              <h2 className="text-5xl lg:text-7xl font-black font-syne tracking-tighter uppercase mb-4">
                Let's Build the <span className="text-violet-500">Future</span> Together
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8">
                Hanzala is currently accepting high-impact projects. Reach out to start a collaboration.
              </p>
              <div className="flex justify-center mb-12">
                <motion.a
                  href={hanzalaData.whatsapp}
                  target="_blank"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-2xl bg-violet-600 text-white font-black flex items-center gap-3 shadow-[0_20px_40px_rgba(124,58,237,0.3)]"
                >
                  <MessageSquare className="w-5 h-5" />
                  Direct Neural Link (WhatsApp)
                </motion.a>
              </div>
            </div>
            <ContactForm />
          </div>

        </div>

        <footer className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
          <p className="text-[10px] font-mono uppercase tracking-[0.5em]">{hanzalaData.name} © 2024</p>
          <div className="flex items-center gap-8">
            <span className="text-[10px] font-mono uppercase tracking-widest">Built with Next.js 15 & AgentOS</span>
            <span className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-3 h-3 text-fuchsia-500" /> Neural System Active
            </span>
          </div>
        </footer>
      </div>
    </main>
  )
}
