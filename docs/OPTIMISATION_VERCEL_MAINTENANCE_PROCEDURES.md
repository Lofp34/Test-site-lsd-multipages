# Procédures de Maintenance - Système d'Audit Optimisé Vercel

## Vue d'ensemble

Ce document détaille toutes les procédures de maintenance pour le système d'audit optimisé Vercel, incluant les tâches régulières, les runbooks pour incidents courants et les procédures de rollback d'urgence.

## Tâches de Maintenance Régulières

### Maintenance Automatique

#### Quotidienne (2h00) - `/api/audit-complete`
**Exécution automatique** : Tous les jours à 2h00 du matin

**Tâches incluses** :
- ✅ Audit complet des 498 liens du site
- ✅ Traitement de la queue des tâches prioritaires
- ✅ Corrections automatiques (max 5 par exécution)
- ✅ Envoi des alertes critiques
- ✅ Monitoring des ressources Vercel

**Vérifications post-exécution** :
```bash
# Vérifier les logs d'exécution
curl https://votre-site.com/api/admin/audit-logs?date=today

# Vérifier le status des liens
curl https://votre-site.com/api/admin/link-status

# Vérifier l'usage Vercel
curl https://votre-site.com/api/admin/vercel-usage
```

#### Hebdomadaire (Lundi 9h00) - `/api/maintenance-weekly`
**Exécution automatique** : Tous les lundis à 9h00

**Tâches incluses** :
- ✅ Génération des rapports hebdomadaires
- ✅ Nettoyage de la base de données (logs > 30 jours)
- ✅ Calcul des métriques et analytics business
- ✅ Vérification des quotas Vercel et projections
- ✅ Optimisation des index de base de données

**Vérifications post-exécution** :
```bash
# Vérifier la génération des rapports
ls -la reports/weekly-$(date +%Y-%m-%d).html

# Vérifier le nettoyage de la DB
psql $DATABASE_URL -c "SELECT COUNT(*) FROM audit_logs WHERE created_at < NOW() - INTERVAL '30 days';"

# Vérifier les métriques
curl https://votre-site.com/api/admin/weekly-metrics
```

### Maintenance Manuelle

#### Hebdomadaire (15 minutes)
**Responsable** : Administrateur système
**Fréquence** : Tous les lundis après la maintenance automatique

**Checklist** :
- [ ] Consulter le dashboard de monitoring
- [ ] Vérifier les alertes de la semaine
- [ ] Analyser les tendances d'usage Vercel
- [ ] Valider le fonctionnement des fallbacks
- [ ] Vérifier le cache hit rate (objectif > 85%)

**Procédure détaillée** :
```bash
# 1. Accéder au dashboard
open https://votre-site.com/admin/vercel-monitoring

# 2. Exporter les métriques de la semaine
curl -o weekly-metrics.csv https://votre-site.com/api/admin/export-metrics?period=week

# 3. Tester les fallbacks
curl -X POST https://votre-site.com/api/admin/test-fallbacks

# 4. Vérifier le cache
redis-cli info memory
redis-cli info stats
```

#### Mensuelle (30 minutes)
**Responsable** : Administrateur système + Équipe technique
**Fréquence** : Premier lundi de chaque mois

**Checklist** :
- [ ] Révision complète des métriques mensuelles
- [ ] Évaluation ROI pour upgrade Vercel Pro
- [ ] Optimisation des paramètres de cache
- [ ] Mise à jour de la documentation
- [ ] Test complet des procédures d'urgence
- [ ] Révision des seuils d'alerte

**Procédure détaillée** :
```bash
# 1. Génération du rapport mensuel complet
node scripts/generate-monthly-report.js

# 2. Calcul ROI upgrade Vercel Pro
node scripts/calculate-upgrade-roi.js

# 3. Optimisation du cache
node scripts/optimize-cache-settings.js

# 4. Test des procédures d'urgence
node scripts/test-emergency-procedures.js
```

#### Trimestrielle (1 heure)
**Responsable** : Équipe technique complète
**Fréquence** : Premier lundi de janvier, avril, juillet, octobre

**Checklist** :
- [ ] Audit complet du système
- [ ] Révision de l'architecture
- [ ] Mise à jour des dépendances
- [ ] Formation équipe sur nouvelles fonctionnalités
- [ ] Planification des évolutions
- [ ] Test de charge complet
- [ ] Révision des procédures de sécurité

