"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation";
// google fonts
import { Yesteryear  } from "next/font/google";
import { Github } from "lucide-react";
const yesteryear = Yesteryear({
  subsets: ["latin"],
  weight: ["400"],
});
const Projects = () => {
  const router = useRouter();
  const projects = [
    {
      category: "OPEN SOURCE",
      title: "Next.js 12.2 Contributor",
      description: "Made significant contributions to Next.js 12.2, one of the most popular React frameworks. My contributions helped improve the framework's functionality and developer experience.",
      mockupContent: (
        <div className="bg-gradient-to-br from-black via-gray-800 to-gray-700 h-[200px] flex items-center justify-center">
          <div className="w-24 h-24 flex items-center justify-center">
            <svg height="80" viewBox=".5 -.2 1023 1024.1" width="80" xmlns="http://www.w3.org/2000/svg"><path d="m478.5.6c-2.2.2-9.2.9-15.5 1.4-145.3 13.1-281.4 91.5-367.6 212-48 67-78.7 143-90.3 223.5-4.1 28.1-4.6 36.4-4.6 74.5s.5 46.4 4.6 74.5c27.8 192.1 164.5 353.5 349.9 413.3 33.2 10.7 68.2 18 108 22.4 15.5 1.7 82.5 1.7 98 0 68.7-7.6 126.9-24.6 184.3-53.9 8.8-4.5 10.5-5.7 9.3-6.7-.8-.6-38.3-50.9-83.3-111.7l-81.8-110.5-102.5-151.7c-56.4-83.4-102.8-151.6-103.2-151.6-.4-.1-.8 67.3-1 149.6-.3 144.1-.4 149.9-2.2 153.3-2.6 4.9-4.6 6.9-8.8 9.1-3.2 1.6-6 1.9-21.1 1.9h-17.3l-4.6-2.9c-3-1.9-5.2-4.4-6.7-7.3l-2.1-4.5.2-200.5.3-200.6 3.1-3.9c1.6-2.1 5-4.8 7.4-6.1 4.1-2 5.7-2.2 23-2.2 20.4 0 23.8.8 29.1 6.6 1.4 1.6 57.2 85.2 124.4 186.8 67.2 101.6 122.2 184.7 122.3 184.7.1-.1 35.1-52.7 77.7-117.1 42.6-64.4 98.1-148.2 123.3-186.2l45.8-69.3 4.7-2.8c3.3-2 6.4-2.8 11-2.9 37.8-.8 43.6 3.3 43.6 30.9 0 6.4-2.7 19.4-8.1 39.1-22.6 82.7-67.6 157.2-137.8 227.9-32.6 32.7-67.4 60.1-106.3 83.8-9.6 5.8-21.4 12.8-26.2 15.7-4.8 2.8-8.7 5.3-8.7 5.4 0 .2 2.8 2 6.3 4.1 80.3 47.7 162.4 134.7 206.4 218.3 13.8 26.2 25.4 53.7 35.2 83.2 3.4 10.2 6.6 18.8 7.1 19.1.4.3 3.1-2.3 6-5.8 36.4-44.2 74.7-81.8 118.6-116.6 90.7-71.9 198.8-115.5 315.2-126.9 13.2-1.3 61.4-1.3 74.5 0 20.4 2 35.7 4.5 57.1 9.6 65 15.6 128.3 44.4 182.2 83 3.8 2.7 7.2 4.9 7.5 4.9.3 0 3.5-4.3 7.1-9.6 35.7-52.6 63.1-110.1 79.7-167.7 7.4-25.6 13-57.4 15.6-87.8.8-9.6 1-53.2.4-62.4-9.2-141.8-87.1-269.8-207.7-341.3-32.3-19.2-71.3-35-105.9-43.1-24.6-5.7-51.1-9.2-76.3-9.9-21.9-.6-23.5-.8-15.4-1.8 57.2-7.3 140.4 7.3 195.5 34.3 4.1 2 7.1 2.9 7.9 2.4.6-.4 1.1-62 1.1-165.6v-165l-5.3-1.1c-3-.6-26.6-5.1-52.4-10-81.9-15.4-103.1-19.4-153-28.5-69.5-12.8-137.7-25.8-180.6-34.4-11.7-2.4-21.6-4.3-21.8-4.2-.3.1-.5 74.1-.5 164.5z" fill="#fff"/></svg>
          </div>
        </div>
      ),
      button: {
        label: "View Contribution",
        onClick: () => window.open("https://nextjs.org/blog/next-12-2#:~:text=Chastrlove%2C%20%40goncharov%2Dvlad%2C%20%40-,NaveenDA,-%2C%20%40Firfi%2C%20%40idkwhojamesis%2C%20%40FLCN")
      },
      tags: ["Next.js", "React", "Open Source", "JavaScript", "TypeScript"]
    },
    {
      category: "OPEN SOURCE",
      title: "phpLiteAdmin Contributor",
      description: "Contributed to phpLiteAdmin, a web-based SQLite database admin tool written in PHP. Helped improve database management features and user experience.",
      mockupContent: (
        <div className="bg-gradient-to-br from-purple-600 via-purple-400 to-purple-200 h-[200px] flex items-center justify-center">
          <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-4xl">🗃️</span>
          </div>
        </div>
      ),
      button: {
        label: "View Project",
        onClick: () => window.open("https://github.com/phpLiteAdmin/pla")
      },
      tags: ["PHP", "SQLite", "Database", "Open Source"]
    },
    {
      category: "OPEN SOURCE",
      title: "Parsel Contributor",
      description: "Contributed to Parsel, a CSS selector parser, stringifier, and specificity calculator. Helped improve CSS parsing capabilities.",
      mockupContent: (
        <div className="bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200 h-[200px] flex items-center justify-center">
          <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-4xl">🎨</span>
          </div>
        </div>
      ),
      button: {
        label: "View Project",
        onClick: () => window.open("https://github.com/LeaVerou/parsel")
      },
      tags: ["CSS", "JavaScript", "Parser", "Open Source"]
    },
    {
      category: "NEAT",
      title: "Flappy Bird AI",
      description: "Watch an AI learn to master Flappy Bird in real time.",
      // optional image,
      image: "/flappy-bird.png",
      imageAlt: "Flappy Bird AI",
      mockupContent: (
        <div className="bg-gradient-to-br from-yellow-200 via-yellow-300 to-orange-200 h-[200px] flex items-center justify-center">
          <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-4xl">🐦</span>
          </div>
        </div>
      ),
      button: {
        label: "Run Flappy Bird AI",
        onClick: () => router.push("/games/flappy-bird-ai")
      },
      tags: ["AI", "Game", "Flappy Bird","Evolutionary Algorithm","NEAT"]
    },
    {
      category: "Q LEARNING",
      title: "Snake AI",
      description: "See how Q learning can teach a snake to find food and avoid walls.",
      image: "/snake-ai.png",
      imageAlt: "Snake AI",
      mockupContent: (
        <div className="bg-gradient-to-br from-blue-200 via-blue-300 to-purple-200 h-[200px] flex items-center justify-center">
          <div className="w-20 h-32 bg-gray-800 rounded-lg flex flex-col items-center justify-end shadow-lg relative">
            <div className="w-8 h-8 bg-red-500 rounded-full absolute -top-4 left-1/2 -translate-x-1/2 flex items-center justify-center">
              <span className="text-white text-xl">🚀</span>
            </div>
            <div className="w-8 h-8 bg-green-400 rounded-full mb-2"></div>
          </div>
        </div>
      ),
      button: {
        label: "Try Snake AI",
        onClick: () => router.push("/games/snake-ai")
      },
      tags: ["AI", "Game", "Snake","Q Learning"]
    },
    // {
    //   category: "CLASSIC GAME AI",
    //   title: "Donkey Kong AI",
    //   description: "Watch an AI agent tackle the classic Donkey Kong challenge. Click below to see the AI in action as it navigates barrels and platforms!",
    //   mockupContent: (
    //     <div className="bg-gradient-to-br from-orange-200 via-pink-200 to-yellow-100 h-[200px] flex items-center justify-center">
    //       <div className="w-24 h-24 bg-orange-400 rounded-lg flex items-center justify-center shadow-lg border-4 border-pink-300">
    //         <span className="text-4xl">🦍</span>
    //       </div>
    //     </div>
    //   ),
    //   button: {
    //     label: "Run Donkey Kong AI",
    //     onClick: () => router.push("/games/donkey-kong-ai")
    //   },
    //   tags: ["AI", "Game", "Donkey Kong","Q Learning"]
    // },
  ]

  const openSourceContributions = [
    {
      project: "Next.js 12.2",
      description: "Made significant contributions to Next.js 12.2, one of the most popular React frameworks. My contributions helped improve the framework's functionality and developer experience.",
      link: "https://nextjs.org/blog/next-12-2#:~:text=Chastrlove%2C%20%40goncharov%2Dvlad%2C%20%40-,NaveenDA,-%2C%20%40Firfi%2C%20%40idkwhojamesis%2C%20%40FLCN",
      tags: ["Next.js", "React", "TypeScript"]
    },
    {
      project: "phpLiteAdmin",
      description: "Contributed to phpLiteAdmin, a web-based SQLite database admin tool written in PHP. Helped improve database management features and user experience.",
      link: "https://github.com/phpLiteAdmin/pla",
      tags: ["PHP", "SQLite", "Database"]
    },
    {
      project: "Parsel",
      description: "Contributed to Parsel, a CSS selector parser, stringifier, and specificity calculator. Helped improve CSS parsing capabilities.",
      link: "https://github.com/LeaVerou/parsel",
      tags: ["CSS", "JavaScript", "Parser"]
    }
  ];

  return (
    <section className="min-h-screen bg-[#ECEEFC] px-8 py-20" id="work">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-8xl font-bold mb-6">
            Open Source <span className="bg-teal-800 w-4 h-4 rounded-full inline-block" />
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            I actively contribute to open source projects, helping improve developer tools and frameworks used by thousands of developers worldwide.
          </p>
        </div>

        {/* Contributions List */}
        <div className="max-w-4xl mx-auto">
          {openSourceContributions.map((contribution, index) => (
            <motion.div
              key={contribution.project}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-12 last:mb-0"
            >
              <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {contribution.project}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {contribution.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {contribution.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={contribution.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects 