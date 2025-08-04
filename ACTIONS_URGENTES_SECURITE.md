# 🚨 ACTIONS URGENTES - SÉCURITÉ

## ⚡ À FAIRE IMMÉDIATEMENT

### 1. 🔑 Révoquer l'ancienne clé API Google

**Clé exposée** : `AIzaSyC17LYQE1GQS2dPJmh9z0zi1vNX4UpnvOE`

**Étapes** :
1. Aller sur [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Trouver la clé API exposée
3. Cliquer sur "Supprimer" ou "Désactiver"
4. Confirmer la suppression

### 2. 🆕 Générer une nouvelle clé API

**Étapes** :
1. Dans Google Cloud Console → APIs & Services → Credentials
2. Cliquer sur "Create Credentials" → "API Key"
3. Configurer les restrictions :
   - **Application restrictions** : HTTP referrers ou IP addresses
   - **API restrictions** : Generative Language API
4. Copier la nouvelle clé API

### 3. 🔄 Mettre à jour les variables d'environnement

#### Local (.env)
```bash
# Remplacer l'ancienne clé par la nouvelle
GEMINI_API_KEY=nouvelle_cle_api_ici
```

#### Vercel (Production)
1. Aller sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionner le projet
3. Aller dans Settings → Environment Variables
4. Mettre à jour `GEMINI_API_KEY` avec la nouvelle clé
5. Redéployer le projet

### 4. ✅ Vérifier que tout fonctionne

```bash
# Tester localement
npm run dev

# Tester l'API Gemini
npx tsx scripts/test-chat-gemini-integration.ts
```

## 📊 Status de l'incident

- [x] **Détection** : GitGuardian a détecté la clé exposée
- [x] **Suppression du code** : Fichier supprimé du repository
- [x] **Nettoyage historique** : Clé supprimée de l'historique Git
- [x] **Push forcé** : Historique mis à jour sur GitHub
- [x] **Révocation clé** : ✅ **TERMINÉ** - Ancienne clé supprimée
- [x] **Nouvelle clé** : ✅ **TERMINÉ** - Nouvelle clé générée et validée
- [x] **Mise à jour env local** : ✅ **TERMINÉ** - `.env` corrigé (clé unique)
- [x] **Tests locaux** : ✅ **TERMINÉ** - 8/8 tests réussis ✅
- [ ] **Mise à jour Vercel** : ⚠️ **PROCHAINE ÉTAPE** - Variable d'environnement
- [ ] **Tests production** : En attente de la mise à jour Vercel

## 🛡️ Mesures préventives mises en place

- [x] Script de nettoyage Git créé
- [x] Documentation de sécurité créée
- [x] Guide de bonnes pratiques ajouté
- [x] Fichier problématique supprimé

## 📞 Support

Si vous avez des questions ou des problèmes :
1. Vérifiez le fichier `SECURITY_INCIDENT_RESPONSE.md`
2. Consultez la documentation Google Cloud
3. Testez avec `scripts/test-chat-gemini-integration.ts`

---

**⏰ DÉLAI CRITIQUE** : Ces actions doivent être effectuées dans les plus brefs délais pour sécuriser l'application.

**🔒 SÉCURITÉ** : Une fois ces étapes terminées, l'incident sera résolu et la pull request pourra être mergée.