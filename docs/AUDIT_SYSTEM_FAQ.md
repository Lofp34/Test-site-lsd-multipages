# FAQ - Système d'audit des liens morts

## 🤔 Questions générales

### Q: À quoi sert le système d'audit des liens morts ?

**R:** Le système d'audit automatise la détection et la correction des liens morts sur le site Laurent Serre Développement. Il :
- ✅ Scanne automatiquement tous les liens du site
- 🔧 Propose et applique des corrections intelligentes
- 📊 Génère des rapports détaillés avec impact SEO
- 📧 Envoie des notifications par email via SendGrid
- 🎯 Gère les demandes de ressources manquantes des utilisateurs

### Q: À quelle fréquence l'audit s'exécute-t-il ?

**R:** Par défaut :
- **Audit complet** : Tous les jours à 2h du matin
- **Rapport hebdomadaire** : Tous les lundis à 9h
- **Audit manuel** : À la demande via CLI ou dashboard
- **Post-déploiement** : Automatiquement après chaque mise en ligne

### Q: Combien de temps prend un audit complet ?

**R:** Cela dépend du nombre de liens :
- **< 100 liens** : 1-2 minutes
- **100-500 liens** : 2-5 minutes  
- **500-1000 liens** : 5-10 minutes
- **> 1000 liens** : 10-30 minutes

## 🔧 Configuration et installation

### Q: Quelles sont les variables d'environnement obligatoires ?

**R:** Variables essentielles :
```bash
# SendGrid (obligatoire)
SENDGRID_API_KEY=SG.votre-cle-api
SENDGRID_FROM_EMAIL=noreply@laurentserre.com
ADMIN_EMAIL=ls@laurentserre.com

# Supabase (obligatoire)
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_SERVICE_ROLE_KEY=votre-service-key
```

### Q: Comment configurer SendGrid pour la première fois ?

