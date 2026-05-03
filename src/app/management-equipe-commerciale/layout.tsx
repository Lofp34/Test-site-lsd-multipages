import type React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Management Équipe Commerciale PME — Recruter, Piloter, Coacher | Laurent Serre',
  description: 'Développez les compétences de vos managers commerciaux. Recrutement, motivation, pilotage performance, coaching terrain et structuration d\'équipe pour PME ambitieuses.',
  keywords: 'management équipe commerciale, pilotage commercial, recrutement commercial, coaching manager commercial, structuration équipe vente PME',
  alternates: {
    canonical: 'https://www.laurentserre.com/management-equipe-commerciale',
  },
  openGraph: {
    title: 'Management Équipe Commerciale PME — Recruter, Piloter, Coacher | Laurent Serre',
    description: 'Développez les compétences de vos managers commerciaux. Recrutement, motivation, pilotage performance, coaching terrain et structuration d\'équipe.',
    url: 'https://www.laurentserre.com/management-equipe-commerciale',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function CanonicalLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
