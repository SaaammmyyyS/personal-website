import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, MapPin } from 'lucide-react';
import { DATA } from '../constants/data';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-20 border-t border-white/5 bg-[#050505]/95 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Identity */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <h2 className="font-bold tracking-tighter text-lg uppercase text-white">Ivan Sam</h2>
              <div className="flex items-center gap-2 mt-1">
                {/* Active Node Indicator */}
                <div className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </div>
                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-[0.2em]">
                  Node_Location: PHL_Region // UTC+8
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-sm font-light">
              {DATA.profile.bio.tagline} Currently focused on architecting resilient backends and high-throughput cloud infrastructure.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="font-mono text-[10px] text-cyan-500 uppercase tracking-[0.3em] font-bold">
              Index
            </h3>
            <ul className="space-y-3 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
              <li>
                <a href="#projects" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                  <ExternalLink size={10} className="opacity-50 group-hover:opacity-100" /> Projects
                </a>
              </li>
              <li>
                <a href="#specs" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                  <ExternalLink size={10} className="opacity-50 group-hover:opacity-100" /> Tech_Stack
                </a>
              </li>
              <li>
                <a href="#career" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                  <ExternalLink size={10} className="opacity-50 group-hover:opacity-100" /> Experience
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                  <ExternalLink size={10} className="opacity-50 group-hover:opacity-100" /> Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Uplink */}
          <div className="md:col-span-4 md:text-right space-y-6">
            <h3 className="font-mono text-[10px] text-cyan-500 uppercase tracking-[0.3em] font-bold">
              Social_Uplink
            </h3>
            <div className="flex md:justify-end gap-6">
              <a href="https://github.com/SaaammmyyyS" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-all transform hover:-translate-y-1">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/ivan-sam-wabina-875a91297/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-all transform hover:-translate-y-1">
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${DATA.profile.email}`} className="text-slate-400 hover:text-orange-500 transition-all transform hover:-translate-y-1">
                <Mail size={20} />
              </a>
            </div>
            <div className="pt-4 space-y-1">
               <p className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.2em]">
                &copy; {currentYear} // Developed by Ivan_Sam
              </p>
              <p className="text-[8px] font-mono text-slate-800 uppercase tracking-[0.1em] italic">
                All_Systems_Nominal // Stable_Release_v2.0
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
    </footer>
  );
};

export default Footer;