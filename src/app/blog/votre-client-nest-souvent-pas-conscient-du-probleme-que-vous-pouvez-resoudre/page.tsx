import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Votre client n’est souvent pas conscient du problème que vous pouvez résoudre | Laurent Serre',
  description:
    'Un client formule rarement son vrai problème du premier coup. Le rôle du commercial est d’aider à distinguer la demande visible, l’enjeu réel et les conséquences concrètes.',
  keywords:
    'besoin client, découverte commerciale, enjeu réel client, entretien commercial, vente B2B PME, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/votre-client-nest-souvent-pas-conscient-du-probleme-que-vous-pouvez-resoudre',
  },
  openGraph: {
    title: 'Votre client n’est souvent pas conscient du problème que vous pouvez résoudre',
    description:
      'Répondre à la demande visible ne suffit pas. Une vraie vente commence quand le client comprend ce que son problème lui coûte.',
    url: 'https://www.laurentserre.com/blog/votre-client-nest-souvent-pas-conscient-du-probleme-que-vous-pouvez-resoudre',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-04-29-besoin-reel-enjeu-client-hero.png',
        width: 1536,
        height: 1024,
        alt: 'Laurent Serre en rendez-vous commercial aide un dirigeant de PME à clarifier le vrai problème derrière une demande client',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Votre client n’est souvent pas conscient du problème que vous pouvez résoudre',
    description:
      'Une demande exprimée donne le point de départ. L’enjeu réel et les conséquences concrètes donnent la priorité.',
    images: ['https://www.laurentserre.com/images/blog/2026-04-29-besoin-reel-enjeu-client-hero.png'],
  },
};

