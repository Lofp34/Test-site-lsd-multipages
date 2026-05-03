import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Prospection B2B 2026 : méthode 4 blocs pour plus de RDV qualifiés | Laurent Serre',
  description: 'Une méthode terrain en 4 blocs pour générer plus de RDV qualifiés en prospection B2B : ciblage, message, séquence, pilotage.',
  keywords: 'prospection B2B, RDV qualifiés, pipeline commercial, séquence de prospection, méthode commerciale PME',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/prospection-b2b-2026-methode-4-blocs-rdv-qualifies',
  },
  openGraph: {
    title: 'Prospection B2B 2026 : méthode 4 blocs pour plus de RDV qualifiés',
    description: 'Ciblage, message, séquence, pilotage : la méthode simple pour structurer une prospection qui convertit.',
    url: 'https://www.laurentserre.com/blog/prospection-b2b-2026-methode-4-blocs-rdv-qualifies',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/equipe_bureau.jpg',
        width: 1200,
        height: 630,
        alt: 'Prospection B2B : méthode 4 blocs',
      },
    ],
  },
};

export default function ProspectionB2B4BlocsPage() {
  const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Prospection B2B 2026 : la méthode 4 blocs pour générer plus de RDV qualifiés",
  "description": "Une méthode terrain en 4 blocs pour générer plus de RDV qualifiés en prospection B2B : ciblage, message, séquence, pilotage.",
  "image": "https://www.laurentserre.com/equipe_bureau.jpg",
  "datePublished": "2026-03-22",
  "dateModified": "2026-03-22",
  "author": {
    "@type": "Person",
    "name": "Laurent Serre",
    "url": "https://www.laurentserre.com/a-propos",
    "sameAs": [
      "https://www.linkedin.com/in/laurentserre34/",
      "https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/"
    ]
  },
  "publisher": {
    "@type": "Organization",
    "name": "Laurent Serre Développement",
    "url": "https://www.laurentserre.com"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.laurentserre.com/blog/prospection-b2b-2026-methode-4-blocs-rdv-qualifies"
  },
  "keywords": [
    "prospection B2B",
    "RDV qualifiés",
    "pipeline commercial",
    "séquence de prospection",
    "méthode commerciale PME"
  ]
};

  return (
<main className="bg-primary-bg text-gray-dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-orange-soft/10 backdrop-blur-sm border border-orange-soft/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-orange-soft text-sm">Prospection</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Prospection B2B 2026 : la méthode 4 blocs pour générer plus de RDV qualifiés
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-03-22">22 mars 2026</time>
              <span>•</span>
              <span>10 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/equipe_bureau.jpg"
              alt="Prospection B2B : méthode 4 blocs"
              width={1200}
              height={630}
              className="w-full h-80 object-cover object-top rounded-2xl shadow-lg"
              quality={60}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Beaucoup d&apos;équipes commerciales confondent activité de prospection et création réelle d&apos;opportunités.
            Elles envoient des messages, passent des appels, mais le pipeline reste fragile. La solution n&apos;est pas
            “faire plus”. C&apos;est structurer mieux.
          </p>

          <p className="mb-8">
            Sur le terrain, je fais travailler les équipes avec une méthode simple en 4 blocs : <strong>Ciblage</strong>, <strong>Message</strong>, <strong>Séquence</strong>, <strong>Pilotage</strong>.
            Ce cadre permet d&apos;augmenter la qualité des RDV et de réduire le bruit commercial.
          </p>

          <h2 id="bloc-ciblage" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Bloc 1 — Ciblage : arrêter de parler à tout le monde</h2>
          <p className="mb-4">
            Premier levier : définir un ICP concret, pas un persona “marketing”. Vous devez savoir qui décide, qui influence,
            quelle douleur coûte réellement de l&apos;argent, et quel niveau de maturité est compatible avec votre offre.
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Secteur + taille + contexte de croissance</li>
            <li>Problème business mesurable</li>
            <li>Fenêtre de décision probable (3 à 6 mois)</li>
          </ul>

          <h2 id="bloc-message" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Bloc 2 — Message : parler résultat, pas brochure</h2>
          <p className="mb-4">
            Un bon message de prospection ne présente pas votre offre. Il ouvre une conversation utile sur un risque, une perte
            de performance ou un objectif business. Votre prospect doit se dire : “c&apos;est mon sujet”.
          </p>
          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>Exemple :</strong> “J&apos;observe souvent une chute de conversion entre devis envoyé et relance. En général, ça coûte
              8 à 15% de CA non capté. Vous avez ce sujet en ce moment ?”
            </p>
          </div>

          <h2 id="bloc-sequence" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Bloc 3 — Séquence : cadence courte, valeur continue</h2>
          <p className="mb-4">
            Une séquence efficace n&apos;est pas une répétition. C&apos;est une progression : chaque contact ajoute de la valeur.
            Sur 21 jours, combinez email, téléphone et LinkedIn avec un angle différent à chaque fois.
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>J1 : message d&apos;accroche sur un enjeu business</li>
            <li>J4 : preuve terrain (mini-cas)</li>
            <li>J8 : question de qualification</li>
            <li>J14 : proposition de créneau court</li>
            <li>J21 : relance finale claire</li>
          </ul>

          <h2 id="bloc-pilotage" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Bloc 4 — Pilotage : mesurer ce qui fait progresser</h2>
          <p className="mb-4">
            Les KPI de volume ne suffisent pas. Il faut suivre des indicateurs de qualité : taux de réponse qualifiée,
            taux de RDV tenus, et taux de transformation RDV → opportunité.
          </p>
          <p className="mb-6">
            Sans pilotage qualité, l&apos;équipe se fatigue et le pipeline gonfle artificiellement.
          </p>

          <h2 id="mini-cas-prosp" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Mini-cas terrain</h2>
          <p className="mb-2"><strong>Contexte :</strong> PME B2B, 6 commerciaux, pipeline instable.</p>
          <p className="mb-2"><strong>Action :</strong> mise en place des 4 blocs pendant 6 semaines.</p>
          <p className="mb-8"><strong>Résultat :</strong> +28% de RDV qualifiés et cycle commercial mieux maîtrisé.</p>

          <h2 id="checklist" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Checklist de démarrage (30 minutes)</h2>
          <ul className="list-disc pl-6 mb-8">
            <li>Définir 1 ICP prioritaire pour les 30 prochains jours</li>
            <li>Écrire 1 message d&apos;accroche orienté douleur business</li>
            <li>Construire une séquence 5 touches sur 21 jours</li>
            <li>Fixer 3 KPI qualité hebdomadaires</li>
            <li>Faire une revue d&apos;équipe chaque vendredi</li>
          </ul>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Passer de l&apos;activité au pipeline qui convertit</h3>
            <p className="mb-6">
              Si vous voulez structurer une prospection réellement reproductible, le Bootcamp vous donne la méthode,
              les outils et l&apos;accompagnement terrain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/bootcamp" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                Découvrir le Bootcamp
              </Link>
              <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                Faire un diagnostic gratuit
              </Link>
            </div>
          </div>
        </div>
      </article>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-8 text-center">
            Prendre contact avec Laurent Serre
          </h2>
          <HubSpotForm />
        </div>
      </section>
    </main>
  );
}
