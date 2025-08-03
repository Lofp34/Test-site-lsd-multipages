import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Configuration de l'API Gemini selon la documentation officielle
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function POST(request: NextRequest) {
  try {
    // Vérifier la clé API
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Service temporairement indisponible' },
        { status: 503 }
      );
    }

    // Parser le body
    const body = await request.json();
    const { message, systemInstruction, config } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message requis' },
        { status: 400 }
      );
    }

    // Utiliser le SDK officiel GoogleGenAI
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction: systemInstruction,
        temperature: config?.temperature || 0.7,
        maxOutputTokens: config?.maxTokens || 2048,
        thinkingConfig: {
          thinkingBudget: 0, // Désactiver la réflexion pour la performance
        },
      }
    });

    return NextResponse.json({
      text: response.text,
      metadata: {
        model: 'gemini-2.5-flash',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}