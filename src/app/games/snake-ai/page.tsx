'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { QLearnAgent } from './QLearnAgent';
import { StateManager } from './StateManager';
import { Direction, Action } from './types';

// Global training state that can be accessed by both React and Phaser
const gameState = {
  isTraining: false,
  bestScore: parseInt(localStorage.getItem('snake-ai-best-score') || '0')
};

const SnakeAI = () => {
  const gameRef = useRef<any>(null);
  const [showHeader, setShowHeader] = useState(true);
  const router = useRouter();
  const [showStartModal, setShowStartModal] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(gameState.bestScore);
  const [generation, setGeneration] = useState(0);
  const [explorationRate, setExplorationRate] = useState(1);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let game: any = null;

    // Import Phaser dynamically
    import('phaser').then((Phaser) => {
      class SnakeScene extends Phaser.Scene {
        private snake!: Phaser.GameObjects.Group;
        private food!: Phaser.GameObjects.Rectangle;
        private direction: Direction = 'RIGHT';
        private nextDirection: Direction = 'RIGHT';
        private moveTime: number = 0;
        private score: number = 0;
        private scoreText!: Phaser.GameObjects.Text;
        private generationText!: Phaser.GameObjects.Text;
        private bestScoreText!: Phaser.GameObjects.Text;
        private agent: QLearnAgent;
        private stateManager: StateManager;
        private lastState: any;
        private lastAction: Action | null = null;
        private movesWithoutFood: number = 0;
        private maxMovesWithoutFood: number = 100;
        private gameSpeed: number = 50;

        constructor() {
          super({ key: 'SnakeScene' });
          this.agent = new QLearnAgent();
          // Try to load saved agent data
          const savedData = localStorage.getItem('snake-ai-data');
          if (savedData) {
            this.agent.loadFromString(savedData);
          }
          this.stateManager = new StateManager(this);
        }

        create() {
          this.stateManager.initDimensions();
          this.initializeGame();
          this.moveTime = this.time.now;
        }

        private initializeGame() {
          // Create snake
          this.snake = this.add.group();
          const startX = 16 * 10;
          const startY = 16 * 10;
          
          // Create initial snake body
          for (let i = 0; i < 3; i++) {
            const segment = this.add.rectangle(startX - (i * 16), startY, 16, 16, 0x00ff00);
            this.snake.add(segment);
          }

          // Create food
          this.food = this.add.rectangle(0, 0, 16, 16, 0xff0000);
          this.placeFood();

          // Score text
          this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            color: '#fff'
          });

          // Best score text
          this.bestScoreText = this.add.text(16, 56, `Best Score: ${gameState.bestScore}`, {
            fontSize: '32px',
            color: '#00ff00'
          });

          // Generation text
          this.generationText = this.add.text(
            this.game.config.width as number - 200,
            16,
            `Generation: ${generation}`,
            {
              fontSize: '32px',
              color: '#fff'
            }
          );

          // Reset variables
          this.direction = 'RIGHT';
          this.nextDirection = 'RIGHT';
          this.score = 0;
          this.movesWithoutFood = 0;
          this.lastAction = null;
          this.moveTime = this.time.now;
          this.updateScore();
          this.updateGeneration();
        }

        private updateGeneration() {
          this.generationText.setText(`Generation: ${generation}`);
        }

        update(time: number) {
          if (!gameState.isTraining) return;
          
          if (time >= this.moveTime) {
            this.aiMove();
            this.moveSnake();
          }
        }

        private aiMove() {
          const state = this.stateManager.calculateState(this.snake, this.food, this.direction);
          
          // Learn from last action if it exists
          if (this.lastState && this.lastAction !== null) {
            const reward = this.calculateReward();
            this.agent.learn(this.lastState, this.lastAction, reward, state);
            setExplorationRate(this.agent.getExplorationRate());
          }

          // Choose new action
          const action = this.agent.chooseAction(state);
          this.lastState = state;
          this.lastAction = action;

          // Convert action to direction
          this.nextDirection = this.getNewDirection(this.direction, action);
        }

        private calculateReward(): number {
          let reward = -0.01; // Base penalty for each move
          
          // Check if dead
          const head = this.snake.getFirst(true) as Phaser.GameObjects.Rectangle;
          if (this.checkCollision(head.x, head.y)) {
            return -1;
          }

          // Check if ate food
          if (head.x === this.food.x && head.y === this.food.y) {
            reward = 1;
            this.movesWithoutFood = 0;
          } else {
            // Increasing penalty the longer it goes without food
            const timePenalty = (this.movesWithoutFood / this.maxMovesWithoutFood) * 0.1;
            reward -= timePenalty;

            // Penalty for moving away from food
            const distanceToFood = Math.abs(head.x - this.food.x) + Math.abs(head.y - this.food.y);
            const distancePenalty = distanceToFood / (this.game.config.width as number);
            reward -= distancePenalty;

            // Extra penalty when getting close to max moves without food
            if (this.movesWithoutFood > this.maxMovesWithoutFood * 0.8) {
              reward -= 0.2; // Significant penalty when running out of time
            }
          }

          return reward;
        }

        private getNewDirection(currentDirection: Direction, action: Action): Direction {
          const directionMap: Record<Direction, Record<Action, Direction>> = {
            'UP': {
              'LEFT': 'LEFT',
              'RIGHT': 'RIGHT',
              'STRAIGHT': 'UP'
            },
            'DOWN': {
              'LEFT': 'RIGHT',
              'RIGHT': 'LEFT',
              'STRAIGHT': 'DOWN'
            },
            'LEFT': {
              'LEFT': 'DOWN',
              'RIGHT': 'UP',
              'STRAIGHT': 'LEFT'
            },
            'RIGHT': {
              'LEFT': 'UP',
              'RIGHT': 'DOWN',
              'STRAIGHT': 'RIGHT'
            }
          };
          
          return directionMap[currentDirection][action];
        }

        moveSnake() {
          this.direction = this.nextDirection;

          const head = this.snake.getFirst(true) as Phaser.GameObjects.Rectangle;
          if (!head) return;
          
          const headX = head.x;
          const headY = head.y;

          // Calculate new head position
          let newX = headX;
          let newY = headY;

          switch (this.direction) {
            case 'LEFT':
              newX = headX - 16;
              break;
            case 'RIGHT':
              newX = headX + 16;
              break;
            case 'UP':
              newY = headY - 16;
              break;
            case 'DOWN':
              newY = headY + 16;
              break;
          }

          // Check for collisions
          if (this.checkCollision(newX, newY)) {
            this.gameOver();
            return;
          }

          // Store the current positions of all segments
          const positions = this.snake.getChildren().map((segment: any) => ({
            x: segment.x,
            y: segment.y
          }));

          // Move the head
          head.x = newX;
          head.y = newY;

          // Check for food collision
          if (head.x === this.food.x && head.y === this.food.y) {
            this.eatFood();
          }

          // Move the rest of the body
          for (let i = 1; i < positions.length; i++) {
            const segment = this.snake.getChildren()[i] as Phaser.GameObjects.Rectangle;
            segment.x = positions[i - 1].x;
            segment.y = positions[i - 1].y;
          }

          // Update move time
          this.moveTime = this.time.now + this.gameSpeed;
          
          // Increment moves without food and add visual indicator
          this.movesWithoutFood++;
          if (this.movesWithoutFood >= this.maxMovesWithoutFood) {
            this.gameOver();
          } else if (this.movesWithoutFood > this.maxMovesWithoutFood * 0.8) {
            // Visual indicator when getting close to timeout
            head.setFillStyle(0xff6b6b); // Red tint
          } else if (this.movesWithoutFood > this.maxMovesWithoutFood * 0.5) {
            // Warning indicator
            head.setFillStyle(0xffd93d); // Yellow tint
          } else {
            head.setFillStyle(0x00ff00); // Normal color
          }
        }

        private checkCollision(x: number, y: number): boolean {
          // Check wall collision
          if (x < 0 || x >= (this.game.config.width as number) || 
              y < 0 || y >= (this.game.config.height as number)) {
            return true;
          }

          // Check self collision
          return this.snake.getChildren().some((segment: any) => 
            segment.x === x && segment.y === y
          );
        }

        placeFood() {
          const gameWidth = this.game.config.width as number;
          const gameHeight = this.game.config.height as number;
          
          // Get all snake segments positions
          const snakePositions = this.snake.getChildren().map((segment: any) => ({
            x: segment.x,
            y: segment.y
          }));

          let validPosition = false;
          let x: number = 0;
          let y: number = 0;

          // Keep trying until we find a valid position
          while (!validPosition) {
            x = Phaser.Math.RND.between(1, Math.floor(gameWidth / 16) - 1) * 16;
            y = Phaser.Math.RND.between(1, Math.floor(gameHeight / 16) - 1) * 16;

            // Check if position overlaps with any snake segment
            validPosition = !snakePositions.some(pos => pos.x === x && pos.y === y);
          }

          this.food.setPosition(x, y);
        }

        eatFood() {
          this.placeFood();
          this.score += 10;
          this.updateScore();

          // Get the last segment of the snake
          const tail = this.snake.getLast(true) as Phaser.GameObjects.Rectangle;
          if (!tail) return;

          // Add new segment
          const newSegment = this.add.rectangle(tail.x, tail.y, 16, 16, 0x00ff00);
          this.snake.add(newSegment);
        }

        private updateScore() {
          this.scoreText.setText(`Score: ${this.score}`);
          setScore(this.score);
          
          // Update best score if current score is higher
          if (this.score > gameState.bestScore) {
            gameState.bestScore = this.score;
            localStorage.setItem('snake-ai-best-score', this.score.toString());
            setBestScore(this.score);
            this.bestScoreText.setText(`Best Score: ${this.score}`);
          }
        }

        gameOver() {
          setGeneration(g => g + 1);
          // Save agent data after each generation
          localStorage.setItem('snake-ai-data', this.agent.toString());
          this.scene.restart();
        }

        public saveAgent() {
          this.agent.saveToFile();
        }

        public async loadAgent(file: File) {
          await this.agent.loadFromFile(file);
        }
      }

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: '#000000',
        parent: 'game-container',
        scene: SnakeScene
      };

      if (!gameRef.current) {
        game = new Phaser.Game(config);
        gameRef.current = game;
      }
    });

    return () => {
      if (game) {
        game.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  const startTraining = () => {
    setShowStartModal(false);
    gameState.isTraining = true;
    
    if (gameRef.current) {
      const scene = gameRef.current.scene.getScene('SnakeScene');
      if (scene) {
        if (scene.scene.isPaused()) {
          scene.scene.resume();
        }
        scene.scene.restart();
      }
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && gameRef.current) {
      const scene = gameRef.current.scene.getScene('SnakeScene');
      await scene.loadAgent(file);
    }
  };

  return (
    <div className="relative">
      {showStartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg text-white max-w-md">
            <h2 className="text-2xl font-bold mb-4">Snake AI Training</h2>
            <p className="mb-6">
              Welcome to Snake AI! This simulation will train an AI to play Snake using Q-learning.
              The AI will learn through trial and error, improving its strategy over time.
            </p>
            <p className="mb-6">
              <strong>How it works:</strong><br/>
              - Exploration Rate starts at 100% (random moves)<br/>
              - Gradually decreases to 1% (using learned strategies)<br/>
              - Higher exploration = more random moves<br/>
              - Lower exploration = using learned patterns<br/>
              - Best score is saved across sessions
            </p>
            <Button 
              className="w-full"
              onClick={startTraining}
            >
              Start Training
            </Button>
          </div>
        </div>
      )}

      {showHeader && (
        <div className="w-full flex items-center justify-between bg-black bg-opacity-70 text-white px-4 py-2 z-20">
          <div className="flex items-center gap-2">
            <button
              className="text-lg text-gray-300 hover:text-white px-2"
              onClick={() => router.push('/')}
              aria-label="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-sm">Snake AI Training</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-sm">Score: {score}</span>
              <span className="text-sm text-green-400">Best Score: {bestScore}</span>
              <span className="text-sm">Generation: {generation}</span>
              <span className="text-sm" title="Higher exploration = more random moves">
                Exploration: {(explorationRate * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => {
                  const scene = gameRef.current?.scene.getScene('SnakeScene');
                  scene?.saveAgent();
                }}
              >
                Save Agent
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
                id="agent-upload"
              />
              <Button
                size="sm"
                onClick={() => document.getElementById('agent-upload')?.click()}
              >
                Load Agent
              </Button>
            </div>
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
      <div id="game-container" className="w-screen h-screen" />
    </div>
  );
};

export default SnakeAI;