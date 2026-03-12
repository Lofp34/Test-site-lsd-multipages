# Project Status (MVP)

## Objectif
Site web Next.js de Laurent Serre pour generer des leads qualifies autour du developpement commercial PME via SEO, contenus et formulaires de conversion.

## Perimetre (scope)
- In: pages marketing, ressources, blog, diagnostic, integrations HubSpot, suivi analytics, optimisations SEO et performance.
- Out: back-office CRM complet, workflows HubSpot avances hors parcours site, applications mobiles.

## Ce qui est en place
- Site multipages Next.js 15 avec App Router et charte graphique claire.
- Parcours de conversion avec pages contact, diagnostic, ressources et prise de rendez-vous.
- Integration HubSpot deja presente sur le site et formulaire natif retabli sur `/contact`.
- Base SEO et contenus deja en place sur les pages coeur de cible.

## Decisions prises
- La page `/contact` utilise a nouveau le formulaire HubSpot embarque plutot qu'un formulaire custom desynchronisable.
- Le composant HubSpot charge le script d'embed de facon defensive avec un conteneur unique pour eviter les doubles initialisations.

## Risques / Blocages
- Verification locale non executee dans cet environnement car `node`, `npm` et `python` sont absents du `PATH`.
- Le correctif doit etre redeploye pour etre visible sur `https://www.laurentserre.com/contact`.

## Prochaine etape (proposee)
1) Redeployer `main` en production.
2) Verifier manuellement le rendu et la soumission du formulaire sur `/contact`.
3) Nettoyer l'ancien formulaire custom et les routes inutilisees si elles ne servent plus.

## Journal des evolutions
- 2026-03-12: Reconnexion de la page contact au formulaire HubSpot natif avec durcissement du composant d'embed.
