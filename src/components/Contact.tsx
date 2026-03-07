'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  Send, 
  ArrowUpRight, 
  CheckCircle, 
  Loader2, 
  MapPin, 
  Clock, 
  XCircle,
  Sparkles,
  MessageCircle,
  Zap,
  Coffee
} from 'lucide-react'

const socialLinks = [
  { 
    icon: Github, 
    href: 'https://github.com/Talha-Shaikh1', 
    label: 'GitHub', 
    desc: 'Check my code', 
    color: '#e2e8f0',
    bg: 'rgba(226,232,240,0.08)',
    gradient: 'from-slate-400 to-slate-500',
  },
  { 
    icon: Linkedin, 
    href: 'https://www.linkedin.com/in/muhammad-talha-938b75377', 
    label: 'LinkedIn', 
    desc: "Let's connect", 
    color: '#0077b5',
    bg: 'rgba(0,119,181,0.08)',
    gradient: 'from-blue-500 to-blue-600',
  },
  { 
    icon: Twitter, 
    href: 'https://github.com/Talha-Shaikh1', 
    label: 'Twitter / X', 
    desc: 'Follow my updates', 
    color: '#1da1f2',
    bg: 'rgba(29,161,242,0.08)',
    gradient: 'from-sky-400 to-sky-500',
  },
  { 
    icon: Mail, 
    href: 'mailto:talha369852@gmail.com', 
    label: 'Email', 
    desc: 'talha369852@gmail.com', 
    color: '#ea4335',
    bg: 'rgba(234,67,53,0.08)',
    gradient: 'from-red-400 to-red-500',
  },
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

// Animated social card
function SocialCard({ link, index, inView, isLight }: { 
  link: typeof socialLinks[0]; 
  index: number; 
  inView: boolean;
  isLight: boolean;
}) {
  const Icon = link.icon
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      key={link.label}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative block"
    >
      <div
        className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-300"
        style={{
          background: hovered ? link.bg : isLight ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.02)',
          border: `1px solid ${isLight ? 'rgba(109,40,217,0.12)' : 'rgba(139,92,246,0.12)'}`,
        }}
      >
        {/* Icon container */}
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: `linear-gradient(135deg, ${link.color}20, ${link.color}10)`,
            border: `1px solid ${link.color}30`,
          }}
          animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 5 : 0 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Icon className="w-5 h-5" style={{ color: link.color }} />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-semibold transition-colors"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: isLight ? '#0f0a1e' : '#ffffff',
            }}
          >
            {link.label}
          </p>
          <p
            className="text-xs truncate"
            style={{ color: isLight ? '#6b7280' : '#9ca3af' }}
          >
            {link.desc}
          </p>
        </div>

        {/* Arrow */}
        <motion.div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${link.color}15` }}
          animate={{ x: hovered ? 4 : 0, scale: hovered ? 1.1 : 1 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <ArrowUpRight className="w-4 h-4" style={{ color: link.color }} />
        </motion.div>
      </div>

      {/* Hover gradient overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${link.color}10, transparent)`,
        }}
      />
    </motion.a>
  )
}

