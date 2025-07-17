---
inclusion: fileMatch
fileMatchPattern: '**/contact/**/*'
---

# Intégration HubSpot - Laurent Serre Développement

## Vue d'ensemble de l'intégration

L'intégration HubSpot est cruciale pour la génération et la gestion des leads. Elle connecte le site web au CRM pour un suivi optimal des prospects.

### Objectifs de l'intégration
1. **Capture de leads** via formulaires optimisés
2. **Tracking comportemental** des visiteurs
3. **Automatisation** des séquences de nurturing
4. **Mesure du ROI** des contenus et campagnes

## Configuration technique

### Variables d'environnement
```bash
# .env.local
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your_portal_id
HUBSPOT_API_KEY=your_private_api_key
NEXT_PUBLIC_HUBSPOT_FORM_DIAGNOSTIC_ID=form_id_diagnostic
NEXT_PUBLIC_HUBSPOT_FORM_CONTACT_ID=form_id_contact
NEXT_PUBLIC_HUBSPOT_FORM_NEWSLETTER_ID=form_id_newsletter
```

### Script de tracking HubSpot
```typescript
// app/layout.tsx - Intégration du tracking code
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        {/* HubSpot Tracking Code */}
        <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src={`//js.hs-scripts.com/${process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}.js`}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## Formulaires intégrés

### 1. Formulaire Diagnostic (Priorité haute)
**Emplacement** : `/diagnostic`
**Objectif** : Capture de leads qualifiés

```typescript
// components/forms/DiagnosticForm.tsx
interface DiagnosticFormProps {
  onSubmit?: (data: DiagnosticData) => void
}

export function DiagnosticForm({ onSubmit }: DiagnosticFormProps) {
  useEffect(() => {
    // Chargement du formulaire HubSpot
    if (window.hbspt) {
      window.hbspt.forms.create({
        region: "eu1",
        portalId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID,
        formId: process.env.NEXT_PUBLIC_HUBSPOT_FORM_DIAGNOSTIC_ID,
        target: '#hubspot-diagnostic-form',
        onFormSubmit: function($form) {
          // Tracking personnalisé
          gtag('event', 'form_submit', {
            form_name: 'diagnostic_commercial'
          })
        },
        onFormReady: function($form) {
          // Personnalisation CSS si nécessaire
        }
      })
    }
  }, [])

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-primary-title mb-4">
        Diagnostic Commercial Gratuit
      </h3>
      <div id="hubspot-diagnostic-form"></div>
    </div>
  )
}
```

### 2. Formulaire Contact Général
**Emplacement** : `/contact`, footer, pages services
**Objectif** : Demandes d'information

### 3. Formulaire Newsletter
**Emplacement** : Blog, ressources
**Objectif** : Nurturing long terme

### 4. Formulaires Lead Magnets
**Emplacement** : Pages ressources
**Objectif** : Téléchargements en échange de coordonnées

## Tracking et événements personnalisés

### Événements de conversion
```typescript
// utils/hubspot-tracking.ts
export const trackHubSpotEvent = (eventName: string, properties: Record<string, any>) => {
  if (typeof window !== 'undefined' && window._hsq) {
    window._hsq.push(['trackEvent', {
      id: eventName,
      value: properties
    }])
  }
}

// Exemples d'utilisation
trackHubSpotEvent('resource_download', {
  resource_name: 'Guide Prospection B2B',
  page_url: window.location.href
})

trackHubSpotEvent('diagnostic_completed', {
  score: diagnosticScore,
  industry: selectedIndustry
})
```

### Pages vues importantes
```typescript
// Tracking automatique des pages clés
useEffect(() => {
  if (typeof window !== 'undefined' && window._hsq) {
    window._hsq.push(['setPath', window.location.pathname])
    window._hsq.push(['trackPageView'])
  }
}, [])
```

## Automatisations HubSpot

### Workflows de nurturing

#### 1. Nouveau lead diagnostic
**Déclencheur** : Soumission formulaire diagnostic
**Actions** :
1. Email de remerciement immédiat
2. Envoi du rapport de diagnostic personnalisé
3. Séquence de 5 emails sur 2 semaines
4. Assignation au commercial si score élevé

