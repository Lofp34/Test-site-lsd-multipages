import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import FAQ from '@/components/FAQ';
import BDCarousel from '@/components/BDCarousel';
import AuthorCard from '@/components/AuthorCard';

export const metadata: Metadata = {
  title: 'Différence entre vendeur et commercial : 5 écarts, +40% CA',
  description: 'La différence entre vendeur et commercial expliquée avec 5 écarts concrets qui coûtent 40% de CA à votre PME. Auto-diagnostic et plan de transformation inclus.',
  keywords: 'différence entre vendeur et commercial, vendeur vs commercial, transformation commerciale, management équipe vente, développement commercial, PME',
  other: {
    dateModified: '2026-05-23',
  },
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/vendeur-commercial-transformation-decisive',
  },
  openGraph: {
    title: 'Différence entre vendeur et commercial : 5 écarts, +40% CA',
    description: 'La différence entre vendeur et commercial expliquée avec 5 écarts concrets qui coûtent 40% de CA à votre PME. Auto-diagnostic et plan de transformation inclus.',
    url: 'https://www.laurentserre.com/blog/vendeur-commercial-transformation-decisive',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2024-12-20-vendeur-commercial-hero.webp',
        width: 1024,
        height: 559,
        alt: 'Transformation vendeur commercial - équipe commerciale professionnelle',
      },
    ],
  },
};

