import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Pipeline commercial PME : construire un outil fiable qui prédit votre CA | Laurent Serre',
  description:
    'Comment construire un pipeline commercial fiable qui permet de vraiment anticiper votre chiffre d\'affaires. Les indicateurs à suivre, les erreurs à éviter, et le format de revue hebdomadaire qui fait la différence.',
  keywords:
    'pipeline commercial, pilotage commercial PME, construction pipeline, indicateurs pipeline, revue de pipeline, gestion équipe commerciale, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/pipeline-commercial-pme-comment-construire-un-outil-qui-predit-vraiment-votre-chiffre',
  },
  openGraph: {
    title: 'Pipeline commercial PME : construire l\'outil qui prédit votre chiffre d\'affaires',
    description:
      'Un pipeline commercial mal construit donne une fausse confiance. Voici comment le structurer, les indicateurs à suivre, et comment rendre la revue hebdomadaire utile.',
    url: 'https://www.laurentserre.com/blog/pipeline-commercial-pme-comment-construire-un-outil-qui-predit-vraiment-votre-chiffre',
    type: 'article',
    locale: 'fr_FR',
    images: ['https://www.laurentserre.com/images/blog/2026-05-05-pipeline-commercial-pme-hero.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pipeline commercial PME : construire un outil fiable | Laurent Serre',
    description:
      'Comment construire un pipeline commercial fiable, indicateurs à suivre, erreurs à éviter et revue de pipeline efficace.',
    images: ['https://www.laurentserre.com/images/blog/2026-05-05-pipeline-commercial-pme-hero.webp'],
  },
};

