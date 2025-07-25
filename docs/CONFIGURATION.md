# Configuration - Laurent Serre Développement

Guide complet de configuration pour le projet Laurent Serre Développement.

## 🎨 Configuration Tailwind CSS

### Charte graphique intégrée

Le projet utilise un système de couleurs cohérent basé sur la charte graphique de Laurent Serre :

```typescript
// tailwind.config.ts - Couleurs principales
colors: {
  'blue-ink': 'hsl(var(--blue-ink))',           // #1B365D - Bleu encre pour titres
  'mint-green': 'hsl(var(--mint-green))',       // #00BDA4 - Vert menthe pour accents
  'orange-soft': 'hsl(var(--orange-soft))',     // #FFAA5C - Orange doux pour émotions
  'gray-anthracite': 'hsl(var(--gray-anthracite))', // #414141 - Gris anthracite
  'primary-bg': 'hsl(var(--primary-bg))',       // #F2F5F7 - Fond principal
}
```

### Variables CSS globales

Définies dans `src/app/globals.css` :

```css
:root {
  --blue-ink: 210 60% 23%;        /* #1B365D */
  --mint-green: 172 100% 37%;     /* #00BDA4 */
  --orange-soft: 32 100% 67%;     /* #FFAA5C */
  --gray-anthracite: 0 0% 25%;    /* #414141 */
  --primary-bg: 200 20% 96%;      /* #F2F5F7 */
  --primary-title: 210 60% 23%;   /* #1B365D */
  --primary-accent: 172 100% 37%; /* #00BDA4 */
  --primary-secondary: 0 0% 25%;  /* #414141 */
  --primary-emotion: 32 100% 67%; /* #FFAA5C */
}
```

### Typographie système

```typescript
fontFamily: {
  'inter': ['var(--font-inter)', 'sans-serif'],           // Titres principaux
  'open-sans': ['var(--font-open-sans)', 'sans-serif'],   // Corps de texte
  'nunito': ['var(--font-nunito)', 'sans-serif'],         // Texte italique
  'roboto-slab': ['var(--font-roboto-slab)', 'serif'],    // Titres serif
}
```

### Animations personnalisées

```typescript
animation: {
  'fade-in': 'fadeIn 0.5s ease-in-out',
  'slide-up': 'slideUp 0.5s ease-out',
  'bounce-in': 'bounceIn 0.6s ease-out',
  'float': 'float 3s ease-in-out infinite',
  'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
}
```

## ⚙️ Configuration Next.js

### Optimisations de performance

```typescript
// next.config.ts - Configuration principale
const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true, // CSS inline pour réduire les requêtes
  },
  
  // Optimisations d'images agressives
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 an
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'laurentserre.com',
      },
    ],
  },
  
  // Optimisations de production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}
```

### Headers de sécurité et performance

```typescript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
    {
      source: '/images/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        { key: 'Vary', value: 'Accept' },
      ],
    },
  ]
}
```

### Redirections automatiques

```typescript
// src/config/redirects.ts
export const allRedirects = [
  {
    source: '/old-page',
    destination: '/new-page',
    permanent: true,
  },
  // ... autres redirections
]
```

## 🔧 Configuration TypeScript

### Configuration stricte

```json
// tsconfig.json - Points clés
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### Alias de chemins

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/data/*": ["./src/data/*"],
      "@/hooks/*": ["./src/hooks/*"]
    }
  }
}
```

## 🧪 Configuration des tests

### Vitest setup

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Setup des tests

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})
```

## 🔍 Configuration SEO

### Sitemap dynamique

```typescript
// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://laurentserre.com'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/expert-developpement-commercial-pme`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95, // Page cible principale
    },
    // ... autres pages avec priorités SEO
  ]
}
```

### Robots.txt dynamique

```typescript
// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'],
    },
    sitemap: 'https://laurentserre.com/sitemap.xml',
  }
}
```

## 🌐 Variables d'environnement

### Développement (.env.local)

```bash
# HubSpot Configuration
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your_portal_id
HUBSPOT_API_KEY=your_api_key

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Environnement
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Production (Vercel)

```bash
# Variables configurées via l'interface Vercel
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=production_portal_id
HUBSPOT_API_KEY=production_api_key
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-PRODUCTION_ID
NEXT_PUBLIC_SITE_URL=https://laurentserre.com
```

## 📦 Configuration des dépendances

### Dépendances principales

```json
{
  "dependencies": {
    "next": "15.3.3",              // Framework React
    "react": "^19.0.0",            // Bibliothèque UI
    "typescript": "^5",            // Typage statique
    "tailwindcss": "^3.4.17",     // Framework CSS
    "framer-motion": "^12.18.1",   // Animations
    "lucide-react": "^0.517.0",    // Icônes
    "next-themes": "^0.4.6",       // Gestion des thèmes
    "zod": "^4.0.5"               // Validation de schémas
  }
}
```

### Scripts personnalisés

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "postbuild": "next-sitemap",
    "test": "vitest",
    "test:coverage": "vitest run --coverage",
    "validate:links": "tsx src/scripts/validate-links.ts",
    "test:seo": "vitest run src/__tests__/seo",
    "test:performance": "vitest run src/__tests__/performance"
  }
}
```

## 🚀 Configuration de déploiement

### Vercel

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["cdg1"],
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### GitHub Actions (CI/CD)

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test:run
      - run: npm run build
```

## 📊 Configuration du monitoring

### Google Analytics 4

```typescript
// components/GoogleAnalytics.tsx
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}
```

### Search Console

Configuration automatique via sitemap et métadonnées structurées.

---

Cette configuration est optimisée pour les performances, le SEO et l'expérience développeur. Toute modification doit être testée et documentée.