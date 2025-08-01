# Design Document

## Overview

Ce document décrit la conception technique pour corriger les liens cassés et créer les pages manquantes sur le site Laurent Serre Développement. La solution se concentre sur la simplicité et l'efficacité, en respectant les standards existants du site.

## Architecture

### 1. Correction des liens CTA dans les pages de négociation

**Problème identifié :** Les liens "Coaching individuel" et "Formation équipe" dans les pages de techniques de négociation ne fonctionnent pas.

**Solution :** Modifier le composant `ConversionCTAs.tsx` pour rediriger correctement vers les pages existantes :
- "Coaching individuel" → `/coach-commercial-entreprise`
- "Formation équipe" → `/bootcamp-commercial-intensif`

### 2. Création des pages ressources manquantes

**Problème identifié :** Trois liens dans la page suivi-performance génèrent des erreurs 404 :
- `/ressources/outil-tableau-bord`
- `/ressources/grille-evaluation`
- `/ressources/reporting-automatise`

**Solution :** Créer trois nouvelles pages ressources suivant le pattern existant des pages ressources du site.

## Components and Interfaces

### 1. Structure des nouvelles pages ressources

Chaque page ressource suivra cette structure standardisée :

```typescript
interface ResourcePageProps {
  metadata: Metadata;
  heroSection: HeroSectionConfig;
  toolDescription: ToolDescriptionConfig;
  features: FeatureConfig[];
  downloadSection: DownloadSectionConfig;
  testimonials: TestimonialConfig[];
  ctaSections: CTASectionConfig[];
}

interface HeroSectionConfig {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: CTAConfig;
  secondaryCTA: CTAConfig;
  icon: LucideIcon;
  gradient: string;
}

interface ToolDescriptionConfig {
  title: string;
  description: string;
  benefits: string[];
  preview?: {
    type: 'image' | 'video' | 'demo';
    src: string;
    alt: string;
  };
}

interface DownloadSectionConfig {
  title: string;
  description: string;
  formFields: FormFieldConfig[];
  deliveryMethod: 'email' | 'download' | 'both';
  autoResponse: boolean;
}
```

### 2. Composants réutilisables

**ResourceHero** : Section hero standardisée pour les pages ressources
**ToolPreview** : Composant pour afficher des aperçus d'outils
**ResourceDownloadForm** : Formulaire de demande/téléchargement
**PMETestimonials** : Section témoignages spécifique PME
**ResourceCTAs** : CTAs vers services Laurent Serre

### 3. Intégration avec le système existant

Les nouvelles pages utiliseront :
- Le système de demande de ressources existant (`ResourceRequestModal`)
- L'API `/api/resource-request` existante
- Le service SendGrid pour l'envoi d'emails
- Les composants UI existants (Button, Badge, AnimatedSection, etc.)

## Data Models

### 1. Modèle de données pour les outils

```typescript
interface ResourceTool {
  id: string;
  title: string;
  description: string;
  category: 'tableau-bord' | 'evaluation' | 'reporting';
  features: string[];
  benefits: string[];
  targetAudience: string[];
  deliveryFormat: 'pdf' | 'excel' | 'template' | 'guide';
  estimatedTime: string;
  difficulty: 'débutant' | 'intermédiaire' | 'avancé';
  prerequisites?: string[];
}
```

### 2. Configuration des métadonnées SEO

```typescript
interface ResourceSEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
  };
  structuredData: {
    type: 'DigitalDocument' | 'HowTo' | 'Product';
    name: string;
    description: string;
    provider: Organization;
  };
}
```

## Error Handling

### 1. Gestion des erreurs de liens

- Redirection automatique vers les bonnes pages
- Logging des erreurs pour monitoring
- Messages d'erreur utilisateur-friendly si redirection échoue

### 2. Gestion des erreurs de formulaires

- Validation côté client et serveur
- Messages d'erreur contextuels
- Retry automatique en cas d'échec réseau
- Fallback vers modal de demande de ressource

### 3. Monitoring et alertes

