"use client"

import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Twitter, Mail, Dribbble, Instagram } from "lucide-react"

const Hero = () => {
  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/naveenda", label: "Twitter" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/naveenda/", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/naveenda", label: "GitHub" },
    { icon: Mail, href: "mailto:naveen@example.com", label: "Email" },
    { icon: Dribbble, href: "https://dribbble.com/naveenda", label: "Dribbble" },
    { icon: Instagram, href: "https://instagram.com/naveenda", label: "Instagram" },
  ]

  return (
    <section 
      className="min-h-screen flex items-center justify-center px-4 bg-white"
      style={{
        backgroundImage: 'radial-gradient(circle, #e6e6e6 1px, transparent 1px)',
        backgroundSize: '10px 10px'
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight tracking-tight">
            <div className="mb-4">
              Hello
              <span className="inline-block w-3 h-3 md:w-4 md:h-4 bg-teal-500 rounded-full ml-2"></span>
            </div>
            <div className="mb-4">I am</div>
            <div>NaveenDA</div>
          </h1>
          
          <div className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed mt-8">
            <p>
              Machine Learning Engineer crafting impactful AI solutions with deep learning and data-driven innovation.
            </p>
          </div>
        </motion.div>

        {/* See More About Me link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <a
            href="#work"
            className="inline-flex items-center text-gray-900 hover:text-gray-600 transition-colors group"
          >
            <span className="text-lg font-medium">See My Work</span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center space-x-6"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <social.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero 