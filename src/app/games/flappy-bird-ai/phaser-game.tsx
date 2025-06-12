'use client';

import { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';

interface FlappyBirdGameProps {
  population?: number;
}

interface BirdAI {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  network: any;
  alive: boolean;
  score: number;
  fitness: number;
}

declare global {
  interface Window {
    neataptic: any;
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.body.appendChild(script);
  });
}

const FlappyBirdGame = ({ population: initialPopulation = 100 }: FlappyBirdGameProps) => {
  const gameRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(true);
  const [population, setPopulation] = useState(initialPopulation);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!gameStarted) return;
    let game: Phaser.Game | null = null;
    let neatapticLoaded = false;
    let destroyGame = () => {};

    loadScript('https://cdn.jsdelivr.net/npm/neataptic@1.4.7/dist/neataptic.min.js').then(() => {
      neatapticLoaded = true;
      if (!gameRef.current || typeof window === 'undefined' || !window.neataptic) return;
      const { Network, Neat, methods, architect } = window.neataptic;

      // NEAT setup (browser-only)
      const neat = new Neat(
        3, // inputs: dist to top, dist to bottom, velocity
        2, // outputs: jump, do nothing
        null,
        {
          mutation: methods.mutation.ALL,
          popsize: population,
          elitism: Math.round(0.2 * population),
          network: new architect.Perceptron(3, 6, 2),
        }
      );

      let birds: BirdAI[] = [];
      let pipes: Phaser.Physics.Arcade.Group;
      let ground: Phaser.GameObjects.TileSprite;
      let background: Phaser.GameObjects.Image;
      let scoreText: Phaser.GameObjects.Text;
      let bestScoreText: Phaser.GameObjects.Text;
      let aliveText: Phaser.GameObjects.Text;
      let gameOver = false;
      let groundSpeed = 2;
      let bestTime = 0;
      let generation = 1;
      let scene: Phaser.Scene;

      function preload(this: Phaser.Scene) {
        this.load.image('background', 'https://raw.githubusercontent.com/samuelcust/flappy-bird-assets/master/sprites/background-day.png');
        this.load.image('pipe', 'https://raw.githubusercontent.com/samuelcust/flappy-bird-assets/master/sprites/pipe-green.png');
        this.load.image('ground', 'https://raw.githubusercontent.com/samuelcust/flappy-bird-assets/master/sprites/base.png');
        this.load.spritesheet('bird', 'https://raw.githubusercontent.com/samuelcust/flappy-bird-assets/master/sprites/yellowbird-midflap.png', { frameWidth: 34, frameHeight: 24 });
      }

      function startGeneration(this: Phaser.Scene) {
        scene = this;
        gameOver = false;
        // Set a fixed random seed for reproducible pipe positions
        const rng = new Phaser.Math.RandomDataGenerator(['flappy']);
        const { width, height } = this.cameras.main;
        background = this.add.image(width / 2, height / 2, 'background');
        background.setDisplaySize(width, height);
        pipes = this.physics.add.group();
        const groundHeight = 112;
        ground = this.add.tileSprite(0, height, width, groundHeight, 'ground').setOrigin(0, 1);
        this.physics.add.existing(ground, true);
        const groundBody = ground.body as Phaser.Physics.Arcade.Body;
        groundBody.allowGravity = false;
        groundBody.immovable = true;
        birds = neat.population.map((network: any) => {
          const sprite = this.physics.add.sprite(width / 2, height / 2, 'bird');
          sprite.setCollideWorldBounds(true);
          sprite.setVisible(true);
          sprite.setAlpha(1);
          sprite.setAngularVelocity(0);
          sprite.setAngle(0);
          const body = sprite.body as Phaser.Physics.Arcade.Body;
          body.allowGravity = true;
          body.setVelocity(0, 0);
          body.checkCollision.none = false;
          return {
            sprite,
            network,
            alive: true,
            score: 0,
            fitness: 0,
          };
        });
        this.physics.add.collider(pipes, ground);
        scoreText = this.add.text(16, 16, 'Generation: ' + generation, { fontSize: '24px', color: '#FFF', stroke: '#000', strokeThickness: 4 });
        bestScoreText = this.add.text(width - 16, 16, 'Best: ' + bestTime.toFixed(2) + 's', { fontSize: '24px', color: '#FFF', stroke: '#000', strokeThickness: 4 }).setOrigin(1, 0);
        aliveText = this.add.text(16, 48, 'Alive: ' + birds.length + '/' + population, { fontSize: '24px', color: '#FFF', stroke: '#000', strokeThickness: 4 });
        this.time.addEvent({
          delay: 1500,
          callback: () => addPipeRow.call(this, rng),
          loop: true,
        });
      }

      function addPipeRow(this: Phaser.Scene, rng?: Phaser.Math.RandomDataGenerator) {
        if (gameOver) return;
        const { width, height } = this.cameras.main;
        const pipeX = width;
        const gap = 150;
        const minPipeHeight = 50;
        const maxPipeHeight = height - 2 * gap - 112;
        // Use seeded RNG if provided, otherwise fallback to Phaser.Math.Between
        const topPipeHeight = rng ? rng.between(minPipeHeight, maxPipeHeight) : Phaser.Math.Between(minPipeHeight, maxPipeHeight);
        const bottomPipeY = topPipeHeight + gap;
        const bottomPipeHeight = height - bottomPipeY - 112;
        const upperPipe = pipes.create(pipeX, topPipeHeight, 'pipe').setOrigin(0.5, 1);
        upperPipe.setFlipY(true);
        upperPipe.displayHeight = topPipeHeight;
        upperPipe.displayWidth = 52;
        const upperPipeBody = upperPipe.body as Phaser.Physics.Arcade.Body;
        upperPipeBody.allowGravity = false;
        upperPipeBody.velocity.x = -200;
        upperPipe.setImmovable(true);
        upperPipe.setData('scored', false);
        const lowerPipe = pipes.create(pipeX, bottomPipeY, 'pipe').setOrigin(0.5, 0);
        lowerPipe.displayHeight = bottomPipeHeight;
        lowerPipe.displayWidth = 52;
        const lowerPipeBody = lowerPipe.body as Phaser.Physics.Arcade.Body;
        lowerPipeBody.allowGravity = false;
        lowerPipeBody.velocity.x = -200;
        lowerPipe.setImmovable(true);
      }

      function update(this: Phaser.Scene) {
        if (gameOver) return;
        const { width, height } = this.cameras.main;
        let nextPipe: any = null;
        let minDist = Infinity;
        pipes.getChildren().forEach((pipe: any) => {
          if (pipe.originY === 1 && pipe.x + pipe.displayWidth / 2 > width / 2) {
            const dist = pipe.x - width / 2;
            if (dist < minDist) {
              minDist = dist;
              nextPipe = pipe;
            }
          }
        });
        let aliveCount = 0;
        birds.forEach((bird, i) => {
          if (!bird.alive) return;
          aliveCount++;
          let distToTop = 0, distToBottom = 0;
          if (nextPipe) {
            distToTop = bird.sprite.y - (nextPipe.y - nextPipe.displayHeight);
            distToBottom = (nextPipe.y + 150) - bird.sprite.y;
          }
          const velocity = bird.sprite.body.velocity.y / 10;
          const inputs = [distToTop / height, distToBottom / height, velocity];
          const outputs = bird.network.activate(inputs);
          if (outputs[0] > outputs[1]) {
            bird.sprite.setVelocityY(-350);
          }
          // Strict bounding box check: kill bird if any part touches any edge
          const bounds = bird.sprite.getBounds();
          if (
            bounds.top <= 0 ||
            bounds.bottom >= height ||
            bounds.left <= 0 ||
            bounds.right >= width
          ) {
            bird.alive = false;
            bird.fitness -= 100;
            const body = bird.sprite.body as Phaser.Physics.Arcade.Body;
            body.checkCollision.none = true;
            body.setVelocity(0, 0);
            body.allowGravity = false;
            bird.sprite.setAlpha(0.5);
            bird.sprite.setAngularVelocity(200);
            bird.sprite.setVisible(false);
          }
          // Small penalty for being too close to the top or bottom
          if (bird.sprite.y < 50 || bird.sprite.y > height - 150) {
            bird.fitness -= 0.05;
          }
          pipes.getChildren().forEach((pipe: any) => {
            const birdBounds = bird.sprite.getBounds();
            const pipeBounds = pipe.getBounds();
            if (Phaser.Geom.Intersects.RectangleToRectangle(birdBounds, pipeBounds)) {
              bird.alive = false;
              bird.fitness -= 1;
              bird.sprite.setVisible(false);
            }
          });
          bird.fitness += 0.1;
        });
        Phaser.Actions.Call(pipes.getChildren(), (pipe: any) => {
          if (pipe.x < -pipe.width) {
            pipe.destroy();
          }
          if (pipe.originY === 1 && pipe.x < width / 2 && !pipe.getData('scored')) {
            birds.forEach((bird) => {
              if (bird.alive) bird.score++;
              bird.fitness += 1;
            });
            pipe.setData('scored', true);
          }
        }, this);
        let bestBird = birds.reduce((a, b) => (a.score > b.score ? a : b));
        birds.forEach((bird) => {
          bird.sprite.setAlpha(bird === bestBird ? 1 : 0.3);
        });
        // Track max time survived for this generation
        let maxTime = 0;
        birds.forEach((bird) => {
          if (bird.alive) {
            // Use bird.fitness as time survived (since it's incremented every frame)
            maxTime = Math.max(maxTime, bird.fitness);
          }
        });
        if (maxTime > bestTime) bestTime = maxTime;
        bestScoreText.setText('Best: ' + (bestTime / 60).toFixed(2) + 's'); // Assuming 60 FPS
        if (aliveCount === 0) {
          gameOver = true;
          setTimeout(() => {
            birds.forEach((bird, i) => {
              neat.population[i].score = bird.fitness;
            });
            neat.evolve();
            generation++;
            this.scene.restart();
          }, 1000);
        }
        aliveText.setText('Alive: ' + aliveCount + '/' + population);
        ground.tilePositionX += groundSpeed;
      }

      const gameConfig: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        scale: {
          mode: Phaser.Scale.RESIZE,
          parent: gameRef.current,
          width: '100%',
          height: '100%',
        },
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 1000 },
            debug: false,
          },
        },
        scene: {
          preload,
          create: startGeneration,
          update,
        },
      };

      game = new Phaser.Game(gameConfig);
      destroyGame = () => game && game.destroy(true);
    });

    return () => {
      destroyGame();
    };
  }, [gameStarted, population]);

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-lg shadow-lg max-w-xs w-full p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-center">Start NEAT Training</h2>
            <div className="flex items-center gap-2 mb-4">
              <button
                className="bg-yellow-400 hover:bg-yellow-300 text-black rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold"
                onClick={() => setPopulation((p) => Math.max(p - 10, 1))}
                aria-label="Decrease population"
              >
                -
              </button>
              <span className="font-semibold text-lg w-10 text-center">{population}</span>
              <button
                className="bg-yellow-400 hover:bg-yellow-300 text-black rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold"
                onClick={() => setPopulation((p) => Math.min(p + 10, 200))}
                aria-label="Increase population"
              >
                +
              </button>
            </div>
            <span className="text-xs text-gray-500 mb-4">Birds in training</span>
            <button
              className="mt-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded-full text-lg font-bold shadow"
              onClick={() => {
                setShowModal(false);
                setGameStarted(true);
              }}
            >
              Start Training
            </button>
          </div>
        </div>
      )}
      <div ref={gameRef} className="w-screen h-screen" />
    </>
  );
};

export default FlappyBirdGame; 