# Guide de Déploiement en Production - Système d'Audit des Liens

## Vue d'ensemble

Ce guide détaille le processus complet de déploiement du système d'audit des liens morts en production sur Vercel avec intégration Supabase et SendGrid.

## Prérequis

### 1. Comptes et Services
- [ ] Compte Vercel configuré
- [ ] Projet Supabase créé et configuré
- [ ] Compte SendGrid avec domaine vérifié
- [ ] Accès administrateur au repository GitHub

### 2. Variables d'Environnement
Toutes les variables suivantes doivent être configurées :

```bash
# SendGrid Configuration
SENDGRID_API_KEY=SG.your-api-key
SENDGRID_FROM_EMAIL=ls@laurentserre.com
SENDGRID_FROM_NAME=Système Audit - Laurent Serre
ADMIN_EMAIL=ls@laurentserre.com

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Application
NEXT_PUBLIC_BASE_URL=https://laurentserre.com
AUDIT_SCHEDULE_ENABLED=true

# Audit System Configuration
AUDIT_MAX_REQUESTS_PER_DAY=100
AUDIT_ENABLE_AUTO_RESPONSE=true
AUDIT_TIMEOUT=30000
AUDIT_RETRY_ATTEMPTS=3
AUDIT_BATCH_SIZE=10
AUDIT_RATE_LIMIT_DELAY=1000
```

## Étapes de Déploiement

### Phase 1: Préparation de l'Environnement

#### 1.1 Configuration Supabase

1. **Créer les tables de base de données** :
```sql
-- Exécuter le script de création des tables
-- Voir: scripts/setup-audit-db.ts
```

2. **Configurer les permissions RLS** :
```sql
-- Activer RLS sur toutes les tables
ALTER TABLE scanned_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE validation_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE applied_corrections ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE link_health_metrics ENABLE ROW LEVEL SECURITY;

-- Créer les policies pour le service_role
CREATE POLICY "Service role can manage all data" ON scanned_links FOR ALL USING (auth.role() = 'service_role');
-- Répéter pour toutes les tables
```

3. **Tester la connexion** :
```bash
npm run test:db-connection
```

#### 1.2 Configuration SendGrid

1. **Vérifier le domaine d'envoi** :
   - Domaine `laurentserre.com` doit être vérifié
   - SPF, DKIM, DMARC configurés

2. **Créer les templates d'emails** :
   - Template de demande de ressource
   - Template d'alerte liens morts
   - Template de réponse automatique

3. **Tester l'envoi d'emails** :
```bash
npm run test:sendgrid
```

### Phase 2: Déploiement sur Vercel

#### 2.1 Configuration du Projet Vercel

1. **Connecter le repository GitHub** :
   - Importer le projet depuis GitHub
   - Configurer les branches de déploiement

2. **Configurer les variables d'environnement** :
   - Aller dans Settings > Environment Variables
   - Ajouter toutes les variables listées ci-dessus
   - Séparer les environnements (Production/Preview)

3. **Configurer les Cron Jobs** :
   - Les cron jobs sont définis dans `vercel.json`
   - Vérifier que le plan Vercel supporte les crons

#### 2.2 Déploiement Initial

1. **Lancer le script de déploiement** :
```bash
npm run deploy:production
```

2. **Vérifier le déploiement** :
   - Vérifier que le build s'est bien passé
   - Tester les routes API principales
   - Vérifier les logs Vercel

### Phase 3: Configuration des Cron Jobs

#### 3.1 Cron Jobs Configurés

| Cron Job | Fréquence | Description |
|----------|-----------|-------------|
| `/api/audit-links` | Quotidien 2h | Audit complet des liens |
| `/api/weekly-report` | Lundi 9h | Rapport hebdomadaire |
| `/api/admin/trigger-alerts` | Toutes les 6h | Vérification des alertes |
| `/api/cron/process-queue` | Toutes les 5min | Traitement de la file |

#### 3.2 Monitoring des Cron Jobs

1. **Vérifier l'exécution** :
   - Aller dans Vercel Dashboard > Functions
   - Vérifier les logs d'exécution
   - Surveiller les erreurs

2. **Configurer les alertes** :
   - Alertes en cas d'échec des crons
   - Monitoring des performances

### Phase 4: Tests de Validation

#### 4.1 Tests Fonctionnels

