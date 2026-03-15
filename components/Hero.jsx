'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const titles = [
  'Mathematician',
  'Filmmaker',
  'Quant Analyst',
  'Policy Advocate',
  'Data Scientist',
  'Storyteller',
  'Researcher',
]

const equations = [
  'E[X] = \u03A3 x\u1D62P(x\u1D62)',
  'P(A|B) = P(B|A)\u00B7P(A) / P(B)',
  '\u222B\u2080^\u221E f(x)dx = 1',
  '\u03C3\u00B2 = E[(X-\u03BC)\u00B2]',
  'lim n\u2192\u221E (1+1/n)\u207F = e',
  '\u03A6(z) = P(Z \u2264 z)',
  'R\u00B2 = 1 - SS\u1D63\u2091\u209B/SS\u209C\u2092\u209C',
  '\u2207f(x) = 0',
  'f(x) = \u03A3 a\u2099x\u207F',
  'det(A-\u03BBI) = 0',
]

const cities = [
  { name: 'San Francisco', x: 0.08, y: 0.38 },
  { name: 'New York', x: 0.22, y: 0.35 },
  { name: 'S\u00E3o Paulo', x: 0.30, y: 0.72 },
  { name: 'London', x: 0.47, y: 0.28 },
  { name: 'Dubai', x: 0.60, y: 0.42 },
  { name: 'Singapore', x: 0.74, y: 0.55 },
  { name: 'Tokyo', x: 0.82, y: 0.36 },
  { name: 'Sydney', x: 0.85, y: 0.72 },
  { name: 'Mumbai', x: 0.65, y: 0.48 },
  { name: 'Nairobi', x: 0.57, y: 0.56 },
]

const connections = [
  [0, 2],
  [0, 1],
  [1, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [2, 3],
  [4, 8],
  [5, 7],
  [1, 2],
  [6, 7],
  [3, 5],
  [8, 9],
  [9, 4],
]

export default function Hero() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const [currentTitle, setCurrentTitle] = useState('')
  const [titleIndex, setTitleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleMouseMove = useCallback((e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles = []
      const count = Math.min(
        Math.floor((canvas.width * canvas.height) / 18000),
        80
      )
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        const dx = mouseRef.current.x - p.x
        const dy = mouseRef.current.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200 && dist > 0) {
          p.vx += (dx / dist) * 0.02
          p.vy += (dy / dist) * 0.02
        }
        p.vx *= 0.99
        p.vy *= 0.99
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0, 212, 170, ${0.12 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath()
        ctx.fillStyle = 'rgba(0, 212, 170, 0.5)'
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      resize()
      createParticles()
    }

    resize()
    createParticles()
    animate()

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  useEffect(() => {
    const target = titles[titleIndex]
    let timeout

    if (!isDeleting) {
      if (currentTitle.length < target.length) {
        timeout = setTimeout(() => {
          setCurrentTitle(target.slice(0, currentTitle.length + 1))
        }, 80)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000)
      }
    } else {
      if (currentTitle.length > 0) {
        timeout = setTimeout(() => {
          setCurrentTitle(currentTitle.slice(0, -1))
        }, 40)
      } else {
        setIsDeleting(false)
        setTitleIndex((prev) => (prev + 1) % titles.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [currentTitle, isDeleting, titleIndex])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="absolute inset-0 grid-overlay z-[1]" />

      {/* World map SVG */}
      <div className="absolute inset-0 z-[2] flex items-center justify-center opacity-20">
        <svg viewBox="0 0 1000 500" className="w-full max-w-5xl" fill="none">
          {connections.map(([from, to], i) => {
            const c1 = cities[from]
            const c2 = cities[to]
            const midX = (c1.x + c2.x) / 2
            const midY = Math.min(c1.y, c2.y) - 0.08
            return (
              <motion.path
                key={`conn-${i}`}
                d={`M ${c1.x * 1000} ${c1.y * 500} Q ${midX * 1000} ${midY * 500} ${c2.x * 1000} ${c2.y * 500}`}
                stroke="#00d4aa"
                strokeWidth="1"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            )
          })}
          {cities.map((city, i) => (
            <g key={city.name}>
              <motion.circle
                cx={city.x * 1000}
                cy={city.y * 500}
                r="4"
                fill="#00d4aa"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              />
              <motion.circle
                cx={city.x * 1000}
                cy={city.y * 500}
                r="8"
                fill="none"
                stroke="#00d4aa"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{
                  delay: i * 0.1 + 0.5,
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Floating equations */}
      <div className="absolute inset-0 z-[3] overflow-hidden pointer-events-none">
        {equations.map((eq, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-teal/[0.07] text-sm md:text-base whitespace-nowrap select-none"
            style={{
              left: `${(i * 17 + 5) % 90}%`,
              top: `${(i * 23 + 10) % 80}%`,
            }}
            animate={{
              y: [0, -30, -10, -40, 0],
              x: [0, 15, -10, 5, 0],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {eq}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-mono text-xs text-teal/60 tracking-[0.3em] uppercase mb-4">
            {'//'} portfolio.init()
          </div>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-white">LUIZ FELIPE</span>
            <br />
            <span className="text-gradient-teal">BARBOSA</span>
          </h1>

          <div className="h-8 flex items-center justify-center mb-8">
            <span className="font-mono text-lg md:text-xl text-gold tracking-wide">
              {currentTitle}
              <span className="animate-typewriter-cursor text-teal">|</span>
            </span>
          </div>

          <p className="font-body text-gray-400 max-w-lg mx-auto mb-10 text-sm md:text-base">
            UC Berkeley &middot; Mathematics &amp; Statistics + Media
            Studies &middot; Where Numbers Meet Narrative
          </p>

          <div className="flex gap-4 justify-center">
            <a
              href="#projects"
              className="px-6 py-3 bg-teal/10 border border-teal/30 text-teal font-mono text-sm rounded hover:bg-teal/20 transition-all hover:shadow-[0_0_20px_rgba(0,212,170,0.2)]"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 bg-gold/10 border border-gold/30 text-gold font-mono text-sm rounded hover:bg-gold/20 transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-teal/40" size={24} />
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-midnight to-transparent z-[4]" />
    </section>
  )
}
