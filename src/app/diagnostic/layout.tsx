import type React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Diagnostic Commercial Gratuit | Laurent Serre Développement',
  alternates: {
    canonical: 'https://www.laurentserre.com/diagnostic',
  },
  openGraph: {
    url: 'https://www.laurentserre.com/diagnostic',
  },
}

export default function CanonicalLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
