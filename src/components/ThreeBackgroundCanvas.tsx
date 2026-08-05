import React, { useEffect, useRef } from 'react';

export const ThreeBackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particles array
    const sparkles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;
    }> = [];

    const petals: Array<{
      x: number;
      y: number;
      size: number;
      angle: number;
      spin: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
    }> = [];

    const petalColors = ['rgba(245, 222, 179, 0.4)', 'rgba(232, 216, 196, 0.4)', 'rgba(212, 175, 55, 0.35)', 'rgba(232, 180, 184, 0.3)'];

    // Initialize sparkles
    for (let i = 0; i < 40; i++) {
      sparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.7 + 0.2,
        fadeSpeed: Math.random() * 0.008 + 0.002,
      });
    }

    // Initialize petals
    for (let i = 0; i < 15; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02,
        speedY: Math.random() * 0.5 + 0.2,
        speedX: Math.sin(Math.random() * Math.PI * 2) * 0.4,
        opacity: Math.random() * 0.5 + 0.2,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Radial mouse highlight glow
      const radialGradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 350);
      radialGradient.addColorStop(0, 'rgba(212, 175, 55, 0.06)');
      radialGradient.addColorStop(1, 'rgba(255, 248, 240, 0)');
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw and update sparkles
      sparkles.forEach((s) => {
        s.y += s.speedY;
        s.x += s.speedX;
        s.opacity += s.fadeSpeed;
        if (s.opacity > 0.8 || s.opacity < 0.1) {
          s.fadeSpeed = -s.fadeSpeed;
        }

        if (s.y < 0) {
          s.y = height;
          s.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${s.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#D4AF37';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw and update petals
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.8;
        p.angle += p.spin;

        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60 dark:opacity-40"
    />
  );
};
