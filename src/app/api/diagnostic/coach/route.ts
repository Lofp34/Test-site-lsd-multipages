// ============================================================
// API Route: Sales Coach Chat
// Agent conversationnel qui reçoit le contexte du questionnaire
// et engage le prospect avec des questions d'approfondissement.
// ============================================================

import { NextResponse } from 'next/server';

const COACH_PROMPT = `Tu es un Sales Coach expert en diagnostic commercial B2B. Tu accompagnes des dirigeants de PME dans l'analyse de leur organisation commerciale.

CONTEXTE : Tu as reçu les résultats complets du questionnaire d'auto-diagnostic commercial 360° d'un dirigeant. Tu connais ses réponses sur ses 5 axes (prospection, processus, équipe, performance, stratégie) ainsi que le score global et les signaux faibles détectés.

TON RÔLE :
- Tu es un coach, pas un commercial : tu poses des questions, tu ne vends pas
- Tu creuses pour comprendre le vrai problème derrière les symptômes
- Tu reformules pour valider ta compréhension
- Tu ne donnes pas de conseils prématurés sans avoir exploré le contexte
- Tu restes bienveillant, jamais accusateur

RÈGLES STRICTES :
- Ne mentionne JAMAIS que tu es une IA ou un agent conversationnel — tu es un Sales Coach
- Ne demande JAMAIS de coordonnées bancaires, mots de passe, ou infos personnelles
- Ne fais JAMAIS de promesses de résultats financiers
- Ne redirige pas vers "Laurent" ou un autre humain — tu es le coach
- Si la conversation dérive trop, recentre sur le diagnostic commercial
- Maximum 3-4 questions par échange avant de proposer une piste concrète
- Au bout de 5-6 échanges, propose naturellement de prendre rendez-vous avec Laurent pour un débriefing complet

TON STYLE :
- Direct mais pas agressif
- Question ouvertes ("Qu'est-ce qui vous fait dire ça ?", "Comment voyez-vous l'évolution ?")
- Pas de jargon inutile
- Utilise "vous" de politesse

CONTEXTE DU DIRIGEANT :
{context}

HISTORIQUE DE LA CONVERSATION :
{history}

MESSAGE DU DIRIGEANT :
{message}

Ne réponds que par ta réponse de coach (pas de méta-texte).`;

// ============================================================
// Route
// ============================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, context, name, email, history } = body;

    if (!message || !context) {
      return NextResponse.json(
        { error: 'Message et contexte requis' },
        { status: 400 }
      );
    }

    // Construire le prompt avec l'historique
    const historyStr = (history || [])
      .slice(-10) // garder les 10 derniers messages max
      .map((m: { role: string; content: string }) =>
        m.role === 'coach' ? `Coach : ${m.content}` : `Dirigeant : ${m.content}`
      )
      .join('\n');

    const prompt = COACH_PROMPT
      .replace('{context}', context)
      .replace('{history}', historyStr)
      .replace('{message}', message);

    // Appel LLM
    const response = await callCoachLLM(prompt);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Coach chat error:', error);
    return NextResponse.json(
      { response: 'Je n\'ai pas pu traiter votre message. Pouvez-vous reformuler ?' },
      { status: 200 } // 200 pour ne pas casser l'UX du chat
    );
  }
}

async function callCoachLLM(prompt: string): Promise<string> {
  const deepseekKey = process.env.DEEPSEEK_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  const messages = [
    { role: 'user', content: prompt },
  ];

  // Priorité DeepSeek
  if (deepseekKey && deepseekKey.length > 5) {
    try {
      return await callDeepSeek(messages, deepseekKey);
    } catch {
      console.warn('DeepSeek fallback');
    }
  }

  // Fallback OpenAI
  if (openaiKey && openaiKey.length > 5) {
    try {
      return await callOpenAI(messages, openaiKey);
    } catch {
      console.warn('OpenAI fallback');
    }
  }

  return 'Je suis temporairement indisponible. Reprenez le diagnostic quand vous voulez.';
}

async function callDeepSeek(messages: { role: string; content: string }[], apiKey: string): Promise<string> {
  const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages,
      temperature: 0.4,
      max_tokens: 800,
    }),
  });

  if (!res.ok) throw new Error(`DeepSeek error ${res.status}`);
  const data = await res.json();
  return data.choices[0]?.message?.content || '...';
}

async function callOpenAI(messages: { role: string; content: string }[], apiKey: string): Promise<string> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.4,
      max_tokens: 800,
    }),
  });

  if (!res.ok) throw new Error(`OpenAI error ${res.status}`);
  const data = await res.json();
  return data.choices[0]?.message?.content || '...';
}

export const runtime = 'nodejs';
