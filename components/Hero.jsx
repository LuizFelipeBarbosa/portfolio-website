export default function Hero() {
  return (
    <section id="hero" className="min-h-[60vh] flex items-center">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <p className="text-sm text-[#888] mb-4">
          UC Berkeley &middot; Mathematics &amp; Statistics + Media Studies
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#111] mb-4">
          Luiz Felipe Barbosa
        </h1>
        <p className="text-lg text-[#444] mb-8 max-w-xl">
          I build things at the intersection of mathematics, data, and storytelling.
        </p>
        <div className="flex gap-6">
          <a
            href="#projects"
            className="text-accent hover:underline transition-opacity"
          >
            View Projects &rarr;
          </a>
          <a
            href="#contact"
            className="text-accent hover:underline transition-opacity"
          >
            Get in Touch &rarr;
          </a>
        </div>
      </div>
    </section>
  )
}
