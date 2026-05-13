import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Section, SectionTitle } from './UI';
import { personalInfo, education, stats } from '../data/portfolio';
import { useInView } from 'react-intersection-observer';


function StatCard({ label, value, suffix, decimals = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const duration = 2500;
      const startTime = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing out curve
        const easeOutQuint = 1 - Math.pow(1 - progress, 5);
        
        setCount(start + (end - start) * easeOutQuint);

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    }
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -5, boxShadow: '0 0 30px rgba(255,180,0,0.15)' }}
      className="glass-card p-6 text-center transition-all duration-300"
    >
      <div className="stat-number mb-1 text-accent font-mono text-3xl md:text-4xl font-bold">
        {count.toFixed(decimals)}{suffix}
      </div>
      <div className="text-text-secondary text-sm font-medium">{label}</div>
    </motion.div>
  );
}

export default function About() {
  return (
    <Section id="about">
      <SectionTitle
        label="About Me"
        title="Who"
        highlight="Am I?"
        subtitle="A passionate developer bridging the gap between elegant code and intelligent systems."
      />

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left - Visual */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Avatar placeholder with glow */}
          <div className="relative w-72 h-72 mx-auto">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/20 to-transparent animate-glow-pulse" />
            <div className="relative glass-card rounded-2xl w-full h-full flex items-center justify-center overflow-hidden border border-accent/20">
              {/* Abstract code pattern */}
              <div className="absolute inset-0 opacity-10">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute font-mono text-accent text-xs"
                    style={{
                      left: `${(i % 4) * 25}%`,
                      top: `${Math.floor(i / 4) * 33}%`,
                    }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
                  >
                    {['<AI/>', '{code}', '(dev)', '[]=>{}', '<ML/>', 'fn()', '{}', '&&', '||', '=>', '...', '***'][i]}
                  </motion.div>
                ))}
              </div>

              {/* Initials */}
              <div className="relative z-10 text-center">
                <div className="font-display font-black text-7xl gradient-text glow-text">
                  AS
                </div>
                <div className="text-text-secondary text-sm font-mono mt-2">
                  Full Stack · AI/ML · DSA
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 glass-card px-4 py-2 border border-accent/30"
            >
              <div className="text-accent font-bold text-sm">CGPA: 8.65</div>
              <div className="text-text-secondary text-xs">B.Tech CSE</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute -top-4 -left-4 glass-card px-3 py-2 border border-green-500/30"
            >
              <div className="text-green-400 font-bold text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Open to Work
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right - Text content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <p className="text-text-secondary text-lg leading-relaxed">
            {personalInfo.about}
          </p>

          {/* Education card */}
          <div className="glass-card p-5 border-l-2 border-accent">
            <div className="flex items-start gap-4">
              <div className="text-3xl">{education.icon}</div>
              <div>
                <div className="text-accent font-bold text-sm font-mono uppercase tracking-wider mb-1">
                  Education
                </div>
                <div className="text-text-primary font-semibold">{education.institution}</div>
                <div className="text-text-secondary text-sm mt-1">{education.degree}</div>
                <div className="text-accent font-mono text-sm mt-1">CGPA: {education.cgpa} / 10</div>
              </div>
            </div>
          </div>

          {/* Quick info */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Location', value: personalInfo.location, icon: '📍' },
              { label: 'Status', value: 'Open to Work', icon: '✅' },
              { label: 'Focus', value: 'Full Stack + AI', icon: '🎯' },
              { label: 'Passion', value: 'Building Products', icon: '🚀' },
            ].map(({ label, value, icon }) => (
              <div key={label} className="glass-card p-3 flex items-center gap-3">
                <span className="text-xl">{icon}</span>
                <div>
                  <div className="text-text-secondary text-xs">{label}</div>
                  <div className="text-text-primary text-sm font-medium">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
      >
        {stats.map(s => (
          <StatCard key={s.label} {...s} />
        ))}
      </motion.div>
    </Section>
  );
}
