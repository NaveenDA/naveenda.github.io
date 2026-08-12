"use client";

import { Mail } from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/icons/brand-icons";
import { useState } from "react";
import ContactModal from "./contact-modal";

const quickLinks = [
  { label: "Work", href: "/#work" },
  { label: "Open Source", href: "/#open-source" },
  { label: "Blog", href: "/blog" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/naveenda", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/naveenda/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/naveenda_", label: "Twitter" },
];

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <>
      {isModalOpen && <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      <footer className="bg-ink text-paper">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-16 border-b border-paper/15">
            <h2 className="font-display text-4xl md:text-6xl leading-tight max-w-lg">
              Got something worth building?
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-gold text-ink font-semibold px-6 py-3 border border-gold shadow-hard-gold hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all self-start"
            >
              <Mail className="w-4 h-4" />
              Get in touch
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-10 py-16">
            <div className="space-y-3">
              <h3 className="font-display text-xl">Naveen DA</h3>
              <p className="text-sm text-paper/60 leading-relaxed max-w-xs">
                Machine learning engineer based in London, building production ML
                systems and the occasional neural net that plays Snake.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-paper/50 mb-4">
                Site
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-paper/80 hover:text-gold transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-paper/50 mb-4">
                Elsewhere
              </h4>
              <ul className="space-y-2">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-paper/80 hover:text-gold transition-colors"
                    >
                      <social.icon className="w-3.5 h-3.5" />
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-paper/15 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-paper/50">
            <span>&copy; {currentYear} Naveen DA. London, UK.</span>
            <span>Built with Next.js, styled by hand.</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
