# Migration Scripts Documentation

## Vue d'ensemble

Cette documentation décrit les scripts de migration développés pour l'optimisation Vercel Plan Gratuit. Ces scripts permettent de migrer en toute sécurité du système actuel (4 cron jobs) vers le système optimisé (2 cron jobs) tout en respectant les limites du plan Vercel Hobby.

## Scripts disponibles

### 1. Script de Backup (`migration-backup.ts`)

**Usage:** `npm run migration:backup`

**Objectif:** Crée un backup complet du système avant migration

**Fonctionnalités:**
- ✅ Sauvegarde de la configuration `vercel.json` actuelle
- ✅ Export de toutes les données d'audit de la base de données
- ✅ Création d'un snapshot de la structure de base de données
- ✅ Génération de checksums pour vérifier l'intégrité
- ✅ Rapport de backup détaillé

**Sortie:**
```
backups/migration-{timestamp}/
├── vercel.json                 # Configuration Vercel sauvegardée
├── backup-metadata.json        # Métadonnées du backup
├── BACKUP_REPORT.md           # Rapport détaillé
└── database/                  # Données de base
    ├── scanned_links.json
    ├── validation_results.json
    ├── applied_corrections.json
    ├── resource_requests.json
    ├── audit_history.json
    ├── link_health_metrics.json
    └── schema-snapshot.json
```

### 2. Script de Migration (`migration-deploy.ts`)

**Usage:** 
- `npm run migration:deploy` (mode production)
- `npm run migration:deploy:dry-run` (mode test)
- `npm run migration:deploy --backup-id=<id>` (avec backup existant)

**Objectif:** Déploie progressivement le nouveau système optimisé

**Phases d'exécution:**
1. **Pre-migration validation** - Validation du système actuel
2. **Backup creation** - Création du backup de sécurité
3. **Deploy new system** - Déploiement du système optimisé
4. **Health checks** - Tests de santé post-migration
5. **Cleanup** - Nettoyage et finalisation

**Validations effectuées:**
- ✅ Configuration Vercel actuelle
- ✅ Connectivité base de données
- ✅ Existence des API routes
- ✅ Variables d'environnement
- ✅ Composants du nouveau système
- ✅ Métriques Vercel
- ✅ Systèmes de fallback
- ✅ Performance

### 3. Script de Rollback (`migration-rollback.ts`)

**Usage:** 
- `npm run migration:rollback <backup-id>` (mode normal)
- `npm run migration:rollback <backup-id> --force` (mode forcé)
- `npm run migration:rollback <backup-id> --notify` (avec notifications)

**Objectif:** Restaure rapidement l'ancien système en cas de problème

**Étapes de rollback:**
1. **Validate backup** - Validation du backup de restauration
2. **Stop current system** - Arrêt du système actuel
3. **Restore Vercel config** - Restauration de la configuration
4. **Restore database** - Restauration des données
5. **Verify system health** - Vérification de la santé du système
6. **Send notifications** - Notifications d'urgence (optionnel)

**Sécurités:**
- ✅ Validation de l'intégrité du backup (checksums)
- ✅ Sauvegarde de la configuration actuelle avant rollback
- ✅ Sauvegarde des données actuelles avant restauration
- ✅ Mode `--force` pour contourner les validations non-critiques
- ✅ Notifications d'urgence par email

## Utilisation recommandée

### Workflow de migration standard

```bash
# 1. Créer un backup
npm run migration:backup

# 2. Test en dry-run
npm run migration:deploy:dry-run

# 3. Migration en production
npm run migration:deploy

# 4. En cas de problème, rollback
npm run migration:rollback <backup-id>
```

### Workflow de migration avec backup existant

```bash
# Utiliser un backup existant
npm run migration:deploy --backup-id=2025-08-01T07-36-58-646Z
```

### Rollback d'urgence

```bash
# Rollback normal
npm run migration:rollback 2025-08-01T07-36-58-646Z

# Rollback forcé (ignore les erreurs non-critiques)
npm run migration:rollback 2025-08-01T07-36-58-646Z --force

# Rollback avec notifications
npm run migration:rollback 2025-08-01T07-36-58-646Z --notify
```

