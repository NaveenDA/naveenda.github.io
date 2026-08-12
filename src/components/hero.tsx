"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Brain } from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/icons/brand-icons";

const Kaggle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M17.9815 20.8877C17.9625 20.9621 17.8869 20.9994 17.7552 20.9994H15.2357C15.0843 20.9994 14.9532 20.9343 14.8396 20.8038L10.6793 15.5867L9.51913 16.6747V20.7209C9.51913 20.9071 9.42453 21 9.23598 21H7.28315C7.09428 21 7 20.9071 7 20.7209V2.27851C7 2.09294 7.09428 2 7.28315 2H9.2363C9.42485 2 9.51945 2.09325 9.51945 2.27851V13.634L14.5006 8.66785C14.6326 8.53799 14.7647 8.47259 14.8967 8.47259H17.5009C17.6139 8.47259 17.6892 8.51952 17.7272 8.61184C17.7653 8.72355 17.7558 8.8071 17.6987 8.86312L12.4341 13.8843L17.9247 20.6085C17.9999 20.683 18.0186 20.7759 17.9815 20.8877Z"
      fill="currentColor"
    />
  </svg>
);

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/naveenda_", label: "Twitter" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/naveenda/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/naveenda", label: "GitHub" },
  { icon: Kaggle, href: "https://www.kaggle.com/naveenda", label: "Kaggle" },
  { icon: Brain, href: "https://huggingface.co/naveenda", label: "HuggingFace" },
];

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 + i * 0.12, ease: "easeOut" },
  }),
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-10 py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto w-full relative">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-8"
        >
          <span className="w-2 h-2 bg-gold rounded-full" />
          Machine Learning Engineer &middot; London, UK
        </motion.p>

        <h1 className="font-display text-[11vw] leading-[1.02] md:text-[6.2vw] md:leading-[0.98] tracking-tight text-foreground">
          <motion.div custom={0} initial="hidden" animate="visible" variants={lineVariants}>
            I&rsquo;m Naveen.
          </motion.div>
          <motion.div custom={1} initial="hidden" animate="visible" variants={lineVariants}>
            An engineer who teaches
          </motion.div>
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            className="italic"
          >
            machines to learn.
          </motion.div>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 max-w-xl"
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            10 years building production ML systems. Lately: neural nets that
            play Flappy Bird and Snake.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 bg-gold text-ink font-semibold px-6 py-3 border border-ink shadow-hard-sm hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
          >
            See the work
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/blog"
            className="text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-gold-ink transition-colors"
          >
            Read the blog
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="hidden sm:flex flex-col items-center gap-4 absolute right-6 md:right-10 bottom-10"
      >
        <div className="w-px h-16 bg-foreground/20" />
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="text-foreground/70 hover:text-gold-ink transition-colors"
          >
            <social.icon className="w-4 h-4" />
          </a>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
