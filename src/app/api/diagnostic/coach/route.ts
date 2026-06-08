// ============================================================
// API Route: Sales Coach Chat
// Connecte le chat du diagnostic au VRAI agent Sales Coach
// (agent:sales-coach) via le CLI openclaw.
// Fallback : prompt LLM avec la personnalité exacte du coach.
// ============================================================

import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

// Personnalité du Sales Coach (fallback si agent indisponible)
const COACH_PROMPT = `Tu es un Sales Coach expert en diagnostic commercial B2B. Tu accompagnes des dirigeants de PME.

PERSONNALITÉ (tirée de ton SOUL.md) :
- **coach terrain** : tu parles de comportements observables et entraînables
- **analyste comportemental** : tu détectes les moments où la conversation monte, casse, stagne ou se déséquilibre
- **directeur commercial structuré** : tu relies l'échange à son objectif réel et au contexte de vente
- **système d'entraînement progressif** : tu choisis une priorité de progression, pas quinze conseils

TON STYLE :
- Direct mais pas agressif
- Questions ouvertes : "Qu'est-ce qui vous fait dire ça ?", "Comment voyez-vous l'évolution ?"
- Pas de jargon inutile
- Utilise "vous"
- Tu ne donnes pas de conseils prématurés sans avoir exploré le contexte
- Tu critiques un comportement observable, pas une personne
- Concret, sourcé, immédiatement entraînable
- Tu refuses la logique de surveillance — le prospect doit sentir qu'il reçoit un coaching privé

RÈGLES STRICTES :
- Ne mentionne JAMAIS que tu es une IA — tu es un Sales Coach
- Pas de promesses de résultats financiers
- Ne redirige pas vers Laurent — tu es le coach
- Au bout de 5-6 échanges, propose naturellement de prendre rendez-vous avec Laurent

CONTEXTE DU DIRIGEANT (réponses au questionnaire) :
{context}

HISTORIQUE :
{history}

MESSAGE DU DIRIGEANT :
{message}

Réponds uniquement par ta réponse de coach.`;

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

    // Construire le message pour l'agent
    // Premier message → contexte complet
    // Messages suivants → historique + nouveau message
    const isFirstMessage = !history || history.length <= 1; // 2 messages initiaux du coach
    const sessionKey = `diagnostic-${email || 'unknown'}`;

    const agentMessage = isFirstMessage
      ? `Tu reçois un dirigeant de PME qui vient de remplir son questionnaire diagnostic commercial.

CONTEXTE COMPLET DE SES RÉPONSES (20 questions, 5 axes) :
${context}

Prénom du dirigeant : ${name || 'Dirigeant'}
Email : ${email || 'non renseigné'}

ACCUEILLE-LE comme un coach terrain. Tu as déjà analysé discrètement ses réponses. Pose-lui des questions ouvertes pour creuser, ne donne pas de diagnostic brut. Sois direct mais bienveillant. Maximum 3-4 questions dans ton premier message.`
      : `${history.slice(-8).map((m: { role: string; content: string }) =>
          m.role === 'coach' ? `[Coach] ${m.content}` : `[Dirigeant] ${m.content}`
        ).join('\n')}

[Dirigeant] ${message}

Réponds en tant que Sales Coach, de façon concise et coach terrain.`;

    // ========================================
    // PRIORITÉ 1 : Appel du vrai agent Sales Coach via CLI
    // ========================================
    try {
      const response = await callSalesCoachAgent(agentMessage, sessionKey);
      if (response) {
        return NextResponse.json({ response });
      }
    } catch {
      console.warn('Sales Coach agent unavailable, using LLM fallback');
    }

    // ========================================
    // PRIORITÉ 2 : Fallback LLM avec la personnalité du Sales Coach
    // ========================================
    const historyStr = (history || [])
      .slice(-8)
      .map((m: { role: string; content: string }) =>
        m.role === 'coach' ? `Coach : ${m.content}` : `Dirigeant : ${m.content}`
      )
      .join('\n');

    const prompt = COACH_PROMPT
      .replace('{context}', context)
      .replace('{history}', historyStr)
      .replace('{message}', message);

    const fallbackResponse = await callLLMFallback(prompt);

    return NextResponse.json({ response: fallbackResponse });
  } catch (error) {
    console.error('Coach chat error:', error);
    return NextResponse.json(
      { response: 'Je n\'ai pas pu traiter votre message. Pouvez-vous reformuler ?' },
      { status: 200 }
    );
  }
}

// ============================================================
// Appel du vrai agent Sales Coach via CLI
// ============================================================

async function callSalesCoachAgent(message: string, sessionKey: string): Promise<string | null> {
  // Échappe le message pour le shell (JSON encoding)
  const escapedMessage = message
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\t/g, '\\t');

  const cmd = `openclaw agent --agent sales-coach --session-key "agent:sales-coach:${sessionKey}" --message "${escapedMessage}" --json --timeout 30 2>/dev/null`;

  const output = execSync(cmd, {
    encoding: 'utf-8',
    timeout: 35000,
    maxBuffer: 50 * 1024,
  });

  // Parser la sortie JSON
  const lines = output.trim().split('\n');
  const jsonLine = lines.find(l => l.startsWith('{'));

  if (!jsonLine) return null;

  const data = JSON.parse(jsonLine);
  if (data.status !== 'ok') return null;

  const payloads = data.result?.payloads;
  if (!payloads || payloads.length === 0) return null;

  return payloads[0]?.text || null;
}

// ============================================================
// Fallback LLM
// ============================================================

async function callLLMFallback(prompt: string): Promise<string> {
  const deepseekKey = process.env.DEEPSEEK_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  const messages = [{ role: 'user', content: prompt }];

  if (deepseekKey && deepseekKey.length > 5) {
    try {
      return await callDeepSeek(messages, deepseekKey);
    } catch { /* fall through */ }
  }

  if (openaiKey && openaiKey.length > 5) {
    try {
      return await callOpenAI(messages, openaiKey);
    } catch { /* fall through */ }
  }

  return 'Je suis temporairement indisponible. Reprenez le diagnostic quand vous voulez.';
}

async function callDeepSeek(messages: { role: string; content: string }[], apiKey: string): Promise<string> {
  const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({ model: 'deepseek-chat', messages, temperature: 0.4, max_tokens: 800 }),
  });
  if (!res.ok) throw new Error(`DeepSeek error ${res.status}`);
  const data = await res.json();
  return data.choices[0]?.message?.content || '...';
}

async function callOpenAI(messages: { role: string; content: string }[], apiKey: string): Promise<string> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({ model: 'gpt-4o-mini', messages, temperature: 0.4, max_tokens: 800 }),
  });
  if (!res.ok) throw new Error(`OpenAI error ${res.status}`);
  const data = await res.json();
  return data.choices[0]?.message?.content || '...';
}

export const runtime = 'nodejs';
