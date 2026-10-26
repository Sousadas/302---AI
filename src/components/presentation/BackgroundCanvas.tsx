import React, { useEffect, useRef } from 'react';

interface BackgroundCanvasProps {
  enabled: boolean;
  theme: 'dark' | 'light' | 'contrast';
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  layer: number;
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ enabled, theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color definitions based on theme
    const isLight = theme === 'light';
    const isContrast = theme === 'contrast';

    const nodeColor = isLight ? 'rgba(79, 70, 229, ' : isContrast ? 'rgba(56, 189, 248, ' : 'rgba(34, 211, 238, ';
    const lineColor = isLight ? 'rgba(99, 102, 241, ' : isContrast ? 'rgba(129, 140, 248, ' : 'rgba(99, 102, 241, ';
    const pulseColor = isLight ? 'rgba(124, 58, 237, ' : 'rgba(167, 139, 250, ';

    // Generate balanced neural node constellation
    const nodeCount = Math.min(Math.floor((width * height) / 36000), 45);
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.5,
        baseAlpha: Math.random() * 0.4 + 0.2,
        layer: Math.floor(Math.random() * 3)
      });
    }

    let pulseTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      pulseTime += 0.015;

      // Draw subtle connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 150;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `${lineColor}${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();

            // Periodic signal pulse moving along connections
            if (enabled && Math.sin(pulseTime + i) > 0.97) {
              const pulsePos = (Math.sin(pulseTime * 2 + j) + 1) / 2;
              const px = nodes[i].x + (nodes[j].x - nodes[i].x) * pulsePos;
              const py = nodes[i].y + (nodes[j].y - nodes[i].y) * pulsePos;
              ctx.beginPath();
              ctx.arc(px, py, 2, 0, Math.PI * 2);
              ctx.fillStyle = `${pulseColor}0.85)`;
              ctx.shadowColor = '#22D3EE';
              ctx.shadowBlur = 8;
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (enabled) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${nodeColor}${node.baseAlpha})`;
        ctx.fill();
      }

      if (enabled) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [enabled, theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
