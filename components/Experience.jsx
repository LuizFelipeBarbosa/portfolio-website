'use client'

import { useRef } from 'react'
import { useHasMounted } from '../lib/useHasMounted'
import { motion, useInView } from 'framer-motion'
import { Briefcase, Users, Film } from 'lucide-react'

const experiences = [
  {
    type: 'work',
    title: 'Analyst Intern',
    company: 'Base Partners',
    location: 'São Paulo, Brazil',
    period: 'Jan 2026 — Present',
    description: [
      'Applied a hypothesis-driven, scientific-method approach to market research and financial analysis to evaluate current portfolio companies across fintech, SaaS, and consumer sectors',
      'Led expert interviews and ran sentiment analysis on online reviews/forums/social data to assess product-market fit, consumer behavior, and competitive positioning',
      'Synthesized findings into investment memos for partner review',
    ],
    tags: [
      'Market Research',
      'Financial Analysis',
      'Due Diligence',
      'Sentiment Analysis',
      'Investment Memos',
    ],
  },
  {
    type: 'work',
    title: 'Data Science Intern',
    company: 'Industry Ventures',
    location: 'San Francisco, California',
    period: 'Jun 2025 — Aug 2025',
    description: [
      'Used Latent Dirichlet Allocation (LDA) for topic modeling on 150,000+ historical deal memos to identify recurring patterns behind failed investments; automated data ingestion, topic modeling, and visualization pipeline',
      'Built a semantic search system using Azure Cognitive Search, LangChain, and LangGraph to quickly and accurately find information within thousands of internal company documents',
      'Integrated Azure Document Intelligence for structured extraction of tables, financials, and text from PDFs and PowerPoint files, feeding outputs into LLM workflows',
    ],
    tags: ['Python', 'LangChain', 'LangGraph', 'Azure AI', 'NLP', 'ML'],
  },
  {
    type: 'media',
    title: 'Director and Producer',
    company: 'UCR Media and Cultural Studies Department',
    location: 'Riverside, California',
    period: 'Mar 2024 — Jun 2024',
    description: [
      'Directed and produced 14 professional-grade faculty interview videos for the department, interviewing professors and showcasing facilities to strengthen outreach, engagement, and marketing for prospective and current students',
    ],
    tags: ['Film Direction', 'Video Production', 'Adobe Premiere', 'Storytelling'],
  },
  {
    type: 'media',
    title: 'Associate Producer',
    company: 'Documentary Film: Ghosts of Adelanto',
    location: 'Washington, D.C.',
    period: 'Sep 2023 — Dec 2023',
    description: [
      'Organized and moderated a lobbying event that included a movie screening with 50+ University of California students, fostering dialogue and advocacy with Congressman Mark Takano',
      'Designed graphics for marketing, captioned the movie, managed finances, and conducted due diligence',
    ],
    tags: ['Documentary', 'Policy Advocacy', 'Event Organizing', 'Congressional Lobbying'],
  },
  {
    type: 'leadership',
    title: 'Co-President & Head of Technology and Marketing',
    company: 'BRASA UC Berkeley',
    location: 'Berkeley, California',
    period: 'Aug 2024 — Present',
    description: [
      'Lead strategy and operations for a 20-member Brazilian student organization, driving community growth and campus presence',
      'Oversaw marketing, technology, and digital infrastructure, including launching and maintaining the club website and managing all event promotion channels',
      'Planned and executed large-scale events with 100+ attendees, increasing visibility, engagement, and participation with the Brazilian community across campus',
    ],
    tags: ['Leadership', 'React', 'Marketing', 'Web Development'],
  },
]

function TimelineEntry({ experience, index }) {
  const hasMounted = useHasMounted()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const isMedia = experience.type === 'media'
  const Icon = experience.type === 'work' ? Briefcase : experience.type === 'media' ? Film : Users
  const accent = isMedia ? 'amber-400' : 'teal'

  return (
    <motion.div
      ref={ref}
      initial={hasMounted ? { opacity: 0, x: -30 } : false}
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
  const hasMounted = useHasMounted()

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={hasMounted ? { opacity: 0, x: -30 } : false}
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
