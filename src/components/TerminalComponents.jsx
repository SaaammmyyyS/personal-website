import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const FormattedMessage = memo(({ text }) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <span className="whitespace-pre-wrap">
      {parts.map((part, i) => (
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={i} className="text-white underline decoration-cyan-500/30 font-bold">{part.slice(2, -2)}</strong>
          : part
      ))}
    </span>
  );
});

export const Typewriter = ({ text, delay = 10, onFinished }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!text || currentIndex >= text.length) {
      if (currentIndex >= text.length && onFinished) onFinished();
      return;
    }
    const timeout = setTimeout(() => {
      setCurrentText(prev => prev + text[currentIndex]);
      setCurrentIndex(prev => prev + 1);
    }, delay);
    return () => clearTimeout(timeout);
  }, [currentIndex, text, delay, onFinished]);

  return <FormattedMessage text={currentText} />;
};

export const AICoreLogo = ({ isOpen, isTyping }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center cursor-pointer group"
    >
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: isTyping ? [1, 2, 1] : [1, 1.8], opacity: 0 }}
          transition={{ duration: isTyping ? 1 : 2.5, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
          className="absolute inset-0 border border-cyan-500/50 rounded-full"
        />
      ))}
      <motion.div
        animate={isTyping ? { scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] } : { opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: isTyping ? 0.5 : 3, repeat: Infinity }}
        className="absolute inset-0 bg-cyan-500/20 rounded-full blur-md group-hover:bg-cyan-400/30 transition-colors"
      />
      <motion.div
        animate={isTyping ? { x: [-1, 1, -1], y: [1, -1, 1] } : {}}
        transition={{ duration: 0.1, repeat: Infinity }}
        className="relative w-10 h-10 z-10 overflow-hidden rounded-sm"
      >
        <motion.div
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[1px] bg-cyan-400/60 shadow-[0_0_10px_rgba(34,211,238,1)] z-20 pointer-events-none"
        />
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none">
          <motion.path
            d="M10 35 L90 35 L90 75 L10 75 Z"
            stroke="currentColor" strokeWidth="3"
            className="text-cyan-500 group-hover:text-cyan-400 transition-colors"
            animate={{ opacity: isOpen ? 0.4 : 1 }}
          />
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.path
                key="closed" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} exit={{ pathLength: 0 }}
                d="M10 35 L50 60 L90 35" stroke="currentColor" strokeWidth="3"
                className="text-cyan-300 group-hover:stroke-white transition-colors"
              />
            ) : (
              <motion.g key="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {[0, 1, 2].map((i) => (
                  <motion.path key={i} animate={{ y: [-5, -25], opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.4 }}
                    d="M35 30 L50 15 L65 30" stroke="#22d3ee" strokeWidth="3"
                  />
                ))}
              </motion.g>
            )}
          </AnimatePresence>
          <circle cx="50" cy="55" r="4" className={isOpen ? "fill-emerald-400" : "fill-cyan-500 group-hover:fill-white"} />
        </svg>
      </motion.div>
    </motion.div>
  );
};