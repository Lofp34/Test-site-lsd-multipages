# Système opératoire éditorial — blog Laurent Serre

## Objet

Ce document décrit le fonctionnement du système éditorial quotidien du blog Laurent Serre.

Il formalise :
- le mode de sélection des sujets,
- les sources à consulter,
- les règles de scoring,
- le pipeline éditorial,
- le framework de rédaction,
- les sorties attendues à chaque publication,
- l’articulation avec le workflow technique existant.

Ce document ne remplace ni la stratégie éditoriale de fond, ni les garde-fous de diversification, ni le dashboard de pilotage vivant.

---

## 1. Objectif

Faire évoluer la publication quotidienne du blog d’un simple moteur de production d’articles vers un système éditorial piloté, capable de :
- choisir des sujets plus utiles, plus opportunistes et plus intelligents commercialement,
- varier les angles,
- préserver les fondamentaux de positionnement,
- alimenter le blog, LinkedIn, l’email et la conversation commerciale,
- capitaliser dans un tableau de bord éditorial clair.

---

## 2. Invariants à préserver

Les règles suivantes restent stables :
- le site web et son workflow technique actuel restent la référence,
- le flux de publication reste : produire → contrôle qualité local → commit → push GitHub → déploiement GitHub → Vercel,
- le kit post-publication reste une sortie standard,
- le ton doit rester pragmatique, crédible, orienté résultats et sans jargon creux.

Le système éditorial améliore la décision et la qualité du contenu. Il ne doit pas casser la mécanique technique qui fonctionne déjà.

---

## 3. Sources explicites de décision éditoriale

À chaque cycle, le sujet du jour doit être choisi à partir d’un mélange explicite de plusieurs familles de sources.

### A. Fondamentaux business
Les piliers permanents du positionnement Laurent Serre :
- performance commerciale PME B2B,
- structuration du système commercial,
- management et transformation des équipes,
- sales enablement,
- IA utile pour l’efficacité commerciale.

### B. Signaux internes
Ce que le terrain fait remonter :
- questions récurrentes de prospects ou clients,
- objections commerciales,
- problèmes observés chez les PME,
- transformations en cours,
- besoins exprimés dans les échanges, appels, emails ou documents.

### C. Historique éditorial
Le système doit tenir compte de ce qui a déjà été publié :
- sujets traités,
- angles déjà surutilisés,
- thèmes trop proches,
- opportunités non couvertes,
- liens utiles avec les contenus existants.

### D. Recherche web et actualité
La recherche web doit être une source explicite :
- actualités IA utiles au commerce,
- évolutions du marché B2B,
- nouvelles pratiques de vente ou de management,
- annonces ou prises de parole de référence,
- débats intéressants de l’écosystème commercial.

### E. Saison, temporalité, événements
Le système doit intégrer le contexte du moment :
- saisonnalité business,
- cycle budgétaire,
- périodes de recrutement ou d’onboarding,
- salons, conférences, temps forts métier,
- dynamiques trimestrielles ou annuelles.

---

## 4. Règle de sélection du sujet

Le sujet retenu ne doit pas être seulement intéressant. Il doit être :
- utile,
- opportun,
- commercialement intelligent,
- cohérent avec l’ICP,
- assez fort pour se décliner naturellement sur plusieurs canaux.

### Grille de score recommandée
Chaque idée candidate est notée de 1 à 5 sur :
- pertinence ICP,
- valeur business,
- différenciation,
- potentiel multicanal,
- opportunité temporelle.

### Logique de décision
Le sujet choisi doit idéalement combiner :
- un fondamental fort,
- un signal réel,
- un angle utile,
- un ancrage temporel ou contextuel quand il existe.

---

## 5. Bibliothèque d’angles éditoriaux

Les fondamentaux sont stables, mais les angles doivent tourner.

### Angles de référence
- erreur fréquente,
- diagnostic,
- méthode,
- point de vue / conviction,
- terrain,
- dirigeant / arbitrage,
- transformation,
- IA utile,
- ressource / outil,
- actualité interprétée.

### Principe
Le sujet ne suffit pas. L’angle doit produire une vraie respiration dans le système éditorial.

---

## 6. Règle de rotation des angles

