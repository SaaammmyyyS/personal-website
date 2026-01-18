import React from 'react';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { DATA } from '../constants/data';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-white/5 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          <div className="md:col-span-5 space-y-4">
            <h3 className="font-mono text-[10px] text-cyan-500 uppercase tracking-[0.2em]">About_Me</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {DATA.profile.bio.tagline} Focused on resilient systems and scalable cloud infrastructure.
            </p>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h3 className="font-mono text-[10px] text-cyan-500 uppercase tracking-[0.2em]">Quick_Navigation</h3>
            <ul className="space-y-2 font-mono text-[11px] text-slate-500 uppercase">
              <li><a href="#projects" className="hover:text-white transition-colors flex items-center gap-2"><ExternalLink size={10} /> Operations</a></li>
              <li><a href="#specs" className="hover:text-white transition-colors flex items-center gap-2"><ExternalLink size={10} /> Stack</a></li>
              <li><a href="#history" className="hover:text-white transition-colors flex items-center gap-2"><ExternalLink size={10} /> History</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors flex items-center gap-2"><ExternalLink size={10} /> Connect</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 md:text-right space-y-4">
            <h3 className="font-mono text-[10px] text-cyan-500 uppercase tracking-[0.2em]">Build_Stack</h3>
            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">
              React + Tailwind CSS <br />
              Framer Motion + Lucide Icons
            </p>
            <div className="flex md:justify-end gap-5 pt-2">
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github size={18} /></a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors"><Linkedin size={18} /></a>
              <a href={`mailto:${DATA.profile.email}`} className="text-slate-500 hover:text-orange-500 transition-colors"><Mail size={18} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;