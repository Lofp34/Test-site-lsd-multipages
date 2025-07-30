# Système de Pages Temporaires

Ce système gère automatiquement les ressources manquantes en créant des pages temporaires informatives au lieu d'afficher des erreurs 404.

## 🎯 Objectifs

- **Améliorer l'expérience utilisateur** : Remplacer les erreurs 404 par des pages informatives
- **Maintenir le SEO** : Éviter les liens morts qui pénalisent le référencement
- **Faciliter la gestion** : Système automatisé de détection et création de pages temporaires
- **Collecter les demandes** : Permettre aux utilisateurs de demander les ressources manquantes

## 🏗️ Architecture

### Composants Principaux

1. **TemporaryResourcePage** - Composant de page temporaire complète
2. **MissingResourceHandler** - Gestionnaire flexible pour différents contextes
3. **ResourceRequestModal** - Modal de demande de ressource
4. **TemporaryPageGenerator** - Générateur et gestionnaire de pages temporaires
5. **AutoDetector** - Détecteur automatique de ressources manquantes

### Flow de Données

```
Lien Mort Détecté
       ↓
AutoDetector Scan
       ↓
Création Page Temporaire
       ↓
Redirection Automatique
       ↓
Affichage Page Informative
       ↓
Demande Utilisateur (optionnel)
       ↓
Email à Laurent Serre
```

## 🚀 Utilisation

### 1. Création Manuelle d'une Page Temporaire

```typescript
import { temporaryPageGenerator } from '@/lib/temporary-pages/generator';

const config = {
  resourceUrl: '/ressources/guide-manquant.pdf',
  sourceUrl: '/ressources',
  resourceType: 'download',
  title: 'Guide de Prospection Avancée',
  description: 'Guide complet sur les techniques de prospection',
  estimatedDate: 'Mars 2025',
  priority: 'high'
};

const temporaryUrl = await temporaryPageGenerator.createTemporaryPage(config);
```

### 2. Détection Automatique

```typescript
import { autoDetector, defaultDetectionConfig } from '@/lib/temporary-pages/auto-detector';

const result = await autoDetector.detectAndCreateTemporaryPages({
  ...defaultDetectionConfig,
  baseUrl: 'https://laurentserre.com'
});

console.log(`${result.temporaryPagesCreated} pages temporaires créées`);
```

### 3. Utilisation du Composant Inline

```tsx
import MissingResourceHandler from '@/components/ui/MissingResourceHandler';

<MissingResourceHandler
  resourceUrl="/ressources/guide-manquant.pdf"
  displayMode="inline"
  resourceType="download"
  title="Guide de Prospection"
  description="Ce guide sera disponible prochainement"
/>
```

### 4. Page Temporaire Complète

```tsx
import TemporaryResourcePage from '@/components/ui/TemporaryResourcePage';

<TemporaryResourcePage
  resourceUrl="/ressources/guide-manquant.pdf"
  sourceUrl="/ressources"
  resourceType="download"
  title="Guide de Prospection Avancée"
  description="Guide complet sur les techniques de prospection modernes"
  estimatedDate="Mars 2025"
  priority="high"
  alternatives={[
    {
      title: 'Guide de base',
      url: '/ressources/prospection-base',
      description: 'Version simplifiée du guide',
      type: 'internal'
    }
  ]}
/>
```

## 🔧 Configuration

### Variables d'Environnement

```bash
# URL de base du site
NEXT_PUBLIC_BASE_URL=https://laurentserre.com

# Configuration email (pour les demandes)
ADMIN_EMAIL=ls@laurentserre.com
SENDGRID_API_KEY=SG.your-api-key
```

### Configuration de Détection

```typescript
const detectionConfig = {
  baseUrl: 'https://laurentserre.com',
  maxDepth: 3,
  excludePatterns: [
    '/api/*',
    '/_next/*',
    '/admin/*',
    '*.css',
    '*.js'
  ],
  includeExternal: false,
  timeout: 10000,
  retryAttempts: 2
};
```

## 📁 Structure des Fichiers

```
src/lib/temporary-pages/
├── generator.ts          # Générateur de pages temporaires
├── auto-detector.ts      # Détecteur automatique
├── config.json          # Configuration des pages (généré)
├── redirects.json       # Règles de redirection (généré)
└── README.md           # Cette documentation

src/components/ui/
├── TemporaryResourcePage.tsx    # Page temporaire complète
├── MissingResourceHandler.tsx   # Gestionnaire flexible
└── ResourceRequestModal.tsx     # Modal de demande

src/app/
├── temporary-resource/page.tsx  # Route Next.js pour pages temporaires
└── api/temporary-pages/route.ts # API de gestion
```

## 🎨 Types de Ressources Supportés

