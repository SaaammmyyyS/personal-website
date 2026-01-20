import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

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

import AdminDashboard from './pages/AdminDashboard';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
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
            <CareerSection
              careerData={DATA.career}
              onSelect={(exp) => setSelectedExperience(exp)}
            />
          </section>

          <section id="contact" className="py-24 border-t border-white/5">
            <SectionLabel number="04 /" text="Contact Portal" />
            <ContactSection
              formData={formData}
              setFormData={setFormData}
            />
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
              <AdminDashboard />
            </Authenticator.Provider>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;