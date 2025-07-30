# CLI d'Audit des Liens Morts - Guide Complet

## 📋 Vue d'ensemble

Le CLI d'audit des liens morts est l'interface en ligne de commande principale pour gérer l'audit, la correction et la maintenance des liens sur le site Laurent Serre Développement. Il offre une suite complète d'outils pour :

- 🔍 **Scanner et analyser** tous les liens du site
- ✅ **Valider** les liens internes et externes
- 🔧 **Corriger automatiquement** les liens cassés
- 📊 **Générer des rapports** détaillés
- 🔄 **Gérer les rollbacks** et backups
- 🛠️ **Maintenir** le système en bon état
- 📈 **Surveiller** les performances et métriques

### Avantages du CLI

- **Automatisation complète** : Intégration facile dans les scripts et CI/CD
- **Flexibilité** : Options configurables pour tous les besoins
- **Sécurité** : Backups automatiques et rollbacks
- **Performance** : Traitement optimisé par lots
- **Monitoring** : Métriques détaillées et alertes

## Installation et Configuration

### Prérequis

```bash
# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos clés API
```

### Variables d'environnement requises

```bash
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@laurentserre.com
SENDGRID_FROM_NAME=Système Audit - Laurent Serre
ADMIN_EMAIL=ls@laurentserre.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🚀 Commandes Principales

### 1. Audit Complet

#### Commande de base
```bash
# Audit standard avec configuration par défaut
npm run audit:cli audit

# Audit rapide (liens internes seulement)
npm run audit:cli audit --internal-only

# Audit complet avec liens externes
npm run audit:cli audit --external --timeout 60000
```

#### Options avancées
```bash
# Audit personnalisé avec toutes les options
npm run audit:cli audit \
  --depth 5 \
  --external \
  --format html \
  --output ./custom-reports \
  --batch-size 20 \
  --timeout 45000 \
  --rate-limit 500 \
  --exclude "*.pdf,api/**,test/**" \
  --priority critical,high \
  --verbose

# Options disponibles:
# -d, --depth <number>        Profondeur maximale de scan (défaut: 3)
# -e, --exclude <patterns>    Patterns à exclure (séparés par virgules)
# -o, --output <path>         Dossier de sortie (défaut: ./reports)
# -f, --format <format>       Format: json,html,csv,all (défaut: all)
# -p, --priority <levels>     Priorités: critical,high,medium,low
# --external                  Inclure les liens externes
# --internal-only             Liens internes seulement
# --timeout <ms>              Timeout validation (défaut: 30000)
# --batch-size <number>       Taille des lots (défaut: 10)
# --rate-limit <ms>           Délai entre requêtes (défaut: 1000)
# --max-concurrent <number>   Connexions simultanées (défaut: 5)
# --retry-attempts <number>   Tentatives de retry (défaut: 3)
# --user-agent <string>       User-Agent personnalisé
# --follow-redirects          Suivre les redirections
# --check-anchors             Vérifier les ancres dans les pages
# --use-cache                 Utiliser le cache de validation
# --cache-duration <seconds>  Durée du cache (défaut: 3600)
# --dry-run                   Mode simulation (pas de sauvegarde)
# --verbose                   Logs détaillés
# --quiet                     Mode silencieux
# --profile                   Profiler les performances
```

#### Exemples d'usage spécialisés
```bash
# Audit de performance (liens critiques seulement)
npm run audit:cli audit --priority critical --format json --profile

# Audit de maintenance (avec nettoyage)
npm run audit:cli audit --use-cache --cleanup-after

# Audit de développement (rapide et silencieux)
npm run audit:cli audit --internal-only --quiet --format json

# Audit de production (complet avec alertes)
npm run audit:cli audit --external --alert-threshold 90 --email-alerts

# Audit ciblé sur un domaine
npm run audit:cli audit --include-pattern "laurentserre.com/**" --external

# Audit avec exclusions spécifiques
npm run audit:cli audit --exclude "admin/**,test/**,*.pdf,mailto:*,tel:*"
```

### 2. Correction Automatique

```bash
# Correction automatique
npm run audit:cli fix

# Correction avec options
npm run audit:cli fix --confidence 0.9 --dry-run --interactive