**R:** Suivez ces étapes :
1. Créez un compte sur [sendgrid.com](https://sendgrid.com)
2. Authentifiez votre domaine `laurentserre.com`
3. Créez une clé API avec permissions "Mail Send"
4. Ajoutez les variables d'environnement dans Vercel
5. Testez avec `npm run test:sendgrid-config`

Voir le [Guide de configuration SendGrid](./SENDGRID_CONFIGURATION_GUIDE.md) pour les détails.

### Q: Pourquoi mes emails n'arrivent pas ?

**R:** Vérifications courantes :
1. **Clé API valide** : Commence par `SG.` et a les bonnes permissions
2. **Domaine authentifié** : DNS correctement configuré
3. **From email** : Utilise le domaine authentifié
4. **Spam** : Vérifiez le dossier spam/indésirables
5. **Logs SendGrid** : Consultez l'Activity Feed dans SendGrid

## 🎯 Utilisation quotidienne

### Q: Comment lancer un audit manuel ?

**R:** Plusieurs options :
```bash
# Audit complet avec rapport
npm run audit:full

# Audit avec corrections automatiques
npm run audit:fix

# Interface CLI complète
npm run audit:cli audit --external --max-depth 3
```

### Q: Comment voir les résultats d'un audit ?

**R:** Trois façons :
1. **Dashboard admin** : `/admin/audit-dashboard`
2. **Rapports générés** : Dossier `reports/`
3. **Base de données** : Tables Supabase
4. **Emails** : Notifications automatiques

### Q: Comment corriger manuellement un lien mort ?

**R:** Options disponibles :
1. **Auto-correction** : `npm run audit:fix`
2. **Correction manuelle** : Éditez le fichier source
3. **CLI interactif** : `npm run audit:cli fix --interactive`
4. **Dashboard** : Interface web pour gérer les corrections

### Q: Comment annuler une correction automatique ?

**R:** Utilisez le système de rollback :
```bash
# Voir les corrections récentes
npm run audit:cli status

# Annuler une correction spécifique
npm run audit:cli rollback --rollback-id backup_123

# Annuler toutes les corrections du jour
npm run audit:cli rollback --date today
```

## 📊 Rapports et métriques

### Q: Comment interpréter le score de santé SEO ?

**R:** Le score (0-100%) indique :
- **90-100%** : Excellent - Très peu de liens morts
- **80-89%** : Bon - Quelques liens à corriger
- **70-79%** : Moyen - Action recommandée
- **< 70%** : Critique - Correction urgente nécessaire

### Q: Que signifient les priorités des liens morts ?

**R:** Classification automatique :
- **Critique** : Navigation principale, homepage, pages importantes
- **Élevée** : Pages de contenu, liens internes fréquents
- **Moyenne** : Blog, ressources secondaires
- **Faible** : Footer, mentions légales, liens externes

### Q: Comment exporter les données d'audit ?

**R:** Formats disponibles :
```bash
# Export CSV
npm run audit:cli export --format csv --output audit-report.csv

# Rapport HTML interactif
npm run audit:cli report --format html

# Données JSON brutes
npm run audit:cli export --format json
```

## 🚨 Gestion des demandes de ressources

### Q: Comment fonctionne le système de demande de ressources ?

**R:** Workflow automatique :
1. **Utilisateur** clique sur un lien vers une ressource manquante
2. **Page temporaire** s'affiche avec option "Demander cette ressource"
3. **Formulaire** collecte email + message optionnel
4. **Email automatique** envoyé à `ls@laurentserre.com`
5. **Confirmation** envoyée à l'utilisateur

### Q: Comment prioriser les demandes de ressources ?

**R:** Calcul automatique basé sur :
- **Fréquence** : Nombre de demandes (×2 points)
- **Impact SEO** : Importance de la page source (+1-5 points)
- **Ancienneté** : Âge de la première demande (+1-3 points)

Résultat : Critique (>15), Élevée (10-15), Moyenne (5-10), Faible (<5)

### Q: Où voir les demandes de ressources reçues ?

**R:** Plusieurs endroits :
1. **Emails** : Notifications directes à `ls@laurentserre.com`
2. **Dashboard** : `/admin/resource-requests`
3. **Base de données** : Table `resource_requests`
4. **Rapports** : Section dédiée dans les rapports d'audit

## 🛠️ Dépannage

### Q: L'audit échoue avec une erreur de timeout

**R:** Solutions possibles :
1. **Augmenter le timeout** : Modifiez `AUDIT_TIMEOUT` dans la config
2. **Réduire la charge** : Diminuez `batchSize` et augmentez `rateLimitDelay`
3. **Exclure des domaines** : Ajoutez les sites lents aux exclusions
4. **Vérifier la connectivité** : Testez manuellement les liens problématiques

### Q: Trop de faux positifs dans les résultats

**R:** Ajustements recommandés :
1. **Seuil de confiance** : Augmentez `confidenceThreshold` à 0.8-0.9
2. **Patterns d'exclusion** : Ajoutez les patterns récurrents
3. **Timeouts** : Augmentez pour les sites lents
4. **User-Agent** : Certains sites bloquent les bots

### Q: Les corrections automatiques sont incorrectes

**R:** Mesures de sécurité :
1. **Désactiver l'auto-correction** : `autoApply: false` dans la config
2. **Rollback immédiat** : `npm run audit:cli rollback --latest`
3. **Révision manuelle** : Vérifiez les suggestions avant application
4. **Backups** : Toujours activés par défaut

### Q: La base de données Supabase est pleine

**R:** Maintenance régulière :
```bash
# Nettoyer les anciens audits (>30 jours)
npm run maintenance:clean --retention-days 30

# Vérifier l'espace utilisé
npm run maintenance:health --check-storage

# Archiver les données anciennes
npm run maintenance:archive --older-than 90
```

## 📈 Performance et optimisation

### Q: Comment optimiser les performances pour un gros site ?

**R:** Stratégies d'optimisation :
1. **Batch processing** : Augmentez `batchSize` à 50-100
2. **Parallélisation** : `maxConcurrent: 10`
3. **Cache intelligent** : Évitez de re-valider les liens récents
4. **Exclusions** : Filtrez les patterns non critiques
5. **Horaires** : Planifiez aux heures creuses

### Q: Combien de liens le système peut-il gérer ?

**R:** Limites testées :
- **Développement** : 1,000 liens (5-10 min)
- **Production** : 5,000 liens (15-30 min)
- **Enterprise** : 10,000+ liens (avec optimisations)

### Q: Comment réduire l'utilisation mémoire ?

**R:** Optimisations mémoire :
1. **Streaming** : Traitez les liens par flux
2. **Garbage collection** : Forcez le nettoyage entre batches
3. **Limite de concurrence** : Réduisez `maxConcurrent`
4. **Cache size** : Limitez la taille du cache

## 🔒 Sécurité et conformité

### Q: Les données des utilisateurs sont-elles sécurisées ?

**R:** Mesures de sécurité :
- **Chiffrement** : Toutes les données en transit (HTTPS)
- **Base de données** : Supabase avec RLS activé
- **API Keys** : Variables d'environnement sécurisées
- **RGPD** : Consentement et droit à l'oubli respectés

### Q: Comment gérer les désabonnements ?

**R:** Processus automatique :
1. **Lien de désabonnement** : Dans chaque email
2. **Webhook SendGrid** : Traitement automatique
3. **Liste de suppression** : Mise à jour en temps réel
4. **Respect immédiat** : Arrêt des envois instantané

### Q: Que faire en cas de fuite de clé API ?

**R:** Procédure d'urgence :
1. **Révoquer immédiatement** : Dans SendGrid Dashboard
2. **Générer nouvelle clé** : Avec permissions minimales
3. **Mettre à jour Vercel** : Variables d'environnement
4. **Surveiller l'usage** : Vérifiez les logs d'activité
5. **Audit de sécurité** : Vérifiez les autres accès

## 📞 Support et maintenance

### Q: Comment obtenir de l'aide ?

**R:** Ressources disponibles :
1. **Documentation** : Guides complets dans `/docs`
2. **Logs détaillés** : Console et fichiers de log
3. **Dashboard de santé** : `/admin/system-health`
4. **Contact direct** : `ls@laurentserre.com` pour urgences

### Q: Comment contribuer au développement ?

**R:** Processus de contribution :
1. **Issues GitHub** : Signalez bugs et suggestions
2. **Pull Requests** : Proposez des améliorations
3. **Tests** : Ajoutez des tests pour nouvelles fonctionnalités
4. **Documentation** : Améliorez les guides existants

### Q: Quelle est la roadmap du projet ?

**R:** Fonctionnalités prévues :
- **Q3 2025** : Interface graphique avancée
- **Q4 2025** : Intégration avec d'autres CMS
- **Q1 2026** : API publique pour intégrations
- **Q2 2026** : Machine learning pour prédictions

## 📊 Métriques et KPIs

### Q: Quelles métriques surveiller ?

**R:** KPIs essentiels :
- **Score de santé** : Objectif >90%
- **Temps d'exécution** : <5 min pour 1000 liens
- **Taux de faux positifs** : <5%
- **Disponibilité** : >99.9% uptime
- **Satisfaction utilisateur** : Demandes de ressources traitées

### Q: Comment mesurer le ROI du système ?

**R:** Indicateurs de valeur :
- **Temps économisé** : Heures de vérification manuelle évitées
- **SEO amélioré** : Augmentation du trafic organique
- **Expérience utilisateur** : Réduction des erreurs 404
- **Productivité** : Automatisation des tâches répétitives

---

## 🆘 Contacts d'urgence

- **Problème critique** : `ls@laurentserre.com`
- **Support technique** : Créez une issue GitHub avec logs
- **Documentation** : Consultez `/docs` pour guides détaillés
- **Status système** : Vérifiez `/admin/system-health`

---

*FAQ mise à jour le 30 juillet 2025*