## Runbooks pour Incidents Courants

### Incident 1 : Dépassement des Limites Vercel

#### Symptômes
- Alerte email "Limite Vercel critique"
- Dashboard affiche usage > 90%
- Fonctions Vercel qui échouent avec erreur de quota

#### Diagnostic
```bash
# Vérifier l'usage actuel
curl https://api.vercel.com/v1/teams/$TEAM_ID/usage \
  -H "Authorization: Bearer $VERCEL_TOKEN"

# Vérifier les logs des fonctions
vercel logs --limit=50

# Vérifier l'activation des fallbacks
curl https://votre-site.com/api/admin/fallback-status
```

#### Actions Correctives

**Immédiat (0-15 minutes)** :
1. **Vérifier l'activation automatique des fallbacks**
   ```bash
   # Vérifier que GitHub Actions a pris le relais
   curl https://api.github.com/repos/$REPO/actions/runs?status=in_progress
   ```

2. **Réduire la charge temporairement**
   ```bash
   # Activer le mode dégradation
   curl -X POST https://votre-site.com/api/admin/degradation \
     -d '{"level": "minimal"}'
   ```

**Court terme (15-60 minutes)** :
1. **Évaluer un upgrade Vercel Pro**
   ```bash
   # Calculer le ROI
   node scripts/calculate-upgrade-roi.js --urgent
   ```

2. **Optimiser le cache pour réduire l'usage**
   ```bash
   # Augmenter les TTL du cache
   node scripts/optimize-cache-emergency.js
   ```

**Moyen terme (1-24 heures)** :
1. **Implémenter l'upgrade si ROI positif**
2. **Ajuster les paramètres de batch processing**
3. **Réviser les seuils d'alerte**

#### Prévention
- Surveiller les projections mensuelles
- Optimiser régulièrement le cache
- Maintenir les fallbacks à jour

### Incident 2 : Panne des Fallbacks GitHub Actions

#### Symptômes
- Alerte "Fallback system failure"
- GitHub Actions workflows en échec
- Pas de backup pour les fonctions critiques

#### Diagnostic
```bash
# Vérifier le status des workflows GitHub
curl https://api.github.com/repos/$REPO/actions/workflows \
  -H "Authorization: token $GITHUB_TOKEN"

# Vérifier les logs des dernières exécutions
gh run list --limit=10

# Tester la connectivité API GitHub
curl -I https://api.github.com/rate_limit \
  -H "Authorization: token $GITHUB_TOKEN"
```

#### Actions Correctives

**Immédiat (0-5 minutes)** :
1. **Vérifier les tokens d'authentification**
   ```bash
   # Tester le token GitHub
   curl https://api.github.com/user \
     -H "Authorization: token $GITHUB_TOKEN"
   ```

2. **Redémarrer les workflows manuellement**
   ```bash
   # Déclencher le workflow d'urgence
   gh workflow run fallback-urgent-alerts.yml
   ```

**Court terme (5-30 minutes)** :
1. **Diagnostiquer la cause de l'échec**
   ```bash
   # Consulter les logs détaillés
   gh run view --log
   ```

2. **Corriger les workflows si nécessaire**
   ```bash
   # Éditer et redéployer les workflows
   git add .github/workflows/
   git commit -m "Fix fallback workflows"
   git push
   ```

**Moyen terme (30 minutes - 2 heures)** :
1. **Implémenter un fallback de fallback** (notifications email directes)
2. **Réviser la robustesse des workflows**
3. **Mettre en place un monitoring des fallbacks**

#### Prévention
- Test mensuel des fallbacks
- Monitoring du status GitHub Actions
- Tokens avec expiration longue et rotation planifiée

### Incident 3 : Performance Dégradée

#### Symptômes
- Fonctions qui prennent > 10 secondes
- Usage mémoire > 400MB
- Cache hit rate < 70%
- Taux d'erreur > 5%

#### Diagnostic
```bash
# Analyser les performances
curl https://votre-site.com/api/admin/performance-metrics

# Vérifier l'usage mémoire
node scripts/memory-analysis.js

# Analyser le cache
redis-cli info stats
redis-cli slowlog get 10
```

#### Actions Correctives

**Immédiat (0-10 minutes)** :
1. **Activer la dégradation gracieuse**
   ```bash
   curl -X POST https://votre-site.com/api/admin/degradation \
     -d '{"level": "essential"}'
   ```