- Tracking des clics sur les liens corrigés
- Monitoring des soumissions de formulaires
- Alertes en cas d'erreurs récurrentes

## Testing Strategy

### 1. Tests unitaires

- Tests des composants de pages ressources
- Tests des fonctions de validation de formulaires
- Tests des redirections de liens

### 2. Tests d'intégration

- Tests de bout en bout des parcours utilisateur
- Tests d'intégration avec l'API de demande de ressources
- Tests d'envoi d'emails

### 3. Tests de régression

- Vérification que les liens existants fonctionnent toujours
- Tests de compatibilité avec les navigateurs
- Tests de performance des nouvelles pages

## Implementation Details

### 1. Pages à créer

#### `/ressources/outil-tableau-bord`
- **Objectif** : Présenter l'outil de tableau de bord commercial
- **Contenu** : Dashboard simple avec KPI essentiels, suivi temps réel
- **Format** : Template Excel + guide d'utilisation PDF
- **CTA principal** : Téléchargement via formulaire email

#### `/ressources/grille-evaluation`
- **Objectif** : Présenter la grille d'évaluation des performances commerciales
- **Contenu** : Outil d'évaluation avec critères objectifs et plan de développement
- **Format** : Grille Excel + guide d'évaluation PDF
- **CTA principal** : Téléchargement via formulaire email

#### `/ressources/reporting-automatise`
- **Objectif** : Présenter les modèles de reporting automatisé
- **Contenu** : Templates de reports pour CRM, analyse mensuelle, pilotage équipe
- **Format** : Pack de templates + guide de configuration
- **CTA principal** : Téléchargement via formulaire email

### 2. Corrections de liens

#### Dans `ConversionCTAs.tsx`
```typescript
// Correction des liens dans les CTAs
const coachingCTA = {
  href: "/coach-commercial-entreprise", // ✅ PAGE EXISTANTE
  onClick: () => {
    // Analytics tracking
    window.location.href = "/coach-commercial-entreprise";
  }
};

const formationCTA = {
  href: "/bootcamp-commercial-intensif", // ✅ PAGE EXISTANTE  
  onClick: () => {
    // Analytics tracking
    window.location.href = "/bootcamp-commercial-intensif";
  }
};
```

### 3. Structure des fichiers

```
src/app/ressources/
├── outil-tableau-bord/
│   └── page.tsx
├── grille-evaluation/
│   └── page.tsx
└── reporting-automatise/
    └── page.tsx

src/components/ressources/
├── ResourceHero.tsx
├── ToolPreview.tsx
├── ResourceDownloadForm.tsx
└── ResourceCTAs.tsx

src/data/ressources/
├── tableau-bord-data.ts
├── grille-evaluation-data.ts
└── reporting-data.ts
```

### 4. Intégration SEO

Chaque page inclura :
- Métadonnées Next.js 15 complètes
- Schema.org structured data (DigitalDocument)
- Open Graph et Twitter Cards
- Liens internes vers pages pertinentes
- Breadcrumb navigation

### 5. Analytics et tracking

- Tracking des téléchargements de ressources
- Suivi des conversions vers services
- Monitoring des erreurs 404 résolues
- Mesure de l'engagement utilisateur

## Performance Considerations

### 1. Optimisation des pages

- Images optimisées (WebP/AVIF)
- Lazy loading des composants non critiques
- Minification CSS/JS
- Compression gzip/brotli

### 2. SEO et Core Web Vitals

- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Score Lighthouse > 90

### 3. Accessibilité

- Conformité WCAG 2.1 AA
- Navigation au clavier
- Lecteurs d'écran compatibles
- Contraste suffisant

## Security Considerations

### 1. Validation des formulaires

- Validation côté client et serveur
- Protection CSRF
- Rate limiting sur les soumissions
- Sanitisation des inputs

### 2. Protection des ressources

- Validation des emails avant envoi
- Limitation du nombre de téléchargements
- Monitoring des abus
- Blacklist des domaines suspects

Cette conception assure une solution robuste, maintenable et alignée avec les standards existants du site Laurent Serre Développement.