export default function PipelineCommercialPme() {
  const articleUrl = 'https://www.laurentserre.com/blog/pipeline-commercial-pme-comment-construire-un-outil-qui-predit-vraiment-votre-chiffre';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': articleUrl + '#posting',
        headline: 'Pipeline commercial PME : construire un outil fiable qui prédit votre chiffre d\'affaires',
        description:
          'Comment construire un pipeline commercial fiable qui permet de vraiment anticiper votre chiffre d\'affaires. Les indicateurs à suivre, les erreurs à éviter, et le format de revue hebdomadaire qui fait la différence.',
        image: 'https://www.laurentserre.com/images/blog/2026-05-05-pipeline-commercial-pme-hero.webp',
        datePublished: '2026-05-05',
        dateModified: '2026-05-05',
        author: {
          '@type': 'Person',
          name: 'Laurent Serre',
          url: 'https://www.laurentserre.com/a-propos',
          sameAs: [
            'https://www.linkedin.com/in/laurentserre34/',
            'https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/',
          ],
        },
        publisher: {
          '@type': 'Organization',
          name: 'Laurent Serre Développement',
          url: 'https://www.laurentserre.com',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl,
        },
        articleSection: 'Pilotage commercial / pipeline',
        keywords: ['pipeline commercial', 'pilotage commercial PME', 'construction pipeline', 'indicateurs pipeline', 'revue de pipeline', 'gestion équipe commerciale'],
      },
      {
        '@type': 'FAQPage',
        '@id': articleUrl + '#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Qu\'est-ce qu\'un pipeline commercial ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Un pipeline commercial est un outil de projection qui permet de répondre à deux questions : combien de chiffre d\'affaires vais-je réaliser dans les 30, 60, 90 prochains jours, et que dois-je faire maintenant pour sécuriser les affaires en cours et en ouvrir de nouvelles. Pour être fiable, il doit être propre, structuré et vivant.'
            }
          },
          {
            '@type': 'Question',
            name: 'Quelles sont les étapes d\'un pipeline commercial bien structuré ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les étapes clés pour une PME B2B sont : 1) Prospect identifié, 2) Premier contact établi, 3) Découverte réalisée, 4) Proposition envoyée, 5) Négociation en cours, 6) Signature. Chaque étape doit avoir un critère d\'entrée clair pour garantir la fiabilité du pipeline.'
            }
          },
          {
            '@type': 'Question',
            name: 'Quels sont les indicateurs clés à suivre dans un pipeline commercial ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les 4 indicateurs essentiels sont : 1) Le volume total pondéré (probabilité de closing par étape), 2) L\'âge moyen des affaires par étape, 3) Le taux de transformation par étape, 4) La vélocité du pipeline (temps moyen entre premier contact et signature).'
            }
          },
          {
            '@type': 'Question',
            name: 'Quelles sont les erreurs les plus fréquentes dans un pipeline ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les 5 erreurs principales : 1) Des affaires sans date de prochaine action, 2) Des montants fictifs non basés sur la découverte, 3) Des probabilités de closing au doigt mouillé, 4) Ne jamais sortir les affaires perdues, 5) Ne réviser le pipeline qu\'une fois par mois au lieu d\'une revue hebdomadaire.'
            }
          },
          {
            '@type': 'Question',
            name: 'Comment rendre une revue de pipeline hebdomadaire efficace ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Format efficace pour une équipe de 5 commerciaux en 45 minutes : 5 minutes de vision globale (volume total vs objectif), 30 minutes sur les affaires prioritaires (proches de la signature, bloquées, grandes opportunités), et 10 minutes d\'actions concrètes pour la semaine. Poser des questions, ne pas assener des verdicts, et toujours terminer par des décisions concrètes.'
            }
          },
          {
            '@type': 'Question',
            name: 'Quand et comment nettoyer son pipeline commercial ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'En continu par l\'équipe, avec une revue hebdomadaire structurée. Action immédiate : passer 1 heure dans le CRM pour clore toutes les affaires sans activité depuis plus de 60 jours, vérifier que chaque affaire a une date de prochaine action et un montant réaliste, et planifier la première revue de pipeline structurée.'
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': articleUrl + '#howto',
        name: '3 actions pour nettoyer votre pipeline commercial cette semaine',
        description: 'Un pipeline propre donne une vision claire. Voici les trois actions concrètes à réaliser dès cette semaine pour fiabiliser votre outil de pilotage commercial.',
        estimatedCost: { '@type': 'MonetaryAmount', name: 'Gratuit (temps interne uniquement)' },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Passer 1 heure dans votre CRM à clore les affaires mortes',
            text: 'Fermez et archivez toutes les affaires sans activité depuis plus de 60 jours. Un pipeline nettoyé des « cadavres » donne une vision réaliste de votre portefeuille et évite les fausses projections.'
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Vérifier chaque affaire ouverte',
            text: 'Pour chaque affaire restante, confirmez qu\'elle a une date de prochaine action planifiée et un montant réaliste basé sur les informations de découverte. Corrigez les anomalies immédiatement.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Planifier la première revue de pipeline structurée',
            text: 'Organisez une réunion de 45 minutes avec votre équipe en utilisant le format en 3 temps : vision globale (5 min), focus affaires prioritaires (30 min), actions de la semaine (10 min).'
          }
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <main className="bg-primary-bg text-gray-dark">
        <section className="py-24 sm:py-32 pb-14 sm:pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
                <span className="font-title font-semibold text-mint-green text-sm">Pilotage commercial / pipeline</span>
              </div>

              <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
                Pipeline commercial PME : construire un outil fiable qui prédit votre chiffre d&apos;affaires
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Un pipeline commercial mal construit, c&apos;est pire que pas de pipeline.
                Ça vous donne une fausse confiance. Voici comment le construire pas à pas.
              </p>

              <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
                <div className="flex items-center gap-2">
                  <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                  <span>Laurent Serre</span>
                </div>
                <span>•</span>
                <time dateTime="2026-05-05">5 mai 2026</time>
                <span>•</span>
                <span>8 min de lecture</span>
              </div>
            </div>
          </div>
        </section>

        {/* Hero image */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/blog/2026-05-05-pipeline-commercial-pme-hero.webp"
              alt="Pipeline commercial PME — construire un outil qui prédit votre chiffre d'affaires"
              width={1792}
              height={1024}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>

        <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Sommaire">
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 mb-8">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">📋 Au sommaire</p>
            <ol className="space-y-2 text-sm">
              <li><a href="#definition" className="text-blue-ink hover:text-mint-green transition-colors">Ce qu&apos;est vraiment un pipeline commercial</a></li>
              <li><a href="#etapes" className="text-blue-ink hover:text-mint-green transition-colors">Les étapes d&apos;un pipeline bien structuré</a></li>
              <li><a href="#indicateurs" className="text-blue-ink hover:text-mint-green transition-colors">Les indicateurs à suivre dans votre pipeline</a></li>
              <li><a href="#erreurs" className="text-blue-ink hover:text-mint-green transition-colors">Les 5 erreurs qui polluent votre pipeline</a></li>
              <li><a href="#revue" className="text-blue-ink hover:text-mint-green transition-colors">La revue de pipeline : comment la rendre utile</a></li>
              <li><a href="#actions" className="text-blue-ink hover:text-mint-green transition-colors">3 actions pour nettoyer votre pipeline cette semaine</a></li>
            </ol>
          </div>
        </nav>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="prose prose-lg max-w-none">
            <div className="bg-mint-green/10 border border-mint-green/30 rounded-2xl p-6 mb-10">
              <p className="font-title font-bold text-blue-ink text-sm uppercase tracking-wider mb-3">🎯 Ce que vous allez retenir</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Un pipeline fiable repose sur trois qualités</strong> : il doit être propre, structuré et vivant — pas une liste statique dans un CRM.</li>
                <li><strong>4 indicateurs clés</strong> pour piloter : volume pondéré, âge des affaires, taux de transformation par étape et vélocité.</li>
                <li><strong>5 erreurs qui faussent tout</strong> : affaires sans date, montants fictifs, probabilités au doigt mouillé, absence de purge, revue trop espacée.</li>
                <li><strong>Revue hebdomadaire en 3 temps</strong> : 5 min vision globale → 30 min affaires prioritaires → 10 min actions concrètes.</li>
                <li><strong>3 actions immédiates</strong> : purger le CRM, vérifier chaque affaire, planifier la première revue structurée.</li>
              </ul>
            </div>

            <h2 id="definition" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Ce qu&apos;est vraiment un pipeline commercial</h2>

            <p className="mb-8">Un pipeline commercial, ce n&apos;est pas une liste d&apos;affaires dans un CRM. C&apos;est un outil de projection qui vous permet de répondre à deux questions précises :</p>

            <ol className="mb-8 space-y-2 list-decimal ml-6">
              <li>Combien de chiffre d&apos;affaires vais-je réaliser dans les 30, 60, 90 prochains jours ?</li>
              <li>Que dois-je faire maintenant pour sécuriser les affaires en cours et en ouvrir de nouvelles ?</li>
            </ol>

            <p className="mb-8">Pour qu&apos;il réponde à ces questions, votre pipeline doit avoir trois qualités : il doit être propre, structuré et vivant.</p>

            <h2 id="etapes" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Les étapes d&apos;un pipeline bien structuré</h2>

            <p className="mb-4">Chaque affaire dans votre pipeline doit être clairement positionnée dans une étape précise du cycle de vente. Ces étapes doivent refléter la réalité de votre processus commercial — pas un modèle générique copié depuis la doc de votre CRM.</p>

            <p className="mb-4">Voici les étapes qui fonctionnent pour la plupart des PME B2B :</p>

            <ol className="mb-8 space-y-3 list-decimal ml-6">
              <li><strong>Prospect identifié</strong> : vous avez identifié une opportunité potentielle, premier contact à établir</li>
              <li><strong>Premier contact établi</strong> : vous avez eu un échange, l&apos;intérêt est confirmé</li>
              <li><strong>Découverte réalisée</strong> : vous avez compris les enjeux, les besoins, le budget et les décideurs</li>
              <li><strong>Proposition envoyée</strong> : une offre formelle a été transmise</li>
              <li><strong>Négociation en cours</strong> : des ajustements sont en discussion</li>
              <li><strong>Signature</strong> : l&apos;affaire est conclue</li>
            </ol>

            <p className="mb-8">La clé : chaque étape doit avoir un critère d&apos;entrée clair. Une affaire ne passe en &laquo; Proposition envoyée &raquo; que si les critères de découverte sont remplis. Pas avant.</p>

            <h2 id="indicateurs" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Les indicateurs à suivre dans votre pipeline</h2>

            <p className="mb-8">Un pipeline sans indicateurs, c&apos;est un tableau. Pour piloter, vous avez besoin de chiffres.</p>

            <div className="bg-slate-50 rounded-xl p-6 mb-6">
              <p className="font-semibold mb-3">Les 4 indicateurs clés :</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-blue-ink/10">
                      <th className="text-left px-4 py-3 font-title font-semibold text-blue-ink border border-blue-ink/20 w-[30%]">Indicateur</th>
                      <th className="text-left px-4 py-3 font-title font-semibold text-blue-ink border border-blue-ink/20">Ce que ça mesure</th>
                      <th className="text-left px-4 py-3 font-title font-semibold text-blue-ink border border-blue-ink/20 w-[25%]">Impact si négligé</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-medium border border-blue-ink/20">Volume total pondéré</td>
                      <td className="px-4 py-3 border border-blue-ink/20">Probabilité de closing par étape (Découverte = 30%, Proposition = 60%, Négociation = 80%). Multipliez chaque montant par sa probabilité.</td>
                      <td className="px-4 py-3 border border-blue-ink/20 text-gray-600">Prévision surestimée, pilotage aux&nbsp;sentiments</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-3 font-medium border border-blue-ink/20">Âge moyen des affaires par&nbsp;étape</td>
                      <td className="px-4 py-3 border border-blue-ink/20">Une affaire en &laquo; Proposition envoyée &raquo; depuis 45 jours alors que le cycle moyen est de 30 jours.</td>
                      <td className="px-4 py-3 border border-blue-ink/20 text-gray-600">Pipeline encombré, fausse confiance sur des deals&nbsp;morts</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-medium border border-blue-ink/20">Taux de transformation par&nbsp;étape</td>
                      <td className="px-4 py-3 border border-blue-ink/20">Sur 10 affaires en découverte, combien passent en proposition ? Ces ratios révèlent vos points de friction.</td>
                      <td className="px-4 py-3 border border-blue-ink/20 text-gray-600">Goulots d&apos;étranglement invisibles, perte de&nbsp;CA</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-3 font-medium border border-blue-ink/20">Vélocité du pipeline</td>
                      <td className="px-4 py-3 border border-blue-ink/20">Temps moyen entre le premier contact et la signature. Réduire ce délai de 20% peut avoir un impact massif sur le CA annuel.</td>
                      <td className="px-4 py-3 border border-blue-ink/20 text-gray-600">Cycles longs, CA prévisible en&nbsp;berne</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Les standards de gestion de pipeline présentés ici sont alignés sur les meilleures pratiques du secteur. Voir aussi le <a href="https://www.salesforce.com/sales/pipeline/management/" target="_blank" rel="noopener noreferrer" className="text-mint-green hover:underline">guide complet Salesforce Sales Pipeline Management</a>.
              </p>
            </div>

            <h2 id="erreurs" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Les 5 erreurs qui polluent votre pipeline</h2>

            <div className="space-y-6 mb-8">
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                <p className="font-title font-bold text-blue-ink mb-2">Erreur 1 : Des affaires sans date de prochaine action</p>
                <p className="text-sm text-gray-600">Si une affaire n&apos;a pas de date de prochain contact planifié, elle est morte — ou presque. Chaque affaire doit avoir une prochaine action datée.</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                <p className="font-title font-bold text-blue-ink mb-2">Erreur 2 : Des montants fictifs</p>
                <p className="text-sm text-gray-600">&laquo; J&apos;ai mis 50 000€ mais ça pourrait être entre 10 000€ et 200 000€. &raquo; Ce n&apos;est pas un pipeline, c&apos;est un espoir. Travaillez à avoir des montants réalistes basés sur les informations de découverte.</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                <p className="font-title font-bold text-blue-ink mb-2">Erreur 3 : Des probabilités au doigt mouillé</p>
                <p className="text-sm text-gray-600">&laquo; Je sens que ça va signer. &raquo; Intuition ≠ probabilité. Basez vos probabilités sur l&apos;étape du processus et des critères objectifs.</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                <p className="font-title font-bold text-blue-ink mb-2">Erreur 4 : Ne jamais sortir les affaires perdues</p>
                <p className="text-sm text-gray-600">Les affaires perdues ou gelées doivent être fermées et archivées. Garder des cadavres dans votre pipeline fausse toutes vos projections.</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                <p className="font-title font-bold text-blue-ink mb-2">Erreur 5 : Ne réviser le pipeline qu&apos;une fois par mois</p>
                <p className="text-sm text-gray-600">Un pipeline qui n&apos;est pas mis à jour en temps réel devient obsolète rapidement. Votre équipe doit le maintenir en continu, et vous devez le réviser en revue commerciale hebdomadaire.</p>
              </div>
            </div>

            <h2 id="revue" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">La revue de pipeline : comment la rendre utile</h2>

            <p className="mb-8">La revue de pipeline hebdomadaire est votre outil de pilotage principal. Mais mal conduite, elle devient une réunion de torture où les commerciaux récitent des chiffres et le manager s&apos;énerve.</p>

            <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-xl p-6 mb-8">
              <p className="font-semibold mb-3">Format efficace d&apos;une revue de pipeline (45 minutes, équipe de 5 commerciaux) :</p>
              <ul className="space-y-2">
                <li><strong>5 minutes</strong> : vision globale — volume total, pipeline par commercial vs objectif</li>
                <li><strong>30 minutes</strong> : focus sur les affaires prioritaires (10 min sur les affaires proches de la signature, 10 min sur les affaires bloquées, 10 min sur les grandes opportunités récentes)</li>
                <li><strong>10 minutes</strong> : actions de la semaine — qui fait quoi, pour quand</li>
              </ul>
            </div>

            <p className="mb-8">Deux règles d&apos;or : posez des questions, n&apos;assenez pas des verdicts. Et terminez toujours par des décisions concrètes.</p>

            <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
              <p className="text-xl font-title font-bold mb-4">Vous sentez que votre pipeline manque de fiabilité ?</p>
              <p className="mb-6 text-white/90">
                Un diagnostic commercial permet d&apos;identifier les vrais blocages, de fiabiliser vos prévisions et de remettre de la méthode dans votre pilotage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                  Demander un diagnostic commercial
                </Link>
                <Link href="/bootcamp" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                  Découvrir le bootcamp
                </Link>
              </div>
            </div>

            <h2 id="actions" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">3 actions pour nettoyer votre pipeline cette semaine</h2>

            <ol className="space-y-6 mb-8">
              <li><strong>Passez 1 heure dans votre CRM</strong> à clore toutes les affaires sans activité depuis plus de 60 jours. Pipeline propre = vision claire. (Si le CRM est un problème en soi, <Link href="/blog/pourquoi-vos-commerciaux-remplissent-mal-le-crm-et-utilisent-mal-lia" className="text-mint-green hover:underline">l&apos;article sur le CRM et l&apos;IA</Link> peut vous aider à poser un diagnostic.)</li>
              <li><strong>Vérifiez que chaque affaire ouverte</strong> a une date de prochaine action et un montant réaliste. Corrigez les anomalies.</li>
              <li><strong>Planifiez votre première revue de pipeline structurée</strong> avec votre équipe, en utilisant le format en 3 temps décrit plus haut. Si le passage du commercial au manager est un sujet, la page sur la <Link href="/transformation-commerciale" className="text-mint-green hover:underline">transformation commerciale</Link> détaille comment structurer cette transition.</li>
            </ol>

            <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
              <p className="text-lg font-title font-bold text-blue-ink mb-4">📚 Pour aller plus loin sur le pilotage de pipeline</p>
              <ul className="space-y-3 text-sm">
                <li><Link href="/blog/pipeline-fantome-lundi-matin-test-9-minutes" className="text-mint-green hover:underline font-medium">Pipeline fantôme : le test des 9 minutes du lundi matin</Link> — Un test simple pour repérer les faux deals avant qu&apos;ils ne faussent votre forecast.</li>
                <li><Link href="/blog/pipeline-commercial-q2-2026-5-decisions-dirigeant" className="text-mint-green hover:underline font-medium">Pipeline commercial Q2 2026 : 5 décisions de dirigeant pour sécuriser le CA</Link> — Les arbitrages concrets pour fiabiliser votre pipeline en période de clôture de trimestre.</li>
                <li><Link href="/blog/debut-avril-recharger-pipeline-sans-brader-t2" className="text-mint-green hover:underline font-medium">Recharger son pipeline sans brader en T2</Link> — Comment reconstituer un portefeuille d&apos;opportunités sans casser les prix ni dégrader la marge.</li>
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-8 mt-12">
              <p className="text-gray-600 italic mb-4">
                Un pipeline commercial fiable, c&apos;est votre boule de cristal commerciale. Mais comme toute boule de cristal, elle ne fonctionne que si vous la nettoyez régulièrement.
              </p>
              <p className="text-gray-600">
                Pour un diagnostic complet de votre organisation commerciale, venez <Link href="/diagnostic" className="text-mint-green hover:underline">parler de votre situation</Link>.
              </p>
            </div>
          </div>
        </article>

        <section className="py-16 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-4 text-center">
              Besoin d&apos;en parler plus directement ?
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Si votre situation mérite un échange plus direct, vous pouvez aussi laisser un message ici.
            </p>
            <HubSpotForm />
          </div>
        </section>
      </main>
    </>
  );
}
