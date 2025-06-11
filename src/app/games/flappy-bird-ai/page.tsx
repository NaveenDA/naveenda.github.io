'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const FlappyBirdGame = dynamic(() => import('./phaser-game'), {
  ssr: false,
});

const neatInfo = `
NEAT (NeuroEvolution of Augmenting Topologies) is a genetic algorithm for evolving artificial neural networks. It evolves both the weights and the structure (topology) of the network, allowing for increasingly complex solutions over generations. In Flappy Bird AI, NEAT is often used to train birds to play the game by evolving their neural networks based on performance (score). This approach enables the AI to learn strategies for passing through pipes without any hardcoded rules.`;

const FlappyBirdPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  return (
    <div className="relative w-screen h-screen bg-gray-100">
      {/* Top bar with credit and NEAT info button */}
      {showHeader && (
        <div className="absolute top-0 left-0 w-full flex items-center justify-between bg-black bg-opacity-70 text-white px-4 py-2 z-20">
          <span className="text-sm">
            Flappy Bird &copy; Dong Nguyen &mdash; Assets from{' '}
            <a href="https://github.com/samuelcust/flappy-bird-assets" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">samuelcust/flappy-bird-assets</a>
          </span>
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
              &times;
            </button>
          </div>
        </div>
      )}

      {/* NEAT Info Modal */}
      {showModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2 text-center">What is NEAT?</h2>
            <p className="text-gray-700 whitespace-pre-line text-base">{neatInfo}</p>
          </div>
        </div>
      )}

      {/* Game */}
      <FlappyBirdGame />
    </div>
  );
};

export default FlappyBirdPage;