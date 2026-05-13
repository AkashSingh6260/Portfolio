import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, SectionTitle } from './UI';
import { projects } from '../data/portfolio';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

function ProjectCard({ project, index }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group relative"
    >
      <div
        className={`relative glass-card overflow-hidden transition-all duration-500 cursor-pointer border border-transparent hover:border-opacity-40`}
        style={{ '--hover-color': project.color }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        {/* Top accent bar */}
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
        />

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {project.featured && (
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded-full border"
                    style={{ color: project.color, borderColor: `${project.color}40`, background: `${project.color}10` }}
                  >
                    ★ Featured
                  </span>
                )}
              </div>
              <h3 className="font-display font-black text-2xl text-text-primary group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-text-secondary text-sm mt-1 font-medium">{project.subtitle}</p>
            </div>
            <div className="flex gap-3">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: '#ffb400' }}
                className="text-text-secondary hover:text-accent transition-colors text-xl"
                onClick={e => e.stopPropagation()}
              >
                <FaGithub />
              </motion.a>
            </div>
          </div>

          {/* Description */}
          <p className="text-text-secondary leading-relaxed mb-6">{project.description}</p>

          {/* Features */}
          <AnimatePresence>
            {flipped && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 overflow-hidden"
              >
                <div className="text-xs font-mono text-accent uppercase tracking-wider mb-3">
                  Key Features
                </div>
                <ul className="space-y-1.5">
                  {project.features.map((f, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2 text-text-secondary text-sm"
                    >
                      <span style={{ color: project.color }} className="mt-0.5 shrink-0">▸</span>
                      {f}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map(tech => (
              <span
                key={tech}
                className="text-xs font-mono px-2.5 py-1 rounded-full border"
                style={{
                  color: project.color,
                  borderColor: `${project.color}30`,
                  background: `${project.color}08`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom glow line on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: flipped ? 1 : 0, opacity: flipped ? 1 : 0 }}
        />
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <Section id="projects">
      <SectionTitle
        label="My Work"
        title="Featured"
        highlight="Projects"
        subtitle="Real-world applications built with modern tech stacks and AI integration."
      />

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* More projects CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <motion.a
          href="https://github.com/AkashSingh6260"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 glass-card border border-accent/20 text-accent font-bold px-8 py-4 rounded-full hover:border-accent hover:bg-accent/10 transition-all duration-300"
        >
          <FaGithub className="text-xl" />
          View All Projects on GitHub
          <FaExternalLinkAlt className="text-sm" />
        </motion.a>
      </motion.div>
    </Section>
  );
}
