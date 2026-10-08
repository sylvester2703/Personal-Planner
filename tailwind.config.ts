import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--canvas-bg)',
        surface: {
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
          elevated: 'var(--surface-elevated)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          accent: 'var(--border-accent)',
          strong: 'var(--border-strong)',
        },
        text: {
          primary: 'var(--text-primary)',
          muted: 'var(--text-muted)',
          secondary: 'var(--text-secondary)',
        },
        semantic: {
          emerald: {
            text: 'var(--semantic-emerald-text)',
            bg: 'var(--semantic-emerald-bg)',
            border: 'var(--semantic-emerald-border)',
          },
          rose: {
            text: 'var(--semantic-rose-text)',
            bg: 'var(--semantic-rose-bg)',
            border: 'var(--semantic-rose-border)',
          },
          sky: {
            text: 'var(--semantic-sky-text)',
            bg: 'var(--semantic-sky-bg)',
            border: 'var(--semantic-sky-border)',
          },
          amber: {
            text: 'var(--semantic-amber-text)',
            bg: 'var(--semantic-amber-bg)',
            border: 'var(--semantic-amber-border)',
          },
          purple: {
            text: 'var(--semantic-purple-text)',
            bg: 'var(--semantic-purple-bg)',
            border: 'var(--semantic-purple-border)',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'subtle-glow': '0 0 20px -5px rgba(255, 255, 255, 0.05)',
        'card-elevated': '0 4px 20px -2px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;

