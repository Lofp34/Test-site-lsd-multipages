// ============================================================
// API Route: Diagnostic LLM Analysis
// Appelle DeepSeek V4 Flash (fallback OpenAI) pour générer
// une analyse personnalisée des réponses du questionnaire.
// ============================================================

import { NextResponse } from 'next/server';

// --- Types ---

interface AnswerInput {
  questionId: number;
  questionText: string;
  category: string;
  answerText: string;
  points: number;
  maxPoints: number;
}

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
}

interface AnalysisRequest {
  answers: AnswerInput[];
  user: UserInfo;
  totalScore: number;
  maxScore: number;
  percentage: number;
}

interface CategoryAnalysis {
  categoryId: string;
  categoryLabel: string;
  score: number;
  maxScore: number;
  percentage: number;
  level: string;
  comment: string;
}

interface DiagnosticAnalysis {
  type: 'analysis';
  persona: {
    name: string;
    emoji: string;
    title: string;
    description: string;
  };
  synthesis: string;
  categories: CategoryAnalysis[];
  signauxFaibles: string[];
  risques: string[];
  hypotheses: string[];
  questionsApprofondissement: string[];
  recommandations: string[];
  prochaineEtape: string;
}

// --- Prompt système ---

const SYSTEM_PROMPT = `Tu es un consultant expert en diagnostic commercial B2B, spécialisé dans l'évaluation des organisations commerciales des PME. Ton ton est sobre, consultatif, direct — jamais "outil magique" ou promesses irréalistes.

Tu reçois les 20 réponses d'un dirigeant à un questionnaire d'auto-diagnostic commercial structuré en 5 axes :
1. **Prospection & ciblage** (Q1-Q4) — Qualité et volume des leads
2. **Processus & CRM** (Q5-Q8) — Process de vente, CRM, revue de pipeline
3. **Équipe & management** (Q9-Q12) — Compétences, coaching, onboarding
4. **Performance & pilotage** (Q13-Q16) — KPIs, CAC, indicateurs
5. **Stratégie & croissance** (Q17-Q20) — Plan, alignement, analyse des pertes

RÈGLES STRICTES :
- Ne jamais dire "vous êtes dans la moyenne" ou donner des stats qui n'existent pas
- Ne jamais prédire le chiffre d'affaires ou des résultats financiers précis
- Proposer 2-3 hypothèses de diagnostic (pas des certitudes)
- Les recommandations doivent être actionnables, pas génériques
- La "prochaine étape" doit inviter subtilement à un échange, sans forcer

TON :
- Direct mais bienveillant
- Consultant, pas commercial
- Pas de jargon inutile
- Pas de phrase "si vous voulez aller plus loin, contactez-nous" explicite — préférer une formulation subtile comme "éclaircir ces hypothèses lors d'un échange"

FORMAT DE RÉPONSE (impératif) :
Réponds UNIQUEMENT avec un objet JSON valide et plat — pas de balises markdown, pas d'explications avant/après, pas de noeud "diagnostic" ou "analyse" enveloppant.

Structure exacte attendue :
{
  "persona": {
    "name": "Nom du profil",
    "emoji": "🎯",
    "title": "Court titre",
    "description": "Description une phrase"
  },
  "synthesis": "Synthèse en 2-3 phrases de la situation",
  "categories": [
    {
      "categoryId": "prospection|processus|equipe|performance|strategie",
      "categoryLabel": "Prospection",
      "score": 0,
      "maxScore": 16,
      "percentage": 50,
      "level": "critique|prioritaire|amelioration|consolidation|excellent",
      "comment": "Analyse spécifique de cet axe"
    }
  ],
  "signauxFaibles": ["Signal 1", "Signal 2"],
  "risques": ["Risque 1", "Risque 2"],
  "hypotheses": ["Hypothèse 1", "Hypothèse 2"],
  "questionsApprofondissement": ["Question 1", "Question 2"],
  "recommandations": ["Action 1", "Action 2"],
  "prochaineEtape": "Phrase d'invitation subtile à échanger"
}`;

// --- Helpers pour le prompt utilisateur ---

function buildUserPrompt(answers: AnswerInput[], totalScore: number, maxScore: number, percentage: number): string {
  const rows = answers.map(a =>
    `Q${a.questionId} [${a.category}] : ${a.questionText}\n→ Réponse : "${a.answerText}" (${a.points}/${a.maxPoints} pts)`
  ).join('\n\n');

  return `QUESTIONNAIRE COMMERCIAL 360°

Score global : ${totalScore}/${maxScore} (${percentage}%)

RÉPONSES DU DIRIGEANT :
${rows}

Analyse ce dirigeant de PME/TPE comme si tu étais son consultant. Détecte les vrais signaux, pas les évidences. Sois précis et actionnable.`;
}

// --- Route handlers ---

export async function POST(request: Request) {
  try {
    const body: AnalysisRequest = await request.json();

    // Validation minimale
    if (!body.answers || body.answers.length < 20) {
      return NextResponse.json(
        { error: '20 réponses requises' },
        { status: 400 }
      );
    }

    // Construire les messages
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: buildUserPrompt(
          body.answers,
          body.totalScore,
          body.maxScore,
          body.percentage
        ),
      },
    ];

    // Appel DeepSeek V4 Flash (ou OpenAI fallback)
    const analysis = await callLLM(messages);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Diagnostic analysis error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'analyse. Merci de réessayer.' },
      { status: 500 }
    );
  }
}

// --- LLM call ---

