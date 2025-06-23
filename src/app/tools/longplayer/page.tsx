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

const longplayerImages = [
    "https://lh3.googleusercontent.com/gpms-cs-s/AB8u6Ha6eQms2djBZlTCraPDu2RmuIPmPOMOfaS702UYj_OAv7Tv2VyZK_Ky_IQIt6ScrZ7h-2dHgHUS8s_GDKvD0q9EWek_LyYDXa2-QbWGXy7VuElJXvni-Lqe8Au5ta0iDCm8-AE-=w400-h300-k-no",
    "https://lh3.googleusercontent.com/gpms-cs-s/AB8u6HadViKnSM-tKJU2Rgl_Bqjyy9AYD8YGrQSJO8fkwzIRzOcv0vrvTm7pbqNxNLZaFnf5iE4Bqe9pxyqlUZ4FdKg57vvs0520S_Dlw7aLY-dHt_U7EePgmgAh0MtU3z-OvDbTuGk=w400-h300-k-no",
    "https://lh3.googleusercontent.com/gpms-cs-s/AB8u6HYyksznXvZzu1YclrHG149ZPpvJQL_eMbQ7a1zHwyG8AIZc_Qq7Debv_uFsx4jH0RVKfOki4olkEyXNpaVdpq2f7zCnitDkAemE03seiNnlCRFeO8k-TIwZiYLg6-ouAcO6zVti=w400-h300-k-no",
    "https://lh3.googleusercontent.com/gpms-cs-s/AB8u6HYq8H-EpcVxTlLHHmNR-7Dhld4G8uccmQOi_XBVkueAr-dzvHDJ7dJq0KrF9l8N8_XHGVUu-AVzbrtEFHc-OLxRVS0kF1YAuz6TYXGvBOmg-vJqt3KQ1tWZtN-6FJ0vJsoay-8=w400-h300-k-no",
];

export default function LongplayerBlog() {
    return (
        <>
            <Header />
            <div className="max-w-3xl mx-auto p-6 font-sans text-gray-800">
                <h1 className="text-3xl font-bold mb-4">
                    Discovering Longplayer: A 1,000-Year Symphony
                </h1>

                <p className="mb-4">
                    A few weeks ago, I stumbled upon something surreal while
                    walking through Trinity Buoy Wharf in London — a calm,
                    ambient drone filling a quiet lighthouse space. I soon
                    learned I was listening to{" "}
                    <strong>Longplayer</strong>: a piece of generative music
                    designed to play for <em>1,000 years</em>{" "}
                    without repeating. That blew my mind.
                </p>
                <Image
                    src="/longplayer.png"
                    alt="Longplayer"
                    width={500}
                    height={500}
                    className="rounded-lg block mx-auto"
                />

                <div className="mb-6 text-center">
                    <Link
                        href="/tools/longplayer/demo"
                        className="inline-block bg-blue-600 text-white px-5 py-2 rounded-2xl shadow hover:bg-blue-700 transition"
                    >
                        🎧 View the Demo
                    </Link>
                </div>

                <h2 className="text-xl font-semibold mt-6 mb-2">
                    What is Longplayer?
                </h2>
                <p className="mb-4">
                    Longplayer was created by Jem Finer in 1999. It's a
                    generative composition built from six short recordings of
                    Tibetan singing bowls. The magic lies in how these loops are
                    layered and time-shifted so they interact differently over
                    time. It started playing on January 1, 2000 and is intended
                    to continue — without repetition — until December 31, 2999.
                </p>

                <div className="grid grid-cols-2 gap-4">
                    {longplayerImages.map((image, index) => (
                        <Image
                            key={index}
                            src={image}
                            alt="Longplayer"
                            width={500}
                            height={500}
                            className="rounded-lg"
                        />
                    ))}
                </div>

                <h2 className="text-xl font-semibold mt-6 mb-2">
                    Why I Found It Fascinating
                </h2>
                <p className="mb-4">
                    As a developer who enjoys generative systems, this felt like
                    music-meets-systems design at an epic scale. The system
                    doesn't store a 1,000-year-long file. Instead, it uses time
                    — yes, real time — to determine exactly what should be
                    playing at any given moment.
                </p>

                <p className="mb-4">
                    What makes it even more interesting: if power is lost,
                    Longplayer resumes exactly where it should be based on the
                    clock. It's not sound that's being saved, but the logic.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">
                    Recreating It As a Developer
                </h2>
                <p className="mb-4">
                    That got me thinking: could I simulate this? My goal wasn't
                    to copy the full system, but to build a simplified,
                    time-synced ambient engine that layers loops in a similar
                    way. I chose <strong>React</strong> and{" "}
                    <strong>Tone.js</strong>{" "}
                    for clean state control and fine-grained audio timing.
                </p>

                <p className="mb-4">
                    The demo linked above is a small homage. It runs in the
                    browser, uses the system clock to determine playback
                    positions, and aims to give a glimpse of what a generative
                    system feels like when built around real time.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">
                    What's Next?
                </h2>
                <p className="mb-4">
                    I'm thinking about adding spatial sound positioning
                    (multi-speaker simulation), time zone syncing, and even
                    remote shared sessions. There's something poetic in the idea
                    that a piece of code can run with the elegance of a musical
                    composition.
                </p>
                <div className="mb-6">
                    <Link
                        href="/tools/longplayer/demo"
                        className="inline-block bg-blue-600 text-white px-5 py-2 rounded-2xl shadow hover:bg-blue-700 transition"
                    >
                        🎧 View the Demo
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}
