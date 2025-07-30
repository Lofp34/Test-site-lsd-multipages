# GitHub Actions - Audit des Liens Morts

## Vue d'ensemble

Ce dossier contient les workflows GitHub Actions pour l'audit automatisé des liens morts sur le site Laurent Serre Développement. Le système fournit une surveillance continue, des validations sur les pull requests, et des rapports périodiques.

## Workflows Disponibles

### 1. `audit-links-daily.yml` - Audit Quotidien
**Déclenchement:** Tous les jours à 2h UTC (cron) + manuel
**Objectif:** Surveillance quotidienne de la santé des liens

**Fonctionnalités:**
- Scan complet du site avec options configurables
- Génération de rapports (JSON, HTML, CSV)
- Détection automatique des problèmes critiques
- Tentative de correction automatique des liens simples
- Alertes email pour les problèmes majeurs
- Upload des rapports en artifacts

**Usage manuel:**
```bash
# Via l'interface GitHub
Actions → Audit des Liens Quotidien → Run workflow

# Options disponibles:
# - Profondeur de scan (défaut: 3)
# - Inclure liens externes (défaut: false)
# - Format de rapport (défaut: all)
```

### 2. `audit-links-pr.yml` - Validation sur Pull Request
**Déclenchement:** Pull requests vers main/develop + manuel
**Objectif:** Valider les liens avant merge

**Fonctionnalités:**
- Analyse des fichiers modifiés
- Audit ciblé sur les changements
- Commentaire automatique sur la PR avec résultats
- Statut de validation (succès/warning/échec)
- Blocage automatique si trop de liens morts

**Seuils de validation:**
- ✅ **Succès:** 0 lien mort
- ⚠️ **Warning:** 1-5 liens morts (merge autorisé)
- ❌ **Échec:** >10 liens morts (merge bloqué)

### 3. `audit-links-weekly.yml` - Rapport Hebdomadaire
**Déclenchement:** Lundis à 9h UTC (cron) + manuel
**Objectif:** Rapport complet hebdomadaire

**Fonctionnalités:**
- Audit approfondi avec liens externes
- Rapport de santé du système
- Résumé exécutif en markdown
- Statistiques des demandes de ressources
- Création d'issues GitHub pour problèmes critiques
- Envoi automatique par email
- Mise à jour des badges de statut

### 4. `audit-links-deploy.yml` - Validation de Déploiement
**Déclenchement:** Push sur main + manuel
**Objectif:** Validation avant déploiement en production

**Fonctionnalités:**
- Build de l'application
- Audit complet pré-déploiement
- Validation des chemins critiques
- Évaluation de la préparation au déploiement
- Blocage automatique si problèmes critiques
- Commentaire sur le commit avec résumé
- Notification de l'équipe de déploiement

**Critères de déploiement:**
- ✅ **Approuvé:** Score ≥90%, 0 problème critique
- ⚠️ **Surveillance:** Score ≥80%, ≤2 problèmes critiques
- ❌ **Bloqué:** Score <80% ou >2 problèmes critiques

## Configuration

### Variables d'Environnement (Secrets GitHub)

Configurez ces secrets dans Settings → Secrets and variables → Actions:

```bash
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@laurentserre.com
SENDGRID_FROM_NAME=Système Audit - Laurent Serre
ADMIN_EMAIL=ls@laurentserre.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_BASE_URL=https://laurentserre.com
```

### Configuration Centralisée

Le fichier `.github/audit-config.yml` centralise tous les paramètres:
- Seuils de validation
- Formats de rapport
- Chemins critiques
- Configuration des notifications
- Paramètres de maintenance

## Artifacts et Rapports

### Structure des Artifacts

```
audit-reports-{run_number}/
├── audit-report-{timestamp}.json    # Données complètes
├── audit-report-{timestamp}.html    # Rapport visuel
├── audit-report-{timestamp}.csv     # Export tabulaire
└── broken-links-summary.txt         # Résumé des liens morts
```

### Rétention des Données

- **Audits quotidiens:** 30 jours
- **Rapports hebdomadaires:** 90 jours
- **Validations PR:** 7 jours
- **Audits de déploiement:** 30 jours

## Notifications et Alertes

### Types de Notifications

1. **Commentaires PR:** Résultats d'audit sur chaque pull request
2. **Issues GitHub:** Créées automatiquement pour problèmes critiques
3. **Emails SendGrid:** Rapports hebdomadaires et alertes critiques
4. **Commentaires Commit:** Résumé de validation de déploiement

### Seuils d'Alerte

- **Critique:** >20 liens morts → Issue GitHub + Email
- **Warning:** 5-20 liens morts → Commentaire + Surveillance
- **Info:** <5 liens morts → Log uniquement

## Intégration avec le CLI

Les workflows utilisent le CLI d'audit développé localement:

```bash
# Commandes utilisées dans les workflows
npm run audit:cli audit --depth 3 --format all
npm run audit:cli fix --confidence 0.9 --dry-run
npm run audit:cli status --config
npm run maintenance:health
```

## Monitoring et Métriques

### Badges de Statut

Les workflows maintiennent des badges de statut dans le README:
- Score de santé des liens
- Statut du dernier audit
- Nombre de liens morts

### Métriques Suivies

- Nombre total de liens
- Liens morts par priorité
- Score de santé SEO
- Temps de réponse moyen
- Demandes de ressources
- Corrections automatiques appliquées

## Dépannage

### Problèmes Courants

1. **Workflow échoue avec erreur de configuration**
   ```bash
   # Vérifier les secrets GitHub
   Settings → Secrets and variables → Actions
   ```

2. **Timeout sur la validation des liens**
   ```bash
   # Augmenter le timeout dans audit-config.yml
   default_timeout: 60000
   ```

3. **Trop de faux positifs**
   ```bash
   # Ajuster les patterns d'exclusion
   exclude_patterns:
     - "external-api/**"
   ```

### Logs et Debugging

```bash
# Consulter les logs détaillés
Actions → [Workflow] → [Run] → [Job] → [Step]

# Télécharger les artifacts pour analyse
Actions → [Workflow] → [Run] → Artifacts
```

## Maintenance

### Nettoyage Automatique

Les workflows incluent un nettoyage automatique:
- Suppression des anciens artifacts
- Nettoyage des données d'audit obsolètes
- Optimisation de la base de données

### Mise à Jour des Workflows

1. Modifier les fichiers `.yml` dans `.github/workflows/`
2. Tester avec `workflow_dispatch` (déclenchement manuel)
3. Surveiller les premiers runs automatiques
4. Ajuster la configuration si nécessaire

## Sécurité

### Bonnes Pratiques

- Secrets stockés dans GitHub Secrets (jamais en dur)
- Permissions minimales pour les tokens
- Validation des entrées utilisateur
- Isolation des environnements

### Audit de Sécurité

```bash
# Vérifier les permissions
Settings → Actions → General → Workflow permissions

# Auditer les secrets
Settings → Secrets and variables → Actions
```

## Évolutions Futures

### Améliorations Prévues

- [ ] Intégration Slack pour les notifications
- [ ] Dashboard temps réel des métriques
- [ ] Tests de performance automatisés
- [ ] Validation de l'accessibilité
- [ ] Intégration avec Google Search Console

### Contribution

Pour contribuer aux workflows:

1. Fork du repository
2. Créer une branche feature
3. Tester les modifications sur votre fork
4. Créer une pull request avec description détaillée

---

**Documentation maintenue par l'équipe de développement**
*Dernière mise à jour: $(date '+%d/%m/%Y')*