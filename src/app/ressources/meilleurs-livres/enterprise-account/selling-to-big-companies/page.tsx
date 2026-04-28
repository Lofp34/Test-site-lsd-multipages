import Link from 'next/link';
import { Metadata } from 'next';
import StarRating from '@/components/ui/StarRating';
import Badge from '@/components/ui/Badge';

// Métadonnées SEO optimisées
export const metadata: Metadata = {
  title: 'Selling to Big Companies par Jill Konrath | Résumé et Avis | Laurent Serre',
  description: 'Découvrez notre résumé détaillé de "Selling to Big Companies" par Jill Konrath. Points clés, avis terrain et conseils pour prospecter les grands comptes. Le guide concret pour obtenir des rendez-vous avec les décideurs.',
  keywords: [
    'selling to big companies',
    'jill konrath',
    'prospection grands comptes',
    'vente enterprise',
    'résumé livre vente',
    'conseil commercial',
    'Laurent Serre',
    'grands comptes',
    'prospection B2B'
  ].join(', '),
  openGraph: {
    title: 'Selling to Big Companies - Résumé et Conseils Terrain',
    description: 'Le guide concret pour prospecter et obtenir des rendez-vous avec les grands comptes.',
    images: [
      {
        url: '/covers/selling-to-big-companies.jpg',
        width: 1200,
        height: 630,
        alt: 'Couverture du livre Selling to Big Companies par Jill Konrath'
      }
    ],
    type: 'article',
  },
  alternates: {
    canonical: 'https://www.laurentserre.com/ressources/meilleurs-livres/enterprise-account/selling-to-big-companies'
  },
  other: {
    'article:author': 'Jill Konrath',
    'article:published_time': '2005',
  }
};

// Schema.org pour le livre
const bookSchema = {
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "Selling to Big Companies",
  "author": {
    "@type": "Person",
    "name": "Jill Konrath"
  },
  "datePublished": "2005",
  "description": "Le guide concret pour prospecter et obtenir des rendez-vous avec les grands comptes.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.2,
    "ratingCount": 1,
    "reviewCount": 1
  },
  "review": {
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": "Laurent Serre"
    },
    "reviewBody": "Un livre que je recommande particulièrement aux commerciaux qui galèrent à décrocher des RDV avec les gros comptes. Konrath a une approche très pragmatique, sans bullshit.",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": 4.2
    }
  }
};

