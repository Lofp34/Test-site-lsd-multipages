# 🔧 Configuration HubSpot - Guide Complet

## 🚨 Problème Actuel

Votre formulaire retourne une erreur 500 car les **vraies clés HubSpot** ne sont pas configurées dans `.env.local`.

**Valeur actuelle** : `your_hubspot_token_here` (placeholder)  
**Valeur requise** : Votre vrai token d'accès HubSpot

## 📋 Étapes de Configuration

### 1. 🔑 Obtenir votre Token d'Accès HubSpot

#### Option A : Utiliser une App Privée (Recommandé)

1. **Connectez-vous à HubSpot** → https://app.hubspot.com
2. **Allez dans les Paramètres** (roue dentée en haut à droite)
3. **Navigation** : `Intégrations` → `App privées`
4. **Créer une app privée** → Cliquez sur "Créer une app privée"
5. **Configuration** :
   - **Nom** : "Laurent Serre Site Web"
   - **Description** : "Intégration formulaire site web"
6. **Permissions (Scopes)** - Cochez ces cases :
   ```
   ✅ CRM Objects → Contacts
      ✅ Read (Lecture)
      ✅ Write (Écriture)
   ```
7. **Créer l'app** → Cliquez sur "Créer app"
8. **Copier le token** → Copiez le "Token d'accès" généré

#### Option B : Utiliser un Token d'API (Déprécié mais possible)

1. **Paramètres HubSpot** → `Intégrations` → `Clés API`
2. **Générer une nouvelle clé** → Copiez la clé

### 2. 🎯 Obtenir votre Portal ID

1. **Dans HubSpot**, allez dans `Paramètres` → `Compte et facturation` → `Informations sur le compte`
2. **Copiez le "Hub ID"** (c'est votre Portal ID)

### 3. 📝 Configurer le fichier .env.local

Modifiez le fichier `.env.local` à la racine de votre projet :

```bash
# Variables d'environnement pour HubSpot
# Remplacez par vos VRAIES valeurs

# Token d'accès HubSpot (remplacez VOTRE_TOKEN_ICI)
HUBSPOT_API_TOKEN=pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# ID du portail HubSpot (remplacez VOTRE_PORTAL_ID)  
HUBSPOT_PORTAL_ID=12345678

# Environnement de développement
NODE_ENV=development
```

### 4. 🔄 Redémarrer le Serveur

Après avoir modifié `.env.local` :

```bash
# Arrêter le serveur (Ctrl+C)
# Puis relancer
npm run dev
```

## ✅ Vérification de la Configuration

### Test 1 : Variables d'Environnement

Créez un fichier temporaire `test-env.js` :

```javascript
console.log('🔑 HUBSPOT_API_TOKEN:', process.env.HUBSPOT_API_TOKEN);
console.log('🏢 HUBSPOT_PORTAL_ID:', process.env.HUBSPOT_PORTAL_ID);
```

Exécutez : `node test-env.js`

### Test 2 : API HubSpot

Utilisez notre script de test :
```bash
node test-hubspot-api.js
```

**Résultat attendu** :
```
✅ Contact créé avec succès
```

## 🚨 Messages d'Erreur Courants

### "Configuration HubSpot manquante"
- ❌ Le fichier `.env.local` n'existe pas
- ❌ Le token est encore sur `your_hubspot_token_here`
- ✅ **Solution** : Configurez le vrai token

### "401 Unauthorized"
- ❌ Token invalide ou expiré
- ❌ Permissions insuffisantes
- ✅ **Solution** : Vérifiez le token et les scopes

### "403 Forbidden"  
- ❌ Permissions insuffisantes
- ✅ **Solution** : Ajoutez les scopes `contacts:read` et `contacts:write`

### "429 Too Many Requests"
- ❌ Limite de taux dépassée
- ✅ **Solution** : Attendre quelques minutes

## 🔍 Debugging Avancé

Si les problèmes persistent, vérifiez :

1. **Format du Token** :
   ```
   ✅ App Privée : pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ✅ API Key : xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```

2. **Permissions dans HubSpot** :
   - App privée : Scopes contacts activés
   - Utilisateur : Droits d'administration

3. **Test Direct via cURL** :
   ```bash
   curl -X GET "https://api.hubapi.com/crm/v3/objects/contacts?limit=1" \
        -H "Authorization: Bearer VOTRE_TOKEN"
   ```

## 🎯 Une Fois Configuré

Votre formulaire devrait :
- ✅ Créer automatiquement les contacts dans HubSpot
- ✅ Stocker le score diagnostic dans le message
- ✅ Fonctionner sans erreur 500
- ✅ Afficher des logs de succès

## 📞 Support

Si vous avez encore des problèmes après cette configuration :
1. Vérifiez que votre compte HubSpot a les bonnes permissions
2. Testez votre token directement dans l'API HubSpot
3. Vérifiez que les variables d'environnement sont bien chargées

---

**Important** : Ne partagez jamais votre token d'accès HubSpot publiquement !