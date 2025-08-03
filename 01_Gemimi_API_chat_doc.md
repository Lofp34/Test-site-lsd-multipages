L'API Gemini peut générer une sortie textuelle à partir de diverses entrées, y compris du texte, des images, des vidéos et de l'audio, en exploitant les modèles Gemini.

Voici un exemple de base qui utilise une seule entrée textuelle:

[Python](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#python)[JavaScript](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#javascript)[Go](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#go)[REST](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#rest)[Apps Script](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#apps-script)

```
<span>import</span><span> </span><span>{</span><span> </span><span>GoogleGenAI</span><span> </span><span>}</span><span> </span><span>from</span><span> </span><span>"@google/genai"</span><span>;</span>

<span>const</span><span> </span><span>ai</span><span> </span><span>=</span><span> </span><span>new</span><span> </span><span>GoogleGenAI</span><span>({});</span>

<span>async</span><span> </span><span>function</span><span> </span><span>main</span><span>()</span><span> </span><span>{</span>
<span>  </span><span>const</span><span> </span><span>response</span><span> </span><span>=</span><span> </span><span>await</span><span> </span><span>ai</span><span>.</span><span>models</span><span>.</span><span>generateContent</span><span>({</span>
<span>    </span><span>model</span><span>:</span><span> </span><span>"gemini-2.5-flash"</span><span>,</span>
<span>    </span><span>contents</span><span>:</span><span> </span><span>"How does AI work?"</span><span>,</span>
<span>  </span><span>});</span>
<span>  </span><span>console</span><span>.</span><span>log</span><span>(</span><span>response</span><span>.</span><span>text</span><span>);</span>
<span>}</span>

<span>await</span><span> </span><span>main</span><span>();</span>
```

## Penser avec Gemini 2.5

La [réflexion](https://ai.google.dev/gemini-api/docs/thinking?hl=fr) est activée par défaut pour les modèles 2.5 Flash et Pro afin d'améliorer la qualité. Cela peut prendre plus de temps à s'exécuter et augmenter l'utilisation des jetons.

Lorsque vous utilisez Flash 2.5, vous pouvez désactiver la réflexion en définissant le budget de réflexion sur zéro.

Pour en savoir plus, consultez le [guide de réflexion](https://ai.google.dev/gemini-api/docs/thinking?hl=fr#set-budget).

[Python](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#python)[JavaScript](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#javascript)[Go](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#go)[REST](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#rest)[Apps Script](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#apps-script)

```
<span>import</span><span> </span><span>{</span><span> </span><span>GoogleGenAI</span><span> </span><span>}</span><span> </span><span>from</span><span> </span><span>"@google/genai"</span><span>;</span>

<span>const</span><span> </span><span>ai</span><span> </span><span>=</span><span> </span><span>new</span><span> </span><span>GoogleGenAI</span><span>({});</span>

<span>async</span><span> </span><span>function</span><span> </span><span>main</span><span>()</span><span> </span><span>{</span>
<span>  </span><span>const</span><span> </span><span>response</span><span> </span><span>=</span><span> </span><span>await</span><span> </span><span>ai</span><span>.</span><span>models</span><span>.</span><span>generateContent</span><span>({</span>
<span>    </span><span>model</span><span>:</span><span> </span><span>"gemini-2.5-flash"</span><span>,</span>
<span>    </span><span>contents</span><span>:</span><span> </span><span>"How does AI work?"</span><span>,</span>
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

## Instructions système et autres configurations

Vous pouvez guider le comportement des modèles Gemini à l'aide d'instructions système. Pour ce faire, transmettez un objet [`GenerateContentConfig`](https://ai.google.dev/api/generate-content?hl=fr#v1beta.GenerationConfig).

[Python](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#python)[JavaScript](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#javascript)[Go](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#go)[REST](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#rest)[Apps Script](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#apps-script)

```
<span>import</span><span> </span><span>{</span><span> </span><span>GoogleGenAI</span><span> </span><span>}</span><span> </span><span>from</span><span> </span><span>"@google/genai"</span><span>;</span>

<span>const</span><span> </span><span>ai</span><span> </span><span>=</span><span> </span><span>new</span><span> </span><span>GoogleGenAI</span><span>({});</span>

<span>async</span><span> </span><span>function</span><span> </span><span>main</span><span>()</span><span> </span><span>{</span>
<span>  </span><span>const</span><span> </span><span>response</span><span> </span><span>=</span><span> </span><span>await</span><span> </span><span>ai</span><span>.</span><span>models</span><span>.</span><span>generateContent</span><span>({</span>
<span>    </span><span>model</span><span>:</span><span> </span><span>"gemini-2.5-flash"</span><span>,</span>
<span>    </span><span>contents</span><span>:</span><span> </span><span>"Hello there"</span><span>,</span>
<span>    </span><span>config</span><span>:</span><span> </span><span>{</span>
<span>      </span><span>systemInstruction</span><span>:</span><span> </span><span>"You are a cat. Your name is Neko."</span><span>,</span>
<span>    </span><span>},</span>
<span>  </span><span>});</span>
<span>  </span><span>console</span><span>.</span><span>log</span><span>(</span><span>response</span><span>.</span><span>text</span><span>);</span>
<span>}</span>

<span>await</span><span> </span><span>main</span><span>();</span>
```

L'objet [`GenerateContentConfig`](https://ai.google.dev/api/generate-content?hl=fr#v1beta.GenerationConfig) vous permet également de remplacer les paramètres de génération par défaut, tels que la [température](https://ai.google.dev/api/generate-content?hl=fr#v1beta.GenerationConfig).

[Python](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#python)[JavaScript](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#javascript)[Go](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#go)[REST](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#rest)[Apps Script](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#apps-script)

```
<span>import</span><span> </span><span>{</span><span> </span><span>GoogleGenAI</span><span> </span><span>}</span><span> </span><span>from</span><span> </span><span>"@google/genai"</span><span>;</span>

<span>const</span><span> </span><span>ai</span><span> </span><span>=</span><span> </span><span>new</span><span> </span><span>GoogleGenAI</span><span>({});</span>

<span>async</span><span> </span><span>function</span><span> </span><span>main</span><span>()</span><span> </span><span>{</span>
<span>  </span><span>const</span><span> </span><span>response</span><span> </span><span>=</span><span> </span><span>await</span><span> </span><span>ai</span><span>.</span><span>models</span><span>.</span><span>generateContent</span><span>({</span>
<span>    </span><span>model</span><span>:</span><span> </span><span>"gemini-2.5-flash"</span><span>,</span>
<span>    </span><span>contents</span><span>:</span><span> </span><span>"Explain how AI works"</span><span>,</span>
<span>    </span><span>config</span><span>:</span><span> </span><span>{</span>
<span>      </span><span>temperature</span><span>:</span><span> </span><span>0.1</span><span>,</span>
<span>    </span><span>},</span>
<span>  </span><span>});</span>
<span>  </span><span>console</span><span>.</span><span>log</span><span>(</span><span>response</span><span>.</span><span>text</span><span>);</span>
<span>}</span>

<span>await</span><span> </span><span>main</span><span>();</span>
```

Consultez [`GenerateContentConfig`](https://ai.google.dev/api/generate-content?hl=fr#v1beta.GenerationConfig) dans notre documentation de référence de l'API pour obtenir la liste complète des paramètres configurables et leurs descriptions.

## Entrées multimodales

L'API Gemini accepte les entrées multimodales, ce qui vous permet de combiner du texte à des fichiers multimédias. L'exemple suivant montre comment fournir une image:

[Python](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#python)[JavaScript](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#javascript)[Go](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#go)[REST](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#rest)[Apps Script](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#apps-script)

```
<span>import</span><span> </span><span>{</span>
<span>  </span><span>GoogleGenAI</span><span>,</span>
<span>  </span><span>createUserContent</span><span>,</span>
<span>  </span><span>createPartFromUri</span><span>,</span>
<span>}</span><span> </span><span>from</span><span> </span><span>"@google/genai"</span><span>;</span>

<span>const</span><span> </span><span>ai</span><span> </span><span>=</span><span> </span><span>new</span><span> </span><span>GoogleGenAI</span><span>({});</span>

<span>async</span><span> </span><span>function</span><span> </span><span>main</span><span>()</span><span> </span><span>{</span>
<span>  </span><span>const</span><span> </span><span>image</span><span> </span><span>=</span><span> </span><span>await</span><span> </span><span>ai</span><span>.</span><span>files</span><span>.</span><span>upload</span><span>({</span>
<span>    </span><span>file</span><span>:</span><span> </span><span>"/path/to/organ.png"</span><span>,</span>
<span>  </span><span>});</span>
<span>  </span><span>const</span><span> </span><span>response</span><span> </span><span>=</span><span> </span><span>await</span><span> </span><span>ai</span><span>.</span><span>models</span><span>.</span><span>generateContent</span><span>({</span>
<span>    </span><span>model</span><span>:</span><span> </span><span>"gemini-2.5-flash"</span><span>,</span>
<span>    </span><span>contents</span><span>:</span><span> </span><span>[</span>
<span>      </span><span>createUserContent</span><span>([</span>
<span>        </span><span>"Tell me about this instrument"</span><span>,</span>
<span>        </span><span>createPartFromUri</span><span>(</span><span>image</span><span>.</span><span>uri</span><span>,</span><span> </span><span>image</span><span>.</span><span>mimeType</span><span>),</span>
<span>      </span><span>]),</span>
<span>    </span><span>],</span>
<span>  </span><span>});</span>
<span>  </span><span>console</span><span>.</span><span>log</span><span>(</span><span>response</span><span>.</span><span>text</span><span>);</span>
<span>}</span>

<span>await</span><span> </span><span>main</span><span>();</span>
```

Pour découvrir d'autres méthodes de fourniture d'images et un traitement d'images plus avancé, consultez notre [guide de compréhension des images](https://ai.google.dev/gemini-api/docs/image-understanding?hl=fr). L'API est également compatible avec les entrées et la compréhension des [documents](https://ai.google.dev/gemini-api/docs/document-processing?hl=fr), des [vidéos](https://ai.google.dev/gemini-api/docs/video-understanding?hl=fr) et des [audios](https://ai.google.dev/gemini-api/docs/audio?hl=fr).

## Réponses en streaming

Par défaut, le modèle ne renvoie une réponse qu'une fois tout le processus de génération terminé.

Pour des interactions plus fluides, utilisez le streaming pour recevoir des instances [`GenerateContentResponse`](https://ai.google.dev/api/generate-content?hl=fr#v1beta.GenerateContentResponse) de manière incrémentielle à mesure qu'elles sont générées.

[Python](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#python)[JavaScript](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#javascript)[Go](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#go)[REST](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#rest)[Apps Script](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#apps-script)

```
<span>import</span><span> </span><span>{</span><span> </span><span>GoogleGenAI</span><span> </span><span>}</span><span> </span><span>from</span><span> </span><span>"@google/genai"</span><span>;</span>

<span>const</span><span> </span><span>ai</span><span> </span><span>=</span><span> </span><span>new</span><span> </span><span>GoogleGenAI</span><span>({});</span>

<span>async</span><span> </span><span>function</span><span> </span><span>main</span><span>()</span><span> </span><span>{</span>
<span>  </span><span>const</span><span> </span><span>response</span><span> </span><span>=</span><span> </span><span>await</span><span> </span><span>ai</span><span>.</span><span>models</span><span>.</span><span>generateContentStream</span><span>({</span>
<span>    </span><span>model</span><span>:</span><span> </span><span>"gemini-2.5-flash"</span><span>,</span>
<span>    </span><span>contents</span><span>:</span><span> </span><span>"Explain how AI works"</span><span>,</span>
<span>  </span><span>});</span>

<span>  </span><span>for</span><span> </span><span>await</span><span> </span><span>(</span><span>const</span><span> </span><span>chunk</span><span> </span><span>of</span><span> </span><span>response</span><span>)</span><span> </span><span>{</span>
<span>    </span><span>console</span><span>.</span><span>log</span><span>(</span><span>chunk</span><span>.</span><span>text</span><span>);</span>
<span>  </span><span>}</span>
<span>}</span>

<span>await</span><span> </span><span>main</span><span>();</span>
```

## Conversations multitours (chat)

Nos SDK offrent la possibilité de collecter plusieurs séries d'invites et de réponses dans une discussion, ce qui vous permet de suivre facilement l'historique des conversations.

[Python](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#python)[JavaScript](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#javascript)[Go](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#go)[REST](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#rest)[Apps Script](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#apps-script)

```
<span>import</span><span> </span><span>{</span><span> </span><span>GoogleGenAI</span><span> </span><span>}</span><span> </span><span>from</span><span> </span><span>"@google/genai"</span><span>;</span>

<span>const</span><span> </span><span>ai</span><span> </span><span>=</span><span> </span><span>new</span><span> </span><span>GoogleGenAI</span><span>({});</span>

<span>async</span><span> </span><span>function</span><span> </span><span>main</span><span>()</span><span> </span><span>{</span>
<span>  </span><span>const</span><span> </span><span>chat</span><span> </span><span>=</span><span> </span><span>ai</span><span>.</span><span>chats</span><span>.</span><span>create</span><span>({</span>
<span>    </span><span>model</span><span>:</span><span> </span><span>"gemini-2.5-flash"</span><span>,</span>
<span>    </span><span>history</span><span>:</span><span> </span><span>[</span>
<span>      </span><span>{</span>
<span>        </span><span>role</span><span>:</span><span> </span><span>"user"</span><span>,</span>
<span>        </span><span>parts</span><span>:</span><span> </span><span>[{</span><span> </span><span>text</span><span>:</span><span> </span><span>"Hello"</span><span> </span><span>}],</span>
<span>      </span><span>},</span>
<span>      </span><span>{</span>
<span>        </span><span>role</span><span>:</span><span> </span><span>"model"</span><span>,</span>
<span>        </span><span>parts</span><span>:</span><span> </span><span>[{</span><span> </span><span>text</span><span>:</span><span> </span><span>"Great to meet you. What would you like to know?"</span><span> </span><span>}],</span>
<span>      </span><span>},</span>
<span>    </span><span>],</span>
<span>  </span><span>});</span>

<span>  </span><span>const</span><span> </span><span>response1</span><span> </span><span>=</span><span> </span><span>await</span><span> </span><span>chat</span><span>.</span><span>sendMessage</span><span>({</span>
<span>    </span><span>message</span><span>:</span><span> </span><span>"I have 2 dogs in my house."</span><span>,</span>
<span>  </span><span>});</span>
<span>  </span><span>console</span><span>.</span><span>log</span><span>(</span><span>"Chat response 1:"</span><span>,</span><span> </span><span>response1</span><span>.</span><span>text</span><span>);</span>

<span>  </span><span>const</span><span> </span><span>response2</span><span> </span><span>=</span><span> </span><span>await</span><span> </span><span>chat</span><span>.</span><span>sendMessage</span><span>({</span>
<span>    </span><span>message</span><span>:</span><span> </span><span>"How many paws are in my house?"</span><span>,</span>
<span>  </span><span>});</span>
<span>  </span><span>console</span><span>.</span><span>log</span><span>(</span><span>"Chat response 2:"</span><span>,</span><span> </span><span>response2</span><span>.</span><span>text</span><span>);</span>
<span>}</span>

<span>await</span><span> </span><span>main</span><span>();</span>
```

Le streaming peut également être utilisé pour les conversations multitours.

[Python](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#python)[JavaScript](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#javascript)[Go](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#go)[REST](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#rest)[Apps Script](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#apps-script)

```
<span>import</span><span> </span><span>{</span><span> </span><span>GoogleGenAI</span><span> </span><span>}</span><span> </span><span>from</span><span> </span><span>"@google/genai"</span><span>;</span>

<span>const</span><span> </span><span>ai</span><span> </span><span>=</span><span> </span><span>new</span><span> </span><span>GoogleGenAI</span><span>({});</span>

<span>async</span><span> </span><span>function</span><span> </span><span>main</span><span>()</span><span> </span><span>{</span>
<span>  </span><span>const</span><span> </span><span>chat</span><span> </span><span>=</span><span> </span><span>ai</span><span>.</span><span>chats</span><span>.</span><span>create</span><span>({</span>
<span>    </span><span>model</span><span>:</span><span> </span><span>"gemini-2.5-flash"</span><span>,</span>
<span>    </span><span>history</span><span>:</span><span> </span><span>[</span>
<span>      </span><span>{</span>
<span>        </span><span>role</span><span>:</span><span> </span><span>"user"</span><span>,</span>
<span>        </span><span>parts</span><span>:</span><span> </span><span>[{</span><span> </span><span>text</span><span>:</span><span> </span><span>"Hello"</span><span> </span><span>}],</span>
<span>      </span><span>},</span>
<span>      </span><span>{</span>
<span>        </span><span>role</span><span>:</span><span> </span><span>"model"</span><span>,</span>
<span>        </span><span>parts</span><span>:</span><span> </span><span>[{</span><span> </span><span>text</span><span>:</span><span> </span><span>"Great to meet you. What would you like to know?"</span><span> </span><span>}],</span>
<span>      </span><span>},</span>
<span>    </span><span>],</span>
<span>  </span><span>});</span>

<span>  </span><span>const</span><span> </span><span>stream1</span><span> </span><span>=</span><span> </span><span>await</span><span> </span><span>chat</span><span>.</span><span>sendMessageStream</span><span>({</span>
<span>    </span><span>message</span><span>:</span><span> </span><span>"I have 2 dogs in my house."</span><span>,</span>
<span>  </span><span>});</span>
<span>  </span><span>for</span><span> </span><span>await</span><span> </span><span>(</span><span>const</span><span> </span><span>chunk</span><span> </span><span>of</span><span> </span><span>stream1</span><span>)</span><span> </span><span>{</span>
<span>    </span><span>console</span><span>.</span><span>log</span><span>(</span><span>chunk</span><span>.</span><span>text</span><span>);</span>
<span>    </span><span>console</span><span>.</span><span>log</span><span>(</span><span>"_"</span><span>.</span><span>repeat</span><span>(</span><span>80</span><span>));</span>
<span>  </span><span>}</span>

<span>  </span><span>const</span><span> </span><span>stream2</span><span> </span><span>=</span><span> </span><span>await</span><span> </span><span>chat</span><span>.</span><span>sendMessageStream</span><span>({</span>
<span>    </span><span>message</span><span>:</span><span> </span><span>"How many paws are in my house?"</span><span>,</span>
<span>  </span><span>});</span>
<span>  </span><span>for</span><span> </span><span>await</span><span> </span><span>(</span><span>const</span><span> </span><span>chunk</span><span> </span><span>of</span><span> </span><span>stream2</span><span>)</span><span> </span><span>{</span>
<span>    </span><span>console</span><span>.</span><span>log</span><span>(</span><span>chunk</span><span>.</span><span>text</span><span>);</span>
<span>    </span><span>console</span><span>.</span><span>log</span><span>(</span><span>"_"</span><span>.</span><span>repeat</span><span>(</span><span>80</span><span>));</span>
<span>  </span><span>}</span>
<span>}</span>

<span>await</span><span> </span><span>main</span><span>();</span>
```

## Modèles compatibles

Tous les modèles de la famille Gemini sont compatibles avec la génération de texte. Pour en savoir plus sur les modèles et leurs fonctionnalités, consultez la page [Modèles](https://ai.google.dev/gemini-api/docs/models?hl=fr).

## Bonnes pratiques

### Conseils concernant les requêtes

Pour la génération de texte de base, un [prompt sans entraînement](https://ai.google.dev/gemini-api/docs/prompting-strategies?hl=fr#few-shot) suffit souvent, sans avoir besoin d'exemples, d'instructions système ni de mise en forme spécifique.

Pour obtenir des résultats plus personnalisés:

-   Utilisez les [instructions système](https://ai.google.dev/gemini-api/docs/text-generation?hl=fr#system-instructions) pour guider le modèle.
-   Fournissez quelques exemples d'entrées et de sorties pour guider le modèle. On parle souvent de requêtes [few-shot](https://ai.google.dev/gemini-api/docs/prompting-strategies?hl=fr#few-shot).

Pour en savoir plus, consultez notre [guide d'ingénierie des requêtes](https://ai.google.dev/gemini/docs/prompting-strategies?hl=fr).

### Sortie structurée

Dans certains cas, vous devrez peut-être obtenir une sortie structurée, comme JSON. Pour en savoir plus, consultez notre guide sur les [sorties structurées](https://ai.google.dev/gemini-api/docs/structured-output?hl=fr).

## Étape suivante

-   Essayez le [tutoriel de démarrage de l'API Gemini dans Colab](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/quickstarts/Get_started.ipynb?hl=fr).
-   Découvrez les fonctionnalités de compréhension des [images](https://ai.google.dev/gemini-api/docs/image-understanding?hl=fr), des [vidéos](https://ai.google.dev/gemini-api/docs/video-understanding?hl=fr), des [audios](https://ai.google.dev/gemini-api/docs/audio?hl=fr) et des [documents](https://ai.google.dev/gemini-api/docs/document-processing?hl=fr) de Gemini.
-   Découvrez les [stratégies de requêtes de fichiers](https://ai.google.dev/gemini-api/docs/files?hl=fr#prompt-guide) multimodales.