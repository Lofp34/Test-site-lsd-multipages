import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Cookies - Laurent Serre Développement",
};

export default function PolitiqueCookies() {
  return (
    <>
      <main className="bg-primary-bg dark:bg-gray-dark text-gray-dark dark:text-primary-bg py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink dark:text-white sm:text-6xl">
              Politique de gestion des cookies
            </h1>
            <div className="mt-4 w-24 h-1.5 bg-mint-green mx-auto rounded-full"></div>
          </div>

          <div className="prose prose-lg mx-auto text-left dark:prose-invert">
            <p>
              Lors de la consultation de notre site laurentserre.com, des cookies sont déposés sur votre ordinateur, votre mobile ou votre tablette. Cette page vous permet de mieux comprendre comment fonctionnent les cookies et comment utiliser les outils actuels afin de les paramétrer.
            </p>
            
            <h2 className="text-2xl font-title font-semibold text-blue-ink dark:text-white mt-12 mb-4">Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la visite d'un site ou de la consultation d'une publicité. Ils ont notamment pour but de collecter des informations relatives à votre navigation sur les sites et de vous adresser des services personnalisés.
            </p>
            <p>
              Dans votre terminal, les cookies sont gérés par votre navigateur internet.
            </p>

            <h2 className="text-2xl font-title font-semibold text-blue-ink dark:text-white mt-12 mb-4">Quels cookies utilisons-nous ?</h2>
            <p>
              Nous utilisons les types de cookies suivants :
            </p>
            <ul>
              <li>
                <strong>Cookies strictement nécessaires :</strong> Ces cookies sont indispensables au bon fonctionnement du site. Ils ne peuvent pas être désactivés.
              </li>
              <li>
                <strong>Cookies de mesure d'audience (Google Analytics) :</strong> Ces cookies nous permettent de recueillir des informations sur la manière dont les visiteurs utilisent notre site (nombre de visites, pages les plus consultées, etc.). Ces informations sont anonymes et nous aident à améliorer l'ergonomie et le contenu de notre site. Le dépôt de ces cookies est soumis à votre consentement préalable.
              </li>
            </ul>
            
            <h2 className="text-2xl font-title font-semibold text-blue-ink dark:text-white mt-12 mb-4">Accepter ou refuser les cookies</h2>
            <p>
              Lors de votre première visite sur notre site, un bandeau vous informe de la présence de ces cookies et vous invite à indiquer votre choix. Ils ne sont déposés que si vous les acceptez.
            </p>
            <p>
              Vous pouvez à tout moment vous informer et paramétrer vos cookies pour les accepter ou les refuser en cliquant sur le lien "Gestion des cookies" présent en bas de chaque page du site. Vous pourrez indiquer votre préférence soit globalement pour le site, soit service par service.
            </p>
            
            <h3 className="text-xl font-title font-semibold text-blue-ink dark:text-white mt-8 mb-4">Paramétrage de votre navigateur internet</h3>
            <p>
              Vous pouvez également choisir de désactiver les cookies à tout moment en paramétrant votre navigateur internet. La configuration de chaque navigateur est différente. Elle est décrite dans le menu d'aide de votre navigateur, qui vous permettra de savoir de quelle manière modifier vos souhaits en matière de cookies :
            </p>
            <ul>
              <li>Pour Chrome : <a href="https://support.google.com/chrome/answer/95647?hl=fr&hlrm=en" target="_blank" rel="noopener noreferrer">https://support.google.com/chrome/answer/95647</a></li>
              <li>Pour Firefox : <a href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies-preferences" target="_blank" rel="noopener noreferrer">https://support.mozilla.org/fr/kb/activer-desactiver-cookies-preferences</a></li>
              <li>Pour Internet Explorer : <a href="https://support.microsoft.com/fr-fr/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer">https://support.microsoft.com/fr-fr/help/17442/windows-internet-explorer-delete-manage-cookies</a></li>
              <li>Pour Safari : <a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">https://support.apple.com/fr-fr/guide/safari/sfri11471/mac</a></li>
            </ul>

            <h2 className="text-2xl font-title font-semibold text-blue-ink dark:text-white mt-12 mb-4">Plus d'informations sur les cookies</h2>
            <p>
              Pour plus d'informations sur les cookies, vous pouvez consulter le site de la CNIL : <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs" target="_blank" rel="noopener noreferrer">https://www.cnil.fr/fr/cookies-et-autres-traceurs</a>.
            </p>

            <p className="mt-8">
              Cette politique a été mise à jour le {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}.
            </p>
          </div>
        </div>
      </main>
    </>
  );
} 