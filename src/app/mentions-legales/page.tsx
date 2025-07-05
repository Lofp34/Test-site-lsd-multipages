export default function MentionsLegales() {
  return (
    <>
      <main className="bg-primary-bg dark:bg-gray-dark text-gray-dark dark:text-primary-bg py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink dark:text-white sm:text-6xl">
              Mentions Légales
            </h1>
            <div className="mt-4 w-24 h-1.5 bg-mint-green rounded-full mx-auto"></div>
          </div>

          <div className="space-y-10 font-body text-lg leading-8 text-gray-700 dark:text-gray-300">
            <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-anthracite shadow-sm">
              <h2 className="text-2xl font-title font-bold text-blue-ink dark:text-mint-green mb-4">1. Éditeur du site</h2>
              <p>Laurent Serre Développement – SARL au capital de 300 000 €</p>
              <p>Siège social : 259, rue de la lavande, 34130 Mauguio</p>
              <p>Immatriculée au RCS de Montpellier sous le n° 435292941 – TVA : FR39435292941</p>
              <p>E-mail : ls@laurentserre.com – Tél. : +33 6 14 94 40 60</p>
            </div>

            <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-anthracite shadow-sm">
              <h2 className="text-2xl font-title font-bold text-blue-ink dark:text-mint-green mb-4">2. Directeur de la publication</h2>
              <p>Laurent Serre, Cofondateur & Président.</p>
            </div>

            <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-anthracite shadow-sm">
              <h2 className="text-2xl font-title font-bold text-blue-ink dark:text-mint-green mb-4">3. Hébergeur</h2>
              <p>Vercel, Inc.</p>
              <p>440 N Barranca Avenue PMB 4133, Covina CA 91723-1722, États-Unis</p>
              <p>Site Web : <a href="https://vercel.com" className="text-mint-green hover:underline">https://vercel.com</a></p>
              <p>E-mail : support@vercel.com</p>
            </div>

            <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-anthracite shadow-sm">
              <h2 className="text-2xl font-title font-bold text-blue-ink dark:text-mint-green mb-4">4. Propriété intellectuelle</h2>
              <p>
                L’ensemble des contenus (textes, images, logos, vidéos, icônes, mise en page) est la propriété exclusive
                de Laurent Serre Développement, sauf mention contraire. Toute reproduction, représentation,
                modification, publication, adaptation, totale ou partielle, est interdite sans autorisation écrite préalable.
              </p>
            </div>

            <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-anthracite shadow-sm">
              <h2 className="text-2xl font-title font-bold text-blue-ink dark:text-mint-green mb-4">5. Données personnelles</h2>
              <p>
                Les informations collectées via les formulaires (nom, e-mail, téléphone, société) sont traitées par
                Laurent Serre Développement pour :
              </p>
              <ul className="list-disc list-inside my-4 space-y-2">
                <li>Répondre aux demandes de contact</li>
                <li>Proposer des prestations et ressources</li>
                <li>Envoyer la newsletter (base légale : consentement)</li>
              </ul>
              <table className="w-full my-4 border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Finalité</th>
                    <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Durée de conservation</th>
                    <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Base légale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 p-2">Gestion des demandes de contact</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-2">3 ans</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-2">Consentement</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 p-2">Envoi de la newsletter</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-2">Jusqu’au retrait</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-2">Consentement</td>
                  </tr>
                </tbody>
              </table>
              <p>
                Conformément au RGPD, vous pouvez exercer vos droits d’accès, de rectification, d’opposition,
                d’effacement, de limitation et de portabilité en écrivant à dpo@laurentserre.com. En cas de litige, vous
                pouvez adresser une réclamation à la CNIL.
              </p>
            </div>

            <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-anthracite shadow-sm">
              <h2 className="text-2xl font-title font-bold text-blue-ink dark:text-mint-green mb-4">6. Cookies & traceurs</h2>
              <p>
                Le site utilise des cookies pour :
              </p>
              <ul className="list-disc list-inside my-4 space-y-2">
                <li>Statistiques d’audience (Matomo) – durée 13 mois</li>
                <li>Fonctionnels de session – durée de la session</li>
              </ul>
              <p>
                Un bandeau de consentement permet d’accepter ou de refuser ces cookies. Vous pouvez modifier votre
                choix à tout moment via le lien « Gestion des cookies » dans le footer.
              </p>
            </div>

            <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-anthracite shadow-sm">
              <h2 className="text-2xl font-title font-bold text-blue-ink dark:text-mint-green mb-4">7. Limitation de responsabilité</h2>
              <p>
                L’éditeur met tout en œuvre pour fournir des informations exactes ; il ne saurait toutefois garantir
                l’exactitude ou l’exhaustivité du contenu et décline toute responsabilité pour tout dommage résultant
                d’une inexactitude ou d’une omission.
              </p>
            </div>

            <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-anthracite shadow-sm">
              <h2 className="text-2xl font-title font-bold text-blue-ink dark:text-mint-green mb-4">8. Droit applicable</h2>
              <p>
                Les présentes mentions légales sont régies par le droit français. Tout litige relatif à leur interprétation
                ou à leur exécution sera de la compétence exclusive des tribunaux de Montpellier.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 