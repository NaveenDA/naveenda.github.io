"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Brain, Github, Linkedin, Twitter } from "lucide-react";

const Kaggle = () => {
  // just return a k with #1BC0FF
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.9815 20.8877C17.9625 20.9621 17.8869 20.9994 17.7552 20.9994H15.2357C15.0843 20.9994 14.9532 20.9343 14.8396 20.8038L10.6793 15.5867L9.51913 16.6747V20.7209C9.51913 20.9071 9.42453 21 9.23598 21H7.28315C7.09428 21 7 20.9071 7 20.7209V2.27851C7 2.09294 7.09428 2 7.28315 2H9.2363C9.42485 2 9.51945 2.09325 9.51945 2.27851V13.634L14.5006 8.66785C14.6326 8.53799 14.7647 8.47259 14.8967 8.47259H17.5009C17.6139 8.47259 17.6892 8.51952 17.7272 8.61184C17.7653 8.72355 17.7558 8.8071 17.6987 8.86312L12.4341 13.8843L17.9247 20.6085C17.9999 20.683 18.0186 20.7759 17.9815 20.8877Z"
        fill="currentColor"
      />
    </svg>
  );
};

const Hero = () => {
  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/naveenda_", label: "Twitter" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/naveenda/",
      label: "LinkedIn",
    },
    { icon: Github, href: "https://github.com/naveenda", label: "GitHub" },
    { icon: Kaggle, href: "https://www.kaggle.com/naveenda", label: "Kaggle" },
    { icon: Brain, href: "https://huggingface.co/naveenda", label: "HuggingFace" },
  ];

  // Rotating list of skills for typewriter-like effect
  const skills = [
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "Natural Language Processing",
    "Data Science",
    "AI",
    "ML",
    "Next.js",
    "React",
    "TypeScript",
    "Open Source",
  ];

  const [skillIndex, setSkillIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSkillIndex((prev) => (prev + 1) % skills.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-4 bg-white overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle, #e6e6e6 1px, transparent 1px)",
        backgroundSize: "10px 10px",
      }}
    >
      {/* Animated blurred blobs */}
      <motion.div
        className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-teal-400 rounded-full opacity-30 blur-3xl"
        initial={{ x: -100, y: -100 }}
        animate={{ x: [-100, 80, -100], y: [-100, 80, -100] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[-120px] right-[-120px] w-80 h-80 bg-fuchsia-400 rounded-full opacity-20 blur-3xl"
        initial={{ x: 100, y: 100 }}
        animate={{ x: [100, -60, 100], y: [100, -60, 100] }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "mirror", delay: 2 }}
      />

      {/* Scrolling matrix background */}
      <motion.div
        className="pointer-events-none absolute inset-0 font-mono text-[10px] leading-3 whitespace-pre text-gray-400 opacity-5 select-none"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 120 })
          .map(() => "0100110010011010 1010 1100101101 001011\n")
          .join("")}
      </motion.div>

      <div className="max-w-4xl mx-auto text-center relative">
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
              <motion.span
                className="inline-block w-3 h-3 md:w-4 md:h-4 bg-teal-500 rounded-full ml-2"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            <div className="mb-4">I am</div>
            <div>NaveenDA</div>
            <div className="bg-gradient-to-r from-teal-400 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent text-3xl md:text-4xl font-semibold mt-2 animate-[gradient-move_6s_linear_infinite]">
              Machine Learning Engineer
            </div>
          </h1>

          {/* Typewriter-style rotating skills */}
          <div className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed mt-8 h-8">
            <AnimatePresence mode="wait">
              <motion.span
                key={skills[skillIndex]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {skills[skillIndex]}
              </motion.span>
            </AnimatePresence>
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
      </div>


      {/* Social Links - vertical bottom right, relative to section (full width) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="hidden sm:flex flex-col items-center space-y-4 absolute right-6 bottom-6"
      >
        {/* decorative vertical line */}
        <div className="w-px h-24 bg-gray-300" />
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
            className="w-6 h-6 text-gray-900 hover:text-gray-600 transition-colors"
          >
            <social.icon className="w-6 h-6" />
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
