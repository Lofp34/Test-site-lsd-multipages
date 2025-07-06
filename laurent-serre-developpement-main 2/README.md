# Site Internet Next.js - Hello World

Un projet Next.js moderne et élégant, configuré pour faciliter l'ajout d'effets visuels, d'animations et d'interactions dynamiques.

## 🚀 Fonctionnalités

- **Next.js 15** avec App Router
- **TypeScript** pour un code robuste et typé
- **Tailwind CSS** avec animations personnalisées
- **Mode sombre** automatique
- **Structure modulaire** prête pour l'extension
- **Responsive design** adaptatif

## 🛠️ Technologies utilisées

- [Next.js](https://nextjs.org/) - Framework React
- [TypeScript](https://www.typescriptlang.org/) - Typage statique
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire
- [ESLint](https://eslint.org/) - Linting du code

## 📁 Structure du projet

```
src/
├── app/
│   ├── globals.css      # Styles globaux
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Page d'accueil Hello World
└── components/
    ├── ui/              # Composants UI de base (à créer)
    ├── layout/          # Composants de mise en page (à créer)
    ├── features/        # Composants fonctionnels (à créer)
    └── animations/      # Composants d'animation (à créer)
```

## 🎨 Animations disponibles

Le projet inclut des animations Tailwind personnalisées prêtes à utiliser :

- `animate-fade-in` - Apparition en fondu
- `animate-fade-in-up` - Apparition depuis le bas
- `animate-fade-in-down` - Apparition depuis le haut
- `animate-slide-in-left` - Glissement depuis la gauche
- `animate-slide-in-right` - Glissement depuis la droite
- `animate-bounce-in` - Apparition avec rebond
- `animate-float` - Effet de flottement
- `animate-glow` - Effet de lueur
- `animate-pulse-slow` - Pulsation lente

## 🚀 Démarrage rapide

1. **Installation des dépendances**
   ```bash
   npm install
   ```

2. **Lancement du serveur de développement**
   ```bash
   npm run dev
   ```

3. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## 📝 Scripts disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run start` - Serveur de production
- `npm run lint` - Vérification du code

## 🎯 Prochaines étapes suggérées

### Composants à ajouter
- [ ] Header avec navigation
- [ ] Footer avec liens
- [ ] Composants de formulaire
- [ ] Modales et overlays
- [ ] Carousels et sliders
- [ ] Graphiques et visualisations

### Effets visuels à implémenter
- [ ] Animations de transition de page
- [ ] Effets de parallaxe
- [ ] Interactions au scroll
- [ ] Hover effects avancés
- [ ] Particules animées
- [ ] Morphing de formes

### Fonctionnalités avancées
- [ ] Système de thèmes personnalisés
- [ ] Internationalisation (i18n)
- [ ] PWA (Progressive Web App)
- [ ] Optimisation des performances
- [ ] Tests automatisés
- [ ] Déploiement automatique

## 🎨 Personnalisation

### Couleurs
Les couleurs peuvent être personnalisées dans `tailwind.config.ts` et `src/app/globals.css`.

### Animations
Ajoutez de nouvelles animations dans la section `keyframes` de `tailwind.config.ts`.

### Composants
Créez de nouveaux composants dans le dossier `src/components/` en suivant la structure recommandée.

## 📚 Ressources utiles

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Guide TypeScript](https://www.typescriptlang.org/docs/)
- [Exemples d'animations CSS](https://animate.style/)

## 🤝 Contribution

Ce projet est conçu pour être facilement extensible. N'hésitez pas à ajouter de nouveaux composants, animations et fonctionnalités !

---

Créé avec ❤️ en utilisant Next.js 15 et Tailwind CSS
