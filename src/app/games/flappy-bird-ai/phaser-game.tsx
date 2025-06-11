'use client';

import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const FlappyBirdGame = () => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameRef.current) {
      return;
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
        create,
        update,
      },
    };

    const game = new Phaser.Game(gameConfig);

    function preload(this: Phaser.Scene) {
      this.load.image('background', 'https://raw.githubusercontent.com/samuelcust/flappy-bird-assets/master/sprites/background-day.png');
      this.load.image('pipe', 'https://raw.githubusercontent.com/samuelcust/flappy-bird-assets/master/sprites/pipe-green.png');
      this.load.image('ground', 'https://raw.githubusercontent.com/samuelcust/flappy-bird-assets/master/sprites/base.png');
      this.load.spritesheet('bird', 'https://raw.githubusercontent.com/samuelcust/flappy-bird-assets/master/sprites/yellowbird-midflap.png', { frameWidth: 34, frameHeight: 24 });
    }

    let bird: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    let pipes: Phaser.Physics.Arcade.Group;
    let ground: Phaser.GameObjects.TileSprite;
    let background: Phaser.GameObjects.Image;
    let score = 0;
    let scoreText: Phaser.GameObjects.Text;
    let gameOverText: Phaser.GameObjects.Text;
    let restartText: Phaser.GameObjects.Text;
    let gameOver = false;
    let groundSpeed = 2;

    function create(this: Phaser.Scene) {
      const { width, height } = this.cameras.main;
      
      background = this.add.image(width / 2, height / 2, 'background');
      background.setDisplaySize(width, height);

      pipes = this.physics.add.group();

      const groundHeight = 112; // Height of the ground asset
      ground = this.add.tileSprite(0, height, width, groundHeight, 'ground').setOrigin(0, 1);
      this.physics.add.existing(ground, true); // Add to physics as a static body
      
      const groundBody = ground.body as Phaser.Physics.Arcade.Body;
      groundBody.allowGravity = false;

      bird = this.physics.add.sprite(width / 2, height / 2, 'bird');
      bird.setCollideWorldBounds(true);

      this.physics.add.collider(bird, ground, () => {
        if (!gameOver) {
          endGame.call(this);
        }
      });

      this.physics.add.collider(bird, pipes, () => {
         if (!gameOver) {
          endGame.call(this);
        }
      });

      this.input.on('pointerdown', () => {
        if (gameOver) {
          restartGame.call(this);
        } else {
            bird.setVelocityY(-350);
        }
      });
      
      this.input.keyboard?.on('keydown-SPACE', () => {
        if (gameOver) {
          restartGame.call(this);
        } else {
            bird.setVelocityY(-350);
        }
      });

      scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', color: '#FFF', stroke: '#000', strokeThickness: 4 });
      gameOverText = this.add.text(width / 2, height / 2, 'Game Over', { fontSize: '48px', color: '#FF0000', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5).setVisible(false);
      restartText = this.add.text(width / 2, height / 2 + 50, 'Click to Restart', { fontSize: '24px', color: '#FF0000', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5).setVisible(false);

      this.time.addEvent({
        delay: 1500,
        callback: addPipeRow,
        callbackScope: this,
        loop: true,
      });

      this.scale.on('resize', (gameSize: Phaser.Structs.Size) => {
        const { width, height } = gameSize;
        this.cameras.main.setBounds(0, 0, width, height);
        background.setDisplaySize(width, height);
        background.setPosition(width / 2, height / 2);
        ground.width = width;
        ground.y = height;
        scoreText.setPosition(16, 16);
        gameOverText.setPosition(width / 2, height / 2);
        restartText.setPosition(width / 2, height / 2 + 50);
      });
    }

    function addPipeRow(this: Phaser.Scene) {
      if (gameOver) return;
      
      const { width, height } = this.cameras.main;
      const pipeX = width;
      const gap = 150;
      const minPipeHeight = 50;
      const maxPipeHeight = height - 2 * gap - 112; // 112 is ground height
      const topPipeHeight = Phaser.Math.Between(minPipeHeight, maxPipeHeight);
      const bottomPipeY = topPipeHeight + gap;
      const bottomPipeHeight = height - bottomPipeY - 112;

      // Top pipe
      const upperPipe = pipes.create(pipeX, topPipeHeight, 'pipe').setOrigin(0.5, 1);
      upperPipe.setFlipY(true);
      upperPipe.displayHeight = topPipeHeight;
      upperPipe.displayWidth = 52;
      const upperPipeBody = upperPipe.body as Phaser.Physics.Arcade.Body;
      upperPipeBody.allowGravity = false;
      upperPipeBody.velocity.x = -200;
      upperPipe.setImmovable(true);
      upperPipe.setData('scored', false);

      // Bottom pipe
      const lowerPipe = pipes.create(pipeX, bottomPipeY, 'pipe').setOrigin(0.5, 0);
      lowerPipe.displayHeight = bottomPipeHeight;
      lowerPipe.displayWidth = 52;
      const lowerPipeBody = lowerPipe.body as Phaser.Physics.Arcade.Body;
      lowerPipeBody.allowGravity = false;
      lowerPipeBody.velocity.x = -200;
      lowerPipe.setImmovable(true);
    }
    
    function endGame(this: Phaser.Scene) {
        gameOver = true;
        this.physics.pause();
        gameOverText.setVisible(true);
        restartText.setVisible(true);
    }
    
    function restartGame(this: Phaser.Scene) {
        this.scene.restart();
        score = 0;
        gameOver = false;
    }

    function update(this: Phaser.Scene) {
        if (gameOver) {
            if(bird.angle < 90) bird.angle += 1;
            return;
        }

        if (bird.angle < 20) {
            bird.angle += 1;
        }
        
        if (bird.body.velocity.y < 0) {
            bird.setAngle(-20);
        }

        Phaser.Actions.Call(pipes.getChildren(), (pipe) => {
            const p = pipe as Phaser.Physics.Arcade.Sprite;
            if (p.x < -p.width) {
              p.destroy();
            }
            // We only check the upper pipe for scoring
            if (p.originY === 1 && p.x < bird.x && !p.getData('scored')) {
                score++;
                scoreText.setText('Score: ' + score);
                p.setData('scored', true);
            }
        }, this);

        ground.tilePositionX += groundSpeed;
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div ref={gameRef} className="w-screen h-screen" />
    );
};

export default FlappyBirdGame; 