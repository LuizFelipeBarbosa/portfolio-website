export default function Contact() {
  return (
    <section id="contact" className="mt-16 pb-16">
      <p className="text-xs uppercase tracking-widest text-[#999] mb-3">
        Contact
      </p>

      <h2 className="text-2xl font-bold text-[#111] mb-4">Get in touch</h2>

      <p className="text-[#444] mb-3">
        I am open for research internships and other roles for Summer 2026.
      </p>

      <div className="flex gap-6 text-sm mb-16">
        <a
          href="mailto:lfpmb1@icloud.com"
          className="text-accent hover:underline transition-opacity"
        >
          Email
        </a>
        <a
          href="https://github.com/LuizFelipeBarbosa"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline transition-opacity"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/luizfelipebarbosa/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline transition-opacity"
        >
          LinkedIn
        </a>
      </div>

      <div className="border-t border-[#e5e7eb] pt-6 text-xs text-[#999]">
        &copy; {new Date().getFullYear()} Luiz Felipe Barbosa
      </div>
    </section>
  )
}
