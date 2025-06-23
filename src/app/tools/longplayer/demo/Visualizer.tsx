'use client';

import React, { useEffect, useRef } from 'react';

interface VisualizerProps {
  started: boolean;
  progresses: number[];
  loopDurations: number[];
  bufferDurations: number[];
  audioData: Float32Array;
}

export function LongplayerVisualizer({ progresses, loopDurations, bufferDurations, started, audioData }: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const dpr = window.devicePixelRatio || 1;
    const width = 500;
    const height = 500;

    // Set up canvas for high DPI displays
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.scale(dpr, dpr);

    const draw = () => {
      // Clear canvas
      context.clearRect(0, 0, width, height);

      // Move to center
      context.save();
      context.translate(width / 2, height / 2);

      // Draw each circle
      loopDurations.forEach((duration, i) => {
        const radius = (i + 1) * (width / 16);
        
        // Draw circle
        context.beginPath();
        context.strokeStyle = 'rgba(0, 0, 0, 0.6)';
        context.lineWidth = 2;
        context.arc(0, 0, radius, 0, Math.PI * 2);
        context.stroke();

        if (bufferDurations[i]) {
          // Draw sample duration arc
          const arcAngle = (bufferDurations[i] / duration) * Math.PI * 2;
          const currentAngle = started ? progresses[i] * Math.PI * 2 : -Math.PI / 2; // Start at top when not playing
          
          context.beginPath();
          context.strokeStyle = 'rgb(255, 196, 83)';
          context.lineWidth = 12;
          const startArc = currentAngle - arcAngle / 2 - Math.PI / 2;
          context.arc(0, 0, radius, startArc, startArc + arcAngle);
          context.stroke();

          // Draw playhead
          if (started) {
            context.beginPath();
            context.fillStyle = 'black';
            const x = radius * Math.cos(currentAngle);
            const y = radius * Math.sin(currentAngle);
            context.arc(x, y, 6, 0, Math.PI * 2);
            context.fill();
          }
        }
      });

      context.restore();

      // Draw audio waveform at the bottom
      if (audioData.length > 0) {
        const waveformHeight = 60;
        const bottomPadding = 20;
        
        context.save();
        context.strokeStyle = 'rgba(0, 0, 0, 0.4)';
        context.lineWidth = 2;
        context.beginPath();
        
        // Draw the waveform
        const sliceWidth = width / audioData.length;
        let x = 0;
        
        context.moveTo(x, height - bottomPadding - waveformHeight/2);
        for (let i = 0; i < audioData.length; i++) {
          const y = (audioData[i] * waveformHeight/2) + height - bottomPadding - waveformHeight/2;
          if (i === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
          x += sliceWidth;
        }
        
        context.stroke();
        context.restore();
      }

      // Request next frame only if started
      if (started) {
        frameRef.current = requestAnimationFrame(draw);
      }
    };

    // Initial draw
    draw();

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [progresses, loopDurations, bufferDurations, started, audioData]);

  return (
    <canvas
      ref={canvasRef}
      className="bg-white rounded-lg  mx-auto"
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
} 