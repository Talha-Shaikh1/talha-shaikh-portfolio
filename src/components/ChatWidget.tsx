'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, RotateCcw } from 'lucide-react'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const SUGGESTIONS = [
  "What's Talha's tech stack?",
  'Tell me about his projects',
  'Is he available for hire?',
  'What AI tools does he use?',
]

const WELCOME = "Hi! 👋 I'm Talha's AI assistant. Ask me anything about his skills, projects, or availability!"

/* ─── Single message bubble ─────────────────────────────────────── */
function MessageBubble({ msg, isLight }: { msg: Message; isLight: boolean }) {
  const isUser = msg.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mb-0.5"
        style={{
          background: isUser
            ? 'linear-gradient(to bottom right, #7c3aed, #db2777)'
            : isLight
            ? 'rgba(109,40,217,0.1)'
            : 'rgba(139,92,246,0.15)',
          border: isUser ? 'none' : `1px solid ${isLight ? 'rgba(109,40,217,0.2)' : 'rgba(139,92,246,0.25)'}`,
        }}
      >
        {isUser
          ? <User className="w-3 h-3 text-white" />
          : <Bot className="w-3 h-3" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
        }
      </div>

      {/* Bubble */}
      <div
        className="max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background: isUser
            ? 'linear-gradient(to bottom right, #7c3aed, #db2777)'
            : isLight
            ? 'rgba(255,255,255,0.85)'
            : 'rgba(255,255,255,0.05)',
          color: isUser
            ? '#ffffff'
            : isLight ? '#374151' : '#e5e7eb',
          border: isUser
            ? 'none'
            : `1px solid ${isLight ? 'rgba(109,40,217,0.1)' : 'rgba(139,92,246,0.12)'}`,
          borderBottomRightRadius: isUser ? '4px' : '16px',
          borderBottomLeftRadius: isUser ? '16px' : '4px',
          boxShadow: isLight && !isUser ? '0 1px 8px rgba(109,40,217,0.06)' : 'none',
        }}
      >
        {msg.content}
      </div>
    </motion.div>
  )
}

/* ─── Typing indicator ──────────────────────────────────────────── */
function TypingIndicator({ isLight }: { isLight: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="flex items-end gap-2"
    >
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: isLight ? 'rgba(109,40,217,0.1)' : 'rgba(139,92,246,0.15)',
          border: `1px solid ${isLight ? 'rgba(109,40,217,0.2)' : 'rgba(139,92,246,0.25)'}`,
        }}
      >
        <Bot className="w-3 h-3" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
      </div>
      <div
        className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-bl-[4px]"
        style={{
          background: isLight ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.05)',
          border: `1px solid ${isLight ? 'rgba(109,40,217,0.1)' : 'rgba(139,92,246,0.12)'}`,
        }}
      >
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: isLight ? '#a78bfa' : '#8b5cf6' }}
            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  )
}

