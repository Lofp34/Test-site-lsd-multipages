import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

// Styles
import styles from './friction-vente-b2b.module.css'
import { Roboto, Inter } from 'next/font/google'

const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] })
const inter = Inter({ weight: ['400', '500', '600'], subsets: ['latin'] })

// SEO metadata
export const metadata: Metadata = {
  title: 'Friction processus de vente B2B : 5 points qui tuent vos deals',
  description: 'Découvrez les 5 frictions invisibles dans votre processus de vente B2B qui font perdre des deals à votre PME : délais entre étapes, manque de visibilité, documents dispersés, absence de Deal Room, onboarding flou.',
  keywords: ['friction vente B2B', 'processus de vente PME', 'perte de deals B2B', 'deal room B2B', 'onboarding client B2B'],
  openGraph: {
    title: 'Friction processus de vente B2B : 5 points qui tuent vos deals',
    description: 'Découvrez les 5 frictions invisibles dans votre processus de vente B2B qui font perdre des deals à votre PME.',
    images: [{ url: '/images/blog/friction-vente-b2b-hero.webp', width: 1536, height: 1024, alt: 'Friction processus de vente B2B' }],
    type: 'article',
    publishedTime: '2026-06-22T07:00:00+02:00',
    modifiedTime: '2026-06-22T07:00:00+02:00',
    authors: ['Laurent Serre'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Friction processus de vente B2B : 5 points qui tuent vos deals',
    description: 'Découvrez les 5 frictions invisibles dans votre processus de vente B2B qui font perdre des deals à votre PME.',
    images: ['/images/blog/friction-vente-b2b-hero.webp'],
  },
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/friction-vente-b2b',
  },
}

