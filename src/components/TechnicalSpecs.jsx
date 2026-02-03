import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Database, ShieldCheck, Terminal, Info, Layers } from 'lucide-react';
import { DATA } from '../constants/data';

const iconMap = {
  cloud: <Cloud size={24} className="text-orange-400" />,
  database: <Database size={24} className="text-cyan-400" />,
  shield: <ShieldCheck size={24} className="text-emerald-400" />,
  terminal: <Terminal size={24} className="text-purple-400" />,
  layers: <Layers size={24} className="text-pink-400" />
};

const TechGroup = ({ title, iconName, tags, index }) => {
  const IconComponent = iconMap[iconName] || <Terminal size={24} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative p-5 md:p-6 bg-white/[0.01] border border-white/5 hover:border-cyan-500/30 transition-all duration-500 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/0 group-hover:border-cyan-500/50 transition-all duration-500" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/0 group-hover:border-cyan-500/50 transition-all duration-500" />
      <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none hidden sm:block">
        {React.cloneElement(IconComponent, { size: 100 })}
      </div>

      <div className="relative z-10">
        <div className="mb-4 inline-block p-2 bg-white/5 rounded-sm group-hover:bg-cyan-500/10 transition-colors">
          {IconComponent}
        </div>

        <h3 className="text-white font-bold text-[10px] md:text-[11px] mb-4 tracking-[0.2em] uppercase flex items-center gap-2">
          <span className="w-1 h-1 bg-cyan-500/40 group-hover:bg-cyan-500 transition-colors" />
          {title.replace(' ', '_')}
        </h3>

        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {tags.map((tech, i) => (
            <span
              key={tech}
              className="px-2 py-0.5 border border-white/10 bg-black/40 text-[9px] font-mono text-slate-400 uppercase group-hover:text-cyan-400 group-hover:border-cyan-400/30 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const TechnicalSpecs = () => {
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { delay: 0.3, staggerChildren: 0.015 },
    },
  };

  const letter = {
    hidden: { opacity: 0, display: "none" },
    visible: { opacity: 1, display: "inline" },
  };

  return (
    <div className="mt-8 md:mt-12">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-10 md:mb-16">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter text-white uppercase mb-4 md:mb-6 leading-none">
            Fullstack_<br className="sm:hidden" />Capabilities
          </h2>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed italic border-l-2 border-cyan-500/30 pl-4 max-w-lg">
            "Bridging the gap between complex backend logic and intuitive user interfaces."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        {DATA.cloudExpertise.map((group, index) => (
          <TechGroup
            key={index}
            index={index}
            title={group.title}
            iconName={group.icon}
            tags={group.tags}
          />
        ))}
      </div>

      {DATA.learningLog && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 md:mt-12 p-5 md:p-6 border border-cyan-500/20 bg-cyan-500/[0.02] flex flex-col sm:flex-row items-start gap-4 relative overflow-hidden"
        >
          <motion.div
            animate={{ x: ["-100%", "250%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 h-[1px] w-40 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
          />

          <div className="p-2 bg-cyan-500/10 rounded-sm shrink-0 border border-cyan-500/20">
            <Info size={16} className="text-cyan-400" />
          </div>

          <div className="space-y-2">
            <span className="text-cyan-500 font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-2">
              <span className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" />
              Current_Focus
            </span>

            <motion.p
              variants={sentence}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-slate-300 font-mono text-[10px] md:text-[11px] leading-relaxed italic"
            >
              {DATA.learningLog.split("").map((char, index) => (
                <motion.span key={char + "-" + index} variants={letter}>
                  {char}
                </motion.span>
              ))}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-3 bg-cyan-500 ml-1 translate-y-0.5"
              />
            </motion.p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TechnicalSpecs;