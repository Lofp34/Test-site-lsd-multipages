'use client';

import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  density?: number;
  speed?: number;
  color?: string;
  opacity?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  density = 50,
  speed = 0.5,
  color = '#00BDA4',
  opacity = 0.6,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isVisible = true;
    let lastTime = 0;
    const targetFPS = 30; // Limit to 30 FPS for better performance
    const frameInterval = 1000 / targetFPS;

    // Performance optimization: Use Intersection Observer to pause when not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationRef.current) {
          animate(performance.now());
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    // Set canvas size with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const resizeCanvas = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio, 2); // Limit DPR for performance
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        initParticles();
      }, 100);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Initialize particles with reduced density on mobile
    const initParticles = () => {
      particlesRef.current = [];
      const rect = canvas.getBoundingClientRect();
      const isMobile = window.innerWidth < 768;
      const adjustedDensity = isMobile ? Math.floor(density * 0.5) : density;
      
      for (let i = 0; i < adjustedDensity; i++) {
        particlesRef.current.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * opacity,
          life: Math.random() * 100,
          maxLife: 100 + Math.random() * 100
        });
      }
    };

    initParticles();

    // Optimized animation loop with FPS limiting
    const animate = (currentTime: number) => {
      if (!isVisible) return;

      const deltaTime = currentTime - lastTime;
      
      if (deltaTime >= frameInterval) {
        const rect = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);

        // Batch operations for better performance
        ctx.save();
        
        // Update and draw particles
        particlesRef.current.forEach((particle, index) => {
          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.life += 1;

          // Wrap around edges
          if (particle.x < 0) particle.x = rect.width;
          if (particle.x > rect.width) particle.x = 0;
          if (particle.y < 0) particle.y = rect.height;
          if (particle.y > rect.height) particle.y = 0;

          // Reset particle if life exceeded
          if (particle.life > particle.maxLife) {
            particle.life = 0;
            particle.x = Math.random() * rect.width;
            particle.y = Math.random() * rect.height;
            particle.opacity = Math.random() * opacity;
          }

          // Draw particle
          const alpha = particle.opacity * (1 - particle.life / particle.maxLife);
          if (alpha > 0.01) { // Skip nearly invisible particles
            ctx.fillStyle = `${color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();

            // Draw connections to nearby particles (optimized)
            for (let j = index + 1; j < particlesRef.current.length; j++) {
              const otherParticle = particlesRef.current[j];
              const dx = particle.x - otherParticle.x;
              const dy = particle.y - otherParticle.y;
              const distanceSquared = dx * dx + dy * dy; // Avoid sqrt for performance

              if (distanceSquared < 10000) { // 100^2
                const distance = Math.sqrt(distanceSquared);
                const connectionAlpha = (1 - distance / 100) * alpha * 0.3;
                if (connectionAlpha > 0.01) {
                  ctx.strokeStyle = `${color}${Math.floor(connectionAlpha * 255).toString(16).padStart(2, '0')}`;
                  ctx.lineWidth = 0.5;
                  ctx.beginPath();
                  ctx.moveTo(particle.x, particle.y);
                  ctx.lineTo(otherParticle.x, otherParticle.y);
                  ctx.stroke();
                }
              }
            }
          }
        });

        ctx.restore();
        lastTime = currentTime;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate(performance.now());

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      clearTimeout(resizeTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [density, speed, color, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    />
  );
};

export default ParticleBackground;