/* ─── Main Widget ───────────────────────────────────────────────── */
export default function ChatWidget() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isLight = mounted && theme === 'light'

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    setShowSuggestions(false)

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await res.json()
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message || data.error || 'Something went wrong.',
          timestamp: new Date(),
        },
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Couldn't connect right now. Please try again!",
          timestamp: new Date(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setMessages([])
    setShowSuggestions(true)
  }

  // ── Derived styles ───────────────────────────────────────────────
  const panelBg = isLight ? 'rgba(248,247,255,0.97)' : 'rgba(8,7,14,0.97)'
  const panelBorder = isLight ? 'rgba(109,40,217,0.18)' : 'rgba(139,92,246,0.2)'
  const headerBg = isLight
    ? 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(219,39,119,0.05))'
    : 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(236,72,153,0.08))'
  const inputBg = isLight ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.04)'
  const inputBorder = isLight ? 'rgba(109,40,217,0.2)' : 'rgba(139,92,246,0.2)'

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: "@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');" }} />

      {/* FAB Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!open && (
            <motion.button
              key="fab"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              onClick={() => setOpen(true)}
              className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl overflow-hidden group"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
            >
              <span className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }} />
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #6d28d9, #be185d)' }}
              />
              {/* Pulse ring */}
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ border: '2px solid rgba(167,139,250,0.5)' }}
                animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
              <MessageCircle className="w-6 h-6 text-white relative z-10" />
              {/* Unread dot */}
              <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white z-10" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Chat Panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 20, scale: 0.92, originX: 1, originY: 1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 right-0 w-[360px] flex flex-col rounded-2xl overflow-hidden"
              style={{
                height: '520px',
                background: panelBg,
                border: `1px solid ${panelBorder}`,
                backdropFilter: 'blur(24px)',
                boxShadow: isLight
                  ? '0 20px 60px rgba(109,40,217,0.15), 0 4px 20px rgba(0,0,0,0.08)'
                  : '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.1)',
              }}
            >
              {/* Header */}
              <div
                className="px-4 py-3.5 flex items-center justify-between shrink-0"
                style={{
                  background: headerBg,
                  borderBottom: `1px solid ${panelBorder}`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p
                      className="text-sm font-bold leading-none"
                      style={{ fontFamily: "'Syne', sans-serif", color: isLight ? '#0f0a1e' : '#ffffff' }}
                    >
                      Ask About Talha
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-mono" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>
                        AI-powered · Always on
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {messages.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={reset}
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                      style={{
                        background: isLight ? 'rgba(109,40,217,0.08)' : 'rgba(139,92,246,0.1)',
                        color: isLight ? '#7c3aed' : '#a78bfa',
                      }}
                      title="Reset chat"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setOpen(false)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                    style={{
                      background: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.06)',
                      color: isLight ? '#6b7280' : '#9ca3af',
                    }}
                  >
                    <X className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>

              {/* Messages area */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: 'thin' }}>

                {/* Welcome message */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: isLight ? 'rgba(109,40,217,0.1)' : 'rgba(139,92,246,0.15)',
                      border: `1px solid ${isLight ? 'rgba(109,40,217,0.2)' : 'rgba(139,92,246,0.25)'}`,
                    }}
                  >
                    <Bot className="w-3 h-3" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
                  </div>
                  <div
                    className="max-w-[78%] px-3.5 py-2.5 rounded-2xl rounded-bl-[4px] text-sm leading-relaxed"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: isLight ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.05)',
                      color: isLight ? '#374151' : '#e5e7eb',
                      border: `1px solid ${isLight ? 'rgba(109,40,217,0.1)' : 'rgba(139,92,246,0.12)'}`,
                      boxShadow: isLight ? '0 1px 8px rgba(109,40,217,0.06)' : 'none',
                    }}
                  >
                    {WELCOME}
                  </div>
                </motion.div>

                {/* Suggestion chips */}
                <AnimatePresence>
                  {showSuggestions && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-wrap gap-2 pl-8"
                    >
                      {SUGGESTIONS.map((s, i) => (
                        <motion.button
                          key={s}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.06 }}
                          whileHover={{ scale: 1.04, y: -1 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => sendMessage(s)}
                          className="text-xs px-3 py-1.5 rounded-full transition-all duration-200"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            background: isLight ? 'rgba(109,40,217,0.07)' : 'rgba(139,92,246,0.08)',
                            border: `1px solid ${isLight ? 'rgba(109,40,217,0.2)' : 'rgba(139,92,246,0.2)'}`,
                            color: isLight ? '#7c3aed' : '#c4b5fd',
                          }}
                        >
                          {s}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Conversation */}
                {messages.map(msg => (
                  <MessageBubble key={msg.id} msg={msg} isLight={isLight} />
                ))}

                {/* Typing indicator */}
                <AnimatePresence>
                  {loading && <TypingIndicator isLight={isLight} />}
                </AnimatePresence>

                <div ref={bottomRef} />
              </div>

              {/* Input area */}
              <div
                className="px-3 py-3 shrink-0"
                style={{ borderTop: `1px solid ${panelBorder}` }}
              >
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{
                    background: inputBg,
                    border: `1px solid ${inputBorder}`,
                    boxShadow: isLight ? '0 1px 8px rgba(109,40,217,0.06)' : 'none',
                  }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
                    placeholder="Ask anything about Talha..."
                    disabled={loading}
                    className="flex-1 bg-transparent text-sm outline-none"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: isLight ? '#0f0a1e' : '#f3f4f6',
                    }}
                  />
                  <motion.button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || loading}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 disabled:opacity-40"
                    style={{
                      background: input.trim() && !loading
                        ? 'linear-gradient(135deg, #7c3aed, #db2777)'
                        : isLight ? 'rgba(109,40,217,0.1)' : 'rgba(139,92,246,0.1)',
                    }}
                  >
                    {loading
                      ? <Loader2 className="w-4 h-4 animate-spin" style={{ color: isLight ? '#7c3aed' : '#a78bfa' }} />
                      : <Send className="w-4 h-4 text-white" />
                    }
                  </motion.button>
                </div>
                <p
                  className="text-center text-[10px] font-mono mt-2"
                  style={{ color: isLight ? '#d1d5db' : '#374151' }}
                >
                  Powered by OpenRouter · Free LLM
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}