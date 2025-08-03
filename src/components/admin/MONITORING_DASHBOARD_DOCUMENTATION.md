# Vercel Monitoring Dashboard - Documentation Complète

## 🎯 Vue d'ensemble

Le dashboard de monitoring Vercel est un système complet de surveillance des ressources et performances conçu pour optimiser l'usage du plan Hobby de Vercel. Il respecte les contraintes du plan gratuit (2 cron jobs max, 100K invocations/mois, 100 GB-heures/mois) tout en fournissant une surveillance complète.

## 📊 Composants Principaux

### 1. UsageDashboard
**Fichier:** `src/components/admin/UsageDashboard.tsx`

**Fonctionnalités:**
- Surveillance temps réel des métriques Vercel
- Projections mensuelles d'usage
- Alertes visuelles pour les seuils (70%, 80%, 90%)
- Recommandations d'upgrade automatiques
- Barres de progression pour les limites

**Métriques surveillées:**
- Invocations de fonctions (limite: 100K/mois)
- Compute hours (limite: 100 GB-heures/mois)
- Pourcentage d'usage des limites
- Projections mensuelles

### 2. PerformanceAlertsPanel
**Fichier:** `src/components/admin/PerformanceAlertsPanel.tsx`

**Fonctionnalités:**
- Surveillance des performances des fonctions
- Alertes configurables pour:
  - Fonctions lentes (>10s par défaut)
  - Usage mémoire élevé (>400MB par défaut)
  - Taux d'erreur élevé (>5% par défaut)
  - Temps de réponse lent (>5000ms par défaut)
- Analyse des tendances de performance
- Configuration des seuils en temps réel

### 3. VercelMonitoringDashboard
**Fichier:** `src/components/admin/VercelMonitoringDashboard.tsx`

