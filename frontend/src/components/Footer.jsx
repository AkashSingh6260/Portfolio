import { motion } from 'framer-motion';
import { personalInfo, socialLinks } from '../data/portfolio';
import { FaGithub, FaLinkedin, FaHeart, FaCode } from 'react-icons/fa';
import { SiLeetcode, SiCodechef } from 'react-icons/si';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { icon: FaGithub, href: socialLinks.github, label: 'GitHub' },
  { icon: FaLinkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
  { icon: SiLeetcode, href: socialLinks.leetcode, label: 'LeetCode' },
  { icon: SiCodechef, href: socialLinks.codechef, label: 'CodeChef' },
];

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-bg-secondary border-t border-white/5 overflow-hidden">
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      {/* Glow behind footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="font-display font-black text-3xl mb-3">
              <span className="gradient-text">Akash</span>
              <span className="text-text-primary"> Singh</span>
              <span className="text-accent">.</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-4 max-w-xs">
              {personalInfo.tagline}
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.2, y: -2, color: '#ffb400' }}
                  className="w-9 h-9 glass-card border border-white/10 hover:border-accent/40 flex items-center justify-center text-text-secondary hover:text-accent transition-all duration-300 text-base"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-text-primary font-bold mb-4 font-mono text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-text-secondary hover:text-accent transition-colors text-sm animated-underline"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-text-primary font-bold mb-4 font-mono text-sm uppercase tracking-wider">
              Get In Touch
            </h4>
            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors text-sm group"
              >
                <span className="text-accent">✉</span>
                <span className="animated-underline">{personalInfo.email}</span>
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors text-sm"
              >
                <span className="text-accent">☎</span>
                <span>{personalInfo.phone}</span>
              </a>
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <span className="text-accent">📍</span>
                <span>{personalInfo.location}</span>
              </div>
            </div>

            {/* Status */}
            <div className="mt-6 flex items-center gap-2 glass-card px-3 py-2 border border-green-500/20 w-fit">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-400 text-xs font-mono">Available for work</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <span>Made with</span>
            <FaHeart className="text-red-500 animate-pulse" />
            <span>&</span>
            <FaCode className="text-accent" />
            <span>by</span>
            <span className="text-accent font-bold">Akash Singh</span>
          </div>

          <div className="text-text-secondary text-xs font-mono">
            © {new Date().getFullYear()} · All rights reserved
          </div>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="glass-card border border-accent/20 hover:border-accent w-10 h-10 flex items-center justify-center text-accent hover:bg-accent/10 transition-all duration-300 text-lg"
            aria-label="Back to top"
          >
            ↑
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