Pour éviter la monotonie :
- ne pas répéter le même angle principal deux jours de suite,
- éviter plus de 2 articles sur 5 dans une même famille d’angle,
- maintenir un équilibre entre :
  - concret / méthode,
  - diagnostic / prise de conscience,
  - point de vue / autorité,
  - actualité / opportunité.

Les garde-fous détaillés sont formalisés dans `03-editorial-guardrails.md`.

---

## 7. Framework de rédaction recommandé

Chaque article doit servir un effet business, pas seulement transmettre de l’information.

### Structure de base
1. **Accroche utile**  
   Un problème réel, une tension ou une situation familière.
2. **Clarification**  
   Pourquoi ce sujet compte maintenant.
3. **Lecture experte**  
   Analyse, distinction, conviction ou grille de lecture.
4. **Cadre d’action**  
   Méthode, étapes, signaux, erreurs à éviter.
5. **Projection business**  
   Ce que cela change pour un dirigeant, une équipe ou une organisation.
6. **Conclusion activable**  
   Idée mémorable et ouverture vers l’action.

### Questions de contrôle avant publication
- À qui parle précisément cet article ?
- Quel problème business aide-t-il à clarifier ?
- Quelle conversation commerciale peut-il déclencher ?
- Quel angle le rend plus fort qu’un contenu générique ?
- Quel recyclage LinkedIn / email peut en sortir naturellement ?

---

## 8. Pipeline éditorial quotidien

### Étape 1 — Scan du jour
Scanner :
- les idées evergreen issues des fondamentaux,
- les signaux internes récents,
- l’historique éditorial,
- le web et l’actualité,
- la saisonnalité et les événements.

### Étape 2 — Présélection
Générer 3 à 5 idées candidates avec :
- sujet,
- angle,
- cible,
- raison du moment,
- intérêt business.

### Étape 3 — Scoring
Appliquer la grille de score.

### Étape 4 — Rédaction
Produire un article avec un angle clair et une promesse forte.

### Étape 5 — Déclinaison
Produire systématiquement :
- le titre final,
- un résumé stratégique,
- un post LinkedIn,
- une idée de visuel,
- un email de relai,
- éventuellement une piste de réutilisation future.

### Étape 6 — Capitalisation
Mettre à jour le dashboard éditorial après publication.

---

## 9. Sorties attendues à chaque publication

Chaque publication doit idéalement produire un petit kit d’activation.

### Sorties minimales
- article final,
- titre stabilisé,
- angle principal identifié,
- catégorie / pilier,
- résumé ou note de positionnement,
- déclinaison LinkedIn,
- déclinaison email,
- piste de visuel.

### Sorties recommandées
- idée de réutilisation future,
- lien avec une ressource existante,
- articulation avec une offre ou un besoin business du moment.

---

## 10. Articulation avec le dashboard éditorial

Le dashboard de référence est :

`documentation/editorial/04-publication-dashboard.md`

Il sert à suivre :
- les publications,
- les KPI,
- le backlog,
- les angles surreprésentés ou sous-exploités,
- les opportunités prioritaires.

Le système opératoire doit le consulter avant rédaction et le mettre à jour après publication.

---

## 11. Règle de non-régression technique

Pour éviter de casser ce qui fonctionne déjà :
- ne pas modifier les scripts techniques de publication sans besoin explicite,
- ne pas toucher au workflow GitHub → Vercel dans cette amélioration,
- isoler les changements éditoriaux dans les fichiers de documentation et de pilotage,
- faire évoluer d’abord les règles de décision, ensuite seulement les automatisations si nécessaire.

---

## 12. Prochain niveau d’amélioration

Quand ce système sera stabilisé, il pourra évoluer vers :
- un score automatique de diversité éditoriale,
- une rotation intelligente des angles,
- une mémoire des performances perçues par thème,
- une proposition automatique de sujets classés,
- une articulation plus forte avec les offres commerciales prioritaires.

---

## 13. Résumé opérationnel

Le système éditorial quotidien doit être pensé comme une machine qui :
- choisit ses sujets à partir d’un mélange explicite de sources,
- intègre actualité, événements et saisonnalité,
- reste fidèle au positionnement de fond,
- varie fortement les angles,
- produit un kit multicanal,
- capitalise dans un dashboard,
- sans casser le workflow technique existant.
