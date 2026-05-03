import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Le 28 du mois, il est trop tard pour sauver vos ventes | Laurent Serre',
  description:
    'Quand la fin de mois ressemble à une opération de sauvetage, le problème n’est presque jamais le dernier appel. Il est dans ce qui n’a pas été regardé plus tôt.',
  keywords:
    'fin de mois commerciale, pipeline commercial, prévisions commerciales, pilotage commercial PME, directeur commercial, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/le-28-du-mois-il-est-trop-tard-pour-sauver-vos-ventes',
  },
  openGraph: {
    title: 'Le 28 du mois, il est trop tard pour sauver vos ventes',
    description:
      'Le 28 du mois ne sert pas à sauver les ventes. Il révèle surtout ce qu’on n’a pas voulu regarder plus tôt dans le pipe.',
    url: 'https://www.laurentserre.com/blog/le-28-du-mois-il-est-trop-tard-pour-sauver-vos-ventes',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-04-28-fin-de-mois-sauver-ventes-hero.png',
        width: 1536,
        height: 1024,
        alt: 'Laurent Serre en réunion commerciale de fin de mois devant des indicateurs de ventes à clarifier',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le 28 du mois, il est trop tard pour sauver vos ventes',
    description:
      'Une fin de mois tendue révèle souvent les ventes fragiles que l’équipe n’a pas voulu regarder plus tôt.',
    images: ['https://www.laurentserre.com/images/blog/2026-04-28-fin-de-mois-sauver-ventes-hero.png'],
  },
};

export default function Le28DuMoisIlEstTropTardPourSauverVosVentesPage() {
  const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Le 28 du mois, il est trop tard pour sauver vos ventes",
  "description": "Quand la fin de mois ressemble à une opération de sauvetage, le problème n’est presque jamais le dernier appel. Il est dans ce qui n’a pas été regardé plus tôt.",
  "image": "https://www.laurentserre.com/images/blog/2026-04-28-fin-de-mois-sauver-ventes-hero.png",
  "datePublished": "2026-04-28",
  "dateModified": "2026-04-28",
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
    "@id": "https://www.laurentserre.com/blog/le-28-du-mois-il-est-trop-tard-pour-sauver-vos-ventes"
  },
  "articleSection": "Pilotage commercial / fin de mois",
  "keywords": [
    "fin de mois commerciale",
    "pipeline commercial",
    "prévisions commerciales",
    "pilotage commercial PME",
    "directeur commercial",
    "Laurent Serre"
  ]
};

  return (
<main className="bg-primary-bg text-gray-dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Pilotage commercial / fin de mois</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Le 28 du mois, il est trop tard pour sauver vos ventes
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-04-28">28 avril 2026</time>
              <span>•</span>
              <span>5 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-04-28-fin-de-mois-sauver-ventes-hero.png"
              alt="Laurent Serre en réunion commerciale de fin de mois devant des indicateurs de ventes à clarifier"
              width={1536}
              height={1024}
              className="w-full h-80 object-cover object-center rounded-2xl shadow-lg"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <p className="mb-8">« Qu’est-ce qu’on peut encore faire tomber avant la fin du mois ? »</p>

          <p className="mb-8">Le cycle mensuel se reproduit avec la précision d’une horloge suisse.</p>

          <p className="mb-8">On arrive au 28. Le pipe a l’air correct sur le papier, mais le chiffre n’est pas là. Alors tout le monde se tend. On cherche les deals qui pourraient tomber rapidement. Un petit miracle de fin de mois donne toujours un peu d’espoir.</p>

          <p className="mb-8">Une relance de plus. Une remise. Un appel à un décideur. Un rendez-vous repris par le manager. On essaie tout pour sauver le mois.</p>

          <p className="mb-8">En réalité, à ce moment-là, on sauve rarement une vente. On prend surtout conscience de tout ce qu’on n’a pas voulu regarder plus tôt.</p>

          <p className="mb-8">La dernière semaine du mois ne sert pas à faire tomber les signatures. Elle sert à constater que certains deals étaient fragiles, peu motivés, mais suffisamment bien racontés pour nous permettre de cultiver encore un peu d’espoir.</p>

          <p className="mb-8">C’est souvent là qu’on découvre que le prospect était intéressé, mais pas vraiment en train de décider. C’est là aussi qu’on voit qu’une proposition est partie trop tôt, que le vrai décideur n’a jamais été rencontré, ou que la prochaine étape n’était en fait qu’un espoir bien formulé. C’est exactement la mécanique que je décrivais déjà dans <Link href="/blog/pourquoi-vos-commerciaux-confondent-interet-et-decision">un prospect intéressé n’est pas encore une décision</Link>.</p>

          <p className="mb-8">Le plus coûteux, ce n’est pas la tension de fin de mois. Le plus coûteux, c’est ce qu’elle pousse à faire.</p>

          <p className="mb-8">On accorde une remise pour accélérer un dossier qui n’était pas prêt. On demande au manager de reprendre la main sur un rendez-vous pour tenter un sauvetage. On garde dans les prévisions une affaire qui aurait dû sortir depuis quinze jours. Et après, on appelle ça de l’effort commercial.</p>

          <p className="mb-8">Souvent, ce n’est pas un effort. C’est une manière plus nerveuse de prolonger le flou. Les chiffres peuvent même paraître rassurants jusqu’au dernier moment, comme dans <Link href="/blog/pourquoi-un-forecast-rassurant-fait-souvent-perdre-du-temps-et-des-ventes">ces prévisions commerciales qui apaisent plus qu’elles n’éclairent</Link>. Mais à la fin du mois, le réel reprend toujours la main.</p>

          <p className="mb-8">Un dirigeant ou un directeur commercial utile, à ce moment-là, ne demande pas d’abord : « qu’est-ce qu’on peut sauver ? »</p>

          <p className="mb-8">Il demande plutôt : qu’est-ce qui aurait dû être signalé plus tôt ? Quelle vente est rentrée dans le pipe plus pour meubler que pour signer ? À quel moment avons-nous commencé à nous faire des illusions au lieu de nous challenger ? Et sur quel dossier va-t-on arrêter de courir après une signature pour refaire un point réel avec le client, savoir s’il se renseignait ou s’il avait vraiment envie d’avancer ?</p>

          <p className="mb-8">Parfois, la bonne décision de fin de mois n’est pas de pousser plus fort. C’est de nettoyer.</p>

          <p className="mb-8">Sortir deux affaires du pipe. Requalifier un devis. Refaire un débrief pendant qu’il est encore utile. Empêcher aussi le manager de devenir le pompier de service, comme dans <Link href="/blog/pourquoi-un-manager-commercial-reprend-trop-souvent-les-rendez-vous-a-la-place-de-lequipe">ces rendez-vous repris trop souvent à la place de l’équipe</Link>.</p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <p className="mb-6">
              Si vos fins de mois ressemblent trop souvent à une opération de sauvetage, on peut reprendre votre lecture du pipe, vos critères de décision et vos rituels de revue d’affaires.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                Demander un diagnostic commercial
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                Échanger sur votre situation
              </Link>
            </div>
          </div>

          <p className="mb-8">Le 28 du mois n’est pas le jour où l’on sauve les ventes.</p>

          <p className="mb-8">C’est le jour où l’on paie ce qu’on n’a pas voulu regarder avant.</p>
        </div>
      </article>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-4 text-center">
            Besoin d’en parler plus directement ?
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Si votre cas mérite un échange plus direct, vous pouvez aussi laisser un message ici.
          </p>
          <HubSpotForm />
        </div>
      </section>
    </main>
  );
}
