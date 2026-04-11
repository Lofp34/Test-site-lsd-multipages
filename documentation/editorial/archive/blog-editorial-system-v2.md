# Système éditorial V2 — blog quotidien 08h

> **Périmètre de ce document**
> Ce document améliore uniquement la **couche éditoriale** : choix des sujets, variété des angles, sources d’inspiration, logique de rédaction, dashboard des publications.
> Il **ne modifie pas** le mécanisme technique actuel de publication sur le site, qui fonctionne bien et doit rester stable.

## 1. Objectif

Faire évoluer le cron de publication quotidienne 08h d’un simple moteur de production d’articles vers un **système éditorial piloté**, capable de :
- choisir des sujets plus opportunistes et plus business,
- varier davantage les angles,
- garder les mêmes fondamentaux de positionnement,
- nourrir à la fois le blog, LinkedIn, l’email et la conversation commerciale,
- capitaliser dans un tableau de bord clair des publications.

## 2. Invariants à préserver

Ces points ne changent pas :
- Le site web et son workflow de publication technique actuel restent la référence.
- Le flux normal de publication reste : produire → contrôle qualité local → commit → push GitHub → déploiement automatique GitHub → Vercel.
- Le kit post-publication (LinkedIn + email + visuel) reste une sortie standard du système.
- Le ton reste pragmatique, orienté résultats, crédible terrain, sans jargon creux.

## 3. Sources explicites de décision éditoriale

À chaque cycle de publication, le sujet du jour doit être choisi à partir d’un mélange explicite de 5 familles de sources.

### A. Fondamentaux business
Les piliers permanents du positionnement Laurent Serre :
- performance commerciale PME B2B,
- structuration du système commercial,
- management et transformation des équipes,
- sales enablement,
- IA utile pour l’efficacité commerciale.

### B. Signaux internes
Ce que le terrain et l’activité de Laurent font remonter :
- questions récurrentes de prospects/clients,
- objections commerciales,
- problèmes fréquemment observés chez les PME,
- transformations en cours chez les clients,
- besoins exprimés dans les échanges, appels, emails, documents.

### C. Historique éditorial
Le système doit tenir compte de ce qui a déjà été publié :
- sujets déjà traités,
- angles déjà fortement utilisés,
- thèmes trop répétés,
- opportunités non encore exploitées,
- liens possibles avec des articles existants.

### D. Recherche web / actualité
La recherche web doit devenir une source explicite, structurée et quotidienne :
- actualités IA utiles au commerce,
- évolutions marché B2B,
- nouvelles pratiques de vente/management,
- annonces ou publications de référence,
- tensions ou débats intéressants dans l’écosystème commercial.

### E. Saison / temporalité / événements
Le système doit intégrer le contexte du moment :
- saisonnalité business (janvier cadrage, septembre reprise, Q4 closing, etc.),
- cycle budgétaire,
- événements professionnels,
- salons / conférences,
- périodes de recrutement / onboarding / pilotage commercial,
- temps forts de l’année pour les dirigeants PME.

## 4. Règle de sélection du sujet

Le sujet retenu n’est pas juste “intéressant”. Il doit être **utile, opportun et commercialement intelligent**.

### Score de sélection recommandé
Noter chaque idée sur 5 critères (score 1 à 5) :

- **Pertinence ICP** : parle-t-on vraiment à une PME B2B / dirigeant / directeur commercial ?
- **Valeur business** : ce sujet peut-il clarifier un problème qui mène à une mission, un échange ou une prise de contact ?
- **Différenciation** : l’angle est-il plus fort qu’un contenu banal de consultant ?
- **Potentiel multicanal** : article facilement transformable en post LinkedIn + email + visuel ?
- **Opportunité temporelle** : actualité, saisonnalité ou événement rendent-ils le sujet plus pertinent aujourd’hui ?

### Décision éditoriale
Le sujet choisi doit idéalement combiner :
- un fondamental fort,
- un signal réel,
- un angle utile,
- un ancrage temporel ou contextuel quand il existe.

## 5. Bibliothèque d’angles éditoriaux

Les fondamentaux restent stables, mais les angles doivent tourner pour donner une sensation de diversité.

### Familles d’angles à faire tourner

#### 1. Angle “erreur fréquente”
Exemples :
- les erreurs invisibles,
- les faux bons réflexes,
- ce qui bloque sans se voir.

#### 2. Angle “diagnostic”
Exemples :
- comment savoir si…
- les symptômes d’un système commercial mal structuré,
- les signaux faibles.

#### 3. Angle “méthode”
Exemples :
- cadre en 3 étapes,
- grille de lecture,
- protocole simple pour décider.

#### 4. Angle “point de vue / conviction”
Exemples :
- idée contre-intuitive,
- prise de position,
- opinion d’expert argumentée.

#### 5. Angle “terrain”
Exemples :
- ce que j’observe chez mes clients,
- cas réel anonymisé,
- pattern récurrent du terrain.

