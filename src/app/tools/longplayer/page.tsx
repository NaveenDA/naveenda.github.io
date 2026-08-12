import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Longplayer - A 1000-Year Musical Composition | NaveenDA',
    description: 'Discover Longplayer, a generative musical piece designed to play for 1000 years. Learn about its history, how it works, and experience a web-based simulation.',
    keywords: 'Longplayer, Jem Finer, generative music, Tibetan singing bowls, 1000-year composition, ambient music, Trinity Buoy Wharf',
    openGraph: {
        title: 'Longplayer - A 1000-Year Musical Composition',
        description: 'Experience a web simulation of Longplayer, the legendary 1000-year musical composition using Tibetan singing bowls.',
        images: ['https://naveenda.com/longplayer-demo.png'],
        type: 'article',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Longplayer - A 1000-Year Musical Composition',
        description: 'Experience a web simulation of Longplayer, the legendary 1000-year musical composition using Tibetan singing bowls.',
        images: ['https://naveenda.com/longplayer-demo.png'],
    }
};

const LONGPLAYER_IMAGE = "/images/longplayer/trinity-buoy-wharf-lighthouse.jpg";

export default function LongplayerBlog() {
    return (
        <>
            <Header />
            <article className="max-w-2xl mx-auto px-6 md:px-0 py-16 md:py-24">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-ink mb-4">
                    Tools &middot; Generative Audio
                </p>
                <h1 className="font-display text-4xl md:text-5xl mb-8 leading-tight">
                    Discovering Longplayer: A 1,000-Year Symphony
                </h1>

                <div className="prose prose-lg max-w-none prose-headings:font-display prose-a:text-gold-ink prose-a:no-underline hover:prose-a:underline">
                    <p>
                        A few weeks ago, I stumbled upon something surreal while
                        walking through Trinity Buoy Wharf in London - a calm,
                        ambient drone filling a quiet lighthouse space. I soon
                        learned I was listening to{" "}
                        <strong>Longplayer</strong>: a piece of generative music
                        designed to play for <em>1,000 years</em>{" "}
                        without repeating. That blew my mind.
                    </p>
                </div>

                <Image
                    src="/longplayer.png"
                    alt="Longplayer"
                    width={500}
                    height={500}
                    className="block mx-auto my-10 border border-border"
                />

                <div className="mb-10 text-center">
                    <Link
                        href="/tools/longplayer/demo"
                        className="inline-flex items-center gap-2 bg-gold text-ink font-semibold px-6 py-3 border border-ink shadow-hard-sm hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
                    >
                        View the Demo
                    </Link>
                </div>

                <div className="prose prose-lg max-w-none prose-headings:font-display prose-a:text-gold-ink prose-a:no-underline hover:prose-a:underline">
                    <h2>What is Longplayer?</h2>
                    <p>
                        Longplayer was created by Jem Finer in 1999. It’s a
                        generative composition built from six short recordings of
                        Tibetan singing bowls. The magic lies in how these loops are
                        layered and time-shifted so they interact differently over
                        time. It started playing on January 1, 2000 and is intended
                        to continue - without repetition - until December 31, 2999.
                    </p>
                </div>

                <figure className="my-10">
                    <Image
                        src={LONGPLAYER_IMAGE}
                        alt="Trinity Buoy Wharf lighthouse (Bow Creek Lighthouse), London"
                        width={1278}
                        height={826}
                        priority
                        className="w-full h-auto border border-border"
                    />
                    <figcaption className="mt-3 text-xs text-muted-foreground">
                        Photo by{" "}
                        <a
                            className="underline underline-offset-2 hover:text-gold-ink"
                            href="https://commons.wikimedia.org/wiki/User:Cmglee"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Cmglee
                        </a>
                        , licensed under{" "}
                        <a
                            className="underline underline-offset-2 hover:text-gold-ink"
                            href="https://creativecommons.org/licenses/by-sa/3.0/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            CC BY-SA 3.0
                        </a>
                        , via{" "}
                        <a
                            className="underline underline-offset-2 hover:text-gold-ink"
                            href="https://commons.wikimedia.org/wiki/File:Cmglee_Trinity_Buoy_Wharf_lighthouse.jpg"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Wikimedia Commons
                        </a>
                        .
                    </figcaption>
                </figure>

                <div className="prose prose-lg max-w-none prose-headings:font-display prose-a:text-gold-ink prose-a:no-underline hover:prose-a:underline">
                    <h2>Why I Found It Fascinating</h2>
                    <p>
                        As a developer who enjoys generative systems, this felt like
                        music-meets-systems design at an epic scale. The system
                        doesn’t store a 1,000-year-long file. Instead, it uses time
                        - yes, real time - to determine exactly what should be
                        playing at any given moment.
                    </p>

                    <p>
                        What makes it even more interesting: if power is lost,
                        Longplayer resumes exactly where it should be based on the
                        clock. It’s not sound that’s being saved, but the logic.
                    </p>

                    <h2>Recreating It As a Developer</h2>
                    <p>
                        That got me thinking: could I simulate this? My goal wasn’t
                        to copy the full system, but to build a simplified,
                        time-synced ambient engine that layers loops in a similar
                        way. I chose <strong>React</strong> and{" "}
                        <strong>Tone.js</strong>{" "}
                        for clean state control and fine-grained audio timing.
                    </p>

                    <p>
                        The demo linked above is a small homage. It runs in the
                        browser, uses the system clock to determine playback
                        positions, and aims to give a glimpse of what a generative
                        system feels like when built around real time.
                    </p>

                    <h2>What’s Next?</h2>
                    <p>
                        I’m thinking about adding spatial sound positioning
                        (multi-speaker simulation), time zone syncing, and even
                        remote shared sessions. There’s something poetic in the idea
                        that a piece of code can run with the elegance of a musical
                        composition.
                    </p>
                </div>

                <div className="mt-10">
                    <Link
                        href="/tools/longplayer/demo"
                        className="inline-flex items-center gap-2 bg-gold text-ink font-semibold px-6 py-3 border border-ink shadow-hard-sm hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
                    >
                        View the Demo
                    </Link>
                </div>
            </article>
            <Footer />
        </>
    );
}
