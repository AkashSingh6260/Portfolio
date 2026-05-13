import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { personalInfo, socialLinks } from '../data/portfolio';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import ThreeScene from './ThreeScene';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden grid-overlay">

      {/* CSS animated orbital sphere — right side */}
      <div className="absolute right-0 top-0 w-full md:w-1/2 h-full pointer-events-none opacity-80">
        <ThreeScene />
      </div>

      {/* Gradient fade so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 md:via-bg/70 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent pointer-events-none" />

      {/* Ambient glow blob */}
      <div
        className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #ffb400 0%, transparent 70%)' }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-3xl">

          {/* Available badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2.5 glass-card px-4 py-2 rounded-full border border-green-500/25 text-sm font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-text-secondary">Available for full-time opportunities</span>
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p variants={itemVariants} className="font-mono text-accent text-base md:text-lg tracking-widest mb-3">
            &lt; Hello World /&gt;
          </motion.p>

          {/* Name headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-black text-text-primary mb-5 leading-none"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}
          >
            I'm{' '}
            <span className="gradient-text" style={{ textShadow: '0 0 40px rgba(255,180,0,0.3)' }}>
              {personalInfo.name}
            </span>
          </motion.h1>

          {/* Animated role typing */}
          <motion.div variants={itemVariants} className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-text-secondary text-lg md:text-2xl font-display">A passionate</span>
            <TypeAnimation
              sequence={personalInfo.roles.flatMap(r => [r, 2200])}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-lg md:text-2xl font-display font-bold text-accent-light"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-text-secondary text-base md:text-lg max-w-xl mb-10 leading-relaxed"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
            <motion.button
              id="hero-view-work"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(255,180,0,0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent text-bg font-bold px-8 py-4 rounded-full text-sm md:text-base hover:bg-accent-light transition-all duration-300 shadow-glow"
            >
              View My Work →
            </motion.button>
            <motion.button
              id="hero-contact"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card border border-accent/30 text-accent font-bold px-8 py-4 rounded-full text-sm md:text-base hover:bg-accent/10 hover:border-accent transition-all duration-300"
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants} className="flex items-center gap-5">
            <span className="text-text-secondary text-xs font-mono hidden sm:block tracking-widest">// FIND ME ON</span>
            {[
              { icon: FaGithub,  href: socialLinks.github,   label: 'GitHub' },
              { icon: FaLinkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
              { icon: SiLeetcode, href: socialLinks.leetcode, label: 'LeetCode' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.25, y: -3 }}
                className="text-text-secondary hover:text-accent transition-all text-2xl"
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <span className="text-text-secondary text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-accent to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          style={{ originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
