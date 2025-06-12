import Hero from "@/components/hero"
import Projects from "@/components/projects"
import Blogs from "@/components/blogs"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Projects />
      <Blogs />
      <Footer />
    </main>
  )
}
