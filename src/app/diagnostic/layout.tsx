import type React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Diagnostic Commercial 360° | Évaluez votre Performance Commerciale | Laurent Serre',
  description: '20 questions, 5 minutes, 1 score. Évaluez gratuitement votre organisation commerciale en ligne : prospection, processus CRM, équipe, performance et stratégie. Obtenez votre rapport personnalisé.',
  alternates: {
    canonical: 'https://www.laurentserre.com/diagnostic',
  },
  openGraph: {
    url: 'https://www.laurentserre.com/diagnostic',
    title: 'Diagnostic Commercial 360° — Outil Interactif & Gratuit',
    description: '20 questions pour évaluer votre organisation commerciale. Score, badges, plan d\'action personnalisé.',
  },
}

export default function CanonicalLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
