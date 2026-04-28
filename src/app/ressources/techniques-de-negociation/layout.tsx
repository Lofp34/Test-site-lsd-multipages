import type React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Techniques de Négociation | Laurent Serre Développement',
  alternates: {
    canonical: 'https://www.laurentserre.com/ressources/techniques-de-negociation',
  },
  openGraph: {
    url: 'https://www.laurentserre.com/ressources/techniques-de-negociation',
  },
}

export default function CanonicalLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