**Fonctionnalités:**
- Interface à onglets (Vue d'ensemble, Usage, Performance)
- Vue consolidée du système optimisé
- Résumé des optimisations implémentées
- Statut des systèmes de fallback

## 🔧 Système d'Alertes de Performance

### PerformanceAlerts Class
**Fichier:** `src/lib/vercel/performance-alerts.ts`

**Seuils par défaut:**
```typescript
{
  slowFunctionThreshold: 10,     // 10 secondes
  highMemoryThreshold: 400,      // 400 MB
  highErrorRateThreshold: 5,     // 5%
  responseTimeThreshold: 5000,   // 5 secondes
}
```

**Types d'alertes:**
- `slow_function`: Fonction qui prend plus de 10s à s'exécuter
- `high_memory`: Usage mémoire supérieur à 400MB
- `high_error_rate`: Taux d'erreur supérieur à 5%
- `slow_response`: Temps de réponse supérieur à 5s

**Niveaux de sévérité:**
- `warning`: Seuil dépassé mais pas critique
- `error`: Seuil significativement dépassé
- `critical`: Seuil dangereusement dépassé

### Recommandations automatiques
Chaque alerte inclut des recommandations spécifiques:

**Pour les fonctions lentes:**
- Optimiser les requêtes base de données
- Implémenter le cache pour les données fréquentes
- Diviser la fonction en parties plus petites
- Revoir la complexité algorithmique

**Pour l'usage mémoire élevé:**
- Implémenter le streaming processing
- Forcer le garbage collection
- Réduire les structures de données en mémoire
- Utiliser le lazy loading

**Pour le taux d'erreur élevé:**
- Analyser les logs d'erreur
- Améliorer la gestion d'erreur et retry logic
- Ajouter la validation des inputs
- Vérifier les dépendances externes

## 🚀 Intégration et Utilisation

### 1. Monitoring automatique des API routes

```typescript
import { withPerformanceMonitoring } from '@/lib/vercel/performance-integration';

async function GET(request: NextRequest): Promise<NextResponse> {
  // Votre logique API
}

export { withPerformanceMonitoring(GET, '/api/your-route') as GET };
```

### 2. Monitoring avec décorateur

```typescript
import { MonitorPerformance } from '@/lib/vercel/performance-integration';

class MyService {
  @MonitorPerformance('MyService.processData')
  async processData(data: any) {
    // Votre logique
  }
}
```

### 3. Enregistrement manuel de métriques

```typescript
import { recordPerformanceMetrics } from '@/lib/vercel/performance-integration';

await recordPerformanceMetrics(
  'custom-operation',
  executionTime,    // en secondes
  memoryUsage,      // en MB
  errorRate,        // en pourcentage
  responseTime      // en millisecondes
);
```

## 📡 API Routes

### GET /api/admin/performance-metrics
Retourne les métriques de performance et statistiques.

**Réponse:**
```json
{
  "success": true,
  "data": {
    "functionStats": [...],
    "activeAlerts": [...],
    "summary": {
      "totalFunctions": 5,
      "activeAlerts": 2,
      "functionsWithIssues": 1,
      "degradingFunctions": 0,
      "improvingFunctions": 2
    }
  }
}
```

### POST /api/admin/performance-metrics
Met à jour les seuils d'alerte.

**Body:**
```json
{
  "thresholds": {
    "slowFunctionThreshold": 15,
    "highMemoryThreshold": 500,
    "highErrorRateThreshold": 3,
    "responseTimeThreshold": 8000
  }
}
```

### DELETE /api/admin/performance-metrics
Efface l'historique des métriques.

**Query params:**
- `function` (optionnel): Nom de la fonction spécifique à effacer

## 🎨 Interface Utilisateur

### Codes couleur des alertes
- **Vert** (`bg-green-50 text-green-600`): Normal, dans les limites
- **Jaune** (`bg-yellow-50 text-yellow-600`): Attention, approche des limites
- **Orange** (`bg-orange-50 text-orange-600`): Élevé, action recommandée
- **Rouge** (`bg-red-50 text-red-600`): Critique, action immédiate requise

### Icônes et indicateurs
- ⚡ Usage Vercel
- 🚀 Performance
- 📊 Métriques
- 🚨 Alertes actives
- 💡 Recommandations
- 📈 Tendances (amélioration)
- 📉 Tendances (dégradation)
- ➡️ Tendances (stable)

## 🔄 Système de Cache et Optimisations

### Cooldown des alertes
- **Durée:** 15 minutes par défaut
- **Objectif:** Éviter le spam d'alertes
- **Configuration:** Modifiable via `alertCooldownMs`

### Historique des métriques
- **Stockage:** 100 dernières mesures par fonction
- **Rotation:** Automatique (FIFO)
- **Analyse:** Calcul des tendances sur les 10 dernières mesures

### Batch processing
- **Taille de batch:** 10 métriques par défaut
- **Intervalle de flush:** 30 secondes
- **Objectif:** Optimiser les performances d'écriture

## 📈 Métriques et KPIs

### Métriques de base
- **Temps d'exécution:** Durée totale de la fonction
- **Usage mémoire:** Pic de consommation mémoire
- **Taux d'erreur:** Pourcentage d'erreurs sur les requêtes
- **Temps de réponse:** Latence perçue par l'utilisateur

### Métriques calculées
- **Tendance:** Amélioration/dégradation/stable
- **Confiance:** Basée sur le nombre de mesures
- **Moyennes mobiles:** Sur les 10 dernières mesures
- **Projections:** Basées sur les tendances actuelles

## 🛠️ Configuration et Personnalisation

### Variables d'environnement
```env
# Optionnel - pour les vraies métriques Vercel
VERCEL_API_TOKEN=your_token_here
VERCEL_TEAM_ID=your_team_id
VERCEL_PROJECT_ID=your_project_id

# Configuration des alertes
PERFORMANCE_MONITORING_ENABLED=true
ALERT_COOLDOWN_MINUTES=15
BATCH_SIZE=10
FLUSH_INTERVAL_MS=30000
```

### Configuration par défaut
```typescript
export const defaultPerformanceConfig = {
  enabled: true,
  batchSize: 10,
  flushInterval: 30000,
  thresholds: {
    slowFunction: 10,
    highMemory: 400,
    highErrorRate: 5,
    slowResponse: 5000,
  },
};
```

## 🧪 Tests et Validation

### Script de test
```bash
npx tsx scripts/test-monitoring-dashboard-simple.ts
```

**Tests inclus:**
- Vérification des fichiers de composants
- Validation des interfaces TypeScript
- Test des fonctions utilitaires
- Vérification de la configuration
- Test de la logique d'alertes
- Validation de la structure des composants

### Tests unitaires
Les composants peuvent être testés avec Jest/React Testing Library:

```typescript
import { render, screen } from '@testing-library/react';
import { UsageDashboard } from './UsageDashboard';

test('renders usage dashboard', () => {
  render(<UsageDashboard />);
  expect(screen.getByText('Monitoring Vercel')).toBeInTheDocument();
});
```

## 🚀 Déploiement et Production

### Checklist de déploiement
- [ ] Variables d'environnement configurées
- [ ] Tests passés avec succès
- [ ] Composants intégrés dans l'admin dashboard
- [ ] API routes déployées
- [ ] Monitoring activé sur les fonctions critiques

### Intégration dans l'admin existant
```typescript
import { VercelMonitoringDashboard } from '@/components/admin/VercelMonitoringDashboard';

export function AdminDashboard() {
  return (
    <div>
      {/* Autres composants admin */}
      <VercelMonitoringDashboard className="mt-8" />
    </div>
  );
}
```

## 📚 Ressources et Références

### Documentation Vercel
- [Vercel Limits](https://vercel.com/docs/concepts/limits/overview)
- [Vercel API](https://vercel.com/docs/rest-api)
- [Vercel Functions](https://vercel.com/docs/concepts/functions/serverless-functions)

### Bonnes pratiques
- Surveiller régulièrement les métriques
- Ajuster les seuils selon les besoins
- Analyser les tendances pour anticiper les problèmes
- Utiliser les recommandations pour optimiser les performances
- Tester les fallbacks régulièrement

## 🔮 Évolutions Futures

### Fonctionnalités prévues
- Intégration avec des services de monitoring externes (DataDog, New Relic)
- Alertes par webhook/Slack
- Dashboards personnalisables
- Métriques business (conversion, engagement)
- Prédictions ML pour l'usage futur

### Optimisations possibles
- Cache Redis pour les métriques
- Compression des données historiques
- Agrégation des métriques par période
- Export des données vers des outils d'analyse

---

**Version:** 1.0.0  
**Dernière mise à jour:** Janvier 2025  
**Auteur:** Système d'optimisation Vercel Plan Gratuit