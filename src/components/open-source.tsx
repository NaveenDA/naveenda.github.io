"use client"

import type { SVGProps } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Github } from "@/components/icons/brand-icons"

const NextjsMark = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z"
      fill="currentColor"
    />
  </svg>
);

const contributions = [
  {
    project: "Next.js 12.2",
    mark: NextjsMark,
    description: "Contributed to one of the most widely used React frameworks, helping improve its functionality and developer experience.",
    link: "https://nextjs.org/blog/next-12-2#:~:text=Chastrlove%2C%20%40goncharov%2Dvlad%2C%20%40-,NaveenDA,-%2C%20%40Firfi%2C%20%40idkwhojamesis%2C%20%40FLCN",
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    project: "phpLiteAdmin",
    mark: Github,
    description: "A web-based SQLite database admin tool written in PHP. Improved database management features and usability.",
    link: "https://github.com/phpLiteAdmin/pla",
    tags: ["PHP", "SQLite", "Database"],
  },
  {
    project: "Parsel",
    mark: Github,
    description: "A CSS selector parser, stringifier, and specificity calculator. Improved its CSS parsing capabilities.",
    link: "https://github.com/LeaVerou/parsel",
    tags: ["CSS", "JavaScript", "Parser"],
  },
];

const OpenSource = () => {
  return (
    <section className="px-6 md:px-10 py-24 md:py-32" id="open-source">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-ink mb-4">
            Open Source
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight max-w-xl">
            Contributions to the tools I use every day.
          </h2>
        </div>

        <div className="border-t border-border">
          {contributions.map((item, index) => (
            <motion.a
              key={item.project}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-8 border-b border-border hover:bg-secondary/40 transition-colors -mx-4 px-4"
            >
              <item.mark className="w-7 h-7 shrink-0 text-foreground" />
              <div className="flex-1">
                <h3 className="font-display text-xl mb-1">{item.project}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                  {item.description}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-wrap gap-x-2 text-[11px] text-muted-foreground uppercase tracking-wide">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-gold-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OpenSource
