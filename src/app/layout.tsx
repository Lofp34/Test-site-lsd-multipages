import React from "react";
import type { Metadata } from "next";
import { Inter, Open_Sans, Nunito, Roboto_Slab } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import AnalyticsConsent from "@/components/AnalyticsConsent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Laurent Serre Développement - Expert Commercial & Formation",
  description: "Accompagnement commercial pour PME : structuration des équipes, formation à la vente, méthodes éprouvées. 20 ans d'expérience terrain + outils IA.",
  keywords: "formation commerciale, accompagnement vente, expert commercial, PME, structuration équipe commerciale, Laurent Serre",
  authors: [{ name: "Laurent Serre" }],
  creator: "Laurent Serre",
  openGraph: {
    title: "Laurent Serre Développement - Expert Commercial & Formation",
    description: "De l'effort commercial au levier stratégique. Accompagnement et formation pour équipes commerciales.",
    url: "https://laurentserre.com",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laurent Serre Développement - Expert Commercial & Formation",
    description: "De l'effort commercial au levier stratégique. Accompagnement et formation pour équipes commerciales.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <AnalyticsConsent />
        
        {/* Scripts JSON-LD pour le SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Laurent Serre Développement",
              "url": "https://laurentserre.com",
              "logo": "https://laurentserre.com/laurent.jpg",
              "description": "Accompagnement commercial pour PME : structuration des équipes, formation à la vente, méthodes éprouvées.",
              "foundingDate": "2020",
              "areaServed": "France",
              "serviceType": "Formation commerciale, accompagnement vente, structuration équipe commerciale",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "FR",
                "addressLocality": "France"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "French"
              }
            })
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Laurent Serre",
              "jobTitle": "Expert Commercial & Formateur",
              "worksFor": {
                "@type": "Organization",
                "name": "Laurent Serre Développement"
              },
              "url": "https://laurentserre.com",
              "image": "https://laurentserre.com/laurent.jpg",
              "description": "Expert en développement commercial avec 20 ans d'expérience terrain. Spécialisé dans la structuration des équipes commerciales et la formation à la vente.",
              "knowsAbout": [
                "Formation commerciale",
                "Accompagnement vente",
                "Structuration équipe commerciale",
                "Développement commercial",
                "Management commercial"
              ],
              "sameAs": [
                "https://www.linkedin.com/in/laurent-serre-developpement",
                "https://www.youtube.com/@laurentserre"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${openSans.variable} ${nunito.variable} ${robotoSlab.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
