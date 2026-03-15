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

        <div className="grid md:grid-cols-2 gap-12">
          {/* Stats panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 relative overflow-hidden"
          >
            <div className="classified-stamp text-red-500/30">CLASSIFIED</div>
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

            <div className="mt-8 pt-6 border-t border-midnight-300/50">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-mono text-gray-500">Institution</span>
                  <span className="text-white">UC Berkeley</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-mono text-gray-500">Degree</span>
                  <span className="text-white">
                    BA Mathematics (Statistics)
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-mono text-gray-500">Minor</span>
                  <span className="text-white">Media Studies</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-mono text-gray-500">Clearance</span>
                  <span className="text-gold font-mono">Dec 2026</span>
                </div>
              </div>
            </div>

            {/* Scan line */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-full h-px bg-teal/10 animate-scan" />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass-card p-8 relative">
              <div className="font-mono text-xs text-gold/60 tracking-wider uppercase mb-4">
                Subject Profile
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Mathematics and Statistics student at UC Berkeley with a focus
                  on quantitative analysis, prediction markets, and
                  computational research. Combines rigorous statistical
                  methodology with real-world applications in financial markets
                  and geopolitical forecasting.
                </p>
                <p>
                  Built and backtested algorithmic trading systems for political
                  prediction markets, achieving a 2.36x profit factor across
                  28,903+ simulated trades. Research interests span the
                  intersection of probability theory, behavioral economics, and
                  market microstructure.
                </p>
                <p>
                  Previously contributed to AI/ML infrastructure at Industry
                  Ventures, developing semantic search systems and document
                  intelligence pipelines using LangChain and Azure AI services.
                </p>
              </div>
            </div>

            {/* Awards */}
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
