'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function AnimatedCounter({ target, suffix = '', decimals = 0 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / 60
    const interval = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(interval)
  }, [inView, target])

  return (
    <span
      ref={ref}
      className="font-mono text-3xl md:text-4xl font-bold text-teal"
    >
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  )
}

const stats = [
  { label: 'GPA', value: 3.88, suffix: '', decimals: 2 },
  { label: 'Backtested Trades', value: 28903, suffix: '+', decimals: 0 },
  { label: 'Win Rate', value: 52.8, suffix: '%', decimals: 1 },
  { label: 'Profit Factor', value: 2.36, suffix: 'x', decimals: 2 },
]

const mediaStats = [
  { label: 'Films Directed', value: 14, suffix: '', icon: '🎬' },
  { label: 'Lobbied Congress', value: 1, suffix: '', icon: '🏛️' },
  { label: 'Languages Spoken', value: 3, suffix: '', icon: '🌎' },
  { label: 'Events Organized', value: 5, suffix: '+', icon: '🎤' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-teal/60 tracking-[0.2em] uppercase mb-2">
            Section 01
          </div>
          <h2 className="section-heading">
            <span className="text-white">INTEL</span>{' '}
            <span className="text-teal">BRIEF</span>
          </h2>
        </motion.div>

        {/* Two-brain dimension panels */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Left Brain — Quant */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 relative overflow-hidden"
          >
            <div className="classified-stamp text-red-500/30">CLASSIFIED</div>
            <div className="font-mono text-xs text-teal/60 tracking-wider uppercase mb-2">
              Left Brain &mdash; Logic &amp; Numbers
            </div>
            <div className="font-mono text-xs text-gold/60 tracking-wider uppercase mb-6">
              Personnel File &mdash; Active
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                  <div className="font-mono text-xs text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Scan line */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-full h-px bg-teal/10 animate-scan" />
            </div>
          </motion.div>

          {/* Right Brain — Media & Policy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="glass-card p-8 relative overflow-hidden border-amber-500/20"
          >
            <div className="classified-stamp text-amber-500/30">DISPATCH</div>
            <div className="font-mono text-xs text-amber-400/60 tracking-wider uppercase mb-2">
              Right Brain &mdash; Narrative &amp; Impact
            </div>
            <div className="font-mono text-xs text-gold/60 tracking-wider uppercase mb-6">
              Creative Dossier &mdash; Active
            </div>

            <div className="grid grid-cols-2 gap-6">
              {mediaStats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl">{stat.icon}</span>
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      decimals={0}
                    />
                  </div>
                  <div className="font-mono text-xs text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Scan line amber */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-full h-px bg-amber-500/10 animate-scan" />
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Education & Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Education card */}
            <div className="glass-card p-6">
              <div className="font-mono text-xs text-teal/60 tracking-wider uppercase mb-4">
                Academic Record
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-mono text-gray-500">Institution</span>
                  <span className="text-white">UC Berkeley</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-mono text-gray-500">Major 1</span>
                  <span className="text-teal">
                    BA Mathematics (Statistics)
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-mono text-gray-500">Major 2</span>
                  <span className="text-amber-400">
                    Media Studies (Law &amp; Policy)
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-mono text-gray-500">Clearance</span>
                  <span className="text-gold font-mono">Dec 2026</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="glass-card p-8 relative">
              <div className="font-mono text-xs text-gold/60 tracking-wider uppercase mb-4">
                Subject Profile
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Double major in Mathematics/Statistics and Media Studies (Law &amp;
                  Policy) at UC Berkeley. Bridges quantitative rigor with narrative
                  power — from algorithmic trading to documentary filmmaking, from
                  statistical modeling to Congressional advocacy.
                </p>
                <p>
                  On the quant side: built and backtested algorithmic trading
                  systems for political prediction markets, achieving a 2.36x
                  profit factor across 28,903+ simulated trades. Contributed to
                  AI/ML infrastructure at Industry Ventures.
                </p>
                <p>
                  On the media side: directed 14 professional faculty interview
                  videos at UC Riverside, associate-produced a documentary on
                  immigration detention, and organized a Congressional lobbying
                  event in Washington D.C. with Congressman Mark Takano.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Awards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-6"
          >
            <div className="glass-card p-4">
              <div className="font-mono text-xs text-teal/60 tracking-wider uppercase mb-3">
                Distinctions
              </div>
              <div className="space-y-2">
                {[
                  "Dean's Honors List \u2014 UC Berkeley (2024\u20132025)",
                  "Dean's Honors List \u2014 UC Riverside (2023\u20132024)",
                  'UK Mathematics Trust \u2014 Senior Gold (2021)',
                ].map((award, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-400"
                  >
                    <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                    {award}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
