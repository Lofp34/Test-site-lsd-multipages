# Documentation du Service SendGrid

## Vue d'ensemble

Le `SendGridEmailService` est le service principal pour l'envoi d'emails dans le système d'audit des liens morts. Il gère tous les types d'emails nécessaires au bon fonctionnement du système.

## Fonctionnalités implémentées

### ✅ 1. Envoi d'emails de demande de ressources

**Méthode**: `sendResourceRequest(request: ResourceRequestEmail)`

- Envoie un email vers `ls@laurentserre.com` quand un utilisateur demande une ressource manquante
- Utilise le template `resource-request.html`
- Inclut toutes les informations de la demande (email utilisateur, ressource, message, compteur)
- Marque automatiquement les demandes fréquentes comme priorité élevée

### ✅ 2. Envoi d'alertes pour liens morts critiques

**Méthode**: `sendAuditAlert(alertData: AuditAlertData)`

- Envoie des alertes automatiques quand des liens morts sont détectés
- Utilise le template `audit-alert.html`
- Inclut le score de santé, le nombre de liens morts, et les liens critiques
- Adapte le style selon la gravité (vert/orange/rouge)

### ✅ 3. Système de réponse automatique aux utilisateurs

**Méthode**: `sendAutoResponse(userEmail: string, resourceUrl: string)`

- Envoie une confirmation automatique à l'utilisateur qui a fait une demande
- Utilise le template `auto-response.html`
- Inclut des liens vers les ressources disponibles
- Confirme que la demande a été transmise à Laurent Serre

### ✅ 4. Envoi de rapports hebdomadaires

**Méthode**: `sendWeeklyReport(reportData: WeeklyReportData)`

- Génère et envoie un rapport hebdomadaire complet
- Inclut les statistiques d'audit, tendances, et ressources les plus demandées
- Format HTML responsive avec graphiques et métriques

## Configuration

### Variables d'environnement requises

```bash
# SendGrid Configuration
SENDGRID_API_KEY=SG.your-api-key
SENDGRID_FROM_EMAIL=ls@laurentserre.com
SENDGRID_FROM_NAME=Système Audit - Laurent Serre
ADMIN_EMAIL=ls@laurentserre.com
```

### Initialisation

```typescript
import { SendGridEmailService } from '@/lib/email/sendgrid-service';

// Utilisation avec configuration par défaut (variables d'environnement)
const emailService = new SendGridEmailService();

// Utilisation avec configuration personnalisée
const emailService = new SendGridEmailService({
  apiKey: 'custom-api-key',
  fromEmail: 'custom@example.com',
  fromName: 'Custom Name',
  adminEmail: 'admin@example.com'
});
```

## Templates d'emails

### 1. Template de demande de ressource (`resource-request.html`)

**Variables supportées**:
- `{{userEmail}}` - Email du demandeur
- `{{resourceUrl}}` - URL de la ressource demandée
- `{{sourceUrl}}` - Page source de la demande
- `{{message}}` - Message optionnel du demandeur
- `{{requestCount}}` - Nombre de demandes pour cette ressource
- `{{isHighPriority}}` - Booléen pour priorité élevée
- `{{timestamp}}` - Date/heure de la demande

**Fonctionnalités**:
- Design responsive avec gradient Laurent Serre
- Badge de priorité élevée automatique
- Mise en évidence du nombre de demandes
- Formatage professionnel avec signature

### 2. Template d'alerte (`audit-alert.html`)

**Variables supportées**:
- `{{brokenLinksCount}}` - Nombre de liens morts
- `{{totalLinks}}` - Nombre total de liens
- `{{healthScore}}` - Score de santé (0-100)
- `{{healthScoreClass}}` - Classe CSS selon le score
- `{{criticalLinks}}` - Array des liens critiques
- `{{reportUrl}}` - URL du rapport complet
- `{{timestamp}}` - Date/heure de l'audit

**Fonctionnalités**:
- Couleurs adaptatives selon la gravité
- Liste des liens critiques avec détails
- Bouton CTA vers le rapport complet
- Recommandations d'actions

### 3. Template de réponse automatique (`auto-response.html`)

**Variables supportées**:
- `{{resourceUrl}}` - URL de la ressource demandée

**Fonctionnalités**:
- Message de confirmation professionnel
- Liens vers les ressources disponibles
- Signature Laurent Serre avec expertise
- Design cohérent avec la charte graphique

## Système de templates

### Moteur de templates intégré

Le service inclut un moteur de templates simple qui supporte :

