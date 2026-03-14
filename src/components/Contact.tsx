'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import {
  Terminal,
  FolderGit2,
  FileJson,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Send,
  CheckCircle2,
  Loader2,
  MapPin,
  Clock,
  XCircle,
  MessageSquare,
  Zap,
  Server,
  Code2,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════
   DEVELOPER MODE CONTACT - API Endpoint / Contact Form Inspired
   ═══════════════════════════════════════════════════════════════ */

const socialLinks = [
  {
    icon: Github,
    username: 'Talha-Shaikh1',
    label: 'GitHub',
    href: 'https://github.com/Talha-Shaikh1',
    color: '#f0f6fc',
    bgColor: '139, 92, 246',
  },
  {
    icon: Linkedin,
    username: 'muhammad-talha-938b75377',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/muhammad-talha-938b75377',
    color: '#0a66c2',
    bgColor: '59, 130, 246',
  },
  {
    icon: Twitter,
    username: '@TalhaShaikh',
    label: 'Twitter',
    href: 'https://twitter.com',
    color: '#1da1f2',
    bgColor: '29, 161, 242',
  },
  {
    icon: Mail,
    username: 'talha369852@gmail.com',
    label: 'Email',
    href: 'mailto:talha369852@gmail.com',
    color: '#ea4335',
    bgColor: '234, 67, 53',
  },
]

// Copy Button Component
function CopyButton({ text, isLight }: { text: string; isLight: boolean }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.button
      onClick={handleCopy}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-1.5 text-xs font-mono"
      style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
    >
      {copied ? (
        <>
          <Check className="w-3 h-3" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" />
          <span>Copy</span>
        </>
      )}
    </motion.button>
  )
}

// Social Link Card
function SocialCard({ link, index, inView, isLight }: {
  link: typeof socialLinks[0];
  index: number;
  inView: boolean;
  isLight: boolean;
}) {
  const Icon = link.icon

  return (
    <motion.a
      key={link.label}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group block"
    >
      <div
        className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300"
        style={{
          background: isLight ? 'rgba(15, 15, 25, 0.95)' : 'rgba(10, 10, 15, 0.95)',
          border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.2)' : `rgba(${link.bgColor}, 0.3)`}`,
        }}
      >
        {/* Icon */}
        <motion.div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: `rgba(${link.bgColor}, 0.15)`,
            border: `1px solid rgba(${link.bgColor}, 0.3)`,
          }}
          whileHover={{ scale: 1.1 }}
        >
          <Icon className="w-5 h-5" style={{ color: `rgb(${link.bgColor})` }} />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p
              className="text-sm font-mono font-bold truncate"
              style={{ color: isLight ? '#f3f4f6' : '#ffffff' }}
            >
              {link.label}
            </p>
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
          </div>
          <p
            className="text-xs font-mono truncate"
            style={{ color: isLight ? '#9ca3af' : '#d1d5db' }}
          >
            {link.username}
          </p>
        </div>

        {/* Copy button */}
        <CopyButton text={link.username} isLight={isLight} />
      </div>
    </motion.a>
  )
}

// Form Input Component
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
  rows,
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
          className="w-full rounded-xl px-4 py-3 text-xs outline-none transition-all duration-300 resize-none font-mono"
          style={{
            background: isLight ? 'rgba(30, 30, 46, 0.5)' : 'rgba(20, 20, 30, 0.5)',
            color: isLight ? '#f3f4f6' : '#ffffff',
            border: `1px solid ${focused === field ? `rgba(124, 58, 237, 0.5)` : 'rgba(124, 58, 237, 0.2)'}`,
            boxShadow: focused === field ? `0 0 0 3px rgba(124, 58, 237, 0.15)` : 'none',
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
          className="w-full rounded-xl px-4 py-3 text-xs outline-none transition-all duration-300 font-mono"
          style={{
            background: isLight ? 'rgba(30, 30, 46, 0.5)' : 'rgba(20, 20, 30, 0.5)',
            color: isLight ? '#f3f4f6' : '#ffffff',
            border: `1px solid ${focused === field ? `rgba(124, 58, 237, 0.5)` : 'rgba(124, 58, 237, 0.2)'}`,
            boxShadow: focused === field ? `0 0 0 3px rgba(124, 58, 237, 0.15)` : 'none',
          }}
        />
      )}
    </motion.div>
  )
}

