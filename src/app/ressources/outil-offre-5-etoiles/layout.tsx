import type React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Outil Offre 5 Étoiles | Laurent Serre Développement',
  alternates: {
    canonical: 'https://www.laurentserre.com/ressources/outil-offre-5-etoiles',
  },
  openGraph: {
    url: 'https://www.laurentserre.com/ressources/outil-offre-5-etoiles',
  },
}

export default function CanonicalLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
