import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Closing B2B : 7 techniques qui marchent (+ scripts) | Laurent Serre',
  description: 'Augmentez votre taux de closing en 90 jours sans forcer : MAP, trial close, résumé décisionnel, A/B close, business case, POC cadré, déclosing propre. Bonus : 5 scripts prêts à copier.',
  keywords: 'closing B2B, techniques de closing, MAP, trial close, business case, POC, déclosing, scripts closing, vente B2B',
  alternates: {
    canonical: 'https://laurentserre.com/blog/closing-b2b-7-techniques',
  },
  openGraph: {
    title: 'Closing B2B : 7 techniques qui marchent (+ scripts)',
    description: 'Augmentez votre taux de closing en 90 jours avec des méthodes terrain et éthiques, et 5 scripts copiables.',
    url: 'https://laurentserre.com/blog/closing-b2b-7-techniques',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://laurentserre.com/images/closing_post.png',
        width: 1200,
        height: 630,
        alt: 'Closing B2B : 7 techniques qui marchent',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Closing B2B : 7 techniques qui marchent (+ scripts)',
    description: 'Augmentez votre taux de closing en 90 jours avec des méthodes terrain et éthiques, et 5 scripts copiables.',
    images: ['https://laurentserre.com/images/closing_post.png'],
  },
};

