import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Title, AreaChart, Metric, Text, Badge } from "@tremor/react";
import {
  ShieldCheck,
  RefreshCw,
  Radio,
  Globe,
  MessageSquare,
  Terminal,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';

import { apiService } from '../services/apiService';

const AdminDashboard = ({ user, signOut }) => {
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState({ summary: {}, history: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const syncAllData = async () => {
    setLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_MONITORING_API_URL);
      const result = await response.json();
      const parsedBody = typeof result.body === 'string' ? JSON.parse(result.body) : result;
      setData(parsedBody);

      const fetchedMessages = await apiService.fetchMessages();
      setMessages(fetchedMessages);
    } catch (e) {
      console.error("Nexus Sync Error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm("CRITICAL_ACTION: Purge this intel packet from the Nexus database?")) return;

    try {
      await apiService.deleteMessage(id);
      setMessages(prev => prev.filter(m => m.id !== id));
    } catch (error) {
      console.error("Deletion Error:", error);
    }
  };

  useEffect(() => {
    syncAllData();

    const subscription = apiService.subscribeToMessages((newMessage) => {
      setMessages(prev => [newMessage, ...prev]);
    });

    return () => subscription.unsubscribe();
  }, []);

  const chartDataKeys = [
    { id: "intel_col", label: "Intel Collector", color: "cyan" },
    { id: "sent_sim", label: "Simulator", color: "indigo" },
    { id: "sent_ai", label: "AI Analyst", color: "violet" },
    { id: "sent_broad", label: "Broadcaster", color: "fuchsia" }
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-cyan-500/30 font-sans text-slate-200">
      <ParticleBackground />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto p-4 md:p-10 space-y-6 md:space-y-8"
      >
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-black/40 backdrop-blur-xl p-6 md:p-8 rounded-[2.5rem] border border-white/10 shadow-2xl gap-6">
          <div className="flex items-center gap-4 md:gap-5">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 animate-pulse" />
              <div className="relative bg-[#0a0a0a] p-3 md:p-4 rounded-2xl border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <Globe className="text-cyan-400 h-6 w-6 md:h-8 md:w-8 animate-[spin_10s_linear_infinite]" />
              </div>
            </div>
            <div>
              <h1 className="text-white text-xl md:text-3xl font-black tracking-tighter italic uppercase">Nexus Command</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse" />
                <p className="text-white font-bold text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] truncate">
                  {data.summary?.last_updated ? `LIVE // ${data.summary.last_updated}` : 'ESTABLISHING UPLINK...'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={syncAllData}
              disabled={loading}
              className="group relative flex-1 md:flex-none px-6 md:px-8 py-3 bg-cyan-500 text-black font-black text-[10px] md:text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-all active:scale-95 disabled:opacity-50 overflow-hidden"
            >
              <div className="relative flex items-center justify-center gap-2">
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Sync Nodes
              </div>
            </button>
            <button
              onClick={() => { signOut(); navigate('/'); }}
              className="flex-1 md:flex-none px-6 md:px-8 py-3 bg-transparent border border-red-500 text-red-500 font-black text-[10px] md:text-xs uppercase tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-95"
            >
              Terminate
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <motion.div whileHover={{ y: -5 }}>
            <Card className="bg-black/60 backdrop-blur-2xl border-white/10 ring-1 ring-white/10 p-6 md:p-8 rounded-3xl h-full shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30 text-cyan-400">
                    <ShieldCheck size={24} />
                  </div>
                  <Badge color="cyan" size="sm" className="font-bold uppercase tracking-widest">PROJECT_INTEL</Badge>
                </div>
                <Metric className="text-white text-3xl md:text-4xl font-black tracking-tighter italic">CyberIntel</Metric>
              </div>
              <div className="mt-8 space-y-3">
                <div className="flex justify-between text-[11px] font-mono text-slate-300 font-bold uppercase">
                  <span>Primary Node</span>
                  <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] font-black">
                    {data.summary?.intel_active ? '● ONLINE' : '○ IDLE'}
                  </span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: data.summary?.intel_active ? "100%" : "30%" }}
                    className="h-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]"
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -5 }}>
            <Card className="bg-black/60 backdrop-blur-2xl border-white/10 ring-1 ring-white/10 p-6 md:p-8 rounded-3xl h-full border-l-4 border-l-indigo-500 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30 text-indigo-400">
                    <Radio size={24} />
                  </div>
                  <Badge color="indigo" size="sm" className="font-bold uppercase tracking-widest">PROJECT_SENTRY</Badge>
                </div>
                <Metric className="text-white text-3xl md:text-4xl font-black tracking-tighter italic">CloudSentry</Metric>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                 {["SIM", "AI", "BRD"].map(label => (
                   <div key={label} className="px-3 py-1.5 bg-indigo-500/20 border border-indigo-400/50 rounded-lg text-[10px] font-bold font-mono text-indigo-300 shadow-sm">
                     {label}_ACTIVE
                   </div>
                 ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <Card className="bg-black/60 backdrop-blur-3xl border-white/10 ring-1 ring-white/10 p-6 md:p-8 rounded-[2.5rem] shadow-3xl">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400">
                <MessageSquare size={20} />
              </div>
              <div>
                <Title className="text-white font-black text-xl md:text-2xl tracking-tighter italic uppercase">Incoming Intel Packets</Title>
                <Text className="text-slate-500 font-mono text-[10px] font-bold mt-1 uppercase tracking-[0.2em]">WebSocket Live Uplink Enabled</Text>
              </div>
            </div>
            <Badge className="bg-white/5 text-slate-400 border-white/10 uppercase font-mono tracking-tighter px-3 py-1">
              {messages.length} Active Records
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence mode='popLayout'>
              {messages.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-16 text-center border-2 border-dashed border-white/5 rounded-[2.5rem]">
                  <Terminal className="mx-auto text-slate-800 mb-4" size={48} />
                  <Text className="text-slate-600 font-mono italic uppercase text-xs tracking-widest font-black">Nexus Buffer Empty // Awaiting Signal</Text>
                </motion.div>
              ) : (
                messages.map((msg) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -30, filter: "blur(10px)" }}
                    key={msg.id}
                    className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-red-500/40 transition-all hover:bg-red-500/[0.02] group relative overflow-hidden shadow-xl"
                  >
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 transition-all duration-300 z-20">
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-2.5 bg-black/60 backdrop-blur-md border border-red-500/50 rounded-xl text-red-500 hover:bg-red-500 hover:text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-col">
                        <span className="text-cyan-400 font-mono text-[10px] font-black uppercase tracking-wider group-hover:text-red-400 transition-colors">
                          {msg.name}
                        </span>
                        <span className="text-slate-600 font-mono text-[8px] uppercase tracking-tighter">
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22d3ee] group-hover:bg-red-500 group-hover:shadow-[0_0_8px_#ef4444] transition-all" />
                    </div>

                    <p className="text-slate-300 text-xs font-mono leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all">
                      {msg.content}
                    </p>

                    <div className="mt-5 pt-3 border-t border-white/5 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                        <span className="text-[7px] font-mono text-slate-500 uppercase tracking-widest italic">
                          ID_{msg.id.substring(0,8)}
                        </span>
                        <div className="flex gap-1">
                          <div className="h-1 w-1 rounded-full bg-slate-700" />
                          <div className="h-1 w-1 rounded-full bg-slate-700" />
                        </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </Card>

        <Card className="bg-black/60 backdrop-blur-3xl border-white/10 ring-1 ring-white/10 p-6 md:p-8 rounded-[2.5rem] shadow-3xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 border-b border-white/10 pb-8">
            <div>
              <Title className="text-white font-black text-xl md:text-2xl tracking-tighter italic uppercase">Traffic Flow Analysis</Title>
              <Text className="text-slate-300 font-mono text-[11px] font-bold mt-1 uppercase tracking-widest">Global Telemetry // Multi-Node Observation</Text>
            </div>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-3">
                {chartDataKeys.map(key => (
                  <div key={key.id} className="flex items-center gap-2">
                     <span className="h-3 w-3 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: key.color === 'cyan' ? '#22d3ee' : key.color === 'indigo' ? '#6366f1' : key.color === 'violet' ? '#8b5cf6' : '#d946ef' }} />
                     <span className="text-[11px] font-mono text-white uppercase font-black tracking-wider">{key.label}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="h-[350px] md:h-[500px] w-full">
            <AreaChart
              className="h-full w-full [&_path]:stroke-[3px]"
              data={data.history}
              index="time"
              categories={chartDataKeys.map(k => k.id)}
              colors={["cyan", "indigo", "violet", "fuchsia"]}
              showLegend={false}
              showGridLines={false}
              yAxisWidth={45}
              curveType="monotone"
              showAnimation={true}
              animationDuration={1500}
            />
          </div>
        </Card>
      </motion.main>
    </div>
  );
};

export default AdminDashboard;