```handlebars
<!-- Variables simples -->
{{variable}}

<!-- Conditions -->
{{#if condition}}
  Contenu affiché si condition est vraie
{{/if}}

<!-- Boucles -->
{{#each array}}
  {{propriete}} - Accès aux propriétés de chaque élément
{{/each}}
```

### Chargement des templates

Les templates sont chargés depuis `src/lib/email/templates/` et mis en cache automatiquement.

## Gestion des erreurs

### Retry automatique

Le service utilise la gestion d'erreurs native de SendGrid avec retry automatique.

### Logging complet

```typescript
// Succès
console.log(`✅ Email de demande de ressource envoyé vers ${adminEmail}`);

// Erreurs
console.error('❌ Erreur lors de l\'envoi:', error.message);
if (error.response) {
  console.error('Détails:', error.response.body);
}
```

### Codes de retour

Toutes les méthodes retournent un `boolean` :
- `true` : Email envoyé avec succès
- `false` : Échec de l'envoi

## Tests

### Test de configuration

```typescript
const success = await emailService.testConfiguration();
```

### Tests complets

Utilisez le script de test complet :

```bash
npx tsx scripts/test-sendgrid-service.ts
```

## Intégration avec le système d'audit

### Utilisation dans les API routes

```typescript
// app/api/resource-request/route.ts
import { getSendGridService } from '@/lib/email/sendgrid-service';

const emailService = getSendGridService();
await emailService.sendResourceRequest(requestData);
```

### Utilisation dans les scripts d'audit

```typescript
// scripts/audit-links.ts
import { getSendGridService } from '@/lib/email/sendgrid-service';

const emailService = getSendGridService();
if (brokenLinksCount > 0) {
  await emailService.sendAuditAlert(alertData);
}
```

## Performance et optimisation

### Instance singleton

Le service utilise un pattern singleton pour éviter les réinitialisations :

```typescript
export function getSendGridService(): SendGridEmailService {
  if (!_sendGridServiceInstance) {
    _sendGridServiceInstance = new SendGridEmailService();
  }
  return _sendGridServiceInstance;
}
```

### Cache des templates

Les templates HTML sont chargés une seule fois et mis en cache en mémoire.

### Rate limiting

SendGrid gère automatiquement le rate limiting selon votre plan.

## Sécurité

### Variables d'environnement

- Toutes les clés sensibles sont stockées dans les variables d'environnement
- Aucune clé API n'est hard-codée dans le code source
- Validation de la présence des variables requises au démarrage

### Validation des emails

- Validation automatique des adresses email par SendGrid
- Gestion des bounces et suppressions automatique

### Templates sécurisés

- Échappement automatique des variables pour éviter les injections
- Validation des données avant insertion dans les templates

## Monitoring et métriques

### Logs structurés

Tous les envois sont loggés avec :
- ✅ Succès avec destinataire
- ❌ Échecs avec détails d'erreur
- 📊 Métriques de performance

### Intégration SendGrid

Utilisez le dashboard SendGrid pour :
- Statistiques de délivrabilité
- Taux d'ouverture et de clic
- Gestion des suppressions
- Monitoring des bounces

## Maintenance

### Mise à jour des templates

1. Modifier les fichiers `.html` dans `src/lib/email/templates/`
2. Redémarrer l'application pour recharger les templates
3. Tester avec `npx tsx scripts/test-sendgrid-service.ts`

### Ajout de nouveaux types d'emails

1. Créer le template HTML
2. Ajouter l'interface TypeScript
3. Implémenter la méthode dans `SendGridEmailService`
4. Ajouter les tests correspondants

## Dépannage

### Erreurs courantes

**"SENDGRID_API_KEY est requis"**
- Vérifier que la variable d'environnement est définie
- Vérifier que le fichier `.env` est chargé

**"Template non trouvé"**
- Vérifier que le fichier template existe dans `src/lib/email/templates/`
- Vérifier les permissions de lecture du fichier

**"Échec de l'envoi"**
- Vérifier la validité de la clé API SendGrid
- Vérifier que l'email expéditeur est vérifié dans SendGrid
- Consulter les logs détaillés pour plus d'informations

### Debug

Activez les logs détaillés en définissant :

```bash
DEBUG=sendgrid:*
```

## Roadmap

### Fonctionnalités futures

- [ ] Support des pièces jointes
- [ ] Templates dynamiques avec SendGrid Dynamic Templates
- [ ] Personnalisation avancée selon le profil utilisateur
- [ ] Intégration avec un système de queue pour les gros volumes
- [ ] Métriques avancées et analytics personnalisés

---

**Status**: ✅ Complètement implémenté et testé
**Dernière mise à jour**: 27 janvier 2025
**Responsable**: Système d'audit des liens morts