export const metadata = {
  title: 'Projects | Luiz Felipe Barbosa',
  description: 'A collection of my projects in quantitative analysis, data science, and web development.',
}

import Navbar from '@/components/Navbar'
import { ProjectRow } from '@/components/Projects'
import { projects } from '@/data/projects'
import Link from 'next/link'

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-[800px] mx-auto px-4 md:px-0 pt-16 pb-16">
        <div className="mb-8">
          <Link href="/#projects" className="text-sm text-[#888] hover:text-[#111] transition-colors mb-4 inline-block">&larr; Back to Home</Link>
          <h1 className="text-4xl font-bold tracking-tight text-[#111] mb-2">Projects</h1>
          <p className="text-lg text-[#444]">A collection of things I've built or worked on recently.</p>
        </div>
        <div className="divide-y divide-[#e5e7eb]">
          {projects.map((project) => (
            <ProjectRow key={project.title} project={project} />
          ))}
        </div>
      </main>
    </>
  )
}
