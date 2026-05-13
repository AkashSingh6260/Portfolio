/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0d0f1a',
        'bg-secondary': '#151826',
        accent: '#ffb400',
        'accent-light': '#ffd166',
        'accent-dark': '#cc9000',
        'text-primary': '#f0f0f0',
        'text-secondary': '#8892a4',
        'border-glow': 'rgba(255,180,0,0.3)',
        'glass': 'rgba(21,24,38,0.8)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'radial-gradient(ellipse at 20% 50%, rgba(255,180,0,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(255,180,0,0.08) 0%, transparent 50%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slideUp': 'slideUp 0.6s ease forwards',
        'fadeIn': 'fadeIn 0.8s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(255,180,0,0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(255,180,0,0.7), 0 0 60px rgba(255,180,0,0.3)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255,180,0,0.3)',
        'glow-lg': '0 0 40px rgba(255,180,0,0.4)',
        'card': '0 8px 32px rgba(0,0,0,0.4)',
        'inner-glow': 'inset 0 0 20px rgba(255,180,0,0.1)',
      },
    },
  },
  plugins: [],
}
