/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface:    'var(--surface)',
        card:       'var(--card)',
        primary:    'var(--primary)',
        accent:     'var(--accent)',
        foreground: 'var(--foreground)',
        muted:      'var(--muted)',
        border:     'var(--border)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%':      { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%':      { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
      },
      animation: {
        fadeUp:  'fadeUp 0.6s ease forwards',
        shimmer: 'shimmer 3s linear infinite',
        blob:    'blob 7s infinite',
      },
    },
  },
  plugins: [],
};
