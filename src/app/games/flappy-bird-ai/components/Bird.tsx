import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const Bird = ({ body, size }: { body: Matter.Body; size: [number, number] }) => {
  const birdRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const bird = birdRef.current;
    if (!bird) return;

    const updateBird = () => {
      const { x, y } = body.position;
      bird.style.transform = `translate(${x - size[0] / 2}px, ${y - size[1] / 2}px) rotate(${body.angle}rad)`;
    };

    Matter.Events.on(body, 'afterUpdate', updateBird);
    return () => {
      Matter.Events.off(body, 'afterUpdate', updateBird);
    };
  }, [body, size]);

  return (
    <img
      ref={birdRef}
      src="https://raw.githubusercontent.com/samuelcust/flappy-bird-assets/master/sprites/yellowbird-midflap.png"
      alt="bird"
      style={{
        position: 'absolute',
        width: size[0],
        height: size[1],
        transform: `translate(${body.position.x - size[0] / 2}px, ${body.position.y - size[1] / 2}px)`,
      }}
    />
  );
};

export default Bird; 