#### 2. Téléchargement ressource
**Déclencheur** : Téléchargement guide/outil
**Actions** :
1. Email de livraison de la ressource
2. Séquence éducative liée au sujet
3. Invitation au diagnostic après 1 semaine

#### 3. Visiteur récurrent
**Déclencheur** : 3+ visites sans conversion
**Actions** :
1. Pop-up ciblé avec offre spéciale
2. Email personnalisé avec contenu pertinent

### Scoring des leads

#### Critères démographiques
- **Fonction** : CEO/Directeur (+20), Manager (+15), Autre (+5)
- **Taille entreprise** : 50-100 salariés (+25), 20-50 (+20), 10-20 (+15)
- **Secteur** : Industrie/Services B2B (+15), Autres (+10)

#### Critères comportementaux
- **Page diagnostic** : +30 points
- **Téléchargement ressource** : +20 points
- **Lecture article blog** : +10 points
- **Temps sur site >3min** : +15 points
- **Pages vues >5** : +20 points

## Intégration avec le site

### Composant HubSpot universel
```typescript
// components/hubspot/HubSpotForm.tsx
interface HubSpotFormProps {
  formId: string
  className?: string
  onSubmit?: () => void
}

export function HubSpotForm({ formId, className, onSubmit }: HubSpotFormProps) {
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.hbspt && formRef.current) {
      window.hbspt.forms.create({
        region: "eu1",
        portalId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID,
        formId: formId,
        target: formRef.current,
        onFormSubmit: onSubmit
      })
    }
  }, [formId, onSubmit])

  return <div ref={formRef} className={className} />
}
```

### Hook personnalisé pour HubSpot
```typescript
// hooks/useHubSpot.ts
export function useHubSpot() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkHubSpot = () => {
      if (window.hbspt) {
        setIsLoaded(true)
      } else {
        setTimeout(checkHubSpot, 100)
      }
    }
    checkHubSpot()
  }, [])

  const trackEvent = useCallback((eventName: string, properties: Record<string, any>) => {
    if (isLoaded && window._hsq) {
      window._hsq.push(['trackEvent', { id: eventName, value: properties }])
    }
  }, [isLoaded])

  return { isLoaded, trackEvent }
}
```

## Personnalisation et optimisation

### Styles CSS personnalisés
```css
/* globals.css - Styles pour formulaires HubSpot */
.hs-form {
  @apply space-y-4;
}

.hs-form .hs-input {
  @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-transparent;
}

.hs-form .hs-button {
  @apply bg-primary-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-accent/90 transition-colors;
}

.hs-form .hs-error-msgs {
  @apply text-red-500 text-sm mt-1;
}
```

### Tests A/B sur formulaires
- **Titres** : "Diagnostic Gratuit" vs "Audit Commercial"
- **Boutons** : "Obtenir mon diagnostic" vs "Analyser ma performance"
- **Champs** : Formulaire court vs détaillé

## Mesure de performance

### KPIs HubSpot à suivre
1. **Taux de conversion** par formulaire
2. **Qualité des leads** (score moyen)
3. **Temps de conversion** (première visite → lead)
4. **ROI par source** de trafic
5. **Taux d'ouverture** des emails automatisés

### Rapports personnalisés
- **Dashboard commercial** : Leads par semaine/mois
- **Performance contenu** : Conversions par article
- **Funnel complet** : Visiteur → Lead → Client

### Intégration Google Analytics
```typescript
// Tracking unifié GA4 + HubSpot
const trackConversion = (eventName: string, value?: number) => {
  // Google Analytics
  gtag('event', eventName, {
    event_category: 'conversion',
    value: value
  })
  
  // HubSpot
  trackHubSpotEvent(eventName, { value })
}
```

## Maintenance et évolution

### Vérifications régulières
- **Fonctionnement** des formulaires (test mensuel)
- **Taux de spam** et filtrage
- **Performance** des workflows
- **Mise à jour** des scores de leads

### Optimisations continues
- **A/B test** sur nouveaux formulaires
- **Ajustement** des critères de scoring
- **Amélioration** des séquences email
- **Intégration** de nouveaux outils (chatbot, etc.)