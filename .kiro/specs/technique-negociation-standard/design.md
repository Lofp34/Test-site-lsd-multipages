# Design Document - Page Technique de Négociation Standard

## Overview

Cette page technique "Ne jamais couper la poire en deux" sera la référence absolue pour toutes les pages de techniques de négociation. Elle combine l'expertise de Chris Voss (FBI), l'expérience terrain de Laurent Serre, et les meilleures pratiques UX/SEO pour créer une expérience utilisateur exceptionnelle qui convertit les visiteurs en leads qualifiés.

## Architecture

### Structure de Page Hiérarchique

```
/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux/
├── Hero Section (Accroche + Contexte FBI)
├── Origine et Fondements (Chris Voss + Psychologie)
├── Vision Laurent Serre (Adaptation PME française)
├── Guide Pratique Étape par Étape
├── Cas Clients PME (3 exemples concrets)
├── Scripts et Formulations
├── Pièges à Éviter
├── Techniques Complémentaires
├── Ressources et Outils
├── CTAs Conversion
└── Navigation Retour
```

### Thème Visuel Négociation

**Couleurs principales :**
- Rouge principal : `#DC2626` (autorité, fermeté)
- Orange accent : `#EA580C` (énergie, persuasion)
- Ambre highlight : `#F59E0B` (attention, focus)

**Éléments visuels :**
- ParticleBackground rouge avec mouvement lent (autorité)
- Gradients `from-red-600 via-orange-500/10 to-primary-bg`
- Icônes : 🤝 (négociation), 🎯 (précision), 🧠 (psychologie)

## Components and Interfaces

### 1. Hero Section Component

```typescript
interface HeroSectionProps {
  technique: {
    title: string;
    author: string;
    context: string;
    description: string;
    keyBenefit: string;
  };
  stats: {
    successRate: string;
    applicationContext: string;
    difficultyLevel: string;
  };
}
```

