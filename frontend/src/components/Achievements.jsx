import { motion } from 'framer-motion';
import { Section, SectionTitle } from './UI';
import { achievements } from '../data/portfolio';

export default function Achievements() {
  return (
    <Section id="achievements">
      <SectionTitle
        label="Achievements"
        title="Awards &"
        highlight="Recognition"
        subtitle="Milestones that reflect my dedication to excellence and problem-solving."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {achievements.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-card p-6 group cursor-default border border-white/5 hover:border-opacity-40 transition-all duration-300 relative overflow-hidden"
            style={{ '--glow-color': item.color }}
          >
            {/* Background glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-[16px]"
              style={{ background: `radial-gradient(ellipse at center, ${item.color}, transparent)` }}
            />

            {/* Icon */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
              className="text-4xl mb-4"
            >
              {item.icon}
            </motion.div>

            {/* Content */}
            <h3
              className="font-display font-bold text-lg text-text-primary mb-1 group-hover:transition-colors duration-300"
              style={{ '--hover-color': item.color }}
            >
              <span className="group-hover:text-accent transition-colors duration-300">{item.title}</span>
            </h3>
            <p className="text-text-secondary text-sm">{item.org}</p>

            {/* Color accent bar */}
            <div
              className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
              style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
            />

            {/* Corner glow dot */}
            <div
              className="absolute top-3 right-3 w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity animate-pulse"
              style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}
            />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
