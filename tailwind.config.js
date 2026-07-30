/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#FFF8F5',
          surface: '#FFFFFF',
          textPrimary: '#2A1B2D',
          textSecondary: '#7A6B7D',
          accent: '#E0116D',
          accentSoft: '#C9A0DC',
          blush: '#FCE4EC',
        },
        dark: {
          bg: '#1A0F1F',
          surface: '#251530',
          textPrimary: '#F5E9F7',
          textSecondary: '#B49BC0',
          accent: '#FF2E9F',
          accentAlt: '#B565F5',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(255, 46, 159, 0.45)',
        glowLg: '0 0 40px rgba(255, 46, 159, 0.35)',
        soft: '0 4px 24px rgba(224, 17, 109, 0.08)',
      },
      backdropBlur: {
        glass: '16px',
      },
      backgroundImage: {
        'gradient-signature': 'linear-gradient(135deg, #FF2E9F 0%, #B565F5 100%)',
        'gradient-signature-soft': 'linear-gradient(135deg, #E0116D 0%, #C9A0DC 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        glowPulse: 'glowPulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
