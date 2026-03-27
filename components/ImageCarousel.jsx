"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"

export default function ImageCarousel({ images = [] }) {
  const slides = useMemo(() => images.filter(Boolean), [images])
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)

  const total = slides.length
  const active = slides[index]

  const goTo = useCallback(
    (nextIndex) => {
      if (!total) return
      const wrapped = (nextIndex + total) % total
      setIndex(wrapped)
    },
    [total]
  )

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index])
  const goNext = useCallback(() => goTo(index + 1), [goTo, index])
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === "Escape") close()
      if (event.key === "ArrowLeft") goPrev()
      if (event.key === "ArrowRight") goNext()
    }

    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [open, close, goPrev, goNext])

  if (!active) return null

  return (
    <>
      <figure className="my-6">
        <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between border-b border-[#f0f0f0] px-4 py-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#888]">
                Image carousel
              </p>
              {active.label && (
                <p className="mt-1 text-sm text-[#333]">{active.label}</p>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-[#888]">
              <span>
                {index + 1} / {total}
              </span>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#e5e7eb] text-[#666] transition-colors hover:border-[#d1d5db] hover:text-[#111]"
                aria-label="Expand image"
              >
                <Expand size={14} />
              </button>
            </div>
          </div>

          <div className="relative bg-[#fcfcfc] px-3 py-3 md:px-4 md:py-4">
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-5 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#555] shadow-sm backdrop-blur transition-colors hover:text-[#111]"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-5 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#555] shadow-sm backdrop-blur transition-colors hover:text-[#111]"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            <img
              src={active.src}
              alt={active.alt || active.caption || ""}
              className="w-full rounded-lg cursor-zoom-in"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>

        {active.caption && (
          <figcaption className="mt-2 text-xs italic text-[#888]">
            {active.caption}
          </figcaption>
        )}

        {total > 1 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {slides.map((slide, slideIndex) => {
              const isActive = slideIndex === index
              return (
                <button
                  key={`${slide.label || slide.caption || slide.src}-${slideIndex}`}
                  type="button"
                  onClick={() => goTo(slideIndex)}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    isActive
                      ? "border-[#111] bg-[#111] text-white"
                      : "border-[#e5e7eb] bg-white text-[#666] hover:border-[#d1d5db] hover:text-[#111]"
                  }`}
                >
                  {slide.label || `Figure ${slideIndex + 1}`}
                </button>
              )
            })}
          </div>
        )}
      </figure>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-[92vw] flex-col items-center px-4"
            onClick={(event) => event.stopPropagation()}
          >
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            <img
              src={active.src}
              alt={active.alt || active.caption || ""}
              className="max-h-[78vh] max-w-full rounded-xl object-contain shadow-2xl"
            />

            <div className="mt-4 max-w-[760px] text-center text-white/75">
              {active.label && (
                <p className="mb-1 text-sm font-medium text-white/90">{active.label}</p>
              )}
              {active.caption && (
                <p className="text-sm leading-relaxed">{active.caption}</p>
              )}
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/50">
                {index + 1} / {total}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