export default function SellingToBigCompaniesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />
      
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-12">
          <div className="flex flex-col items-center gap-4">
            <Badge variant="category" category="enterprise-account" size="md">
              🏢 Enterprise & Accounts
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Selling to Big Companies
            </h1>
            
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <p className="text-xl text-mint-green font-semibold">
                Jill Konrath <span className="text-white/60 font-normal">— 2005</span>
              </p>
              <div className="flex items-center gap-3">
                <Badge variant="difficulty" difficulty="Intermédiaire" size="sm">
                  Intermédiaire
                </Badge>
                <Badge variant="outline" size="sm">
                  6h de lecture
                </Badge>
                <div className="flex items-center gap-1">
                  <StarRating rating={4.2} size="sm" showValue />
                </div>
              </div>
            </div>
            
            <p className="text-lg text-white/90 italic mb-6 max-w-2xl mx-auto leading-relaxed">
              Le guide concret pour prospecter et obtenir des rendez-vous avec les grands comptes.
            </p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-2xl p-8 border border-mint-green/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6 flex items-center gap-3">
              📖 Résumé détaillé
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
              <p className="text-xl mb-6 font-medium text-blue-ink">
                Jill Konrath s'attaque à un défi majeur : comment percer les barrages des grandes entreprises pour obtenir des rendez-vous avec les vrais décideurs.
              </p>
              
              <p className="mb-4">
                Le livre commence par un constat sans appel : les acheteurs B2B sont saturés, surinformés, pressés, et il devient de plus en plus difficile de "percer" jusqu'à eux. Face à cette réalité, Konrath propose une approche méthodique en 4 étapes :
              </p>
              
              <div className="bg-mint-green/10 rounded-xl p-6 mb-6 border-l-4 border-mint-green">
                <ol className="list-decimal list-inside space-y-3 text-blue-ink font-medium">
                  <li><strong>Ciblage fin</strong> : Se concentrer sur un segment d'industrie ou de fonction spécifique</li>
                  <li><strong>Recherche approfondie</strong> : Identifier les enjeux et priorités spécifiques de ces prospects</li>
                  <li><strong>Message d'accroche ultra-pertinent</strong> : Montrer en une phrase qu'on peut résoudre un de leurs problèmes critiques</li>
                  <li><strong>Mix tactique</strong> : Utiliser appels à froid et emails percutants, personnalisés, pour décrocher la rencontre</li>
                </ol>
              </div>
              
              <p className="mb-4">
                L'auteure insiste particulièrement sur l'importance de parler la langue du client (ROI, productivité, part de marché) plutôt que la langue de son produit. Elle fournit de nombreux exemples concrets d'emails de prospection efficaces et de préparation d'elevator pitch crédibles.
              </p>
            </div>
          </div>
        </article>

        {/* Points clés */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-2xl p-8 border border-mint-green/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6 flex items-center gap-3">
              🎯 Points clés à retenir
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Méthode en 4 étapes pour percer les barrages des grands comptes",
                "Techniques de ciblage fin par industrie et fonction",
                "Scripts d'emails de prospection personnalisés et efficaces",
                "Préparation d'elevator pitch orientés résultats client",
                "Stratégies pour franchir les barrières des gatekeepers",
                "Approche consultative centrée sur les enjeux business du prospect"
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-mint-green/5 rounded-lg border border-mint-green/20">
                  <span className="flex-shrink-0 w-6 h-6 bg-mint-green text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <p className="text-gray-800 font-medium">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Profils cibles */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-2xl p-8 border border-mint-green/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6 flex items-center gap-3">
              👥 Pour qui ce livre ?
            </h2>
            
            <div className="flex flex-wrap gap-3">
              {[
                "Commerciaux grands comptes",
                "Business developers",
                "Consultants indépendants",
                "Managers commerciaux",
                "Entrepreneurs B2B"
              ].map((profile, index) => (
                <Badge key={index} variant="outline" size="md" className="text-blue-ink">
                  {profile}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Avis terrain Laurent Serre */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-2xl shadow-2xl p-8 border border-mint-green/30">
            <h2 className="text-3xl font-bold text-blue-ink mb-6 flex items-center gap-3">
              💬 Mon avis terrain
            </h2>
            
            <div className="bg-white/80 rounded-xl p-6 border-l-4 border-mint-green">
              <p className="text-lg text-gray-800 mb-4 leading-relaxed">
                Un livre que je recommande particulièrement aux commerciaux qui galèrent à décrocher des RDV avec les gros comptes. Konrath a une approche très pragmatique, sans bullshit.
              </p>
              
              <h3 className="text-xl font-bold text-mint-green mb-3">Ce qui marche vraiment sur le terrain :</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 mb-4">
                <li>Sa méthode de recherche préalable (15 min par prospect max)</li>
                <li>Les templates d'emails qu'elle propose (à adapter bien sûr)</li>
                <li>L'approche "problème-solution" en une phrase</li>
              </ul>
              
              <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-400">
                <p className="text-gray-800">
                  <strong>Attention :</strong> le livre date de 2005, certaines tactiques sont à moderniser (LinkedIn n'existait pas !). Mais les principes restent valables. À coupler avec des techniques plus récentes de social selling.
                </p>
              </div>
              
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-gray-600">Note Laurent Serre :</span>
                <StarRating rating={4.2} size="sm" showValue />
              </div>
            </div>
          </div>
        </section>

        {/* Livres complémentaires */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-2xl p-8 border border-mint-green/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6 flex items-center gap-3">
              📚 Livres complémentaires
            </h2>
            
            <p className="text-gray-600 mb-6">
              Pour approfondir votre maîtrise des grands comptes, ces livres complètent parfaitement Selling to Big Companies :
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/ressources/meilleurs-livres/enterprise-account/the-challenger-customer"
                className="group p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-bold text-indigo-800 mb-2 group-hover:text-indigo-600:text-indigo-200">
                  The Challenger Customer
                </h3>
                <p className="text-sm text-gray-600">
                  Gérer les comités d'achat complexes
                </p>
              </Link>
              
              <Link 
                href="/ressources/meilleurs-livres/enterprise-account/mastering-the-complex-sale"
                className="group p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-bold text-indigo-800 mb-2 group-hover:text-indigo-600:text-indigo-200">
                  Mastering the Complex Sale
                </h3>
                <p className="text-sm text-gray-600">
                  Vendre de la valeur en cycle long
                </p>
              </Link>
              
              <Link 
                href="/ressources/meilleurs-livres/enterprise-account/key-account-management-definitive-guide"
                className="group p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-bold text-indigo-800 mb-2 group-hover:text-indigo-600:text-indigo-200">
                  Key Account Management
                </h3>
                <p className="text-sm text-gray-600">
                  Structurer sa gestion des comptes clés
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Bootcamp */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-r from-mint-green/20 to-blue-ink/20 rounded-2xl shadow-2xl p-8 text-center border border-mint-green/30">
            <Badge variant="default" size="sm" className="mb-4">
              Passez du livre au terrain
            </Badge>
            
            <h3 className="text-3xl font-bold text-blue-ink mb-4">
              Maîtrisez la prospection grands comptes
            </h3>
            
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Formez-vous avec les meilleures méthodes issues de ce livre et d'autres références, adaptées à la réalité des grands comptes français.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/bootcamp-commercial-intensif" 
                className="inline-block bg-mint-green text-blue-ink font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-mint-green/90 transition-all duration-300 hover:scale-105"
              >
                Voir le Bootcamp Commercial
              </Link>
              
              <Link 
                href="/diagnostic" 
                className="inline-block border-2 border-mint-green text-mint-green font-semibold px-8 py-4 rounded-full hover:bg-mint-green hover:text-blue-ink transition-all duration-300"
              >
                Diagnostic gratuit
              </Link>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link 
            href="/ressources/meilleurs-livres/enterprise-account" 
            className="inline-flex items-center gap-2 text-mint-green hover:text-mint-green/80 text-lg font-medium transition-colors duration-300"
          >
            ← Retour à Enterprise & Accounts
          </Link>
        </div>
      </main>
    </>
  );
}