async function callLLM(messages: { role: string; content: string }[]): Promise<DiagnosticAnalysis> {
  const deepseekKey = process.env.DEEPSEEK_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const geminiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  // Priorité 1 : DeepSeek V4 Flash (recommandé par Laurent)
  if (deepseekKey && deepseekKey.length > 5) {
    try {
      return await callDeepSeek(messages, deepseekKey);
    } catch (err) {
      console.warn('DeepSeek call failed, trying fallback:', err);
    }
  }

  // Priorité 2 : OpenAI
  if (openaiKey && openaiKey.length > 5) {
    try {
      return await callOpenAI(messages, openaiKey);
    } catch (err) {
      console.warn('OpenAI call failed, trying fallback:', err);
    }
  }

  // Priorité 3 : Gemini
  if (geminiKey && geminiKey.length > 5) {
    return await callGemini(messages, geminiKey);
  }

  // Aucune API disponible → fallback structuré
  return buildFallbackAnalysis();
}

async function callDeepSeek(messages: { role: string; content: string }[], apiKey: string): Promise<DiagnosticAnalysis> {
  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat', // deepseek-chat = V4 Flash sans reasoning
      messages,
      temperature: 0.3,
      max_tokens: 3000,
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`DeepSeek API error ${response.status}: ${errBody}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content || '';
  return parseAnalysis(content);
}

async function callOpenAI(messages: { role: string; content: string }[], apiKey: string): Promise<DiagnosticAnalysis> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.3,
      max_tokens: 3000,
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${errBody}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content || '';
  return parseAnalysis(content);
}

async function callGemini(messages: { role: string; content: string }[], apiKey: string): Promise<DiagnosticAnalysis> {
  // Gemini format : messages → contents
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${errBody}`);
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return parseAnalysis(content);
}

// --- Parsing de la réponse LLM ---

function parseAnalysis(content: string): DiagnosticAnalysis {
  // Tenter d'extraire le JSON
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  const jsonStr = jsonMatch ? jsonMatch[0] : content;

  try {
    let parsed = JSON.parse(jsonStr);

    // Normaliser les structures imbriquées courantes
    if (parsed.diagnostic && !parsed.synthesis) {
      parsed = { ...parsed, ...parsed.diagnostic };
      delete parsed.diagnostic;
    }
    if (parsed.analyse && !parsed.synthesis) {
      parsed = { ...parsed, ...parsed.analyse };
      delete parsed.analyse;
    }
    if (parsed.report && !parsed.synthesis) {
      parsed = { ...parsed, ...parsed.report };
      delete parsed.report;
    }

    // Valider la structure
    if (parsed.synthesis || parsed.persona) {
      return {
        type: 'analysis',
        persona: {
          name: parsed.persona?.name || 'Analyse personnalisée',
          emoji: parsed.persona?.emoji || '📋',
          title: parsed.persona?.title || '',
          description: parsed.persona?.description || '',
        },
        synthesis: parsed.synthesis || '',
        categories: parsed.categories || [],
        signauxFaibles: parsed.signauxFaibles || parsed.signaux_faibles || parsed.weakSignals || [],
        risques: parsed.risques || parsed.risks || [],
        hypotheses: parsed.hypotheses || parsed.hypothesis || parsed.hypothesesDiagnostic || [],
        questionsApprofondissement: parsed.questionsApprofondissement || parsed.deepDive || parsed.questions || [],
        recommandations: parsed.recommandations || parsed.recommendations || parsed.actions || [],
        prochaineEtape: parsed.prochaineEtape || parsed.nextStep || parsed.prochaine_etape || 'Échangeons pour approfondir ces pistes.',
      };
    }
    throw new Error('Invalid analysis structure');
  } catch {
    // Fallback : construire une analyse à partir du texte brut
    return buildTextFallbackAnalysis(content);
  }
}

function buildTextFallbackAnalysis(rawText: string): DiagnosticAnalysis {
  return {
    type: 'analysis',
    persona: {
      name: 'Analyse personnalisée',
      emoji: '📋',
      title: 'Rapport d\'analyse',
      description: 'Votre analyse est en cours de génération.',
    },
    synthesis: rawText.slice(0, 1000),
    categories: [],
    signauxFaibles: [],
    risques: [],
    hypotheses: ['Analyse en cours d\'affinage'],
    questionsApprofondissement: ['Pour mieux comprendre votre contexte :'],
    recommandations: ['Recontactez-nous pour un débriefing personnalisé'],
    prochaineEtape: 'Un échange de 30 minutes permettrait d\'approfondir ces pistes.',
  };
}

// --- Fallback si aucune API n'est disponible ---

function buildFallbackAnalysis(): DiagnosticAnalysis {
  return {
    type: 'analysis',
    persona: {
      name: 'Analyse en attente',
      emoji: '⏳',
      title: 'Rapport non généré',
      description: 'L\'analyse IA n\'a pas pu être générée automatiquement.',
    },
    synthesis: 'Notre système d\'analyse n\'est pas disponible pour le moment. Vous recevrez votre rapport personnalisé par email sous 24h.',
    categories: [],
    signauxFaibles: ['Service temporairement indisponible'],
    risques: [],
    hypotheses: ['L\'analyse complète sera réalisée manuellement'],
    questionsApprofondissement: ['Notre équipe vous recontactera pour affiner le diagnostic'],
    recommandations: [
      'Un consultant vous contactera sous 24h pour faire le point',
      'Vous pouvez également prendre rendez-vous directement',
    ],
    prochaineEtape: 'Prenez rendez-vous pour un échange de 30 minutes avec Laurent.',
  };
}

// --- Node.js runtime (LLM calls peuvent prendre du temps) ---
export const runtime = 'nodejs';
