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
        pointerEvents: 'none', // Crucial: Clicks pass through to the projects
        backgroundColor: '#050505'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          background: 'radial-gradient(circle at 50% 50%, #111827 0%, #050505 100%)',
          pointerEvents: 'none'
        }}
      />
      <ParticleBackground />
    </div>
  );
};

export default BackgroundSystem;