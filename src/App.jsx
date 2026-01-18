import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DATA } from './constants/data';

// Component Imports
import BackgroundSystem from './components/BackgroundSystem';
import TechnicalHeader from './components/TechnicalHeader';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import SectionLabel from './components/SectionLabel';
import TechnicalSpecs from './components/TechnicalSpecs';
import CareerSection from './components/CareerSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import CareerModal from './components/CareerModal';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedExp, setSelectedExp] = useState(null);
  const [formData, setFormData] = useState({ name: '', message: '' });

  return (
    <div className="min-h-screen w-full bg-[#050505] text-slate-300 selection:bg-cyan-500/30 overflow-x-hidden relative font-sans">
      <BackgroundSystem />

      <div className="relative z-10 pointer-events-auto">
        <TechnicalHeader />

        <main className="max-w-6xl mx-auto px-6 md:px-12 pt-20">
          <Hero />

          <section id="projects" className="py-32 border-t border-white/5">
            <SectionLabel number="01 /" text="Technical Prototypes" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-12">
              {DATA.projects.map((p) => (
                <div key={p.id} className="cursor-pointer" onClick={() => setSelectedProject(p)}>
                  <ProjectCard {...p} />
                </div>
              ))}
            </div>
          </section>

          <TechnicalSpecs />

          <section id="career" className="py-32 border-t border-white/5">
            <SectionLabel number="02 /" text="Professional Experience" />
            <CareerSection careerData={DATA.career} onSelect={setSelectedExp} />
          </section>

          <ContactSection formData={formData} setFormData={setFormData} />
          <Footer />
        </main>
      </div>

      <AnimatePresence mode="wait">
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
        {selectedExp && (
          <CareerModal experience={selectedExp} onClose={() => setSelectedExp(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;