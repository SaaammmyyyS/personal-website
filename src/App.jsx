import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Authenticator, ThemeProvider, View, Heading, Text } from '@aws-amplify/ui-react';
import { Globe, ArrowLeft } from 'lucide-react';

import { configureAmplify, nexusTheme } from './amplify-config';
import './auth-styles.css';
import '@aws-amplify/ui-react/styles.css';

import BackgroundSystem from './components/BackgroundSystem';
import TechnicalHeader from './components/TechnicalHeader';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import SectionLabel from './components/SectionLabel';
import TechnicalSpecs from './components/TechnicalSpecs';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import AITerminal from './components/AITerminal';
import ParticleBackground from './components/ParticleBackground';
import { DATA } from './constants/data';

import AdminDashboard from './pages/AdminDashboard';

configureAmplify();

const AuthComponents = {
  Header() {
    return (
      <View className="text-center p-6 relative">
        <Link to="/" className="absolute left-4 top-4 flex items-center gap-1 text-[10px] font-mono text-cyan-500/60 hover:text-cyan-400 transition-colors uppercase tracking-widest">
          <ArrowLeft size={12} /> Back
        </Link>
        <Globe className="text-cyan-400 h-10 w-10 mx-auto mb-4 animate-[spin_15s_linear_infinite]" />
        <Heading level={3} className="text-white font-black italic uppercase text-xl">
          Nexus <span className="text-cyan-400">Command</span>
        </Heading>
        <Text className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mt-2">
          Administrator Access Only
        </Text>
      </View>
    );
  },
};

const PortfolioContainer = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({ name: '', message: '' });

  return (
    <div className="min-h-screen w-full bg-[#050505] text-slate-300 relative font-sans">
      <BackgroundSystem />
      <div className="relative z-10">
        <TechnicalHeader />
        <main className="max-w-6xl mx-auto px-6 md:px-12 pt-20">
          <Hero />
          <section id="projects" className="py-32 border-t border-white/5">
            <SectionLabel number="01 /" text="Technical Prototypes" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-12">
              {DATA.projects.map((p) => (
                <div key={p.id} onClick={() => setSelectedProject(p)} className="cursor-pointer">
                  <ProjectCard {...p} />
                </div>
              ))}
            </div>
          </section>
          <TechnicalSpecs />
          <ContactSection formData={formData} setFormData={setFormData} />
          <Footer />
        </main>
      </div>
      <AITerminal />
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioContainer />} />

        <Route path="/admin" element={
          <ThemeProvider theme={nexusTheme}>
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
              <ParticleBackground />
              <div className="relative z-10 w-full max-w-[460px]">
                <Authenticator components={AuthComponents} hideSignUp={true}>
                  {({ signOut, user }) => (
                    <div className="fixed inset-0 z-[100] bg-[#050505] overflow-y-auto">
                      <AdminDashboard user={user} signOut={signOut} />
                    </div>
                  )}
                </Authenticator>
              </div>
            </div>
          </ThemeProvider>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;