import Link from 'next/link';
import { BookOpen, Handshake } from 'lucide-react';

export default function GrandGuideTechniquesVente() {
  return (
    <main className="bg-primary-bg text-gray-dark min-h-screen">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-title font-bold text-blue-ink mb-8">
            Le grand guide des techniques de vente et de négociation – version terrain
          </h1>
          <p className="text-xl text-gray-700 mb-12">
            Que vous soyez commercial, dirigeant ou négociateur, il existe des dizaines de méthodes issues du marketing, de la psychologie ou du FBI.<br/>
            <span className="font-semibold text-mint-green">👉 Dans ce guide, on fait le tri.</span> Ce qui fonctionne. Ce qui ne sert à rien. Et surtout, ce qu’on applique vraiment dans les PME françaises en 2025.
          </p>
          <div className="grid gap-8 md:grid-cols-2 mb-16">
            {/* Carte 1 : Techniques de vente */}
            <Link href="/ressources/techniques-de-vente" className="group block bg-white/80 rounded-2xl shadow-lg p-8 hover:scale-105 transition-transform border-2 border-mint-green/20 hover:border-mint-green/60">
              <div className="flex flex-col items-center">
                <span className="text-5xl mb-4">💼</span>
                <h2 className="text-2xl font-title font-bold text-blue-ink mb-2">Techniques de vente</h2>
                <p className="text-gray-600 mb-4">Structurer, convaincre, closer</p>
                <span className="inline-block bg-mint-green text-white px-6 py-2 rounded-full font-semibold group-hover:bg-mint-green/90 transition-colors">Découvrir les méthodes de vente</span>
              </div>
            </Link>
            {/* Carte 2 : Techniques de négociation */}
            <Link href="/ressources/techniques-de-negociation" className="group block bg-white/80 rounded-2xl shadow-lg p-8 hover:scale-105 transition-transform border-2 border-blue-ink/20 hover:border-blue-ink/60">
              <div className="flex flex-col items-center">
                <span className="text-5xl mb-4">🤝</span>
                <h2 className="text-2xl font-title font-bold text-blue-ink mb-2">Techniques de négociation</h2>
                <p className="text-gray-600 mb-4">Garder la main sans perdre la face</p>
                <span className="inline-block bg-blue-ink text-white px-6 py-2 rounded-full font-semibold group-hover:bg-blue-ink/90 transition-colors">Découvrir les méthodes de négociation</span>
              </div>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href="/ressources/le-grand-guide-des-techniques-de-vente.pdf" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors" download>
              Télécharger le guide complet (PDF)
            </a>
            <Link href="/bootcamp" className="inline-flex items-center border-2 border-blue-ink text-blue-ink hover:bg-blue-ink hover:text-white px-8 py-4 rounded-full font-semibold transition-colors">
              Vous voulez aller au-delà des méthodes ? Rejoignez le Bootcamp LSD
            </Link>
            <Link href="/contact" className="inline-flex items-center border-2 border-mint-green text-mint-green hover:bg-mint-green hover:text-white px-8 py-4 rounded-full font-semibold transition-colors">
              Pas le temps de tout lire ? On en parle directement
            </Link>
          </div>
        </div>
      </section>

      {/* Articles liés */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-title font-bold text-blue-ink mb-6">📖 Pour aller plus loin</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li><Link href="/blog/closing-b2b-7-techniques" className="text-mint-green hover:underline font-medium">Closing B2B : 7 techniques</Link></li>
            <li><Link href="/blog/gap-selling-methode-b2b" className="text-mint-green hover:underline font-medium">Gap Selling : la méthode B2B</Link></li>
            <li><Link href="/blog/challenger-sales-methode-terrain-b2b" className="text-mint-green hover:underline font-medium">Challenger Sale : la méthode terrain</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
} 