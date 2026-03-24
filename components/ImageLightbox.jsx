"use client"

import { useState, useEffect, useCallback } from "react"

export function ClickableImage({ src, alt, caption }) {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === "Escape" && close()
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, close])

  return (
    <>
      <figure className="my-6 group">
        <img
          src={src}
          alt={alt || ""}
          className="w-full rounded cursor-zoom-in transition-opacity duration-150 group-hover:opacity-90"
          onClick={() => setOpen(true)}
        />
        {caption && (
          <figcaption className="mt-2 text-xs text-[#888] italic">
            {caption}
          </figcaption>
        )}
      </figure>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in cursor-zoom-out"
          onClick={close}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt || ""}
              className="max-w-full max-h-[82vh] rounded-lg shadow-2xl object-contain cursor-zoom-out"
              onClick={close}
            />
            {caption && (
              <p className="mt-4 text-sm text-white/70 text-center max-w-[600px] leading-relaxed px-4">
                {caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
