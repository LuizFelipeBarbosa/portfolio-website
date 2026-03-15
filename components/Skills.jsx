'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skillCategories = [
  {
    name: 'Languages',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'JavaScript', level: 85 },
      { name: 'SQL', level: 75 },
      { name: 'R', level: 65 },
    ],
  },
  {
    name: 'Data Science',
    skills: [
      { name: 'pandas', level: 95 },
      { name: 'NumPy', level: 90 },
      { name: 'statsmodels', level: 85 },
      { name: 'scikit-learn', level: 80 },
    ],
  },
  {
    name: 'AI / ML',
    skills: [
      { name: 'LangChain', level: 85 },
      { name: 'LangGraph', level: 80 },
      { name: 'Azure AI', level: 75 },
      { name: 'NLP', level: 75 },
    ],
  },
  {
    name: 'Web & Tools',
    skills: [
      { name: 'React', level: 85 },
      { name: 'Next.js', level: 70 },
      { name: 'Tailwind CSS', level: 80 },
      { name: 'Git', level: 85 },
    ],
  },
  {
    name: 'Analysis',
    skills: [
      { name: 'Time Series', level: 85 },
      { name: 'Backtesting', level: 90 },
      { name: 'Statistical Modeling', level: 85 },
      { name: 'Financial Analysis', level: 80 },
    ],
  },
  {
    name: 'Media & Communication',
    accent: 'amber',
    skills: [
      { name: 'Film Production', level: 90 },
      { name: 'Video Direction', level: 85 },
      { name: 'Narrative Framing', level: 80 },
      { name: 'Policy Advocacy', level: 80 },
      { name: 'Event Organizing', level: 85 },
      { name: 'Adobe Suite', level: 75 },
      { name: 'Figma', level: 70 },
      { name: 'Graphic Design', level: 65 },
    ],
  },
  {
    name: 'Spoken Languages',
    skills: [
      { name: 'English', level: 100 },
      { name: 'Portuguese', level: 100 },
      { name: 'Spanish', level: 60 },
    ],
  },
]

function SkillCategory({ category, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const isAmber = category.accent === 'amber'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`glass-card p-6 ${isAmber ? 'border-amber-400/10' : ''}`}
    >
      <h3 className={`font-heading font-bold text-sm uppercase tracking-wider mb-5 ${isAmber ? 'text-amber-400' : 'text-gold'}`}>
        {category.name}
      </h3>
      <div className="space-y-4">
        {category.skills.map((skill, j) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-1.5">
              <span className="font-mono text-sm text-gray-300">
                {skill.name}
              </span>
              <span className={`font-mono text-xs ${isAmber ? 'text-amber-400/60' : 'text-teal/60'}`}>
                {skill.level}%
              </span>
            </div>
            <div className="h-1.5 bg-midnight-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${isAmber ? 'from-amber-500 to-amber-300' : 'from-teal to-teal-light'}`}
                initial={{ width: 0 }}
                animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{
                  duration: 1,
                  delay: index * 0.1 + j * 0.1,
                  ease: 'easeOut',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-teal/60 tracking-[0.2em] uppercase mb-2">
            Section 04
          </div>
          <h2 className="section-heading">
            <span className="text-white">CAPABILITY</span>{' '}
            <span className="text-teal">MATRIX</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, i) => (
            <SkillCategory key={category.name} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
