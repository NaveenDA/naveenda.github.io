"use client"

import { motion } from "framer-motion"
import { Brain, Code, Cpu, Database, GitBranch, Server } from "lucide-react"

const About = () => {
  const technologies = [
    { name: "Python", level: 95, category: "Languages" },
    { name: "TensorFlow", level: 90, category: "ML Frameworks" },
    { name: "PyTorch", level: 88, category: "ML Frameworks" },
    { name: "Kubernetes", level: 85, category: "DevOps" },
    { name: "AWS", level: 90, category: "Cloud" },
    { name: "Docker", level: 88, category: "DevOps" },
    { name: "Apache Spark", level: 85, category: "Big Data" },
    { name: "MLflow", level: 82, category: "ML Ops" },
  ]

  const expertiseAreas = [
    {
      icon: Brain,
      title: "Deep Learning",
      description: "Neural networks, CNNs, RNNs, Transformers, and cutting-edge architectures for computer vision and NLP tasks.",
    },
    {
      icon: Database,
      title: "Big Data & Analytics",
      description: "Processing massive datasets with Spark, building data pipelines, and extracting actionable insights at scale.",
    },
    {
      icon: Server,
      title: "ML Operations",
      description: "End-to-end ML pipelines, model deployment, monitoring, and maintaining production ML systems.",
    },
    {
      icon: Cpu,
      title: "Real-time Systems",
      description: "Building low-latency recommendation systems and real-time analytics platforms serving millions of users.",
    },
    {
      icon: Code,
      title: "Software Engineering",
      description: "Clean, scalable code with best practices in testing, CI/CD, and collaborative development.",
    },
    {
      icon: GitBranch,
      title: "Research & Innovation",
      description: "Contributing to open-source projects, publishing research, and staying at the forefront of AI advances.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Passionate about transforming complex data into intelligent solutions that make a real difference. 
            My journey spans from early-stage startups to enterprise-scale implementations, always focused on 
            engineering rigor combined with practical business impact.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">My Journey</h3>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                With over 8 years in the field, I've witnessed the evolution of machine learning from experimental 
                research to production-critical systems. My career has been driven by a curiosity to solve complex 
                problems and a passion for building systems that scale.
              </p>
              <p>
                I've architected recommendation systems serving millions of users, built real-time analytics 
                platforms processing terabytes of data, and led teams in deploying robust ML operations frameworks. 
                Each project has taught me that the best ML solutions combine technical excellence with deep 
                understanding of business needs.
              </p>
              <p>
                When I'm not crafting ML solutions, you'll find me contributing to open-source projects, writing 
                technical blog posts, or exploring the latest research papers. I believe in sharing knowledge and 
                growing together as a community.
              </p>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">Technical Expertise</h3>
            <div className="space-y-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">{tech.name}</span>
                    <span className="text-xs text-muted-foreground">{tech.category}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tech.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Expertise Areas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Areas of Expertise</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-all duration-300"
              >
                <area.icon className="w-8 h-8 text-purple-600 mb-4" />
                <h4 className="text-xl font-semibold mb-3 text-foreground">{area.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 