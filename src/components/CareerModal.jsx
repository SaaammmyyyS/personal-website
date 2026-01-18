import React from 'react';
import { motion } from 'framer-motion';
import { X, Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';

const CareerModal = ({ experience, onClose }) => {
  if (!experience) return null;

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
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 p-8 md:p-12 overflow-y-auto max-h-[85vh] shadow-2xl z-[110]"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
        >
          <X size={24}/>
        </button>

        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase">
              <Briefcase size={12} /> Work_History_Log
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-white uppercase">
              {experience.role}
            </h2>
            <div className="text-xl text-slate-400 font-medium">
              at <span className="text-white">{experience.company}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 py-4 border-y border-white/5">
            <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] uppercase">
              <Calendar size={14} className="text-cyan-500/50" /> {experience.period}
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] uppercase">
              <MapPin size={14} className="text-cyan-500/50" /> {experience.location || 'Remote'}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest">Key_Responsibilities</h4>
            <ul className="space-y-4">
              {experience.details ? experience.details.map((detail, idx) => (
                <li key={idx} className="flex gap-4 text-slate-400 text-sm leading-relaxed">
                  <ChevronRight size={16} className="text-cyan-500 shrink-0 mt-0.5" />
                  {detail}
                </li>
              )) : (
                <li className="text-slate-500 italic text-sm">No detailed logs available for this entry.</li>
              )}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CareerModal;