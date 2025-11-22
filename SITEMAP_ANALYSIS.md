# Analyse d'exhaustivité du sitemap

## État actuel
- Le fichier `public/sitemap-0.xml` date du 3 août 2025 et contient 119 URL, y compris `robots.txt`, `sitemap.xml` et plusieurs pages d'administration ou de test qui n'ont pas vocation à être indexées. 【F:public/sitemap-0.xml†L1-L122】
- La configuration Next Sitemap n'exclut que trois routes (`/cas-clients`, `/a-propos`, `/contact`) et applique une priorité/`changefreq` par défaut au reste. 【F:next-sitemap.config.js†L3-L58】

## Pages manquantes identifiées
En comparant l'ensemble des `page.tsx` de `src/app` (124 routes) avec les 119 entrées du sitemap généré, 7 pages sont absentes. 【4a8b6e†L1-L23】

| Page manquante | Cause probable |
| --- | --- |
| `/a-propos`, `/contact`, `/cas-clients` | Explicitement exclus dans `exclude` (comportement attendu). 【F:next-sitemap.config.js†L5-L9】 |
| `/blog/closing-b2b-7-techniques`, `/blog/accompagnement-equipes-commerciales-6-leviers-2025` | Articles présents dans le code mais non listés dans le sitemap actuel, probablement ajoutés après la génération du fichier (daté du 03/08/2025). 【F:public/sitemap-0.xml†L1-L40】【F:src/app/blog/closing-b2b-7-techniques/page.tsx†L1-L40】【F:src/app/blog/accompagnement-equipes-commerciales-6-leviers-2025/page.tsx†L1-L40】 |
| `/ressources/meilleurs-livres/methodes-processus` | Fichier de page vide (0 ligne), la route n'est pas rendue donc ignorée lors de la génération. 【30addd†L1-L2】 |
| `/temporary-resource` | Page marquée `noindex, nofollow` dans les métadonnées, donc volontairement absente du sitemap. 【F:src/app/temporary-resource/page.tsx†L1-L80】 |

## Pages potentiellement indésirables dans le sitemap
- Le sitemap inclut la page d'administration `/admin/audit-dashboard`. 【F:public/sitemap-0.xml†L15-L16】
- Plusieurs pages de test ou de validation (`/test-badge`, `/test-comparison-table`, `/test-hubspot`, `/test-bookcard`, `/test-resource-request`, `/test-mobile-cta`) sont exposées. 【F:public/sitemap-0.xml†L110-L121】

## Recommandations
1. **Régénérer le sitemap** après avoir corrigé/complété les pages manquantes pour inclure les deux articles de blog et la page de livres une fois son contenu rédigé.
2. **Exclure explicitement** les environnements ou pages non destinés au SEO (admin, tests, ressources temporaires) dans `exclude` pour éviter leur indexation.
3. **Automatiser la génération** du sitemap à chaque déploiement (script postbuild déjà défini) afin d'éviter la dérive entre les nouvelles pages et le fichier statique.