export default function ClosingB2BTechniques() {
  return (
    <main className="bg-primary-bg text-gray-dark">
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Techniques de vente</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Closing B2B : 7 techniques qui marchent (+ scripts à copier)
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2025-10-13">13 octobre 2025</time>
              <span>•</span>
              <span>12 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/closing_post.png"
              alt="Closing B2B : 7 techniques qui marchent"
              width={1200}
              height={630}
              className="w-full h-80 object-cover object-center rounded-2xl shadow-lg"
              quality={60}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Objectif : augmenter votre taux de closing en 90 jours sans « forcer », en combinant méthodes terrain et éthique (déclosing quand nécessaire). En bonus, 5 scripts prêts à copier ci-dessous.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Les fondamentaux</h2>
          <ul className="list-disc pl-6 mb-6">
            <li><strong>Cadre Go/No-Go</strong> : définir des critères clairs, interlocuteurs clés et une prochaine étape <em>datée</em>.</li>
            <li><strong>Mutual Action Plan (MAP)</strong> : plan mutuel daté, avec responsables. Sans MAP, pas de décision, juste de l’espoir.</li>
            <li><strong>Déclosing</strong> : savoir sortir proprement quand timing/budget/fit ne sont pas réunis pour protéger votre crédibilité.</li>
          </ul>

          <div className="grid gap-4 bg-blue-ink/5 border-l-4 border-blue-ink p-6 rounded-r-xl mb-10">
            <div className="font-semibold">Cibles de pilotage</div>
            <ul className="list-disc pl-6">
              <li>≥ 85 % des opportunités avec next-step <strong>datée</strong></li>
              <li>No-show &lt; 8 %</li>
              <li>Time-to-close –15 % en 3 mois</li>
            </ul>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-2">Les 7 techniques (fiches actionnables)</h2>
          <p className="text-gray-600 mb-6">Format par technique : Quand l’utiliser • Script 30s • Variante soft/direct • Erreur fréquente → Correctif • KPI • Pour DirCo / Pour Commercial</p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-8 mb-3">1) Mutual Action Plan (MAP)</h3>
          <p className="mb-2"><strong>Quand :</strong> fin de découverte qualifiée, avant devis.</p>
          <p className="mb-2"><strong>Script 30s</strong> — « Voici un plan d’actions mutuel jusqu’à la mise en production : étapes, responsables et dates. On bloque mardi 10:00 pour valider les critères de succès et la décision go/no-go ? »</p>
          <p className="mb-2"><strong>Variante</strong> — Soft : « proposition de planning » • Direct : « verrouiller le calendrier »</p>
          <p className="mb-2"><strong>Erreur → Correctif</strong> : MAP flou → attribuer un responsable par étape + date.</p>
          <p className="mb-2"><strong>KPI</strong> : % d’opportunités avec next-step datée.</p>
          <p className="mb-6"><strong>DirCo</strong> : MAP obligatoire avant toute offre • <strong>Commercial</strong> : partager le MAP (doc simple) et le réviser en visio.</p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-8 mb-3">2) Trial Close (validation progressive)</h3>
          <p className="mb-2"><strong>Quand :</strong> pendant la découverte et la démo, pour tester l’engagement.</p>
          <p className="mb-2"><strong>Script 30s</strong> — « Si nous répondons bien à [3 critères], seriez-vous prêt à valider l’étape suivante avec votre DAF vendredi ? »</p>
          <p className="mb-2"><strong>Variante</strong> — Soft : « est-ce que ça va dans le bon sens ? » • Direct : « on valide l’étape suivante vendredi ? »</p>
          <p className="mb-2"><strong>Erreur → Correctif</strong> : questions vagues → citer 2–3 critères précis.</p>
          <p className="mb-2"><strong>KPI</strong> : % de trial closes positifs menant à une next-step.</p>
          <p className="mb-6"><strong>DirCo</strong> : standardiser 3 trial closes par étape • <strong>Commercial</strong> : préparer vos 3 critères déterminants.</p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-8 mb-3">3) Résumé décisionnel (ROI / risques / engagement)</h3>
          <p className="mb-2"><strong>Quand :</strong> fin de démo / avant offre.</p>
          <p className="mb-2"><strong>Script 30s</strong> — « Je résume : objectif –12 % de coûts SAV, risque no-show saisonnier, décision attendue le 28/10, sponsor A. Martin. On corrige/complète et on valide la prochaine étape ? »</p>
          <p className="mb-2"><strong>Variante</strong> — Soft : « je vérifie que je n’ai rien oublié » • Direct : « on valide maintenant la prochaine étape »</p>
          <p className="mb-2"><strong>Erreur → Correctif</strong> : sans date ni sponsor → ajouter les deux.</p>
          <p className="mb-2"><strong>KPI</strong> : % de résumés formalisés partagés par email.</p>
          <p className="mb-6"><strong>DirCo</strong> : template « Résumé décisionnel » obligatoire • <strong>Commercial</strong> : envoyer le résumé le jour même.</p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-8 mb-3">4) Closing alternatif (choix A/B)</h3>
          <p className="mb-2"><strong>Quand :</strong> intérêt acquis mais indécision.</p>
          <p className="mb-2"><strong>Script 30s</strong> — « Vous préférez Pack Standard (déploiement en 2 semaines) ou Pack Pro (coaching +1 mois) si on démarre lundi prochain ? »</p>
          <p className="mb-2"><strong>Variante</strong> — Soft : « deux options possibles » • Direct : « on tranche Standard ou Pro ? »</p>
          <p className="mb-2"><strong>Erreur → Correctif</strong> : A/B trop similaires → différencier valeur/délai.</p>
          <p className="mb-2"><strong>KPI</strong> : % de deals closés via option B (upsell).</p>
          <p className="mb-6"><strong>DirCo</strong> : définir 2 packs par segment • <strong>Commercial</strong> : préparer comparatif visuel (3 puces).</p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-8 mb-3">5) Business Case Close (coût de l’inaction / payback)</h3>
          <p className="mb-2"><strong>Quand :</strong> quand le prix bloque, ou pour sécuriser un achat rationnel.</p>
          <p className="mb-2"><strong>Script 30s</strong> — « À 480 €/mois, on évite 3 pannes/mois (200 € chacune) + 2 h d’astreinte (70 €/h). Payback ≈ 3,2 mois. Si on capte 80 % de ce gain, on lance le POC lundi ? »</p>
          <p className="mb-2"><strong>Variante</strong> — Soft : « validons les hypothèses ensemble » • Direct : « on acte le POC lundi »</p>
          <p className="mb-2"><strong>Erreur → Correctif</strong> : hypothèses floues → bornes basses, sources.</p>
          <p className="mb-2"><strong>KPI</strong> : % d’offres avec business case chiffré.</p>
          <p className="mb-6"><strong>DirCo</strong> : gabarit de calcul standard (variables) • <strong>Commercial</strong> : faire valider les hypothèses par le sponsor.</p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-8 mb-3">6) Proof / Pilot Close (POC cadré)</h3>
          <p className="mb-2"><strong>Quand :</strong> deal complexe ou multi-acteurs.</p>
          <p className="mb-2"><strong>Script 30s</strong> — « POC 4 semaines, critères de succès A/B/C, sponsor opé + DAF, go/no-go le 25/11. Si accord, on enchaîne direct sur le déploiement S1. »</p>
          <p className="mb-2"><strong>Variante</strong> — Soft : « proposition de POC » • Direct : « on cadre le POC aujourd’hui »</p>
          <p className="mb-2"><strong>Erreur → Correctif</strong> : POC sans critères → écrire 3 critères <strong>mesurables</strong>.</p>
          <p className="mb-2"><strong>KPI</strong> : % de POC transformés en prod.</p>
          <p className="mb-6"><strong>DirCo</strong> : playbook POC (durée, critères, livrables) • <strong>Commercial</strong> : exiger sponsor + DAF dès le cadrage.</p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-8 mb-3">7) Déclosing propre (sortie élégante)</h3>
          <p className="mb-2"><strong>Quand :</strong> fit insuffisant, délai irréaliste, sponsor absent, budget « fantôme ».</p>
          <p className="mb-2"><strong>Script 30s</strong> — « Au vu de [raison claire], je propose de mettre en pause et de refaire un point le 15/12 après [événement]. Je vous laisse notre checklist pour ré-évaluer objectivement. D’accord ? »</p>
          <p className="mb-2"><strong>Variante</strong> — Soft : « mettre en pause » • Direct : « stopper la démarche »</p>
          <p className="mb-2"><strong>Erreur → Correctif</strong> : disparaître → proposer un point daté + ressource utile.</p>
          <p className="mb-2"><strong>KPI</strong> : % de déclosings revenant en pipeline sous 6 mois.</p>
          <p className="mb-6"><strong>DirCo</strong> : normaliser le déclosing • <strong>Commercial</strong> : toujours laisser une date + un outil (checklist).</p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Scripts prêts à l’emploi (5 extraits)</h2>
          <p className="mb-4 italic">Astuce : copiez-collez, adaptez 2–3 variables (nom, date, KPI) et bloquez une date.</p>

          <h4 className="text-xl font-title font-bold text-blue-ink mt-6 mb-2">1) Relance post-démo (email)</h4>
          <pre className="bg-gray-50 p-4 rounded-xl overflow-x-auto mb-6"><code>
Objet — Suite à notre démo : next step mardi 10:00 ?

Bonjour [Prénom],

Comme convenu, je vous partage le petit résumé décisionnel :
• Objectif : -12 % coûts SAV (PIC S4)
• Risque : charge saisonnière
• Interlocuteurs : vous + DAF (A. Martin)
• Décision cible : 28/10

Ok pour valider les critères du MAP mardi 10:00 en visio (30 min) ?
Je vous envoie l’invite.

Laurent
          </code></pre>

          <h4 className="text-xl font-title font-bold text-blue-ink mt-6 mb-2">2) Objection prix (téléphone)</h4>
          <pre className="bg-gray-50 p-4 rounded-xl overflow-x-auto mb-6"><code>