export default function VotreClientNestSouventPasConscientDuProblemePage() {
  return (
    <main className="bg-primary-bg text-gray-dark">
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Découverte commerciale / besoin client</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Votre client n’est souvent pas conscient du problème que vous pouvez résoudre
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-04-29">29 avril 2026</time>
              <span>•</span>
              <span>6 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-04-29-besoin-reel-enjeu-client-hero.png"
              alt="Laurent Serre en rendez-vous commercial aide un dirigeant de PME à clarifier le vrai problème derrière une demande client"
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
          <p className="mb-8">Un client formule rarement son vrai problème du premier coup.</p>

          <p className="mb-8">Il formule ce qu’il voit. Ce qui l’agace. Ce qu’il croit devoir demander. Ce qu’il a déjà vu ailleurs. Ce que quelqu’un dans son équipe lui a soufflé avant le rendez-vous.</p>

          <p className="mb-8">Mais entre ce qu’il demande et ce qui compte vraiment pour lui, il y a souvent un écart énorme.</p>

          <p className="mb-8">Un dirigeant dit qu’il veut “plus de leads”. En réalité, il ne supporte plus que son chiffre d’affaires dépende de deux commerciaux historiques et de quelques recommandations qui tombent quand elles veulent.</p>

          <p className="mb-8">Un responsable demande une animation, une application, une démonstration, un outil. En réalité, il cherche parfois à réduire un risque, à calmer une tension interne, à montrer à sa hiérarchie qu’il reprend la main, ou à éviter qu’un problème déjà connu ne finisse par lui exploser à la figure.</p>

          <p className="mb-8">Si le commercial prend la première phrase pour argent comptant, il va répondre à la demande.</p>

          <p className="mb-8">Et c’est souvent là que la vente dérape.</p>

          <p className="mb-8">Parce qu’il va présenter son produit. Détailler les fonctionnalités. Expliquer ce qui est possible. Proposer une adaptation. Montrer qu’il a compris la demande visible.</p>

          <p className="mb-8">Mais il n’a pas encore touché l’enjeu réel.</p>

          <p className="mb-8">Je vois souvent cette confusion dans les rendez-vous commerciaux. Le client parle d’un besoin. Le commercial entend une opportunité. Alors il part vite vers sa solution. Trop vite. C’est la même dérive que lorsque <Link href="/blog/pourquoi-vos-commerciaux-parlent-trop-tot-des-solutions">vos commerciaux parlent trop tôt des solutions</Link>.</p>

          <p className="mb-8">Un besoin formulé, c’est : “il nous faudrait un outil pour mieux suivre les demandes des administrés”.</p>

          <p className="mb-8">Un enjeu réel, c’est : “si les habitants ont l’impression que rien ne remonte, le maire prend la pression, les agents se retrouvent exposés, et la dégradation du quartier devient visible politiquement”.</p>

          <p className="mb-8">Ce n’est pas le même rendez-vous.</p>

          <p className="mb-8">Dans le premier cas, on compare des outils. Dans le deuxième, on parle de responsabilité, de tranquillité publique, de confiance et de capacité à agir vite.</p>

          <p className="mb-8">Un besoin formulé, c’est : “on aimerait quelque chose pour sensibiliser nos équipes aux accidents de chantier”.</p>

          <p className="mb-8">Un enjeu réel, c’est : “un accident grave coûte cher, désorganise l’exploitation, abîme l’entreprise, augmente la pression assurance et laisse parfois des traces humaines pendant des années”.</p>

          <p className="mb-8">Là non plus, ce n’est pas la même discussion.</p>

          <p className="mb-8">Tant qu’on reste au niveau de la demande, le client peut discuter gentiment. Il peut trouver l’idée intéressante. Il peut demander une brochure, un devis, une démo.</p>

          <p className="mb-8">Mais il n’est pas encore obligé de bouger.</p>

          <p className="mb-8">Ce qui fait bouger un client, ce n’est pas seulement le besoin. C’est la conséquence.</p>

          <p className="mb-8">Combien ça coûte de ne rien changer ? Qu’est-ce que ça bloque ? Qui subit le problème ? Depuis combien de temps l’équipe s’en accommode ? Qu’est-ce qui se passera si, dans six mois, rien n’a changé ?</p>

          <p className="mb-8">C’est là que le rendez-vous devient sérieux.</p>

          <p className="mb-8">Le rôle du commercial n’est donc pas de faire semblant que tout est clair dans la demande du client. Ce serait confortable, mais faux.</p>

          <p className="mb-8">Son rôle est d’aider le client à mettre le doigt sur son besoin réel, son enjeu fondamental.</p>

          <p className="mb-8">Pas pour le manipuler. Pas pour lui faire dire ce qu’on veut entendre. Mais pour distinguer trois choses qui sont trop souvent mélangées : la demande exprimée, l’enjeu réel et les conséquences concrètes.</p>

          <p className="mb-8">La demande exprimée donne le point de départ.</p>

          <p className="mb-8">L’enjeu réel donne la raison de s’intéresser sérieusement au sujet.</p>

          <p className="mb-8">Les conséquences concrètes donnent la mesure de la priorité.</p>

          <p className="mb-8">Si votre équipe commerciale ne fait pas ce travail, elle risque de vendre à côté.</p>

          <p className="mb-8">Elle répondra proprement à la question posée. Elle fera une bonne présentation. Elle enverra une proposition cohérente.</p>

          <p className="mb-8">Et le client dira peut-être : “c’est intéressant, je vais y réfléchir”.</p>

          <p className="mb-8">Non pas parce que l’offre est mauvaise.</p>

          <p className="mb-8">Mais parce que personne n’a vraiment aidé le client à formuler pourquoi le sujet méritait de devenir une décision. Un bon échange ne suffit pas : <Link href="/blog/pourquoi-vos-commerciaux-confondent-interet-et-decision">un prospect intéressé n’est pas encore une décision</Link>.</p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <p className="mb-6">
              Si vos commerciaux répondent souvent à la première demande sans faire émerger l’enjeu réel, on peut reprendre vos rendez-vous, vos questions de découverte et vos critères de décision.
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

          <p className="mb-8">Un bon entretien commercial ne consiste pas à sauter sur le besoin déclaré.</p>

          <p className="mb-8">Il consiste à écouter la première demande, puis à chercher ce qu’elle cache de plus important.</p>

          <p className="mb-8">C’est souvent là que commence la vraie vente.</p>

          <p className="mb-8">Pas quand le client dit ce qu’il veut.</p>

          <p className="mb-8">Quand il comprend enfin ce que son problème lui coûte.</p>
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
