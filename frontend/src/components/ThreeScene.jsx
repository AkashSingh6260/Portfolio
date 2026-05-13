import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Renders a pure-CSS animated sphere with orbiting rings.
 * Zero Three.js — zero WebGL crash risk.
 */
export default function ThreeScene() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-80 h-80 md:w-[420px] md:h-[420px]">
        {/* Outer orbiting rings */}
        {[
          { size: 420, duration: 18, rotate: '0deg', color: 'rgba(255,180,0,0.08)' },
          { size: 340, duration: 14, rotate: '60deg', color: 'rgba(255,180,0,0.12)' },
          { size: 260, duration: 10, rotate: '120deg', color: 'rgba(255,140,66,0.1)' },
          { size: 190, duration: 7, rotate: '45deg', color: 'rgba(255,209,102,0.12)' },
        ].map((ring, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: ring.size,
              height: ring.size,
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              borderColor: ring.color,
              borderWidth: 1,
              rotateX: ring.rotate,
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: ring.duration, repeat: Infinity, ease: 'linear' }}
          />
        ))}

        {/* Central glowing core */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 120,
            height: 120,
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
            background: 'radial-gradient(circle, rgba(255,180,0,0.18) 0%, rgba(255,140,0,0.06) 60%, transparent 100%)',
            boxShadow: '0 0 60px rgba(255,180,0,0.15), 0 0 120px rgba(255,180,0,0.08)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating tech dots */}
        {[
          { angle: 0, radius: 160, label: 'React', duration: 20 },
          { angle: 60, radius: 140, label: 'AI/ML', duration: 17 },
          { angle: 120, radius: 170, label: 'Node', duration: 23 },
          { angle: 180, radius: 150, label: 'MERN', duration: 19 },
          { angle: 240, radius: 165, label: 'DSA', duration: 21 },
          { angle: 300, radius: 145, label: 'Docker', duration: 16 },
        ].map((dot, i) => {
          const rad = (dot.angle * Math.PI) / 180;
          const x = Math.cos(rad) * dot.radius;
          const y = Math.sin(rad) * dot.radius;
          return (
            <motion.div
              key={i}
              className="absolute flex items-center justify-center"
              style={{
                width: 52,
                height: 52,
                top: '50%',
                left: '50%',
                x: x - 26,
                y: y - 26,
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: dot.duration, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
            >
              <motion.div
                className="w-10 h-10 rounded-full glass-card border border-accent/20 flex items-center justify-center text-xs font-mono text-accent/70"
                animate={{ rotate: [0, -360] }}
                transition={{ duration: dot.duration, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
                whileHover={{ scale: 1.3, borderColor: 'rgba(255,180,0,0.8)' }}
              >
                {dot.label}
              </motion.div>
            </motion.div>
          );
        })}

        {/* Center initials */}
        <motion.div
          className="absolute font-display font-black gradient-text select-none"
          style={{
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
            fontSize: '2.5rem',
            textShadow: '0 0 40px rgba(255,180,0,0.4)',
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          AS
        </motion.div>
      </div>
    </div>
  );
}
