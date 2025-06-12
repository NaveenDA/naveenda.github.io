"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Dribbble,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";

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
  ];

  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 bg-white"
      style={{
        backgroundImage:
          "radial-gradient(circle, #e6e6e6 1px, transparent 1px)",
        backgroundSize: "10px 10px",
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
              <span className="inline-block w-3 h-3 md:w-4 md:h-4 bg-teal-500 rounded-full ml-2">
              </span>
            </div>
            <div className="mb-4">I am</div>
            <div>NaveenDA</div>
          </h1>

          <div className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed mt-8">
            <p>
              Machine Learning Engineer crafting impactful AI solutions with
              deep learning and data-driven innovation.
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
  );
};

export default Hero;
