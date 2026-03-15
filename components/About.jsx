'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useHasMounted } from '../lib/useHasMounted'

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

const academicStats = [
  { label: 'GPA', value: 3.88, suffix: '', decimals: 2 },
  { label: 'Dean\'s List Awards', value: 4, suffix: '', decimals: 0 },
  { label: 'Languages Spoken', value: 3, suffix: '', decimals: 0 },
  { label: 'Majors', value: 2, suffix: '', decimals: 0 },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const hasMounted = useHasMounted()

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={hasMounted ? { opacity: 0, x: -30 } : false}
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

        {/* Intel Brief — three columns */}
        <motion.div
          initial={hasMounted ? { opacity: 0, y: 30 } : false}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12 items-start"
        >
          {/* Academic Record */}
          <div className="glass-card p-6 relative overflow-hidden">
            <div className="classified-stamp text-red-500/30">CLASSIFIED</div>
            <div className="font-mono text-xs text-teal/60 tracking-wider uppercase mb-4">Academic Record</div>
            <div className="space-y-3">
              <div>
                <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-1">Institution</div>
                <div className="text-white text-sm font-semibold">University of California, Berkeley</div>
              </div>
              <div>
                <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-1">Degree</div>
                <div className="text-teal text-sm">B.A. Mathematics (Statistics)</div>
                <div className="text-amber-400 text-sm">B.A. Media Studies (Law &amp; Policy)</div>
              </div>
              <div>
                <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-1">Expected</div>
                <div className="text-gold font-mono text-sm">December 2026</div>
              </div>
              <div className="pt-2 border-t border-white/5">
                <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-1">GPA</div>
                <AnimatedCounter target={3.88} suffix="" decimals={2} />
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-full h-px bg-teal/10 animate-scan" />
            </div>
          </div>

          {/* Subject Profile */}
          <div className="glass-card p-6 relative overflow-hidden md:col-span-2">
            <div className="font-mono text-xs text-teal/60 tracking-wider uppercase mb-4">Subject Profile</div>
            <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
              <p>
                I grew up in an environment where questions were valued more than answers — a noisy hub of exchange where people constantly debated business, art, science, and current events. That shaped the way I think and inspired my decision to pursue a double major in Mathematics and Media Studies.
              </p>
              <p>
                These two fields help me view the world in fundamentally different ways. Mathematics taught me rigor: how to think clearly, break down difficult problems, and find structure within chaos. Media Studies — and in particular my passion for geopolitics — taught me to examine how narratives are constructed, how perspectives are circulated, and how information is contested. Together, they push me toward interdisciplinary and unorthodox approaches, framing problems both analytically and creatively.
              </p>
              <p>
                I am most drawn to problems that sit at the intersection of quantitative reasoning, information flow, and real-world events. I see data not just as numbers, but as a real-time, quantifiable reflection of how narratives, incentives, and beliefs move through the world — and I find that deeply compelling.
              </p>
              <p>
                Outside of coursework, I build things. I have deployed a live algorithmic trading system for prediction markets, published NLP research on cultural theory and social data, and built geography games used by thousands. I approach all of it the same way: with genuine curiosity and a bias toward action.
              </p>
            </div>
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-full h-px bg-teal/10 animate-scan" />
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Education & Bio */}
          <motion.div
            initial={hasMounted ? { opacity: 0, y: 30 } : false}
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
            initial={hasMounted ? { opacity: 0, y: 30 } : false}
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
                  "Dean's Honors List — UC Berkeley: Fall 2024",
                  "Dean's Honors List — UC Riverside: Winter 2023/24, Spring 2023/24, Fall 2023",
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
