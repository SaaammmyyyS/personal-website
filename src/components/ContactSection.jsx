import React, { useState } from 'react';
import { Send, Terminal, ShieldCheck } from 'lucide-react';
import SectionLabel from './SectionLabel';

const ContactSection = ({ formData, setFormData }) => {
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [status, setStatus] = useState('IDLE_AWAITING_INPUT');

  const isReady = formData.name.length > 2 && formData.message.length > 5;

  const handleSimulatedSend = (e) => {
    e.preventDefault();
    if (!isReady) return;
    setIsTransmitting(true);
    setStatus('ENCRYPTING_PACKET...');

    setTimeout(() => {
      setStatus('SUCCESS: LOGGED_TO_INTERNAL_JOURNAL');
      setIsTransmitting(false);
    }, 2000);
  };

  return (
    <section id="contact" className="py-32 border-t border-white/5">
      <SectionLabel number="03 /" text="Contact Portal" />
      <div className="max-w-2xl bg-white/[0.02] border border-white/5 p-8 md:p-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 -rotate-45 translate-x-8 -translate-y-8" />

        <form className="space-y-10">
          <div className="space-y-4">
            <label className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.3em] flex items-center gap-2">
              <Terminal size={12}/> User_Identity
            </label>
            <input
              className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-cyan-500 outline-none transition-colors font-mono"
              placeholder="YOUR_NAME / EMAIL"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.3em] flex items-center gap-2">
              <ShieldCheck size={12}/> Message_Payload
            </label>
            <textarea
              rows="4"
              className="w-full bg-white/[0.03] border border-white/10 p-4 text-white focus:border-cyan-500 outline-none transition-colors font-mono text-sm resize-none"
              placeholder="ENTER MESSAGE"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <button
              onClick={handleSimulatedSend}
              disabled={!isReady || isTransmitting}
              className={`px-10 py-4 font-mono text-[10px] font-bold tracking-[0.2em] border transition-all ${
                isReady ? 'border-cyan-500 text-cyan-400 hover:bg-cyan-500/10' : 'border-white/10 text-slate-600'
              }`}
            >
              {isTransmitting ? 'TRANSMITTING...' : 'EXECUTE_SEND'}
            </button>

            <div className="text-[9px] font-mono uppercase tracking-widest text-slate-500">
              <span className="text-cyan-500 mr-2">{'>'}</span> {status}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;