import React from 'react';
import { Cloud, Database, ShieldCheck, Terminal, Info } from 'lucide-react';
import SectionLabel from './SectionLabel';
import { DATA } from '../constants/data';

const iconMap = {
  cloud: Cloud,
  database: Database,
  shield: ShieldCheck,
  terminal: Terminal
};

const TechGroup = ({ title, iconName, iconColor, tags }) => {
  const Icon = iconMap[iconName] || Terminal;
  return (
    <div className="space-y-4 p-6 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group">
      <div className={`flex items-center gap-3 font-mono text-[10px] ${iconColor} tracking-widest uppercase mb-2`}>
        <Icon size={16} className="group-hover:scale-110 transition-transform" /> {title}
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tech) => (
          <span key={tech} className="px-2 py-1 border border-white/10 bg-black/20 text-[9px] font-mono text-slate-400 uppercase group-hover:border-white/30 transition-colors">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

const TechnicalSpecs = () => {
  return (
    <section id="specs" className="py-24 md:py-32 border-t border-white/5">
      <SectionLabel number="02 /" text="Cloud Infrastructure" />

      <div className="mb-12 max-w-2xl">
        <p className="text-slate-400 text-sm leading-relaxed">
          Specializing in the design and deployment of highly available backend environments.
          I leverage AWS managed services to build systems that are both resilient to failure and cost-optimized.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {DATA.cloudExpertise.map((group, index) => (
          <TechGroup
            key={index}
            title={group.title}
            iconName={group.icon}
            iconColor={group.color}
            tags={group.tags}
          />
        ))}
      </div>

      {DATA.learningLog && (
        <div className="mt-12 p-6 border border-cyan-500/20 bg-cyan-500/[0.02] flex items-start gap-4">
          <div className="p-2 bg-cyan-500/10 rounded-sm">
            <Info size={16} className="text-cyan-400" />
          </div>
          <div className="space-y-1">
            <span className="text-cyan-400 font-mono text-[10px] tracking-widest uppercase font-bold">
              Current Focus
            </span>
            <p className="text-slate-300 font-mono text-[11px] leading-relaxed italic">
              "{DATA.learningLog}"
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default TechnicalSpecs;