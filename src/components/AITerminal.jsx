import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Cpu, MessageSquare, ShieldCheck, Database, Sparkles } from 'lucide-react';

const FormattedMessage = ({ text }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <span className="whitespace-pre-wrap">
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <span key={i} className="text-white font-bold">
              {part.slice(2, -2)}
            </span>
          );
        }
        return part;
      })}
    </span>
  );
};

const Typewriter = ({ text, delay = 10, onFinished }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (onFinished) {
      onFinished();
    }
  }, [currentIndex, delay, text, onFinished]);

  return <FormattedMessage text={currentText} />;
};

const AITerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'SYSTEM_BOOT: **IS_ARCHITECT_v1.0**\nUplink to S3 knowledge base ACTIVE.\nQuery my architecture or career history.',
      isAnimated: true
    }
  ]);

  useEffect(() => {
    const handleHeroTrigger = (e) => {
      setIsOpen(true);
      setShowHint(false);
      if (e.detail?.message) {
        setMessages(prev => [...prev, { role: 'assistant', content: e.detail.message, isAnimated: false }]);
      }
    };
    window.addEventListener('open-ai-terminal', handleHeroTrigger);
    return () => window.removeEventListener('open-ai-terminal', handleHeroTrigger);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { if (!isOpen) setShowHint(true); }, 6000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const markAsAnimated = (index) => {
    setMessages(prev => prev.map((msg, i) => i === index ? { ...msg, isAnimated: true } : msg));
  };

  const handleSendMessage = async (e, directQuery = null) => {
    if (e) e.preventDefault();
    const query = directQuery || input;
    if (!query.trim() || isTyping) return;

    setInput('');
    setShowHint(false);
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setIsTyping(true);

    try {
      const response = await fetch(import.meta.env.VITE_AI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer, isAnimated: false }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '**ERROR**: UPLINK_TIMEOUT.\nCheck your protocol.', isAnimated: false }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[200] flex flex-col items-end gap-3">

      {/* HINT BUBBLE */}
      {showHint && !isOpen && (
        <div className="relative bg-[#0a0a0a] border border-cyan-500/50 p-3 rounded-xl shadow-2xl max-w-[220px] md:max-w-[280px] animate-in slide-in-from-right-5">
          <button onClick={() => setShowHint(false)} className="absolute -top-2 -right-2 bg-black border border-cyan-500/50 rounded-full p-1 text-cyan-500 hover:text-white"><X size={10} /></button>
          <div className="text-[10px] md:text-[11px] font-mono text-cyan-100 leading-tight italic">
            "I have access to Ivan's full stack and S3-stored project logs."
          </div>
          <button onClick={() => {setIsOpen(true); setShowHint(false);}} className="mt-2 text-[9px] font-mono text-cyan-400 font-bold uppercase underline">Init_Uplink</button>
        </div>
      )}

      {/* FLOATING ACTION BUTTON */}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="w-12 h-12 md:w-14 md:h-14 bg-black border border-cyan-500/30 text-cyan-500 flex items-center justify-center rounded-full hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all group relative">
          <MessageSquare size={20} className="md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 rounded-full bg-cyan-500/10 animate-ping" />
        </button>
      )}

      {/* TERMINAL WINDOW */}
      {isOpen && (
        <div className="w-[calc(100vw-2rem)] md:w-[520px] max-w-[520px] bg-[#080808]/95 backdrop-blur-md border border-cyan-500/20 shadow-2xl flex flex-col animate-in slide-in-from-bottom-5 duration-300 rounded-lg overflow-hidden">

          {/* Header Strip */}
          <div className="bg-cyan-950/40 p-3 flex items-center justify-between border-b border-white/10">
            <div className="flex gap-4 items-center">
               <span className="text-[9px] font-mono text-cyan-500/80 uppercase flex items-center gap-1.5"><ShieldCheck size={12}/> SECURE_NODE</span>
               <span className="text-[9px] font-mono text-emerald-500/80 uppercase flex items-center gap-1.5"><Database size={12}/> S3_VAULT_SYNCED</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white p-1 transition-colors"><X size={20} /></button>
          </div>

          {/* Terminal Body */}
          <div ref={scrollRef} className="h-[350px] md:h-[420px] overflow-y-auto p-5 space-y-6 font-mono text-[12px] leading-relaxed scrollbar-thin scrollbar-thumb-cyan-900/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'assistant' ? 'text-cyan-400' : 'text-slate-200'}`}>
                <span className="opacity-40 shrink-0 mt-1">{msg.role === 'assistant' ? '>>' : 'USR:'}</span>
                <div className={`${msg.role === 'assistant' ? 'bg-cyan-500/5 border-l border-cyan-500/20 pl-3 py-1' : ''} flex-1`}>
                  {msg.role === 'assistant' && !msg.isAnimated ? (
                    <Typewriter text={msg.content} onFinished={() => markAsAnimated(i)} />
                  ) : (
                    <FormattedMessage text={msg.content} />
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 text-cyan-600 animate-pulse text-[10px] ml-7">
                <span>[EXTRACTING_FROM_S3_OBJECTS...]</span>
              </div>
            )}
          </div>

          {/* Footer & Input */}
          <div className="p-4 bg-black border-t border-white/10">
            <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
              {['/stack', '/projects', '/bio'].map(cmd => (
                <button
                  key={cmd}
                  onClick={() => handleSendMessage(null, `Give me a technical briefing on your ${cmd.replace('/','')}`)}
                  className="text-[10px] border border-cyan-500/30 px-3 py-1.5 text-cyan-400 rounded-md bg-cyan-500/5 whitespace-nowrap hover:bg-cyan-500/20 transition-all font-bold tracking-wider"
                >
                  {cmd.toUpperCase()}
                </button>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-3 items-center bg-white/5 rounded-lg px-3 py-2 border border-white/5 focus-within:border-cyan-500/50 transition-all">
              <span className="text-cyan-500 opacity-50 font-mono text-sm">$</span>
              <input
                autoFocus
                className="flex-1 bg-transparent outline-none text-[12px] font-mono text-white placeholder:text-slate-700"
                placeholder="QUERY_IVAN_DATABASE..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="text-cyan-500/50 hover:text-cyan-400 transition-colors"><Send size={16} /></button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AITerminal;