## Structure des fichiers générés

### Backups
```
backups/migration-{timestamp}/
├── vercel.json                 # Configuration sauvegardée
├── backup-metadata.json        # Métadonnées et checksums
├── BACKUP_REPORT.md           # Rapport de backup
└── database/                  # Données exportées
    └── *.json                 # Tables de base de données
```

### Logs de migration
```
migration-logs/migration-{timestamp}.json
```

### Logs de rollback
```
rollback-logs/rollback-{timestamp}.json
```

### Sauvegardes de rollback
```
rollback-backups/
├── {table}-{timestamp}.json    # Données sauvegardées avant rollback
└── vercel.json.rollback-{timestamp}  # Config sauvegardée
```

## Métriques et monitoring

### Métriques de backup
- Nombre total d'enregistrements sauvegardés
- Taille totale du backup
- Checksums de vérification d'intégrité
- Durée d'exécution

### Métriques de migration
- Nombre de validations réussies/échouées
- Durée de chaque phase
- État de santé du système post-migration
- Métriques d'usage Vercel

### Métriques de rollback
- Nombre d'étapes réussies/échouées
- Durée totale de rollback
- Intégrité des données restaurées
- État de santé du système restauré

## Gestion des erreurs

### Erreurs critiques vs non-critiques

**Critiques (bloquent l'exécution):**
- Backup corrompu ou manquant
- Échec de restauration de la configuration Vercel
- Échec de restauration de la base de données
- Échec des tests de santé système

**Non-critiques (warnings):**
- Échec d'envoi de notifications
- Workflows GitHub Actions manquants
- Métriques de performance dégradées

### Mode `--force`

Le mode `--force` permet de:
- Ignorer les erreurs de checksum
- Continuer malgré les échecs non-critiques
- Forcer la restauration même avec des données partielles

⚠️ **Attention:** Utiliser `--force` uniquement en cas d'urgence absolue.

## Notifications d'urgence

### Configuration requise
```env
SENDGRID_API_KEY=your_api_key
SENDGRID_FROM_EMAIL=admin@yourdomain.com
```

### Contenu des notifications
- Détails du rollback (timestamp, backup ID, durée)
- Statut des étapes (succès/échec)
- Erreurs rencontrées
- Actions recommandées

## Dépannage

### Problèmes courants

**1. Backup non trouvé**
```bash
# Lister les backups disponibles
npm run migration:rollback
```

**2. Erreur de checksum**
```bash
# Forcer le rollback
npm run migration:rollback <backup-id> --force
```

**3. Échec de restauration de base de données**
```bash
# Vérifier les logs
cat rollback-logs/rollback-{timestamp}.json
```

**4. Variables d'environnement manquantes**
```bash
# Vérifier le fichier .env
cat .env
```

### Logs de débogage

Tous les scripts génèrent des logs détaillés:
- Timestamps précis
- Messages d'erreur complets
- Métriques de performance
- État de chaque validation

## Sécurité

### Données sensibles
- Les backups ne contiennent pas de clés API
- Les checksums permettent de vérifier l'intégrité
- Les configurations sont sauvegardées avant modification

### Permissions
- Scripts nécessitent les variables d'environnement Supabase
- Accès en écriture au système de fichiers
- Permissions d'envoi d'emails (optionnel)

## Maintenance

### Nettoyage périodique
```bash
# Supprimer les anciens backups (>30 jours)
find backups/ -name "migration-*" -mtime +30 -exec rm -rf {} \;

# Supprimer les anciens logs (>30 jours)
find migration-logs/ -name "*.json" -mtime +30 -delete
find rollback-logs/ -name "*.json" -mtime +30 -delete
```

### Monitoring
- Surveiller la taille des répertoires de backup
- Vérifier régulièrement l'intégrité des backups
- Tester périodiquement les procédures de rollback

---

**Note:** Cette documentation est générée automatiquement et mise à jour avec chaque version des scripts de migration.