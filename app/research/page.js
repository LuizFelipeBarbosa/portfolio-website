export const metadata = {
  title: 'Research & Writing | Luiz Felipe Barbosa',
  description: 'Articles, papers, and essays.',
}

import Navbar from '@/components/Navbar'
import { articles, formatDate } from '@/data/articles'
import Link from 'next/link'

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
        <div className="divide-y divide-[#e5e7eb]">
          {articles.map((article) => {
            const inner = (
              <>
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <h3 className="font-semibold text-[#111]">{article.title}</h3>
                  <span className="text-sm text-[#999] shrink-0">
                    {formatDate(article.date)}
                  </span>
                </div>
                <p className="text-sm text-[#444]">{article.summary}</p>
              </>
            )

            if (article.slug) {
              return (
                <Link
                  key={article.title}
                  href={`/articles/${article.slug}`}
                  className="block py-4 group hover:bg-[#f3f3f3] -mx-3 px-3 rounded transition-colors"
                >
                  {inner}
                </Link>
              )
            }

            return (
              <div key={article.title} className="py-4">
                {inner}
              </div>
            )
          })}
        </div>
      </main>
    </>
  )
}
