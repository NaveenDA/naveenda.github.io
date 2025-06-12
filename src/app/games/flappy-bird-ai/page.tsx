import type { Metadata } from 'next';
import Bird from "./bird";

export const metadata: Metadata = {
  title: 'Flappy Bird AI - NEAT Implementation',
  description: 'Watch an AI learn to play Flappy Bird using NEAT (NeuroEvolution of Augmenting Topologies) algorithm. See how neural networks evolve and improve their gameplay through natural selection.',
  openGraph: {
    title: 'Flappy Bird AI - NEAT Neural Evolution',
    description: 'Experience Flappy Bird played by an AI that learns using the NEAT algorithm. Watch as neural networks evolve and adapt to master the game through natural selection.',
    url: 'https://naveenda.github.io/games/flappy-bird-ai',
    images: [
      {
        url: 'https://naveenda.github.io/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Flappy Bird AI with NEAT Algorithm',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flappy Bird AI - NEAT Neural Evolution',
    description: 'Experience Flappy Bird played by an AI that learns using the NEAT algorithm. Watch as neural networks evolve and adapt to master the game through natural selection.',
  },
  keywords: [
    'Flappy Bird',
    'NEAT Algorithm',
    'Neural Evolution',
    'NeuroEvolution',
    'Game AI',
    'Machine Learning',
    'Neural Networks',
    'Genetic Algorithm',
    'Interactive Demo',
    'Evolutionary Computing'
  ],
};

const FlappyBirdPage = () => {
    return (
       <Bird />
    );
};

export default FlappyBirdPage;