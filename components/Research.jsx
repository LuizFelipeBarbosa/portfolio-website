import Link from "next/link"
import { articles, formatDate } from "@/data/articles"

export default function Research() {
  return (
    <section id="research" className="mt-16">
      <p className="text-xs uppercase tracking-widest text-[#999] mb-6">
        Research &amp; Writing
      </p>

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
    </section>
  )
}
