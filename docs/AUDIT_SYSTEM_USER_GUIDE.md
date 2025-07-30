# Guide d'utilisation - Système d'audit des liens morts

## 📋 Vue d'ensemble

Le système d'audit des liens morts de Laurent Serre Développement est une solution complète et automatisée qui :
- ✅ **Détecte automatiquement** tous les liens morts du site (internes, externes, téléchargements)
- 🔧 **Propose et applique** des corrections automatiques intelligentes
- 📊 **Génère des rapports** détaillés avec analyse d'impact SEO
- 📧 **Envoie des notifications** via SendGrid vers ls@laurentserre.com
- 🎯 **Gère les demandes** de ressources manquantes des utilisateurs
- 📈 **Surveille en continu** la santé des liens avec tableau de bord
- 🔄 **S'intègre** aux workflows de déploiement et CI/CD

### Bénéfices business

- **SEO amélioré** : Élimination des liens morts qui pénalisent le référencement
- **Expérience utilisateur** : Réduction des erreurs 404 et pages cassées
- **Productivité** : Automatisation des tâches de maintenance manuelle
- **Visibilité** : Monitoring proactif avec alertes en temps réel
- **Conversion** : Transformation des liens morts en opportunités de lead generation

## 🚀 Démarrage rapide

### 1. Lancer un audit complet

```bash
# Audit complet avec rapport
npm run audit:full

# Audit avec corrections automatiques
npm run audit:fix

# Vérifier le statut du système
npm run audit:status
```

### 2. Utiliser l'interface CLI

```bash
# Aide générale
npm run audit:cli -- --help

# Audit avec options personnalisées
npm run audit:cli audit --external --max-depth 3 --batch-size 20

# Appliquer les corrections suggérées
npm run audit:cli fix --confidence-threshold 0.8 --backup

# Annuler les dernières corrections
npm run audit:cli rollback --rollback-id backup_123
```

## 📊 Interface de monitoring

### Tableau de bord admin

Accédez au tableau de bord via : `/admin/audit-dashboard`

**Métriques disponibles :**
- 🎯 Score de santé des liens (0-100%)
- 📈 Évolution du nombre de liens morts
- 🔧 Corrections appliquées automatiquement
- 📧 Demandes de ressources reçues

### Graphiques et analyses

- **Graphique de santé** : Évolution temporelle du score SEO
- **Tableau des liens morts** : Liste détaillée avec priorités
- **Analyse d'impact** : Estimation de la perte de trafic
- **Demandes populaires** : Ressources les plus demandées

## 🔧 Configuration

### Variables d'environnement

```bash
# SendGrid (obligatoire)
SENDGRID_API_KEY=SG.your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@laurentserre.com
SENDGRID_FROM_NAME=Système Audit - Laurent Serre
ADMIN_EMAIL=ls@laurentserre.com

# Supabase (obligatoire)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Configuration audit (optionnel)
AUDIT_SCHEDULE_ENABLED=true
AUDIT_MAX_CONCURRENT=5
AUDIT_TIMEOUT=10000
AUDIT_RETRY_ATTEMPTS=3
```

### Configuration avancée

Créez un fichier `audit.config.js` à la racine :

```javascript
module.exports = {
  scanner: {
    baseUrl: 'https://laurentserre.com',
    maxDepth: 2,
    includeExternal: true,
    excludePatterns: [
      '*.test.*',
      'node_modules/**',
      '.next/**',
      'coverage/**'
    ],
    followRedirects: true
  },
  validator: {
    timeout: 10000,
    retryAttempts: 3,
    userAgent: 'Laurent Serre Audit Bot 1.0',
    batchSize: 20,
    rateLimitDelay: 100,
    checkAnchors: true
  },
  corrector: {
    confidenceThreshold: 0.7,
    autoApply: false,
    createBackups: true,
    maxCorrectionsPerRun: 50
  },
  reporting: {
    formats: ['json', 'html', 'csv'],
    outputDir: './reports',
    includeScreenshots: false,
    detailedAnalysis: true
  }
}
```

