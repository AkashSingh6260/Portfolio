import { motion } from 'framer-motion';
import { Section, SectionTitle } from './UI';
import { socialLinks } from '../data/portfolio';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode, SiCodechef } from 'react-icons/si';

const profiles = [
  {
    id: 'github',
    name: 'GitHub',
    handle: '@AkashSingh6260',
    href: socialLinks.github,
    icon: FaGithub,
    color: '#ffffff',
    bg: 'from-gray-800/40 to-gray-900/40',
    border: 'border-gray-600/30',
    hoverBorder: 'hover:border-gray-400/60',
    stats: [
      { label: 'Repositories', value: '20+' },
      { label: 'Projects', value: '10+' },
    ],
    desc: 'Open-source projects, MERN apps, AI systems and more.',
    badge: 'Active',
    badgeColor: '#22c55e',
  },
  {
    id: 'leetcode',
    name: 'LeetCode',
    handle: 'AkashSingh6260',
    href: socialLinks.leetcode,
    icon: SiLeetcode,
    color: '#ffa116',
    bg: 'from-orange-500/10 to-yellow-600/5',
    border: 'border-orange-500/20',
    hoverBorder: 'hover:border-orange-400/60',
    stats: [
      { label: 'Problems Solved', value: '200+' },
      { label: 'Streak', value: 'Active' },
    ],
    desc: 'Consistent DSA practice with focus on dynamic programming, graphs, and trees.',
    badge: '200+ Solved',
    badgeColor: '#ffa116',
  },
  {
    id: 'codechef',
    name: 'CodeChef',
    handle: 'akashsingh6260',
    href: socialLinks.codechef,
    icon: SiCodechef,
    color: '#b07e57',
    bg: 'from-amber-700/10 to-stone-600/5',
    border: 'border-amber-700/20',
    hoverBorder: 'hover:border-amber-500/60',
    stats: [
      { label: 'Rating', value: '2-Star' },
      { label: 'Contests', value: 'Active' },
    ],
    desc: 'Regular participant in rated contests. Achieved 2-star rating.',
    badge: '2★ Coder',
    badgeColor: '#b07e57',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Akash Singh',
    href: socialLinks.linkedin,
    icon: FaLinkedin,
    color: '#0a66c2',
    bg: 'from-blue-600/10 to-blue-900/5',
    border: 'border-blue-600/20',
    hoverBorder: 'hover:border-blue-400/60',
    stats: [
      { label: 'Connections', value: '500+' },
      { label: 'Posts', value: 'Active' },
    ],
    desc: 'Professional network, achievements, experience and thought leadership.',
    badge: 'Connect',
    badgeColor: '#0a66c2',
  },
];

export default function CodingProfiles() {
  return (
    <Section id="profiles" className="bg-bg-secondary/40">
      <SectionTitle
        label="Online Presence"
        title="Coding"
        highlight="Profiles"
        subtitle="Find me across competitive programming and professional networking platforms."
      />

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {profiles.map((profile, i) => {
          const Icon = profile.icon;
          return (
            <motion.a
              key={profile.id}
              href={profile.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`glass-card p-6 border bg-gradient-to-br group block transition-all duration-300 ${profile.bg} ${profile.border} ${profile.hoverBorder}`}
            >
              {/* Icon + badge */}
              <div className="flex items-start justify-between mb-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${profile.color}15`, border: `1px solid ${profile.color}30` }}
                >
                  <Icon style={{ color: profile.color }} className="text-2xl" />
                </motion.div>
                <span
                  className="text-xs font-mono px-2.5 py-1 rounded-full border font-bold"
                  style={{ color: profile.badgeColor, borderColor: `${profile.badgeColor}40`, background: `${profile.badgeColor}10` }}
                >
                  {profile.badge}
                </span>
              </div>

              {/* Name & handle */}
              <h3 className="font-display font-bold text-text-primary text-lg mb-0.5 group-hover:text-accent transition-colors duration-300">
                {profile.name}
              </h3>
              <div className="font-mono text-xs text-text-secondary mb-3">{profile.handle}</div>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed mb-4">{profile.desc}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5">
                {profile.stats.map(s => (
                  <div key={s.label}>
                    <div className="font-bold text-sm" style={{ color: profile.color }}>{s.value}</div>
                    <div className="text-text-secondary text-xs">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Hover arrow */}
              <div className="flex items-center gap-1 mt-4 text-xs font-mono text-text-secondary group-hover:text-accent transition-colors duration-300">
                Visit Profile
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </Section>
  );
}
