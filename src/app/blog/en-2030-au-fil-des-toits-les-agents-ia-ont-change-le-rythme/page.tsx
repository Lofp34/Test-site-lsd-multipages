import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'En 2030, chez Au Fil des Toits, les agents IA ont changé le rythme | Laurent Serre',
  description:
    'À partir d’une base bien réelle, voilà à quoi pourrait ressembler en 2030 la transformation d’une PME de couverture comme Au Fil des Toits grâce à des agents IA vraiment utiles.',
  keywords:
    'agents IA PME, Au Fil des Toits, transformation PME 2030, couverture toiture, IA commerce operations, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/en-2030-au-fil-des-toits-les-agents-ia-ont-change-le-rythme',
  },
  openGraph: {
    title: 'En 2030, chez Au Fil des Toits, les agents IA ont changé le rythme',
    description:
      'Projection 2030, concrète et assumée, sur la manière dont des agents IA peuvent transformer une PME de couverture sans tomber dans la science-fiction.',
    url: 'https://www.laurentserre.com/blog/en-2030-au-fil-des-toits-les-agents-ia-ont-change-le-rythme',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-04-16-au-fil-des-toits-agents-ia-hero.jpg',
        width: 2528,
        height: 1696,
        alt: 'Illustration éditoriale stylisée de Laurent Serre et Sacha sur un toit avec des tableaux de bord d’agents IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'En 2030, chez Au Fil des Toits, les agents IA ont changé le rythme',
    description:
      'Une projection terrain, crédible et très PME, de ce que des agents IA peuvent changer dans une entreprise de couverture.',
    images: ['https://www.laurentserre.com/images/blog/2026-04-16-au-fil-des-toits-agents-ia-hero.jpg'],
  },
};

