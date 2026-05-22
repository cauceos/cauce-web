// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        teal: {
          300: '#90E8E1', 400: '#5EDDD0', 500: '#2DD4C0', 600: '#1BB8A6',
        },
        moss: {
          300: '#96C9A6', 400: '#6FAF82', 500: '#4E8B62', 600: '#3A6B4A',
        },
        slate: {
          400: '#8AB4CC', 500: '#5A8CAB', 600: '#3D6B8A',
        },
        stone: {
          100: '#ECEEE8', 200: '#D4D5CC', 400: '#8C8D82',
          600: '#4A4B42', 700: '#35362E', 800: '#252620',
          900: '#161713', 950: '#0E0F0D',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body:    ['Geist', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      maxWidth: {
        content: '1160px',
      },
      letterSpacing: {
        eyebrow: '0.25em',
      },
    },
  },
}
