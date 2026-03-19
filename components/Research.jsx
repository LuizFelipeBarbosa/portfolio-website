import Link from "next/link"
import { articles } from "@/data/articles"
import ArticleList from "@/components/ArticleList"

export default function Research() {
  return (
    <section id="research" className="mt-16">
      <p className="text-xs uppercase tracking-widest text-[#999] mb-3">
        Research &amp; Writing
      </p>

      <ArticleList articles={articles.slice(0, 3)} />

      <Link
        href="/research"
        className="inline-block mt-4 text-sm text-[#444] hover:underline"
      >
        View More &rarr;
      </Link>
    </section>
  )
}
