import React from 'react';
import { motion } from 'framer-motion';
import { DATA } from '../constants/data';

const Hero = () => {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="font-mono text-cyan-400 text-sm mb-4 tracking-[0.2em]">
          &gt; HELLO_WORLD...
        </div>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-6 uppercase">
          I'M <span className="text-white">{DATA.profile.name}.</span><br />
          <span className="text-slate-600 tracking-tighter">{DATA.profile.role}.</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div className="space-y-6">
            <p className="text-slate-200 text-xl md:text-2xl font-light leading-snug">
              {DATA.profile.bio.tagline}
            </p>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl font-light">
              I specialize in architecting <span className="text-white">resilient backends</span> and
              high-throughput systems. {DATA.profile.bio.description.split('infrastructure.')[1] || DATA.profile.bio.description.split('systems.')[1]}
            </p>
          </div>

          <div className="flex flex-col justify-end gap-2 font-mono text-[10px] md:text-xs text-slate-500">
            <div className="flex justify-between border-b border-white/5 pb-3">
              <span>ROLE</span>
              <span className="text-white uppercase font-bold tracking-tighter">{DATA.profile.displayRole}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-3">
              <span>LOCATION</span>
              <span className="text-white uppercase">{DATA.profile.location}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-3">
              <span>PRIMARY_STACK</span>
              <span className="text-cyan-400 uppercase font-bold">{DATA.profile.primaryStack}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-3">
              <span>STATUS</span>
              <span className="text-emerald-500 uppercase animate-pulse">{DATA.profile.status}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;