#### 6. Angle “dirigeant / arbitrage”
Exemples :
- comment prioriser,
- quoi décider maintenant,
- quel arbitrage produit vraiment un effet.

#### 7. Angle “transformation”
Exemples :
- avant / après,
- passage d’un mode artisanal à un mode structuré,
- montée en maturité commerciale.

#### 8. Angle “IA utile”
Exemples :
- ce que l’IA change vraiment,
- ce qu’elle ne remplace pas,
- comment l’utiliser concrètement sans illusion.

#### 9. Angle “ressource / outil”
Exemples :
- utiliser un outil maison,
- transformer un guide en action,
- faire gagner du temps avec une méthode.

#### 10. Angle “actualité interprétée”
Exemples :
- ce qu’une actualité change vraiment pour une PME,
- lecture business d’une annonce,
- opportunité ou faux sujet ?

## 6. Règle de rotation des angles

Pour éviter la monotonie :
- ne pas répéter le même angle principal deux jours de suite,
- éviter plus de 2 articles sur 5 dans la même famille d’angle,
- conserver un équilibre entre :
  - concret / méthode,
  - diagnostic / prise de conscience,
  - point de vue / autorité,
  - actualité / opportunité.

## 7. Framework de rédaction recommandé

Chaque article doit servir un effet business, pas seulement livrer de l’information.

### Structure de base
1. **Accroche utile**
   - problème réel, tension ou situation familière.
2. **Clarification**
   - pourquoi le sujet compte maintenant.
3. **Lecture experte**
   - analyse, angle, distinction ou conviction.
4. **Cadre d’action**
   - méthode, signaux, étapes, erreurs à éviter.
5. **Projection business**
   - ce que cela change pour un dirigeant / équipe / organisation.
6. **Conclusion activable**
   - idée mémorable + ouverture vers l’action.

### Questions de contrôle avant publication
- À qui parle précisément cet article ?
- Quel problème business aide-t-il à clarifier ?
- Quelle conversation commerciale peut-il déclencher ?
- Quel angle le rend plus fort qu’un contenu générique ?
- Quel recyclage LinkedIn / email en sort naturellement ?

## 8. Pipeline éditorial quotidien recommandé

### Étape 1 — Scan du jour
Le cron éditorial doit scanner :
- idées evergreen issues des fondamentaux,
- signaux internes récents,
- historique éditorial,
- web / actualité,
- saisonnalité / événements.

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
Produire l’article avec un angle clair et une promesse forte.

### Étape 5 — Déclinaison
Produire systématiquement :
- titre final,
- résumé stratégique,
- post LinkedIn,
- idée de visuel,
- email de relai,
- éventuellement une piste de réutilisation future.

### Étape 6 — Capitalisation
Mettre à jour le dashboard éditorial après publication.

## 9. Dashboard des publications

Créer et maintenir un fichier unique de pilotage :

`documentation/publication-dashboard.md`

### Objectif
Avoir une vue simple et exploitable de l’historique éditorial, des équilibres, des répétitions, des trous à combler et des prochaines opportunités.

### Colonnes recommandées
Pour chaque publication :
- Date
- Statut (idée / en préparation / publié / recyclé)
- Titre
- Sujet principal
- Angle principal
- Catégorie / pilier
- ICP cible
- Intention business
- Source dominante (fondamentaux / signal interne / web / saisonnalité / historique)
- Déclencheur temporel (oui/non + détail)
- URL blog
- Kit LinkedIn prêt ?
- Email prêt / envoyé ?
- Réutilisation possible
- Notes

### KPI éditoriaux en haut du document
Afficher une synthèse simple :
- nombre total de publications,
- nombre par pilier,
- nombre par angle,
- angles surreprésentés,
- angles sous-exploités,
- idées prioritaires à venir,
- opportunités saisonnières du moment.

## 10. Règle de non-régression technique

Pour éviter de casser ce qui fonctionne déjà :
- ne pas modifier les scripts techniques de publication sans besoin explicite,
- ne pas toucher au workflow GitHub → Vercel dans cette amélioration,
- isoler les changements éditoriaux dans des fichiers de documentation et de pilotage,
- faire évoluer d’abord les règles de décision, puis seulement ensuite les automatisations si besoin.

## 11. Prochain niveau d’amélioration (plus tard)

Quand cette V2 sera bien stabilisée, on pourra aller vers :
- un score automatique de diversité éditoriale,
- une rotation intelligente des angles,
- une mémoire des performances perçues par thème,
- une proposition automatique de 3 sujets classés chaque matin,
- une articulation plus forte avec les offres commerciales prioritaires du moment.

## 12. Résumé opérationnel

À partir de maintenant, le cron blog quotidien 08h doit être pensé comme un système qui :
- choisit ses sujets à partir d’un mélange explicite de sources,
- intègre actualité + événements + saisonnalité,
- garde les mêmes fondamentaux de positionnement,
- varie fortement les angles,
- capitalise dans un dashboard éditorial,
- sans toucher à la mécanique technique de publication tant qu’elle fonctionne bien.
