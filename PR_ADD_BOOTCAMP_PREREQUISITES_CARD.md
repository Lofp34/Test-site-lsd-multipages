# PR: Bootcamp — Cartes « Prérequis » et « Handicap » + Module « Résultats » (Qualiopi)

## Objet
1) Ajouter une carte dépliante « Les prérequis pour participer au Bootcamp Vente » à la section « Ce que nous allons changer, ensemble » sur la page Bootcamp (`/bootcamp`). Cette carte explicite l'absence de prérequis particuliers et précise la condition d'être en situation de vente (interne ou externe), conformément aux exigences Qualiopi.
2) Ajouter une carte « Personnes en situation de handicap » (aménagements, accessibilité ERP PMR, contacts référent et RHF).
3) Afficher la « Dernière mise à jour: 2 septembre 2025 » sur le module des cartes.
4) Créer un module « Résultats » placé sous le module « Prêt à transformer vos résultats ? » affichant les indicateurs fournis.

## Changements principaux
- Carte « Prérequis » (dépliante) dans la liste des promesses:
  - Titre: « Les prérequis pour participer au Bootcamp Vente »
  - Contenu: « Aucun prérequis particulier. Le programme est ouvert à tous les publics, à la seule condition que l'apprenant soit en situation de vente — interne (vente de projets, d'idées, d'initiatives) ou externe (relation clients/prospects). »
  - Points clés: « Ouvert à tous les publics », « Aucun niveau requis », « Condition: être en situation de vente », « Interne ou externe (clients/projets) »

- Carte « Handicap » (dépliante) dans la liste des promesses:
  - Titre: « Accueil et aménagements pour les personnes en situation de handicap »
  - Contenu: « Personnes en situation de handicap bienvenues. Aménagements possibles (matériel, temps, supports). Locaux ERP accessibles PMR. Contact handicap / référent : Laurent Serre – ls@laurentserre.com. Pour appui : RHF Occitanie (06 70 03 42 49 / rhf-occitanie@agefiph.asso.fr), équipe RHF Est (Hérault) Aline Dumont 06 17 73 58 42. »
  - Points clés: « Aménagements: matériel, temps, supports », « Locaux ERP accessibles PMR », « Référent: ls@laurentserre.com », « RHF Occitanie: 06 70 03 42 49 / rhf-occitanie@agefiph.asso.fr »

- Affichage de la date: « Dernière mise à jour: 2 septembre 2025 » sous le titre du module.

- Nouveau module « Résultats » (sous le CTA final):
  - 97% Taux de satisfaction du programme
  - 27 Nombre d’apprenants du programme
  - 100% Taux de réussite du programme
  - 0% Taux d’abandon

## Détails d’implémentation
- Fichier: `src/components/sections/PromiseSection.tsx`
  - Ajout de deux objets dans le tableau `promises` (cartes « Prérequis » et « Handicap »)
  - Insertion d’un label de date sous le titre du module
  - Comportement identique aux autres cartes (ouverture au clic/survol, responsive)
- Fichier: `src/components/sections/ResultsSection.tsx`
  - Nouveau composant module « Résultats »
- Fichier: `src/app/bootcamp/page.tsx`
  - Import et insertion de `ResultsSection` sous `FinalCtaSection`

## Rationale Qualiopi
- Rend explicite l’accès au dispositif de formation et les conditions d’entrée (absence de prérequis spécifiques + exigence d’être en situation de vente), afin d’aligner la page avec les critères Qualiopi.

## Tests manuels
- [ ] Desktop: les cartes « Prérequis » et « Handicap » apparaissent en fin de liste et s’ouvrent au survol/clic
- [ ] Mobile: la carte affiche le bouton +/− et se replie correctement
- [ ] Accessibilité: focus/clavier permettent d’ouvrir/fermer la carte
- [ ] Pas de régression de style sur les cartes précédentes
- [ ] Le libellé « Dernière mise à jour: 2 septembre 2025 » s’affiche sous le titre
- [ ] Le module « Résultats » s’affiche bien sous le CTA final avec les 4 KPI

## Fichiers modifiés / ajoutés
- `src/components/sections/PromiseSection.tsx`
- `src/components/sections/ResultsSection.tsx`
- `src/app/bootcamp/page.tsx`

## Capture d’écran (optionnel)
Ajouter un screenshot de la carte ouverte et fermée.

---

### Instructions pour le reviewer
- Vérifier le wording exact (français) et la conformité vis‑à‑vis Qualiopi.
- Confirmer l’ordre d’affichage (carte en dernière position).
