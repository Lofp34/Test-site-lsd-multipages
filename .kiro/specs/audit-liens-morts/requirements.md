# Requirements Document

## Introduction

Ce projet vise à créer un système d'audit complet pour détecter et corriger tous les liens morts sur le site Laurent Serre Développement. L'objectif est d'éliminer les erreurs 404, les liens internes cassés et les ressources manquantes qui pénalisent le SEO et dégradent l'expérience utilisateur.

## Requirements

### Requirement 1

**User Story:** En tant que visiteur du site, je veux que tous les liens fonctionnent correctement, afin de ne pas tomber sur des pages d'erreur qui dégradent mon expérience.

#### Acceptance Criteria

1. WHEN un utilisateur clique sur un lien interne THEN il doit être redirigé vers une page existante
2. WHEN un utilisateur tente de télécharger une ressource THEN le fichier doit être disponible ou un message explicite doit indiquer que la ressource est en développement
3. WHEN un utilisateur navigue sur le site THEN aucun lien ne doit retourner une erreur 404
4. IF une ressource n'est pas encore disponible THEN un message "Ressource en développement" doit s'afficher au lieu d'une erreur

### Requirement 2

**User Story:** En tant qu'expert SEO, je veux éliminer tous les liens morts du site, afin d'éviter les pénalités de référencement et améliorer l'autorité du domaine.

#### Acceptance Criteria

1. WHEN Google crawle le site THEN aucun lien mort ne doit être détecté
2. WHEN un audit SEO est effectué THEN le score de santé des liens doit être de 100%
3. IF un lien interne est cassé THEN il doit être corrigé ou supprimé
4. WHEN une page est supprimée THEN tous les liens pointant vers cette page doivent être mis à jour

### Requirement 3

**User Story:** En tant que développeur, je veux un système automatisé de détection des liens morts, afin de maintenir la qualité du site en continu.

#### Acceptance Criteria

1. WHEN le système d'audit s'exécute THEN il doit scanner toutes les pages du site
2. WHEN un lien mort est détecté THEN il doit être reporté avec sa localisation exacte
3. WHEN l'audit est terminé THEN un rapport détaillé doit être généré
4. IF de nouveaux liens morts apparaissent THEN ils doivent être détectés automatiquement

### Requirement 4

**User Story:** En tant que propriétaire du site, je veux un rapport détaillé des liens à corriger, afin de prioriser les corrections selon leur impact SEO.

#### Acceptance Criteria

1. WHEN l'audit est terminé THEN un rapport JSON et HTML doit être généré
2. WHEN un lien mort est trouvé THEN sa priorité (critique/moyenne/faible) doit être évaluée
3. WHEN le rapport est consulté THEN les liens morts doivent être catégorisés par type (interne, téléchargement, externe)
4. IF un lien a un fort impact SEO THEN il doit être marqué comme priorité critique

### Requirement 5

**User Story:** En tant que visiteur, je veux des messages informatifs quand une ressource n'est pas disponible, afin de comprendre que le contenu est en développement plutôt que cassé.

#### Acceptance Criteria

1. WHEN une ressource de téléchargement n'existe pas THEN un message "Ressource en développement - Disponible prochainement" doit s'afficher
2. WHEN une page n'est pas encore créée THEN une page temporaire avec message explicatif doit être affichée
3. WHEN un lien pointe vers du contenu manquant THEN l'utilisateur doit être informé du statut de développement
4. IF le contenu est planifié THEN une date approximative de disponibilité peut être indiquée

### Requirement 6

**User Story:** En tant que visiteur, je veux pouvoir demander une ressource manquante, afin de signaler mon intérêt et recevoir la ressource quand elle sera disponible.

#### Acceptance Criteria

1. WHEN une ressource n'est pas disponible THEN un bouton "Demander cette ressource" doit être affiché
2. WHEN je clique sur "Demander cette ressource" THEN un formulaire simple (email + message optionnel) doit s'ouvrir
3. WHEN je soumets ma demande THEN un email doit être envoyé automatiquement à l'adresse configurée (ls@laurentserre.com)
4. WHEN l'email est envoyé THEN il doit contenir l'email du demandeur, la ressource demandée, et l'URL de la page
5. IF la demande est envoyée THEN l'utilisateur doit recevoir une confirmation de prise en compte
6. WHEN Laurent reçoit l'email THEN il doit pouvoir identifier facilement quelle ressource créer en priorité

### Requirement 7

**User Story:** En tant que développeur, je veux corriger automatiquement les liens simples, afin de réduire le travail manuel de maintenance.

#### Acceptance Criteria

1. WHEN un lien a une faute de frappe évidente THEN il doit être corrigé automatiquement
2. WHEN un fichier existe avec une extension différente THEN le lien doit être mis à jour
3. WHEN une page a été déplacée THEN les redirections appropriées doivent être créées
4. IF une correction automatique est appliquée THEN elle doit être loggée pour validation

### Requirement 8

**User Story:** En tant qu'administrateur, je veux surveiller la santé des liens en continu, afin de détecter rapidement les nouveaux problèmes.

#### Acceptance Criteria

1. WHEN le site est déployé THEN un audit automatique doit être déclenché
2. WHEN de nouveaux liens morts apparaissent THEN une alerte doit être envoyée
3. WHEN l'audit s'exécute THEN les métriques de santé des liens doivent être mises à jour
4. IF la santé des liens se dégrade THEN des actions correctives doivent être suggérées

## Configuration Email

### Variables d'environnement requises

Pour le système de demande de ressources, les variables suivantes doivent être configurées :

```bash
# .env.local
ADMIN_EMAIL=ls@laurentserre.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
```

### Sécurité

- L'email administrateur ne doit jamais être hard-codé dans le code source
- Utilisation de variables d'environnement pour la configuration
- Possibilité de changer l'email de destination sans redéploiement
- Support de différents fournisseurs SMTP (Gmail, SendGrid, etc.)

### Template d'email

L'email envoyé à `ls@laurentserre.com` contiendra :
- **Sujet** : "Nouvelle demande de ressource - [NOM_RESSOURCE]"
- **Contenu** : Email du demandeur, ressource demandée, URL source, message optionnel
- **Priorité** : Basée sur la fréquence des demandes pour cette ressource