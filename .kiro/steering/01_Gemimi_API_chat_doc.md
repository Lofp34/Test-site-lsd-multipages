
Gemini API
Modèles

Envoyer des commentairesGénération de texte

L'API Gemini peut générer une sortie textuelle à partir de diverses entrées, y compris du texte, des images, des vidéos et de l'audio, en exploitant les modèles Gemini.

Voici un exemple de base qui utilise une seule entrée textuelle:

Python
JavaScript
Go
REST
Apps Script

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "How does AI work?",
  });
  console.log(response.text);
}

await main();

Penser avec Gemini 2.5
La réflexion est activée par défaut pour les modèles 2.5 Flash et Pro afin d'améliorer la qualité. Cela peut prendre plus de temps à s'exécuter et augmenter l'utilisation des jetons.

Lorsque vous utilisez Flash 2.5, vous pouvez désactiver la réflexion en définissant le budget de réflexion sur zéro.

Pour en savoir plus, consultez le guide de réflexion.

Python
JavaScript
Go
REST
Apps Script

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "How does AI work?",
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    }
  });
  console.log(response.text);
}

await main();
Instructions système et autres configurations
Vous pouvez guider le comportement des modèles Gemini à l'aide d'instructions système. Pour ce faire, transmettez un objet GenerateContentConfig.

Python
JavaScript
Go
REST
Apps Script

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Hello there",
    config: {
      systemInstruction: "You are a cat. Your name is Neko.",
    },
  });
  console.log(response.text);
}

await main();
L'objet GenerateContentConfig vous permet également de remplacer les paramètres de génération par défaut, tels que la température.

Python
JavaScript
Go
REST
Apps Script

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works",
    config: {
      temperature: 0.1,
    },
  });
  console.log(response.text);
}

await main();
Consultez GenerateContentConfig dans notre documentation de référence de l'API pour obtenir la liste complète des paramètres configurables et leurs descriptions.

Entrées multimodales
L'API Gemini accepte les entrées multimodales, ce qui vous permet de combiner du texte à des fichiers multimédias. L'exemple suivant montre comment fournir une image:

Python
JavaScript
Go
REST
Apps Script

import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

const ai = new GoogleGenAI({});

async function main() {
  const image = await ai.files.upload({
    file: "/path/to/organ.png",
  });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      createUserContent([
        "Tell me about this instrument",
        createPartFromUri(image.uri, image.mimeType),
      ]),
    ],
  });
  console.log(response.text);
}

await main();
Pour découvrir d'autres méthodes de fourniture d'images et un traitement d'images plus avancé, consultez notre guide de compréhension des images. L'API est également compatible avec les entrées et la compréhension des documents, des vidéos et des audios.

Réponses en streaming
Par défaut, le modèle ne renvoie une réponse qu'une fois tout le processus de génération terminé.

Pour des interactions plus fluides, utilisez le streaming pour recevoir des instances GenerateContentResponse de manière incrémentielle à mesure qu'elles sont générées.

Python
JavaScript
Go
REST
Apps Script

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function main() {
  const response = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works",
  });

  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

await main();
Conversations multitours (chat)
Nos SDK offrent la possibilité de collecter plusieurs séries d'invites et de réponses dans une discussion, ce qui vous permet de suivre facilement l'historique des conversations.

Remarque :La fonctionnalité Chat n'est implémentée que dans les SDK. En coulisses, elle utilise toujours l'API generateContent. Pour les conversations multitours, l'historique complet de la conversation est envoyé au modèle à chaque tour de suivi.
Python
JavaScript
Go
REST
Apps Script

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function main() {
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

  const response1 = await chat.sendMessage({
    message: "I have 2 dogs in my house.",
  });
  console.log("Chat response 1:", response1.text);

  const response2 = await chat.sendMessage({
    message: "How many paws are in my house?",
  });
  console.log("Chat response 2:", response2.text);
}

await main();
Le streaming peut également être utilisé pour les conversations multitours.

Python
JavaScript
Go
REST
Apps Script

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function main() {
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

  const stream1 = await chat.sendMessageStream({
    message: "I have 2 dogs in my house.",
  });
  for await (const chunk of stream1) {
    console.log(chunk.text);
    console.log("_".repeat(80));
  }

  const stream2 = await chat.sendMessageStream({
    message: "How many paws are in my house?",
  });
  for await (const chunk of stream2) {
    console.log(chunk.text);
    console.log("_".repeat(80));
  }
}

await main();
Modèles compatibles
Tous les modèles de la famille Gemini sont compatibles avec la génération de texte. Pour en savoir plus sur les modèles et leurs fonctionnalités, consultez la page Modèles.

Bonnes pratiques
Conseils concernant les requêtes
Pour la génération de texte de base, un prompt sans entraînement suffit souvent, sans avoir besoin d'exemples, d'instructions système ni de mise en forme spécifique.

Pour obtenir des résultats plus personnalisés:

Utilisez les instructions système pour guider le modèle.
Fournissez quelques exemples d'entrées et de sorties pour guider le modèle. On parle souvent de requêtes few-shot.
Pour en savoir plus, consultez notre guide d'ingénierie des requêtes.

Sortie structurée
Dans certains cas, vous devrez peut-être obtenir une sortie structurée, comme JSON. Pour en savoir plus, consultez notre guide sur les sorties structurées.