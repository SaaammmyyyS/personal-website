import React from 'react';
import { motion } from 'framer-motion';
import { DATA } from '../constants/data';
import { Sparkles } from 'lucide-react';

const Hero = () => {
  const handleOpenAI = () => {
    const event = new CustomEvent('open-ai-terminal', {
      detail: {
        message: "Hi! I'm Ivan's AI assistant. He actually built me from scratch using AWS Bedrock because he wanted to see how far he could push serverless RAG pipelines. I've got a direct uplink to his technical history—how can I help you today?"
      }
    });
    window.dispatchEvent(event);
  };

  return (
    <section className="min-h-[100dvh] md:min-h-[85vh] flex flex-col justify-center pt-24 pb-12 px-6 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="font-mono text-cyan-400 text-[10px] md:text-sm mb-4 tracking-[0.2em]">
          &gt; HELLO_WORLD...
        </div>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.95] md:leading-[0.9] mb-8 uppercase">
          I'M <span className="text-white">{DATA.profile.name}.</span><br />
          <span className="text-slate-600 tracking-tighter">{DATA.profile.role}.</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12 mt-8 md:mt-12">
          <div className="flex flex-col items-start space-y-8">
            <p className="text-slate-200 text-xl md:text-2xl font-light leading-snug">
              {DATA.profile.bio.tagline}
            </p>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl font-light">
              I specialize in architecting <span className="text-white">resilient backends</span> and
              high-throughput systems. {DATA.profile.bio.description.split('infrastructure.')[1] || DATA.profile.bio.description.split('systems.')[1]}
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenAI}
              className="group relative w-full md:w-auto flex items-center justify-center gap-3 px-6 py-5 md:px-8 md:py-4 bg-cyan-500/5 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase hover:bg-cyan-500/10 hover:border-cyan-500 transition-all duration-300"
            >
              <Sparkles size={18} className="shrink-0" />
              <span className="whitespace-nowrap">[ RUN_AI_CONSULTANT ]</span>

              <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-cyan-500 md:w-2 md:h-2 md:border-t md:border-l" />
              <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-cyan-500 md:w-2 md:h-2 md:border-b md:border-r" />
            </motion.button>
          </div>

          <div className="flex flex-col justify-end gap-4 font-mono text-[10px] md:text-xs text-slate-500 mt-8 md:mt-0">
            {[
              { label: 'ROLE', value: DATA.profile.displayRole, color: 'text-white' },
              { label: 'LOCATION', value: DATA.profile.location, color: 'text-white' },
              { label: 'PRIMARY_STACK', value: DATA.profile.primaryStack, color: 'text-cyan-400' },
              { label: 'STATUS', value: DATA.profile.status, color: 'text-emerald-500', pulse: true }
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="uppercase tracking-widest">{item.label}</span>
                <span className={`${item.color} font-bold uppercase text-right pl-4 ${item.pulse ? 'animate-pulse' : ''}`}>
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