## 📧 Système de notifications

### Types d'emails envoyés

1. **Demandes de ressources** → `ls@laurentserre.com`
   - Déclencheur : Utilisateur clique "Demander cette ressource"
   - Contenu : Email utilisateur, ressource demandée, fréquence
   - Action : Créer la ressource demandée

2. **Alertes liens morts** → `ls@laurentserre.com`
   - Déclencheur : Nouveaux liens morts détectés
   - Contenu : Liste des liens critiques, impact SEO
   - Action : Corriger les liens prioritaires

3. **Réponses automatiques** → Utilisateurs
   - Déclencheur : Demande de ressource soumise
   - Contenu : Confirmation, ressources alternatives
   - Action : Rassurer l'utilisateur

4. **Rapports hebdomadaires** → `ls@laurentserre.com`
   - Déclencheur : Tous les lundis à 9h
   - Contenu : Résumé de la semaine, tendances
   - Action : Suivi de la santé du site

### Personnalisation des templates

Les templates sont dans `src/lib/email/templates/` :

- `resource-request.html` : Demande de ressource
- `audit-alert.html` : Alerte liens morts  
- `auto-response.html` : Réponse automatique
- `weekly-report.html` : Rapport hebdomadaire

## 🎯 Gestion des demandes de ressources

### Workflow utilisateur

1. **Utilisateur** clique sur un lien vers une ressource manquante
2. **Système** affiche une page "Ressource en développement"
3. **Utilisateur** peut cliquer "Demander cette ressource"
4. **Modal** s'ouvre avec formulaire (email + message optionnel)
5. **Système** envoie notification à Laurent + confirmation utilisateur

### Interface d'administration

Via `/admin/resource-requests` :

- 📊 **Statistiques** : Total demandes, ressources populaires
- 📋 **Liste des demandes** : Filtrable par statut, date
- 🎯 **Priorisation** : Basée sur la fréquence des demandes
- ✅ **Gestion** : Marquer comme "en cours" ou "terminé"

### Priorisation automatique

Le système calcule automatiquement la priorité :

```
Priorité = (Nombre de demandes × 2) + Impact SEO + Ancienneté
```

- **Critique** : Score > 15
- **Élevée** : Score 10-15  
- **Moyenne** : Score 5-10
- **Faible** : Score < 5

## 🔍 Analyse et rapports

### Types de rapports

1. **Rapport JSON** (`reports/audit-YYYY-MM-DD.json`)
   - Format machine-readable
   - Données complètes pour intégrations
   - Historique des corrections

2. **Rapport HTML** (`reports/audit-YYYY-MM-DD.html`)
   - Interface visuelle interactive
   - Graphiques et tableaux
   - Filtres et tri dynamiques

3. **Export CSV** (`reports/audit-YYYY-MM-DD.csv`)
   - Format tableur
   - Analyse dans Excel/Google Sheets
   - Vues par priorité, type, page

### Métriques clés

- **Score de santé SEO** : Pourcentage de liens valides
- **Impact trafic estimé** : Perte potentielle en %
- **Temps de réponse moyen** : Performance des liens externes
- **Taux de correction** : Efficacité du système automatique

### Analyse d'impact SEO

Le système évalue l'impact de chaque lien mort :

- **Impact 9-10** : Liens critiques (homepage, navigation)
- **Impact 7-8** : Liens importants (pages principales)
- **Impact 4-6** : Liens moyens (contenu, blog)
- **Impact 1-3** : Liens mineurs (footer, mentions)

## 🛠️ Maintenance et dépannage

### Commandes de maintenance

