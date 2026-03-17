const projects = [
  {
    title: "Kalshi Trading Bot",
    year: "2025",
    description:
      "Algorithmic trading system for prediction markets; 52.8% win rate, 2.36\u00d7 profit factor, 28,903 backtested trades.",
    tags: "Python, asyncio, Backtesting, Statistics, Time Series",
  },
  {
    title: "BRASA Berkeley Website",
    year: "2025",
    description:
      "Student org website for the Brazilian Student Association, Next.js 14.",
    tags: "React, Next.js, JavaScript",
    link: { label: "Live", href: "https://brasa.studentorg.berkeley.edu/" },
  },
  {
    title: "GeographyGo.fun",
    year: "2024",
    description:
      "Interactive geography game suite with 5 modes \u2014 React + D3 + Three.js + Supabase.",
    tags: "React, TypeScript, D3-geo, Three.js, Supabase",
    link: { label: "Live", href: "https://geographygo.fun" },
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
    <section id="projects" className="mt-16">
      <p className="text-xs uppercase tracking-widest text-[#999] mb-6">
        Current Projects
      </p>

      <div className="divide-y divide-[#e5e7eb]">
        {projects.slice(0, 3).map((project) => (
          <ProjectRow key={project.title} project={project} />
        ))}
      </div>

      <a
        href="https://github.com/LuizFelipeBarbosa"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 text-sm text-[#444] hover:underline"
      >
        View More &rarr;
      </a>
    </section>
  )
}
