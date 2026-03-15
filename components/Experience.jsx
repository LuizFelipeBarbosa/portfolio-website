'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, Users, Film } from 'lucide-react'

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
    type: 'media',
    title: 'Director & Producer',
    company: 'UCR Media and Cultural Studies Dept',
    location: 'Riverside, CA',
    period: 'Mar 2024 \u2014 Jun 2024',
    description: [
      'Directed and produced 14 professional faculty interview videos for the department',
      'Managed full production pipeline from pre-production planning through post-production editing',
      'Collaborated with faculty to craft compelling narratives highlighting research and teaching',
    ],
    tags: ['Film Direction', 'Video Production', 'Adobe Premiere', 'Storytelling'],
  },
  {
    type: 'media',
    title: 'Associate Producer',
    company: 'Ghosts of Adelanto Documentary',
    location: 'Washington, D.C. / Riverside, CA',
    period: 'Sep 2023 \u2014 Dec 2023',
    description: [
      'Associate produced documentary investigating immigration detention in Adelanto, CA',
      'Organized Congressional lobbying event with 50+ UC students and Congressman Mark Takano in Washington, D.C.',
      'Coordinated logistics for advocacy campaign connecting documentary storytelling with policy action',
    ],
    tags: ['Documentary', 'Policy Advocacy', 'Event Organizing', 'Congressional Lobbying'],
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
  const isMedia = experience.type === 'media'
  const Icon = experience.type === 'work' ? Briefcase : experience.type === 'media' ? Film : Users
  const accent = isMedia ? 'amber-400' : 'teal'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-12 md:pl-20"
    >
      {/* Timeline dot */}
      <div className={`absolute left-[10px] md:left-[26px] top-2 w-3 h-3 rounded-full ${isMedia ? 'bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)]' : 'bg-teal glow-teal'}`} />

      <div className={`glass-card p-6 md:p-8 relative overflow-hidden group transition-colors ${isMedia ? 'hover:border-amber-400/30' : 'hover:border-teal/30'}`}>
        <div className={`classified-stamp opacity-0 group-hover:opacity-100 transition-opacity ${isMedia ? 'text-amber-400/20' : 'text-teal/20'}`}>
          {experience.type === 'work' ? 'ACTIVE' : experience.type === 'media' ? 'PRODUCTION' : 'LEADERSHIP'}
        </div>

        <div className="flex flex-wrap items-start gap-3 mb-4">
          <div className={`p-2 rounded ${isMedia ? 'bg-amber-400/10' : 'bg-teal/10'}`}>
            <Icon size={16} className={isMedia ? 'text-amber-400' : 'text-teal'} />
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
              <span className={`${isMedia ? 'text-amber-400' : 'text-teal'} mt-1 flex-shrink-0`}>&rsaquo;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-1 text-xs font-mono rounded ${isMedia ? 'text-amber-400/70 bg-amber-400/5 border border-amber-400/10' : 'text-teal/70 bg-teal/5 border border-teal/10'}`}
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