Je comprends la contrainte budget. Pour décider sereinement,
voici le coût d'inaction validé ensemble : ~600 €/mois (pannes + astreinte).
Notre offre est à 480 €/mois, payback ≈ 3,2 mois.
On peut sécuriser avec un POC 4 semaines, critères A/B/C, go/no-go daté.
On le cadre maintenant ?
          </code></pre>

          <h4 className="text-xl font-title font-bold text-blue-ink mt-6 mb-2">3) Closing alternatif (email bref)</h4>
          <pre className="bg-gray-50 p-4 rounded-xl overflow-x-auto mb-6"><code>
Objet — On tranche Standard ou Pro ?

Bonjour [Prénom],
On est alignés sur le périmètre. Préférez-vous :
• Standard : déploiement 2 semaines
• Pro : + coaching 1 mois, accélération adoption

Si ok, je vous envoie la commande aujourd’hui et on démarre lundi.
Laurent
          </code></pre>

          <h4 className="text-xl font-title font-bold text-blue-ink mt-6 mb-2">4) Trial close en découverte (visio)</h4>
          <pre className="bg-gray-50 p-4 rounded-xl overflow-x-auto mb-6"><code>
Si on répond bien aux 3 critères que vous avez posés (délais S1, intégration DSI, payback &lt; 6 mois),
est-ce que vous seriez prêt à valider l’étape DAF vendredi ?
          </code></pre>
          

          <h4 className="text-xl font-title font-bold text-blue-ink mt-6 mb-2">5) Déclosing propre (email)</h4>
          <pre className="bg-gray-50 p-4 rounded-xl overflow-x-auto mb-6"><code>
