'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Command, Search, Terminal, ArrowRight, Cpu, User, X, Bot, Zap, Code2, Sparkles, MessageSquare, Globe, Send, Shield, Activity } from 'lucide-react'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { talhaData, hanzalaData } from '../lib/data'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function AgentOS() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'commands' | 'ai' | 'status'>('commands')
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant', content: string }[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const isHanzalaPage = pathname.includes('/hanzala')
  const currentData = isHanzalaPage ? hanzalaData : talhaData

  useEffect(() => setMounted(true), [])
  const isLight = mounted && theme === 'light'

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatHistory])

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
    { icon: User, label: `About ${currentData.firstName}`, action: () => document.getElementById('about')?.scrollIntoView() },
    { icon: Code2, label: 'View Projects', action: () => document.getElementById('projects')?.scrollIntoView() },
    { icon: Zap, label: 'Technical Skills', action: () => document.getElementById('skills')?.scrollIntoView() },
    { icon: MessageSquare, label: 'Contact Directly', action: () => document.getElementById('contact')?.scrollIntoView() },
    { icon: Globe, label: 'Website Status', action: () => setActiveTab('status') },
  ]

  const filteredCommands = commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))

  const handleSendMessage = () => {
    if (!query.trim()) return

    const userMessage = query
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }])
    setQuery('')
    setIsTyping(true)
    setActiveTab('ai')

    // Simulate AI Response
    setTimeout(() => {
      let response = ""
      const q = userMessage.toLowerCase()
      
      if (q.includes('who') || q.includes('about')) {
        response = `${currentData.firstName} is a ${currentData.role}. ${currentData.bio.slice(0, 100)}...`
      } else if (q.includes('skill') || q.includes('tech')) {
        response = `The core tech stack includes ${currentData.techStack.map(s => s.name).join(', ')}.`
      } else if (q.includes('contact') || q.includes('hire')) {
        response = `You can reach out via WhatsApp at ${currentData.whatsapp} or email at ${currentData.email}.`
      } else {
        response = `I am ${currentData.firstName}'s AI Agent. I can help you navigate the portfolio, show projects, or answer questions about his expertise. What would you like to know?`
      }

      setChatHistory(prev => [...prev, { role: 'assistant', content: response }])
      setIsTyping(false)
    }, 1000)
  }

  if (!mounted) return null

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[100] group flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-xl border border-white/10 overflow-hidden"
        style={{
          background: isLight ? 'rgba(255,255,255,0.8)' : 'rgba(10,10,15,0.8)',
          boxShadow: '0 8px 32px rgba(124, 58, 237, 0.2)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-[0_0_15px_rgba(139,92,246,0.5)] relative z-10">
          <Terminal className="w-4 h-4 text-white" />
        </div>
        <div className="flex flex-col items-start relative z-10">
          <span className="text-xs font-mono font-bold" style={{ color: isLight ? '#374151' : '#f3f4f6' }}>
            {currentData.firstName}OS <span className="text-[10px] text-violet-400 font-black">PRO</span>
          </span>
          <span className="text-[10px] font-mono opacity-60">Press Cmd+K</span>
        </div>
        <div className="ml-2 flex gap-1">
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse delay-75" />
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse delay-150" />
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
              className="fixed inset-0 z-[101] bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-[15%] left-1/2 -translate-x-1/2 w-[95%] max-w-[700px] z-[102] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
              style={{
                background: isLight ? 'rgba(250,250,252,0.98)' : '#0a0a0f',
                border: `1px solid ${isLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(139, 92, 246, 0.3)'}`,
                height: '500px'
              }}
            >
              {/* Header Input */}
              <div className="relative border-b" style={{ borderColor: isLight ? 'rgba(124, 58, 237, 0.1)' : 'rgba(139, 92, 246, 0.2)' }}>
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-500" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={activeTab === 'ai' ? "Message AI Agent..." : "Ask AI or type a command..."}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="w-full bg-transparent pl-14 pr-24 py-6 text-xl outline-none font-mono"
                  style={{ color: isLight ? '#0f0a1e' : '#f3f4f6' }}
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
                    {query && (
                        <button 
                            onClick={handleSendMessage}
                            className="p-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    )}
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-4 px-6 py-3 border-b" style={{ borderColor: isLight ? 'rgba(124, 58, 237, 0.1)' : 'rgba(139, 92, 246, 0.1)' }}>
                {[
                  { id: 'commands', label: 'Commands', icon: Terminal },
                  { id: 'ai', label: 'AI Agent', icon: Sparkles },
                  { id: 'status', label: 'System Status', icon: Activity }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      activeTab === tab.id 
                        ? 'bg-violet-600 text-white' 
                        : 'text-gray-500 hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="w-3 h-3" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6" style={{ overscrollBehavior: 'contain' }}>
                {activeTab === 'commands' && (
                  <div className="space-y-3">
                    <div className="text-[10px] font-mono text-violet-500 font-bold uppercase tracking-widest mb-4">Navigation & Actions</div>
                    {filteredCommands.map((cmd, i) => (
                      <motion.button
                        key={cmd.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => {
                          cmd.action()
                          setIsOpen(false)
                        }}
                        className="w-full flex items-center justify-between p-4 rounded-2xl group transition-all"
                        style={{ background: isLight ? 'rgba(124,58,237,0.05)' : 'rgba(255,255,255,0.03)' }}
                        whileHover={{ x: 8, background: isLight ? 'rgba(124,58,237,0.1)' : 'rgba(255,255,255,0.06)' }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-500 group-hover:rotate-12 transition-transform">
                            <cmd.icon className="w-5 h-5" />
                          </div>
                          <span className="font-mono text-sm font-bold" style={{ color: isLight ? '#374151' : '#d1d5db' }}>
                            {cmd.label}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-violet-500 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                      </motion.button>
                    ))}
                  </div>
                )}

                {activeTab === 'ai' && (
                  <div className="space-y-4">
                    {chatHistory.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                        <Bot className="w-12 h-12 text-violet-500 mb-4 opacity-50" />
                        <h4 className="text-sm font-bold font-mono mb-2">I am {currentData.firstName}'s Neural Assistant</h4>
                        <p className="text-xs text-gray-500 font-mono max-w-xs">Ask me about his projects, skills, or professional experience.</p>
                      </div>
                    )}
                    {chatHistory.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] p-4 rounded-2xl font-mono text-sm ${
                            msg.role === 'user' 
                              ? 'bg-violet-600 text-white rounded-tr-none' 
                              : 'bg-white/5 text-gray-300 rounded-tl-none border border-white/5'
                          }`}
                        >
                          {msg.role === 'user' ? (
                            msg.content
                          ) : (
                            <ReactMarkdown 
                              remarkPlugins={[remarkGfm]}
                              components={{
                                p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                                ul: ({children}) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                                ol: ({children}) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                                li: ({children}) => <li className="mb-1">{children}</li>,
                                code: ({children}) => <code className="bg-white/20 px-1 rounded text-xs">{children}</code>,
                                a: ({href, children}) => <a href={href} target="_blank" className="text-violet-400 underline">{children}</a>
                              }}
                            >
                              {msg.content}
                            </ReactMarkdown>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                          <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce delay-75" />
                          <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce delay-150" />
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                )}

                {activeTab === 'status' && (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-emerald-500" />
                            <span className="font-mono text-sm font-bold text-white">System Security</span>
                        </div>
                        <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-500 text-[10px] font-black font-mono">ACTIVE</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <div className="text-[10px] text-gray-500 font-mono uppercase">Neural Core</div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div className="h-full bg-violet-500" initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1.5 }} />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-[10px] text-gray-500 font-mono uppercase">Uptime</div>
                            <div className="text-sm font-mono text-white">99.99%</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 rounded-2xl bg-violet-600/10 border border-violet-500/20">
                        <div className="flex items-center gap-3 mb-4">
                            <Bot className="w-5 h-5 text-violet-500" />
                            <span className="font-mono text-sm font-bold text-white">Agent Capabilities</span>
                        </div>
                        <ul className="space-y-2">
                            {['Auto-Navigation', 'Context Awareness', 'Neural Chat', 'System Monitoring'].map(cap => (
                                <li key={cap} className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                                    <Zap className="w-3 h-3 text-violet-500" /> {cap}
                                </li>
                            ))}
                        </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-white/5 p-4 flex justify-between items-center text-[10px] font-mono text-gray-500 border-t" style={{ borderColor: isLight ? 'rgba(124, 58, 237, 0.1)' : 'rgba(139, 92, 246, 0.1)' }}>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/10">↑↓</kbd> to navigate</span>
                  <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/10">Enter</kbd> to message</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{currentData.firstName} Neural Link v2.0.4</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
