'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Command, Search, Terminal, ArrowRight, Cpu, User, X, Bot, Zap, Code2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export default function AgentOS() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'commands' | 'chat'>('commands')
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => setMounted(true), [])
  const isLight = mounted && theme === 'light'

  // Cmd+K shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const commands = [
    { icon: User, label: 'About Me', action: () => document.getElementById('about')?.scrollIntoView() },
    { icon: Code2, label: 'Projects', action: () => document.getElementById('projects')?.scrollIntoView() },
    { icon: Zap, label: 'Skills', action: () => document.getElementById('skills')?.scrollIntoView() },
    { icon: Cpu, label: 'AI Services', action: () => document.getElementById('services')?.scrollIntoView() },
  ]

  const filteredCommands = commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))

  if (!mounted) return null

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 group flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-xl border border-white/10"
        style={{
          background: isLight ? 'rgba(255,255,255,0.8)' : 'rgba(10,10,15,0.8)',
          boxShadow: '0 8px 32px rgba(124, 58, 237, 0.2)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]">
          <Terminal className="w-4 h-4 text-white" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-xs font-mono font-bold" style={{ color: isLight ? '#374151' : '#f3f4f6' }}>
            Agent OS
          </span>
          <span className="text-[10px] font-mono opacity-60">Press Cmd+K</span>
        </div>
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-[15%] left-1/2 -translate-x-1/2 w-[90%] max-w-[600px] z-50 rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: isLight ? 'rgba(250,250,252,0.95)' : 'rgba(15,15,25,0.95)',
                border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(139, 92, 246, 0.3)'}`,
                boxShadow: isLight ? '0 25px 50px -12px rgba(124,58,237,0.25)' : '0 0 0 1px rgba(139,92,246,0.1), 0 25px 50px -12px rgba(139,92,246,0.3)',
              }}
            >
              {/* Header Input */}
              <div className="relative border-b" style={{ borderColor: isLight ? 'rgba(124, 58, 237, 0.1)' : 'rgba(139, 92, 246, 0.2)' }}>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-500" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask AI or type a command..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent pl-12 pr-12 py-5 text-lg outline-none font-mono"
                  style={{ color: isLight ? '#0f0a1e' : '#f3f4f6' }}
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="text-xs font-mono mb-3 px-2 text-violet-500 font-semibold tracking-wider uppercase">
                  System Commands
                </div>
                <div className="space-y-2">
                  {filteredCommands.length > 0 ? (
                    filteredCommands.map((cmd, i) => (
                      <motion.button
                        key={cmd.label}
                        onClick={() => {
                          cmd.action()
                          setIsOpen(false)
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-xl group transition-colors"
                        style={{ background: isLight ? 'rgba(124,58,237,0.05)' : 'rgba(124,58,237,0.08)' }}
                        whileHover={{ scale: 1.01, background: isLight ? 'rgba(124,58,237,0.1)' : 'rgba(124,58,237,0.15)' }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-500 group-hover:scale-110 transition-transform">
                            <cmd.icon className="w-4 h-4" />
                          </div>
                          <span className="font-mono text-sm" style={{ color: isLight ? '#374151' : '#d1d5db' }}>
                            {cmd.label}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-violet-500 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                      </motion.button>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500 font-mono text-sm">
                      <Bot className="w-8 h-8 mx-auto mb-3 opacity-50" />
                      No commands found. Press Enter to ask AI instead.
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="bg-black/20 p-3 flex justify-between items-center text-[10px] font-mono text-gray-400 border-t" style={{ borderColor: isLight ? 'rgba(124, 58, 237, 0.1)' : 'rgba(139, 92, 246, 0.2)' }}>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/10">↑↓</kbd> to navigate</span>
                  <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/10">Enter</kbd> to select</span>
                </div>
                <span>Agent OS v1.0.0</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