Objet — On met en pause (et on se redit le 15/12)

Bonjour [Prénom],
Vu [raison], je propose qu’on mette en pause et qu’on refasse un point le 15/12 après [événement].
Je vous joins notre checklist de décision pour objectiver la reprise.

À votre dispo d’ici là si besoin,
Laurent
          </code></pre>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Mesurer & piloter</h2>
          <ul className="list-disc pl-6 mb-8">
            <li><strong>Next-step</strong> : ≥ 85 % des opportunités avec prochaine étape datée.</li>
            <li><strong>No-show</strong> : &lt; 8 % (rappel J-1 + SMS J-0).</li>
            <li><strong>Time-to-close</strong> : –15 % (MAP + trial closes).</li>
            <li><strong>POC → Prod</strong> : &gt; 60 % si critères cadrés.</li>
            <li><strong>A/B scripts</strong> : testez 2 versions « prix » sur 30 jours.</li>
          </ul>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Mini-cas (anonymisé)</h2>
          <p className="mb-4"><strong>Contexte</strong> : PME industrielle (pipeline 1,2 M€), cycles longs, relances irrégulières.</p>
          <p className="mb-4"><strong>Actions</strong> : MAP obligatoire + résumés décisionnels partagés + POC 4 semaines cadrés.</p>
          <p className="mb-8"><strong>Résultats (90 jours)</strong> : taux de closing +16 pts, time-to-close –18 %, no-show 6,5 %.</p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">FAQ</h2>
          <p className="mb-2"><strong>1) Qu’est-ce que le closing en B2B (vs B2C) ?</strong> Décision multi-acteurs, cycle plus long, preuve et plan d’actions au centre.</p>
          <p className="mb-2"><strong>2) Le déclosing, c’est quoi ?</strong> Décider de ne pas conclure quand les critères ne sont pas réunis. On protège la marge, le temps, la marque.</p>
          <p className="mb-2"><strong>3) Comment traiter l’objection prix sans brader ?</strong> Business case (coût d’inaction, payback), POC cadré, packs A/B clairs.</p>
          <p className="mb-6"><strong>4) Relance post-devis : quel rythme ?</strong> 21 jours : J+1 (résumé), J+3 (essentiels), J+7 (preuve/étude de cas), J+14 (objection), J+21 (déclosing ou date ferme).</p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-3">Appel à l’action</h3>
            <div className="grid gap-3">
              <Link href="/ressources/guide-closing" className="underline text-white/90 hover:text-white">Télécharger : 10 scripts de closing (PDF)</Link>
              <Link href="/ressources/outil-tableau-bord" className="underline text-white/90 hover:text-white">Essayer : Plan de relance 21 jours (Google Sheet)</Link>
              <Link href="/bootcamp" className="underline text-white/90 hover:text-white">Passer à l’échelle : Réserver un diagnostic 30 min (Bootcamp Vente)</Link>
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
