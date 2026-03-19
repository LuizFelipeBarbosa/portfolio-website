export const metadata = {
  title: 'Research & Writing | Luiz Felipe Barbosa',
  description: 'Articles, papers, and essays.',
}

import Navbar from '@/components/Navbar'
import { articles } from '@/data/articles'
import Link from 'next/link'
import ArticleList from '@/components/ArticleList'

export default function ResearchPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-[800px] mx-auto px-4 md:px-0 pt-16 pb-16">
        <div className="mb-8">
          <Link href="/#research" className="text-sm text-[#888] hover:text-[#111] transition-colors mb-4 inline-block">&larr; Back to Home</Link>
          <h1 className="text-4xl font-bold tracking-tight text-[#111] mb-2">Research & Writing</h1>
          <p className="text-lg text-[#444]">My research, essays, and various technical write-ups.</p>
        </div>
        <ArticleList articles={articles} />
      </main>
    </>
  )
}
