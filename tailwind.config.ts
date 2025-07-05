import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Charte graphique personnalisée
        primary: {
          bg: '#F2F5F7',        // Fond principal - Gris clair bleuté
          title: '#1B365D',     // Titres & blocs clés - Bleu encre
          accent: '#00BDA4',    // Accents visuels - Vert menthe doux
          secondary: '#414141', // Éléments secondaires - Gris anthracite
          emotion: '#FFAA5C',   // Icônes/Émotions - Orange doux
        },
        // Alias pour faciliter l'usage
        'bg-main': '#F2F5F7',
        'blue-ink': '#1B365D',
        'mint-green': '#00BDA4',
        'gray-anthracite': '#414141',
        'orange-soft': '#FFAA5C',
        // Variables CSS existantes
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        // Utilisation des variables CSS définies dans layout.tsx
        'title': ['var(--font-inter)', 'var(--font-roboto-slab)', 'serif'],
        'body': ['var(--font-open-sans)', 'sans-serif'],
        'italic': ['var(--font-nunito)', 'sans-serif'],
      },
      borderWidth: {
        '3': '3px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 189, 164, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 189, 164, 0.8)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config 