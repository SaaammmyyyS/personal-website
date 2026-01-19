import React, { useRef, useEffect } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const mouse = { x: null, y: null, radius: 150 };

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      const baseDensity = window.innerWidth < 768 ? 20000 : 12000;
      const density = (canvas.width * canvas.height) / baseDensity;

      for (let i = 0; i < density; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 1.5 + 0.5,
          density: (Math.random() * 20) + 2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.x = p.x < 0 ? canvas.width : 0;
        if (p.y < 0 || p.y > canvas.height) p.y = p.y < 0 ? canvas.height : 0;

        if (mouse.x !== null) {
          let dx = mouse.x - p.x;
          let dy = mouse.y - p.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * p.density * 0.5;
            p.y -= (dy / dist) * force * p.density * 0.5;
          }
        }

        ctx.fillStyle = '#22d3ee';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dx = p.x - p2.x;
          let dy = p.y - p2.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const move = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const leave = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseout', leave);
    window.addEventListener('resize', init);
    init(); animate();

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseout', leave);
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-[#020617]"
      onContextMenu={(e) => e.preventDefault()}
    />
  );
};

export default ParticleBackground;