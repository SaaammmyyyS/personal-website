import React from 'react';
import { FileText, Terminal } from 'lucide-react';

const TechnicalHeader = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8 flex justify-between items-center border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="font-bold tracking-tighter text-xl uppercase">Ivan Sam</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="font-mono text-[9px] text-slate-500 uppercase tracking-[0.2em]">System_Online</span>
          </div>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        {['projects', 'history', 'contact'].map((item) => (
          <a
            key={item}
            href={`#${item}`}
            className="font-mono text-[10px] uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-colors"
          >
            // {item}
          </a>
        ))}

        <a
          href="/Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500 hover:text-black transition-all duration-300 font-mono text-[10px] uppercase tracking-widest overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <FileText size={14} className="relative z-10" />
          <span className="relative z-10 font-bold">Fetch_Resume</span>
        </a>
      </nav>

      <div className="md:hidden text-cyan-400">
        <Terminal size={20} />
      </div>
    </header>
  );
};

export default TechnicalHeader;