export default function Contact() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])
  const isLight = mounted && theme === 'light'

  const [sectionRef, sectionInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [headingRef, headingInView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
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
      className="relative py-32 px-6 overflow-hidden"
      style={{
        background: isLight ? '#fafafc' : '#0a0a0f',
      }}
    >
      {/* Font imports */}
      <style
        dangerouslySetInnerHTML={{
          __html: "@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap');",
        }}
      />

      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Grid lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(${isLight ? 'rgba(124,58,237,0.06)' : 'rgba(139,92,246,0.05)'} 1px, transparent 1px),
              linear-gradient(90deg, ${isLight ? 'rgba(124,58,237,0.06)' : 'rgba(139,92,246,0.05)'} 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            opacity: isLight ? 0.4 : 0.5,
          }}
        />

        {/* Floating code */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xs font-mono"
            style={{
              color: isLight ? 'rgba(124, 58, 237, 0.08)' : 'rgba(139, 92, 246, 0.12)',
              left: `${5 + i * 15}%`,
              top: `${10 + (i % 3) * 25}%`,
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [0, -100, -200],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 1.5,
            }}
          >
            {['POST', 'GET', 'PUT', 'PATCH', 'DELETE', 'webhook'][i]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-4 h-4" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
            <span
              className="text-xs font-mono tracking-[0.3em] uppercase"
              style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}
            >
              POST /api/contact
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Terminal className="w-8 h-8" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
            <h2
              className="text-5xl md:text-7xl font-black tracking-tighter leading-none"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: isLight ? '#0f0a1e' : '#ffffff',
              }}
            >
              GET IN{' '}
              <span
                className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent"
                style={{
                  textShadow: isLight ? 'none' : '0 0 80px rgba(124,58,237,0.5)',
                }}
              >
                TOUCH
              </span>
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 text-sm max-w-2xl"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: isLight ? '#6b7280' : '#9ca3af',
            }}
          >
            <span style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}>{'// '}</span>
            Send a message through the API endpoint below. 
            All fields are required. Response time: {'<'} 24 hours.
          </motion.p>
        </motion.div>

        {/* Main Grid */}
        <div ref={contentRef} className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
          {/* Left Column - Info & Social */}
          <div className="space-y-4">
            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="rounded-xl p-5 backdrop-blur-xl"
              style={{
                background: isLight ? 'rgba(15, 15, 25, 0.95)' : 'rgba(10, 10, 15, 0.95)',
                border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(139, 92, 246, 0.3)'}`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #34d399, #10b981)',
                    boxShadow: '0 0 20px rgba(52, 211, 153, 0.4)',
                  }}
                >
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p
                    className="text-sm font-mono font-bold"
                    style={{ color: isLight ? '#f3f4f6' : '#ffffff' }}
                  >
                    Status: Available
                  </p>
                  <p className="text-xs font-mono" style={{ color: isLight ? '#9ca3af' : '#d1d5db' }}>
                    Open for opportunities
                  </p>
                </div>
                <motion.div
                  className="w-3 h-3 rounded-full bg-emerald-400"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-mono" style={{ color: isLight ? '#9ca3af' : '#d1d5db' }}>
                <MapPin className="w-3.5 h-3.5" style={{ color: '#7c3aed' }} />
                <span>Pakistan · Remote friendly</span>
              </div>

              <div className="flex items-center gap-4 mt-4 pt-4" style={{ borderTop: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.15)' : 'rgba(139, 92, 246, 0.2)'}` }}>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" style={{ color: '#fbbf24' }} />
                  <span className="text-xs font-mono" style={{ color: isLight ? '#9ca3af' : '#d1d5db' }}>24h response</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5" style={{ color: '#34d399' }} />
                  <span className="text-xs font-mono" style={{ color: isLight ? '#9ca3af' : '#d1d5db' }}>99.9% uptime</span>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-xl p-5 backdrop-blur-xl"
              style={{
                background: isLight ? 'rgba(15, 15, 25, 0.95)' : 'rgba(10, 10, 15, 0.95)',
                border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(139, 92, 246, 0.3)'}`,
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <FolderGit2 className="w-4 h-4" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}>
                  Social Channels
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

            {/* API Endpoint Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-xl p-5 backdrop-blur-xl"
              style={{
                background: isLight ? 'rgba(30, 30, 46, 0.9)' : 'rgba(10, 10, 15, 0.9)',
                border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(139, 92, 246, 0.3)'}`,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="w-4 h-4" style={{ color: '#34d399' }} />
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: '#34d399' }}>
                  API Endpoint
                </span>
              </div>
              <div
                className="p-3 rounded-lg font-mono text-xs mb-3"
                style={{
                  background: isLight ? 'rgba(15, 15, 25, 0.95)' : 'rgba(5, 5, 10, 0.95)',
                  border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(139, 92, 246, 0.2)'}`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ color: '#34d399' }}>POST</span>
                  <span style={{ color: isLight ? '#f3f4f6' : '#ffffff' }}>https://talhaweb.xyz/api/contact</span>
                </div>
                <div className="text-xs" style={{ color: isLight ? '#9ca3af' : '#d1d5db' }}>
                  <div className="flex items-center gap-2">
                    <span style={{ color: '#f472b6' }}>name</span>: <span style={{ color: '#fbbf24' }}>string</span> (required)
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ color: '#f472b6' }}>email</span>: <span style={{ color: '#fbbf24' }}>string</span> (required)
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ color: '#f472b6' }}>subject</span>: <span style={{ color: '#fbbf24' }}>string</span> (required)
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ color: '#f472b6' }}>message</span>: <span style={{ color: '#fbbf24' }}>string</span> (required)
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <CheckCircle2 className="w-3 h-3" style={{ color: '#34d399' }} />
                <span style={{ color: '#34d399' }}>Endpoint active</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-xl overflow-hidden backdrop-blur-xl"
            style={{
              background: isLight ? 'rgba(15, 15, 25, 0.95)' : 'rgba(10, 10, 15, 0.95)',
              border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.3)' : 'rgba(139, 92, 246, 0.4)'}`,
            }}
          >

            <AnimatePresence mode="wait">
              {/* Success State */}
              {formState === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 flex flex-col items-center justify-center text-center min-h-[400px]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #34d399, #10b981)',
                      boxShadow: '0 0 30px rgba(52, 211, 153, 0.4)',
                    }}
                  >
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3
                    className="text-xl font-mono font-bold mb-2"
                    style={{ color: isLight ? '#f3f4f6' : '#ffffff' }}
                  >
                    ✓ Message Sent
                  </h3>
                  <p
                    className="text-xs font-mono max-w-xs mb-6"
                    style={{ color: isLight ? '#9ca3af' : '#d1d5db' }}
                  >
                    Your request has been submitted successfully. 
                    Expect a response within 24 hours.
                  </p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg"
                    style={{
                      background: 'rgba(52, 211, 153, 0.15)',
                      border: '1px solid rgba(52, 211, 153, 0.3)',
                    }}
                  >
                    <Clock className="w-3.5 h-3.5" style={{ color: '#34d399' }} />
                    <span className="text-xs font-mono" style={{ color: '#34d399' }}>
                      Response ETA: {'<'} 24 hours
                    </span>
                  </motion.div>
                  <motion.button
                    onClick={() => setFormState('idle')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 px-5 py-2.5 rounded-lg text-xs font-mono font-semibold"
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                      color: 'white',
                      boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
                    }}
                  >
                    Send Another Request
                  </motion.button>
                </motion.div>
              )}

              {/* Form State */}
              {formState !== 'success' && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="p-4 space-y-4"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-mono mb-2 block" style={{ color: isLight ? '#9ca3af' : '#d1d5db' }}>
                        name <span style={{ color: '#f472b6' }}>*</span>
                      </label>
                      <FormInput
                        field="name"
                        type="text"
                        placeholder="John Doe"
                        value={fields.name}
                        onChange={handleChange}
                        onFocus={setFocused}
                        onBlur={() => setFocused(null)}
                        focused={focused}
                        isLight={isLight}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono mb-2 block" style={{ color: isLight ? '#9ca3af' : '#d1d5db' }}>
                        email <span style={{ color: '#f472b6' }}>*</span>
                      </label>
                      <FormInput
                        field="email"
                        type="email"
                        placeholder="john@example.com"
                        value={fields.email}
                        onChange={handleChange}
                        onFocus={setFocused}
                        onBlur={() => setFocused(null)}
                        focused={focused}
                        isLight={isLight}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono mb-2 block" style={{ color: isLight ? '#9ca3af' : '#d1d5db' }}>
                      subject <span style={{ color: '#f472b6' }}>*</span>
                    </label>
                    <FormInput
                      field="subject"
                      type="text"
                      placeholder="Project Inquiry"
                      value={fields.subject}
                      onChange={handleChange}
                      onFocus={setFocused}
                      onBlur={() => setFocused(null)}
                      focused={focused}
                      isLight={isLight}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono mb-2 block" style={{ color: isLight ? '#9ca3af' : '#d1d5db' }}>
                      message <span style={{ color: '#f472b6' }}>*</span>
                    </label>
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
                  </div>

                  {/* Error Message */}
                  <AnimatePresence>
                    {formState === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-3 p-3 rounded-lg"
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.2)',
                        }}
                      >
                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <p
                          className="text-xs font-mono"
                          style={{ color: '#ef4444' }}
                        >
                          {errorMsg}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={formState === 'loading'}
                    className="w-full py-3 rounded-lg text-xs font-mono font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                      color: 'white',
                      boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
                    }}
                  >
                    {formState === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>

                  {/* Footer Note */}
                  <p
                    className="text-[10px] font-mono text-center"
                    style={{ color: isLight ? '#9ca3af' : '#6b7280' }}
                  >
                    <span style={{ color: isLight ? '#7c3aed' : '#a78bfa' }}>{'// '}</span>
                    By submitting, you agree to the privacy policy
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
