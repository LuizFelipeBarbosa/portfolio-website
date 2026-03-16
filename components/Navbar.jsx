'use client'

import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? 'shadow-sm' : ''
      } border-b border-[#e5e7eb]`}
    >
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="font-semibold text-[#111] tracking-tight">
          LFB
        </a>
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#444] hover:underline transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
