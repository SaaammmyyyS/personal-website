import React from 'react';

const SectionLabel = ({ number, text }) => (
  <div className="flex flex-col mb-8 md:mb-12">
    <span className="font-mono text-[10px] text-cyan-500 mb-2 tracking-[0.3em] uppercase">
      {number}
    </span>
    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-white">
      {text}
    </h2>
  </div>
);

export default SectionLabel;