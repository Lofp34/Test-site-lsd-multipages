# Guide de Déploiement et Maintenance des Corrections

## 📋 Vue d'ensemble

Ce document détaille le processus de déploiement et de maintenance des corrections de liens cassés implémentées dans le cadre du projet Laurent Serre Développement.

### Corrections Déployées

1. **Correction des liens CTA** dans les pages de techniques de négociation
2. **Création des pages ressources manquantes** 
3. **Configuration du monitoring des erreurs 404**
4. **Mise en place des alertes pour les formulaires**

## 🚀 Processus de Déploiement

### Pré-requis

- Node.js 18+ installé
- Accès aux variables d'environnement de production
- Token Vercel configuré (si déploiement sur Vercel)
- Accès à la base de données Supabase
- Clé API SendGrid configurée

### Variables d'Environnement Requises

```bash
# Base de données
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email
SENDGRID_API_KEY=your_sendgrid_key
SENDGRID_FROM_EMAIL=your_from_email
SENDGRID_FROM_NAME="Laurent Serre Développement"
ADMIN_EMAIL=ls@laurentserre.com

# Application
NEXT_PUBLIC_BASE_URL=https://laurent-serre-developpement.fr
NODE_ENV=production

# Monitoring
AUDIT_SCHEDULE_ENABLED=true
AUDIT_MAX_REQUESTS_PER_DAY=100
AUDIT_ENABLE_AUTO_RESPONSE=true
```

### Commandes de Déploiement

#### Déploiement Automatique
```bash
# Exécuter le script de déploiement complet
npm run deploy:corrections

# Ou directement avec tsx
npx tsx scripts/deploy-corrections.ts
```

#### Déploiement Manuel
```bash
# 1. Vérifier le build
npm run build

# 2. Tester localement
npm run start

# 3. Déployer sur Vercel
vercel --prod

# 4. Configurer le monitoring
npx tsx scripts/setup-monitoring.ts
```

## 📊 Monitoring et Alertes

### Dashboard de Monitoring

Le dashboard de monitoring est accessible à l'adresse :
```
https://votre-domaine.com/admin/corrections-monitoring
```

#### Métriques Surveillées

1. **Liens CTA Corrigés**
   - Statut des liens (200, 404, etc.)
   - Temps de réponse
   - Dernière vérification

2. **Pages Ressources**
   - Nombre de visites
   - Taux de conversion des formulaires
   - Temps moyen sur la page
   - Taux de rebond

3. **Formulaires**
   - Taux de succès/échec
   - Temps de réponse de l'API
   - Alertes d'erreurs

### Configuration des Alertes

#### Seuils par Défaut
```typescript
{
  criticalLinksThreshold: 3,        // Alerte si 3+ liens critiques cassés
  healthScoreThreshold: 90,         // Alerte si score santé < 90%
  brokenLinksIncreaseThreshold: 5,  // Alerte si +5 liens cassés
  formErrorRate: 5,                 // Alerte si > 5% d'erreurs formulaire
  responseTimeThreshold: 3000       // Alerte si > 3s de réponse
}
```

#### Modification des Seuils
```typescript
// Via l'API
POST /api/admin/alert-thresholds
{
  "criticalLinksThreshold": 5,
  "healthScoreThreshold": 85
}

// Via le code
import { getAlertManager } from '@/lib/audit/alert-manager';
const alertManager = getAlertManager();
alertManager.updateThresholds({
  criticalLinksThreshold: 5
});
```

### Types d'Alertes

#### 1. Alertes Critiques (Immédiate)
- Liens critiques cassés (≥3)
- Score de santé faible (<90%)
- API formulaires indisponible

#### 2. Alertes d'Avertissement (1h de cooldown)
- Augmentation des liens cassés
- Temps de réponse élevé
- Taux d'erreur formulaire élevé

#### 3. Rapports Hebdomadaires (Lundi 9h)
- Résumé des métriques de la semaine
- Tendances et évolutions
- Ressources les plus demandées

## 🔧 Maintenance

### Tâches de Maintenance Régulières

#### Quotidienne (Automatique)
- Audit complet des liens (2h du matin)
- Vérification des pages ressources
- Nettoyage des logs anciens

#### Hebdomadaire (Automatique)
- Rapport de santé du site
- Analyse des tendances
- Sauvegarde des métriques

#### Mensuelle (Manuel)
- Révision des seuils d'alerte
- Analyse des performances
- Mise à jour de la documentation

### Scripts de Maintenance

#### Vérification de l'État du Système
```bash
# Vérifier l'état général
npx tsx scripts/health-check.ts

# Tester les alertes
npx tsx scripts/test-alerts.ts

# Audit manuel des liens
npx tsx scripts/audit-links.ts
```

#### Nettoyage et Optimisation
```bash
# Nettoyer les anciens logs
npx tsx scripts/cleanup-logs.ts

# Optimiser la base de données
npx tsx scripts/optimize-database.ts

# Régénérer les rapports
npx tsx scripts/regenerate-reports.ts
```

