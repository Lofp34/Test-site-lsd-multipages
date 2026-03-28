import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Pipeline fantôme : le test des 9 minutes du lundi matin | Laurent Serre',
  description: 'Le test du lundi matin que les dirigeants et directeurs commerciaux peuvent utiliser pour repérer le pipeline fantôme, requalifier les deals et protéger le trimestre.',
  keywords: 'pipeline fantôme, réunion pipeline, directeur commercial, dirigeant PME, forecast commercial, bootcamp commercial',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/pipeline-fantome-lundi-matin-test-9-minutes',
  },
  openGraph: {
    title: 'Pipeline fantôme : le test des 9 minutes du lundi matin',
    description: 'Une méthode simple et exigeante pour faire tomber les faux deals avant qu’ils ne déforment votre forecast.',
    url: 'https://www.laurentserre.com/blog/pipeline-fantome-lundi-matin-test-9-minutes',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-03-28-pipeline-fantome-lundi-hero.jpg',
        width: 1536,
        height: 1024,
        alt: 'Réunion de pipeline du lundi matin pour identifier le pipeline fantôme',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pipeline fantôme : le test des 9 minutes du lundi matin',
    description: 'Le test terrain pour nettoyer un forecast avant qu’il ne contamine vos décisions.',
    images: ['https://www.laurentserre.com/images/blog/2026-03-28-pipeline-fantome-lundi-hero.jpg'],
  },
};