# Options disponibles:
# -i, --input <path>       Fichier de rapport JSON
# --confidence <number>    Seuil de confiance (0-1, défaut: 0.8)
# --backup                 Créer des backups (défaut: true)
# --dry-run                Mode simulation
# --interactive            Mode interactif
```

### 3. Rollback des Corrections

```bash
# Lister les rollbacks disponibles
npm run audit:cli rollback --list

# Rollback spécifique
npm run audit:cli rollback --id <rollback_id>

# Rollback de toutes les corrections
npm run audit:cli rollback --all
```

### 4. Maintenance

```bash
# Maintenance complète
npm run audit:cli maintenance --clean-reports --clean-backups --clean-cache

# Options disponibles:
# --clean-reports          Nettoyer les anciens rapports
# --clean-backups          Nettoyer les anciens backups
# --clean-cache            Vider le cache de validation
# --days <number>          Jours à conserver (défaut: 30)
```

### 5. Statut du Système

```bash
# Vérification complète
npm run audit:cli status

# Vérifications spécifiques
npm run audit:cli status --config  # Configuration
npm run audit:cli status --db      # Base de données
npm run audit:cli status --email   # Service email
```

## Scripts NPM Raccourcis

```bash
# Audit complet rapide
npm run audit:full

# Correction automatique
npm run audit:fix

# Statut du système
npm run audit:status

# Maintenance
npm run audit:maintenance

# Rollback
npm run audit:rollback

# Rapport de santé
npm run maintenance:health

# Nettoyage des rapports
npm run maintenance:clean
```

## Exemples d'Usage

### Workflow Typique

```bash
# 1. Vérifier le statut du système
npm run audit:status

# 2. Lancer un audit complet
npm run audit:full

# 3. Corriger automatiquement les liens simples
npm run audit:fix --confidence 0.9

# 4. Vérifier les corrections en mode simulation
npm run audit:fix --dry-run

# 5. Maintenance périodique
npm run audit:maintenance --clean-reports --days 30
```

### Audit Personnalisé

```bash
# Audit approfondi avec liens externes
npm run audit:cli audit \
  --depth 5 \
  --external \
  --timeout 60000 \
  --batch-size 5 \
  --format html \
  --output ./audit-$(date +%Y%m%d)
```

### Correction Interactive

```bash
# Mode interactif pour valider chaque correction
npm run audit:cli fix \
  --interactive \
  --confidence 0.7 \
  --backup
```

## Formats de Sortie

### JSON
- Données structurées complètes
- Idéal pour l'intégration avec d'autres outils
- Contient toutes les métadonnées

### HTML
- Rapport visuel interactif
- Graphiques et tableaux
- Filtres et tri
- Idéal pour la présentation

### CSV
- Export pour analyse dans Excel/Google Sheets
- Données tabulaires
- Différentes vues (par priorité, type, page)

## Intégration CI/CD

Le CLI est conçu pour s'intégrer facilement dans les pipelines CI/CD :

```bash
# Dans votre pipeline
npm run audit:cli audit --format json --output ./ci-reports
npm run audit:cli fix --dry-run --confidence 0.9

# Codes de sortie
# 0: Succès
# 1: Erreur
# 2: Liens morts détectés (warning)
```

## Logs et Debugging

```bash
# Mode verbose (à implémenter)
DEBUG=audit:* npm run audit:cli audit

# Logs dans les fichiers
npm run audit:cli audit 2>&1 | tee audit.log
```

## Sécurité

- Toutes les corrections créent des backups automatiques
- Mode dry-run pour tester sans risque
- Validation des permissions avant modification
- Rollback complet disponible

## Support et Dépannage

### Problèmes Courants

1. **Configuration manquante**
   ```bash
   npm run audit:status --config
   ```

2. **Base de données inaccessible**
   ```bash
   npm run audit:status --db
   ```

3. **Service email défaillant**
   ```bash
   npm run audit:status --email
   ```

### Maintenance Préventive

```bash
# Hebdomadaire
npm run maintenance:health
npm run maintenance:clean

# Mensuelle
npm run audit:cli maintenance --clean-reports --clean-backups --days 30
```

## Développement

Pour contribuer au CLI :

```bash
# Structure des fichiers
scripts/cli/
├── audit-cli.ts          # CLI principal
├── maintenance-utils.ts  # Utilitaires de maintenance
└── README.md            # Cette documentation

# Tests
npm run test:cli  # À implémenter
```