import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // Activation du mode sombre par classe
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Définition sémantique des couleurs
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        
        // Charte graphique personnalisée
        primary: {
          bg: 'hsl(var(--primary-bg))',        // Fond principal
          title: 'hsl(var(--primary-title))',     // Titres & blocs clés
          accent: 'hsl(var(--primary-accent))',    // Accents visuels
          secondary: 'hsl(var(--primary-secondary))', // Éléments secondaires
          emotion: 'hsl(var(--primary-emotion))',   // Icônes/Émotions
        },
        // Alias pour faciliter l'usage
        'bg-main': 'hsl(var(--primary-bg))',
        'blue-ink': 'hsl(var(--primary-title))',
        'mint-green': 'hsl(var(--primary-accent))',
        'gray-anthracite': 'hsl(var(--primary-secondary))',
        'orange-soft': 'hsl(var(--primary-emotion))',
        'dark-bg': 'hsl(var(--primary-dark-bg))', // Nouvelle couleur pour les fonds sombres
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
        'circuit-pulse': 'circuitPulse 2s ease-in-out infinite',
        'data-flow': 'dataFlow 3s linear infinite',
        'tech-glow': 'techGlow 2.5s ease-in-out infinite alternate',
        'neural-network': 'neuralNetwork 4s ease-in-out infinite',
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
        circuitPulse: {
          '0%, 100%': { 
            opacity: '0.4',
            transform: 'scale(1)',
            boxShadow: '0 0 0 0 rgba(0, 189, 164, 0.7)'
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(1.05)',
            boxShadow: '0 0 0 10px rgba(0, 189, 164, 0)'
          },
        },
        dataFlow: {
          '0%': { transform: 'translateX(-100%) rotate(0deg)' },
          '100%': { transform: 'translateX(100vw) rotate(360deg)' },
        },
        techGlow: {
          '0%': { 
            boxShadow: '0 0 5px rgba(6, 182, 212, 0.5), inset 0 0 5px rgba(6, 182, 212, 0.2)',
            borderColor: 'rgba(6, 182, 212, 0.3)'
          },
          '100%': { 
            boxShadow: '0 0 25px rgba(6, 182, 212, 0.8), inset 0 0 15px rgba(6, 182, 212, 0.4)',
            borderColor: 'rgba(6, 182, 212, 0.6)'
          },
        },
        neuralNetwork: {
          '0%, 100%': { 
            opacity: '0.3',
            transform: 'scale(0.95) rotate(0deg)'
          },
          '25%': { 
            opacity: '0.7',
            transform: 'scale(1.02) rotate(90deg)'
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(1.05) rotate(180deg)'
          },
          '75%': { 
            opacity: '0.7',
            transform: 'scale(1.02) rotate(270deg)'
          },
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