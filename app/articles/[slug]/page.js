import Link from "next/link"
import { notFound } from "next/navigation"
import katex from "katex"
import { allArticles, articles, getArticleBySlug, formatDate, getReadTime } from "@/data/articles"
import { slugify } from "@/lib/slugify"
import TableOfContents from "@/components/TableOfContents"
import ArticleList from "@/components/ArticleList"
import { ClickableImage } from "@/components/ImageLightbox"
import ImageCarousel from "@/components/ImageCarousel"

const RICH_TEXT_TOKEN_REGEX = /(\{\{\d+\}\}|\$\$[\s\S]+?\$\$|\$(?:\\.|[^$\n])+\$)/g

export function generateStaticParams() {
  return allArticles
    .filter((a) => a.slug)
    .map((a) => ({ slug: a.slug }))
}

export function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  return {
    title: `${article.title} — Luiz Felipe Barbosa`,
    description: article.summary,
  }
}

function renderMath(expression, displayMode = false) {
  return katex.renderToString(expression.trim(), {
    displayMode,
    throwOnError: false,
    strict: "ignore",
  })
}

function RichText({ text, footnotes, className = "" }) {
  const parts = String(text).split(RICH_TEXT_TOKEN_REGEX).filter(Boolean)

  return parts.map((part, i) => {
    const footnoteMatch = part.match(/^\{\{(\d+)\}\}$/)
    if (footnoteMatch) {
      const num = Number.parseInt(footnoteMatch[1], 10)
      const note = footnotes?.[num - 1]
      return (
        <sup key={`${className}-footnote-${i}`} className="text-[10px] text-[#888] ml-[1px]" title={note}>
          {num}
        </sup>
      )
    }

    if (part.startsWith("$$") && part.endsWith("$$")) {
      return (
        <span
          key={`${className}-display-math-${i}`}
          className="article-math-display block my-6 overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: renderMath(part.slice(2, -2), true) }}
        />
      )
    }

    if (part.startsWith("$") && part.endsWith("$")) {
      return (
        <span
          key={`${className}-inline-math-${i}`}
          className="article-math-inline"
          dangerouslySetInnerHTML={{ __html: renderMath(part.slice(1, -1)) }}
        />
      )
    }

    return <span key={`${className}-text-${i}`}>{part}</span>
  })
}

function renderCitation(text) {
  const parts = text.split(/(https?:\/\/\S+|(?:[a-z]+\.)+[a-z]+\/\S+)/)
  return parts.map((part, i) => {
    const isUrl = /^https?:\/\//.test(part) || /^(?:[a-z]+\.)+[a-z]+\//.test(part)
    if (!isUrl) return part
    const clean = part.replace(/[.,;]+$/, "")
    const trailing = part.slice(clean.length)
    const href = clean.startsWith("http") ? clean : `http://${clean}`
    return (
      <span key={i}>
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
          {clean}
        </a>
        {trailing}
      </span>
    )
  })
}

function Paragraph({ text, footnotes }) {
  const trimmed = String(text).trim()
  const isDisplayOnly = trimmed.startsWith("$$") && trimmed.endsWith("$$")

  if (isDisplayOnly) {
    return (
      <div className="mb-4">
        <RichText text={trimmed} footnotes={footnotes} className="paragraph" />
      </div>
    )
  }

  return (
    <p className="mb-4">
      <RichText text={text} footnotes={footnotes} className="paragraph" />
    </p>
  )
}

function BulletList({ items = [], footnotes }) {
  if (!items.length) return null

  return (
    <ul className="mb-4 list-disc space-y-2 pl-6">
      {items.map((item, index) => (
        <li key={index}>
          <RichText text={item} footnotes={footnotes} className={`bullet-${index}`} />
        </li>
      ))}
    </ul>
  )
}

export default function ArticlePage({ params }) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const headings = article.sections
    .filter((s) => s.heading)
    .map((s) => ({ text: s.heading, id: slugify(s.heading) }))

  return (
    <div className="relative max-w-[660px] mx-auto px-4 md:px-0 py-16">
      <Link
        href="/#research"
        className="text-sm text-[#888] hover:underline"
      >
        &larr; Back
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111] mt-8 mb-4">
        {article.title}
      </h1>

      <p className="text-sm text-[#888] mb-12">
        {article.author} &middot; {formatDate(article.date)} &middot; {getReadTime(article)} min read
      </p>

      <div className="space-y-6 text-[#333] leading-relaxed text-[16px]">
        {article.sections.map((section, i) => (
          <div key={i}>
            {section.heading && (
              <h2
                id={slugify(section.heading)}
                className="text-xl font-semibold text-[#111] mt-10 mb-4 scroll-mt-24"
              >
                {section.heading}
              </h2>
            )}
            {section.paragraphs.map((p, j) => (
              <Paragraph key={j} text={p} footnotes={article.footnotes} />
            ))}
            <BulletList items={section.bullets} footnotes={article.footnotes} />
            {section.image && (
              <ClickableImage
                src={section.image}
                alt={section.imageCaption || ""}
                caption={section.imageCaption}
              />
            )}
            {section.carousel && section.carousel.length > 0 && (
              <ImageCarousel images={section.carousel} />
            )}
            {section.paragraphsAfterImage?.map((p, j) => (
              <Paragraph key={`after-${j}`} text={p} footnotes={article.footnotes} />
            ))}
            {section.table && (
              <figure className="my-6 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      {section.table.headers.map((h, j) => (
                        <th key={j} className="text-left py-2 px-3 border-b-2 border-[#ddd] text-[#111] font-semibold text-xs">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, j) => (
                      <tr key={j} className={j % 2 === 0 ? "bg-[#f5f5f5]" : ""}>
                        {row.map((cell, k) => (
                          <td key={k} className="py-2 px-3 border-b border-[#e5e7eb] text-xs text-[#444] align-top">
                            <RichText text={cell} footnotes={article.footnotes} className={`table-${j}-${k}`} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {section.table.caption && (
                  <figcaption className="mt-2 text-xs text-[#888] italic">
                    {section.table.caption}
                  </figcaption>
                )}
              </figure>
            )}
          </div>
        ))}
      </div>

      {article.citations && (
        <div className="mt-10 pt-8 border-t border-[#e5e7eb]">
          <h3 className="text-sm font-semibold text-[#111] mb-4">
            Works Cited
          </h3>
          <ol className="space-y-2 text-sm text-[#555] list-decimal list-inside">
            {article.citations.map((cite, i) => (
              <li key={i}>{renderCitation(cite)}</li>
            ))}
          </ol>
        </div>
      )}

      {(() => {
        const explicit = (article.furtherReadings || [])
          .map((slug) => getArticleBySlug(slug))
          .filter((item) => item && !item.archived)
        const others = articles.filter(
          (a) => a.slug && a.slug !== article.slug && !explicit.includes(a)
        )
        const more = [...explicit, ...others].slice(0, 3)
        if (!more.length) return null
        return (
          <div className="mt-8 pt-8 border-t border-[#e5e7eb]">
            <h3 className="text-sm font-semibold text-[#111] mb-4">
              More Articles
            </h3>
            <ArticleList articles={more} />
          </div>
        )
      })()}

      <aside className="hidden xl:block absolute left-full top-0 ml-8 h-full">
        <div className="sticky top-24 w-[200px]">
          <TableOfContents headings={headings} />
        </div>
      </aside>
    </div>
  )
}
