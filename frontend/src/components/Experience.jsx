import { motion } from 'framer-motion';
import { Section, SectionTitle } from './UI';
import { experience } from '../data/portfolio';

export default function Experience() {
  return (
    <Section id="experience" className="bg-bg-secondary/40">
      <SectionTitle
        label="Experience"
        title="My"
        highlight="Journey"
        subtitle="Roles and responsibilities that shaped my professional growth."
      />

      <div className="relative max-w-3xl mx-auto">
        {/* Vertical timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/30 to-transparent" />

        <div className="space-y-10 relative">
          {experience.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex gap-8 group"
            >
              {/* Timeline dot */}
              <div className="relative flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  className="w-12 h-12 rounded-full glass-card border border-accent/30 flex items-center justify-center text-xl z-10 relative transition-all duration-300 group-hover:border-accent group-hover:shadow-glow"
                >
                  {item.icon}
                </motion.div>
                {/* Glow ring on hover */}
                <div className="absolute inset-0 rounded-full bg-accent/10 scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
              </div>

              {/* Content */}
              <motion.div
                whileHover={{ x: 5 }}
                className="glass-card p-6 flex-1 border border-white/5 group-hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-display font-bold text-xl text-text-primary group-hover:text-accent transition-colors duration-300">
                      {item.role}
                    </h3>
                    <div className="text-accent font-medium text-sm mt-0.5">{item.org}</div>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent-light">
                    {item.type}
                  </span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mt-2">{item.description}</p>

                {/* Bottom accent */}
                <div className="mt-4 h-px bg-gradient-to-r from-accent/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
