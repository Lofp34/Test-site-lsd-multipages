# Intégration API Google Gemini - Règles Officielles

## 📚 Documentation de référence
Basé sur la documentation officielle Google : "Guide de démarrage rapide de l'API Gemini"

## 🔧 Installation et configuration

### Package officiel
```bash
npm install @google/genai
```

### Import correct
```typescript
import { GoogleGenAI } from "@google/genai";
```

### Initialisation
```typescript
// Le client récupère automatiquement la clé API depuis la variable d'environnement GEMINI_API_KEY
const ai = new GoogleGenAI({});

// OU avec clé API explicite
const ai = new GoogleGenAI({ apiKey: 'your-api-key' });
```

## 🎯 Utilisation de base

### Génération de contenu simple
```typescript
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: "Explain how AI works in a few words",
});
console.log(response.text);
```

### Désactiver la réflexion (pour la performance)
```typescript
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: "Your prompt here",
  config: {
    thinkingConfig: {
      thinkingBudget: 0, // Désactive la réflexion
    },
  }
});
```

## 🔄 Streaming
```typescript
const response = await ai.models.generateContentStream({
  model: "gemini-2.5-flash",
  contents: "Your prompt here",
});

for await (const chunk of response) {
  console.log(chunk.text);
}
```

## 💬 Chat multitours
```typescript
const chat = ai.chats.create({
  model: "gemini-2.5-flash",
  history: [
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model", 
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ],
});

const response = await chat.sendMessage({
  message: "I have 2 dogs in my house.",
});
```

## 🖼️ Contenu multimodal
```typescript
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

const image = await ai.files.upload({
  file: "/path/to/image.png",
});

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: [
    createUserContent([
      "Tell me about this image",
      createPartFromUri(image.uri, image.mimeType),
    ]),
  ],
});
```

## 🔐 Variables d'environnement
```bash
# .env.local
GEMINI_API_KEY=your_api_key_here
```

## ⚠️ Points importants

1. **Package correct** : `@google/genai` (PAS `@google/generative-ai`)
2. **Classe correcte** : `GoogleGenAI` (PAS `GoogleGenerativeAI`)
3. **Auto-détection** : La clé API est automatiquement récupérée depuis `GEMINI_API_KEY`
4. **Réflexion** : Activée par défaut sur Gemini 2.5, peut être désactivée pour la performance
5. **Modèle recommandé** : `gemini-2.5-flash` pour la plupart des cas d'usage

## 🚫 Erreurs communes à éviter

❌ **Mauvais package** :
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai'; // FAUX
```

✅ **Bon package** :
```typescript
import { GoogleGenAI } from '@google/genai'; // CORRECT
```

❌ **Mauvaise initialisation** :
```typescript
const ai = new GoogleGenerativeAI(apiKey); // FAUX
```

✅ **Bonne initialisation** :
```typescript
const ai = new GoogleGenAI({}); // CORRECT (auto-détection)
// OU
const ai = new GoogleGenAI({ apiKey }); // CORRECT (explicite)
```

## 📋 Checklist d'intégration

- [ ] Package `@google/genai` installé
- [ ] Import `GoogleGenAI` depuis `@google/genai`
- [ ] Variable d'environnement `GEMINI_API_KEY` configurée
- [ ] Initialisation avec `new GoogleGenAI({})`
- [ ] Modèle `gemini-2.5-flash` utilisé
- [ ] ThinkingBudget à 0 pour la performance si nécessaire
- [ ] Gestion d'erreurs implémentée
- [ ] Tests fonctionnels validés