export default function PipelineFantomeLundiMatinPage() {
  return (
    <main className="bg-primary-bg text-gray-dark">
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-orange-soft/10 backdrop-blur-sm border border-orange-soft/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-orange-soft text-sm">Pilotage commercial</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Pipeline fantôme : le test des 9 minutes du lundi matin
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-03-28">28 mars 2026</time>
              <span>•</span>
              <span>10 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-03-28-pipeline-fantome-lundi-hero.jpg"
              alt="Réunion de pipeline du lundi matin pour identifier le pipeline fantôme"
              width={1536}
              height={1024}
              className="w-full h-80 object-cover object-center rounded-2xl shadow-lg"
              quality={74}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Le lundi matin, beaucoup d&apos;équipes commerciales font une réunion de pipeline. Sur le papier, c&apos;est un rituel de pilotage.
            En réalité, c&apos;est souvent un théâtre collectif : on récite les affaires, on ajoute deux promesses, on protège quelques ego et on ressort avec un forecast
            plus confortable que vrai. C&apos;est là que naît le <strong>pipeline fantôme</strong>.
          </p>

          <p className="mb-8">
            J&apos;appelle pipeline fantôme l&apos;ensemble des opportunités qui occupent vos reportings mais ne peuvent pas encore soutenir une décision de dirigeant :
            sponsor trop faible, urgence mal établie, prochaine étape floue, ou simple espoir déguisé en probabilité. Le problème n&apos;est pas moral. Il est managérial.
            Tant que ces affaires restent mélangées au reste, elles déforment vos arbitrages, vos remises et votre allocation de temps.
          </p>

          <p className="mb-8">
            Voici le <strong>test des 9 minutes</strong> que je recommande en ouverture de semaine pour faire tomber les faux deals avant qu&apos;ils ne contaminent le trimestre.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Le principe : 3 questions, 3 minutes chacune, zéro débat décoratif</h2>
          <p className="mb-4">
            Prenez les 5 à 10 affaires les plus structurantes du pipeline. Pas toute la base CRM. Seulement ce qui peut réellement changer le mois.
            Pour chaque deal, posez trois questions simples et exigeantes.
          </p>
          <ol className="list-decimal pl-6 mb-8 space-y-3">
            <li><strong>Qui décide vraiment et qu&apos;est-ce qui est à risque pour lui maintenant ?</strong></li>
            <li><strong>Quelle prochaine étape est datée, bilatérale et liée à une décision ?</strong></li>
            <li><strong>Qu&apos;est-ce qui manque pour défendre cette affaire devant un CODIR aujourd&apos;hui ?</strong></li>
          </ol>

          <p className="mb-8">
            Si votre commercial ne peut pas répondre de façon précise en moins de trois minutes, vous n&apos;avez pas un deal avancé. Vous avez un récit de deal.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Question 1 : “Qui décide vraiment ?” élimine l&apos;illusion relationnelle</h2>
          <p className="mb-4">
            Beaucoup d&apos;opportunités paraissent avancées parce qu&apos;il y a un bon contact, des échanges fluides et un client sympathique.
            Mais une relation confortable n&apos;est pas une trajectoire de décision.
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Le sponsor a-t-il un intérêt personnel à faire avancer le dossier ?</li>
            <li>Le décideur final a-t-il été identifié, approché ou au moins cartographié ?</li>
            <li>Le risque du statu quo est-il explicite côté client ?</li>
          </ul>
          <p className="mb-6">
            Si la réponse est floue, l&apos;affaire doit sortir du forecast principal ou être reclassée comme opportunité à requalification. Ce n&apos;est pas une punition.
            C&apos;est une mesure d&apos;hygiène. Pour aller plus loin sur le nettoyage de fin de trimestre, lisez aussi
            {' '}
            <Link href="/blog/fin-trimestre-commercial-7-arbitrages-eviter-avril-creux" className="text-blue-ink font-semibold underline hover:text-mint-green">
              les 7 arbitrages de fin de trimestre pour éviter un mois creux
            </Link>
            .
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Question 2 : “Quelle prochaine étape datée ?” distingue l&apos;intérêt de l&apos;engagement</h2>
          <p className="mb-4">
            Le pipeline fantôme adore les formulations vagues : “on se redit vite”, “le client est intéressé”, “on attend un retour”.
            Rien de tout cela ne protège votre chiffre d&apos;affaires.
          </p>
          <p className="mb-6">
            Une prochaine étape valable doit être <strong>datée, bilatérale et orientée décision</strong>. Exemple : un atelier de validation avec le sponsor et le directeur général,
            prévu jeudi à 14h, avec un objectif clair de cadrage final. Sans ça, vous n&apos;avez pas un mouvement de deal ; vous avez de la température commerciale.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Question 3 : “Que manque-t-il pour défendre ce deal ?” réinstalle le niveau dirigeant</h2>
          <p className="mb-4">
            Cette question change tout parce qu&apos;elle force l&apos;équipe à quitter le commentaire pour revenir à la décision. Souvent, ce qui manque est connu depuis des jours :
            business case incomplet, absence de calendrier d&apos;implémentation, objection politique non traitée, ou niveau de douleur insuffisamment verbalisé.
          </p>
          <p className="mb-6">
            En formulant ce manque clairement, le manager peut coacher utilement. Sinon, il se contente d&apos;écouter un reporting. C&apos;est exactement la dérive que j&apos;évoque dans
            {' '}
            <Link href="/blog/reunion-commerciale-hebdo-rituel-closing" className="text-blue-ink font-semibold underline hover:text-mint-green">
              le rituel de réunion commerciale orienté closing
            </Link>
            .
          </p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>Règle utile :</strong> un deal qui échoue deux lundis de suite au test des 9 minutes ne reste pas dans la même catégorie de forecast.
              Soit il est requalifié, soit un plan de progression précis lui est assigné. Pas de zone grise durable.
            </p>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Ce que ce test change concrètement en 30 jours</h2>
          <ul className="list-disc pl-6 mb-8">
            <li>Votre forecast devient défendable devant un CODIR ou un banquier</li>
            <li>Les managers consacrent leur temps aux vrais arbitrages plutôt qu&apos;aux récits rassurants</li>
            <li>Les commerciaux comprennent ce qui fait réellement progresser une affaire</li>
            <li>Les remises de panique diminuent, parce que la qualification remonte en amont</li>
            <li>Le trimestre suivant est nourri par des décisions réelles, pas par un CRM flatteur</li>
          </ul>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Le vrai bénéfice : moins de confort, plus de contrôle</h2>
          <p className="mb-8">
            Ce test n&apos;est pas agréable pour tout le monde au début. Il retire un peu de confort psychologique. Mais c&apos;est justement ce qui le rend précieux.
            Une direction commerciale mature ne cherche pas un pipeline qui rassure. Elle cherche un pipeline qui aide à décider. Et quand cette discipline devient hebdomadaire,
            vous protégez à la fois la conversion, la marge et la crédibilité managériale.
          </p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vous voulez installer ce niveau d&apos;exigence sans rigidifier votre équipe ?</h3>
            <p className="mb-6">
              Le Bootcamp aide vos managers et commerciaux à structurer les revues de pipeline, fiabiliser le forecast et transformer plus vite sans théâtre CRM.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/bootcamp" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                Découvrir le Bootcamp
              </Link>
              <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                Faire un diagnostic commercial
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