1. **Test de l'audit complet** :
```bash
curl https://laurentserre.com/api/audit-links
```

2. **Test du système de demande de ressources** :
```bash
curl -X POST https://laurentserre.com/api/resource-request \
  -H "Content-Type: application/json" \
  -d '{"userEmail":"test@example.com","resourceUrl":"/test","sourceUrl":"/","message":"Test"}'
```

3. **Test des rapports** :
   - Vérifier la génération des rapports JSON/HTML/CSV
   - Tester l'envoi d'emails d'alerte

#### 4.2 Tests de Performance

1. **Test de charge** :
   - Simuler un audit sur un grand nombre de liens
   - Vérifier les temps de réponse
   - Surveiller l'utilisation des ressources

2. **Test de résilience** :
   - Tester la gestion des erreurs
   - Vérifier les mécanismes de retry
   - Tester la récupération après panne

## Monitoring et Maintenance

### 1. Tableaux de Bord

#### 1.1 Dashboard Vercel
- Surveiller les métriques de performance
- Vérifier l'exécution des cron jobs
- Monitorer les erreurs et logs

#### 1.2 Dashboard Supabase
- Surveiller l'utilisation de la base de données
- Vérifier les performances des requêtes
- Monitorer l'espace de stockage

#### 1.3 Dashboard SendGrid
- Surveiller les statistiques d'envoi
- Vérifier la délivrabilité des emails
- Monitorer la réputation du domaine

### 2. Alertes et Notifications

#### 2.1 Alertes Système
- Échec des cron jobs
- Erreurs de base de données
- Problèmes d'envoi d'emails
- Dépassement des quotas

#### 2.2 Alertes Métier
- Augmentation significative des liens morts
- Dégradation du score SEO
- Pics de demandes de ressources

### 3. Maintenance Régulière

#### 3.1 Quotidienne
- [ ] Vérifier les logs d'audit
- [ ] Contrôler les emails envoyés
- [ ] Surveiller les métriques de performance

#### 3.2 Hebdomadaire
- [ ] Analyser le rapport hebdomadaire
- [ ] Vérifier les tendances des liens morts
- [ ] Réviser les demandes de ressources

#### 3.3 Mensuelle
- [ ] Optimiser les performances
- [ ] Nettoyer les anciennes données
- [ ] Mettre à jour la documentation
- [ ] Réviser les alertes et seuils

## Procédures d'Urgence

### 1. Panne du Système d'Audit

1. **Diagnostic** :
   - Vérifier les logs Vercel
   - Tester la connectivité Supabase
   - Vérifier les variables d'environnement

2. **Actions correctives** :
   - Redémarrer les fonctions Vercel
   - Vérifier la configuration Supabase
   - Tester manuellement les API routes

### 2. Problème d'Envoi d'Emails

1. **Diagnostic** :
   - Vérifier les logs SendGrid
   - Contrôler la réputation du domaine
   - Tester l'API SendGrid

2. **Actions correctives** :
   - Vérifier la configuration DNS
   - Contacter le support SendGrid si nécessaire
   - Utiliser un domaine de secours

### 3. Surcharge de la Base de Données

1. **Diagnostic** :
   - Vérifier les métriques Supabase
   - Analyser les requêtes lentes
   - Contrôler l'espace de stockage

2. **Actions correctives** :
   - Optimiser les requêtes
   - Nettoyer les anciennes données
   - Augmenter les ressources si nécessaire

## Contacts et Support

### Équipe Technique
- **Développeur Principal** : Laurent Serre (ls@laurentserre.com)
- **Support Vercel** : support@vercel.com
- **Support Supabase** : support@supabase.com
- **Support SendGrid** : support@sendgrid.com

### Documentation Technique
- [Guide Technique du Système](./AUDIT_SYSTEM_TECHNICAL_GUIDE.md)
- [Guide de Dépannage](./AUDIT_SYSTEM_TROUBLESHOOTING_GUIDE.md)
- [Configuration SendGrid](./SENDGRID_CONFIGURATION_GUIDE.md)
- [FAQ du Système](./AUDIT_SYSTEM_FAQ.md)

## Changelog

| Version | Date | Changements |
|---------|------|-------------|
| 1.0.0 | 2025-01-27 | Déploiement initial en production |

---

**Note** : Ce guide doit être mis à jour à chaque modification significative du système de déploiement.