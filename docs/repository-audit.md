# Audit structure & qualité du dépôt

## 1. Architecture et organisation du code
- **Structure actuelle** : Next.js 15 en App Router avec arborescence organisée par domaine (`src/app/*`) et composants partagés (`src/components`, `src/hooks`, `src/lib`, `src/utils`). 【F:README.md†L33-L56】
- **Points forts** : README détaillé, stack clairement annoncée (Next.js/TypeScript/Tailwind/Framer Motion). 【F:README.md†L25-L32】
- **Points à surveiller** : accumulation de nombreux rapports/procédures à la racine qui diluent les fichiers clés (README, package.json) et compliquent la navigation. Exemple : multiples rapports `*_SUMMARY.md`, `*_REPORT.md`, scripts de rollback et backups. 【F:README.md†L86-L135】
- **Recommandations** :
  - Regrouper les rapports/archives dans `docs/` ou `reports/` (avec sous-dossiers datés) pour garder une racine légère.
  - Ajouter un `docs/architecture.md` synthétique décrivant les modules métier (chat Gemini, ressources, audit SEO) et leurs dépendances internes.
  - Introduire un `CONTRIBUTING.md` (workflow Git, conventions de commit, politique de revue) et un `SECURITY.md` (process de divulgation, périmètre de tests sécurité).

## 2. Qualité du code & maintenabilité
- **Fonts et metadata centralisés** dans `src/app/layout.tsx` avec JSON-LD et providers globaux ; bonne séparation mais le fichier reste volumineux. 【F:src/app/layout.tsx†L1-L86】
- **Configuration Next** désactive les erreurs ESLint et TypeScript en build (`ignoreDuringBuilds`, `ignoreBuildErrors`), ce qui peut masquer des régressions critiques avant déploiement. 【F:next.config.ts†L4-L28】
- **Recommandations** :
  - Scinder `layout.tsx` en sous-composants (SEO schema, providers, header/footer) pour améliorer la lisibilité et réduire le risque d'effets de bord.
  - Réactiver les vérifications `eslint`/`typescript` en CI et en build, puis corriger les violations bloquantes.
  - Documenter les dossiers `src/lib/*` (gemini, email, audit) via des README locaux décrivant responsabilités et flux de données.

## 3. Performance
- **Optimisations existantes** :
  - Compression, headers cache agressifs et splitChunks personnalisés côté Webpack. 【F:next.config.ts†L15-L74】
  - Formats d'image modernes (AVIF/WebP) et inline CSS activé. 【F:next.config.ts†L14-L33】
- **Risques/axes d’amélioration** :
  - La désactivation des contrôles ESLint/TypeScript rend plus difficile le suivi des imports morts et des patterns anti-perf (render blocking, arbres React lourds).
  - Vérifier les pages statiques volumineuses (nombreuses routes marketing) pour factoriser les sections réutilisables et éviter les duplications de contenu.
  - Mettre en place une action GitHub `lighthouse-ci` ou `next build --analyze` (script `npm run analyze`) sur les pages principales pour suivre le budget de bundles.

## 4. Sécurité
- **Protection actuelle** : headers `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` et cache contrôlé pour les assets. 【F:next.config.ts†L58-L87】
- **Points d’attention** :
  - `dangerouslyAllowSVG` activé sur les images peut exposer à des payloads SVG malicieux si les sources ne sont pas strictement contrôlées. 【F:next.config.ts†L19-L30】
  - Aucune `Content-Security-Policy` globale n’est appliquée hors optimisation d’images ; ajouter un en-tête CSP par défaut ou via middleware pour limiter scripts/iframes.
  - Vérifier que les variables sensibles (SendGrid, Supabase, HubSpot) ne sont jamais consommées côté client ; l’option `ignoreBuildErrors` peut masquer des fuites de type `NEXT_PUBLIC_*` involontaires.

## 5. Tests & CI
- **Scripts disponibles** : suite Vitest avec variantes (coverage, composants, intégration, SEO, performance) et nombreux scripts de validation/audit (`validate:links`, `test:redirects`, `deploy:ready`, etc.). 【F:package.json†L7-L78】
- **Manques** : pas de pipeline CI documenté (GitHub Actions) qui orchestre lint + tests + build. Les options `ignoreDuringBuilds`/`ignoreBuildErrors` rendent les builds peu fiables.
- **Recommandations** :
  - Ajouter un workflow GitHub Actions (node 18/20) exécutant `npm ci`, `npm run lint`, `npm run test:run`, `npm run build` et, en option, `npm run analyze` sur les PR.
  - Publier un rapport de couverture (Vitest + `@vitest/coverage-v8`) dans les artefacts CI pour suivre l’évolution.

## 6. Hygiène du dépôt & gouvernance GitHub
- **Fichiers clés** : `.gitignore` correct, mais pas de `LICENSE` ni de `CODEOWNERS`. Présence de multiples changelogs partiels (`CHANGELOG_CHAT_HOTFIX.md`, `DEPLOYMENT_CHANGELOG.md`) sans fil conducteur.
- **Recommandations** :
  - Ajouter une licence explicite (MIT/Apache-2.0 selon le besoin) et un `CODEOWNERS` pour clarifier les responsabilités de revue.
  - Centraliser l’historique dans un `CHANGELOG.md` unique (format Keep a Changelog) et archiver les anciens rapports dans `docs/history/`.
  - Ajouter des templates d’issue/PR pour standardiser la communication et encourager la description des risques (perf/sécurité) avant merge.

## 7. Priorités d’action (ordre recommandé)
1) Réactiver les garde-fous qualité : ESLint/TS en build + workflow CI complet.
2) Sécuriser : CSP par défaut, revue des sources SVG, audit des usages `NEXT_PUBLIC_*`.
3) Rationaliser la racine du dépôt : déplacer rapports/archives dans `docs/`, créer `CONTRIBUTING.md`, `SECURITY.md`, `CODEOWNERS`, `LICENSE`.
4) Maintenabilité : factoriser `layout.tsx` et documenter les modules backend (email, gemini, audit).
5) Performance continue : activer `npm run analyze`/Lighthouse en CI et suivre les bundles des pages principales.
