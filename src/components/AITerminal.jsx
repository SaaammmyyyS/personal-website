import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, ShieldCheck, Activity } from 'lucide-react';

const FormattedMessage = memo(({ text }) => {
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

const Typewriter = ({ text, delay = 10, onFinished }) => {
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

const AICoreLogo = ({ isOpen, isTyping }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center cursor-pointer group"
    >
      <motion.div
        animate={isTyping ? { scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] } : { scale: [1, 1.1, 1], opacity: [0.2, 0.1, 0.2] }}
        transition={{ duration: isTyping ? 0.4 : 3, repeat: Infinity }}
        className="absolute inset-0 bg-cyan-500/20 rounded-full blur-md group-hover:bg-cyan-400/30 transition-colors"
      />

      <motion.div
        animate={isTyping ? { x: [-1, 1, -1], y: [1, -1, 1] } : {}}
        transition={{ duration: 0.1, repeat: Infinity }}
        className="relative w-10 h-10 z-10"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none">
          <motion.path
            d="M10 35 L90 35 L90 75 L10 75 Z"
            stroke="currentColor"
            strokeWidth="3"
            className="text-cyan-500 group-hover:text-cyan-400"
            animate={{ opacity: isOpen ? 0.4 : 1 }}
          />
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.path
                key="closed"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                d="M10 35 L50 60 L90 35"
                stroke="currentColor"
                strokeWidth="3"
                className="text-cyan-300 group-hover:stroke-white transition-colors"
              />
            ) : (
              <motion.g key="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {[0, 1].map((i) => (
                  <motion.path
                    key={i}
                    animate={{ y: [-5, -20], opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.5 }}
                    d="M35 30 L50 15 L65 30"
                    stroke="#22d3ee"
                    strokeWidth="3"
                  />
                ))}
              </motion.g>
            )}
          </AnimatePresence>
          <circle cx="50" cy="55" r="4" className={isOpen ? "fill-emerald-400" : "fill-cyan-500 group-hover:fill-white"} />
        </svg>
      </motion.div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
      </div>
    </motion.div>
  );
};


const AITerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: "Welcome. I am **Ivan's Architectural Intelligence**.\n\nI operate via **AWS Lambda** serverless execution with **Amazon Bedrock** reasoning. I have direct read-access to Ivan's production stack logs and system designs.\n\nHow can I assist with your technical evaluation?",
    isAnimated: true,
    meta: "AWS_INFRA // CLAUDE_3_BEDROCK // S3_RAG"
  }]);

  useEffect(() => {
    const timer = setTimeout(() => !isOpen && setShowHint(true), 6000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (e, directQuery = null) => {
    if (e) e.preventDefault();
    const query = directQuery || input;
    if (!query.trim() || isTyping) return;

    const historyForAPI = messages
      .filter(m => m.role === 'user' || (m.role === 'assistant' && !m.content.includes("Welcome. I am Ivan's Architectural Intelligence")))
      .slice(-4) // Keep it short
      .map(m => ({
        role: m.role,
        content: m.content.replace(/\*\*/g, '')
      }));

    setInput('');
    setShowHint(false);
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setIsTyping(true);

    try {
      const response = await fetch(import.meta.env.VITE_AI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          history: historyForAPI
        }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer || "No response from uplink.", isAnimated: false, meta: "INBOUND_DATA // STACK_READ" }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "**ERROR**: Connection timeout.", isAnimated: false }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[200] flex flex-col items-end gap-3 font-mono">

      <AnimatePresence>
        {showHint && !isOpen && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.8 }}
            className="relative bg-[#0a0a0a] border border-cyan-500/50 p-3 rounded-xl shadow-2xl max-w-[220px] md:max-w-[280px]">
            <button
              onClick={(e) => { e.stopPropagation(); setShowHint(false); }}
              className="absolute -top-2 -right-2 bg-black border border-cyan-500/50 rounded-full p-1 text-cyan-500 hover:text-white transition-colors"
            >
              <X size={10} />
            </button>
            <div className="text-[10px] md:text-[11px] text-cyan-100 leading-tight italic text-center">
              "Establish a secure uplink to query my **AWS architecture** or **Fullstack proficiency**."
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="group flex items-center outline-none">
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="mr-4 px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[9px] tracking-[0.3em] uppercase hidden md:block"
          >
            Initialize_Uplink
          </motion.span>
          <AICoreLogo isOpen={isOpen} isTyping={isTyping} />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
            className="w-[calc(100vw-2rem)] md:w-[500px] bg-[#080808]/95 backdrop-blur-xl border border-cyan-500/20 shadow-2xl rounded-lg overflow-hidden">

            <div className="bg-cyan-950/40 p-3 flex justify-between border-b border-white/10">
              <div className="flex gap-4 items-center">
                  <span className="text-[9px] text-cyan-500/80 uppercase flex items-center gap-1.5"><ShieldCheck size={12}/> ENCRYPTED_NODE</span>
                  <span className="text-[9px] text-emerald-500/80 uppercase flex items-center gap-1.5"><Activity size={12}/> SYSTEM_ACTIVE</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white"><X size={18} /></button>
            </div>

            <div ref={scrollRef} className="h-[380px] overflow-y-auto p-5 space-y-6 text-[12px] scrollbar-thin scrollbar-thumb-cyan-900/50">
              {messages.map((msg, i) => (
                <div key={i} className="space-y-1">
                  {msg.role === 'assistant' && msg.meta && (
                    <div className="text-[8px] text-cyan-700 ml-7 font-bold tracking-tighter uppercase mb-1">{msg.meta}</div>
                  )}
                  <div className={`flex gap-3 ${msg.role === 'assistant' ? 'text-cyan-400' : 'text-slate-200'}`}>
                    <span className="opacity-40 mt-1">{msg.role === 'assistant' ? '>>' : 'USR:'}</span>
                    <div className="flex-1">
                      {msg.role === 'assistant' && !msg.isAnimated
                        ? <Typewriter text={msg.content} onFinished={() => setMessages(prev => prev.map((m, idx) => idx === i ? {...m, isAnimated: true} : m))} />
                        : <FormattedMessage text={msg.content} />
                      }
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-cyan-600 animate-pulse text-[10px] ml-8">[ANALYZING_S3_VAULT...]</div>}
            </div>

            <div className="p-4 bg-black border-t border-white/10">
              <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar pb-1">
                {['/stack', '/architecture', '/projects'].map(cmd => (
                  <button key={cmd} onClick={() => handleSendMessage(null, `Requesting technical analysis: ${cmd.replace('/','')}`)}
                    className="text-[9px] border border-cyan-500/20 px-3 py-1 text-cyan-500/70 rounded hover:bg-cyan-500/20 transition-all uppercase tracking-tighter">
                    {cmd}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-3 items-center bg-white/5 rounded px-3 py-2 border border-white/5 focus-within:border-cyan-500/50">
                <span className="text-cyan-500 opacity-50">$</span>
                <input autoFocus className="flex-1 bg-transparent outline-none text-[12px] text-white" placeholder="INPUT_QUERY..." value={input} onChange={e => setInput(e.target.value)} />
                <button type="submit" className="text-cyan-500 hover:text-cyan-400"><Send size={16} /></button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AITerminal;