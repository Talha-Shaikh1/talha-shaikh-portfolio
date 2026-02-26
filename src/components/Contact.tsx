'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { Mail, Github, Linkedin, Twitter, Send, ArrowUpRight, CheckCircle, Loader2, MapPin, Clock } from 'lucide-react'

const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/talhashaikh',
    label: 'GitHub',
    desc: 'Check my code',
    color: '#e2e8f0',
    bg: 'rgba(226,232,240,0.08)',
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/in/talhashaikh',
    label: 'LinkedIn',
    desc: 'Let\'s connect',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.08)',
  },
  {
    icon: Twitter,
    href: 'https://twitter.com/talhashaikh',
    label: 'Twitter / X',
    desc: 'Follow my updates',
    color: '#818cf8',
    bg: 'rgba(129,140,248,0.08)',
  },
  {
    icon: Mail,
    href: 'mailto:talha@example.com',
    label: 'Email',
    desc: 'talha@example.com',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.08)',
  },
]

type FormState = 'idle' | 'loading' | 'success'

export default function Contact() {
  const [headingRef, headingInView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [formState, setFormState] = useState<FormState>('idle')
  const [focused, setFocused] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    setTimeout(() => setFormState('success'), 2000)
  }

  const inputBase = `
    w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 font-sans
    bg-white/[0.03] dark:bg-white/[0.03]
    text-white dark:text-white
    placeholder:text-gray-600 dark:placeholder:text-gray-600
  `

  return (
    <section
      id="contact"
      className="relative py-32 px-6 overflow-hidden bg-[#050508] dark:bg-[#050508]"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.2), transparent)' }} />
        <motion.div
          className="absolute -top-40 right-[-100px] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 left-[-100px] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(rgba(139,92,246,0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-[50px]" style={{ background: 'rgba(139,92,246,0.5)' }} />
            <span className="text-xs font-mono text-violet-400 tracking-[0.3em] uppercase">Say hello</span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-none"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Get In{' '}
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-gray-500 mt-4 text-base max-w-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Have a project in mind or want to collaborate? I'd love to hear from you — let's build something great together.
          </p>
        </motion.div>

        {/* Main grid */}
        <div ref={contentRef} className="grid lg:grid-cols-[1fr_1.6fr] gap-6 items-start">

          {/* Left — Info + Socials */}
          <div className="space-y-4">

            {/* Availability card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl p-5"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(139,92,246,0.15)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}
                >
                  <Clock className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Available Now
                  </p>
                  <p className="text-gray-500 text-xs font-mono">Open to opportunities</p>
                </div>
                <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                <MapPin className="w-3 h-3 text-violet-400" />
                <span>Pakistan · Remote friendly</span>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl p-5"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(139,92,246,0.15)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Find me on</p>
              <div className="space-y-2">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={contentInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 p-2.5 rounded-xl group transition-all duration-200"
                    style={{ background: 'transparent' }}
                    onMouseEnter={e => (e.currentTarget.style.background = link.bg)}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: link.bg, border: `1px solid ${link.color}25` }}
                    >
                      <link.icon className="w-4 h-4" style={{ color: link.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {link.label}
                      </p>
                      <p className="text-gray-500 text-xs truncate">{link.desc}</p>
                    </div>
                    <ArrowUpRight
                      className="w-3.5 h-3.5 text-gray-600 group-hover:text-violet-400 transition-colors shrink-0"
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(139,92,246,0.15)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {/* Top accent bar */}
            <div
              className="h-[2px] w-full"
              style={{ background: 'linear-gradient(90deg, #a78bfa, #ec4899)' }}
            />

            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-10 flex flex-col items-center justify-center text-center min-h-[400px]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)' }}
                  >
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </motion.div>
                  <h3
                    className="text-2xl font-black text-white mb-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-gray-400 text-sm max-w-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <motion.button
                    onClick={() => setFormState('idle')}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-6 px-5 py-2 rounded-xl text-xs font-mono text-violet-400 transition-colors"
                    style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)' }}
                  >
                    Send another
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="p-6 space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {['Name', 'Email'].map(field => (
                      <div key={field} className="relative">
                        <input
                          type={field === 'Email' ? 'email' : 'text'}
                          placeholder={field}
                          required
                          onFocus={() => setFocused(field)}
                          onBlur={() => setFocused(null)}
                          className={inputBase}
                          style={{
                            border: focused === field
                              ? '1px solid rgba(139,92,246,0.5)'
                              : '1px solid rgba(255,255,255,0.07)',
                            boxShadow: focused === field ? '0 0 0 3px rgba(139,92,246,0.08)' : 'none',
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Subject"
                      required
                      onFocus={() => setFocused('Subject')}
                      onBlur={() => setFocused(null)}
                      className={inputBase}
                      style={{
                        border: focused === 'Subject'
                          ? '1px solid rgba(139,92,246,0.5)'
                          : '1px solid rgba(255,255,255,0.07)',
                        boxShadow: focused === 'Subject' ? '0 0 0 3px rgba(139,92,246,0.08)' : 'none',
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    />
                  </div>

                  <div className="relative">
                    <textarea
                      placeholder="Tell me about your project..."
                      rows={5}
                      required
                      onFocus={() => setFocused('Message')}
                      onBlur={() => setFocused(null)}
                      className={`${inputBase} resize-none`}
                      style={{
                        border: focused === 'Message'
                          ? '1px solid rgba(139,92,246,0.5)'
                          : '1px solid rgba(255,255,255,0.07)',
                        boxShadow: focused === 'Message' ? '0 0 0 3px rgba(139,92,246,0.08)' : 'none',
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={formState === 'loading'}
                    className="w-full relative py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 overflow-hidden"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to right, #7c3aed, #db2777)' }}
                    />
                    <span
                      className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(to right, #6d28d9, #be185d)' }}
                    />
                    <span className="relative flex items-center gap-2">
                      {formState === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </span>
                  </motion.button>

                  <p className="text-center text-xs text-gray-600 font-mono">
                    Usually responds within 24 hours
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Light mode + font overrides */}
      <style dangerouslySetInnerHTML={{
        __html: [
          "@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');",
          "html.light #contact, :root:not(.dark) #contact { background: #f8f7ff !important; }",
          "html.light #contact h2, :root:not(.dark) #contact h2 { color: #0f0a1e !important; }",
          "html.light #contact p { color: #6b7280 !important; }",
          "html.light #contact input, html.light #contact textarea { color: #0f0a1e !important; background: rgba(0,0,0,0.04) !important; border-color: rgba(139,92,246,0.2) !important; }",
          "html.light #contact input::placeholder, html.light #contact textarea::placeholder { color: #9ca3af !important; }",
          "html.light #contact .text-white { color: #0f0a1e !important; }",
        ].join('\n')
      }} />
    </section>
  )
}