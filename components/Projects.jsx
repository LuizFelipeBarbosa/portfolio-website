const featured = [
  {
    title: "Adorno NLP Research",
    year: "2025",
    description:
      "NLP pipeline on 84k YouTube comments operationalizing Adorno critique categories with transformer-based classification.",
    tags: "Python, NLP, Transformers, Text Classification, Media Theory",
  },
  {
    title: "Longshot Bias in Prediction Markets",
    year: "2025",
    description:
      "Analysis of 18k Kalshi contracts testing for exploitable mispricing in long-shot political speech mention markets.",
    tags: "Python, pandas, statsmodels, VWAP, Behavioral Economics",
  },
  {
    title: "GeographyGo.fun",
    year: "2024",
    description:
      "Interactive geography game suite with 5 modes — React + D3 + Three.js + Supabase.",
    tags: "React, TypeScript, D3-geo, Three.js, Supabase",
    link: { label: "Live", href: "https://geographygo.fun" },
  },
  {
    title: "Kalshi Trading Bot",
    year: "2025",
    description:
      "Algorithmic trading system for prediction markets; 52.8% win rate, 2.36× profit factor, 28,903 backtested trades.",
    tags: "Python, asyncio, Backtesting, Statistics, Time Series",
  },
  {
    title: "Ghosts of Adelanto",
    year: "2024",
    description:
      "Documentary; organized Congressional lobbying with 50+ students and Rep. Mark Takano.",
    tags: "Documentary, Policy, Advocacy, Congressional Lobbying",
  },
]

const other = [
  {
    title: "BRASA Berkeley Website",
    year: "2025",
    description:
      "Student org website for the Brazilian Student Association, Next.js 14.",
    tags: "React, Next.js, JavaScript",
    link: { label: "Live", href: "https://brasa.studentorg.berkeley.edu/" },
  },
]

function ProjectRow({ project }) {
  return (
    <div className="group py-4">
      <div className="flex items-baseline justify-between gap-4 mb-1">
        <h3 className="font-semibold text-[#111] group-hover:text-accent transition-colors">
          {project.title}
          {project.link && (
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-sm font-normal text-accent hover:underline"
            >
              [{project.link.label} &nearr;]
            </a>
          )}
        </h3>
        <span className="text-sm text-[#999] shrink-0">{project.year}</span>
      </div>
      <p className="text-sm text-[#444] mb-1">{project.description}</p>
      <p className="text-xs text-[#999]">{project.tags}</p>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs uppercase tracking-widest text-[#999] mb-6">
          Projects
        </p>

        <div className="divide-y divide-[#e5e7eb]">
          {featured.map((project) => (
            <ProjectRow key={project.title} project={project} />
          ))}
        </div>

        <hr className="my-8 border-[#e5e7eb]" />

        <div className="divide-y divide-[#e5e7eb]">
          {other.map((project) => (
            <ProjectRow key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
