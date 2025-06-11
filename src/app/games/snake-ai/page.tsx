'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

const SnakeAI = () => {
  const gameRef = useRef<any>(null);
  const [showHeader, setShowHeader] = useState(true);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Import Phaser dynamically
    import('phaser').then((Phaser) => {
      class SnakeScene extends Phaser.Scene {
        private snake!: Phaser.GameObjects.Group;
        private food!: Phaser.GameObjects.Rectangle;
        private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
        private direction: string = 'RIGHT';
        private nextDirection: string = 'RIGHT';
        private moveTime: number = 0;
        private score: number = 0;
        private scoreText!: Phaser.GameObjects.Text;

        constructor() {
          super({ key: 'SnakeScene' });
        }

        create() {
          if (!this.input.keyboard) return;
          this.cursors = this.input.keyboard.createCursorKeys();
          
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
        }

        update(time: number) {
          if (time >= this.moveTime) {
            this.moveSnake();
            // Check for food collision after moving
            const head = this.snake.getFirst(true);
            if (head && this.food && 
                head.x === this.food.x && 
                head.y === this.food.y) {
              this.eatFood();
            }
          }
        }

        moveSnake() {
          // Update direction based on input
          if (this.cursors.left.isDown && this.direction !== 'RIGHT') {
            this.nextDirection = 'LEFT';
          } else if (this.cursors.right.isDown && this.direction !== 'LEFT') {
            this.nextDirection = 'RIGHT';
          } else if (this.cursors.up.isDown && this.direction !== 'DOWN') {
            this.nextDirection = 'UP';
          } else if (this.cursors.down.isDown && this.direction !== 'UP') {
            this.nextDirection = 'DOWN';
          }

          this.direction = this.nextDirection;

          // Get the head of the snake
          const head = this.snake.getFirst(true);
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

          // Check for wall collision
          const gameWidth = this.game.config.width as number;
          const gameHeight = this.game.config.height as number;
          
          if (newX < 0 || newX >= gameWidth || newY < 0 || newY >= gameHeight) {
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

          // Move the rest of the body
          for (let i = 1; i < positions.length; i++) {
            const segment = this.snake.getChildren()[i] as Phaser.GameObjects.Rectangle;
            segment.x = positions[i - 1].x;
            segment.y = positions[i - 1].y;
          }

          // Update move time
          this.moveTime = this.time.now + 150;
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
          this.scoreText.setText(`Score: ${this.score}`);

          // Get the last segment of the snake
          const tail = this.snake.getLast(true) as Phaser.GameObjects.Rectangle;
          if (!tail) return;

          // Get the second-to-last segment to determine growth direction
          const segments = this.snake.getChildren();
          const secondToLast = segments[segments.length - 2] as Phaser.GameObjects.Rectangle;
          
          // Calculate the position for the new segment
          let newX = tail.x;
          let newY = tail.y;

          // Add new segment
          const newSegment = this.add.rectangle(newX, newY, 16, 16, 0x00ff00);
          this.snake.add(newSegment);
        }

        gameOver() {
          this.scene.pause();
          const gameWidth = this.game.config.width as number;
          const gameHeight = this.game.config.height as number;
          this.add.text(gameWidth / 2, gameHeight / 2, 'Game Over!', {
            fontSize: '64px',
            color: '#fff'
          }).setOrigin(0.5);
        }
      }

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: '#000000',
        parent: 'game-container',
        scene: SnakeScene,
        physics: {
          default: 'arcade',
          arcade: {
            debug: false
          }
        }
      };

      if (!gameRef.current) {
        gameRef.current = new Phaser.Game(config);
      }

      return () => {
        if (gameRef.current) {
          gameRef.current.destroy(true);
          gameRef.current = null;
        }
      };
    });
  }, []);

  return (
    <div className="">
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
            <span className="text-sm">
              Snake Game
            </span>
          </div>
          <div className="flex items-center gap-2">
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
      <div id="game-container" className="border-4 border-gray-700 rounded-lg w-screen h-screen" />
    </div>
  );
};

export default SnakeAI;