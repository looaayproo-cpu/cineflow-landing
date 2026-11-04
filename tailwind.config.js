const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        surface: {
          DEFAULT: 'var(--surface-card)',
          hover: 'var(--surface-card-hover)',
          muted: 'var(--surface-muted)',
          timeline: 'var(--surface-timeline)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          highlight: 'var(--border-highlight)',
          glow: 'var(--border-glow)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        pr: {
          DEFAULT: 'var(--accent-pr)',
          glow: 'var(--accent-pr-glow)',
        },
        ae: {
          DEFAULT: 'var(--accent-ae)',
          glow: 'var(--accent-ae-glow)',
        },
        ai: {
          DEFAULT: 'var(--accent-ai)',
          glow: 'var(--accent-ai-glow)',
        },
        accent: {
          DEFAULT: 'var(--accent-primary)',
          hover: 'var(--accent-primary-hover)',
          glow: 'var(--accent-primary-glow)',
        },
      },
      fontFamily: {
        en: ['var(--font-plus-jakarta)', 'sans-serif'],
        ar: ['var(--font-cairo)', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        'marquee-horizontal': 'marquee var(--duration, 35s) linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('light', ':is(.light &)');
    }),
  ],
};
