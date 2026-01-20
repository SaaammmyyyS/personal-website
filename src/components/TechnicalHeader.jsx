import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Terminal, X, ChevronRight } from 'lucide-react';

const TechnicalHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'projects', href: '#projects' },
    { name: 'tech stack', href: '#specs' },
    { name: 'history', href: '#career' },
    { name: 'contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full py-4 px-6 md:px-12 flex justify-between items-center border-b border-white/5 bg-[#050505]/95 backdrop-blur-xl z-[100]">
      <Link to="/" className="flex flex-col cursor-pointer group">
        <span className="font-bold tracking-tighter text-base md:text-lg uppercase text-white group-hover:text-cyan-400 transition-colors">Ivan Sam</span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="font-mono text-[7px] md:text-[8px] text-slate-500 uppercase tracking-[0.2em]">System_Online</span>
        </div>
      </Link>

      <nav className="hidden md:flex items-center gap-10">
        {navLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="font-mono text-[10px] uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-colors"
          >
            {item.name}
          </a>
        ))}

        <a
          href="/Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500 hover:text-black transition-all duration-300 font-mono text-[10px] font-bold uppercase tracking-widest"
        >
          <FileText size={14} />
          <span>Fetch_Resume</span>
        </a>
      </nav>

      <button
        type="button"
        className="md:hidden relative z-[110] text-cyan-400 p-2 hover:bg-white/5 rounded-lg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Terminal size={24} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#050505] z-[105] p-8 md:hidden flex flex-col justify-center animate-in fade-in zoom-in duration-200">
          <nav className="flex flex-col gap-6">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between text-2xl font-bold uppercase tracking-tighter text-white border-b border-white/5 pb-4"
              >
                {item.name}
                <ChevronRight size={20} className="text-cyan-500" />
              </a>
            ))}
            <a
              href="/Resume.pdf"
              target="_blank"
              onClick={() => setIsOpen(false)}
              className="mt-4 flex items-center justify-center gap-3 w-full py-6 bg-cyan-500 text-black font-mono text-sm font-black uppercase tracking-widest rounded-sm"
            >
              <FileText size={18} />
              <span>Download_Resume</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default TechnicalHeader;