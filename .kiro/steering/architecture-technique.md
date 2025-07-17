---
inclusion: fileMatch
fileMatchPattern: 'src/**/*'
---

# Architecture Technique - Laurent Serre Développement

## Stack technique

### Core Framework
- **Next.js 15** avec App Router (dernière version)
- **TypeScript** pour la robustesse du code
- **React 19** avec les dernières fonctionnalités

### Styling & UI
- **Tailwind CSS 3.4** avec configuration personnalisée
- **Framer Motion 12** pour les animations avancées
- **Lucide React** pour les icônes
- **Swiper** pour les carrousels

### Structure des dossiers
```
src/
├── app/                    # App Router Next.js 15
│   ├── globals.css        # Styles globaux + variables CSS
│   ├── layout.tsx         # Layout principal avec fonts
│   ├── page.tsx          # Page d'accueil
│   ├── sitemap.ts        # Sitemap dynamique
│   ├── robots.ts         # Robots.txt dynamique
│   └── [pages]/          # Pages du cocon sémantique
└── components/
    ├── ui/               # Composants UI réutilisables
    ├── layout/           # Header, Footer, Navigation
    └── features/         # Composants métier spécifiques
```

## Configuration Next.js

### Optimisations de performance
```typescript
// next.config.ts - Points clés
experimental: {
  inlineCss: true,        // CSS inline pour réduire les requêtes
},
images: {
  formats: ['image/avif', 'image/webp'], // Formats modernes
  minimumCacheTTL: 60 * 60 * 24 * 365,  // Cache 1 an
},
compiler: {
  removeConsole: process.env.NODE_ENV === 'production', // Nettoyage prod
}
```

### Headers de sécurité et performance
- **X-Frame-Options**: DENY
- **X-Content-Type-Options**: nosniff
- **Cache-Control**: Agressif pour les assets statiques
- **Vary**: Accept pour les images optimisées

## Tailwind Configuration

### Charte graphique intégrée
```css
colors: {
  primary: {
    bg: '#F2F5F7',        // Fond principal
    title: '#1B365D',     // Bleu encre pour titres
    accent: '#00BDA4',    // Vert menthe pour accents
    secondary: '#414141', // Gris anthracite
    emotion: '#FFAA5C',   // Orange doux pour émotions
  }
}
```

### Animations personnalisées
- `animate-fade-in-up` : Apparition depuis le bas
- `animate-slide-in-left/right` : Glissements latéraux
- `animate-bounce-in` : Apparition avec rebond
- `animate-float` : Effet de flottement
- `animate-glow` : Effet de lueur pour les CTA

### Typographie système
```css
fontFamily: {
  'title': ['var(--font-inter)', 'var(--font-roboto-slab)', 'serif'],
  'body': ['var(--font-open-sans)', 'sans-serif'],
  'italic': ['var(--font-nunito)', 'sans-serif'],
}
```

## Bonnes pratiques de développement

### Composants
- **Composants fonctionnels** avec hooks
- **TypeScript strict** pour tous les props
- **Responsive design** mobile-first
- **Accessibilité** (alt text, aria-labels)

### Performance
- **Images Next.js** avec lazy loading automatique
- **Attribut priority** sur images LCP
- **Dimensions spécifiées** pour éviter CLS
- **Compression automatique** des assets

### SEO intégré
- **Métadonnées dynamiques** par page
- **Schema.org** structuré (Person, ProfessionalService, Article)
- **Open Graph + Twitter Cards** automatiques
- **Sitemap dynamique** avec priorités

## Patterns de code recommandés

### Structure d'une page
```typescript
// app/ma-page/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Titre optimisé SEO",
  description: "Description 150 caractères max",
  // ... autres métadonnées
}

export default function MaPage() {
  return (
    <main className="min-h-screen bg-primary-bg">
      {/* Contenu avec classes Tailwind personnalisées */}
    </main>
  )
}
```

### Composant réutilisable
```typescript
// components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
}

export function Button({ variant = 'primary', size = 'md', children, onClick }: ButtonProps) {
  const baseClasses = "font-semibold rounded-lg transition-all duration-200"
  const variantClasses = {
    primary: "bg-primary-accent text-white hover:bg-primary-accent/90",
    secondary: "bg-primary-secondary text-white hover:bg-primary-secondary/90"
  }
  // ...
}
```

## Intégrations externes

### HubSpot
- Formulaires intégrés via script
- Tracking des conversions
- Lead magnets connectés

### Analytics
- Google Analytics 4 ready
- Search Console intégration
- Core Web Vitals monitoring

## Déploiement

### Vercel (recommandé)
- Build automatique sur push
- Preview deployments
- Edge functions support
- Image optimization native

### Variables d'environnement
```bash
# .env.local
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your_portal_id
HUBSPOT_API_KEY=your_api_key
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
```

## Maintenance et évolution

### Tests recommandés
- **Lighthouse** pour les performances
- **Wave** pour l'accessibilité
- **Google Rich Results Test** pour le SEO

### Monitoring
- **Core Web Vitals** via Search Console
- **Uptime monitoring** (UptimeRobot)
- **Error tracking** (Sentry recommandé)