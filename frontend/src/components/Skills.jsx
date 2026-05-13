import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section, SectionTitle } from './UI';
import { skills } from '../data/portfolio';

const categoryIcons = {
  Languages: '{ }',
  Frontend: '🎨',
  Backend: '⚙️',
  Databases: '🗄️',
  'AI / ML': '🧠',
  'Tools & DevOps': '🛠️',
  'Core CS': '📚',
};

const categoryColors = {
  Languages: 'from-yellow-500/20 to-amber-600/10 border-yellow-500/30',
  Frontend: 'from-blue-500/20 to-cyan-600/10 border-blue-500/30',
  Backend: 'from-green-500/20 to-emerald-600/10 border-green-500/30',
  Databases: 'from-purple-500/20 to-violet-600/10 border-purple-500/30',
  'AI / ML': 'from-red-500/20 to-orange-600/10 border-red-500/30',
  'Tools & DevOps': 'from-gray-500/20 to-slate-600/10 border-gray-500/30',
  'Core CS': 'from-accent/20 to-amber-600/10 border-accent/30',
};

export default function Skills() {
  const [hovered, setHovered] = useState(null);

  return (
    <Section id="skills" className="bg-bg-secondary/40">
      <SectionTitle
        label="Technical Skills"
        title="My Tech"
        highlight="Arsenal"
        subtitle="Technologies and tools I use to build impactful products."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Object.entries(skills).map(([category, items], catIdx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: catIdx * 0.08 }}
            whileHover={{ y: -5 }}
            onHoverStart={() => setHovered(category)}
            onHoverEnd={() => setHovered(null)}
            className={`relative glass-card p-5 border bg-gradient-to-br transition-all duration-300 ${categoryColors[category] || 'from-white/5 border-white/10'} ${hovered === category ? 'shadow-glow' : ''}`}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-base">
                {categoryIcons[category] || '⚡'}
              </div>
              <h3 className="font-display font-bold text-text-primary text-sm">{category}</h3>
            </div>

            {/* Skill items */}
            <div className="flex flex-wrap gap-2">
              {items.map((skill, idx) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIdx * 0.08 + idx * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="skill-badge"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Glow orb on hover */}
            {hovered === category && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent shadow-glow"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Tech stack marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-16 overflow-hidden"
      >
        <div className="text-center text-text-secondary text-sm font-mono mb-6 uppercase tracking-widest">
          // Tech I work with daily
        </div>
        <div className="flex gap-8 overflow-hidden">
          {[
            ['React', 'Node.js', 'Python', 'MongoDB', 'Docker', 'BERT', 'FastAPI', 'Redux'],
            ['TypeScript', 'Express', 'MySQL', 'Git', 'Linux', 'TensorFlow', 'FAISS', 'LLaMA'],
          ].map((row, ri) => (
            <motion.div
              key={ri}
              className="flex gap-8 shrink-0"
              animate={{ x: ri % 2 === 0 ? [0, -1200] : [-1200, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              {[...row, ...row].map((tech, i) => (
                <div
                  key={i}
                  className="px-4 py-2 glass-card text-text-secondary text-sm font-mono whitespace-nowrap border border-accent/10"
                >
                  {tech}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
