'use client'

import { useEffect, useRef } from 'react'

export default function ParticleNetwork({ isLight }: { isLight: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    
    // Mouse interaction
    const mouse = { x: -9999, y: -9999, radius: 150 }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const handleMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }
    window.addEventListener('resize', resize)

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      baseX: number
      baseY: number
      density: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.baseX = x
        this.baseY = y
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.size = Math.random() * 2 + 0.5
        this.density = (Math.random() * 30) + 1
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Bounce off edges
        if (this.x < 0 || this.x > canvas!.width) this.vx = -this.vx
        if (this.y < 0 || this.y > canvas!.height) this.vy = -this.vy

        // Mouse interaction (push away)
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance
        
        const maxDistance = mouse.radius
        let force = (maxDistance - distance) / maxDistance
        if (force < 0) force = 0

        const directionX = (forceDirectionX * force * this.density)
        const directionY = (forceDirectionY * force * this.density)

        if (distance < mouse.radius) {
          this.x -= directionX
          this.y -= directionY
        } else {
          // Return to base slowly if not pushed
          if (this.x !== this.baseX) {
             let d = this.x - this.baseX
             this.x -= d/40
          }
          if (this.y !== this.baseY) {
             let d = this.y - this.baseY
             this.y -= d/40
          }
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fillStyle = isLight ? 'rgba(124, 58, 237, 0.4)' : 'rgba(139, 92, 246, 0.6)'
        ctx.fill()
      }
    }

    const init = () => {
      particles = []
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 10000)
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        particles.push(new Particle(x, y))
      }
    }

    const connect = () => {
      let opacityValue = 1
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 120) {
            opacityValue = 1 - (distance / 120)
            if (!ctx) return
            ctx.strokeStyle = isLight 
              ? `rgba(124, 58, 237, ${opacityValue * 0.2})` 
              : `rgba(139, 92, 246, ${opacityValue * 0.2})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }
      connect()
    }

    resize()
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isLight])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  )
}
