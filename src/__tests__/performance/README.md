# Tests de Performance - Système Optimisé Vercel

Ce dossier contient la suite complète de tests pour valider le système d'audit optimisé pour le plan Vercel Hobby.

## 📋 Vue d'ensemble

Les tests sont organisés en 3 catégories principales correspondant aux exigences de la spec :

### 1. Tests de charge et performance (`load-performance.test.ts`)
- **Objectif** : Valider que le système peut traiter 498 liens en moins de 3 minutes
- **Métriques** : Temps d'exécution, usage mémoire, concurrence
- **Requirements** : 3.1, 3.2, 3.4

### 2. Tests d'usage des ressources Vercel (`vercel-usage.test.ts`)
- **Objectif** : Simuler un mois complet d'usage et valider les projections
- **Métriques** : Invocations, compute hours, seuils d'alerte
- **Requirements** : 1.2, 1.3, 4.2

### 3. Tests des fallbacks et résilience (`fallback-resilience.test.ts`)
- **Objectif** : Tester la bascule automatique et la récupération après panne
- **Métriques** : Temps de récupération, cohérence des données, efficacité des fallbacks
- **Requirements** : 5.1, 5.2, 5.4

## 🚀 Exécution des tests

### Tests individuels

```bash
# Tests de performance
npm run test:performance:load

# Tests d'usage Vercel
npm run test:performance:vercel

# Tests de résilience
npm run test:performance:fallback
```

### Suite complète

```bash
# Exécution de tous les tests avec rapport
npm run test:system:complete

# Ou directement avec le script
npx tsx scripts/test-system-complete.ts
```

## 📊 Critères de validation

### Performance
- ✅ 498 liens traités en < 3 minutes
- ✅ Usage mémoire < 512MB par fonction
- ✅ 3 batches simultanés sans conflit
- ✅ Taux de succès > 90%

### Usage Vercel
- ✅ < 80k invocations/mois (80% de la limite)
- ✅ < 80 GB-heures/mois (80% de la limite)
- ✅ Alertes à 70%, 80%, 90% des limites
- ✅ Projections mensuelles précises

### Résilience
- ✅ Bascule automatique vers GitHub Actions
- ✅ Dégradation gracieuse sous charge
- ✅ Récupération après panne < 45 secondes
- ✅ Perte de données < 5%

## 🔧 Configuration

### Variables d'environnement requises

```bash
# Pour les tests Vercel (optionnel, utilise des mocks par défaut)
VERCEL_TOKEN=your_vercel_token
VERCEL_TEAM_ID=your_team_id
VERCEL_PROJECT_ID=your_project_id

# Pour les tests GitHub Actions (optionnel, utilise des mocks par défaut)
GITHUB_TOKEN=your_github_token
GITHUB_OWNER=your_github_owner
GITHUB_REPO=your_github_repo
```

### Timeouts

Les tests ont des timeouts adaptés à leur complexité :
- Tests de charge : 10 minutes
- Tests d'usage : 8 minutes  
- Tests de résilience : 12 minutes

## 📈 Rapports

### Format JSON
```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "summary": {
    "loadPerformance": "PASS",
    "vercelUsage": "PASS", 
    "fallbackResilience": "PASS",
    "overallStatus": "PASS"
  },
  "results": [...],
  "recommendations": [...]
}
```

### Format HTML
Un rapport HTML détaillé est généré avec :
- Métriques visuelles
- Graphiques de performance
- Recommandations d'amélioration
- Détails des erreurs

## 🛠️ Développement

### Ajout de nouveaux tests

1. Créer le fichier de test dans le bon dossier
2. Suivre la convention de nommage : `*.test.ts`
3. Ajouter la suite dans `TEST_SUITES` du script principal
4. Documenter les nouveaux critères de validation

### Mocks et simulations

Les tests utilisent des mocks pour :
- API Vercel (usage monitoring)
- GitHub Actions (workflows)
- Base de données Supabase
- Services externes (SendGrid, etc.)

### Debugging

```bash
# Exécution avec logs détaillés
DEBUG=* npm run test:system:complete

# Test d'une suite spécifique en mode watch
npx vitest src/__tests__/performance/load-performance.test.ts --watch
```

## 📋 Checklist de validation

Avant de considérer le système comme prêt :

- [ ] Tous les tests passent (100% de réussite)
- [ ] Métriques de performance respectées
- [ ] Usage Vercel sous les limites de sécurité
- [ ] Fallbacks fonctionnels et testés
- [ ] Rapport de test généré et archivé
- [ ] Recommandations d'amélioration appliquées

## 🚨 Procédure d'échec

Si des tests échouent :

1. **Ne pas déployer en production**
2. Analyser les logs d'erreur détaillés
3. Appliquer les recommandations du rapport
4. Re-exécuter les tests après corrections
5. Documenter les problèmes et solutions

## 📚 Ressources

- [Spécification complète](../../../.kiro/specs/optimisation-vercel-gratuit/)
- [Documentation Vercel Limits](https://vercel.com/docs/concepts/limits/overview)
- [Guide des fallbacks](../../../src/lib/vercel/README.md)
- [Monitoring en production](../../../docs/MAINTENANCE_PROCEDURES.md)

---

**Note** : Ces tests sont critiques pour la validation du système optimisé. Ils doivent être exécutés avant chaque déploiement et intégrés dans la CI/CD.