// Premium form input
function FormInput({ 
  field, 
  type, 
  placeholder, 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  focused, 
  isLight,
  rows 
}: any) {
  const isTextarea = rows !== undefined
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {isTextarea ? (
        <textarea
          name={field}
          placeholder={placeholder}
          rows={rows}
          required
          value={value}
          onChange={onChange}
          onFocus={() => onFocus(field)}
          onBlur={() => onBlur()}
          className="w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-300 resize-none"
          style={{
            background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)',
            color: isLight ? '#0f0a1e' : '#ffffff',
            border: `1px solid ${focused === field ? 'rgba(124,58,237,0.5)' : 'rgba(124,58,237,0.15)'}`,
            boxShadow: focused === field ? '0 0 0 3px rgba(124,58,237,0.08)' : 'none',
            fontFamily: "'DM Sans', sans-serif",
          }}
        />
      ) : (
        <input
          name={field}
          type={type}
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange}
          onFocus={() => onFocus(field)}
          onBlur={() => onBlur()}
          className="w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-300"
          style={{
            background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)',
            color: isLight ? '#0f0a1e' : '#ffffff',
            border: `1px solid ${focused === field ? 'rgba(124,58,237,0.5)' : 'rgba(124,58,237,0.15)'}`,
            boxShadow: focused === field ? '0 0 0 3px rgba(124,58,237,0.08)' : 'none',
            fontFamily: "'DM Sans', sans-serif",
          }}
        />
      )}
      
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(124,58,237,0.3), rgba(219,39,119,0.3))`,
          opacity: focused === field ? 1 : 0,
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          borderRadius: '12px',
        }}
        initial={false}
        animate={{ opacity: focused === field ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
}

export default function Contact() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isLight = mounted && theme === 'light'

  const [sectionRef, sectionInView] = useInView({ triggerOnce: true, threshold: 0.1 })
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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden transition-colors duration-500"
      style={{ background: 'var(--bg-primary)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: [
        "@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');",
      ].join('\n') }} />

      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Grid lines */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${isLight ? 'rgba(109,40,217,0.25)' : 'rgba(139,92,246,0.3)'}, transparent)` }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${isLight ? 'rgba(219,39,119,0.15)' : 'rgba(236,72,153,0.2)'}, transparent)` }}
        />
        
        {/* Animated orbs */}
        <motion.div
          className="absolute -top-40 right-[-100px] w-[500px] h-[500px] rounded-full"
          style={{ background: `radial-gradient(circle, ${isLight ? 'rgba(109,40,217,0.06)' : 'rgba(139,92,246,0.08)'} 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 left-[-100px] w-[500px] h-[500px] rounded-full"
          style={{ background: `radial-gradient(circle, ${isLight ? 'rgba(219,39,119,0.05)' : 'rgba(236,72,153,0.06)'} 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.15, 1], x: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0"
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
            <div className="h-px w-[50px]" style={{ background: isLight ? 'rgba(109,40,217,0.4)' : 'rgba(139,92,246,0.5)' }} />
            <span
              className="text-xs font-mono tracking-[0.3em] uppercase"
              style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
            >
              Say hello
            </span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-black tracking-tighter leading-none"
            style={{ fontFamily: "'Syne', sans-serif", color: isLight ? '#0f0a1e' : '#ffffff' }}
          >
            Get In{' '}
            <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p
            className="mt-4 text-base max-w-2xl"
            style={{ fontFamily: "'DM Sans', sans-serif", color: isLight ? '#6b7280' : '#6b7280' }}
          >
            Have a project in mind or want to collaborate? I'd love to hear from you — let's build something great together.
          </p>
        </motion.div>

        {/* Main grid */}
        <div ref={contentRef} className="grid lg:grid-cols-[1fr_1.6fr] gap-8 items-start">
          
          {/* Left — Info + Socials */}
          <div className="space-y-6">
            {/* Availability card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl p-5 overflow-hidden"
              style={{
                background: isLight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isLight ? 'rgba(109,40,217,0.15)' : 'rgba(139,92,246,0.15)'}`,
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-bl-full"
                style={{ background: 'radial-gradient(circle at top right, rgba(52,211,153,0.15), transparent 70%)' }}
              />
              
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(135deg, #34d399, #10b981)',
                    boxShadow: '0 4px 20px rgba(52,211,153,0.4)',
                  }}
                >
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p
                    className="text-sm font-bold"
                    style={{ fontFamily: "'Syne', sans-serif", color: isLight ? '#0f0a1e' : '#ffffff' }}
                  >
                    Available Now
                  </p>
                  <p className="text-xs font-mono" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>
                    Open to opportunities
                  </p>
                </div>
                <motion.div 
                  className="ml-auto w-2.5 h-2.5 rounded-full bg-emerald-400"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              
              <div className="flex items-center gap-2 text-xs font-mono relative z-10" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>
                <MapPin className="w-3.5 h-3.5" style={{ color: '#7c3aed' }} />
                <span>Pakistan · Remote friendly</span>
              </div>

              {/* Quick stats */}
              <div className="flex items-center gap-4 mt-4 pt-4 relative z-10" style={{ borderTop: `1px solid ${isLight ? 'rgba(109,40,217,0.15)' : 'rgba(139,92,246,0.15)'}` }}>
                <div className="flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5" style={{ color: '#a78bfa' }} />
                  <span className="text-xs" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>Quick responder</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" style={{ color: '#fbbf24' }} />
                  <span className="text-xs" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>24h turnaround</span>
                </div>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl p-5"
              style={{
                background: isLight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isLight ? 'rgba(109,40,217,0.15)' : 'rgba(139,92,246,0.15)'}`,
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-4 h-4" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}>
                  Connect
                </span>
              </div>
              <div className="space-y-3">
                {socialLinks.map((link, i) => (
                  <SocialCard 
                    key={link.label} 
                    link={link} 
                    index={i} 
                    inView={contentInView}
                    isLight={isLight}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: isLight ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${isLight ? 'rgba(109,40,217,0.15)' : 'rgba(139,92,246,0.15)'}`,
              backdropFilter: 'blur(20px)',
              boxShadow: isLight ? '0 4px 40px rgba(109,40,217,0.08)' : 'none',
            }}
          >
            {/* Top gradient bar */}
            <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #7c3aed, #db2777, #ec4899)' }} />

            <AnimatePresence mode="wait">
              {/* Success state */}
              {formState === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-10 flex flex-col items-center justify-center text-center min-h-[450px]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ 
                      background: 'linear-gradient(135deg, #34d399, #10b981)',
                      boxShadow: '0 10px 40px rgba(52,211,153,0.4)',
                    }}
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3
                    className="text-2xl font-black mb-3"
                    style={{ fontFamily: "'Syne', sans-serif", color: isLight ? '#0f0a1e' : '#ffffff' }}
                  >
                    Message Sent! 🎉
                  </h3>
                  <p
                    className="text-sm max-w-xs mb-6"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: isLight ? '#6b7280' : '#9ca3af' }}
                  >
                    Thanks for reaching out! I've received your message and you should have a confirmation email in your inbox.
                  </p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl"
                    style={{ background: isLight ? 'rgba(52,211,153,0.1)' : 'rgba(52,211,153,0.15)' }}
                  >
                    <Clock className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-xs font-mono text-emerald-600">I'll reply within 24 hours</span>
                  </motion.div>
                  <motion.button
                    onClick={() => setFormState('idle')}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-8 px-6 py-3 rounded-xl text-xs font-mono transition-colors"
                    style={{ 
                      background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                      color: '#ffffff',
                    }}
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              )}

              {/* Form state */}
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
                    <FormInput
                      field="name"
                      type="text"
                      placeholder="Your Name"
                      value={fields.name}
                      onChange={handleChange}
                      onFocus={setFocused}
                      onBlur={() => setFocused(null)}
                      focused={focused}
                      isLight={isLight}
                    />
                    <FormInput
                      field="email"
                      type="email"
                      placeholder="Email Address"
                      value={fields.email}
                      onChange={handleChange}
                      onFocus={setFocused}
                      onBlur={() => setFocused(null)}
                      focused={focused}
                      isLight={isLight}
                    />
                  </div>

                  <FormInput
                    field="subject"
                    type="text"
                    placeholder="Subject"
                    value={fields.subject}
                    onChange={handleChange}
                    onFocus={setFocused}
                    onBlur={() => setFocused(null)}
                    focused={focused}
                    isLight={isLight}
                  />

                  <FormInput
                    field="message"
                    placeholder="Tell me about your project..."
                    value={fields.message}
                    onChange={handleChange}
                    onFocus={setFocused}
                    onBlur={() => setFocused(null)}
                    focused={focused}
                    isLight={isLight}
                    rows={5}
                  />

                  {/* Error message */}
                  <AnimatePresence>
                    {formState === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-3 p-4 rounded-xl"
                        style={{ 
                          background: 'rgba(239,68,68,0.08)', 
                          border: '1px solid rgba(239,68,68,0.2)',
                        }}
                      >
                        <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                        <p
                          className="text-sm"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: '#ef4444' }}
                        >
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
                    className="w-full relative py-4 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 overflow-hidden disabled:opacity-70"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }} />
                    <motion.span 
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2), transparent)' }}
                      animate={{ x: formState === 'loading' ? [-100, 100] : 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
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

                  <div className="flex items-center justify-center gap-2 text-xs">
                    <Sparkles className="w-3.5 h-3.5" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
                    <p
                      className="text-center font-mono"
                      style={{ color: isLight ? '#9ca3af' : '#6b7280' }}
                    >
                      You'll receive an auto-reply confirmation · Usually responds within 24h
                    </p>
                    <Sparkles className="w-3.5 h-3.5" style={{ color: isLight ? '#f59e0b' : '#fbbf24' }} />
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
