import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import {
  CustomCursor,
  ScrollProgress,
  Spotlight,
  LoadingScreen,
  ParticleBackground,
} from './components/UI';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import CodingProfiles from './components/CodingProfiles';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const handleLoadComplete = useCallback(() => setLoading(false), []);

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {/* Main app */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen bg-bg text-text-primary"
        >
          {/* Global overlays */}
          <CustomCursor />
          <ScrollProgress />
          <Spotlight />
          <ParticleBackground />

          {/* Navigation */}
          <Navbar />

          {/* Main content */}
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Achievements />
            <CodingProfiles />
            <Contact />
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  );
}
