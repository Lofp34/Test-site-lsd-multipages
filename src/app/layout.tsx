import React from "react";
import type { Metadata } from "next";
import { Inter, Open_Sans, Nunito, Roboto_Slab } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Laurent Serre Développement - Expert Commercial & Formation",
    description: "De l'effort commercial au levier stratégique. Accompagnement et formation pour équipes commerciales.",
    url: "https://laurentserre.com",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "https://laurentserre.com/laurent.jpg",
        width: 1200,
        height: 630,
        alt: "Laurent Serre - Expert en développement commercial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laurent Serre Développement - Expert Commercial & Formation",
    description: "De l'effort commercial au levier stratégique. Accompagnement et formation pour équipes commerciales.",
    images: ["https://laurentserre.com/laurent.jpg"],
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
              "@type": "ProfessionalService",
              "name": "Laurent Serre Développement",
              "url": "https://laurentserre.com",
              "logo": "https://laurentserre.com/laurent.jpg",
              "image": "https://laurentserre.com/laurent.jpg",
              "description": "Expert en développement commercial et formation pour PME. Accompagnement terrain, structuration des équipes commerciales, méthodes éprouvées avec 20 ans d'expérience.",
              "foundingDate": "2020",
              "areaServed": {
                "@type": "Place",
                "name": "France",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "FR",
                  "addressRegion": "Occitanie",
                  "addressLocality": "Mauguio",
                  "postalCode": "34130",
                  "streetAddress": "259, rue de la lavande"
                }
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "FR",
                "addressRegion": "Occitanie", 
                "addressLocality": "Mauguio (Montpellier)",
                "postalCode": "34130",
                "streetAddress": "259, rue de la lavande"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "telephone": "+33614944060",
                "email": "ls@laurentserre.com",
                "availableLanguage": "French",
                "areaServed": "FR"
              },
              "serviceType": [
                "Formation commerciale",
                "Accompagnement commercial",
                "Structuration équipe commerciale",
                "Bootcamp commercial",
                "Diagnostic commercial",
                "Conseil en développement commercial"
              ],
              "priceRange": "$$",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "ratingCount": "47"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "43.6047",
                "longitude": "4.0083"
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
                "name": "Laurent Serre Développement",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "259, rue de la lavande",
                  "addressLocality": "Mauguio (Montpellier)",
                  "postalCode": "34130",
                  "addressCountry": "FR"
                }
              },
              "url": "https://laurentserre.com",
              "image": "https://laurentserre.com/laurent.jpg",
              "description": "Expert en développement commercial avec 20 ans d'expérience terrain. Spécialisé dans la structuration des équipes commerciales, la formation à la vente et l'accompagnement des PME.",
              "knowsAbout": [
                "Formation commerciale",
                "Accompagnement vente",
                "Structuration équipe commerciale",
                "Développement commercial",
                "Management commercial",
                "Bootcamp commercial",
                "Diagnostic commercial",
                "Prospection B2B",
                "Intelligence artificielle commerciale"
              ],
              "hasCredential": [
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "20 ans d'expérience terrain",
                  "description": "Expérience opérationnelle en développement commercial"
                }
              ],
              "sameAs": [
                "https://www.linkedin.com/in/laurent-serre-developpement",
                "https://www.youtube.com/@laurentserre"
              ],
              "alumniOf": {
                "@type": "Organization",
                "name": "Formation continue en développement commercial"
              }
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${openSans.variable} ${nunito.variable} ${robotoSlab.variable} antialiased`}
      >
        <GoogleAnalytics />
        <Header />
        {children}
        <Footer />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
