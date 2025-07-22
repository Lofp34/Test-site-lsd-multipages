# Design Document - Optimisation Page d'Accueil

## Overview

Cette optimisation vise à transformer la page d'accueil en un véritable entonnoir de conversion orienté vers le bootcamp commercial et les ressources pratiques, tout en corrigeant les liens cassés qui nuisent à l'expérience utilisateur. L'approche privilégie une hiérarchie claire des CTAs avec le bootcamp comme solution premium et les ressources comme point d'entrée accessible.

## Architecture

### Structure des CTAs Hiérarchisée

```
Page d'Accueil
├── Hero Section
│   ├── CTA Principal: "Rejoindre le Bootcamp Commercial" (Bootcamp)
│   └── CTA Secondaire: "Accéder aux Ressources Gratuites" (Ressources)
├── Section Problème
│   ├── CTA Principal: "Découvrir le Bootcamp" (Solution complète)
│   ├── CTA Secondaire: "Télécharger le Guide Gratuit" (Premier pas)
│   └── CTA Tertiaire: "Faire le Diagnostic" (Évaluation)
└── Section Ressources PME
    ├── Liens fonctionnels vers toutes les ressources
    └── CTA de conversion vers le bootcamp
```

### Système de Redirection pour Liens Cassés

```
Liens Cassés Identifiés → Solutions de Redirection
├── "Scripts IMPACT et AIDA+" → /ressources/guide-prospection#scripts
├── "LinkedIn et réseaux sociaux" → /ressources/guide-prospection#linkedin  
├── "Système de suivi efficace" → /ressources/outil-suivi-prospects
├── "Motivation et coaching" → /ressources/guide-management-commercial
└── "Recrutement commercial" → /ressources/guide-recrutement-commercial
```

## Components and Interfaces

### 1. Composant CTAHierarchy

```typescript
interface CTAHierarchyProps {
  primaryCTA: {
    text: string;
    href: string;
    variant: 'bootcamp' | 'primary';
    icon: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
    variant: 'resources' | 'outline';
    icon: string;
  };
  tertiaryCTA?: {
    text: string;
    href: string;
    variant: 'diagnostic' | 'ghost';
    icon: string;
  };
}
```

### 2. Composant ResourcesSection

```typescript
interface ResourcesSectionProps {
  title: string;
  description: string;
  resources: Array<{
    title: string;
    description: string;
    href: string;
    icon: string;
    isNew?: boolean;
  }>;
  conversionCTA: {
    text: string;
    href: string;
  };
}
```

### 3. Service LinkValidator

```typescript
interface LinkValidatorService {
  validateInternalLinks(links: string[]): Promise<LinkValidationResult[]>;
  createRedirectMapping(brokenLinks: string[]): RedirectMapping;
  updateLinksInContent(content: string, redirectMapping: RedirectMapping): string;
}

interface LinkValidationResult {
  url: string;
  isValid: boolean;
  suggestedRedirect?: string;
}
```

## Data Models

### CTAConfiguration

```typescript
interface CTAConfiguration {
  id: string;
  section: 'hero' | 'problem' | 'resources';
  priority: 'primary' | 'secondary' | 'tertiary';
  text: string;
  href: string;
  variant: string;
  icon: string;
  trackingEvent: string;
  isVisible: boolean;
}
```

### ResourceLink

```typescript
interface ResourceLink {
  id: string;
  title: string;
  originalHref: string;
  validatedHref: string;
  isActive: boolean;
  redirectReason?: string;
  category: 'prospection' | 'closing' | 'management' | 'tools';
}
```

## Error Handling

### Gestion des Liens Cassés

1. **Détection Automatique**
   - Validation des liens internes au build
   - Logging des erreurs 404
   - Alertes pour les liens cassés

2. **Stratégie de Fallback**
   - Redirection vers page ressources principale si ressource spécifique inexistante
   - Message informatif pour l'utilisateur
   - Tracking des redirections pour analyse

3. **Maintenance Préventive**
   - Tests automatisés des liens critiques
   - Validation lors des déploiements
   - Monitoring continu des erreurs 404

