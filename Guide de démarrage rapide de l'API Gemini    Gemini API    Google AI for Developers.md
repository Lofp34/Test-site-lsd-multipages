Ce guide de démarrage rapide vous explique comment installer nos [bibliothèques](https://ai.google.dev/gemini-api/docs/libraries?hl=fr) et effectuer votre première requête à l'API Gemini.

## Avant de commencer

Vous avez besoin d'une clé API Gemini. Si vous n'en avez pas encore, vous pouvez [en obtenir une sans frais dans Google AI Studio](https://aistudio.google.com/app/apikey?hl=fr).

## Installer le SDK Google GenAI

[Python](https://ai.google.dev/gemini-api/docs/quickstart?lang=python&hl=fr#python)[JavaScript](https://ai.google.dev/gemini-api/docs/quickstart?lang=python&hl=fr#javascript)[Go](https://ai.google.dev/gemini-api/docs/quickstart?lang=python&hl=fr#go)[Java](https://ai.google.dev/gemini-api/docs/quickstart?lang=python&hl=fr#java)[Apps Script](https://ai.google.dev/gemini-api/docs/quickstart?lang=python&hl=fr#apps-script)

À l'aide de [Node.js v18 ou version ultérieure](https://nodejs.org/en/download/package-manager), installez le [SDK Google Gen AI pour TypeScript et JavaScript](https://www.npmjs.com/package/@google/genai) à l'aide de la [commande npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) suivante :

```
npm<span> </span>install<span> </span>@google/genai
```

## Créer votre première demande

Voici un exemple qui utilise la méthode [`generateContent`](https://ai.google.dev/api/generate-content?hl=fr#method:-models.generatecontent) pour envoyer une requête à l'API Gemini à l'aide du modèle Gemini 2.5 Flash.

Si vous [définissez votre clé API](https://ai.google.dev/gemini-api/docs/api-key?hl=fr#set-api-env-var) comme variable d'environnement `GEMINI_API_KEY`, elle sera automatiquement récupérée par le client lors de l'utilisation des [bibliothèques de l'API Gemini](https://ai.google.dev/gemini-api/docs/libraries?hl=fr). Sinon, vous devrez [transmettre votre clé API](https://ai.google.dev/gemini-api/docs/api-key?hl=fr#provide-api-key-explicitly) en tant qu'argument lors de l'initialisation du client.

Notez que tous les exemples de code de la documentation de l'API Gemini supposent que vous avez défini la variable d'environnement `GEMINI_API_KEY`.

[Python](https://ai.google.dev/gemini-api/docs/quickstart?lang=python&hl=fr#python)[JavaScript](https://ai.google.dev/gemini-api/docs/quickstart?lang=python&hl=fr#javascript)[Go](https://ai.google.dev/gemini-api/docs/quickstart?lang=python&hl=fr#go)[Java](https://ai.google.dev/gemini-api/docs/quickstart?lang=python&hl=fr#java)[Apps Script](https://ai.google.dev/gemini-api/docs/quickstart?lang=python&hl=fr#apps-script)[REST](https://ai.google.dev/gemini-api/docs/quickstart?lang=python&hl=fr#rest)

```
<span>import</span><span> </span><span>{</span><span> </span><span>GoogleGenAI</span><span> </span><span>}</span><span> </span><span>from</span><span> </span><span>"@google/genai"</span><span>;</span>

<span>// The client gets the API key from the environment variable `GEMINI_API_KEY`.</span>
<span>const</span><span> </span><span>ai</span><span> </span><span>=</span><span> </span><span>new</span><span> </span><span>GoogleGenAI</span><span>({});</span>

<span>async</span><span> </span><span>function</span><span> </span><span>main</span><span>()</span><span> </span><span>{</span>
<span>  </span><span>const</span><span> </span><span>response</span><span> </span><span>=</span><span> </span><span>await</span><span> </span><span>ai</span><span>.</span><span>models</span><span>.</span><span>generateContent</span><span>({</span>
<span>    </span><span>model</span><span>:</span><span> </span><span>"gemini-2.5-flash"</span><span>,</span>
<span>    </span><span>contents</span><span>:</span><span> </span><span>"Explain how AI works in a few words"</span><span>,</span>
<span>  </span><span>});</span>
<span>  </span><span>console</span><span>.</span><span>log</span><span>(</span><span>response</span><span>.</span><span>text</span><span>);</span>
<span>}</span>

<span>main</span><span>();</span>
```

## L'option "Réflexion" est activée par défaut dans de nombreux exemples de code.

De nombreux exemples de code sur ce site utilisent le modèle [Gemini 2.5 Flash](https://ai.google.dev/gemini-api/docs/models?hl=fr#gemini-2.5-flash), dont la fonctionnalité [Réflexion](https://ai.google.dev/gemini-api/docs/thinking?hl=fr) est activée par défaut pour améliorer la qualité des réponses. Sachez que cela peut augmenter le temps de réponse et l'utilisation de jetons. Si vous privilégiez la vitesse ou souhaitez minimiser les coûts, vous pouvez désactiver cette fonctionnalité en définissant le budget de réflexion sur zéro, comme indiqué dans les exemples ci-dessous. Pour en savoir plus, consultez le [guide de réflexion](https://ai.google.dev/gemini-api/docs/thinking?hl=fr#set-budget).

[Python](https://ai.google.dev/gemini-api/docs/quickstart?lang=python&hl=fr#python)[JavaScript](https://ai.google.dev/gemini-api/docs/quickstart?lang=python&hl=fr#javascript)[Go](https://ai.google.dev/gemini-api/docs/quickstart?lang=python&hl=fr#go)[REST](https://ai.google.dev/gemini-api/docs/quickstart?lang=python&hl=fr#rest)[Apps Script](https://ai.google.dev/gemini-api/docs/quickstart?lang=python&hl=fr#apps-script)

```
<span>import</span><span> </span><span>{</span><span> </span><span>GoogleGenAI</span><span> </span><span>}</span><span> </span><span>from</span><span> </span><span>"@google/genai"</span><span>;</span>

<span>const</span><span> </span><span>ai</span><span> </span><span>=</span><span> </span><span>new</span><span> </span><span>GoogleGenAI</span><span>({});</span>

<span>async</span><span> </span><span>function</span><span> </span><span>main</span><span>()</span><span> </span><span>{</span>
<span>  </span><span>const</span><span> </span><span>response</span><span> </span><span>=</span><span> </span><span>await</span><span> </span><span>ai</span><span>.</span><span>models</span><span>.</span><span>generateContent</span><span>({</span>
<span>    </span><span>model</span><span>:</span><span> </span><span>"gemini-2.5-flash"</span><span>,</span>
<span>    </span><span>contents</span><span>:</span><span> </span><span>"Explain how AI works in a few words"</span><span>,</span>
<span>    </span><span>config</span><span>:</span><span> </span><span>{</span>
<span>      </span><span>thinkingConfig</span><span>:</span><span> </span><span>{</span>
<span>        </span><span>thinkingBudget</span><span>:</span><span> </span><span>0</span><span>,</span><span> </span><span>// Disables thinking</span>
<span>      </span><span>},</span>
<span>    </span><span>}</span>
<span>  </span><span>});</span>
<span>  </span><span>console</span><span>.</span><span>log</span><span>(</span><span>response</span><span>.</span><span>text</span><span>);</span>
<span>}</span>

<span>await</span><span> </span><span>main</span><span>();</span>
```

## Étape suivante

Maintenant que vous avez effectué votre première requête API, vous pouvez consulter les guides suivants qui montrent Gemini en action :

-   [Raisonnement](https://ai.google.dev/gemini-api/docs/thinking?hl=fr)
-   [Génération de texte](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr)
-   [Vision](https://ai.google.dev/gemini-api/docs/vision?hl=fr)
-   [Contexte long](https://ai.google.dev/gemini-api/docs/long-context?hl=fr)
-   [Embeddings](https://ai.google.dev/gemini-api/docs/embeddings?hl=fr)