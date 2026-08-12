"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    category: "NEAT · Evolutionary Algorithm",
    title: "Flappy Bird AI",
    description: "A population of neural networks evolves, generation by generation, until one learns to thread the pipes on its own.",
    image: "/flappy-bird.png",
    imageAlt: "Flappy Bird AI gameplay",
    href: "/games/flappy-bird-ai",
    tags: ["NEAT", "Neuroevolution", "Canvas"],
  },
  {
    category: "Q-Learning · Reinforcement Learning",
    title: "Snake AI",
    description: "A snake explores, fails, and remembers. Random moves give way to learned strategy as its exploration rate decays.",
    image: "/snake-ai.png",
    imageAlt: "Snake AI gameplay",
    href: "/games/snake-ai",
    tags: ["Q-Learning", "Reinforcement Learning"],
  },
  {
    category: "Generative Audio",
    title: "Longplayer",
    description: "Six loops of Tibetan singing bowls, layered and time-shifted so the piece won't repeat itself for a thousand years.",
    image: "/longplayer-demo.png",
    imageAlt: "Longplayer visualizer",
    href: "/tools/longplayer",
    tags: ["Tone.js", "Generative"],
  },
]

const Projects = () => {
  const router = useRouter();

  return (
    <section className="bg-ink text-paper px-6 md:px-10 py-24 md:py-32" id="work">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-8 mb-16 flex-wrap">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
              Selected Work
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
              Watch the machines think.
            </h2>
          </div>
          <p className="text-paper/60 max-w-sm text-sm leading-relaxed">
            Three browser-based experiments in how machines learn. Click
            through to run each one live, right where it&rsquo;s hosted.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-paper/15">
          {projects.map((project, i) => (
            <motion.button
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => router.push(project.href)}
              className="group text-left bg-ink p-6 md:p-8 flex flex-col"
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">
                  {project.category}
                </span>
                <ArrowUpRight className="w-5 h-5 text-paper/40 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <div className="relative aspect-[4/3] mb-6 overflow-hidden border border-paper/15">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className="object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <h3 className="font-display text-2xl mb-3">{project.title}</h3>
              <p className="text-sm text-paper/65 leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-paper/45 uppercase tracking-wide">
                {project.tags.map((tag, idx) => (
                  <span key={tag}>
                    {tag}
                    {idx < project.tags.length - 1 && <span className="mx-1.5 text-paper/25">&middot;</span>}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
