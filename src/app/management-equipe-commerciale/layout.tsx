import type React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Management Équipe Commerciale | Laurent Serre Développement',
  alternates: {
    canonical: 'https://www.laurentserre.com/management-equipe-commerciale',
  },
  openGraph: {
    url: 'https://www.laurentserre.com/management-equipe-commerciale',
  },
}

export default function CanonicalLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
