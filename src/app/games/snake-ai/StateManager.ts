import { SnakeState, Direction, Vision } from './types';
import Phaser from 'phaser';

export class StateManager {
    private gridSize: number = 16;
    private gameWidth: number = 800;  // Default value
    private gameHeight: number = 600; // Default value
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    public initDimensions() {
        this.gameWidth = this.scene.game.config.width as number;
        this.gameHeight = this.scene.game.config.height as number;
    }

    public calculateState(
        snake: Phaser.GameObjects.Group,
        food: Phaser.GameObjects.Rectangle,
        currentDirection: Direction
    ): SnakeState {
        const head = snake.getFirst(true) as Phaser.GameObjects.Rectangle;
        const segments = snake.getChildren() as Phaser.GameObjects.Rectangle[];

        return {
            direction: this.getDirectionState(currentDirection),
            food: this.calculateFoodDistance(head, food),
            danger: this.calculateDanger(head, segments, currentDirection),
            vision: this.calculateVision(head, segments)
        };
    }

    private getDirectionState(currentDirection: Direction): Record<Direction, boolean> {
        return {
            UP: currentDirection === "UP",
            DOWN: currentDirection === "DOWN",
            LEFT: currentDirection === "LEFT",
            RIGHT: currentDirection === "RIGHT"
        };
    }

    private calculateFoodDistance(
        head: Phaser.GameObjects.Rectangle,
        food: Phaser.GameObjects.Rectangle
    ) {
        return {
            xDistance: (food.x - head.x) / this.gameWidth,
            yDistance: (food.y - head.y) / this.gameHeight
        };
    }

    private calculateDanger(
        head: Phaser.GameObjects.Rectangle,
        segments: Phaser.GameObjects.Rectangle[],
        currentDirection: Direction
    ) {
        const checkPosition = (x: number, y: number): boolean => {
            // Check wall collision
            if (x < 0 || x >= this.gameWidth || y < 0 || y >= this.gameHeight) {
                return true;
            }
            // Check self collision
            return segments.some(segment => 
                segment !== head && 
                segment.x === x && 
                segment.y === y
            );
        };

        const straight = (): boolean => {
            switch (currentDirection) {
                case "UP": return checkPosition(head.x, head.y - this.gridSize);
                case "DOWN": return checkPosition(head.x, head.y + this.gridSize);
                case "LEFT": return checkPosition(head.x - this.gridSize, head.y);
                case "RIGHT": return checkPosition(head.x + this.gridSize, head.y);
            }
        };

        const left = (): boolean => {
            switch (currentDirection) {
                case "UP": return checkPosition(head.x - this.gridSize, head.y);
                case "DOWN": return checkPosition(head.x + this.gridSize, head.y);
                case "LEFT": return checkPosition(head.x, head.y + this.gridSize);
                case "RIGHT": return checkPosition(head.x, head.y - this.gridSize);
            }
        };

        const right = (): boolean => {
            switch (currentDirection) {
                case "UP": return checkPosition(head.x + this.gridSize, head.y);
                case "DOWN": return checkPosition(head.x - this.gridSize, head.y);
                case "LEFT": return checkPosition(head.x, head.y - this.gridSize);
                case "RIGHT": return checkPosition(head.x, head.y + this.gridSize);
            }
        };

        return {
            straight: straight(),
            left: left(),
            right: right()
        };
    }

    private calculateVision(
        head: Phaser.GameObjects.Rectangle,
        segments: Phaser.GameObjects.Rectangle[]
    ) {
        const directions = {
            N: { dx: 0, dy: -1 },
            NE: { dx: 1, dy: -1 },
            E: { dx: 1, dy: 0 },
            SE: { dx: 1, dy: 1 },
            S: { dx: 0, dy: 1 },
            SW: { dx: -1, dy: 1 },
            W: { dx: -1, dy: 0 },
            NW: { dx: -1, dy: -1 }
        };

        const vision: Record<string, Vision> = {};

        for (const [dir, { dx, dy }] of Object.entries(directions)) {
            let wallDist = 1;
            let bodyDist = 1;
            let foundBody = false;

            // Look up to 8 cells in each direction
            for (let i = 1; i <= 8; i++) {
                const x = head.x + dx * i * this.gridSize;
                const y = head.y + dy * i * this.gridSize;

                // Check wall distance
                if (x < 0 || x >= this.gameWidth || y < 0 || y >= this.gameHeight) {
                    wallDist = i / 8;
                    break;
                }

                // Check body distance
                if (!foundBody && segments.some(segment => 
                    segment !== head && 
                    segment.x === x && 
                    segment.y === y
                )) {
                    bodyDist = i / 8;
                    foundBody = true;
                }
            }

            vision[dir] = {
                wall: wallDist,
                body: foundBody ? bodyDist : 1
            };
        }

        return vision as SnakeState['vision'];
    }
} 