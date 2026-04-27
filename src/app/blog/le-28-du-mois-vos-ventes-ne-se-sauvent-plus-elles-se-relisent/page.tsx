import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Le 28 du mois, vos ventes ne se sauvent plus. Elles se relisent. | Laurent Serre',
  description:
    'Quand une équipe veut sauver le mois dans les derniers jours, elle ne rattrape presque jamais une vente. Elle révèle surtout tout ce qu’elle n’a pas voulu regarder plus tôt.',
  keywords:
    'fin de mois commercial, pilotage commercial, arbitrage commercial, manager commercial, dirigeant PME, vente B2B, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/le-28-du-mois-vos-ventes-ne-se-sauvent-plus-elles-se-relisent',
  },
  openGraph: {
    title: 'Le 28 du mois, vos ventes ne se sauvent plus. Elles se relisent.',
    description:
      'La dernière semaine du mois ne sert pas à sauver les ventes fragiles. Elle sert à voir lesquelles étaient déjà mal engagées.',
    url: 'https://www.laurentserre.com/blog/le-28-du-mois-vos-ventes-ne-se-sauvent-plus-elles-se-relisent',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-03-29-comite-commercial-mensuel-hero.jpg',
        width: 1536,
        height: 1024,
        alt: 'Comité commercial de fin de mois dans une PME française, avec revue lucide des affaires en cours',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le 28 du mois, vos ventes ne se sauvent plus. Elles se relisent.',
    description:
      'Quand une équipe essaie de sauver le mois dans l’urgence, elle montre surtout ce qu’elle n’a pas voulu relire plus tôt.',
    images: ['https://www.laurentserre.com/images/blog/2026-03-29-comite-commercial-mensuel-hero.jpg'],
  },
};

export default function Le28DuMoisVosVentesNeSeSauventPlusEllesSeRelisentPage() {
  return (
    <main className="bg-primary-bg text-gray-dark">
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Dirigeant / arbitrage commercial</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Le 28 du mois, vos ventes ne se sauvent plus. Elles se relisent.
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-04-27">27 avril 2026</time>
              <span>•</span>
              <span>6 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-03-29-comite-commercial-mensuel-hero.jpg"
              alt="Comité commercial de fin de mois dans une PME française, avec revue lucide des affaires en cours"
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
          <blockquote className="border-l-4 border-blue-ink pl-6 italic text-xl text-gray-700 mb-8">
            « Qu’est-ce qu’on peut encore faire tomber d’ici jeudi ? »
          </blockquote>

          <p className="mb-8">
            La scène arrive tous les mois. On est le 28. Le pipe a l’air correct sur le papier, mais le chiffre n’y est pas. Alors la réunion change de ton. On ne parle plus de progression normale. On cherche ce qui peut encore tomber vite. Une relance de plus. Une remise. Un appel du dirigeant. Un rendez-vous repris par le manager. Tout le monde essaie de sauver le mois.
          </p>

          <p className="mb-8">
            En réalité, à ce moment-là, on sauve rarement une vente. On relit surtout tout ce qu’on n’a pas voulu regarder plus tôt.
          </p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>La dernière semaine du mois ne sert pas à fabriquer des signatures.</strong> Elle sert à voir quelles affaires étaient déjà fragiles, mal lues ou maintenues en vie par confort.
            </p>
          </div>

          <p className="mb-8">
            C’est souvent là qu’on découvre que le prospect était intéressé, mais pas vraiment en train de décider. C’est là aussi qu’on voit qu’une proposition est partie trop tôt, que le vrai décideur n’a jamais été rencontré, ou que la prochaine étape n’était en fait qu’un espoir bien raconté. C’est exactement la mécanique que je décrivais déjà dans{' '}
            <Link href="/blog/pourquoi-vos-commerciaux-confondent-interet-et-decision" className="text-blue-ink font-semibold underline hover:text-mint-green">
              un prospect intéressé n’est pas encore une décision
            </Link>
            .
          </p>

          <p className="mb-8">
            Le plus coûteux, ce n’est pas la tension de fin de mois. Le plus coûteux, c’est ce qu’elle pousse à faire. On accorde une remise pour accélérer un dossier qui n’était pas prêt. On demande au manager de reprendre la main sur un rendez-vous pour tenter un sauvetage. On garde dans les prévisions une affaire qui aurait dû sortir depuis quinze jours. Et après, on appelle ça de la mobilisation commerciale.
          </p>

          <p className="mb-8">
            Souvent, ce n’est pas de la mobilisation. C’est une manière plus nerveuse de prolonger le flou. Les chiffres peuvent même paraître rassurants jusqu’au dernier moment, comme dans{' '}
            <Link href="/blog/pourquoi-un-forecast-rassurant-fait-souvent-perdre-du-temps-et-des-ventes" className="text-blue-ink font-semibold underline hover:text-mint-green">
              ces prévisions commerciales qui apaisent plus qu’elles n’éclairent
            </Link>
            . Mais à la fin du mois, le réel reprend toujours la main.
          </p>

          <p className="mb-8">
            Un dirigeant ou un directeur commercial utile, à ce moment-là, ne demande pas d’abord : « qu’est-ce qu’on peut sauver ? » Il demande : qu’est-ce qui aurait dû être nommé plus tôt ? Quelle vente a avancé sans vraie preuve ? À quel moment avons-nous commencé à raconter au lieu de relire ? Et sur quels dossiers va-t-on arrêter de courir après une signature pour remettre de l’exigence dans la lecture ?
          </p>

          <p className="mb-8">
            Parfois, la bonne décision de fin de mois n’est pas de pousser plus fort. C’est de nettoyer. Sortir deux affaires du pipe. Requalifier un devis. Refaire un débrief pendant qu’il est encore utile. Empêcher aussi le manager de devenir le pompier de service, comme dans{' '}
            <Link href="/blog/pourquoi-un-manager-commercial-reprend-trop-souvent-les-rendez-vous-a-la-place-de-lequipe" className="text-blue-ink font-semibold underline hover:text-mint-green">
              ces rendez-vous repris trop souvent à la place de l’équipe
            </Link>
            .
          </p>

          <div className="my-10 rounded-2xl border border-blue-ink/15 bg-white p-6">
            <p className="text-base text-gray-700 mb-4">
              Si vos fins de mois ressemblent trop souvent à une opération de sauvetage, on peut reprendre votre lecture du pipe, vos critères de décision et vos rituels de revue d’affaires.
            </p>
            <Link href="/diagnostic" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
              Demander un diagnostic commercial
            </Link>
          </div>

          <p className="mb-8">
            Le 28 du mois n’est pas le jour où l’on voit soudain la vérité. C’est le jour où la vérité coûte plus cher à éviter.
          </p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vos fins de mois vous obligent-elles encore à sauver des ventes fragiles ?</h3>
            <p className="mb-6">
              On peut reprendre vos prévisions, vos critères de lecture des affaires et le niveau d’exigence de vos revues commerciales.
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
