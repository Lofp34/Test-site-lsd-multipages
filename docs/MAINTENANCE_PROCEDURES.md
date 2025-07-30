# Procédures de Maintenance - Système d'Audit des Liens

## Vue d'ensemble

Ce document détaille toutes les procédures de maintenance pour le système d'audit des liens morts, incluant les tâches quotidiennes, hebdomadaires et mensuelles, ainsi que les procédures d'urgence.

## 📋 Checklist de Maintenance Quotidienne

### 1. Vérification des Audits Automatiques (9h00)

- [ ] **Vérifier l'exécution du cron quotidien** (2h du matin)
  - Aller sur Vercel Dashboard > Functions
  - Vérifier que `/api/audit-links` s'est exécuté sans erreur
  - Temps d'exécution normal : 2-5 minutes

- [ ] **Consulter les emails d'alerte**
  - Vérifier la boîte mail `ls@laurentserre.com`
  - Traiter les alertes de liens morts critiques
  - Répondre aux demandes de ressources reçues

- [ ] **Vérifier les métriques de base**
  ```bash
  # Accéder au dashboard
  https://laurentserre.com/admin/audit-dashboard
  
  # Métriques à surveiller :
  - Score de santé des liens (objectif : >90%)
  - Nombre de liens morts (alerte si >50)
  - Temps de réponse moyen (<2s)
  ```

### 2. Traitement des Demandes de Ressources (10h00)

- [ ] **Analyser les nouvelles demandes**
  - Consulter le dashboard des demandes
  - Identifier les ressources les plus demandées
  - Prioriser selon la fréquence et l'impact SEO

- [ ] **Répondre aux demandeurs**
  - Accuser réception des demandes importantes
  - Donner une estimation de délai si possible
  - Rediriger vers des ressources existantes similaires

### 3. Surveillance des Performances (11h00)

- [ ] **Vérifier les logs Vercel**
  - Rechercher les erreurs 500 ou timeouts
  - Vérifier l'utilisation des ressources
  - Surveiller les quotas SendGrid

- [ ] **Contrôler Supabase**
  - Vérifier l'espace de stockage utilisé
  - Surveiller les performances des requêtes
  - Contrôler les connexions actives

## 📊 Procédures Hebdomadaires

### Lundi Matin (9h30) - Analyse du Rapport Hebdomadaire

1. **Réception et Analyse du Rapport**
   - Le rapport automatique arrive à 9h00
   - Analyser les tendances de la semaine
   - Identifier les régressions ou améliorations

2. **Actions Correctives**
   ```bash
   # Si le score de santé < 85%
   npm run audit:fix
   
   # Pour voir les détails
   npm run audit:status
   
   # Pour les corrections manuelles
   npm run audit:cli rollback [id]
   ```

3. **Planification des Corrections**
   - Prioriser les liens morts critiques
   - Planifier la création des ressources demandées
   - Programmer les corrections pour la semaine

### Mercredi (14h00) - Maintenance Préventive

1. **Nettoyage de la Base de Données**
   ```bash
   # Nettoyer les anciennes données (>3 mois)
   npm run audit:maintenance cleanup
   
   # Optimiser les index
   npm run audit:maintenance optimize
   ```

2. **Vérification des Sauvegardes**
   - Contrôler les backups Supabase
   - Tester la restauration sur un échantillon
   - Vérifier l'intégrité des données

3. **Mise à Jour des Configurations**
   - Réviser les seuils d'alerte
   - Ajuster les fréquences de scan si nécessaire
   - Mettre à jour les patterns d'exclusion

### Vendredi (16h00) - Bilan de la Semaine

1. **Rapport de Performance**
   - Compiler les métriques de la semaine
   - Analyser les tendances
   - Documenter les incidents et résolutions

2. **Préparation du Weekend**
   - Vérifier que tous les crons sont actifs
   - S'assurer qu'aucune maintenance n'est prévue
   - Préparer les contacts d'urgence

## 🗓️ Maintenance Mensuelle

### Premier Lundi du Mois - Révision Complète

1. **Audit de Performance**
   ```bash
   # Lancer un audit de performance complet
   npm run test:audit:performance
   
   # Analyser les métriques sur 30 jours
   npm run audit:analytics monthly
   ```

2. **Optimisation du Système**
   - Réviser les configurations de timeout
   - Optimiser les requêtes lentes
   - Ajuster les tailles de batch

3. **Mise à Jour de la Documentation**
   - Mettre à jour ce document si nécessaire
   - Documenter les nouveaux processus
   - Réviser les procédures d'urgence

### Troisième Vendredi du Mois - Maintenance Technique

1. **Mise à Jour des Dépendances**
   ```bash
   # Vérifier les mises à jour disponibles
   npm outdated
   
   # Mettre à jour les dépendances mineures
   npm update
   
   # Tester après mise à jour
   npm run test:audit:integration
   ```

2. **Révision de Sécurité**
   - Vérifier les clés API et leur rotation
   - Contrôler les permissions Supabase
   - Auditer les accès Vercel

3. **Planification des Améliorations**
   - Réviser les demandes d'amélioration
   - Planifier les nouvelles fonctionnalités
   - Prioriser les optimisations

