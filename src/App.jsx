import React, { useState, useEffect } from 'react';
import './amplify-config';

import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Authenticator, ThemeProvider, View, Heading, Text } from '@aws-amplify/ui-react';
import { Globe, ArrowLeft } from 'lucide-react';
import { nexusTheme } from './amplify-config';
import '@aws-amplify/ui-react/styles.css';
import './auth-styles.css';

import { DATA } from './constants/data';
import TechnicalHeader from './components/TechnicalHeader';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import TechnicalSpecs from './components/TechnicalSpecs';
import CareerSection from './components/CareerSection';
import CareerModal from './components/CareerModal';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AITerminal from './components/AITerminal';
import BackgroundSystem from './components/BackgroundSystem';
import SectionLabel from './components/SectionLabel';
import ParticleBackground from './components/ParticleBackground';

import AdminDashboard from './pages/AdminDashboard';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

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

const AdminWrapper = () => {
  return (
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
  );
};

const PortfolioHome = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [formData, setFormData] = useState({ name: '', message: '' });

  return (
    <div className="min-h-screen w-full bg-[#050505] text-slate-300 relative font-sans scroll-smooth overflow-x-hidden">
      <BackgroundSystem />
      <div className="relative z-10 flex flex-col min-h-screen">
        <TechnicalHeader />
        <main className="flex-grow max-w-6xl mx-auto px-6 md:px-12 pt-20 w-full">
          <Hero />

          <section id="projects" className="py-24 border-t border-white/5">
            <SectionLabel number="01 /" text="Technical Prototypes" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-12">
              {DATA.projects.map((p) => (
                <div key={p.id} onClick={() => setSelectedProject(p)} className="cursor-pointer">
                  <ProjectCard {...p} />
                </div>
              ))}
            </div>
          </section>

          <section id="specs" className="py-24 border-t border-white/5">
            <SectionLabel number="02 /" text="Technical Ecosystem" />
            <TechnicalSpecs />
          </section>

          <section id="career" className="py-24 border-t border-white/5">
            <SectionLabel number="03 /" text="Career Path" />
            <CareerSection careerData={DATA.career} onSelect={(exp) => setSelectedExperience(exp)} />
          </section>

          <section id="contact" className="py-24 border-t border-white/5">
            <SectionLabel number="04 /" text="Contact Portal" />
            <ContactSection formData={formData} setFormData={setFormData} />
          </section>
        </main>
        <Footer />
      </div>

      <AITerminal />

      <AnimatePresence mode="wait">
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
        {selectedExperience && (
          <CareerModal experience={selectedExperience} onClose={() => setSelectedExperience(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PortfolioHome />} />

        <Route
          path="/admin"
          element={
            <Authenticator.Provider>
              <AdminWrapper />
            </Authenticator.Provider>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;