## 🐛 Dépannage

### Problèmes Courants

#### 1. Liens CTA Cassés
**Symptômes :** Erreurs 404 sur `/coach-commercial-entreprise` ou `/bootcamp-commercial-intensif`

**Diagnostic :**
```bash
# Vérifier le statut des liens
curl -I https://votre-domaine.com/coach-commercial-entreprise
curl -I https://votre-domaine.com/bootcamp-commercial-intensif
```

**Solutions :**
1. Vérifier que les pages existent
2. Contrôler les redirections dans `next.config.js`
3. Vérifier le composant `ConversionCTAs.tsx`

#### 2. Pages Ressources Inaccessibles
**Symptômes :** Erreurs 404 sur les pages `/ressources/*`

**Diagnostic :**
```bash
# Vérifier les fichiers de pages
ls -la src/app/ressources/outil-tableau-bord/
ls -la src/app/ressources/grille-evaluation/
ls -la src/app/ressources/reporting-automatise/
```

**Solutions :**
1. Vérifier que les fichiers `page.tsx` existent
2. Contrôler la syntaxe des composants
3. Vérifier les imports et dépendances

#### 3. Formulaires Non Fonctionnels
**Symptômes :** Erreurs lors de la soumission des formulaires

**Diagnostic :**
```bash
# Tester l'API
curl -X POST https://votre-domaine.com/api/resource-request \
  -H "Content-Type: application/json" \
  -d '{"userEmail":"test@example.com","resourceUrl":"/test"}'
```

**Solutions :**
1. Vérifier la configuration SendGrid
2. Contrôler les variables d'environnement
3. Vérifier les logs de l'API

#### 4. Alertes Non Reçues
**Symptômes :** Pas de notifications d'alertes

**Diagnostic :**
```bash
# Tester le système d'alertes
npx tsx scripts/test-alerts.ts
```

**Solutions :**
1. Vérifier la configuration SendGrid
2. Contrôler l'adresse email admin
3. Vérifier les seuils d'alerte

### Logs et Debugging

#### Localisation des Logs
```bash
# Logs Vercel
vercel logs [deployment-url]

# Logs Supabase
# Accessible via le dashboard Supabase

# Logs locaux
tail -f logs/deployment.log
tail -f logs/monitoring.log
```

#### Activation du Mode Debug
```bash
# Variables d'environnement pour debug
DEBUG=true
LOG_LEVEL=debug
AUDIT_VERBOSE=true
```

## 📈 Métriques de Succès

### KPIs Techniques
- **Disponibilité des liens corrigés** : 99.9%
- **Temps de réponse des pages ressources** : <2s
- **Taux de succès des formulaires** : >95%
- **Score de santé global** : >95%

### KPIs Business
- **Taux de conversion des pages ressources** : >15%
- **Temps moyen sur les pages** : >3 minutes
- **Réduction des erreurs 404** : -100% sur les liens corrigés
- **Satisfaction utilisateur** : Mesurée via feedback

### Rapports Automatiques

#### Rapport Quotidien (Email)
- Statut des liens critiques
- Métriques des formulaires
- Alertes actives

#### Rapport Hebdomadaire (Email + Dashboard)
- Évolution des métriques
- Analyse des tendances
- Recommandations d'amélioration

#### Rapport Mensuel (Dashboard)
- Performance globale
- ROI des corrections
- Plan d'optimisation

## 🔄 Processus de Rollback

### Rollback Automatique
En cas de détection d'erreurs critiques, le système peut effectuer un rollback automatique :

```bash
# Rollback Vercel
vercel rollback [previous-deployment-url]

# Rollback base de données (si nécessaire)
npx tsx scripts/rollback-database.ts [backup-timestamp]
```

### Rollback Manuel
```bash
# 1. Identifier le déploiement précédent
vercel ls

# 2. Effectuer le rollback
vercel rollback [deployment-url]

# 3. Vérifier le statut
npx tsx scripts/health-check.ts

# 4. Notifier l'équipe
npx tsx scripts/send-rollback-notification.ts
```

## 📞 Support et Contacts

### Équipe Technique
- **Développeur Principal** : [Votre contact]
- **DevOps** : [Contact DevOps]
- **Monitoring** : [Contact monitoring]

### Escalade des Incidents
1. **Niveau 1** : Alertes automatiques
2. **Niveau 2** : Notification équipe technique
3. **Niveau 3** : Escalade management

### Ressources Utiles
- **Documentation Vercel** : https://vercel.com/docs
- **Documentation Supabase** : https://supabase.com/docs
- **Documentation SendGrid** : https://docs.sendgrid.com
- **Monitoring Dashboard** : https://votre-domaine.com/admin

---

**Dernière mise à jour** : ${new Date().toLocaleDateString('fr-FR')}
**Version du document** : 1.0.0
**Responsable** : Équipe Développement Laurent Serre