export default function En2030AuFilDesToitsLesAgentsIaOntChangeLeRythmePage() {
  return (
    <main className="bg-primary-bg text-gray-dark">
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">IA utile / transformation PME terrain</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              En 2030, chez Au Fil des Toits, les agents IA ont changé le rythme
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-04-16">16 avril 2026</time>
              <span>•</span>
              <span>7 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-04-16-au-fil-des-toits-agents-ia-hero.jpg"
              alt="Illustration éditoriale stylisée de Laurent Serre et Sacha sur un toit avec des tableaux de bord d’agents IA"
              width={2528}
              height={1696}
              className="w-full h-auto object-cover object-center rounded-2xl shadow-lg"
              quality={80}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Aujourd’hui, Au Fil des Toits existe bien. Entretien, couverture, réparation, rénovation. Des particuliers, des pros, une promesse claire, prolonger la durée de vie des toitures, plusieurs agences déjà visibles, Montpellier, Nîmes, Béziers, puis Lyon, Bordeaux et Paris. La base est réelle. Ce qui suit est une projection assumée vers 2030.
          </p>

          <p className="mb-8">
            Et justement, c’est là que le sujet devient intéressant.
          </p>

          <p className="mb-8">
            En 2030, tout n’a pas changé chez Au Fil des Toits. Les toits fuient toujours. Les urgences tombent mal. Les devis mal cadrés coûtent toujours de la marge. Les équipes terrain ont toujours besoin de coordination propre. En revanche, le rythme de l’entreprise, lui, n’a plus rien à voir.
          </p>

          <p className="mb-8">
            Un lundi matin, Sacha ouvre son cockpit. Pas un gadget. Un poste de pilotage simple. Un agent lui remonte les zones géographiques où la prospection bâtiment repart. Un autre compare les demandes entrantes, les taux de signature, les temps de cycle et les trous de planning. Un troisième lui signale qu’une offre maintenance a plus de chances de rentrer sur un parc d’immeubles à Lyon que sur des interventions diffuses à Bordeaux cette semaine. La direction ne passe plus ses journées à courir après l’information. Elle arbitre plus vite, sur du réel.
          </p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>Le premier changement n’est pas technologique. C’est managérial : l’entreprise voit enfin clair assez tôt pour agir avant d’être débordée.</strong>
            </p>
          </div>

          <p className="mb-8">
            Côté commerce, le basculement est encore plus visible. Avant, un commercial appelait, relançait, reprenait ses notes, refaisait un devis, oubliait une pièce, attendait une validation, puis relançait encore. En 2030, les agents font le sale boulot administratif sans toucher à la relation. Ils préparent les listes de prospection par typologie de bâtiments, rédigent les brouillons d’emails selon l’historique, rappellent les pièces manquantes, préparent les devis à partir des constats terrain et poussent le dossier jusqu’à la signature. Le commercial garde ce qui compte, comprendre l’enjeu, rassurer, qualifier, négocier, conclure.
          </p>

          <p className="mb-8">
            La différence, ce n’est pas qu’il envoie plus de messages. C’est qu’il oublie beaucoup moins de dossiers valables. Dans une PME, c’est énorme. Quelques devis sérieux repris au bon moment, quelques contrats d’entretien mieux suivis, quelques signatures qui ne se perdent plus dans le bruit, et vous changez déjà l’année.
          </p>

          <p className="mb-8">
            Sur les chantiers, le gain est encore plus concret parce qu’il se voit tout de suite. Un agent recoupe les urgences, les compétences disponibles, les contraintes SS4 amiante, les temps de trajet, la météo et les engagements clients. Un autre suit l’avancement chantier à partir des photos, des messages et des comptes rendus vocaux des équipes. Résultat, moins d’allers-retours absurdes, moins d’oublis de matériel, moins de journées qui glissent parce qu’une information est restée dans le téléphone de quelqu’un.
          </p>

          <p className="mb-8">
            Je prends un exemple très simple. Un client pro appelle pour une fuite sur un site déjà entretenu par l’entreprise. En 2025, il faut parfois reconstituer l’historique, retrouver les précédentes interventions, vérifier qui peut bouger, rappeler le client, recalculer le planning. En 2030, l’agent a déjà rapproché le contrat, les photos passées, les contraintes du site, les équipes proches et la fenêtre météo. Le conducteur de travaux n’a plus à courir après le puzzle. Il tranche. Plus vite. Mieux.
          </p>

          <p className="mb-8">
            C’est aussi là que beaucoup de fantasmes sur l’IA tombent. Les agents ne remplacent pas les couvreurs. Ils ne montent pas sur le toit. Ils ne rassurent pas un client inquiet à la place de l’équipe. En revanche, ils retirent une masse énorme de micro-frictions qui épuisent tout le monde et bouffent la marge sans bruit. C’est le même sujet que dans{' '}
            <Link href="/blog/pourquoi-ia-sans-plan-vente-produit-surtout-bruit" className="text-blue-ink font-semibold underline hover:text-mint-green">
              Pourquoi l’IA sans plan de vente produit surtout du bruit
            </Link>
            {' '}et dans{' '}
            <Link href="/blog/pourquoi-vos-commerciaux-remplissent-mal-le-crm-et-utilisent-mal-lia" className="text-blue-ink font-semibold underline hover:text-mint-green">
              Pourquoi vos commerciaux remplissent mal le CRM… et utilisent mal l’IA
            </Link>
            . Si la boîte est floue, l’IA accélère le flou. Si la boîte est structurée, elle accélère l’exécution.
          </p>

          <p className="mb-8">
            L’administratif et le financier, enfin, arrêtent de jouer en retard. En 2030, un agent vérifie les pièces avant facturation, un autre relance selon la réalité client, un autre remonte les dérives de marge par type d’intervention, par agence, par équipe, par canal d’acquisition. Alexis et Sacha n’attendent plus la fin du mois pour découvrir que certaines urgences sont rentrées vite mais sorties trop bas, ou que certains contrats d’entretien sont excellents commercialement mais mal exécutés opérationnellement.
          </p>

          <p className="mb-8">
            C’est ça, la vraie bascule. Plus de visibilité. Plus de coordination. Plus de sérénité. Pas parce que la PME est devenue une start-up futuriste. Parce qu’elle a enfin mis des agents là où les humains perdaient du temps, de l’attention et parfois du nerf.
          </p>

          <p className="mb-8">
            En 2030, chez Au Fil des Toits, les agents IA n’ont pas remplacé le savoir-faire. Ils ont remis de l’air entre la demande client, la décision, l’organisation et la facturation. Et dans une PME qui vit sur la réactivité, la qualité d’exécution et la confiance, ce n’est pas un détail. C’est un changement de niveau.
          </p>

          <p className="mb-12 font-semibold text-blue-ink">
            Le futur utile des PME ne ressemblera pas à un robot qui parle. Il ressemblera à une entreprise qui répond mieux, signe mieux, planifie mieux et dort un peu mieux.
          </p>
        </div>
      </article>

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-10">
            <h2 className="text-3xl font-title font-bold text-blue-ink mb-4">
              Vous voulez voir où des agents IA peuvent vraiment faire gagner du temps et de la marge dans votre PME ?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Je vous aide à identifier les bons points d’appui, côté direction, commerce, opérations et pilotage, sans storytelling technologique inutile.
            </p>
            <HubSpotForm />
          </div>
        </div>
      </section>
    </main>
  );
}
