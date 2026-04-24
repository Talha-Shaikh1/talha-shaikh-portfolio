'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Github, Code2, Sparkles, ArrowUpRight, Cpu, Globe, ShoppingCart, Terminal } from 'lucide-react'
import { useRef } from 'react'
import { usePathname } from 'next/navigation'
import { talhaData, hanzalaData } from '../lib/data'

function ProjectCard({ project, index }: { project: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group relative rounded-[2.5rem] bg-[#0a0a0f] border border-white/10 overflow-hidden p-8 min-h-[320px] flex flex-col justify-between"
    >
      {/* Background Juice */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 blur-[80px]" style={{ background: project.accent, opacity: 0.2 }} />
        <div className="absolute bottom-0 left-0 w-32 h-32 blur-[80px]" style={{ background: project.accent, opacity: 0.1 }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
                <project.icon className="w-7 h-7 text-white/50 group-hover:text-white transition-colors" />
             </div>
             <div>
                <h3 className="text-2xl font-bold font-syne group-hover:text-violet-400 transition-colors">{project.title}</h3>
                <div className="flex gap-2 mt-1">
                   {project.tech.slice(0, 2).map((t: string, i: number) => (
                     <span key={i} className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">{t}</span>
                   ))}
                </div>
             </div>
          </div>
          <div className="flex gap-2">
            <a href={project.github} target="_blank" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Github className="w-5 h-5 text-gray-500 hover:text-white" />
            </a>
            <a href={project.demo} target="_blank" className="p-3 rounded-xl bg-white text-black hover:bg-gray-200 transition-colors">
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed max-w-md">
          {project.description}
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2 mt-8">
        {project.tech.map((t: string, i: number) => (
          <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-mono text-gray-400 uppercase tracking-widest group-hover:border-white/10 transition-colors">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const pathname = usePathname()
  const isHanzalaPage = pathname.includes('/hanzala')
  const currentProjects = isHanzalaPage ? hanzalaData.projects : talhaData.projects

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {currentProjects.map((project: any, i: number) => (
        <ProjectCard key={i} project={project} index={i} />
      ))}
    </div>
  )
}
