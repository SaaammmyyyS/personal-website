import React from 'react';
import { motion } from 'framer-motion';
import { X, Cpu, Zap, CheckCircle2, Github, ExternalLink, Lock } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/95 backdrop-blur-xl cursor-zoom-out"
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 p-6 md:p-12 overflow-y-auto max-h-[90vh] shadow-[0_0_50px_rgba(0,0,0,0.5)] z-[110]"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-50"
        >
          <X size={24}/>
        </button>

        <div className="font-mono text-cyan-400 text-[10px] tracking-[0.3em] mb-4 uppercase">
          Project_Deep_Dive // {project.id}
        </div>

        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6 uppercase">
          {project.title}
        </h2>

        {project.detailedDescription ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10">
            <div className="md:col-span-2 space-y-10">
              <p className="text-orange-500 font-mono text-xs tracking-widest uppercase italic">
                {project.detailedDescription.headline}
              </p>

              <div>
                <h4 className="text-white text-sm font-bold mb-4 flex items-center gap-2 uppercase tracking-tight">
                  <Cpu size={16} className="text-cyan-400"/> Architectural_Overview
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {project.detailedDescription.overview}
                </p>
              </div>

              <div>
                <h4 className="text-white text-sm font-bold mb-4 flex items-center gap-2 uppercase tracking-tight">
                  <Zap size={16} className="text-cyan-400"/> Key_Innovations
                </h4>
                <ul className="space-y-4">
                  {project.detailedDescription.innovation.map((item, idx) => (
                    <li key={idx} className="text-slate-400 text-xs flex gap-3">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-8 border-l border-white/5 pl-8">
              <div>
                <h4 className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mb-4">Tech_Stack</h4>
                <p className="text-white font-mono text-[10px] leading-loose">{project.detailedDescription.stack}</p>
              </div>

              <div className="flex flex-col gap-3">
                {project.github && !project.isPrivate ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 border border-white/10 hover:bg-white/5 transition-all text-[10px] font-mono uppercase text-slate-300"
                  >
                    Source_Code <Github size={14}/>
                  </a>
                ) : project.isPrivate && (
                  /* Shows 'RESTRICTED' state if repo is private */
                  <div className="flex items-center justify-between p-3 border border-white/5 bg-white/[0.02] text-[10px] font-mono uppercase text-slate-600 cursor-not-allowed">
                    Source_Code [PRIVATE] <Lock size={12}/>
                  </div>
                )}

                {project.link && project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 bg-cyan-500 text-black hover:bg-cyan-400 transition-all text-[10px] font-mono font-bold uppercase"
                  >
                    Live_Demo <ExternalLink size={14}/>
                  </a>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-12 py-20 border-t border-white/5 text-center">
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">
              Detailed documentation is currently restricted for this project.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectModal;