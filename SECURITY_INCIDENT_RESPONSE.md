# 🚨 Incident de Sécurité - Clé API Exposée

## 📋 Résumé de l'incident

**Date** : 08/02/2025  
**Type** : Exposition de clé API Google Gemini  
**Fichier** : `scripts/test-gemini-chat.ts`  
**Commit** : `d9f9bfa`  
**Détecté par** : GitGuardian  

## 🔍 Détails de l'exposition

Une clé API Google Gemini a été hardcodée dans le fichier de test :

```typescript
// ❌ Code problématique
const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyC17LYQE1GQS2dPJmh9z0zi1vNX4UpnvOE';
```

## ✅ Actions correctives immédiates

### 1. Correction du code
- [x] Suppression de la clé API hardcodée
- [x] Utilisation exclusive des variables d'environnement
- [x] Ajout de validation pour la clé API

### 2. Nettoyage de l'historique Git
```bash
# Exécuter le script de nettoyage
./scripts/clean-git-secrets.sh

# Forcer le push (ATTENTION: réécrit l'historique)
git push origin hotfix/chat-gemini-api-fix --force-with-lease
```

### 3. Révocation et rotation de la clé API

**URGENT** : La clé API exposée doit être révoquée immédiatement :

1. **Aller sur Google Cloud Console**
   - https://console.cloud.google.com/apis/credentials
   
2. **Révoquer l'ancienne clé**
   - Trouver la clé : `AIzaSyC17LYQE1GQS2dPJmh9z0zi1vNX4UpnvOE`
   - Cliquer sur "Supprimer" ou "Désactiver"
   
3. **Générer une nouvelle clé API**
   - Créer une nouvelle clé API Gemini
   - Configurer les restrictions appropriées
   
4. **Mettre à jour les variables d'environnement**
   ```bash
   # Local
   echo "GEMINI_API_KEY=nouvelle_cle_api" >> .env
   
   # Vercel (production)
   # Aller dans les settings du projet Vercel
   # Mettre à jour la variable GEMINI_API_KEY
   ```

## 🛡️ Mesures préventives

### 1. Règles de développement

**❌ Ne jamais faire :**
```typescript
// Hardcoder des clés API
const apiKey = 'AIzaSy...';

// Utiliser des fallbacks avec des vraies clés
const apiKey = process.env.API_KEY || 'vraie_cle_api';
```

**✅ Toujours faire :**
```typescript
// Utiliser uniquement les variables d'environnement
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY non définie');
}
```

### 2. Configuration Git

Ajouter un hook pre-commit pour détecter les secrets :

```bash
# Installer git-secrets
brew install git-secrets

# Configurer pour le projet
git secrets --install
git secrets --register-aws
git secrets --add 'AIza[0-9A-Za-z\\-_]{35}'  # Pattern pour clés Google
```

### 3. Variables d'environnement

**Fichier `.env.example`** :
```bash
# API Keys (ne jamais commiter les vraies valeurs)
GEMINI_API_KEY=your_gemini_api_key_here
```

**Fichier `.gitignore`** :
```
# Environment variables
.env
.env.local
.env.production
```

### 4. Tests sécurisés

```typescript
// ✅ Test sécurisé
async function testGeminiChat() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY requise pour les tests');
    process.exit(1);
  }
  
  // Utiliser la clé de façon sécurisée
  const service = new GeminiService(apiKey);
}
```

## 📊 Impact de l'incident

### Risques identifiés
- ✅ **Faible** : Clé API détectée rapidement
- ✅ **Mitigé** : Pas d'utilisation malveillante détectée
- ✅ **Contrôlé** : Révocation immédiate possible

### Actions de suivi
- [ ] Révocation de l'ancienne clé API
- [ ] Génération d'une nouvelle clé API
- [ ] Mise à jour des environnements (local, Vercel)
- [ ] Formation équipe sur les bonnes pratiques
- [ ] Installation d'outils de détection de secrets

## 🎯 Leçons apprises

1. **Ne jamais hardcoder de secrets** même dans les fichiers de test
2. **Utiliser des outils de détection** comme GitGuardian
3. **Valider les variables d'environnement** au lieu d'utiliser des fallbacks
4. **Réviser le code** avant chaque commit
5. **Former l'équipe** aux bonnes pratiques de sécurité

## 📞 Contacts d'urgence

- **Responsable sécurité** : Laurent Serre
- **Admin Google Cloud** : Laurent Serre
- **DevOps** : Laurent Serre

---

**Status** : 🔄 En cours de résolution  
**Prochaine révision** : Après révocation de la clé API