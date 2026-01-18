import React from 'react';
import { motion } from 'framer-motion';
import { DATA } from '../constants/data';
import { Sparkles } from 'lucide-react';

const Hero = () => {
  const handleOpenAI = () => {
    const event = new CustomEvent('open-ai-terminal', {
      detail: { message: "Consultant protocol initialized via Hero Uplink. Accessing Ivan's S3 data... Ready for architectural inquiries." }
    });
    window.dispatchEvent(event);
  };

  return (
    <section className="min-h-[85vh] flex flex-col justify-center pt-20 px-4 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="font-mono text-cyan-400 text-sm mb-4 tracking-[0.2em]">
          &gt; HELLO_WORLD...
        </div>

        <h1 className="text-4xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-6 uppercase">
          I'M <span className="text-white">{DATA.profile.name}.</span><br />
          <span className="text-slate-600 tracking-tighter">{DATA.profile.role}.</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div className="space-y-8">
            <p className="text-slate-200 text-xl md:text-2xl font-light leading-snug">
              {DATA.profile.bio.tagline}
            </p>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl font-light">
              I specialize in architecting <span className="text-white">resilient backends</span> and
              high-throughput systems. {DATA.profile.bio.description.split('infrastructure.')[1] || DATA.profile.bio.description.split('systems.')[1]}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenAI}
              className="group relative flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-cyan-500/5 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase hover:bg-cyan-500/10 hover:border-cyan-500 transition-all duration-300"
            >
              <Sparkles size={16} />
              [ RUN_AI_CONSULTANT ]
              <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-cyan-500" />
              <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-cyan-500" />
            </motion.button>
          </div>

          {/* Identity Grid */}
          <div className="flex flex-col justify-end gap-2 font-mono text-[10px] md:text-xs text-slate-500">
            {[
              { label: 'ROLE', value: DATA.profile.displayRole, color: 'text-white' },
              { label: 'LOCATION', value: DATA.profile.location, color: 'text-white' },
              { label: 'PRIMARY_STACK', value: DATA.profile.primaryStack, color: 'text-cyan-400' },
              { label: 'STATUS', value: DATA.profile.status, color: 'text-emerald-500', pulse: true }
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between border-b border-white/5 pb-3">
                <span>{item.label}</span>
                <span className={`${item.color} font-bold uppercase ${item.pulse ? 'animate-pulse' : ''}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;