```bash
# Nettoyer les anciens rapports
npm run maintenance:clean

# Vérifier la santé du système
npm run maintenance:health

# Réinitialiser la base de données
npm run setup-audit-db

# Tester la configuration
npm run test-audit-config

# Maintenance complète (recommandée hebdomadairement)
npm run maintenance:full

# Optimiser la base de données
npm run maintenance:optimize-db

# Vérifier l'intégrité des backups
npm run maintenance:check-backups
```

### Guide de dépannage complet

#### 🚨 Problèmes critiques

##### ❌ Erreur SendGrid "Invalid API Key"

**Symptômes :**
- Emails non envoyés
- Erreur 401 Unauthorized dans les logs
- Notifications d'audit manquantes

**Diagnostic :**
```bash
# Tester la configuration SendGrid
npm run test:sendgrid-config

# Vérifier les variables d'environnement
npm run audit:cli status --email
```

**Solutions :**
1. **Vérifier la clé API** :
   ```bash
   echo $SENDGRID_API_KEY  # Doit commencer par SG.
   ```
2. **Régénérer la clé** dans SendGrid Dashboard → Settings → API Keys
3. **Vérifier les permissions** : La clé doit avoir "Mail Send" minimum
4. **Mettre à jour Vercel** : Redéployer après changement de variable

##### ❌ Erreur Supabase "Connection failed"

**Symptômes :**
- Impossible de sauvegarder les résultats d'audit
- Dashboard admin inaccessible
- Erreurs de base de données dans les logs

**Diagnostic :**
```bash
# Tester la connexion Supabase
npm run audit:cli status --db

# Vérifier les tables
npm run setup-audit-db --check-only
```

**Solutions :**
1. **Vérifier l'URL du projet** :
   ```bash
   echo $NEXT_PUBLIC_SUPABASE_URL
   ```
2. **Vérifier la clé service** :
   ```bash
   echo $SUPABASE_SERVICE_ROLE_KEY
   ```
3. **Recréer les tables** si nécessaire :
   ```bash
   npm run setup-audit-db --force
   ```
4. **Vérifier les politiques RLS** dans Supabase Dashboard

#### ⚠️ Problèmes de performance

##### ❌ Audit trop lent (>30 minutes)

**Causes possibles :**
- Trop de liens externes lents
- Timeouts insuffisants
- Batch size trop petit
- Rate limiting trop agressif

**Solutions :**
1. **Optimiser la configuration** :
   ```javascript
   // audit.config.js
   module.exports = {
     validator: {
       timeout: 15000,        // Augmenter le timeout
       batchSize: 50,         // Traiter plus de liens en parallèle
       rateLimitDelay: 50,    // Réduire le délai entre requêtes
       maxConcurrent: 10      // Plus de connexions simultanées
     }
   }
   ```

2. **Exclure les domaines lents** :
   ```javascript
   excludePatterns: [
     'slow-external-site.com/**',
     'timeout-prone-domain.com/**'
   ]
   ```

3. **Audit par étapes** :
   ```bash
   # Audit interne seulement
   npm run audit:cli audit --internal-only
   
   # Puis audit externe séparé
   npm run audit:cli audit --external-only --timeout 30000
   ```

##### ❌ Trop de faux positifs

**Symptômes :**
- Liens valides marqués comme morts
- Corrections automatiques incorrectes
- Score de santé artificiellement bas

**Diagnostic :**
```bash
# Analyser les faux positifs
npm run audit:cli analyze --false-positives

# Tester manuellement des liens suspects
npm run audit:cli test-url https://example.com/suspect-link
```

**Solutions :**
1. **Ajuster les seuils de confiance** :
   ```javascript
   corrector: {
     confidenceThreshold: 0.9,  // Plus strict
     autoApply: false           // Désactiver l'auto-correction
   }
   ```

2. **Améliorer les patterns d'exclusion** :
   ```javascript
   excludePatterns: [
     '*.pdf#page=*',           // Liens PDF avec ancres
     'mailto:*',               // Liens email
     'tel:*',                  // Liens téléphone
     'javascript:*',           // Liens JavaScript
     'data:*',                 // Data URLs
     'external-api/**'         // APIs externes
   ]
   ```

