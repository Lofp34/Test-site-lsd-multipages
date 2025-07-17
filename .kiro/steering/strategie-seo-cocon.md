---
inclusion: fileMatch
fileMatchPattern: '**/page.tsx'
---

# Stratégie SEO & Cocon Sémantique - Laurent Serre

## Architecture du cocon sémantique

### Page cible principale (Priorité 0.95)
**URL** : `/expert-developpement-commercial-pme`
**Requête principale** : "expert développement commercial PME"
**Objectif** : Position 1-3 dans les 6 mois

### Pages intermédiaires (Priorité 0.9)
1. `/formation-commerciale-pme` ✅
2. `/transformation-commerciale` ✅  
3. `/diagnostic` ✅ (Priorité 0.95 - conversion)

### Pages spécialisées (Priorité 0.85)
1. `/consultant-commercial-montpellier` ✅
2. `/formateur-vente-pme` ✅
3. `/coach-commercial-entreprise` ❌ **À CRÉER PRIORITÉ**

### Ressources liées (Priorité 0.8)
- `/ressources/guide-prospection` ✅
- `/ressources/guide-closing` ✅
- `/ressources/outil-preparation-rdv` ✅
- `/ressources/outil-strategie-commerciale` ✅
- `/ressources/kit-gestion-grands-comptes` ✅

## Maillage interne optimisé

### Règles de maillage
- **10 liens entrants** vers la page cible principale
- **Ancres variées** : "Laurent Serre, expert développement commercial PME"
- **Distribution équilibrée** : 2-3 liens par page intermédiaire
- **Placement stratégique** : Hero section + CTA final

### Liens contextuels
- Chaque page du cocon doit linker vers 3-4 autres pages
- Ancres sémantiques naturelles dans le contenu
- CTAs vers diagnostic et bootcamp sur toutes les pages

## Métadonnées SEO par type de page

### Page cible principale
```typescript
export const metadata: Metadata = {
  title: "Expert Développement Commercial PME | Laurent Serre - 20 ans d'Expérience",
  description: "Laurent Serre, expert développement commercial PME depuis 20 ans. Transformez votre équipe commerciale avec des méthodes éprouvées. Diagnostic gratuit.",
  keywords: "expert développement commercial PME, consultant commercial PME, formation équipe commerciale",
  openGraph: {
    title: "Expert Développement Commercial PME | Laurent Serre",
    description: "20 ans d'expérience terrain pour transformer votre performance commerciale",
    images: [{ url: '/images/laurent-serre-expert-commercial.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://laurentserre.com/expert-developpement-commercial-pme'
  }
}
```

### Pages intermédiaires
```typescript
// Exemple pour /formation-commerciale-pme
export const metadata: Metadata = {
  title: "Formation Commerciale PME | Bootcamp Intensif | Laurent Serre",
  description: "Formation commerciale spécialisée PME. Bootcamp intensif pour transformer vos équipes. Méthodes éprouvées, résultats mesurables.",
  keywords: "formation commerciale PME, bootcamp commercial, formation équipe vente",
  // ... Open Graph similaire
}
```

### Pages ressources
```typescript
// Exemple pour guide-prospection
export const metadata: Metadata = {
  title: "Guide Prospection B2B Gratuit | 7 Canaux Efficaces | Laurent Serre",
  description: "Téléchargez le guide complet de prospection B2B. 7 canaux testés et approuvés pour générer des leads qualifiés en PME.",
  keywords: "guide prospection B2B, prospection commerciale, lead generation PME",
  // ... Open Graph avec image spécifique au guide
}
```

## Schema.org structuré

### Schema Person (Laurent Serre)
```json
{
  "@type": "Person",
  "name": "Laurent Serre",
  "jobTitle": "Expert Développement Commercial PME",
  "description": "Expert en développement commercial avec 20 ans d'expérience terrain",
  "url": "https://laurentserre.com",
  "sameAs": [
    "https://linkedin.com/in/laurent-serre",
    "https://twitter.com/laurent_serre"
  ],
  "knowsAbout": [
    "Développement commercial",
    "Formation commerciale",
    "Management équipe commerciale",
    "Prospection B2B"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Mauguio",
    "addressRegion": "Montpellier",
    "postalCode": "34130",
    "addressCountry": "FR"
  }
}
```

### Schema ProfessionalService
```json
{
  "@type": "ProfessionalService",
  "name": "Laurent Serre Développement",
  "description": "Expert développement commercial PME - Formation, coaching, transformation",
  "provider": {
    "@type": "Person",
    "name": "Laurent Serre"
  },
  "areaServed": {
    "@type": "Place",
    "name": "France"
  },
  "serviceType": [
    "Formation commerciale",
    "Coaching commercial",
    "Diagnostic commercial",
    "Transformation commerciale"
  ]
}
```

## Stratégie de contenu longue traîne

### Requêtes secondaires ciblées
- "formation commerciale PME Montpellier"
- "consultant développement commercial Occitanie"
- "diagnostic commercial gratuit PME"
- "structuration équipe commerciale"
- "coach commercial entreprise"

### Blog et articles
- Chaque article cible 3-5 requêtes longue traîne
- Maillage interne vers pages du cocon
- CTAs vers diagnostic et ressources
- Schema Article pour chaque publication

## Optimisations techniques SEO

### Core Web Vitals
- **LCP** < 2.5s : Images optimisées avec priority
- **FID** < 100ms : JavaScript optimisé
- **CLS** < 0.1 : Dimensions images spécifiées

### Indexation
- Sitemap dynamique avec priorités
- Robots.txt optimisé
- Canonical URLs sur toutes les pages
- Hreflang ready pour expansion internationale

### Local SEO
- Adresse complète dans Schema.org
- Mentions "Montpellier" et "Occitanie" naturelles
- Google My Business optimisé (externe)

## KPIs de suivi SEO

### Positions
- "expert développement commercial PME" : Objectif top 3
- "formation commerciale PME" : Objectif top 5
- Longue traîne (50+ requêtes) : Positions moyennes

### Trafic
- Trafic organique : +400% en 6 mois
- Pages vues cocon : +500% 
- Temps sur site : +30%

### Conversions
- Téléchargements ressources : +300%
- Demandes diagnostic : +250%
- Leads qualifiés : +45/mois

## Actions prioritaires

### Urgent (1-2 semaines)
1. **Créer `/coach-commercial-entreprise`** - Compléter le cocon
2. **Optimiser ancres de liens** - Varier les formulations
3. **Vérifier maillage interne** - S'assurer de la cohérence

### Court terme (1-2 mois)
1. **Enrichir Schema.org** - Ajouter FAQ et HowTo
2. **Créer contenu longue traîne** - Articles ciblés
3. **Optimiser Core Web Vitals** - Tests Lighthouse

### Moyen terme (3-6 mois)
1. **Analyser performances** - Search Console
2. **Ajuster stratégie** - Selon résultats
3. **Expansion sémantique** - Nouveaux cocons thématiques