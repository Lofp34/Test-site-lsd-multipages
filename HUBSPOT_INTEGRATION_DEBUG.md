# Diagnostic et Correction de l'Intégration HubSpot

## 🔍 Problème Identifié

**Erreur 500** lors de la soumission du formulaire de diagnostic commercial.

## 📚 Recherches Effectuées

### Sources Consultées
- **Next.js Error Debugging Guide** (11 erreurs courantes)
- **HubSpot API Integration Best Practices** (Nango Blog)
- **GitHub Examples** de formulaires HubSpot avec Next.js
- **Stack Overflow & Medium** - Articles sur l'intégration HubSpot

### Causes Principales Identifiées

1. **❌ Propriétés Personnalisées Inexistantes**
   - `diagnostic_score`, `diagnostic_level`, `form_type` n'existent pas dans HubSpot
   - Erreur 500 car HubSpot rejette les propriétés non définies

2. **🔑 Problèmes d'Authentification**
   - Format du token incorrect
   - Variables d'environnement mal configurées

3. **📝 Format de Données Incorrect**
   - Structure des données non conforme à l'API HubSpot

## ✅ Solutions Appliquées

### 1. Suppression des Propriétés Personnalisées
```typescript
// ❌ AVANT (causait l'erreur 500)
const contactData = {
  properties: {
    firstname: firstName,
    diagnostic_score: diagnosticScore,    // ❌ N'existe pas
    diagnostic_level: diagnosticLevel,    // ❌ N'existe pas
    form_type: formType                   // ❌ N'existe pas
  }
};

// ✅ APRÈS (utilise seulement les propriétés standard)
const contactData = {
  properties: {
    firstname: firstName,
    lastname: lastName || '',
    email: email,
    company: company || '',
    phone: phone || '',
    lifecyclestage: 'lead',
    lead_source: 'Site web Laurent Serre',
    // Données supplémentaires stockées dans le message
    message: `${message || ''}\n\n--- Infos diagnostic ---\nScore: ${diagnosticScore || 'N/A'}\nNiveau: ${diagnosticLevel || 'N/A'}\nType formulaire: ${formType || 'Contact'}`
  }
};
```

### 2. Ajout de Logs Détaillés
- 🚀 Logs au début de la requête
- 📝 Affichage des données reçues
- 🔑 Vérification des variables d'environnement
- 📤 Payload envoyé à HubSpot
- 📊 Statut de la réponse API
- ✅/❌ Succès ou erreurs détaillées

### 3. Amélioration de la Gestion d'Erreurs
- Gestion des conflits (contact existant)
- Logs d'erreur détaillés avec stack trace
- Messages d'erreur différents selon l'environnement (dev/prod)

## 🏆 Meilleures Pratiques Appliquées

### Authentification Sécurisée
- Utilisation du token OAuth (plus sécurisé que les API keys)
- Validation des variables d'environnement
- Masquage des tokens dans les logs

### Structure d'API RESTful
- Endpoints standardisés
- Méthodes HTTP appropriées (POST, PATCH)
- Gestion des codes de statut

### Gestion des Propriétés HubSpot
- ✅ Utilisation uniquement des propriétés standard
- ✅ Stockage des données supplémentaires dans le champ `message`
- ✅ Évitement des propriétés personnalisées non définies

### Observabilité et Debugging
- Logs structurés avec emojis pour la lisibilité
- Informations de debugging conditionnelles
- Monitoring des appels API

## 🔧 Instructions de Test

1. **Vérifier les Variables d'Environnement**
   ```bash
   # Dans .env.local
   HUBSPOT_API_TOKEN=your_token_here
   HUBSPOT_PORTAL_ID=your_portal_id_here
   ```

2. **Tester le Formulaire**
   - Remplir le formulaire de diagnostic
   - Vérifier les logs dans la console du navigateur et du serveur
   - Contrôler la création du contact dans HubSpot

3. **Vérifier les Logs**
   ```bash
   # Dans les logs du serveur, vous devriez voir :
   🚀 API HubSpot - Début de la requête
   📝 Données reçues: {...}
   🔑 Variables d'environnement: {...}
   📤 Données préparées pour HubSpot: {...}
   🔗 HubSpot createContact - Début
   📊 Statut de la réponse: 201
   ✅ Contact créé avec succès
   ```

## 📋 Checklist de Validation

- [ ] Variables d'environnement configurées
- [ ] Propriétés personnalisées supprimées
- [ ] Logs ajoutés pour le debugging
- [ ] Gestion d'erreurs améliorée
- [ ] Test du formulaire réussi
- [ ] Contact visible dans HubSpot
- [ ] Données diagnostic stockées dans le message

## 🎯 Résultat Attendu

✅ **Formulaire fonctionnel** sans erreur 500
✅ **Contact créé** automatiquement dans HubSpot
✅ **Données diagnostic** sauvegardées dans le champ message
✅ **Logs détaillés** pour le debugging
✅ **Gestion robuste** des erreurs et des conflits

## 📞 Si le Problème Persiste

1. Vérifier les logs côté serveur
2. Confirmer que le token HubSpot est valide
3. Tester l'API directement avec Postman
4. Vérifier les permissions du token HubSpot
5. Contrôler la connectivité réseau

---

Cette correction suit les **meilleures pratiques d'intégration HubSpot** identifiées lors des recherches et devrait résoudre l'erreur 500 définitivement.