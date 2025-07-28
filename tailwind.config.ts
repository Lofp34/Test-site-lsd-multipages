import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: false,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-ink': 'hsl(var(--blue-ink))',
        'mint-green': 'hsl(var(--mint-green))',
        'orange-soft': 'hsl(var(--orange-soft))',
        'gray-anthracite': 'hsl(var(--gray-anthracite))',
        'primary-bg': 'hsl(var(--primary-bg))',
        'primary-title': 'hsl(var(--primary-title))',
        'primary-accent': 'hsl(var(--primary-accent))',
        'primary-secondary': 'hsl(var(--primary-secondary))',
        'primary-emotion': 'hsl(var(--primary-emotion))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        
        // Couleurs spécifiques négociation
        'negotiation-primary': 'hsl(var(--negotiation-primary))',
        'negotiation-secondary': 'hsl(var(--negotiation-secondary))',
        'negotiation-accent': 'hsl(var(--negotiation-accent))',
        'negotiation-bg': 'hsl(var(--negotiation-bg))',
        'negotiation-surface': 'hsl(var(--negotiation-surface))',
      },
      fontFamily: {
        'inter': ['var(--font-inter)', 'sans-serif'],
        'open-sans': ['var(--font-open-sans)', 'sans-serif'],
        'nunito': ['var(--font-nunito)', 'sans-serif'],
        'roboto-slab': ['var(--font-roboto-slab)', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        
        // Animations spécifiques négociation
        'negotiation-pulse': 'negotiationPulse 2s ease-in-out infinite',
        'negotiation-glow': 'negotiationGlow 3s ease-in-out infinite',
        'negotiation-slide-in': 'negotiationSlideIn 0.6s ease-out',
        'negotiation-fade-up': 'negotiationFadeUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        
        // Keyframes spécifiques négociation
        negotiationPulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' },
        },
        negotiationGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(220, 38, 38, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(220, 38, 38, 0.6), 0 0 30px rgba(234, 88, 12, 0.3)' },
        },
        negotiationSlideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        negotiationFadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config 