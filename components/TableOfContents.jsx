"use client"

import { useState, useEffect } from "react"

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    )

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean)

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [headings])

  if (!headings || headings.length < 2) return null

  return (
    <nav aria-label="Table of contents">
      <p className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-3">
        On this page
      </p>
      <ul className="space-y-1 border-l border-[#e5e7eb]">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" })
              }}
              className={`block pl-3 py-1 text-sm transition-colors ${
                activeId === h.id
                  ? "text-accent border-l-2 border-accent -ml-[1px] font-medium"
                  : "text-[#888] hover:text-[#333]"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
