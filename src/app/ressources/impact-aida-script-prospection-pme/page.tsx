import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, Info, CheckCircle, User, BookOpen, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "Impact & AIDA : Modèle de Script de Prospection PME | Laurent Serre Développement",
  description: "Découvrez le modèle de script de prospection Impact & AIDA, conçu pour les PME. Structure étape par étape, conseils d'utilisation, téléchargement gratuit et exemples concrets.",
  alternates: {
    canonical: 'https://laurentserre.com/ressources/impact-aida-script-prospection-pme',
  },
  openGraph: {
    title: "Impact & AIDA : Modèle de Script de Prospection PME | Laurent Serre Développement",
    description: "Script de prospection téléphonique et email pour PME. Structure AIDA, conseils pratiques, téléchargement gratuit.",
    url: 'https://laurentserre.com/ressources/impact-aida-script-prospection-pme',
    type: 'article',
    locale: 'fr_FR',
    siteName: 'Laurent Serre Développement',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ImpactAidaScriptPage() {
  return (
    <main className="min-h-screen bg-white pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-mint-green/10 to-blue-ink/10 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-mint-green/20 px-4 py-2 rounded-full mb-4">
            <BookOpen className="w-5 h-5 text-mint-green" />
            <span className="font-semibold text-mint-green text-sm">Ressource PME</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-title font-extrabold text-blue-ink mb-4">Impact & AIDA : Modèle de Script de Prospection</h1>
          <p className="text-lg text-gray-anthracite mb-6">
            Un script structuré pour maximiser l'impact de vos prises de contact, inspiré de 20 ans d'expérience terrain et des meilleures pratiques AIDA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-2">
            <a href="#telechargement" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-6 py-3 rounded-full font-semibold transition-colors">
              <Download className="w-5 h-5 mr-2" />
              Télécharger le script (PDF)
            </a>
            <Link href="/diagnostic" className="inline-flex items-center border-2 border-mint-green text-mint-green hover:bg-mint-green hover:text-white px-6 py-3 rounded-full font-semibold transition-colors">
              <Info className="w-5 h-5 mr-2" />
              Diagnostic Prospection Gratuit
            </Link>
          </div>
        </div>
      </section>

      {/* À qui s'adresse ce script ? */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-6 h-6 text-mint-green" />
          <h2 className="text-2xl font-title font-bold text-blue-ink">À qui s'adresse ce script ?</h2>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="inline-block bg-mint-green/10 text-mint-green px-3 py-1 rounded-full text-sm font-semibold">PME</span>
          <span className="inline-block bg-blue-ink/10 text-blue-ink px-3 py-1 rounded-full text-sm font-semibold">SDR</span>
          <span className="inline-block bg-orange-soft/10 text-orange-soft px-3 py-1 rounded-full text-sm font-semibold">Commerciaux</span>
          <span className="inline-block bg-gray-anthracite/10 text-gray-anthracite px-3 py-1 rounded-full text-sm font-semibold">Entrepreneurs</span>
        </div>
        <p className="text-gray-anthracite text-lg">
          Ce modèle s'adresse aux équipes commerciales de PME, SDR, commerciaux terrain, dirigeants et entrepreneurs souhaitant structurer leur prospection téléphonique ou email pour maximiser leur taux de prise de rendez-vous.
        </p>
      </section>

      {/* Pourquoi ce modèle ? */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-mint-green" />
          <h2 className="text-2xl font-title font-bold text-blue-ink">Pourquoi ce modèle ?</h2>
        </div>
        <ul className="list-disc ml-8 text-gray-anthracite space-y-2 text-lg">
          <li>Basé sur la méthode AIDA, éprouvée pour capter l'attention et susciter l'intérêt.</li>
          <li>Adapté aux spécificités des PME et cycles de vente courts.</li>
          <li>Facile à personnaliser selon votre secteur et votre cible.</li>
          <li>Optimisé pour la prise de rendez-vous rapide.</li>
        </ul>
      </section>

      {/* Script AIDA détaillé */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-mint-green" />
          <h2 className="text-2xl font-title font-bold text-blue-ink">Le script AIDA étape par étape</h2>
        </div>
        <ol className="list-decimal ml-8 text-gray-anthracite space-y-4 text-lg">
          <li>
            <strong>Attention</strong> : <br />
            <span className="text-gray-700">Accroche personnalisée pour capter l'attention (ex : référence à un enjeu du secteur, actualité, recommandation).</span>
          </li>
          <li>
            <strong>Intérêt</strong> : <br />
            <span className="text-gray-700">Question ou fait marquant qui fait écho à la problématique du prospect.</span>
          </li>
          <li>
            <strong>Désir</strong> : <br />
            <span className="text-gray-700">Mise en avant d'un bénéfice concret, d'un résultat obtenu ou d'une solution différenciante.</span>
          </li>
          <li>
            <strong>Action</strong> : <br />
            <span className="text-gray-700">Proposition claire de rendez-vous ou d'échange (date, créneau, call-to-action direct).</span>
          </li>
        </ol>
      </section>

      {/* Bloc téléchargement/CTA */}
      <section id="telechargement" className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-mint-green/10 border border-mint-green/30 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-title font-bold text-blue-ink mb-2">Télécharger le script complet (PDF)</h3>
          <p className="text-gray-anthracite mb-4">Recevez le modèle prêt à l'emploi, personnalisable pour votre équipe.</p>
          <a href="#" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
            <Download className="w-5 h-5 mr-2" />
            Télécharger le script AIDA PME
          </a>
        </div>
      </section>

      {/* Conseils d'utilisation */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-4">
          <Info className="w-6 h-6 text-mint-green" />
          <h2 className="text-2xl font-title font-bold text-blue-ink">Conseils d'utilisation</h2>
        </div>
        <ul className="list-disc ml-8 text-gray-anthracite space-y-2 text-lg">
          <li>Personnalisez chaque accroche selon le secteur et le contexte du prospect.</li>
          <li>Préparez des variantes pour chaque étape (exemples d'accroches, bénéfices, objections).</li>
          <li>Entraînez-vous en équipe pour fluidifier le discours et gagner en impact.</li>
          <li>Utilisez le script comme trame, pas comme texte figé : adaptez-le à votre style.</li>
        </ul>
      </section>

      {/* Maillage interne */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <Link href="/ressources/guide-prospection" className="inline-flex items-center text-mint-green hover:underline font-semibold">
            <ArrowRight className="w-4 h-4 mr-1" /> Guide complet de prospection
          </Link>
          <Link href="/diagnostic" className="inline-flex items-center text-blue-ink hover:underline font-semibold">
            <ArrowRight className="w-4 h-4 mr-1" /> Diagnostic commercial gratuit
          </Link>
          <Link href="/expert-developpement-commercial-pme" className="inline-flex items-center text-orange-soft hover:underline font-semibold">
            <ArrowRight className="w-4 h-4 mr-1" /> Page cible : Expert développement commercial PME
          </Link>
        </div>
      </section>

      {/* Témoignage / Preuve sociale */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 rounded-xl">
          <p className="text-lg text-blue-ink italic mb-2">
            "Grâce au script AIDA adapté par Laurent, notre taux de prise de rendez-vous a doublé en 2 mois. Simple, efficace, et facile à personnaliser !"
          </p>
          <div className="text-mint-green font-semibold">Responsable Commerciale PME Services</div>
        </div>
      </section>

      {/* CTA final */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-title font-bold text-blue-ink mb-4">Envie d'aller plus loin ?</h2>
        <p className="text-lg text-gray-anthracite mb-6">Profitez d'un diagnostic personnalisé ou découvrez toutes les ressources pour booster votre prospection.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
            <Info className="w-5 h-5 mr-2" />
            Diagnostic Prospection Offert
          </Link>
          <Link href="/ressources" className="inline-flex items-center border-2 border-mint-green text-mint-green hover:bg-mint-green hover:text-white px-8 py-4 rounded-full font-semibold transition-colors">
            <BookOpen className="w-5 h-5 mr-2" />
            Voir toutes les ressources
          </Link>
        </div>
      </section>
    </main>
  );
} 