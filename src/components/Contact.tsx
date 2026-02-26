'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Mail, Github, Linkedin, Twitter, Send, ArrowUpRight, CheckCircle, Loader2, MapPin, Clock, XCircle } from 'lucide-react'

const socialLinks = [
  { icon: Github,   href: 'https://github.com/Talha-Shaikh1',   label: 'GitHub',     desc: 'Check my code',      darkColor: '#e2e8f0', lightColor: '#374151', bg: 'rgba(226,232,240,0.08)' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/muhammad-talha-938b75377?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn', desc: "Let's connect",    darkColor: '#60a5fa', lightColor: '#1d4ed8', bg: 'rgba(96,165,250,0.08)'  },
  { icon: Twitter,  href: 'https://github.com/Talha-Shaikh1',  label: 'Twitter / X', desc: 'Follow my updates', darkColor: '#818cf8', lightColor: '#4f46e5', bg: 'rgba(129,140,248,0.08)' },
  { icon: Mail,     href: 'mailto:talha369852@gmail.com',         label: 'Email',       desc: 'talha369852@gmail.com',  darkColor: '#a78bfa', lightColor: '#7c3aed', bg: 'rgba(167,139,250,0.08)' },
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isLight = mounted && theme === 'light'

  const [headingRef, headingInView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [focused, setFocused] = useState<string | null>(null)
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setFormState('error')
      } else {
        setFormState('success')
        setFields({ name: '', email: '', subject: '', message: '' })
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setFormState('error')
    }
  }

  // ── Style helpers ────────────────────────────────────────────────
  const sectionBg = isLight ? '#f8f7ff' : '#050508'
  const headingColor = isLight ? '#0f0a1e' : '#ffffff'
  const subColor = isLight ? '#6b7280' : '#6b7280'
  const accentColor = isLight ? 'rgba(109,40,217,0.5)' : 'rgba(139,92,246,0.5)'
  const labelColor = isLight ? '#7c3aed' : '#a78bfa'

  const cardBg = isLight ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.02)'
  const cardBorder = isLight ? 'rgba(109,40,217,0.15)' : 'rgba(139,92,246,0.15)'
  const cardShadow = isLight ? '0 2px 20px rgba(109,40,217,0.06)' : 'none'

  const inputBg = isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)'
  const inputColor = isLight ? '#0f0a1e' : '#ffffff'
  const inputPlaceholder = isLight ? '#9ca3af' : '#4b5563'
  const inputBorderIdle = isLight ? 'rgba(109,40,217,0.15)' : 'rgba(255,255,255,0.07)'
  const inputBorderFocus = isLight ? 'rgba(109,40,217,0.5)' : 'rgba(139,92,246,0.5)'
  const inputShadowFocus = isLight ? '0 0 0 3px rgba(109,40,217,0.08)' : '0 0 0 3px rgba(139,92,246,0.08)'

  const inputStyle = (field: string) => ({
    background: inputBg,
    color: inputColor,
    border: focused === field ? `1px solid ${inputBorderFocus}` : `1px solid ${inputBorderIdle}`,
    boxShadow: focused === field ? inputShadowFocus : 'none',
    fontFamily: "'DM Sans', sans-serif",
  })

  return (
    <section
      id="contact"
      className="relative py-32 px-6 overflow-hidden transition-colors duration-500"
      style={{ background: sectionBg }}
    >
      <style dangerouslySetInnerHTML={{ __html: [
        "@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');",
        `#contact input::placeholder, #contact textarea::placeholder { color: ${inputPlaceholder} !important; }`,
      ].join('\n') }} />

      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${isLight ? 'rgba(109,40,217,0.25)' : 'rgba(139,92,246,0.3)'}, transparent)` }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${isLight ? 'rgba(219,39,119,0.15)' : 'rgba(236,72,153,0.2)'}, transparent)` }} />
        <motion.div
          className="absolute -top-40 right-[-100px] w-[500px] h-[500px] rounded-full"
          style={{ background: `radial-gradient(circle, ${isLight ? 'rgba(109,40,217,0.06)' : 'rgba(139,92,246,0.08)'} 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 left-[-100px] w-[500px] h-[500px] rounded-full"
          style={{ background: `radial-gradient(circle, ${isLight ? 'rgba(219,39,119,0.05)' : 'rgba(236,72,153,0.06)'} 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${isLight ? 'rgba(109,40,217,0.12)' : 'rgba(139,92,246,0.2)'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            opacity: isLight ? 0.12 : 0.12,
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
            <div className="h-px w-[50px]" style={{ background: accentColor }} />
            <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: labelColor }}>
              Say hello
            </span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-black tracking-tighter leading-none"
            style={{ fontFamily: "'Syne', sans-serif", color: headingColor }}
          >
            Get In{' '}
            <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="mt-4 text-base max-w-lg" style={{ fontFamily: "'DM Sans', sans-serif", color: subColor }}>
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
              className="rounded-2xl p-5 transition-colors duration-300"
              style={{ background: cardBg, border: `1px solid ${cardBorder}`, backdropFilter: 'blur(12px)', boxShadow: cardShadow }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}>
                  <Clock className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ fontFamily: "'Syne', sans-serif", color: headingColor }}>
                    Available Now
                  </p>
                  <p className="text-xs font-mono" style={{ color: subColor }}>Open to opportunities</p>
                </div>
                <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono" style={{ color: subColor }}>
                <MapPin className="w-3 h-3" style={{ color: labelColor }} />
                <span>Pakistan · Remote friendly</span>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl p-5 transition-colors duration-300"
              style={{ background: cardBg, border: `1px solid ${cardBorder}`, backdropFilter: 'blur(12px)', boxShadow: cardShadow }}
            >
              <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: subColor }}>Find me on</p>
              <div className="space-y-2">
                {socialLinks.map((link, i) => {
                  const color = isLight ? link.lightColor : link.darkColor
                  return (
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
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: link.bg, border: `1px solid ${color}25` }}>
                        <link.icon className="w-4 h-4" style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif", color: headingColor }}>
                          {link.label}
                        </p>
                        <p className="text-xs truncate" style={{ color: subColor }}>{link.desc}</p>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0 transition-colors group-hover:text-violet-400" style={{ color: subColor }} />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl overflow-hidden transition-colors duration-300"
            style={{ background: cardBg, border: `1px solid ${cardBorder}`, backdropFilter: 'blur(16px)', boxShadow: cardShadow }}
          >
            {/* Top accent bar */}
            <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, #a78bfa, #ec4899)' }} />

            <AnimatePresence mode="wait">
              {/* ── Success state ── */}
              {formState === 'success' && (
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
                  <h3 className="text-2xl font-black mb-2" style={{ fontFamily: "'Syne', sans-serif", color: headingColor }}>
                    Message Sent! 🎉
                  </h3>
                  <p className="text-sm max-w-xs mb-1" style={{ fontFamily: "'DM Sans', sans-serif", color: subColor }}>
                    Thanks for reaching out! I've received your message and you should have a confirmation email in your inbox.
                  </p>
                  <p className="text-xs font-mono mb-6" style={{ color: labelColor }}>
                    I'll reply within 24 hours.
                  </p>
                  <motion.button
                    onClick={() => setFormState('idle')}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-2 rounded-xl text-xs font-mono transition-colors"
                    style={{ background: isLight ? 'rgba(109,40,217,0.08)' : 'rgba(139,92,246,0.1)', border: `1px solid ${isLight ? 'rgba(109,40,217,0.2)' : 'rgba(139,92,246,0.25)'}`, color: labelColor }}
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              )}

              {/* ── Form state ── */}
              {formState !== 'success' && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="p-6 space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { field: 'name', placeholder: 'Your Name', type: 'text' },
                      { field: 'email', placeholder: 'Email Address', type: 'email' },
                    ].map(({ field, placeholder, type }) => (
                      <input
                        key={field}
                        name={field}
                        type={type}
                        placeholder={placeholder}
                        required
                        value={fields[field as keyof typeof fields]}
                        onChange={handleChange}
                        onFocus={() => setFocused(field)}
                        onBlur={() => setFocused(null)}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                        style={inputStyle(field)}
                      />
                    ))}
                  </div>

                  <input
                    name="subject"
                    type="text"
                    placeholder="Subject"
                    required
                    value={fields.subject}
                    onChange={handleChange}
                    onFocus={() => setFocused('subject')}
                    onBlur={() => setFocused(null)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                    style={inputStyle('subject')}
                  />

                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                    value={fields.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 resize-none"
                    style={inputStyle('message')}
                  />

                  {/* Error message */}
                  <AnimatePresence>
                    {formState === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2.5 px-4 py-3 rounded-xl"
                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
                      >
                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <p className="text-xs text-red-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {errorMsg}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={formState === 'loading'}
                    className="w-full relative py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 overflow-hidden disabled:opacity-70"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span className="absolute inset-0" style={{ background: 'linear-gradient(to right, #7c3aed, #db2777)' }} />
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

                  <p className="text-center text-xs font-mono" style={{ color: isLight ? '#d1d5db' : '#374151' }}>
                    You'll receive an auto-reply confirmation · Usually responds within 24h
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}