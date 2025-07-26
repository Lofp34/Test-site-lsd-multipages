import type { Metadata } from 'next';
import { Linkedin, Users, MessageSquare, TrendingUp, CheckCircle, ArrowRight, Target, Share2, Download, Info, BookOpen, User } from 'lucide-react';
import Link from 'next/link';
import EmailCaptureForm from '@/components/ui/EmailCaptureForm';

export const metadata: Metadata = {
  title: 'LinkedIn et Réseaux Sociaux : Guide Complet Prospection Digitale PME | Laurent Serre',
  description: 'Guide complet LinkedIn et réseaux sociaux pour PME. Stratégies de prospection digitale, templates de messages, outils et techniques éprouvées pour générer des leads B2B.',
  keywords: 'LinkedIn PME, prospection LinkedIn, réseaux sociaux B2B, social selling, prospection digitale, LinkedIn Sales Navigator, prospection commerciale PME, génération leads B2B',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://laurentserre.com/ressources/linkedin-prospection',
  },
  openGraph: {
    title: 'LinkedIn et Réseaux Sociaux : Guide Complet Prospection Digitale PME | Laurent Serre',
    description: 'Guide complet LinkedIn et réseaux sociaux pour PME. Stratégies de prospection, templates de messages et techniques éprouvées pour générer des leads qualifiés.',
    url: 'https://laurentserre.com/ressources/linkedin-prospection',
    type: 'article',
    locale: 'fr_FR',
    siteName: 'Laurent Serre Développement',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LinkedinProspectionPage() {
  return (
    <main className="min-h-screen bg-white pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-mint-green/10 to-blue-ink/10 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-mint-green/20 px-4 py-2 rounded-full mb-4">
            <Linkedin className="w-5 h-5 text-mint-green" />
            <span className="font-semibold text-mint-green text-sm">Ressource PME</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-title font-extrabold text-blue-ink mb-4">LinkedIn et Réseaux Sociaux : Guide Complet Prospection Digitale PME</h1>
          <p className="text-lg text-gray-anthracite mb-6">
            Transformez LinkedIn en machine à prospects pour votre PME. Stratégies éprouvées, templates de messages et techniques pour générer des leads qualifiés via les réseaux sociaux.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-2">
            <a href="/guide-linkedin-prospection-pme.pdf" download className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-6 py-3 rounded-full font-semibold transition-colors">
              <Download className="w-5 h-5 mr-2" />
              Télécharger le guide (PDF)
            </a>
            <Link href="/diagnostic" className="inline-flex items-center border-2 border-mint-green text-mint-green hover:bg-mint-green hover:text-white px-6 py-3 rounded-full font-semibold transition-colors">
              <Info className="w-5 h-5 mr-2" />
              Audit LinkedIn Gratuit
            </Link>
          </div>
        </div>
      </section>

      {/* À qui s'adresse ce guide ? */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-6 h-6 text-mint-green" />
          <h2 className="text-2xl font-title font-bold text-blue-ink">À qui s'adresse ce guide ?</h2>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="inline-block bg-mint-green/10 text-mint-green px-3 py-1 rounded-full text-sm font-semibold">PME</span>
          <span className="inline-block bg-blue-ink/10 text-blue-ink px-3 py-1 rounded-full text-sm font-semibold">SDR</span>
          <span className="inline-block bg-orange-soft/10 text-orange-soft px-3 py-1 rounded-full text-sm font-semibold">Commerciaux</span>
          <span className="inline-block bg-gray-anthracite/10 text-gray-anthracite px-3 py-1 rounded-full text-sm font-semibold">Dirigeants</span>
          <span className="inline-block bg-mint-green/10 text-mint-green px-3 py-1 rounded-full text-sm font-semibold">Startups</span>
        </div>
        <p className="text-gray-anthracite text-lg">
          Ce guide s'adresse aux équipes commerciales de PME, SDR, commerciaux terrain, dirigeants et entrepreneurs souhaitant développer leur prospection digitale via LinkedIn et les réseaux sociaux pour générer des leads qualifiés.
        </p>
      </section>

      {/* Pourquoi LinkedIn pour les PME ? */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-mint-green" />
          <h2 className="text-2xl font-title font-bold text-blue-ink">Pourquoi LinkedIn pour les PME ?</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-mint-green/5 p-6 rounded-xl">
            <h3 className="text-lg font-title font-bold text-blue-ink mb-3">Avantages spécifiques PME</h3>
            <ul className="space-y-2 text-gray-anthracite">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                <span>Coût réduit vs prospection traditionnelle</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                <span>Accès direct aux décideurs</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                <span>Crédibilité renforcée par le réseau</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                <span>Mesurabilité des actions</span>
              </li>
            </ul>
          </div>
          <div className="bg-blue-ink/5 p-6 rounded-xl">
            <h3 className="text-lg font-title font-bold text-blue-ink mb-3">Statistiques d'impact</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-anthracite">Taux de réponse LinkedIn</span>
                <span className="font-bold text-mint-green">25-30%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-anthracite">Réduction coût acquisition</span>
                <span className="font-bold text-mint-green">-60%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-anthracite">Qualité des leads</span>
                <span className="font-bold text-mint-green">+40%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-anthracite">Temps de cycle de vente</span>
                <span className="font-bold text-mint-green">-30%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu du guide */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-mint-green" />
          <h2 className="text-2xl font-title font-bold text-blue-ink">Contenu du guide</h2>
        </div>
        <div className="bg-white border border-mint-green/20 rounded-xl p-6">
          <ol className="space-y-4 text-gray-anthracite">
            <li className="flex items-start">
              <span className="bg-mint-green text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">1</span>
              <div>
                <strong className="text-blue-ink">Optimisation du profil LinkedIn</strong>
                <p className="text-sm mt-1">Titre accrocheur, résumé orienté bénéfices, recommandations clients, visibilité optimale</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-mint-green text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">2</span>
              <div>
                <strong className="text-blue-ink">Stratégies de connexion</strong>
                <p className="text-sm mt-1">Ciblage précis, messages de connexion personnalisés, timing optimal</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-mint-green text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">3</span>
              <div>
                <strong className="text-blue-ink">Messagerie et follow-up</strong>
                <p className="text-sm mt-1">Templates de messages, séquences de relance, gestion des objections</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-mint-green text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">4</span>
              <div>
                <strong className="text-blue-ink">Outils et automations</strong>
                <p className="text-sm mt-1">Sales Navigator, CRM, outils de prospection, mesure des performances</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-mint-green text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">5</span>
              <div>
                <strong className="text-blue-ink">Mesure et ROI</strong>
                <p className="text-sm mt-1">KPIs essentiels, tableaux de bord, optimisation continue</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Bloc téléchargement/CTA */}
      <section id="telechargement" className="max-w-4xl mx-auto px-4 py-8">
        <EmailCaptureForm 
          title="Télécharger le guide LinkedIn PME"
          description="Recevez le guide complet avec tous les templates, stratégies et conseils pratiques directement dans votre boîte mail."
          buttonText="Télécharger le guide LinkedIn PME"
          successMessage="Guide envoyé ! Vérifiez votre boîte mail et téléchargez le PDF."
        />
      </section>

      {/* Stratégie LinkedIn PME */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink mb-6">
              Stratégie LinkedIn pour PME
            </h2>
            <p className="text-xl text-gray-anthracite max-w-3xl mx-auto">
              Approche spécifique aux contraintes et opportunités des PME
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Profil Optimisé PME
              </h3>
              <p className="text-gray-anthracite mb-4">
                Créez un profil qui attire vos prospects PME cibles.
              </p>
              <ul className="space-y-2 text-sm text-gray-anthracite">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Titre accrocheur orienté bénéfice
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Résumé centré sur vos clients
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Recommandations clients PME
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Ciblage Précis
              </h3>
              <p className="text-gray-anthracite mb-4">
                Identifiez et segmentez vos prospects PME efficacement.
              </p>
              <ul className="space-y-2 text-sm text-gray-anthracite">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Filtres Sales Navigator
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Recherche par secteur/taille
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Identification décideurs
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Messages Personnalisés
              </h3>
              <p className="text-gray-anthracite mb-4">
                Templates de messages adaptés aux dirigeants PME.
              </p>
              <ul className="space-y-2 text-sm text-gray-anthracite">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Approche consultative
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Références sectorielles
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Call-to-action soft
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Templates de Messages */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink mb-6">
              Templates de Messages LinkedIn
            </h2>
            <p className="text-xl text-gray-anthracite max-w-3xl mx-auto">
              Messages prêts à utiliser pour différentes situations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
                Premier Contact
              </h3>
              <div className="bg-mint-green/10 p-6 rounded-lg mb-4">
                <p className="text-gray-anthracite italic mb-4">
                  "Bonjour [Prénom],
                </p>
                <p className="text-gray-anthracite italic mb-4">
                  J'ai remarqué que [Entreprise] se développe bien dans [secteur]. 
                  Félicitations pour [actualité/réussite récente] !
                </p>
                <p className="text-gray-anthracite italic mb-4">
                  J'accompagne des dirigeants PME comme vous à [bénéfice spécifique]. 
                  Récemment, [Entreprise similaire] a [résultat concret].
                </p>
                <p className="text-gray-anthracite italic">
                  Seriez-vous ouvert à un échange de 15 minutes sur vos enjeux [domaine] ?
                </p>
              </div>
              <p className="text-sm text-gray-anthracite">
                <strong>Taux de réponse moyen :</strong> 25-30%
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
                Relance Soft
              </h3>
              <div className="bg-mint-green/10 p-6 rounded-lg mb-4">
                <p className="text-gray-anthracite italic mb-4">
                  "Bonjour [Prénom],
                </p>
                <p className="text-gray-anthracite italic mb-4">
                  Je vous avais contacté il y a quelques semaines concernant [sujet].
                </p>
                <p className="text-gray-anthracite italic mb-4">
                  Entre temps, j'ai aidé [Entreprise similaire] à [résultat récent]. 
                  Cela pourrait vous intéresser ?
                </p>
                <p className="text-gray-anthracite italic">
                  Si ce n'est pas le bon moment, n'hésitez pas à me le dire.
                </p>
              </div>
              <p className="text-sm text-gray-anthracite">
                <strong>Taux de réponse moyen :</strong> 15-20%
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
                Partage de Contenu
              </h3>
              <div className="bg-mint-green/10 p-6 rounded-lg mb-4">
                <p className="text-gray-anthracite italic mb-4">
                  "Bonjour [Prénom],
                </p>
                <p className="text-gray-anthracite italic mb-4">
                  Je viens de publier une étude sur [sujet pertinent pour sa PME]. 
                  Les résultats pourraient vous intéresser.
                </p>
                <p className="text-gray-anthracite italic mb-4">
                  [Insight clé de l'étude]
                </p>
                <p className="text-gray-anthracite italic">
                  Qu'en pensez-vous ? Cela correspond à votre expérience ?
                </p>
              </div>
              <p className="text-sm text-gray-anthracite">
                <strong>Taux d'engagement :</strong> 35-40%
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
                Référence Commune
              </h3>
              <div className="bg-mint-green/10 p-6 rounded-lg mb-4">
                <p className="text-gray-anthracite italic mb-4">
                  "Bonjour [Prénom],
                </p>
                <p className="text-gray-anthracite italic mb-4">
                  [Contact commun] m'a parlé de vos enjeux [domaine] chez [Entreprise].
                </p>
                <p className="text-gray-anthracite italic mb-4">
                  J'ai récemment aidé [Entreprise similaire] à [résultat concret] 
                  sur une problématique similaire.
                </p>
                <p className="text-gray-anthracite italic">
                  Seriez-vous intéressé par un retour d'expérience ?
                </p>
              </div>
              <p className="text-sm text-gray-anthracite">
                <strong>Taux de réponse moyen :</strong> 45-50%
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conseils d'utilisation */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-4">
          <Info className="w-6 h-6 text-mint-green" />
          <h2 className="text-2xl font-title font-bold text-blue-ink">Conseils d'utilisation</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-mint-green/5 p-6 rounded-xl">
            <h3 className="text-lg font-title font-bold text-blue-ink mb-3">Bonnes pratiques</h3>
            <ul className="space-y-2 text-gray-anthracite">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                <span>Personnalisez chaque message selon le prospect</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                <span>Respectez les limites LinkedIn (100 invitations/semaine)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                <span>Créez du contenu de valeur pour votre réseau</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                <span>Mesurez et optimisez vos performances</span>
              </li>
            </ul>
          </div>
          <div className="bg-red-50 p-6 rounded-xl">
            <h3 className="text-lg font-title font-bold text-red-600 mb-3">Erreurs à éviter</h3>
            <ul className="space-y-2 text-gray-anthracite">
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-0.5">✗</span>
                <span>Messages génériques et impersonnels</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-0.5">✗</span>
                <span>Spam et envoi massif sans personnalisation</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-0.5">✗</span>
                <span>Vente directe dès le premier message</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-0.5">✗</span>
                <span>Négliger le suivi et la relation long terme</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Autres Réseaux Sociaux */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink mb-6">
              Autres Réseaux Sociaux B2B
            </h2>
            <p className="text-xl text-gray-anthracite max-w-3xl mx-auto">
              Diversifiez vos canaux de prospection digitale
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Share2 className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Twitter/X
              </h3>
              <p className="text-gray-anthracite">
                Engagement via les discussions sectorielles et partage d'expertise.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Facebook Groupes
              </h3>
              <p className="text-gray-anthracite">
                Participation active dans les groupes de dirigeants PME.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                YouTube
              </h3>
              <p className="text-gray-anthracite">
                Contenu éducatif pour démontrer votre expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Maillage interne */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <Link href="/ressources/scripts-prospection" className="inline-flex items-center text-mint-green hover:underline font-semibold">
            <ArrowRight className="w-4 h-4 mr-1" /> Scripts de prospection
          </Link>
          <Link href="/diagnostic" className="inline-flex items-center text-blue-ink hover:underline font-semibold">
            <ArrowRight className="w-4 h-4 mr-1" /> Diagnostic commercial gratuit
          </Link>
          <Link href="/expert-developpement-commercial-pme" className="inline-flex items-center text-orange-soft hover:underline font-semibold">
            <ArrowRight className="w-4 h-4 mr-1" /> Expert développement commercial PME
          </Link>
          <Link href="/formation-commerciale-pme" className="inline-flex items-center text-mint-green hover:underline font-semibold">
            <ArrowRight className="w-4 h-4 mr-1" /> Formation commerciale PME
          </Link>
        </div>
      </section>

      {/* Témoignage / Preuve sociale */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 rounded-xl">
          <p className="text-lg text-blue-ink italic mb-2">
            "Grâce aux techniques LinkedIn enseignées par Laurent, notre équipe commerciale a doublé ses rendez-vous qualifiés en 3 mois. L'approche personnalisée et les templates ont fait toute la différence !"
          </p>
          <div className="text-mint-green font-semibold">Directeur Commercial PME Services</div>
        </div>
      </section>

      {/* CTA final */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-title font-bold text-blue-ink mb-4">Envie d'aller plus loin ?</h2>
        <p className="text-lg text-gray-anthracite mb-6">Profitez d'un audit LinkedIn personnalisé ou découvrez toutes les ressources pour booster votre prospection digitale.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
            <Info className="w-5 h-5 mr-2" />
            Audit LinkedIn Offert
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