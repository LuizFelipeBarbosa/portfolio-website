'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, Users } from 'lucide-react'

const experiences = [
  {
    type: 'work',
    title: 'Analyst Intern',
    company: 'Base Partners',
    location: 'S\u00E3o Paulo, Brazil',
    period: 'Jan 2026 \u2014 Present',
    description: [
      'Conducting market research and financial modeling for early-stage investment evaluation across LatAm tech ecosystem',
      'Performing expert interviews via Tegus to validate product-market fit and competitive positioning',
      'Building financial models and investment memos for deal pipeline analysis',
    ],
    tags: [
      'Financial Modeling',
      'Market Research',
      'Due Diligence',
      'Python',
      'Excel',
    ],
  },
  {
    type: 'work',
    title: 'Data Science Intern',
    company: 'Industry Ventures',
    location: 'San Francisco, CA',
    period: 'Jun 2025 \u2014 Aug 2025',
    description: [
      'Developed LDA topic modeling pipeline to analyze and classify deal flow documents',
      'Built semantic search system using Azure Cognitive Search + LangChain for internal knowledge retrieval',
      'Engineered document intelligence pipeline for automated PDF/PowerPoint data extraction',
      'Created AI-powered chatbot using LangGraph with web-integrated retrieval augmented generation',
    ],
    tags: ['Python', 'LangChain', 'LangGraph', 'Azure AI', 'NLP', 'ML'],
  },
  {
    type: 'leadership',
    title: 'Co-President, Technology & Marketing',
    company: 'BRASA UC Berkeley',
    location: 'Berkeley, CA',
    period: 'Aug 2024 \u2014 Present',
    description: [
      'Leading technology infrastructure and marketing strategy for Brazilian Students Association',
      'Designed and maintained organization website, creating marketing materials for events and outreach',
    ],
    tags: ['Leadership', 'React', 'Marketing', 'Web Development'],
  },
]

function TimelineEntry({ experience, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = experience.type === 'work' ? Briefcase : Users

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-12 md:pl-20"
    >
      {/* Timeline dot */}
      <div className="absolute left-[10px] md:left-[26px] top-2 w-3 h-3 rounded-full bg-teal glow-teal" />

      <div className="glass-card p-6 md:p-8 relative overflow-hidden group hover:border-teal/30 transition-colors">
        <div className="classified-stamp text-teal/20 opacity-0 group-hover:opacity-100 transition-opacity">
          {experience.type === 'work' ? 'ACTIVE' : 'LEADERSHIP'}
        </div>

        <div className="flex flex-wrap items-start gap-3 mb-4">
          <div className="p-2 bg-teal/10 rounded">
            <Icon size={16} className="text-teal" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-bold text-lg text-white">
              {experience.title}
            </h3>
            <div className="font-mono text-sm text-gold">
              {experience.company}
            </div>
          </div>
          <div className="font-mono text-xs text-gray-500">
            {experience.period}
          </div>
        </div>

        <div className="font-mono text-xs text-gray-600 mb-4">
          {experience.location}
        </div>

        <ul className="space-y-2 mb-4">
          {experience.description.map((item, j) => (
            <li key={j} className="flex gap-2 text-sm text-gray-400">
              <span className="text-teal mt-1 flex-shrink-0">&rsaquo;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-mono text-teal/70 bg-teal/5 border border-teal/10 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-teal/60 tracking-[0.2em] uppercase mb-2">
            Section 02
          </div>
          <h2 className="section-heading">
            <span className="text-white">FIELD</span>{' '}
            <span className="text-teal">OPERATIONS</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-teal/50 via-teal/20 to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <TimelineEntry key={i} experience={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