| Type | Description | Icône | Couleur |
|------|-------------|-------|---------|
| `download` | Fichiers téléchargeables (PDF, DOC, etc.) | Download | Bleu |
| `page` | Pages web manquantes | FileText | Vert |
| `guide` | Guides et tutoriels | Lightbulb | Orange |
| `tool` | Outils et calculateurs | ExternalLink | Violet |
| `template` | Templates et modèles | FileText | Mint |
| `other` | Autres ressources | AlertCircle | Gris |

## 🔄 Statuts de Développement

| Statut | Description | Couleur | Progression |
|--------|-------------|---------|-------------|
| `planned` | Planifié | Gris | 0% |
| `in_progress` | En cours | Bleu | 50% |
| `review` | En révision | Orange | 80% |
| `testing` | En test | Vert | 90% |

## 🎯 Priorités

| Priorité | Description | Couleur |
|----------|-------------|---------|
| `high` | Priorité élevée | Rouge |
| `medium` | Priorité moyenne | Orange |
| `low` | Priorité faible | Vert |

## 🌐 API Endpoints

### GET /api/temporary-pages

Récupérer les pages temporaires ou statistiques.

```bash
# Lister toutes les pages
GET /api/temporary-pages?action=list

# Obtenir les statistiques
GET /api/temporary-pages?action=stats
```

### POST /api/temporary-pages

Créer une page temporaire ou lancer la détection.

```bash
# Créer une page manuelle
POST /api/temporary-pages
{
  "action": "create",
  "resourceUrl": "/ressources/guide.pdf",
  "sourceUrl": "/ressources",
  "resourceType": "download",
  "title": "Guide de Prospection",
  "priority": "high"
}

# Lancer la détection automatique
POST /api/temporary-pages
{
  "action": "auto-detect",
  "config": {
    "baseUrl": "https://laurentserre.com",
    "maxDepth": 3
  }
}

# Nettoyer les pages obsolètes
POST /api/temporary-pages
{
  "action": "cleanup"
}
```

### PUT /api/temporary-pages

Mettre à jour une page temporaire.

```bash
PUT /api/temporary-pages
{
  "resourceUrl": "/ressources/guide.pdf",
  "progress": 80,
  "developmentStatus": "review",
  "estimatedDate": "Février 2025"
}
```

### DELETE /api/temporary-pages

Supprimer une page temporaire.

```bash
DELETE /api/temporary-pages?resourceUrl=/ressources/guide.pdf
```

## 🧪 Tests

### Exécuter les Tests

```bash
# Tests complets du système
npm run test:temporary-pages

# Ou directement avec ts-node
npx ts-node scripts/test-temporary-pages.ts
```

### Tests Inclus

1. **Création manuelle** - Test de création de pages temporaires
2. **Mise à jour** - Test de modification des pages existantes
3. **Détection automatique** - Test du scan automatique (simulation)
4. **Nettoyage** - Test de suppression des pages obsolètes
5. **Suppression** - Test de suppression manuelle

## 🔧 Maintenance

### Tâches Régulières

1. **Nettoyage automatique** - Supprimer les pages dont les ressources sont maintenant disponibles
2. **Mise à jour des statuts** - Actualiser les progressions et dates estimées
3. **Analyse des demandes** - Prioriser le développement selon les demandes utilisateurs

### Scripts de Maintenance

```bash
# Nettoyer les pages obsolètes
curl -X POST http://localhost:3000/api/temporary-pages \
  -H "Content-Type: application/json" \
  -d '{"action": "cleanup"}'

# Lancer une détection complète
curl -X POST http://localhost:3000/api/temporary-pages \
  -H "Content-Type: application/json" \
  -d '{"action": "auto-detect"}'
```

## 🚨 Gestion d'Erreurs

Le système gère automatiquement :

- **Erreurs de réseau** - Retry automatique avec backoff
- **Ressources temporairement indisponibles** - Distinction avec les vraies erreurs 404
- **Conflits de configuration** - Validation et nettoyage automatique
- **Erreurs d'email** - Fallback et logging des échecs

## 📊 Métriques et Monitoring

Le système collecte automatiquement :

- **Nombre de pages temporaires actives**
- **Répartition par type et priorité**
- **Taux de demandes par ressource**
- **Temps de résolution moyen**
- **Erreurs et échecs**

## 🔮 Évolutions Futures

- **Intégration CMS** - Interface d'administration web
- **Notifications automatiques** - Alertes quand les ressources sont prêtes
- **Analytics avancées** - Tracking des interactions utilisateurs
- **Templates personnalisables** - Personnalisation des pages temporaires
- **Intégration CI/CD** - Détection automatique lors des déploiements

## 🤝 Contribution

Pour contribuer au système :

1. Suivre les conventions TypeScript du projet
2. Ajouter des tests pour les nouvelles fonctionnalités
3. Documenter les changements d'API
4. Respecter les patterns de gestion d'erreurs existants

## 📞 Support

Pour toute question ou problème :

- **Documentation** : Consulter ce README
- **Tests** : Exécuter `npm run test:temporary-pages`
- **Logs** : Vérifier les logs de l'application
- **API** : Tester les endpoints avec les exemples fournis