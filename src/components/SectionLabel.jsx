import React from 'react';

const SectionLabel = ({ number, text }) => {
  return (
    <div className="flex flex-col mb-10 md:mb-20 select-none">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-[10px] md:text-xs text-cyan-500 tracking-[0.4em] uppercase font-bold">
          {number}
        </span>
        <div className="h-[1px] w-8 bg-cyan-500/30 hidden md:block" />
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.9] md:leading-none transition-all duration-300">
        {text}
      </h2>

      <div className="mt-4 h-[2px] w-12 bg-gradient-to-r from-cyan-500 to-transparent opacity-50 md:hidden" />
    </div>
  );
};

export default SectionLabel;