export default function Article5() {
  return (
    <main className="bg-primary-bg text-gray-dark">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "@id": "https://www.laurentserre.com/blog/vendeur-commercial-transformation-decisive#article",
                "headline": "Différence entre vendeur et commercial : les 5 clés de la transformation",
                "description": "La différence entre un vendeur et un commercial : le vendeur exécute des transactions, le commercial construit un pipeline. Les 5 clés pour transformer votre équipe.",
                "author": { "@type": "Person", "name": "Laurent Serre", "url": "https://www.laurentserre.com/a-propos", "sameAs": ["https://www.linkedin.com/in/laurentserre34/", "https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/"] },
                "datePublished": "2024-12-20",
                "dateModified": "2026-05-03",
                "image": "https://www.laurentserre.com/equipedeface.jpg",
                "url": "https://www.laurentserre.com/blog/vendeur-commercial-transformation-decisive",
                "publisher": { "@type": "Organization", "name": "Laurent Serre", "url": "https://www.laurentserre.com" },
                "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.laurentserre.com/blog/vendeur-commercial-transformation-decisive" },
                "articleSection": "Management commercial"
              },
              {
                "@type": "FAQPage",
                "@id": "https://www.laurentserre.com/blog/vendeur-commercial-transformation-decisive#faq",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Quelle est la différence entre vendeur et commercial ?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Le vendeur présente une offre et cherche la transaction immédiate. Le commercial diagnostique le contexte client, révèle les enjeux business et construit une solution qui crée de la valeur mesurable sur le long terme."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Quelle est la différence entre vendre et commercialiser ?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Vendre, c'est conclure une transaction sur un produit existant. Commercialiser, c'est construire une stratégie de mise en marché qui inclut la prospection, la qualification, la découverte des besoins, l'accompagnement et le suivi client dans la durée."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Quel est le rôle d'un commercial ?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Le commercial prospecte, qualifie les opportunités, découvre les besoins du client, construit une solution adaptée, négocie et assure le suivi post-vente. Son objectif n'est pas la transaction unique mais la relation durable et le développement d'un portefeuille."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Quel est le rôle d'un vendeur ?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Le vendeur présente un produit ou service, répond aux questions et conclut la vente. Son rôle est centré sur le produit et la transaction immédiate, avec un cycle court et un objectif de volume."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Quelle est la différence entre un vendeur et un marchand ?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Le vendeur travaille pour une marque dont il présente les produits. Le marchand (commerçant) achète et revend des biens, gère des stocks et une marge commerciale."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Comment transformer un vendeur en commercial consultatif ?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "La transformation passe par l'écoute active, la qualification, la connaissance business, la structuration du processus de vente et un coaching terrain régulier sur les rendez-vous réels."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Combien de temps faut-il pour faire évoluer une équipe ?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Comptez généralement 3 à 6 mois pour installer les nouveaux réflexes, selon le niveau initial, la discipline managériale et la fréquence d'entraînement commercial."
                    }
                  }
                ]
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://www.laurentserre.com/blog/vendeur-commercial-transformation-decisive#breadcrumb",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.laurentserre.com" },
                  { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.laurentserre.com/blog" },
                  { "@type": "ListItem", "position": 3, "name": "Différence entre vendeur et commercial", "item": "https://www.laurentserre.com/blog/vendeur-commercial-transformation-decisive" }
                ]
              }
            ]
          })
        }}
      />
      <section className="relative min-h-[70vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/blog/2024-12-20-vendeur-commercial-hero.webp"
            alt="Différence entre vendeur et commercial - les 5 clés de la transformation"
            fill
            className="object-cover object-top brightness-[0.3]"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-mint-green text-white">
              Management
            </span>
            <span className="text-white/60 text-sm">• 20 décembre 2024</span>
            <span className="text-white/60 text-sm">• 11 min</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-bold mb-6 leading-tight">
            Différence entre vendeur et commercial : les 5 clés de la transformation
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            "Vendeur" et "commercial" ne sont pas synonymes. Comprendre la différence et opérer la transformation peut multiplier vos résultats par 3.
          </p>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            La différence entre un vendeur et un commercial est simple : le vendeur exécute des transactions immédiates, le commercial construit un pipeline de vente par la qualification, la découverte et l'accompagnement. L'un vend ce qu'on lui donne, l'autre construit ce qu'il vend. Le résultat ? Un commercial performant génère en moyenne 40% de chiffre d'affaires supplémentaire par rapport à un vendeur classique.
          </p>

          <div className="bg-mint-green/10 border-l-4 border-mint-green p-6 my-8">
            <p className="text-base mb-3">
              Vous voulez situer votre équipe ? Commencez par un
              <Link href="/diagnostic" className="text-mint-green hover:underline font-semibold"> diagnostic commercial gratuit</Link>,
              puis structurez la montée en compétence avec la
              <Link href="/formation-commerciale-pme" className="text-mint-green hover:underline font-semibold"> formation commerciale PME</Link>
              ou le <Link href="/bootcamp" className="text-mint-green hover:underline font-semibold">bootcamp commercial</Link>.
            </p>
          </div>

          {/* TL;DR */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-2">Ce que vous allez retenir</p>
            <p className="text-gray-700 leading-relaxed">
              La diff&eacute;rence entre un vendeur et un commercial n&rsquo;est pas une question de titre, mais de posture.
              Le vendeur ex&eacute;cute des transactions&nbsp;; le commercial construit une relation qui g&eacute;n&egrave;re du chiffre
              d&rsquo;affaires dans la dur&eacute;e. Une &eacute;quipe de vendeurs d&eacute;guis&eacute;s en commerciaux vous co&ucirc;te
              jusqu&rsquo;&agrave; 40&nbsp;% de CA. Ce carrousel illustre les 5 diff&eacute;rences cl&eacute;s et le chemin de la
              transformation.
            </p>
          </div>

          {/* Carrousel BD — Vendeur vs Commercial */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-10">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD — Vendeur vs Commercial
            </p>
            <p className="text-sm text-amber-700 mb-5">
              11 planches illustr&eacute;es — cliquez sur une vignette pour feuilleter la BD dans le lecteur int&eacute;gr&eacute;.
            </p>
            <BDCarousel
              images={[
                { src: '/images/blog/carrousel-vendeur-commercial/01-cover.webp', alt: 'Cover — Vendeur vs Commercial : les 5 différences qui vous coûtent 40 % de CA', index: 1 },
                { src: '/images/blog/carrousel-vendeur-commercial/02-vendeur.webp', alt: 'Le vendeur en rendez-vous : présentation catalogue', index: 2 },
                { src: '/images/blog/carrousel-vendeur-commercial/03-commercial.webp', alt: 'Le commercial consultatif : diagnostic et écoute', index: 3 },
                { src: '/images/blog/carrousel-vendeur-commercial/04-vendeurs-deguises.webp', alt: 'Vendeurs déguisés en commerciaux : le piège des équipes', index: 4 },
                { src: '/images/blog/carrousel-vendeur-commercial/05-cout-reel.webp', alt: 'Le coût réel des vendeurs déguisés', index: 5 },
                { src: '/images/blog/carrousel-vendeur-commercial/06-bascule.webp', alt: 'La bascule : 40 % de CA en plus par commercial', index: 6 },
                { src: '/images/blog/carrousel-vendeur-commercial/07-diagnostic.webp', alt: 'La transformation commence par un diagnostic terrain', index: 7 },
                { src: '/images/blog/carrousel-vendeur-commercial/08-transformation.webp', alt: 'Les 4 étapes concrètes de la transformation commerciale', index: 8 },
                { src: '/images/blog/carrousel-vendeur-commercial/09-resultat.webp', alt: 'Résistances et résultats de la transformation', index: 9 },
                { src: '/images/blog/carrousel-vendeur-commercial/10-cle-terrain.webp', alt: 'La clé : un coaching terrain personnalisé', index: 10 },
                { src: '/images/blog/carrousel-vendeur-commercial/11-cta-final.webp', alt: 'CTA — Évaluez votre équipe avec un diagnostic gratuit', index: 11 },
              ]}
              title="Carrousel BD — Vendeur vs Commercial"
              maxPreview={2}
            />
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center px-6 py-3 bg-amber-600 text-white font-semibold text-sm rounded-full hover:bg-amber-700 transition-colors shadow-sm"
              >
                🔍 &Eacute;valuez votre &eacute;quipe — Diagnostic gratuit
              </Link>
              <a
                href="/downloads/carrousel-vendeur-commercial-11.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                T&eacute;l&eacute;charger le PDF (11 planches)
              </a>
            </div>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le vendeur : technicien de la transaction
          </h2>

          <p className="mb-6">
            <strong>Le vendeur classique</strong> maîtrise parfaitement son produit. Il connaît toutes les fonctionnalités,
            tous les prix, toutes les options. Sa mission ? Présenter l'offre et conclure la vente.
          </p>

          <p className="mb-6">
            Son approche est linéaire : présentation → démonstration → proposition → signature.
            Il répond aux demandes mais ne les crée pas. Il vend ce qu'on lui demande d'acheter.
          </p>

          <div className="bg-orange-soft/10 border-l-4 border-orange-soft p-6 my-8">
            <p className="text-base">
              <strong>Exemple :</strong> "Voici notre logiciel, il fait A, B et C.
              Il coûte X euros par mois. Souhaitez-vous commander ?"
            </p>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le commercial : stratège de la relation
          </h2>

          <p className="mb-6">
            <strong>Le commercial</strong> dépasse la simple vente. Il comprend l'écosystème de son client,
            ses enjeux business, ses contraintes, ses objectifs. Il ne vend pas un produit :
            il propose une solution à un problème.
          </p>

          <p className="mb-6">
            Son approche est consultative : diagnostic → analyse → recommandation → accompagnement.
            Il crée de la demande en révélant des besoins latents.
          </p>

          <div className="bg-mint-green/10 border-l-4 border-mint-green p-6 my-8">
            <p className="text-base">
              <strong>Exemple :</strong> "J'ai analysé votre situation. Vous perdez 2h par jour sur des tâches administratives.
              Voici comment notre solution peut vous faire gagner 10h par semaine et améliorer votre rentabilité de 15%."
            </p>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les 5 différences fondamentales
          </h2>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-ink/10">
                  <th className="border border-gray-300 p-3 text-left font-title font-semibold">Aspect</th>
                  <th className="border border-gray-300 p-3 text-left font-title font-semibold">Vendeur</th>
                  <th className="border border-gray-300 p-3 text-left font-title font-semibold">Commercial</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold">Focus</td>
                  <td className="border border-gray-300 p-3">Produit</td>
                  <td className="border border-gray-300 p-3">Client</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Approche</td>
                  <td className="border border-gray-300 p-3">Transaction</td>
                  <td className="border border-gray-300 p-3">Relation</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold">Temporalité</td>
                  <td className="border border-gray-300 p-3">Court terme</td>
                  <td className="border border-gray-300 p-3">Long terme</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Posture</td>
                  <td className="border border-gray-300 p-3">Présente</td>
                  <td className="border border-gray-300 p-3">Conseille</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold">Valeur</td>
                  <td className="border border-gray-300 p-3">Prix</td>
                  <td className="border border-gray-300 p-3">ROI</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Pourquoi cette transformation est cruciale
          </h2>

          <p className="mb-6">
            <strong>1. Différenciation concurrentielle</strong><br/>
            Dans un marché saturé, le commercial crée de la valeur ajoutée là où le vendeur
            ne fait que comparer les prix.
          </p>

          <p className="mb-6">
            <strong>2. Marges préservées</strong><br/>
            Le commercial justifie ses tarifs par la valeur apportée.
            Le vendeur subit la pression sur les prix.
          </p>

          <p className="mb-6">
            <strong>3. Fidélisation client</strong><br/>
            Le commercial construit une relation de confiance durable.
            Le vendeur doit reconquérir le client à chaque opportunité.
          </p>

          <p className="mb-6">
            <strong>4. Prédictibilité du business</strong><br/>
            Le commercial développe un portefeuille stable.
            Le vendeur vit l'incertitude permanente des nouvelles affaires.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Comment opérer la transformation ?
          </h2>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Étape 1 : Changer le mindset
          </h3>

          <p className="mb-6">
            Avant de changer les techniques, il faut changer la mentalité.
            Vos vendeurs doivent comprendre qu'ils passent de "pousse-produit"
            à "résolveur de problèmes".
          </p>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Étape 2 : Former à l'écoute active
          </h3>

          <p className="mb-6">
            80% du temps d'un commercial doit être consacré à écouter et questionner,
            20% seulement à présenter. C'est l'inverse du vendeur classique.
          </p>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Étape 3 : Développer la connaissance business
          </h3>

          <p className="mb-6">
            Un commercial maîtrise les enjeux sectoriels de ses clients :
            réglementations, tendances marché, défis récurrents, indicateurs clés.
          </p>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Étape 4 : Structurer le processus de vente
          </h3>

          <p className="mb-6">
            Qualification → Découverte → Argumentation → Traitement objections → Conclusion.
            Chaque étape a ses outils et ses objectifs précis.
          </p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>Durée de transformation :</strong> Comptez 3 à 6 mois pour transformer
              un vendeur expérimenté en commercial efficace, avec un accompagnement structuré.
            </p>
          </div>

          {/* CTA mi-article — bootcamp */}
          <div className="bg-gradient-to-r from-mint-green/20 to-teal-50 border border-mint-green/30 rounded-2xl p-6 my-10 text-center">
            <p className="text-lg font-title font-bold text-blue-ink mb-2">
              Vous avez reconnu votre &eacute;quipe dans ces 4 &eacute;tapes&nbsp;?
            </p>
            <p className="text-sm text-gray-600 mb-4">
              La plupart des PME stagnent entre l&rsquo;&eacute;tape 1 et 2. Le
              bootcamp commercial acc&eacute;l&egrave;re cette transformation en
              8 semaines avec un coaching terrain personnalis&eacute;.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-ink text-white font-semibold text-sm rounded-full hover:bg-blue-ink/90 transition-colors shadow-sm"
            >
              D&eacute;couvrir le bootcamp
            </Link>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les résistances à anticiper
          </h2>

          <p className="mb-6">
            <strong>"Je vendais très bien avant"</strong><br/>
            Certains vendeurs performants résistent au changement.
            Montrez-leur que cette évolution va démultiplier leurs résultats.
          </p>

          <p className="mb-6">
            <strong>"C'est trop compliqué"</strong><br/>
            La méthode commerciale semble plus complexe au début.
            Accompagnez la montée en compétences progressivement.
          </p>

          <p className="mb-6">
            <strong>"Nos clients n'attendent pas ça"</strong><br/>
            Détrompez-vous ! Les clients B2B cherchent des conseillers,
            pas des preneurs de commande.
          </p>

          
          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><Link href="/blog/commercial-en-2026-competences-qui-feront-difference" className="text-mint-green hover:underline font-medium">Le commercial en 2026</Link></li>
              <li><Link href="/blog/recrutement-commercial-en-pme-arretez-de-recruter-a-l-instinct" className="text-mint-green hover:underline font-medium">Recrutement commercial en PME</Link></li>
              <li><Link href="/blog/coaching-developpement-commercial-guide-complet-pme" className="text-mint-green hover:underline font-medium">Coaching et développement commercial : guide complet</Link></li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Prêt à transformer votre équipe ?
            </h3>
            <p className="mb-6">
              Notre bootcamp commercial accompagne cette transformation décisive.
              Méthodologie éprouvée, coaching individuel, résultats mesurables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors"
              >
                Évaluer votre équipe
              </Link>
              <Link
                href="/bootcamp"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors"
              >
                Transformation bootcamp
              </Link>
            </div>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            L'impact de la transformation
          </h2>

          <p className="mb-6">
            <strong>Résultats observés chez nos clients :</strong>
          </p>

          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>+40% de taux de transformation en moyenne</li>
            <li>+25% sur la valeur moyenne des commandes</li>
            <li>-30% de cycle de vente (décisions plus rapides)</li>
            <li>+60% de taux de fidélisation client</li>
            <li>Réduction significative de la pression sur les prix</li>
          </ul>

          <p className="mb-6">
            <em>
              Transformer des vendeurs en commerciaux, c'est passer d'une logique de volume
              à une logique de valeur. Le ROI est immédiat et durable.
            </em>
          </p>
        </div>
      </article>
      <FAQ
        title="Questions fréquentes : vendeur ou commercial ?"
        description="Les réponses utiles pour transformer une équipe commerciale sans perdre l'énergie terrain."
        items={[
          {
            question: "Quelle est la différence entre vendeur et commercial ?",
            answer: "Le vendeur présente une offre et cherche la transaction immédiate. Le commercial diagnostique le contexte client, révèle les enjeux business et construit une solution qui crée de la valeur mesurable sur le long terme."
          },
          {
            question: "Quelle est la différence entre vendre et commercialiser ?",
            answer: "Vendre, c'est conclure une transaction sur un produit existant. Commercialiser, c'est construire une stratégie de mise en marché qui inclut la prospection, la qualification, la découverte des besoins, l'accompagnement et le suivi client dans la durée."
          },
          {
            question: "Quel est le rôle d'un commercial ?",
            answer: "Le commercial prospecte, qualifie les opportunités, découvre les besoins du client, construit une solution adaptée, négocie et assure le suivi post-vente. Son objectif n'est pas la transaction unique mais la relation durable et le développement d'un portefeuille."
          },
          {
            question: "Quel est le rôle d'un vendeur ?",
            answer: "Le vendeur présente un produit ou service, répond aux questions et conclut la vente. Son rôle est centré sur le produit et la transaction immédiate, avec un cycle court et un objectif de volume."
          },
          {
            question: "Quelle est la différence entre un vendeur et un marchand ?",
            answer: "Le vendeur travaille pour une marque dont il présente les produits. Le marchand (commerçant) achète et revend des biens, gère des stocks et une marge commerciale. Le vendeur vend ce qu'on lui confie ; le marchand choisit ce qu'il vend."
          },
          {
            question: "Comment transformer un vendeur en commercial consultatif ?",
            answer: "La transformation passe par l'écoute active, la qualification, la connaissance business, la structuration du processus de vente et un coaching terrain régulier sur les rendez-vous réels."
          },
          {
            question: "Combien de temps faut-il pour faire évoluer une équipe ?",
            answer: "Comptez généralement 3 à 6 mois pour installer les nouveaux réflexes, selon le niveau initial, la discipline managériale et la fréquence d'entraînement commercial."
          }
        ]}
      />
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