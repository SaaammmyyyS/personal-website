import React, { useRef, useEffect } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const lastWidth = useRef(window.innerWidth);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let particles = [];
    const mouse = { x: null, y: null, radius: 100 };

    const init = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      const widthChanged = newWidth !== lastWidth.current;

      canvas.width = newWidth;
      canvas.height = newHeight;
      lastWidth.current = newWidth;

      if (!widthChanged && particles.length > 0) return;

      particles = [];
      const isMobile = newWidth < 768;

      const baseDensity = isMobile ? 20000 : 12000;
      const density = Math.min((canvas.width * canvas.height) / baseDensity, 150);

      for (let i = 0; i < density; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 1.2 + 0.5,
          density: (Math.random() * 20) + 2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particleColor = '#22d3ee';
      const connectionDistance = 100;

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        if (mouse.x !== null) {
          let dx = mouse.x - p.x;
          let dy = mouse.y - p.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 3;
            p.y -= (dy / dist) * force * 3;
          }
        }

        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dx = p.x - p2.x;
          let dy = p.y - p2.y;
          let distSq = dx * dx + dy * dy;

          if (distSq < connectionDistance * connectionDistance) {
            let opacity = 1 - (Math.sqrt(distSq) / connectionDistance);
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const move = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const touchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };
    const leave = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener('mousemove', move);
    window.addEventListener('touchstart', touchMove, { passive: true });
    window.addEventListener('touchend', leave);
    window.addEventListener('resize', init);

    init();
    animate();

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchstart', touchMove);
      window.removeEventListener('touchend', leave);
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default ParticleBackground;