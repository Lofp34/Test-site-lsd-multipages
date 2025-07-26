import type { Metadata } from 'next';
import Link from 'next/link';
import { Info, CheckCircle, User, BookOpen, ArrowRight, Building, Laptop, Heart, Briefcase, TrendingUp, MessageSquare, Phone, Mail, Users } from 'lucide-react';

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
            <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-6 py-3 rounded-full font-semibold transition-colors">
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

      {/* Exemples concrets par secteur */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageSquare className="w-6 h-6 text-mint-green" />
            <h2 className="text-3xl font-title font-bold text-blue-ink">Exemples Concrets par Secteur</h2>
          </div>
          <p className="text-lg text-gray-anthracite max-w-3xl mx-auto">
            Découvrez comment adapter le script AIDA selon votre secteur d'activité avec des exemples prêts à utiliser.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Industrie */}
          <div className="bg-white border border-mint-green/20 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-mint-green/10 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-mint-green" />
              </div>
              <div>
                <h3 className="text-xl font-title font-bold text-blue-ink">Industrie</h3>
                <p className="text-sm text-gray-anthracite">Optimisation des coûts et productivité</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-mint-green/5 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-ink mb-2">📞 Script Téléphone</h4>
                <div className="text-sm text-gray-anthracite space-y-2">
                  <p><strong>Attention :</strong> "Bonjour [Prénom], je vois que [Entreprise] a récemment investi dans [nouvelle ligne/équipement]. Félicitations pour cette expansion !"</p>
                  <p><strong>Intérêt :</strong> "Comment gérez-vous actuellement l'optimisation de vos coûts de production ?"</p>
                  <p><strong>Désir :</strong> "Nous avons aidé [Entreprise similaire] à réduire ses coûts de 15% en 3 mois grâce à [solution]."</p>
                  <p><strong>Action :</strong> "Seriez-vous disponible jeudi à 14h pour un échange de 20 minutes ?"</p>
                </div>
              </div>
              
              <div className="bg-blue-ink/5 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-ink mb-2">📧 Script Email</h4>
                <div className="text-sm text-gray-anthracite space-y-2">
                  <p><strong>Objet :</strong> "Optimisation coûts production - [Entreprise]"</p>
                  <p><strong>Corps :</strong> "Bonjour [Prénom],<br/>Suite à votre récent investissement [détail], je me demandais comment vous optimisez vos coûts de production.<br/>Nous avons aidé [Entreprise] à économiser 15% en 3 mois.<br/>Disponible jeudi 14h pour en discuter ?"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services Informatiques */}
          <div className="bg-white border border-mint-green/20 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-mint-green/10 rounded-xl flex items-center justify-center">
                <Laptop className="w-6 h-6 text-mint-green" />
              </div>
              <div>
                <h3 className="text-xl font-title font-bold text-blue-ink">Services Informatiques</h3>
                <p className="text-sm text-gray-anthracite">Sécurité et transformation digitale</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-mint-green/5 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-ink mb-2">📞 Script Téléphone</h4>
                <div className="text-sm text-gray-anthracite space-y-2">
                  <p><strong>Attention :</strong> "Bonjour [Prénom], j'ai remarqué que [Entreprise] développe ses services digitaux. Très intéressant !"</p>
                  <p><strong>Intérêt :</strong> "Comment sécurisez-vous vos données client avec cette croissance ?"</p>
                  <p><strong>Désir :</strong> "Nous avons sécurisé [Entreprise] contre 3 tentatives de cyberattaque ce mois."</p>
                  <p><strong>Action :</strong> "Puis-je vous proposer un audit sécurité gratuit mardi ?"</p>
                </div>
              </div>
              
              <div className="bg-blue-ink/5 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-ink mb-2">📧 Script Email</h4>
                <div className="text-sm text-gray-anthracite space-y-2">
                  <p><strong>Objet :</strong> "Sécurité digitale - [Entreprise] en croissance"</p>
                  <p><strong>Corps :</strong> "Bonjour [Prénom],<br/>Félicitations pour votre développement digital !<br/>Avec cette croissance, comment sécurisez-vous vos données ?<br/>Nous avons protégé [Entreprise] contre 3 cyberattaques ce mois.<br/>Audit sécurité gratuit mardi ?"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Santé */}
          <div className="bg-white border border-mint-green/20 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-mint-green/10 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-mint-green" />
              </div>
              <div>
                <h3 className="text-xl font-title font-bold text-blue-ink">Santé</h3>
                <p className="text-sm text-gray-anthracite">Qualité des soins et gestion</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-mint-green/5 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-ink mb-2">📞 Script Téléphone</h4>
                <div className="text-sm text-gray-anthracite space-y-2">
                  <p><strong>Attention :</strong> "Bonjour [Prénom], j'ai vu que [Établissement] a reçu le label qualité. Excellent travail !"</p>
                  <p><strong>Intérêt :</strong> "Comment optimisez-vous la gestion de vos équipes soignantes ?"</p>
                  <p><strong>Désir :</strong> "Nous avons aidé [Établissement] à améliorer sa satisfaction patient de 25%."</p>
                  <p><strong>Action :</strong> "Puis-je vous présenter nos solutions mercredi ?"</p>
                </div>
              </div>
              
              <div className="bg-blue-ink/5 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-ink mb-2">📧 Script Email</h4>
                <div className="text-sm text-gray-anthracite space-y-2">
                  <p><strong>Objet :</strong> "Félicitations label qualité - Optimisation gestion"</p>
                  <p><strong>Corps :</strong> "Bonjour [Prénom],<br/>Félicitations pour votre label qualité !<br/>Comment optimisez-vous la gestion de vos équipes ?<br/>Nous avons amélioré la satisfaction patient de 25% chez [Établissement].<br/>Présentation mercredi ?"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services aux Entreprises */}
          <div className="bg-white border border-mint-green/20 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-mint-green/10 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-mint-green" />
              </div>
              <div>
                <h3 className="text-xl font-title font-bold text-blue-ink">Services aux Entreprises</h3>
                <p className="text-sm text-gray-anthracite">Conseil et accompagnement</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-mint-green/5 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-ink mb-2">📞 Script Téléphone</h4>
                <div className="text-sm text-gray-anthracite space-y-2">
                  <p><strong>Attention :</strong> "Bonjour [Prénom], j'ai vu votre article sur [sujet]. Très pertinent !"</p>
                  <p><strong>Intérêt :</strong> "Comment accompagnez-vous vos clients sur [défis actuels] ?"</p>
                  <p><strong>Désir :</strong> "Nous avons doublé la croissance de [Entreprise] en 6 mois."</p>
                  <p><strong>Action :</strong> "Puis-je vous proposer un échange stratégique vendredi ?"</p>
                </div>
              </div>
              
              <div className="bg-blue-ink/5 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-ink mb-2">📧 Script Email</h4>
                <div className="text-sm text-gray-anthracite space-y-2">
                  <p><strong>Objet :</strong> "Votre article [sujet] - Échange stratégique"</p>
                  <p><strong>Corps :</strong> "Bonjour [Prénom],<br/>Excellent article sur [sujet] !<br/>Comment accompagnez-vous vos clients sur [défis] ?<br/>Nous avons doublé la croissance de [Entreprise] en 6 mois.<br/>Échange stratégique vendredi ?"</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conseils d'adaptation */}
        <div className="mt-12 bg-mint-green/5 border border-mint-green/20 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-mint-green" />
            <h3 className="text-xl font-title font-bold text-blue-ink">Conseils d'Adaptation</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-ink mb-2">✅ Personnalisation efficace</h4>
              <ul className="text-sm text-gray-anthracite space-y-1">
                <li>• Recherchez l'actualité de l'entreprise</li>
                <li>• Adaptez le vocabulaire au secteur</li>
                <li>• Utilisez des références sectorielles</li>
                <li>• Respectez les codes du métier</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-ink mb-2">🎯 Timing optimal</h4>
              <ul className="text-sm text-gray-anthracite space-y-1">
                <li>• Industrie : mardi-jeudi 9h-11h</li>
                <li>• IT : lundi-mercredi 14h-16h</li>
                <li>• Santé : mardi-jeudi 10h-12h</li>
                <li>• Services : lundi-vendredi 15h-17h</li>
              </ul>
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
        <ul className="list-disc ml-8 text-gray-anthracite space-y-2 text-lg">
          <li>Personnalisez chaque accroche selon le secteur et le contexte du prospect.</li>
          <li>Préparez des variantes pour chaque étape (exemples d'accroches, bénéfices, objections).</li>
          <li>Entraînez-vous en équipe pour fluidifier le discours et gagner en impact.</li>
          <li>Utilisez le script comme trame, pas comme texte figé : adaptez-le à votre style.</li>
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