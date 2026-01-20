import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Title, AreaChart, Metric, Text, Badge } from "@tremor/react";
import { LogOut, ShieldCheck, RefreshCw, Radio, Globe, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';

const AdminDashboard = ({ user, signOut }) => {
  const [data, setData] = useState({ summary: {}, history: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTerminate = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_MONITORING_API_URL);
      const result = await response.json();
      const parsedBody = typeof result.body === 'string' ? JSON.parse(result.body) : result;
      setData(parsedBody);
    } catch (e) {
      console.error("Sync Error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMetrics(); }, []);

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
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-black/40 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white/10 shadow-2xl gap-6">
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
                <p className="text-white font-bold text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] truncate max-w-[150px] md:max-w-none">
                  {data.summary?.last_updated ? `LIVE // ${data.summary.last_updated}` : 'INITIALIZING...'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={fetchMetrics}
              disabled={loading}
              className="group relative flex-1 md:flex-none px-6 md:px-8 py-3 bg-cyan-500 text-black font-black text-[10px] md:text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-all active:scale-95 disabled:opacity-50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              <div className="relative flex items-center justify-center gap-2">
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Sync Nodes
              </div>
            </button>
            <button
              onClick={handleTerminate}
              className="flex-1 md:flex-none px-6 md:px-8 py-3 bg-transparent border border-red-500 text-red-500 font-black text-[10px] md:text-xs uppercase tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-95"
            >
              Terminate
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="bg-black/60 backdrop-blur-2xl border-white/10 ring-1 ring-white/10 p-6 md:p-8 rounded-3xl h-full shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
                    <ShieldCheck className="text-cyan-400 h-6 w-6" />
                  </div>
                  <Badge color="cyan" size="sm" className="bg-cyan-500 text-black font-bold uppercase px-3 py-1 rounded-md">
                    PROJECT_INTEL
                  </Badge>
                </div>
                <Metric className="text-white text-3xl md:text-4xl font-black tracking-tighter italic">CyberIntel</Metric>
              </div>
              <div className="mt-8 space-y-3">
                <div className="flex justify-between text-[11px] font-mono text-slate-300 font-bold uppercase">
                  <span>Primary Node</span>
                  <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
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

          <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="bg-black/60 backdrop-blur-2xl border-white/10 ring-1 ring-white/10 p-6 md:p-8 rounded-3xl h-full border-l-4 border-l-indigo-500 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
                    <Radio className="text-indigo-400 h-6 w-6" />
                  </div>
                  <Badge color="indigo" size="sm" className="bg-indigo-600 text-white font-bold uppercase px-3 py-1 rounded-md">
                    PROJECT_SENTRY
                  </Badge>
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