### Gestion des Erreurs CTA

1. **Validation des Destinations**
   - Vérification que toutes les pages de destination existent
   - Tests de charge des pages critiques (bootcamp, diagnostic)
   - Fallback vers page contact si erreur

2. **Tracking des Conversions**
   - Suivi des clics sur chaque CTA
   - Analyse des taux de conversion par section
   - A/B testing des libellés de CTAs

## Testing Strategy

### Tests Fonctionnels

1. **Tests de Navigation**
   ```typescript
   describe('Homepage Navigation', () => {
     test('All internal links should be functional', async () => {
       // Test tous les liens internes
     });
     
     test('CTAs should redirect to correct pages', async () => {
       // Test redirection des CTAs
     });
   });
   ```

2. **Tests de Conversion**
   ```typescript
   describe('CTA Conversion Flow', () => {
     test('Primary CTA should lead to bootcamp page', async () => {
       // Test flux bootcamp
     });
     
     test('Secondary CTA should lead to resources', async () => {
       // Test flux ressources
     });
   });
   ```

### Tests de Performance

1. **Core Web Vitals**
   - LCP < 2.5s avec nouveaux CTAs
   - CLS < 0.1 lors du chargement des sections
   - FID < 100ms pour interactions CTAs

2. **Tests de Charge**
   - Simulation de trafic sur pages de destination
   - Vérification de la disponibilité des ressources
   - Tests de résilience des redirections

### Tests d'Accessibilité

1. **Navigation Clavier**
   - Tous les CTAs accessibles au clavier
   - Ordre de tabulation logique
   - Focus visible sur tous les éléments interactifs

2. **Lecteurs d'Écran**
   - Labels ARIA appropriés pour les CTAs
   - Descriptions alternatives pour les icônes
   - Structure sémantique claire

## Implementation Details

### Phase 1: Correction des Liens Cassés

1. **Audit Complet**
   - Identification de tous les liens cassés
   - Mapping vers ressources existantes ou alternatives
   - Création des pages manquantes si nécessaire

2. **Mise en Place des Redirections**
   - Configuration des redirections 301
   - Mise à jour des liens dans le code
   - Tests de validation

### Phase 2: Optimisation des CTAs

1. **Refonte Hero Section**
   - CTA principal vers bootcamp
   - CTA secondaire vers ressources
   - Suppression/déplacement des CTAs moins prioritaires

2. **Optimisation Section Problème**
   - Ajout CTA bootcamp comme solution principale
   - Maintien diagnostic comme option d'évaluation
   - Ajout ressources gratuites comme premier pas

### Phase 3: Section Ressources PME

1. **Création Section Dédiée**
   - Présentation des ressources disponibles
   - Liens fonctionnels vers tous les guides
   - CTA de conversion vers bootcamp

2. **Optimisation Mobile**
   - CTAs adaptés aux écrans mobiles
   - Navigation tactile optimisée
   - Chargement rapide des ressources

## Metrics and Success Criteria

### KPIs de Conversion

1. **Taux de Clic CTAs**
   - Bootcamp: +40% vs CTAs actuels
   - Ressources: +60% vs liens actuels
   - Diagnostic: maintien du taux actuel

2. **Parcours Utilisateur**
   - Réduction du taux de rebond de 15%
   - Augmentation du temps sur site de 25%
   - Amélioration du taux de conversion global de 30%

### KPIs Techniques

1. **Qualité des Liens**
   - 0 lien cassé sur la page d'accueil
   - Temps de réponse < 200ms pour toutes les redirections
   - Taux d'erreur 404 < 0.1%

2. **Performance**
   - Score Lighthouse > 90
   - Core Web Vitals tous verts
   - Temps de chargement < 3s

### KPIs Business

1. **Génération de Leads**
   - +50% d'inscriptions bootcamp depuis la homepage
   - +80% de téléchargements de ressources
   - +25% de demandes de diagnostic qualifiées

2. **Engagement**
   - +35% de pages vues par session
   - +40% de retours sur le site
   - +20% de partages sur réseaux sociaux