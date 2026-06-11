# Google Analytics 4 — Configuration

## Tracking ID
`G-1YMSHSSQKJ`

## Composants

### `GoogleAnalytics.tsx` — Chargement GA4
Fichier : `src/components/GoogleAnalytics.tsx`
- Charge l'ID GA via gtag.js asynchrone (requestIdleCallback)
- Configure `send_page_view: false` — envoie page_view manuellement
- Transport type : `beacon` (pas de blocage navigateur)
- Exporte : `trackEvent()`, `trackPageView()`, `trackBusinessEvents`
- Charge `setupCustomEvents()` et `setupConversionGoals()` de `cta-tracking.ts`

### `HubSpotForm.tsx` — Tracking formulaire
Fichier : `src/components/HubSpotForm.tsx`
- Déclenche `contact_form_submitted` après soumission réussie
- Prop `onFormSubmitted` pour callback parent (LeadMagnetForm)

### `LeadMagnetBanner.tsx` — Bandeau sticky site-wide
Fichier : `src/components/LeadMagnetBanner.tsx`
- Sticky (`position: sticky; top: 0; z-index: 50`) — reste visible au scroll
- Micro-animation : ombre portée + label "Guides gratuits" passe en mint-green au scroll
- Flèche bounce apparaît au scroll pour attirer l'œil
- Dismiss stocke timestamp dans localStorage → réaffiché après 24h
- `banner_click` : clic sur un des liens vers les guides gratuits
- `banner_dismiss` : fermeture du bandeau

### `cta-tracking.ts` — Écouteur générique
Fichier : `src/utils/cta-tracking.ts`
- `phone_click` : clic sur lien tel:
- `email_click` : clic sur lien mailto:
- `cta_clicked` : clic vers /contact ou /diagnostic
- `resource_cta_clicked` : clic vers /bootcamp ou /ressources/*
- `micro_conversion` : événement manuel de micro-conversion
- `section_view` : vue de section

## Événements GA4 — Référence complète

### Engagement
| Catégorie | Action | Déclencheur |
|-----------|--------|-------------|
| lead_magnet | `banner_click` | Clic sur lien guide dans bandeau |
| lead_magnet | `banner_dismiss` | Fermeture bandeau |
| lead_generation | `phone_click` | Clic sur numéro de téléphone |
| lead_generation | `email_click` | Clic sur adresse email |
| lead_generation | `cta_clicked` | Clic sur /contact ou /diagnostic |
| engagement | `resource_cta_clicked` | Clic sur /bootcamp ou /ressources/* |
| engagement | `section_view` | Section de page visible |
| engagement | `micro_conversion` | Micro-conversion (CTA badge survol, etc.) |

### Conversion
| Catégorie | Action | Déclencheur |
|-----------|--------|-------------|
| conversion | `contact_form_submitted` | Formulaire HubSpot soumis avec succès |

### Navigation
| Propriété | Type | Description |
|-----------|------|-------------|
| `event_label` | string | Texte du lien ou page cible |
| `link_url` | string | URL de destination |
| `guide_name` | string | Nom du guide (banner uniquement) |
| `source` | string | Source = 'sitewide_banner' |
| `conversion_type` | string | Type de micro-conversion |
| `cta_id` | string | ID du CTA |
| `section` | string | Section de la page |
| `page_path` | string | Chemin de la page courante |

## Pages avec tracking supplémentaire

### `/ressources/grille-evaluation`
- `grille_evaluation_download_click` : téléchargement de la grille
- `grille_evaluation_preview_click` : prévisualisation

### Landing pages guides (`/guide-acheteurs-b2b`, `/guide-psychologie-decision-b2b`)
- `contact_form_submitted` : formulaire de téléchargement soumis
- + écouteur générique pour les CTAs /diagnostic

## Déploiement

Le composant `GoogleAnalytics` est chargé dans `src/app/layout.tsx` :
```tsx
import GoogleAnalytics from "@/components/GoogleAnalytics";
// ...
<GoogleAnalytics />
```

Le tracking est automatique sur toutes les pages via le layout partagé.

## Bonnes pratiques

- Tous les événements passent par `window.gtag()` pour éviter les conflits de dataLayer
- Le chargement est différé via `requestIdleCallback` (timeout 2s) pour ne pas impacter LCP
- Les IPs internes peuvent être exclues via le check `ipify.org` dans GoogleAnalytics.tsx
- Les événements formulaire sont envoyés après soumission, pas pendant la saisie

### `ExitIntentPopup.tsx` — Popup intention de sortie
Fichier : `src/components/ExitIntentPopup.tsx`
- Déclenché sur `mouseleave` vers le haut (≥ 2s après chargement pour éviter faux positifs)
- Visible uniquement sur les articles blog (`/blog/*`, pas la page index)
- Maximum 1 fois par session (`sessionStorage`)
- Alterne entre les 2 guides (Acheteurs B2B / Psychologie décision)
- Design : overlay `backdrop-blur-sm`, carte centrée avec icône, CTA gradient
- GA4 :
  - `exit_intent_trigger` : popup affichée (avec `guide_name`)
  - `guide_offer_click` : clic sur le CTA (avec `source: 'exit_intent_popup'`)

### `NewsletterForm.tsx` — Formulaire newsletter footer
Fichier : `src/components/NewsletterForm.tsx`
- Affiché dans le footer, section dédiée entre les logos clients et la grille principale
- Champ email + bouton "S'inscrire"
- Validation email côté client + envoi via `/api/newsletter` → HubSpot form
- État success/error géré
- GA4 : `newsletter_signup` (catégorie `lead_generation`, label `footer_newsletter`)

### `/api/newsletter/route.ts` — API newsletter
- Proxy vers HubSpot Forms API (form ID `884e2971…`)
- Accepte les doublons (CONFLICT → 200)
- Validation email côté serveur