2. **Forcer le garbage collection**
   ```bash
   curl -X POST https://votre-site.com/api/admin/force-gc
   ```

**Court terme (10-60 minutes)** :
1. **Optimiser les paramètres de batch**
   ```bash
   # Réduire la taille des batches
   node scripts/adjust-batch-size.js --size=5
   ```

2. **Nettoyer le cache si nécessaire**
   ```bash
   # Vider le cache des données obsolètes
   redis-cli FLUSHDB
   ```

**Moyen terme (1-24 heures)** :
1. **Analyser et optimiser les requêtes lentes**
2. **Ajuster les timeouts et paramètres**
3. **Réviser l'architecture si nécessaire**

#### Prévention
- Monitoring continu des performances
- Tests de charge réguliers
- Optimisation proactive du code

### Incident 4 : Perte de Données ou Corruption

#### Symptômes
- Rapports d'audit incohérents
- Erreurs de base de données
- Données manquantes dans les dashboards

#### Diagnostic
```bash
# Vérifier l'intégrité de la base de données
psql $DATABASE_URL -c "SELECT pg_database_size(current_database());"

# Vérifier les backups récents
ls -la backups/

# Tester les requêtes critiques
node scripts/test-database-integrity.js
```

#### Actions Correctives

**Immédiat (0-15 minutes)** :
1. **Arrêter les écritures pour éviter plus de corruption**
   ```bash
   curl -X POST https://votre-site.com/api/admin/maintenance-mode \
     -d '{"enabled": true}'
   ```

2. **Identifier l'étendue de la corruption**
   ```bash
   node scripts/assess-data-corruption.js
   ```

**Court terme (15 minutes - 2 heures)** :
1. **Restaurer depuis le backup le plus récent**
   ```bash
   # Restaurer la base de données
   node scripts/restore-database.js --backup=latest
   ```

2. **Valider l'intégrité après restauration**
   ```bash
   node scripts/validate-restoration.js
   ```

**Moyen terme (2-24 heures)** :
1. **Analyser la cause de la corruption**
2. **Implémenter des mesures préventives**
3. **Améliorer la stratégie de backup**

#### Prévention
- Backups automatiques quotidiens
- Tests de restauration mensuels
- Monitoring de l'intégrité des données

## Procédures de Rollback d'Urgence

### Déclencheurs de Rollback

**Rollback IMMÉDIAT requis si** :
- Usage Vercel > 95% des limites
- Taux d'erreur > 10% sur 1 heure
- Indisponibilité > 5 minutes
- Perte de données critiques
- Corruption de la base de données

### Procédure de Rollback Rapide (15 minutes max)

#### Étape 1 : Préparation (2 minutes)
```bash
# 1. Activer le mode maintenance
curl -X POST https://votre-site.com/api/admin/maintenance-mode \
  -d '{"enabled": true, "message": "Rollback en cours"}'

# 2. Notifier l'équipe
node scripts/notify-emergency-rollback.js

# 3. Créer un backup de l'état actuel
node scripts/emergency-backup.js
```

#### Étape 2 : Restauration Configuration (5 minutes)
```bash
# 1. Restaurer l'ancien vercel.json (4 cron jobs)
cp backups/vercel.json.backup vercel.json

# 2. Redéployer la configuration
vercel --prod

# 3. Vérifier le déploiement
vercel ls --scope=production
```

#### Étape 3 : Restauration Code (5 minutes)
```bash
# 1. Checkout vers la version stable
git checkout tags/v1.0-stable

# 2. Redéployer les API routes
vercel --prod --force

# 3. Vérifier les endpoints
curl https://votre-site.com/api/health
```

#### Étape 4 : Restauration Données (2 minutes)
```bash
# 1. Restaurer la base de données si nécessaire
node scripts/restore-database.js --backup=pre-migration

# 2. Vider le cache pour éviter les incohérences
redis-cli FLUSHALL
```

#### Étape 5 : Validation (1 minute)
```bash
# 1. Tester les fonctions critiques
node scripts/test-critical-functions.js

# 2. Vérifier les métriques
curl https://votre-site.com/api/admin/system-health

# 3. Désactiver le mode maintenance
curl -X POST https://votre-site.com/api/admin/maintenance-mode \
  -d '{"enabled": false}'
```

### Scripts de Rollback Automatisés

