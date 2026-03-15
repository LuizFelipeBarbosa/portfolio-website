'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

const links = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/LuizFelipeBarbosa',
    handle: '@LuizFelipeBarbosa',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/luizfelipebarbosa/',
    handle: 'Luiz Felipe Barbosa',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:lfpmb1@icloud.com',
    handle: 'lfpmb1@icloud.com',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="font-mono text-xs text-teal/60 tracking-[0.2em] uppercase mb-2">
            Section 05
          </div>
          <h2 className="section-heading">
            <span className="text-white">OPEN</span>{' '}
            <span className="text-teal">CHANNEL</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto font-body">
            Available for research collaborations, quantitative roles, and
            interesting conversations about markets and mathematics.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label !== 'Email' ? '_blank' : undefined}
              rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card px-8 py-6 flex items-center gap-4 hover:border-teal/30 transition-all group w-full sm:w-auto"
            >
              <link.icon
                size={20}
                className="text-teal group-hover:scale-110 transition-transform"
              />
              <div>
                <div className="font-heading font-bold text-white text-sm">
                  {link.label}
                </div>
                <div className="font-mono text-xs text-gray-500">
                  {link.handle}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-midnight-300/50 pt-8 text-center">
          <div className="font-mono text-xs text-gray-600">
            <span className="text-teal/40">{'>'}</span> Designed &amp; built by
            Luiz Felipe Barbosa
            <span className="mx-2 text-gray-700">|</span>
            &copy; 2026
            <span className="mx-2 text-gray-700">|</span>
            Next.js + Tailwind CSS + Framer Motion
          </div>
        </div>
      </div>
    </section>
  )
}
