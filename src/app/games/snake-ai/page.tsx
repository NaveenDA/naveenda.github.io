import SnakeAI from "./ai";
import type { Metadata } from 'next';

// let's add metadata here

export const metadata: Metadata = {
  title: 'Snake AI - NEAT Q-Learning',
  description: 'Play the classic Snake game with an AI that learns using NEAT (NeuroEvolution of Augmenting Topologies) and Q-Learning algorithms. Watch as the AI improves its gameplay through reinforcement learning.',
  openGraph: {
    title: 'Snake AI - NEAT Q-Learning Implementation',
    description: 'Experience the classic Snake game powered by AI using NEAT and Q-Learning algorithms. Watch the AI learn and improve its gameplay through reinforcement learning.',
    url: 'https://naveenda.github.io/games/snake-ai',
    images: [
      {
        url: 'https://naveenda.github.io/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Snake AI Game with NEAT Q-Learning',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Snake AI - NEAT Q-Learning Implementation',
    description: 'Experience the classic Snake game powered by AI using NEAT and Q-Learning algorithms. Watch the AI learn and improve its gameplay through reinforcement learning.',
  },
  keywords: [
    'Snake Game',
    'AI Snake',
    'NEAT Algorithm',
    'Q-Learning',
    'Reinforcement Learning',
    'Machine Learning',
    'Neural Networks',
    'Game AI',
    'Interactive Demo',
    'Educational Game'
  ],
};

const SnakeAIPage = () => {
    return (
        <SnakeAI />
    )
}

export default SnakeAIPage;