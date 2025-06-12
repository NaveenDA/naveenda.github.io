import type { Metadata } from 'next';
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import Blogs from "@/components/blogs"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: 'NaveenDA',
  description: 'Welcome to my portfolio website. I am a Machine Learning Engineer with 8+ years of experience building scalable AI systems.',
  openGraph: {
    title: 'Naveen DA - Machine Learning Engineer',
    description: 'Welcome to my portfolio website. I am a Machine Learning Engineer with 8+ years of experience building scalable AI systems.',
    url: 'https://naveenda.github.io',
    images: [
      {
        url: 'https://naveenda.github.io/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Naveen DA Portfolio',
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Projects />
      <Blogs />
      <Footer />
    </main>
  );
}
