'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { X, ArrowLeft } from  "lucide-react"

const FlappyBirdGame = dynamic(() => import('./phaser-game'), {
  ssr: false,
});

const neatInfo = `
# How NEAT Learns to Play Flappy Bird
NEAT (NeuroEvolution of Augmenting Topologies) is a powerful algorithm that evolves neural networks using principles inspired by natural selection. In our Flappy Bird AI, NEAT helps a population of birds learn to play the game—without any hardcoded rules!

## The NEAT Evolution Cycle
Let's break down how NEAT works in this project:

### Initialization:
We start with a population of birds, each controlled by a randomly initialized neural network.
Simulation:
All birds play the game at the same time. Each bird receives information about its environment (like distance to pipes and its velocity) and decides whether to jump or do nothing.
Evaluation:
Birds are rewarded for surviving longer (time survived) and penalized for dying. The longer a bird stays alive, the higher its fitness.
Selection & Reproduction:
After all birds die, the best-performing networks are selected. These "elite" networks are copied, mutated, and sometimes combined to form a new generation.
Repeat:
The process repeats for many generations, with each new population getting better at playing the game.


![](/nn-bird.svg)



## Why NEAT Works for Flappy Bird
- No hardcoded rules: The AI learns by trial and error, not by being told how to play.
- Generalization: By facing random pipe positions, the AI learns a robust strategy that works in many situations.
- Continuous improvement: Each generation gets a little better, evolving smarter and more complex neural networks.

`

const FlappyBirdPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [population] = useState(100);
  const router = useRouter();


  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100 overflow-hidden">
      {/* Header (not absolute, just at the top) */}
      {showHeader && (
        <div className="w-full flex items-center justify-between bg-black bg-opacity-70 text-white px-4 py-2 z-20">
          <div className="flex items-center gap-2">
            {/* Back Button */}
            <button
              className="text-lg text-gray-300 hover:text-white px-2"
              onClick={() => router.push('/')}
              aria-label="Back"
            >
                <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-sm">
              Flappy Bird on NEAT
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-300 text-sm font-semibold"
              onClick={() => setShowModal(true)}
            >
              What is NEAT?
            </button>
          
            <button
              className="ml-2 text-lg text-gray-300 hover:text-white px-2"
              onClick={() => setShowHeader(false)}
              aria-label="Close header"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 prose h-[80vh] overflow-y-auto relative">
            <ReactMarkdown allowedElements={['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'img', 'svg']}>{neatInfo}</ReactMarkdown>
          </div>
        </div>
      )}
     
      <div className="flex-1 w-full">
        <FlappyBirdGame population={population} />
      </div>
    </div>
  );
};

export default FlappyBirdPage;