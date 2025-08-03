# 🔧 Hotfix: Correction Chat Gemini API & Erreurs Console

## 📋 Résumé des corrections

Cette PR corrige les erreurs critiques empêchant le fonctionnement du chat Gemini sur le site Laurent Serre Développement.

## 🐛 Problèmes résolus

### 1. Erreur API Gemini - "An API Key must be set when running in a browser"
**Problème** : L'API Gemini n'était pas initialisée avec la clé API
**Solution** : Ajout de la clé API lors de l'initialisation de `GoogleGenAI`

```typescript
// Avant
aiRef.current = new GoogleGenAI({});

// Après  
aiRef.current = new GoogleGenAI({
  apiKey: apiKey
});
```

### 2. Erreur d'import - 'trackSectionView' is not exported
**Problème** : La fonction `trackSectionView` était utilisée mais non exportée
**Solution** : Ajout de l'export manquant dans `cta-tracking.ts`

```typescript
export function trackSectionView(sectionId: string, sectionName: string) {
  console.log('Section view tracked:', { sectionId, sectionName });
  
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'section_view', {
      section_id: sectionId,
      section_name: sectionName
    });
  }
}
```

### 3. Dépendances useEffect incorrectes
**Problème** : Le hook ne se réinitialisait pas si la clé API changeait
**Solution** : Ajout de `apiKey` dans les dépendances du useEffect

## 📁 Fichiers modifiés

- `src/hooks/useGeminiChatSimple.ts` - Correction initialisation API + dépendances
- `src/utils/cta-tracking.ts` - Ajout export `trackSectionView`

## ✅ Tests effectués

- [x] Serveur de développement redémarre sans erreurs
- [x] Console navigateur propre (plus d'erreurs Gemini)
- [x] Chat Gemini s'initialise correctement
- [x] Variables d'environnement `NEXT_PUBLIC_GEMINI_API_KEY` accessible côté client

## 🔍 Vérifications post-déploiement

1. **Console navigateur** : Vérifier l'absence d'erreurs Gemini
2. **Chat fonctionnel** : Tester l'envoi de messages
3. **Analytics** : Vérifier le tracking des sections

## 🚀 Impact

- ✅ Chat Gemini opérationnel sur la page d'accueil
- ✅ Expérience utilisateur améliorée
- ✅ Réduction des erreurs console
- ✅ Tracking analytics fonctionnel

## 📝 Notes techniques

- Les variables d'environnement `NEXT_PUBLIC_*` sont nécessaires pour l'accès côté client
- L'API Gemini 2.5 Flash est configurée avec `thinkingBudget: 0` pour optimiser les performances
- Le hook utilise le streaming pour une meilleure UX

## 🔗 Liens utiles

- [Documentation Gemini API](https://ai.google.dev/gemini-api/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

---

**Type** : Hotfix  
**Priorité** : Critique  
**Testeur** : Laurent Serre  
**Reviewer** : À assigner