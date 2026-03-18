'use client'

import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 w-full z-50 bg-[#fafafa]/80 backdrop-blur-sm transition-shadow duration-200 ${scrolled ? 'shadow-sm' : ''
        } border-b border-[#e5e7eb]`}
    >
      <div className="relative z-50 max-w-[800px] mx-auto px-4 md:px-0 py-4 flex items-center justify-between">
        <a href="#hero" className="font-semibold text-[#111] tracking-tight">
          LFB
        </a>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
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

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 -mr-2 text-[#444] flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[2px] bg-current transform transition duration-300 ease-in-out ${mobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
          <span className={`block w-6 h-[2px] bg-current transition-opacity duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block w-6 h-[2px] bg-current transform transition duration-300 ease-in-out ${mobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu backdrop */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile menu sidebar */}
      <div 
        className={`md:hidden fixed top-0 right-0 h-screen w-64 bg-[#fafafa] shadow-2xl border-l border-[#e5e7eb] transform transition-transform duration-300 ease-in-out flex flex-col pt-24 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-6 space-y-6 flex flex-col">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-lg text-[#444] hover:text-[#111] font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
