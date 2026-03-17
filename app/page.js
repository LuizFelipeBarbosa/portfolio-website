import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Research from '@/components/Research'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-[800px] mx-auto">
        <Hero />
        <Projects />
        <Research />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
