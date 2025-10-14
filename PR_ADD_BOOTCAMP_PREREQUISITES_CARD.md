# PR: Bootcamp — Carte « Prérequis » (Qualiopi)

## Objet
Ajouter une carte dépliante « Les prérequis pour participer au Bootcamp Vente » à la section « Ce que nous allons changer, ensemble » sur la page Bootcamp (`/bootcamp`). Cette carte explicite l'absence de prérequis particuliers et précise la condition d'être en situation de vente (interne ou externe), conformément aux exigences Qualiopi.

## Changements principaux
- Ajout d'une carte dépliante supplémentaire dans la liste des promesses:
  - Titre: « Les prérequis pour participer au Bootcamp Vente »
  - Contenu: « Aucun prérequis particulier. Le programme est ouvert à tous les publics, à la seule condition que l'apprenant soit en situation de vente — interne (vente de projets, d'idées, d'initiatives) ou externe (relation clients/prospects). »
  - Points clés: « Ouvert à tous les publics », « Aucun niveau requis », « Condition: être en situation de vente », « Interne ou externe (clients/projets) »

## Détails d’implémentation
- Fichier: `src/components/sections/PromiseSection.tsx`
- Ajout d’un nouvel objet dans le tableau `promises` (icône `ℹ️`, `delay: "0.8s"`).
- Comportement: identique aux autres cartes (ouverture au clic/survol, responsive).

## Rationale Qualiopi
- Rend explicite l’accès au dispositif de formation et les conditions d’entrée (absence de prérequis spécifiques + exigence d’être en situation de vente), afin d’aligner la page avec les critères Qualiopi.

## Tests manuels
- [ ] Desktop: la carte apparaît en dernière position et s’ouvre au survol/clic
- [ ] Mobile: la carte affiche le bouton +/− et se replie correctement
- [ ] Accessibilité: focus/clavier permettent d’ouvrir/fermer la carte
- [ ] Pas de régression de style sur les cartes précédentes

## Fichiers modifiés
- `src/components/sections/PromiseSection.tsx`

## Capture d’écran (optionnel)
Ajouter un screenshot de la carte ouverte et fermée.

---

### Instructions pour le reviewer
- Vérifier le wording exact (français) et la conformité vis‑à‑vis Qualiopi.
- Confirmer l’ordre d’affichage (carte en dernière position).