3. **Configurer le User-Agent** :
   ```javascript
   validator: {
     userAgent: 'Mozilla/5.0 (compatible; Laurent-Serre-Audit/1.0)'
   }
   ```

#### 🔧 Problèmes de correction

##### ❌ Corrections automatiques incorrectes

**Symptômes :**
- Liens corrigés pointent vers de mauvaises ressources
- Formatage de fichiers cassé
- Corrections en cascade non désirées

**Solutions immédiates :**
1. **Rollback immédiat** :
   ```bash
   # Annuler la dernière correction
   npm run audit:cli rollback --latest
   
   # Annuler toutes les corrections du jour
   npm run audit:cli rollback --date today
   
   # Rollback spécifique
   npm run audit:cli rollback --id backup_20250730_143022
   ```

2. **Désactiver l'auto-correction** :
   ```javascript
   corrector: {
     autoApply: false,
     createBackups: true,
     maxCorrectionsPerRun: 0
   }
   ```

3. **Mode interactif pour validation** :
   ```bash
   npm run audit:cli fix --interactive --dry-run
   ```

**Prévention :**
1. **Toujours tester en dry-run** :
   ```bash
   npm run audit:cli fix --dry-run --confidence 0.95
   ```

2. **Limiter les corrections par run** :
   ```javascript
   corrector: {
     maxCorrectionsPerRun: 10,
     requireManualApproval: true
   }
   ```

#### 📊 Problèmes de rapports

##### ❌ Rapports non générés

**Causes :**
- Permissions de fichiers insuffisantes
- Espace disque insuffisant
- Erreurs de template

**Solutions :**
1. **Vérifier les permissions** :
   ```bash
   mkdir -p reports
   chmod 755 reports
   ```

2. **Vérifier l'espace disque** :
   ```bash
   df -h
   ```

3. **Forcer la régénération** :
   ```bash
   npm run audit:cli report --force --format all
   ```

##### ❌ Dashboard admin inaccessible

**Solutions :**
1. **Vérifier l'authentification** :
   ```bash
   # Accéder directement
   curl -H "Authorization: Bearer $ADMIN_TOKEN" \
        http://localhost:3000/admin/audit-dashboard
   ```

2. **Reconstruire les métriques** :
   ```bash
   npm run maintenance:rebuild-metrics
   ```

### Monitoring proactif

#### Alertes automatiques

Le système envoie automatiquement des alertes pour :

- **Score de santé < 85%** → Email immédiat
- **> 20 liens morts** → Issue GitHub + Email
- **Échec d'audit 3 fois consécutives** → Alerte critique
- **Espace disque < 10%** → Alerte maintenance
- **Temps d'exécution > 30 min** → Alerte performance

#### Métriques à surveiller

```bash
# Tableau de bord de santé
npm run maintenance:health --detailed

# Métriques en temps réel
npm run audit:cli metrics --live

# Historique des performances
npm run audit:cli metrics --history --days 30
```

**Seuils recommandés :**
- **Score de santé** : > 90% (excellent), > 80% (acceptable)
- **Temps d'exécution** : < 5 min (1000 liens), < 15 min (5000 liens)
- **Taux de faux positifs** : < 5%
- **Disponibilité** : > 99.5%

### Maintenance préventive

#### Tâches quotidiennes (automatisées)

- Audit complet à 2h du matin
- Nettoyage des logs > 7 jours
- Vérification de l'espace disque
- Test de connectivité SendGrid/Supabase

#### Tâches hebdomadaires

```bash
# Lundi matin (automatisé)
npm run maintenance:weekly

# Inclut :
# - Rapport hebdomadaire par email
# - Nettoyage des anciens rapports
# - Optimisation de la base de données
# - Vérification des backups
# - Mise à jour des métriques
```

