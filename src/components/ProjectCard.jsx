import React from 'react';
import { ExternalLink, Github, Lock } from 'lucide-react';

const ProjectCard = ({ title, subtitle, tags, link, github, isPrivate }) => {
  return (
    <div className="group relative space-y-6">
      <div className="flex justify-between items-start">
        <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        <div className="flex gap-4 relative z-30 pointer-events-auto">
          {github && (
            <a href={github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
              <Github size={18} />
            </a>
          )}
          {!isPrivate ? (
            <a href={link} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors" onClick={(e) => e.stopPropagation()}>
              <ExternalLink size={18} />
            </a>
          ) : <Lock size={18} className="text-slate-800" />}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="text-[10px] font-mono text-cyan-500 border border-cyan-500/20 px-2 py-0.5 uppercase tracking-widest bg-cyan-500/5">
            {tag}
          </span>
        ))}
      </div>

      <p className="text-slate-400 text-base leading-relaxed line-clamp-3 group-hover:text-slate-300 transition-colors">
        {subtitle}
      </p>

      <div className="h-px w-full bg-gradient-to-r from-cyan-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
    </div>
  );
};

export default ProjectCard;