#### Script Principal de Rollback
```bash
#!/bin/bash
# scripts/emergency-rollback.sh

set -e

echo "🚨 DÉBUT DU ROLLBACK D'URGENCE"
echo "Timestamp: $(date)"

# Étape 1: Préparation
echo "📋 Étape 1: Préparation..."
curl -X POST https://votre-site.com/api/admin/maintenance-mode \
  -d '{"enabled": true}' || echo "⚠️ Impossible d'activer le mode maintenance"

node scripts/emergency-backup.js || echo "⚠️ Backup d'urgence échoué"

# Étape 2: Restauration configuration
echo "⚙️ Étape 2: Restauration configuration..."
cp backups/vercel.json.backup vercel.json
vercel --prod --yes

# Étape 3: Restauration code
echo "💻 Étape 3: Restauration code..."
git checkout tags/v1.0-stable
vercel --prod --force --yes

# Étape 4: Restauration données
echo "🗄️ Étape 4: Restauration données..."
node scripts/restore-database.js --backup=pre-migration
redis-cli FLUSHALL

# Étape 5: Validation
echo "✅ Étape 5: Validation..."
node scripts/test-critical-functions.js

if [ $? -eq 0 ]; then
  echo "✅ ROLLBACK RÉUSSI"
  curl -X POST https://votre-site.com/api/admin/maintenance-mode \
    -d '{"enabled": false}'
  node scripts/notify-rollback-success.js
else
  echo "❌ ROLLBACK ÉCHOUÉ - Intervention manuelle requise"
  node scripts/notify-rollback-failure.js
  exit 1
fi

echo "🏁 FIN DU ROLLBACK - $(date)"
```

#### Script de Test Post-Rollback
```bash
#!/bin/bash
# scripts/test-critical-functions.js

const tests = [
  {
    name: 'Health Check',
    url: 'https://votre-site.com/api/health',
    expected: 200
  },
  {
    name: 'Audit Links',
    url: 'https://votre-site.com/api/audit-links',
    expected: 200
  },
  {
    name: 'Generate Reports',
    url: 'https://votre-site.com/api/generate-reports',
    expected: 200
  },
  {
    name: 'Send Alerts',
    url: 'https://votre-site.com/api/send-alerts',
    expected: 200
  }
];

async function runTests() {
  let allPassed = true;
  
  for (const test of tests) {
    try {
      const response = await fetch(test.url);
      if (response.status === test.expected) {
        console.log(`✅ ${test.name}: PASSED`);
      } else {
        console.log(`❌ ${test.name}: FAILED (${response.status})`);
        allPassed = false;
      }
    } catch (error) {
      console.log(`❌ ${test.name}: ERROR (${error.message})`);
      allPassed = false;
    }
  }
  
  return allPassed;
}

runTests().then(success => {
  process.exit(success ? 0 : 1);
});
```

### Post-Rollback

#### Actions Immédiates
1. **Documenter l'incident** : Cause, actions prises, durée
2. **Analyser les causes racines** : Pourquoi le rollback était nécessaire
3. **Communiquer** avec les parties prenantes
4. **Planifier les corrections** pour éviter la récurrence

#### Analyse Post-Mortem
```markdown
# Post-Mortem Template

## Incident Summary
- **Date/Time**: 
- **Duration**: 
- **Impact**: 
- **Root Cause**: 

## Timeline
- **Detection**: 
- **Response**: 
- **Resolution**: 

## What Went Well
- 

## What Could Be Improved
- 

## Action Items
- [ ] 
- [ ] 
- [ ] 

## Prevention Measures
- 
```

## Contacts d'Urgence

### Équipe Technique
- **Admin Principal** : admin@votre-domaine.com / +33 X XX XX XX XX
- **Développeur Senior** : dev@votre-domaine.com / +33 X XX XX XX XX
- **DevOps** : devops@votre-domaine.com / +33 X XX XX XX XX

### Escalade
- **CTO** : cto@votre-domaine.com / +33 X XX XX XX XX
- **CEO** : ceo@votre-domaine.com / +33 X XX XX XX XX

### Support Externe
- **Vercel Support** : https://vercel.com/support (24h/7j)
- **GitHub Support** : https://support.github.com
- **Supabase Support** : https://supabase.com/support

---

Ces procédures de maintenance garantissent la stabilité et la performance du système d'audit optimisé. Elles doivent être régulièrement testées et mises à jour selon l'évolution du système.