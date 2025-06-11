"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Heart } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ]

  const resources = [
    { label: "Blog", href: "/blog" },
    { label: "Research Papers", href: "/research" },
    { label: "Open Source", href: "/opensource" },
    { label: "Speaking", href: "/speaking" },
  ]

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/naveenda",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/naveenda/",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:naveen@example.com",
      label: "Email",
    },
  ]

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Naveen DA
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Machine Learning Engineer passionate about building intelligent systems 
              that make a real-world impact. Transforming data into insights, one algorithm at a time.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-background rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-purple-600 hover:border-purple-600 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-purple-600 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.label}>
                  <a
                    href={resource.href}
                    className="text-muted-foreground hover:text-purple-600 transition-colors text-sm"
                  >
                    {resource.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-foreground">Get in Touch</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>San Francisco, CA</p>
              <p>
                <a
                  href="mailto:naveen@example.com"
                  className="hover:text-purple-600 transition-colors"
                >
                  naveen@example.com
                </a>
              </p>
              <p>Available for consulting and collaboration</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>© {currentYear} Naveen DA. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>and lots of coffee.</span>
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <a href="/privacy" className="hover:text-purple-600 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-purple-600 transition-colors">
              Terms of Service
            </a>
            <a href="/sitemap" className="hover:text-purple-600 transition-colors">
              Sitemap
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer 