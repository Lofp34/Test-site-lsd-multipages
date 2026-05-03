import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Target, CheckCircle, ArrowRight, BookOpen, FileText, Download } from 'lucide-react';
import HubSpotForm from '@/components/HubSpotForm';
import FAQ from '@/components/FAQ';

export const metadata: Metadata = {
  title: 'Guide du Closing B2B : techniques, méthodes et scripts | Laurent Serre',
  description: 'Guide complet du closing B2B : 7 techniques éprouvées, méthode AREA, scripts à copier et erreurs à éviter. Téléchargez le guide gratuit et transformez votre taux de signature.',
  keywords: 'closing B2B, techniques de closing, closer vente, comment closer un client, guide closing commercial, closing de vente, méthode closing, scripts closing',
  alternates: {
    canonical: 'https://www.laurentserre.com/closing-b2b',
  },
  openGraph: {
    title: 'Guide du Closing B2B : techniques, méthodes et scripts | Laurent Serre',
    description: 'Guide complet du closing B2B : 7 techniques éprouvées, méthode AREA, scripts à copier. Téléchargez le guide gratuit.',
    url: 'https://www.laurentserre.com/closing-b2b',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/closing_post.png',
        width: 1200,
        height: 630,
        alt: 'Guide du closing B2B — techniques et méthodes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guide du Closing B2B : techniques, méthodes et scripts',
    description: 'Guide complet du closing B2B. Téléchargez le guide gratuit.',
    images: ['https://www.laurentserre.com/images/closing_post.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const techniques = [
  {
    title: 'MAP — Message d\'Accroche Personnalisé',
    desc: 'Commencez chaque closing par une accroche qui ancre la valeur apportée depuis le début. Le MAP rappelle au prospect pourquoi il est là et ce qu\'il a déjà validé.',
    icon: '🎯',
  },
  {
    title: 'Trial Close — Le test de température',
    desc: 'Posez une question de clôture partielle avant la proposition finale. "Si on trouve une solution qui correspond à ce budget, seriez-vous prêt à démarrer le mois prochain ?"',
    icon: '🌡️',
  },
  {
    title: 'Résumé décisionnel',
    desc: 'Avant de proposer, résumez ce qui a été dit, les besoins identifiés, et la valeur que votre solution apporte. Le prospect doit se reconnaître dans ce résumé.',
    icon: '📋',
  },
  {
    title: 'A/B Close — Le choix orienté',
    desc: 'Proposez deux options construites, pas "vous prenez ou pas". "Préférez-vous la formule avec accompagnement terrain ou la version autonome avec les outils ?"',
    icon: '⚖️',
  },
  {
    title: 'Business Case chiffré',
    desc: 'Traduisez votre proposition en impact business mesurable. Combien ça rapporte ou économise par rapport au coût. Le ROI doit être évident.',
    icon: '📊',
  },
  {
    title: 'POC cadré — La preuve par l\'action',
    desc: 'Quand le prospect hésite, proposez un pilote limité dans le temps avec des critères de succès définis à l\'avance. Le POC transforme l\'incertitude en décision.',
    icon: '🧪',
  },
  {
    title: 'Déclosing propre',
    desc: 'Savoir dire non quand la solution n\'est pas adaptée. Un déclosing bien fait renforce la confiance et prépare le terrain pour une future collaboration.',
    icon: '🚪',
  },
];

const erreurs = [
  { titre: 'Closer trop tôt', desc: 'Si la découverte n\'est pas faite, le closing est une agression commerciale. Le bon moment, c\'est quand le prospect a validé son besoin.' },
  { titre: 'Baisser le prix pour signer', desc: 'Brader sa solution affaiblit la valeur perçue et n\'accélère pas la décision. Au contraire, ça crée de la méfiance.' },
  { titre: 'Parler au lieu d\'écouter', desc: 'En phase de closing, les silences du prospect sont des informations. Parlez moins, écoutez plus. Celui qui parle donne des billes à l\'autre.' },
  { titre: 'Forcer une signature', desc: 'Un client forcé est un client qui se rétracte, qui ne paie pas, ou qui ne recommande pas. Le closing éthique construit des relations durables.' },
];

export default function ClosingB2BPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* JSON-LD Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Guide du Closing B2B : techniques, méthodes et scripts à copier",
            "description": "Guide complet du closing B2B : 7 techniques éprouvées (MAP, trial close, résumé décisionnel, A/B close, business case, POC cadré, déclosing), méthode AREA, scripts prêts à l'emploi et erreurs à éviter.",
            "author": { "@type": "Person", "name": "Laurent Serre", "url": "https://www.laurentserre.com/a-propos" },
            "datePublished": "2026-05-03",
            "dateModified": "2026-05-03",
            "image": "https://www.laurentserre.com/images/closing_post.png",
            "url": "https://www.laurentserre.com/closing-b2b",
            "publisher": { "@type": "Organization", "name": "Laurent Serre Développement", "url": "https://www.laurentserre.com" }
          })
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6">
              <Target className="w-5 h-5 text-mint-green" />
              <span className="font-title font-semibold text-white">Guide Complet • Closing B2B</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-title font-extrabold text-white leading-tight mb-6">
              Guide du Closing
              <span className="block text-mint-green">B2B</span>
            </h1>
            
            <p className="text-xl text-white/95 leading-relaxed max-w-3xl mx-auto mb-8">
              Le closing B2B n&apos;est pas une manipulation. C&apos;est la conclusion logique d&apos;un processus commercial bien mené. 
              Découvrez les 7 techniques qui marchent, les erreurs à éviter, et une méthode complète pour signer sans forcer.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#guide" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
                <Download className="w-5 h-5 mr-2" />
                Télécharger le Guide Gratuit
              </a>
              <Link href="/diagnostic" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
                <Target className="w-5 h-5 mr-2" />
                Diagnostic Commercial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comprendre le closing */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-8">
            Le closing B2B, c&apos;est quoi exactement ?
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-anthracite">
            <p className="text-xl leading-relaxed mb-6">
              Le <strong>closing B2B</strong> est l&apos;art de conclure une vente complexe sans forcer, sans brader, et sans manipuler. 
              Contrairement au closing « one-shot » de la vente directe, le closing B2B est un processus qui commence 
              dès le premier échange et se conclut naturellement quand la valeur est démontrée.
            </p>
            
            <div className="bg-mint-green/10 border-l-4 border-mint-green p-6 my-8 rounded-r-lg">
              <p className="text-lg font-semibold text-blue-ink mb-2">La règle d&apos;or du closing B2B</p>
              <p>
                <strong>On ne close pas une vente, on aide le prospect à prendre une décision.</strong> 
                Si vous devez « forcer » pour signer, c&apos;est que la découverte n&apos;a pas été bien faite en amont.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Les 7 Techniques */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink mb-6">
              Les 7 Techniques de Closing B2B Qui Marchent
            </h2>
            <p className="text-xl text-gray-anthracite max-w-3xl mx-auto">
              Des méthodes terrain éprouvées, utilisables dès votre prochain rendez-vous commercial.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techniques.map((t) => (
              <div key={t.title} className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4">{t.icon}</div>
                <h3 className="text-xl font-title font-bold text-blue-ink mb-3">{t.title}</h3>
                <p className="text-gray-anthracite">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Erreurs à éviter */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-8">
            Les 4 erreurs qui tuent votre closing
          </h2>
          
          <div className="space-y-6">
            {erreurs.map((e) => (
              <div key={e.titre} className="bg-orange-50 border-l-4 border-orange-soft p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-blue-ink mb-2">❌ {e.titre}</h3>
                <p className="text-gray-anthracite">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles liés */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-title font-bold text-blue-ink mb-6">
              Approfondissez le closing
            </h2>
            <p className="text-xl text-gray-anthracite max-w-2xl mx-auto">
              Nos articles les plus lus sur les techniques de vente et le closing B2B
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/blog/closing-b2b-7-techniques" className="group">
              <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 h-full">
                <div className="flex items-center mb-4">
                  <FileText className="w-5 h-5 text-mint-green mr-2" />
                  <span className="text-sm text-mint-green font-medium">Techniques de vente</span>
                </div>
                <h3 className="text-lg font-semibold text-blue-ink group-hover:text-mint-green mb-3">
                  Closing B2B : 7 techniques qui marchent (+ scripts)
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  MAP, trial close, résumé décisionnel, A/B close, business case, POC cadré et déclosing. Avec 5 scripts prêts à copier.
                </p>
                <span className="text-mint-green font-medium text-sm group-hover:underline">Lire l&apos;article →</span>
              </div>
            </Link>

            <Link href="/blog/7-etapes-transformer-non-en-oui-performant-2025" className="group">
              <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 h-full">
                <div className="flex items-center mb-4">
                  <FileText className="w-5 h-5 text-mint-green mr-2" />
                  <span className="text-sm text-mint-green font-medium">Techniques de vente</span>
                </div>
                <h3 className="text-lg font-semibold text-blue-ink group-hover:text-mint-green mb-3">
                  7 étapes pour transformer un « non » en « oui » performant
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Méthode complète pour transformer chaque refus client en opportunité commerciale durable.
                </p>
                <span className="text-mint-green font-medium text-sm group-hover:underline">Lire l&apos;article →</span>
              </div>
            </Link>

            <Link href="/blog/techniques-de-closing-b2b-comment-signer-sans-forcer-et-sans-brader" className="group">
              <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 h-full">
                <div className="flex items-center mb-4">
                  <FileText className="w-5 h-5 text-mint-green mr-2" />
                  <span className="text-sm text-mint-green font-medium">Closing / vente B2B</span>
                </div>
                <h3 className="text-lg font-semibold text-blue-ink group-hover:text-mint-green mb-3">
                  Techniques de closing B2B : signer sans forcer et sans brader
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Le closing n&apos;est pas une manipulation. Savoir quand et comment conclure, ça s&apos;apprend.
                </p>
                <span className="text-mint-green font-medium text-sm group-hover:underline">Lire l&apos;article →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Ressources */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-8">
            Ressources complémentaires
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/ressources/guide-closing" className="group">
              <div className="bg-gradient-to-br from-mint-green/10 to-blue-ink/10 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <div className="flex items-center mb-3">
                  <BookOpen className="w-6 h-6 text-mint-green mr-3" />
                  <h3 className="text-lg font-semibold text-blue-ink group-hover:text-mint-green">Guide Ultime du Closing</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  7 techniques avancées et méthode AREA pour transformer vos négociations. Guide complet à télécharger.
                </p>
                <span className="text-mint-green font-medium text-sm">Télécharger →</span>
              </div>
            </Link>

            <Link href="/ressources/techniques-de-negociation" className="group">
              <div className="bg-gradient-to-br from-mint-green/10 to-blue-ink/10 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <div className="flex items-center mb-3">
                  <BookOpen className="w-6 h-6 text-mint-green mr-3" />
                  <h3 className="text-lg font-semibold text-blue-ink group-hover:text-mint-green">Techniques de Négociation</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Effet miroir, négociation raisonnée, silence stratégique. Maîtrisez l&apos;art de la négociation B2B.
                </p>
                <span className="text-mint-green font-medium text-sm">Explorer →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Questions fréquentes sur le closing B2B"
        description="Les réponses aux questions que se posent les commerciaux et dirigeants sur le closing."
        items={[
          {
            question: "C'est quoi le closing en vente B2B ?",
            answer: "Le closing B2B est l'étape finale du processus de vente où le commercial aide le prospect à prendre une décision d'achat. Contrairement à la vente grand public, le closing B2B implique souvent plusieurs décideurs, des cycles longs et des montants élevés. Il repose sur la qualité de la découverte en amont, pas sur des techniques de manipulation."
          },
          {
            question: "Quelle est la meilleure technique de closing B2B ?",
            answer: "Il n'y a pas de technique universelle. La meilleure dépend du contexte : cycle de vente, nombre de décideurs, budget, urgence du besoin. Le trial close (test de température) est souvent le plus polyvalent car il permet d'évaluer où en est le prospect sans forcer. Le résumé décisionnel fonctionne très bien en vente complexe multi-parties prenantes."
          },
          {
            question: "Comment closer un client sans forcer ?",
            answer: "La clé est de ne pas « closer » au sens traditionnel mais d'aider le prospect à décider. Pour cela : 1) Avoir fait une découverte complète en amont, 2) Avoir validé chaque étape avec le prospect, 3) Présenter une proposition qui répond exactement aux besoins identifiés, 4) Utiliser le résumé décisionnel pour ancrer la valeur avant de demander la signature."
          },
          {
            question: "Combien de temps faut-il pour maîtriser le closing B2B ?",
            answer: "Les techniques de base s'acquièrent en quelques semaines de pratique. La maîtrise, elle, demande 3 à 6 mois de pratique terrain avec du feedback régulier. Le plus important n'est pas de connaître les techniques mais de savoir quand les utiliser et surtout quand ne pas les utiliser."
          },
          {
            question: "Le closing B2B est-il différent pour les PME ?",
            answer: "Oui. Dans une PME, le commercial est souvent en contact direct avec le dirigeant-décideur. Le cycle est plus court mais le besoin de crédibilité est plus fort. Les techniques doivent être adaptées à des interlocuteurs qui ont une vision globale de leur entreprise, pas seulement un périmètre fonctionnel."
          },
        ]}
      />

      {/* CTA Lead Magnet */}
      <section id="guide" className="py-20 bg-blue-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-title font-bold text-white mb-6">
                Téléchargez le Guide Complet du Closing B2B
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Recevez gratuitement notre guide avec les 7 techniques détaillées, 5 scripts prêts à l&apos;emploi, 
                et la méthode AREA pour structurer votre closing.
              </p>
              <div className="space-y-3 text-white/80">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-mint-green mr-3 flex-shrink-0" />
                  <span>7 techniques détaillées avec exemples</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-mint-green mr-3 flex-shrink-0" />
                  <span>5 scripts de closing prêts à copier</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-mint-green mr-3 flex-shrink-0" />
                  <span>Checklist de préparation closing</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-mint-green mr-3 flex-shrink-0" />
                  <span>Méthode AREA complète</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <HubSpotForm
                formId="guide-closing-b2b"
                title="Recevoir le guide gratuit"
                description="Guide complet du closing B2B + scripts"
                fields={['email', 'firstname', 'company']}
                buttonText="Télécharger le guide"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
