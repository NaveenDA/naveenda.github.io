"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation";

const Projects = () => {
  const router = useRouter();
  const projects = [
    {
      category: "AI GAME DEMO",
      title: "Flappy Bird AI",
      description: "Watch an AI learn to master Flappy Bird in real time. Click below to run the demo and see intelligence evolve!",
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
      }
    },
    {
      category: "EVOLUTIONARY AI",
      title: "Smart Rocket",
      description: "See how evolutionary algorithms guide rockets to their target. Click below to launch the simulation!",
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
        label: "Try Smart Rocket",
        onClick: () => router.push("/games/smart-rocket")
      }
    },
    {
      category: "CLASSIC GAME AI",
      title: "Donkey Kong AI",
      description: "Watch an AI agent tackle the classic Donkey Kong challenge. Click below to see the AI in action as it navigates barrels and platforms!",
      mockupContent: (
        <div className="bg-gradient-to-br from-orange-200 via-pink-200 to-yellow-100 h-[200px] flex items-center justify-center">
          <div className="w-24 h-24 bg-orange-400 rounded-lg flex items-center justify-center shadow-lg border-4 border-pink-300">
            <span className="text-4xl">🦍</span>
          </div>
        </div>
      ),
      button: {
        label: "Run Donkey Kong AI",
        onClick: () => router.push("/games/donkey-kong-ai")
      }
    }
  ]

  return (
    <section className="min-h-screen bg-stone-100 px-8 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-8xl font-bold text-teal-800 mb-6">
            Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience AI in action—click below to run the projects live and see intelligence at play!
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 min-h-[420px] flex flex-col">
                {/* Mockup area - takes up most of the card */}
                <div className="flex-1">
                  {project.mockupContent}
                </div>
                {/* Content at bottom */}
                <div className="p-6 flex flex-col justify-center items-start gap-2">
                  <div className="text-xs font-semibold text-gray-500 tracking-wider uppercase">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {project.title}
                  </h3>
                  <p className="text-base text-gray-700 mb-2">
                    {project.description}
                  </p>
                  <button
                    onClick={project.button.onClick}
                    className="mt-2 px-5 py-2 bg-teal-700 text-white rounded-full font-semibold shadow hover:bg-teal-800 transition-colors"
                  >
                    {project.button.label}
                  </button>
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