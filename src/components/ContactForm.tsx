'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Send, User, MessageSquare, Terminal, CheckCircle2, Loader2 } from 'lucide-react'
import { useState } from 'react'

export default function ContactForm() {
  const [focused, setFocused] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative p-8 lg:p-12 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-600/10 blur-[80px]" />

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                   <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-black font-syne uppercase mb-2">Transmission Received</h3>
                <p className="text-gray-400">I'll get back to you as soon as possible!</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-sm font-bold text-violet-400 hover:text-white transition-colors uppercase tracking-widest"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Terminal className="w-5 h-5 text-violet-500" />
                  <h2 className="text-xl font-bold font-syne uppercase tracking-widest">Send Transmission</h2>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                      <div className={`relative transition-all duration-300 ${focused === 'name' ? 'ring-2 ring-violet-500/50' : ''} rounded-xl bg-black/40 border border-white/5 overflow-hidden`}>
                         <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                           <User className="w-4 h-4" />
                         </div>
                         <input 
                          required
                          type="text" 
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          onFocus={() => setFocused('name')}
                          onBlur={() => setFocused(null)}
                          className="w-full bg-transparent px-12 py-4 text-sm focus:outline-none placeholder:text-gray-700 text-white"
                         />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                      <div className={`relative transition-all duration-300 ${focused === 'email' ? 'ring-2 ring-violet-500/50' : ''} rounded-xl bg-black/40 border border-white/5 overflow-hidden`}>
                         <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                           <Mail className="w-4 h-4" />
                         </div>
                         <input 
                          required
                          type="email" 
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          onFocus={() => setFocused('email')}
                          onBlur={() => setFocused(null)}
                          className="w-full bg-transparent px-12 py-4 text-sm focus:outline-none placeholder:text-gray-700 text-white"
                         />
                      </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">Message</label>
                    <div className={`relative transition-all duration-300 ${focused === 'message' ? 'ring-2 ring-violet-500/50' : ''} rounded-xl bg-black/40 border border-white/5 overflow-hidden`}>
                       <div className="absolute left-4 top-6 text-gray-500">
                         <MessageSquare className="w-4 h-4" />
                       </div>
                       <textarea 
                        required
                        rows={4}
                        placeholder="Tell me about your project..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                        className="w-full bg-transparent px-12 py-6 text-sm focus:outline-none placeholder:text-gray-700 resize-none text-white"
                       />
                    </div>
                  </div>

                  {status === 'error' && (
                    <p className="text-xs text-red-500 font-mono text-center">Failed to send transmission. Please try again.</p>
                  )}

                  <motion.button
                    disabled={status === 'loading'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 rounded-2xl bg-white text-black font-black text-lg flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)] group disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <span>INTIATE TRANSMISSION</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
