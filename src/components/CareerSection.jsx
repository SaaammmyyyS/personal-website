import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowUpRight } from 'lucide-react';

const CareerSection = ({ careerData, onSelect }) => {
  return (
    <div className="mt-12 grid grid-cols-1 gap-4 md:gap-6">
      {careerData.map((exp) => (
        <motion.div
          key={exp.id}
          layoutId={exp.id}
          onClick={() => onSelect(exp)}
          className="group cursor-pointer border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] p-6 md:p-8 transition-colors relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="flex justify-between items-start gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-2 font-mono text-[9px] text-cyan-500/50 uppercase tracking-widest">
                <Briefcase size={12} /> {exp.period}
              </div>
              <h3 className="text-xl md:text-3xl font-bold uppercase tracking-tighter text-white">
                {exp.role} <span className="text-slate-700">@</span> {exp.company}
              </h3>
              <p className="text-slate-400 text-sm md:text-lg leading-relaxed mt-4 line-clamp-2">
                {exp.shortDesc}
              </p>
            </div>
            <ArrowUpRight className="text-slate-800 group-hover:text-cyan-400 transition-all shrink-0" size={24} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CareerSection;