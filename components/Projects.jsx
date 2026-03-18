import Link from "next/link"
import { projects } from "@/data/projects"

export function ProjectRow({ project }) {
  return (
    <div className="group py-4">
      <div className="flex items-baseline justify-between gap-4 mb-1">
        <h3 className="font-semibold text-[#111] group-hover:text-accent transition-colors">
          {project.title}
          {(project.links || (project.link ? [project.link] : [])).map((l, i) => (
            <a
              key={i}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-sm font-normal text-accent hover:underline"
            >
              [{l.label} ↗]
            </a>
          ))}
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

      <Link
        href="/projects"
        className="inline-block mt-4 text-sm text-[#444] hover:underline"
      >
        View More &rarr;
      </Link>
    </section>
  )
}
