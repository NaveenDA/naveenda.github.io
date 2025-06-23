import type { Metadata } from 'next';
import Hero from "@/components/hero"
import OpenSourceContributions from "@/components/open-source"
import Blogs from "@/components/blogs"
import Footer from "@/components/footer"
import Projects from "@/components/projects"

export const metadata: Metadata = {
  title: 'NaveenDA',
  description: 'Welcome to my portfolio. I am a Machine Learning Engineer with significant open source contributions, including Next.js 12.2, phpLiteAdmin, and Parsel. I specialize in web development and building scalable applications.',
  openGraph: {
    title: 'Naveen DA - Machine Learning Engineer',
    description: 'Welcome to my portfolio. I am a Machine Learning Engineer with significant open source contributions, including Next.js 12.2, phpLiteAdmin, and Parsel. I specialize in web development and building scalable applications.',
    url: 'https://naveenda.live',
    images: [
      {
        url: 'https://naveenda.live/og-image.jpg',
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
      <OpenSourceContributions />
      <Blogs />
      <Footer />
    </main>
  );
}
