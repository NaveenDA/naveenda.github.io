import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Longplayer Simulation - Interactive Demo | NaveenDA',
    description: 'Experience an interactive web simulation of Longplayer. Control and visualize six Tibetan singing bowl loops creating an ever-changing ambient soundscape.',
    keywords: 'Longplayer demo, music visualization, generative music, web audio, interactive music, Tibetan bowls simulation',
    openGraph: {
        title: 'Longplayer Simulation - Interactive Demo',
        description: 'Control and visualize an ever-changing ambient soundscape inspired by the 1000-year Longplayer composition.',
        images: ['https://naveenda.com/longplayer-demo.png'],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Longplayer Simulation - Interactive Demo',
        description: 'Control and visualize an ever-changing ambient soundscape inspired by the 1000-year Longplayer composition.',
        images: ['https://naveenda.com/longplayer-demo.png'],
    }
};

export default function DemoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 