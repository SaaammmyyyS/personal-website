import React from 'react';
import ParticleBackground from './ParticleBackground';

const BackgroundSystem = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        backgroundColor: '#050505'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.6,
          background: 'radial-gradient(circle at 50% 50%, #0f172a 0%, #050505 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <ParticleBackground />
      </div>
    </div>
  );
};

export default BackgroundSystem;