#### Tâches mensuelles

```bash
# Premier du mois
npm run maintenance:monthly

# Inclut :
# - Archivage des données anciennes
# - Analyse des tendances
# - Mise à jour des exclusions
# - Audit de sécurité
# - Optimisation des performances
```

### Logs et debugging

#### Niveaux de logs

```bash
# Logs normaux
npm run audit:cli audit

# Logs détaillés
DEBUG=audit:* npm run audit:cli audit

# Logs très détaillés
DEBUG=audit:*,sendgrid:*,supabase:* npm run audit:cli audit

# Logs dans un fichier
npm run audit:cli audit 2>&1 | tee logs/audit-$(date +%Y%m%d).log
```

#### Localisation des logs

- **Console** : Logs temps réel pendant l'exécution
- **Fichiers** : `logs/audit-YYYY-MM-DD.log`
- **Supabase** : Table `audit_history` pour l'historique
- **Vercel** : Function logs dans le dashboard Vercel
- **SendGrid** : Activity Feed dans SendGrid Dashboard

#### Analyse des logs

```bash
# Rechercher des erreurs spécifiques
grep -i "error\|failed\|timeout" logs/audit-*.log

# Analyser les performances
grep "execution time" logs/audit-*.log | tail -10

# Vérifier les corrections appliquées
grep "correction applied" logs/audit-*.log
```

### Logs et debugging

Les logs sont disponibles dans :
- **Console** : Logs temps réel pendant l'audit
- **Fichiers** : `logs/audit-YYYY-MM-DD.log`
- **Supabase** : Table `audit_history` pour l'historique
- **Vercel** : Logs des fonctions serverless

### Monitoring de performance

Surveillez ces métriques :
- **Temps d'exécution** : < 5 minutes pour 1000 liens
- **Utilisation mémoire** : < 200MB pendant l'audit
- **Taux d'erreur** : < 5% de faux positifs
- **Disponibilité** : 99.9% uptime des audits programmés

## 📅 Planification automatique

### Cron Jobs Vercel

Configuration dans `vercel.json` :

```json
{
  "crons": [
    {
      "path": "/api/audit-links",
      "schedule": "0 2 * * *"
    },
    {
      "path": "/api/weekly-report", 
      "schedule": "0 9 * * 1"
    }
  ]
}
```

### Déclencheurs personnalisés

- **Post-déploiement** : Audit automatique après chaque deploy
- **Webhook GitHub** : Audit sur push vers main
- **Manuel** : Via dashboard admin ou CLI
- **Programmé** : Quotidien, hebdomadaire, mensuel

## 🎓 Bonnes pratiques

### Optimisation des performances

1. **Batch processing** : Traitez les liens par lots de 20-50
2. **Rate limiting** : Respectez les limites des sites externes
3. **Cache intelligent** : Évitez de re-valider les liens récents
4. **Parallélisation** : Utilisez les workers pour les gros volumes

### Gestion des corrections

1. **Toujours créer des backups** avant correction
2. **Tester les corrections** sur un environnement de staging
3. **Valider manuellement** les corrections à faible confiance
4. **Documenter** les corrections personnalisées

### Monitoring continu

1. **Alertes proactives** : Configurez des seuils d'alerte
2. **Tendances** : Surveillez l'évolution du score SEO
3. **Faux positifs** : Ajustez régulièrement les exclusions
4. **Performance** : Optimisez les timeouts selon votre infrastructure

---

## 📞 Support

Pour toute question ou problème :

1. **Documentation technique** : `docs/AUDIT_SYSTEM_TECHNICAL_GUIDE.md`
2. **FAQ** : `docs/AUDIT_SYSTEM_FAQ.md`
3. **Issues GitHub** : Créez un ticket avec logs détaillés
4. **Contact direct** : ls@laurentserre.com pour les urgences

---

*Dernière mise à jour : 30 juillet 2025*