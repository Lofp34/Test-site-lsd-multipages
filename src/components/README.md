# Composants - Laurent Serre Développement

Documentation des composants UI et fonctionnels du site Laurent Serre Développement.

## 🏗️ Architecture des composants

```
components/
├── ui/                    # Composants UI de base
│   ├── Button.tsx        # Boutons avec variants (primary, secondary, outline)
│   ├── ABTestButton.tsx  # Boutons avec A/B testing intégré
│   ├── TrackedLink.tsx   # Liens avec tracking des conversions
│   ├── AnimatedSection.tsx # Sections avec animations Framer Motion
│   ├── BookCard.tsx      # Cartes de livres pour les ressources
│   ├── ComparisonTable.tsx # Tableaux de comparaison
│   └── CategoryBreadcrumb.tsx # Navigation avec suggestions cross-category
├── layout/               # Composants de mise en page
│   ├── Header.tsx       # Header avec navigation responsive
│   ├── Footer.tsx       # Footer avec liens et informations légales
│   └── Navigation.tsx   # Navigation principale
├── sections/            # Sections de pages réutilisables
│   ├── HeroSection.tsx  # Sections hero avec variants
│   ├── TestimonialSection.tsx # Témoignages clients
│   └── CTASection.tsx   # Call-to-actions optimisés
└── templates/           # Templates de pages complètes
    ├── BookCategoryTemplate.tsx # Template pour pages de catégories de livres
    └── ResourcePageTemplate.tsx # Template pour pages de ressources
```

## 🎨 Composants UI principaux

### Button
Composant bouton avec variants et tracking intégré :

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

// Utilisation
<Button variant="primary" size="lg" icon="🚀">
  Rejoindre le Bootcamp
</Button>
```

### ABTestButton
Bouton avec système A/B testing pour optimiser les conversions :

```typescript
interface ABTestButtonProps extends ButtonProps {
  testId: string
  defaultText: string
  variants?: { [key: string]: string }
}

// Utilisation
<ABTestButton
  testId="hero-bootcamp-text"
  defaultText="Rejoindre le Bootcamp Commercial"
  variant="primary"
  size="lg"
/>
```

### TrackedLink
Lien avec tracking automatique des clics et conversions :

```typescript
interface TrackedLinkProps {
  href: string
  ctaId: string
  ctaText: string
  ctaType: 'primary' | 'secondary'
  section: string
  position: number
  enableABTest?: boolean
  children: React.ReactNode
}
```

## 🎭 Composants d'animation

### AnimatedSection
Wrapper pour animations d'apparition avec Framer Motion :

```typescript
interface AnimatedSectionProps {
  children: React.ReactNode
  animation?: 'fade-in' | 'slide-up' | 'slide-left' | 'bounce-in'
  delay?: number
  className?: string
}

// Utilisation
<AnimatedSection animation="fade-in" delay={200}>
  <h2>Contenu animé</h2>
</AnimatedSection>
```

## 📚 Composants spécialisés

### BookCard
Carte pour afficher les livres recommandés avec métadonnées :

```typescript
interface BookCardProps {
  title: string
  author: string
  description: string
  rating: number
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé'
  category: string
  amazonUrl?: string
  imageUrl?: string
}
```

### ComparisonTable
Tableau de comparaison pour les livres ou services :

```typescript
interface ComparisonTableProps {
  items: ComparisonItem[]
  criteria: string[]
  highlightBest?: boolean
}
```

## 🔧 Intégrations techniques

### HubSpotForm
Composant pour intégrer les formulaires HubSpot :

```typescript
interface HubSpotFormProps {
  portalId: string
  formId: string
  onFormSubmit?: () => void
  className?: string
}
```

### GoogleAnalytics
Composant pour le tracking GA4 :

```typescript
// Utilisation dans layout.tsx
<GoogleAnalytics />
```

### CookieConsentBanner
Banner de consentement cookies conforme RGPD :

```typescript
interface CookieConsentProps {
  onAccept?: () => void
  onDecline?: () => void
}
```

## 🎯 Bonnes pratiques

### Standards de développement
- **TypeScript strict** : Tous les composants sont typés
- **Props interface** : Interface claire pour chaque composant
- **Accessibilité** : ARIA labels et navigation clavier
- **Responsive design** : Mobile-first avec Tailwind CSS
- **Performance** : Lazy loading et optimisations

### Conventions de nommage
- **PascalCase** pour les noms de composants
- **camelCase** pour les props et variables
- **kebab-case** pour les classes CSS personnalisées
- **Préfixes** : `use` pour les hooks, `with` pour les HOCs

### Structure d'un composant type
```typescript
'use client' // Si nécessaire pour les hooks côté client

import React from 'react'
import { cn } from '@/utils/cn' // Utilitaire pour classes conditionnelles

interface ComponentProps {
  // Props typées
}

/**
 * Description du composant
 * @param props - Description des props
 */
export default function Component({ ...props }: ComponentProps) {
  // Logique du composant
  
  return (
    <div className={cn('base-classes', className)}>
      {/* JSX du composant */}
    </div>
  )
}
```

## 🧪 Tests des composants

### Tests unitaires
Chaque composant critique dispose de tests avec Vitest :

```typescript
// __tests__/Button.test.tsx
import { render, screen } from '@testing-library/react'
import Button from '../Button'

describe('Button', () => {
  it('renders with correct variant', () => {
    render(<Button variant="primary">Test</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-primary-accent')
  })
})
```

### Tests d'accessibilité
Validation automatique avec @testing-library/jest-dom :

```bash
npm run test:components
```

## 📊 Métriques et performance

### Optimisations
- **Code splitting** : Composants chargés à la demande
- **Memoization** : React.memo pour les composants coûteux
- **Bundle analysis** : Surveillance de la taille des composants

### Monitoring
- **Render performance** : Profiling React DevTools
- **Accessibility** : Tests automatisés Wave/axe
- **Visual regression** : Tests Chromatic (si configuré)

---

Cette documentation est maintenue à jour avec l'évolution des composants. Pour contribuer, suivre les standards établis et ajouter les tests appropriés. 