'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Globe, MapPin, ExternalLink, Printer, Phone } from 'lucide-react'

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-white text-black font-inter selection:bg-gray-100 relative z-[99999] cursor-default">
      
      {/* Aggressive Style Fixes to kill the dark theme and custom cursor */}
      <style jsx global>{`
        /* Kill Custom Cursor & Dark Elements */
        #cursor, .cursor-dot, .cursor-outline, .ambient-orbs, .noise-overlay, nav, footer, .chat-widget, .agent-os {
          display: none !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
        
        /* Force Default Cursor and White Background */
        html, body {
          background-color: white !important;
          color: black !important;
          cursor: default !important;
          overflow: auto !important;
          height: auto !important;
        }

        /* Ensure all interactive elements show pointer */
        a, button {
          cursor: pointer !important;
        }

        @media print {
          @page {
            size: A4;
            margin: 0mm !important;
          }
          body {
            background-color: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-button {
            display: none !important;
          }
          /* Add padding to the content since page margin is 0 */
          .resume-container {
            padding: 15mm !important;
          }
        }
      `}</style>

      {/* Print Button (Hidden on Print) */}
      <div className="fixed top-8 right-8 print:hidden z-[100000] print-button">
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-bold shadow-2xl hover:scale-105 transition-transform cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Save as PDF
        </button>
      </div>

      {/* Main Resume Content */}
      <div className="max-w-[850px] mx-auto bg-white p-10 md:p-16 print:p-0 print:max-w-full resume-container">
        {/* Header */}
        <header className="border-b-2 border-black pb-8 mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase mb-2">Talha Shaikh</h1>
            <p className="text-xl font-medium text-gray-600">Full Stack Developer & AI Automation Enthusiast</p>
          </div>
          <div className="text-right text-[11px] font-mono space-y-0.5">
            <p className="flex items-center justify-end gap-2"><MapPin className="w-3 h-3" /> Karachi, Pakistan</p>
            <p className="flex items-center justify-end gap-2"><Mail className="w-3 h-3" /> talha369852@gmail.com</p>
            <p className="flex items-center justify-end gap-2 text-emerald-700 font-bold tracking-tight"><Phone className="w-3 h-3" /> +92 312 1964939</p>
            <p className="flex items-center justify-end gap-2"><Globe className="w-3 h-3" /> talhaweb.xyz</p>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-12">
          {/* Left Column */}
          <div className="col-span-8 space-y-10">
            <section>
              <h2 className="text-[11px] font-black uppercase tracking-widest border-b border-gray-200 pb-2 mb-4">Professional Summary</h2>
              <p className="text-gray-700 leading-relaxed text-[14px]">
                Self-driven Developer specializing in building scalable web applications and intelligent AI solutions. 
                Expertise in Next.js, TypeScript, and Python. Dedicated to writing clean, efficient code and exploring the 
                cutting edge of Agentic AI.
              </p>
            </section>

            <section>
              <h2 className="text-[11px] font-black uppercase tracking-widest border-b border-gray-200 pb-2 mb-6">Experience</h2>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-[16px]">Learning AI & Modern Web</h3>
                    <span className="text-[10px] font-mono font-bold uppercase text-gray-400">2024 — Present</span>
                  </div>
                  <ul className="text-[14px] text-gray-700 space-y-2 list-disc list-inside">
                    <li>Developing autonomous agents using OpenAI SDK and LangChain.</li>
                    <li>Mastering modern UI/UX and scalable application patterns.</li>
                    <li>Building production-ready full-stack applications with Next.js 15.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-[16px]">Full Stack Project Development</h3>
                    <span className="text-[10px] font-mono font-bold uppercase text-gray-400">2023 — 2024</span>
                  </div>
                  <ul className="text-[14px] text-gray-700 space-y-2 list-disc list-inside">
                    <li>Engineered 30+ micro-projects focusing on React, Node.js, and Databases.</li>
                    <li>Integrated APIs including Stripe, Sanity, and Supabase.</li>
                    <li>Optimized web vitals and SEO for high-performance applications.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[11px] font-black uppercase tracking-widest border-b border-gray-200 pb-2 mb-6">Selected Projects</h2>
              <div className="grid grid-cols-1 gap-6">
                {[
                  { name: 'AI Humanoid Robotics', tech: 'Next.js, Python, ROS 2, OpenAI' },
                  { name: 'Bait-ul-Kutub (LMS)', tech: 'Next.js, Prisma, PostgreSQL' },
                  { name: 'The Arqa E-Commerce', tech: 'Next.js, Sanity, Stripe' }
                ].map((p, i) => (
                  <div key={i}>
                    <h4 className="font-bold text-[15px]">{p.name}</h4>
                    <p className="text-[12px] font-mono text-gray-500">{p.tech}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="col-span-4 space-y-10">
             <section>
              <h2 className="text-[11px] font-black uppercase tracking-widest border-b border-gray-200 pb-2 mb-4">Connect</h2>
              <div className="space-y-2 text-[11px] font-mono text-gray-600">
                <p>github.com/Talha-Shaikh1</p>
                <p>linkedin.com/in/talha-shaikh</p>
              </div>
            </section>

            <section>
              <h2 className="text-[11px] font-black uppercase tracking-widest border-b border-gray-200 pb-2 mb-4">Core Skills</h2>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'React', 'TypeScript', 'Python', 'AI Agents', 'FastAPI', 'PostgreSQL', 'Prisma', 'Tailwind', 'Sanity', 'Git', 'Docker'].map((s, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 text-[10px] font-bold uppercase">{s}</span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-[11px] font-black uppercase tracking-widest border-b border-gray-200 pb-2 mb-4">Education</h2>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-[12px]">GenAI & Web Eng.</h4>
                  <p className="text-[10px] text-gray-500 font-mono">GIAIC | 2024 - Present</p>
                </div>
                <div>
                  <h4 className="font-bold text-[12px]">Full Stack Eng.</h4>
                  <p className="text-[10px] text-gray-500 font-mono">Self-Taught | 2022</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[11px] font-black uppercase tracking-widest border-b border-gray-200 pb-2 mb-4">Languages</h2>
              <div className="space-y-1 text-[12px]">
                <p className="flex justify-between"><span>English</span> <span className="font-bold">Fluent</span></p>
                <p className="flex justify-between"><span>Urdu</span> <span className="font-bold">Native</span></p>
              </div>
            </section>
          </div>
        </div>

        <footer className="mt-20 pt-8 border-t border-gray-100 text-[10px] text-gray-400 text-center font-mono uppercase tracking-[0.4em]">
          talhaweb.xyz
        </footer>
      </div>
    </div>
  )
}