export default function FrictionVenteB2BPage() {
  return (
    <article className={`${styles.article} ${roboto.className}`}>
      {/* Hero Image */}
      <div className={styles.hero}>
        <Image
          src="/images/blog/friction-vente-b2b-hero.webp"
          alt="Friction processus de vente B2B"
          width={1536}
          height={1024}
          priority
        />
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>Friction processus de vente B2B : 5 points qui tuent vos deals</h1>
          <p className={styles.heroSubtitle}>Les barrières invisibles qui coûtent des contrats à votre PME</p>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>

        {/* Introduction */}
        <section className={styles.intro}>
          <p>Je reçois un appel d'un dirigeant de PME la semaine dernière. "On a perdu un deal sur lequel on passait 90% de notre temps depuis trois mois. L'offre, c'était correct. Le prix, pareil. Le commercial était à l'aise. Ils ont signé ailleurs. Je ne comprends pas."</p>

          <p>Je lui demande de me raconter ce qui s'est passé, pas ce qui devait se passer.</p>

          <p>Au début, le prospect était enthousiaste. Puis la première étape de qualification : une semaine pour obtenir un rendez-vous avec le vrai décideur. Ensuite, le premier document demandé : un jour pour le trouver, deux pour le mettre en forme. Puis une proposition revue trois fois. Puis un contrat qui a changé de version deux fois.</p>

          <p>À chaque étape, le prospect perdait un peu d'énergie. À chaque délai, il se disait "ce n'est peut-être pas la priorité". À chaque nouvelle demande, il s'interrogeait sur la capacité de l'équipe à livrer proprement.</p>

          <p>Le problème n'était ni l'offre, ni le prix, ni le commercial. C'était la friction invisible à chaque étape.</p>

          <p className={styles.lead}>Voici les 5 points de friction qui tuent les deals B2B en 2026.</p>
        </section>

        {/* Les 5 points de friction */}
        <section className={styles.frictionPoints}>
          <h2 className={styles.h2}>Les 5 frictions qui tuent vos deals</h2>

          {/* Friction 1 */}
          <div className={styles.frictionCard}>
            <h3 className={styles.h3}>1. Perte de temps entre les étapes</h3>
            <p>Un prospect qui doit vous relancer trois fois pour avoir une date de rendez-vous se fatigue avant même de commencer. Chaque délai sans justification claire est un signal : "ce n'est pas vraiment important pour eux".</p>
          </div>

          {/* Friction 2 */}
          <div className={styles.frictionCard}>
            <h3 className={styles.h3}>2. Manque de visibilité sur les prochaines étapes</h3>
            <p>Un client qui ne sait pas ce qui vient après "envoyer le devis" se pose des questions. "Ça veut dire qu'on avance ? Qu'on attend ? Que ce n'est pas grave ?" L'incertitude crée de l'inertie.</p>
          </div>

          {/* Friction 3 */}
          <div className={styles.frictionCard}>
            <h3 className={styles.h3}>3. Documents dispersés et mal organisés</h3>
            <p>Quand les infos du deal sont dans un email là, un PDF ailleurs, une présentation qui ne s'ouvre pas sur le troisième appareil, le prospect se demande : "si c'est déjà le chaos dans la vente, qu'est-ce que ce sera dans le projet ?"</p>
          </div>

          {/* Friction 4 */}
          <div className={styles.frictionCard}>
            <h3 className={styles.h3}>4. Absence de Deal Room ou espace partagé</h3>
            <p>Tout passe par email. Les fichiers s'égarent. Les versions se mélangent. L'historique des échanges disparaît dans des fils de discussion à rallonge. Le prospect doit faire le travail de synthèse à votre place.</p>
          </div>

          {/* Friction 5 */}
          <div className={styles.frictionCard}>
            <h3 className={styles.h3}>5. Onboarding flou après la signature</h3>
            <p>C'est la cause numéro 1 de churn précoce. Le prospect signe, enthousiaste. Ensuite ? Rien pendant quinze jours. Ou un email vague "on vous recontacte". L'énergie retombe. Le doute s'installe. La compétition revient en force.</p>
          </div>
        </section>

        {/* Solutions */}
        <section className={styles.solutions}>
          <h2 className={styles.h2}>Ce qu'il faut faire, concrètement</h2>

          <div className={styles.solutionStep}>
            <h3 className={styles.h3}>Première chose : tracer les 5 étapes de votre cycle de vente actuel et mesurer le temps réel entre chacune.</h3>
            <p>Si une étape prend systématiquement deux fois plus longtemps que prévu, vous avez un problème de processus, pas de commercial.</p>
          </div>

          <div className={styles.solutionStep}>
            <h3 className={styles.h3}>Deuxième chose : donner à chaque prospect, dès le premier rendez-vous, la feuille de route complète.</h3>
            <p>De A à Z. Ce qui va se passer, quand, qui fait quoi. Une visibilité totale réduit l'incertitude à zéro.</p>
          </div>

          <div className={styles.solutionStep}>
            <h3 className={styles.h3}>Troisième chose : une Deal Room unique par deal.</h3>
            <p>Tous les documents, toutes les versions, tout l'historique des échanges. Une seule source de vérité. Ça vous fait gagner des heures, et ça rassure le prospect.</p>
          </div>

          <div className={styles.solutionStep}>
            <h3 className={styles.h3}>Quatrième chose : préparer l'onboarding avant la signature.</h3>
            <p>Les comptes créés, les docs d'intégration prêts, un calendrier de mise en route verrouillé dans les 48h suivant la signature.</p>
          </div>
        </section>

        {/* Résultat */}
        <section className={styles.result}>
          <p>Cinq semaines plus tard, ce même dirigeant m'appelle. "On a mis en place une Deal Room. On a tracé toutes les étapes. On gagne 30% de temps par vente. Et surtout, les deals ne s'égarent plus dans les mails."</p>

          <p className={styles.chute}>La friction ne se voit pas sur le papier. Elle se sent dans le parcours du prospect. La réduire n'est pas un luxe. C'est une question de survie commerciale.</p>
        </section>

        {/* CTAs */}
        <section className={styles.ctas}>
          <div className={styles.ctaPrimary}>
            <Link href="/diagnostic" className={`${styles.ctaLink} ${styles.ctaSoft}`}>
              Diagnostiquer votre processus de vente
            </Link>
          </div>

          <div className={styles.ctaSecondary}>
            <Link href="/bootcamp" className={`${styles.ctaLink} ${styles.ctaMedium}`}>
              Bootcamp Commercial Terrain
            </Link>
          </div>

          <div className={`${styles.ctaGradient} ${inter.className}`}>
            <Link href="/contact" className={styles.ctaLink}>
              Réserver un appel de diagnostic
            </Link>
          </div>
        </section>

        {/* Liens internes */}
        <section className={styles.internalLinks}>
          <h3 className={styles.h3}>Pour aller plus loin</h3>
          <ul className={styles.linksList}>
            <li><Link href="/blog/closing-b2b-budget-gele-pme">→ Objection budget gelé : comment transformer le non en oui</Link></li>
            <li><Link href="/blog/commission-breath-3-mecanismes-tuent-closing">→ Commission breath : les 3 mécanismes qui tuent votre closing</Link></li>
            <li><Link href="/blog/erreurs-developpement-commercial-pme">→ Les erreurs de développement commercial en PME</Link></li>
          </ul>
        </section>

        {/* Structured Data FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Quels sont les 5 points de friction dans un processus de vente B2B ?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Les 5 frictions principales sont : (1) perte de temps entre les étapes, (2) manque de visibilité sur les prochaines étapes, (3) documents dispersés et mal organisés, (4) absence de Deal Room ou espace partagé, (5) onboarding flou après la signature.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Comment réduire la friction dans le processus de vente B2B ?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Pour réduire la friction : tracez les 5 étapes de votre cycle de vente et mesurez le temps réel entre chacune, donnez à chaque prospect la feuille de route complète dès le premier rendez-vous, créez une Deal Room unique par deal, et préparez l\'onboarding avant la signature.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Qu\'est-ce qu\'une Deal Room en B2B ?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Une Deal Room est un espace partagé unique par deal qui contient tous les documents, toutes les versions et tout l\'historique des échanges. C\'est une seule source de vérité qui rassure le prospect et fait gagner du temps à l\'équipe commerciale.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Pourquoi l\'onboarding flou est-il une cause de churn ?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Un onboarding flou après la signature est la cause numéro 1 de churn précoce. Le prospect signe enthousiaste, mais si rien ne se passe pendant quinze jours ou si l\'information est vague, l\'énergie retombe, le doute s\'installe et la compétition peut revenir en force.',
                  },
                },
              ],
            }),
          }}
        />

        {/* Breadcrumb */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Accueil',
                  item: 'https://www.laurentserre.com',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Blog',
                  item: 'https://www.laurentserre.com/blog',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Friction processus de vente B2B',
                },
              ],
            }),
          }}
        />

      </div>
    </article>
  )
}