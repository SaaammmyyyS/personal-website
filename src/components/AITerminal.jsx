import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, ShieldCheck, Activity, AlertTriangle } from 'lucide-react';
import { Typewriter, FormattedMessage, AICoreLogo } from './TerminalComponents';

const AITerminal = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const scrollRef = useRef(null);

  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: "Welcome. I am **Ivan's Architectural Intelligence**.\n\nI operate via **AWS Lambda** serverless execution with **Amazon Bedrock** reasoning. How can I assist?",
    isAnimated: true,
    meta: "AWS_INFRA // CLAUDE_3_BEDROCK"
  }]);

  useEffect(() => {
    const handleExternalOpen = (e) => {
      setIsOpen(true);
      setShowHint(false);
      if (e.detail?.message) {
         setMessages(prev => [...prev, {
           role: 'assistant',
           content: e.detail.message,
           isAnimated: false,
           meta: "HERO_UPLINK_INITIALIZED"
         }]);
      }
    };
    window.addEventListener('open-ai-terminal', handleExternalOpen);
    return () => window.removeEventListener('open-ai-terminal', handleExternalOpen);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => !isOpen && setShowHint(true), 6000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const checkRateLimit = () => {
    const now = Date.now();
    const limitWindow = 60 * 1000;
    const maxMessages = 5;
    const usage = JSON.parse(localStorage.getItem('ai_usage') || '[]');
    const validUsage = usage.filter(time => now - time < limitWindow);

    if (validUsage.length >= maxMessages) return false;
    validUsage.push(now);
    localStorage.setItem('ai_usage', JSON.stringify(validUsage));
    return true;
  };

  const handleSendMessage = async (e, directQuery = null) => {
    if (e) e.preventDefault();
    const query = directQuery || input;
    if (!query.trim() || isTyping || isRateLimited) return;

    if (!checkRateLimit()) {
      setIsRateLimited(true);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "**SECURITY_ALERT**: Excessive requests detected. Internal firewall engaged. Uplink throttled for 60s.",
        meta: "SYS_THROTTLE // 429_TOO_MANY_REQUESTS"
      }]);
      setTimeout(() => setIsRateLimited(false), 60000);
      return;
    }

    if (query.toLowerCase() === '/admin' || query.toLowerCase() === '/root') {
      setInput('');
      setMessages(prev => [...prev, { role: 'user', content: query }, {
        role: 'assistant',
        content: "DECRYPTING_UPLINK... **Access Requested**. Re-routing to Command Center protocols.",
        meta: "SYSTEM_LEVEL_OVERRIDE"
      }]);
      setTimeout(() => { setIsOpen(false); navigate('/admin'); }, 1800);
      return;
    }

    const historyForAPI = messages
      .filter(m => m.role === 'user' || (m.role === 'assistant' && !m.meta?.includes("SYS")))
      .slice(-4)
      .map(m => ({ role: m.role, content: m.content.replace(/\*\*/g, '') }));

    setInput('');
    setShowHint(false);
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setIsTyping(true);

    try {
      const response = await fetch(import.meta.env.VITE_AI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query, history: historyForAPI }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.answer || "Uplink Error");

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.answer,
        isAnimated: false,
        meta: "INBOUND_DATA // STACK_READ"
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "**ERROR**: Connection unstable. Please re-initialize query.",
        meta: "SYS_FAULT // TIMEOUT",
        isAnimated: false
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[200] flex flex-col items-end gap-3 font-mono">
      <AnimatePresence>
        {showHint && !isOpen && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.8 }}
            className="relative bg-[#0a0a0a] border border-cyan-500/50 p-3 rounded-xl shadow-2xl max-w-[220px]">
            <button onClick={(e) => { e.stopPropagation(); setShowHint(false); }}
              className="absolute -top-2 -right-2 bg-black border border-cyan-500/50 rounded-full p-1 text-cyan-500">
              <X size={10} />
            </button>
            <div className="text-[10px] text-cyan-100 leading-tight italic text-center">
              Message my AI Agent for a technical deep-dive 🫡
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="group flex items-center outline-none">
          <motion.span initial={{ opacity: 0, x: 10 }} whileHover={{ opacity: 1, x: 0 }}
            className="mr-4 px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[9px] tracking-[0.3em] uppercase hidden md:block">
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
                <span className={`text-[9px] uppercase flex items-center gap-1.5 ${isRateLimited ? 'text-red-500' : 'text-emerald-500/80'}`}>
                  {isRateLimited ? <AlertTriangle size={12}/> : <Activity size={12}/>}
                  {isRateLimited ? 'FIREWALL_ENGAGED' : 'SYSTEM_ACTIVE'}
                </span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors"><X size={18} /></button>
            </div>

            <div ref={scrollRef} className="h-[380px] overflow-y-auto p-5 space-y-6 text-[12px] scrollbar-thin scrollbar-thumb-cyan-900/50 text-slate-300">
              {messages.map((msg, i) => (
                <div key={i} className="space-y-1">
                  {msg.role === 'assistant' && msg.meta && (
                    <div className={`text-[8px] ml-7 font-bold tracking-tighter uppercase mb-1 ${msg.meta.includes('FAULT') || msg.meta.includes('THROTTLE') ? 'text-red-700' : 'text-cyan-700'}`}>
                      {msg.meta}
                    </div>
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
                {['/admin', '/stack', '/architecture', '/projects'].map(cmd => (
                  <button key={cmd}
                    disabled={isRateLimited}
                    onClick={() => cmd === '/admin' ? handleSendMessage(null, '/admin') : handleSendMessage(null, `Technical analysis request: ${cmd.replace('/','')}`)}
                    className={`text-[9px] border px-3 py-1 rounded transition-all uppercase tracking-tighter whitespace-nowrap ${
                      isRateLimited ? 'border-white/5 text-slate-700' :
                      cmd === '/admin' ? 'border-red-500/40 text-red-500/70 hover:bg-red-500/20' : 'border-cyan-500/20 text-cyan-500/70 hover:bg-cyan-500/20'
                    }`}>
                    {cmd}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSendMessage}
                className={`flex gap-3 items-center bg-white/5 rounded px-3 py-2 border transition-all
                ${isRateLimited ? 'border-red-500/40 opacity-50' : 'border-white/5 focus-within:border-cyan-500/50'}`}>
                <span className={isRateLimited ? "text-red-500" : "text-cyan-500 opacity-50"}>
                  {isRateLimited ? <AlertTriangle size={14}/> : '$'}
                </span>
                <input
                  autoFocus
                  disabled={isRateLimited}
                  className="flex-1 bg-transparent outline-none text-[12px] text-white disabled:cursor-not-allowed"
                  placeholder={isRateLimited ? "CONNECTION_THROTTLED..." : "INPUT_QUERY..."}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
                <button type="submit" disabled={isRateLimited} className="text-cyan-500 hover:text-cyan-400 disabled:text-slate-800">
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AITerminal;