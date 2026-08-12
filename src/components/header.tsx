'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContactModal from './contact-modal';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/#work' },
    { name: 'Blog', href: '/blog' },
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Image
                            src="/logo.svg"
                            alt="Naveen DA"
                            width={30}
                            height={30}
                            className="h-[30px] w-[30px] transition-transform group-hover:-rotate-6"
                        />
                        <span className="font-display text-lg tracking-tight text-foreground">
                            Naveen&nbsp;DA
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-gold after:transition-all hover:after:w-full"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => setIsContactOpen(true)}
                            className="text-sm font-semibold px-4 py-2 border border-foreground/80 hover:border-gold hover:bg-gold hover:text-ink transition-colors"
                        >
                            Contact
                        </button>
                    </nav>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-foreground"
                        aria-label="Toggle menu"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden border-t border-border py-3 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block px-1 py-2 text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                setIsContactOpen(true);
                            }}
                            className="block px-1 py-2 text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
                        >
                            Contact
                        </button>
                    </div>
                )}
            </div>
            {isContactOpen && (
                <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
            )}
        </header>
    );
};

export default Header;