## 🚨 Procédures d'Urgence

### Panne Complète du Système

**Symptômes :**
- Aucun email d'audit reçu depuis 24h
- Dashboard inaccessible
- Erreurs 500 sur toutes les API routes

**Actions Immédiates :**

1. **Diagnostic Rapide (5 min)**
   ```bash
   # Tester les endpoints principaux
   curl https://laurentserre.com/api/audit-links
   curl https://laurentserre.com/api/resource-request
   
   # Vérifier les logs Vercel
   # Aller sur dashboard.vercel.com
   ```

2. **Vérification des Services (10 min)**
   - Statut Vercel : status.vercel.com
   - Statut Supabase : status.supabase.com
   - Statut SendGrid : status.sendgrid.com

3. **Actions Correctives (15 min)**
   ```bash
   # Redéployer si nécessaire
   vercel --prod
   
   # Tester la connectivité DB
   npm run test:db-connection
   
   # Tester SendGrid
   npm run test:sendgrid
   ```

### Pic de Liens Morts (>200)

**Symptômes :**
- Score de santé < 60%
- Alerte email "Dégradation critique"
- Augmentation soudaine des liens morts

**Actions :**

1. **Analyse Immédiate**
   ```bash
   # Générer un rapport détaillé
   npm run audit:full
   
   # Analyser les causes
   npm run audit:analyze-trends
   ```

2. **Corrections d'Urgence**
   ```bash
   # Corriger automatiquement ce qui peut l'être
   npm run audit:fix --confidence=0.9
   
   # Identifier les corrections manuelles
   npm run audit:status --priority=critical
   ```

3. **Communication**
   - Informer l'équipe technique
   - Préparer un plan de correction
   - Communiquer les délais de résolution

### Problème d'Envoi d'Emails

**Symptômes :**
- Pas d'emails reçus depuis plusieurs heures
- Erreurs SendGrid dans les logs
- Demandes de ressources non traitées

**Actions :**

1. **Vérification SendGrid**
   - Consulter le dashboard SendGrid
   - Vérifier la réputation du domaine
   - Contrôler les quotas et limites

2. **Tests de Connectivité**
   ```bash
   # Tester l'API SendGrid
   npm run test:sendgrid
   
   # Vérifier la configuration DNS
   dig TXT laurentserre.com
   ```

3. **Solutions de Contournement**
   - Utiliser un domaine de secours si configuré
   - Envoyer manuellement les alertes critiques
   - Contacter le support SendGrid si nécessaire

## 📞 Contacts d'Urgence

### Support Technique
- **Laurent Serre** : ls@laurentserre.com / +33 X XX XX XX XX
- **Support Vercel** : support@vercel.com
- **Support Supabase** : support@supabase.com  
- **Support SendGrid** : support@sendgrid.com

### Escalade
1. **Niveau 1** : Problèmes mineurs - Résolution en interne
2. **Niveau 2** : Problèmes majeurs - Contact support fournisseurs
3. **Niveau 3** : Panne critique - Escalade vers l'équipe dirigeante

## 📈 Métriques de Performance

### Objectifs de Service (SLA)

| Métrique | Objectif | Alerte si |
|----------|----------|-----------|
| Score de santé des liens | >90% | <85% |
| Temps de réponse audit | <5 min | >10 min |
| Disponibilité système | >99.5% | <99% |
| Délai de traitement demandes | <24h | >48h |
| Taux d'envoi emails | >98% | <95% |

### Indicateurs de Tendance

- **Évolution du nombre de liens** (croissance attendue : +5%/mois)
- **Taux de correction automatique** (objectif : >70%)
- **Satisfaction utilisateur** (mesurée via feedback)
- **Performance technique** (temps de réponse, erreurs)

## 🔄 Processus d'Amélioration Continue

### Révision Trimestrielle

1. **Analyse des Performances**
   - Compiler les métriques sur 3 mois
   - Identifier les points d'amélioration
   - Benchmarker avec les objectifs

2. **Optimisations**
   - Implémenter les améliorations identifiées
   - Tester les nouvelles fonctionnalités
   - Mettre à jour la documentation

3. **Formation**
   - Réviser les procédures avec l'équipe
   - Former sur les nouveaux outils
   - Partager les bonnes pratiques

### Feedback Utilisateur

- **Collecte** : Via formulaires et emails
- **Analyse** : Mensuelle des retours
- **Action** : Priorisation et implémentation
- **Suivi** : Mesure de l'impact des améliorations

---

## 📚 Ressources Complémentaires

- [Guide Technique du Système](./AUDIT_SYSTEM_TECHNICAL_GUIDE.md)
- [Guide de Dépannage](./AUDIT_SYSTEM_TROUBLESHOOTING_GUIDE.md)
- [FAQ du Système](./AUDIT_SYSTEM_FAQ.md)
- [Configuration SendGrid](./SENDGRID_CONFIGURATION_GUIDE.md)
- [Guide de Déploiement](./PRODUCTION_DEPLOYMENT_GUIDE.md)

---

**Dernière mise à jour :** 30 juillet 2025  
**Version :** 1.0  
**Responsable :** Laurent Serre (ls@laurentserre.com)