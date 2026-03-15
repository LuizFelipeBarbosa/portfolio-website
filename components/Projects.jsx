'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ExternalLink,
  Github,
  TrendingUp,
  BarChart3,
  Target,
} from 'lucide-react'

const projects = [
  {
    featured: true,
    title: 'Kalshi Prediction Market Trading Bot',
    subtitle: 'Algorithmic Trading System',
    description:
      'Built and backtested an algorithmic trading system for Kalshi political prediction markets. Developed signal generation models using statistical analysis of market microstructure and historical pricing patterns.',
    metrics: [
      { icon: Target, label: 'Win Rate', value: '52.8%' },
      { icon: TrendingUp, label: 'Profit Factor', value: '2.36x' },
      { icon: BarChart3, label: 'Backtested Trades', value: '28,903' },
    ],
    tags: [
      'Python',
      'asyncio',
      'Backtesting',
      'Statistics',
      'Time Series',
      'API Integration',
    ],
    links: { github: 'https://github.com/LuizFelipeBarbosa' },
    classification: 'TOP SECRET',
  },
  {
    featured: true,
    title: 'Longshot Bias Analysis',
    subtitle: 'Kalshi Political Markets Research',
    description:
      'Quantitative analysis of longshot bias in Kalshi political prediction markets. Implemented VWAP trace analysis and applied Snowberg & Wolfers framework to identify systematic pricing inefficiencies in low-probability political events.',
    metrics: [],
    tags: [
      'Python',
      'pandas',
      'statsmodels',
      'VWAP',
      'Behavioral Economics',
      'Research',
    ],
    links: { github: 'https://github.com/LuizFelipeBarbosa' },
    classification: 'SECRET',
  },
  {
    featured: false,
    title: 'AI Document Intelligence Pipeline',
    subtitle: 'Industry Ventures',
    description:
      'End-to-end document intelligence system using LangChain and Azure AI for automated extraction, classification, and semantic search across investment documents.',
    metrics: [],
    tags: ['LangChain', 'LangGraph', 'Azure AI', 'OCR', 'Vector DB'],
    links: {},
    classification: 'CONFIDENTIAL',
  },
  {
    featured: false,
    title: 'Geography Game',
    subtitle: 'Interactive Web Application',
    description:
      'Interactive geography quiz game inspired by SPORCLE with a zoomable world map, country identification challenges, and score tracking.',
    metrics: [],
    tags: ['React', 'JavaScript', 'UI/UX', 'SVG Maps'],
    links: { live: 'https://geographyfun.netlify.app' },
    classification: 'UNCLASSIFIED',
  },
  {
    featured: false,
    title: 'BRASA UC Berkeley Website',
    subtitle: 'Student Organization Platform',
    description:
      'Responsive website for the Brazilian Student Association at UC Berkeley, featuring event management, member resources, and organizational information.',
    metrics: [],
    tags: ['React', 'JavaScript', 'Responsive Design'],
    links: { live: 'https://brasa.studentorg.berkeley.edu/' },
    classification: 'UNCLASSIFIED',
  },
]

function ProjectCard({ project, index, featured = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`glass-card relative overflow-hidden group hover:border-teal/30 transition-all duration-300 ${
        featured ? 'p-8' : 'p-6'
      }`}
    >
      {/* Classification stamp */}
      <div
        className={`classified-stamp ${
          project.classification === 'TOP SECRET'
            ? 'text-red-500/30'
            : project.classification === 'SECRET'
              ? 'text-gold/30'
              : 'text-gray-500/20'
        }`}
      >
        {project.classification}
      </div>

      <div className="mb-4">
        <div className="font-mono text-xs text-gold/60 uppercase tracking-wider mb-1">
          {project.subtitle}
        </div>
        <h3
          className={`font-heading font-bold text-white ${featured ? 'text-xl' : 'text-lg'}`}
        >
          {project.title}
        </h3>
      </div>

      <p
        className={`text-gray-400 mb-4 ${featured ? 'text-sm' : 'text-xs'} leading-relaxed`}
      >
        {project.description}
      </p>

      {project.metrics.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-midnight/50 rounded border border-teal/10">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <metric.icon size={16} className="text-teal mx-auto mb-1" />
              <div className="font-mono text-lg font-bold text-teal">
                {metric.value}
              </div>
              <div className="font-mono text-[10px] text-gray-500 uppercase">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-[10px] font-mono text-teal/60 bg-teal/5 border border-teal/10 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3 pt-2 border-t border-midnight-300/50">
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-teal transition-colors"
          >
            <Github size={14} /> Source
          </a>
        )}
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-teal transition-colors"
          >
            <ExternalLink size={14} /> Live
          </a>
        )}
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent" />
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-teal/60 tracking-[0.2em] uppercase mb-2">
            Section 03
          </div>
          <h2 className="section-heading">
            <span className="text-white">PROJECT</span>{' '}
            <span className="text-teal">DOSSIERS</span>
          </h2>
        </motion.div>

        {/* Featured */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {projects
            .filter((p) => p.featured)
            .map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
                featured
              />
            ))}
        </div>

        {/* Others */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects
            .filter((p) => !p.featured)
            .map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i + 2}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