**Design spécifications :**
- Background gradient rouge/orange avec particules
- Badge "Technique FBI" en évidence
- Titre H1 optimisé SEO : "Ne jamais couper la poire en deux | Technique FBI de Chris Voss"
- Sous-titre explicatif avec bénéfice clé
- Stats visuelles (taux de succès, contexte d'application)
- CTA principal "Découvrir la technique complète"

### 2. Expertise Section Component

```typescript
interface ExpertiseSectionProps {
  laurentVision: {
    quote: string;
    adaptation: string;
    pmeContext: string;
  };
  psychologyInsights: {
    principle: string;
    explanation: string;
    businessApplication: string;
  }[];
}
```

**Design spécifications :**
- Section "Vision Laurent Serre" avec photo et citation
- Adaptation spécifique au contexte PME français
- Insights psychologiques avec icônes cerveau
- Métriques de performance terrain

### 3. Practical Guide Component

```typescript
interface PracticalGuideProps {
  steps: {
    stepNumber: number;
    title: string;
    description: string;
    example: string;
    script: string;
    tips: string[];
  }[];
  commonMistakes: {
    mistake: string;
    consequence: string;
    solution: string;
  }[];
}
```

**Design spécifications :**
- Guide étape par étape avec numérotation visuelle
- Scripts et formulations dans des encadrés spéciaux
- Exemples concrets en contexte B2B
- Section "Pièges à éviter" avec alertes visuelles

### 4. Case Studies Component

```typescript
interface CaseStudiesProps {
  cases: {
    industry: string;
    situation: string;
    application: string;
    results: string;
    metrics: {
      improvement: string;
      timeframe: string;
    };
  }[];
  laurentFeedback: string;
}
```

**Design spécifications :**
- 3 cas clients PME avec anonymisation
- Métriques de résultats visuelles
- Retour d'expérience Laurent Serre
- Témoignages clients (si disponibles)

### 5. Interactive Tools Component

```typescript
interface InteractiveToolsProps {
  checklist: {
    category: string;
    items: string[];
  }[];
  downloadableResources: {
    title: string;
    description: string;
    format: string;
    downloadUrl: string;
  }[];
}
```

**Design spécifications :**
- Checklist interactive avec cases à cocher
- Ressources téléchargeables avec previews
- Outils de simulation ou d'entraînement
- Partage social optimisé LinkedIn

## Data Models

### Technique Data Model

```typescript
interface NegotiationTechnique {
  id: string;
  slug: string;
  title: string;
  author: string;
  origin: string;
  category: 'closing' | 'psychology' | 'preparation' | 'objection-handling';
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  
  // Contenu principal
  description: string;
  psychologyPrinciples: string[];
  businessApplications: string[];
  
  // Expertise Laurent Serre
  laurentVision: string;
  pmeAdaptation: string;
  successMetrics: {
    metric: string;
    value: string;
    context: string;
  }[];
  
  // Guide pratique
  stepByStepGuide: {
    step: number;
    title: string;
    description: string;
    script: string;
    example: string;
    tips: string[];
  }[];
  
  // Cas clients
  caseStudies: {
    industry: string;
    challenge: string;
    application: string;
    results: string;
    metrics: object;
  }[];
  
  // Ressources
  commonMistakes: {
    mistake: string;
    consequence: string;
    solution: string;
  }[];
  
  relatedTechniques: string[];
  downloadableResources: {
    title: string;
    type: string;
    url: string;
  }[];
  
  // SEO
  seoMetadata: {
    title: string;
    description: string;
    keywords: string[];
    canonicalUrl: string;
  };
  
  // Analytics
  trackingEvents: {
    event: string;
    category: string;
    action: string;
  }[];
}
```

### Page Structure Model

```typescript
interface TechniquePageStructure {
  breadcrumb: {
    label: string;
    href: string;
    current?: boolean;
  }[];
  
  sections: {
    id: string;
    title: string;
    component: string;
    props: object;
    seoHeading: string;
  }[];
  
  ctas: {
    type: 'primary' | 'secondary';
    text: string;
    href: string;
    trackingEvent: string;
    position: string;
  }[];
  
  relatedContent: {
    type: 'technique' | 'article' | 'resource';
    title: string;
    href: string;
    description: string;
  }[];
}
```

## Error Handling

### Content Loading Errors

```typescript
// Gestion des erreurs de chargement de contenu
interface ErrorBoundaryProps {
  fallback: React.ComponentType<{error: Error}>;
  onError: (error: Error, errorInfo: ErrorInfo) => void;
}

// Fallback pour contenu manquant
const ContentFallback = ({ section }: { section: string }) => (
  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
    <p className="text-yellow-800">
      Contenu en cours de chargement pour la section {section}...
    </p>
  </div>
);
```

### SEO Fallbacks

```typescript
// Métadonnées par défaut si données manquantes
const defaultSEOMetadata = {
  title: "Technique de Négociation | Laurent Serre",
  description: "Découvrez les techniques de négociation avancées avec Laurent Serre",
  keywords: ["négociation", "technique commerciale", "Laurent Serre"]
};
```

### Performance Monitoring

```typescript
// Monitoring des performances critiques
interface PerformanceMetrics {
  pageLoadTime: number;
  contentLoadTime: number;
  interactionDelay: number;
  conversionEvents: {
    event: string;
    timestamp: number;
    value?: number;
  }[];
}
```

## Testing Strategy

### Unit Tests

1. **Component Testing**
   - Rendu correct de chaque section
   - Props validation et types TypeScript
   - Interactions utilisateur (clics, formulaires)
   - Responsive design sur différentes tailles

2. **Data Model Testing**
   - Validation des structures de données
   - Transformation des données API
   - Gestion des cas de données manquantes
   - Sérialisation/désérialisation JSON

### Integration Tests

1. **Navigation Testing**
   - Liens internes fonctionnels
   - Breadcrumb navigation
   - Retour vers page principale
   - Suggestions de contenu lié

2. **SEO Testing**
   - Métadonnées correctement générées
   - Schema.org structured data valide
   - Sitemap inclusion
   - Canonical URLs

3. **Conversion Testing**
   - CTAs fonctionnels
   - Tracking des événements
   - Formulaires de contact
   - Téléchargements de ressources

### Performance Tests

1. **Core Web Vitals**
   - LCP < 2.5s (optimisation images)
   - FID < 100ms (JavaScript optimisé)
   - CLS < 0.1 (dimensions fixes)

2. **SEO Performance**
   - Lighthouse SEO score > 95
   - Accessibilité score > 90
   - Performance score > 90

### User Acceptance Tests

1. **Parcours Utilisateur**
   - Lecture complète de la technique
   - Téléchargement de ressources
   - Conversion vers diagnostic
   - Partage sur réseaux sociaux

2. **Mobile Experience**
   - Navigation tactile optimisée
   - Lecture confortable
   - CTAs accessibles
   - Temps de chargement mobile

## Implementation Architecture

### File Structure

```
src/app/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux/
├── page.tsx                 # Page principale
├── components/
│   ├── HeroSection.tsx
│   ├── ExpertiseSection.tsx
│   ├── PracticalGuide.tsx
│   ├── CaseStudies.tsx
│   ├── InteractiveTools.tsx
│   └── RelatedTechniques.tsx
├── data/
│   └── technique-data.ts    # Données de la technique
└── utils/
    ├── seo-helpers.ts       # Helpers SEO
    └── tracking.ts          # Analytics tracking
```

### Component Architecture

```typescript
// Architecture modulaire avec composition
export default function TechniquePage() {
  return (
    <main className="technique-page">
      <TechniqueBreadcrumb />
      <HeroSection />
      <ExpertiseSection />
      <PracticalGuide />
      <CaseStudies />
      <InteractiveTools />
      <ConversionCTAs />
      <RelatedTechniques />
    </main>
  );
}
```

### State Management

```typescript
// Context pour données partagées
interface TechniqueContextType {
  technique: NegotiationTechnique;
  userProgress: {
    sectionsRead: string[];
    resourcesDownloaded: string[];
    timeSpent: number;
  };
  trackEvent: (event: string, data?: object) => void;
}
```

## SEO and Performance Optimizations

### Structured Data Schema

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Ne jamais couper la poire en deux - Technique de négociation FBI",
  "description": "Guide complet de la technique de négociation de Chris Voss",
  "author": {
    "@type": "Person",
    "name": "Laurent Serre"
  },
  "step": [
    {
      "@type": "HowToStep",
      "name": "Étape 1: Préparation",
      "text": "Description de l'étape..."
    }
  ]
}
```

### Internal Linking Strategy

- Liens vers autres techniques complémentaires
- Maillage vers pages du cocon sémantique
- Ancres optimisées et variées
- Liens contextuels dans le contenu

### Performance Optimizations

- Images optimisées avec formats modernes (AVIF/WebP)
- Lazy loading pour contenu non critique
- Code splitting par section
- Preloading des ressources critiques

Cette architecture garantit une page technique de référence qui servira de modèle pour toutes les autres techniques de négociation, avec une expérience utilisateur exceptionnelle et des performances SEO optimales.