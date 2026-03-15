'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useHasMounted } from '../lib/useHasMounted'
import {
  ExternalLink,
  Github,
  TrendingUp,
  BarChart3,
  Target,
  Film,
  Clapperboard,
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
    title: "Adorno's Culture Industry in the Algorithmic Age",
    subtitle: 'NLP Research · Media Studies 112',
    description:
      'Designed and executed an NLP comment-classification pipeline on 84,000+ YouTube comments across the 15 most-streamed songs of 2025, going significantly beyond course requirements for a Media Studies class with no technical prerequisites. Applied transformer-based text classification to operationalize Adorno\'s critique categories (Standardization, Pseudo-Individualization, Commodification) as quantitative labels with confidence scoring. Demonstrated empirical support for regressive listening theory using large-scale social data.',
    metrics: [
      { icon: BarChart3, label: 'Comments Analyzed', value: '84,000+' },
      { icon: Target, label: 'Songs', value: '15' },
    ],
    tags: ['Python', 'NLP', 'Transformers', 'Text Classification', 'Adorno', 'Media Theory'],
    links: {},
    classification: 'DISPATCH',
  },
  {
    featured: true,
    title: 'Longshot Bias in Prediction Markets',
    subtitle: 'Kalshi Political Markets Research',
    description:
      'Research notebook analyzing the longshot bias and calibration of 18,000 Kalshi political speech mention contracts. Constructed VWAP price traces, fee-adjusted return models, and maker/taker pricing analysis. Reviewed related academic literature and tested for exploitable edges in mispriced long-shot contracts.',
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
    featured: true,
    title: 'Ghosts of Adelanto',
    subtitle: 'Documentary · Associate Producer',
    category: 'media',
    description:
      'Associate producer on documentary investigating immigration detention in Adelanto, CA. Organized a Congressional lobbying event in Washington, D.C. with 50+ UC students and Congressman Mark Takano, connecting documentary storytelling with direct policy advocacy.',
    metrics: [],
    tags: ['Documentary', 'Policy', 'Advocacy', 'Congressional Lobbying', 'Event Organizing'],
    links: {},
    classification: 'DISPATCH',
  },
  {
    featured: false,
    title: 'Faculty Interview Series',
    subtitle: 'UCR Media Department · Director',
    category: 'media',
    description:
      'Directed and produced 14 professional faculty interview videos for the UC Riverside Media and Cultural Studies Department. Managed full production pipeline from pre-production through post.',
    metrics: [],
    tags: ['Film', 'Production', 'Direction', 'Adobe Premiere'],
    links: {},
    classification: 'UNCLASSIFIED',
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
    title: 'GeographyGo.fun',
    subtitle: 'Geography Game Suite · 5 Game Modes',
    description:
      'Collection of interactive geography games — Flagle (identify countries from flags), Worldle (country silhouettes), Travle (shortest path between nations), World Quiz, and Continent Quizzes. Built with React 19 + TypeScript, D3-geo for map projections, Three.js for 3D renders, Framer Motion animations, and Supabase for score persistence.',
    metrics: [],
    tags: ['React', 'TypeScript', 'D3-geo', 'Three.js', 'Supabase', 'Framer Motion', 'Tailwind'],
    links: { github: 'https://github.com/LuizFelipeBarbosa/countries-world-game', live: 'https://geographygo.fun' },
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
  const hasMounted = useHasMounted()
  const isMedia = project.category === 'media'

  return (
    <motion.div
      ref={ref}
      initial={hasMounted ? { opacity: 0, y: 30 } : false}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`glass-card relative overflow-hidden group transition-all duration-300 ${isMedia ? 'hover:border-amber-400/30' : 'hover:border-teal/30'
        } ${featured ? 'p-8' : 'p-6'}`}
    >
      {/* Classification stamp */}
      <div
        className={`classified-stamp ${project.classification === 'TOP SECRET'
            ? 'text-red-500/30'
            : project.classification === 'SECRET'
              ? 'text-gold/30'
              : project.classification === 'DISPATCH'
                ? 'text-amber-400/30'
                : 'text-gray-500/20'
          }`}
      >
        {project.classification}
      </div>

      {/* Media badge */}
      {isMedia && (
        <div className="flex items-center gap-1.5 mb-3">
          <Clapperboard size={14} className="text-amber-400" />
          <span className="font-mono text-[10px] text-amber-400/80 uppercase tracking-wider">
            Media &amp; Policy
          </span>
        </div>
      )}

      <div className="mb-4">
        <div className={`font-mono text-xs uppercase tracking-wider mb-1 ${isMedia ? 'text-amber-400/60' : 'text-gold/60'}`}>
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
            className={`px-2 py-0.5 text-[10px] font-mono rounded ${isMedia
                ? 'text-amber-400/60 bg-amber-400/5 border border-amber-400/10'
                : 'text-teal/60 bg-teal/5 border border-teal/10'
              }`}
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
        <div className={`absolute inset-0 bg-gradient-to-br ${isMedia ? 'from-amber-400/5' : 'from-teal/5'} to-transparent`} />
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const hasMounted = useHasMounted()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={hasMounted ? { opacity: 0, x: -30 } : false}
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
