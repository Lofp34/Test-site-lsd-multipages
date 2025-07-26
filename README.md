# Laurent Serre Développement

Site web professionnel Next.js 15 pour Laurent Serre, expert en développement commercial PME avec 20 ans d'expérience terrain.

## 🎯 Vue d'ensemble

**Laurent Serre Développement** est une plateforme web moderne dédiée à l'accompagnement commercial des PME. Le site combine expertise technique avancée et stratégie SEO optimisée pour positionner Laurent Serre comme référence en développement commercial.

### Identité du projet
- **Expert** : Laurent Serre, 20 ans d'expérience terrain
- **Spécialité** : Développement commercial pour PME (10-100 salariés)  
- **Localisation** : Mauguio (Montpellier), Occitanie
- **Services** : Formation, coaching, transformation commerciale, diagnostic

## 🚀 Fonctionnalités principales

- **Cocon sémantique SEO** optimisé pour "expert développement commercial PME"
- **Système de lead magnets** avec 11+ ressources téléchargeables
- **Intégration HubSpot** pour la gestion des leads
- **Blog professionnel** avec articles SEO-optimisés
- **Bootcamp commercial** avec système d'inscription
- **Diagnostic commercial gratuit** avec formulaire intégré
- **Performance optimisée** (Core Web Vitals, Lighthouse 90+)

## 🛠️ Stack technique

- **[Next.js 15](https://nextjs.org/)** avec App Router
- **[TypeScript](https://www.typescriptlang.org/)** strict pour la robustesse
- **[Tailwind CSS 3.4](https://tailwindcss.com/)** avec charte graphique personnalisée (mode clair uniquement)
- **[Framer Motion 12](https://www.framer.com/motion/)** pour les animations avancées
- **[React 19](https://react.dev/)** avec les dernières fonctionnalités

## 📁 Architecture du projet

```
src/
├── app/                           # App Router Next.js 15
│   ├── globals.css               # Styles globaux + variables CSS
│   ├── layout.tsx                # Layout principal avec fonts & SEO
│   ├── page.tsx                  # Page d'accueil optimisée
│   ├── sitemap.ts               # Sitemap dynamique
│   ├── robots.ts                # Robots.txt dynamique
│   ├── bootcamp/                # Formation commerciale intensive
│   ├── diagnostic/              # Diagnostic commercial gratuit
│   ├── ressources/              # Lead magnets et guides
│   ├── blog/                    # Articles SEO-optimisés
│   └── [cocon-pages]/           # Pages du cocon sémantique
├── components/
│   ├── ui/                      # Composants UI réutilisables
│   ├── layout/                  # Header, Footer, Navigation
│   ├── sections/                # Sections de pages
│   └── templates/               # Templates de pages
├── data/                        # Données structurées
├── hooks/                       # Hooks React personnalisés
├── utils/                       # Utilitaires et helpers
└── types/                       # Types TypeScript
```

## 🎨 Charte graphique & Design System

### Palette de couleurs (Mode clair uniquement)
```css
primary: {
  bg: '#F2F5F7',        // Fond principal - Gris clair bleuté
  title: '#1B365D',     // Titres & blocs clés - Bleu encre  
  accent: '#00BDA4',    // Accents visuels - Vert menthe doux
  secondary: '#414141', // Éléments secondaires - Gris anthracite
  emotion: '#FFAA5C',   // Icônes/Émotions - Orange doux
}
```

**Note importante** : Le site utilise exclusivement le mode clair pour garantir une expérience utilisateur cohérente et optimiser les performances. Le mode sombre a été complètement supprimé du projet.

### Typographie système
- **Titres** : Inter + Roboto Slab (serif)
- **Corps** : Open Sans (sans-serif)  
- **Italique** : Nunito (sans-serif)

### Animations personnalisées
- `animate-fade-in-up` - Apparition depuis le bas
- `animate-slide-in-left/right` - Glissements latéraux
- `animate-bounce-in` - Apparition avec rebond
- `animate-float` - Effet de flottement pour les éléments décoratifs
- `animate-glow` - Effet de lueur pour les CTA importants

## 🚀 Installation et développement

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Git

### Installation
```bash
# Cloner le repository
git clone [repository-url]
cd laurent-serre-developpement

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés API
```

### Variables d'environnement
```bash
# .env.local
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your_portal_id
HUBSPOT_API_KEY=your_api_key  
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
```

### Développement
```bash
# Serveur de développement
npm run dev

# Build de production
npm run build

# Tests et validation
npm run test
npm run lint
npm run validate:links
```

### Outils de développement recommandés

#### VS Code Extensions
- **ES7+ React/Redux/React-Native snippets** - Snippets React/TS
- **Tailwind CSS IntelliSense** - Autocomplétion Tailwind
- **TypeScript Importer** - Import automatique
- **Prettier** - Formatage de code
- **GitLens** - Intégration Git avancée

## 📝 Scripts disponibles

### Développement
- `npm run dev` - Serveur de développement (port 3000)
- `npm run build` - Build de production optimisé
- `npm run start` - Serveur de production
- `npm run lint` - Vérification ESLint

### Tests et validation
- `npm run test` - Tests unitaires avec Vitest
- `npm run test:run` - Tests en mode CI
- `npm run test:coverage` - Rapport de couverture
- `npm run test:book-optimization` - Tests d'optimisation des pages livres
- `npm run validate:links` - Validation des liens internes/externes
- `npm run test:redirects` - Tests des redirections

### SEO et performance
- `npm run postbuild` - Génération du sitemap (automatique après build)
- `npm run test:seo` - Tests SEO automatisés
- `npm run test:performance` - Tests de performance

## 🎯 Stratégie SEO & Cocon sémantique

### Pages du cocon (Priorité SEO)
- ✅ `/expert-developpement-commercial-pme` - Page cible principale
- ✅ `/formation-commerciale-pme` - Formation spécialisée PME
- ✅ `/transformation-commerciale` - Accompagnement transformation
- ✅ `/diagnostic` - Diagnostic commercial gratuit (conversion)
- ✅ `/consultant-commercial-montpellier` - Ancrage local
- ✅ `/formateur-vente-pme` - Expertise formation
- ❌ `/coach-commercial-entreprise` - **À créer en priorité**

### Objectifs SEO
- **Requête principale** : "expert développement commercial PME" (Top 3)
- **Trafic organique** : +400% en 6 mois
- **Leads qualifiés** : +45/mois via SEO
- **Core Web Vitals** : Tous verts (LCP < 2.5s, FID < 100ms, CLS < 0.1)

## 🔧 Intégrations techniques

### HubSpot CRM
- **Formulaires** : Intégration native des formulaires HubSpot
- **Lead tracking** : Suivi automatique des conversions
- **Lead magnets** : 11+ ressources connectées au CRM

### Analytics & SEO
- **Google Analytics 4** : Tracking avancé des conversions
- **Search Console** : Monitoring SEO automatisé
- **Schema.org** : Données structurées (Person, ProfessionalService, Article)
- **Sitemap dynamique** : Génération automatique avec priorités

### Performance
- **Images Next.js** : Optimisation automatique (AVIF/WebP)
- **Cache agressif** : Headers optimisés pour les performances
- **Compression** : Gzip/Brotli activé
- **Core Web Vitals** : Monitoring continu

## 📊 Métriques de succès

### SEO (Objectifs 6 mois)
- Position "expert développement commercial PME" : **Top 3**
- Trafic organique : **+400%**
- Pages vues cocon : **+500%**
- Temps sur site : **+30%**

### Conversions
- Téléchargements ressources : **+300%**
- Demandes diagnostic : **+250%**  
- Leads qualifiés : **+45/mois**
- Taux conversion global : **+80%**

### Performance technique
- **CSS optimisé** : -25-30% de taille grâce à la suppression du mode sombre
- **Compilation** : +15% plus rapide
- **Core Web Vitals** : Tous verts (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- **Lighthouse Score** : 90+ maintenu

## 🚀 Déploiement

### Vercel (Production)
```bash
# Déploiement automatique sur push main
git push origin main

# Preview deployments sur PR
git push origin feature-branch
```

### Monitoring
- **Uptime** : Surveillance 24/7
- **Core Web Vitals** : Alertes automatiques
- **Error tracking** : Logs centralisés
- **SEO monitoring** : Positions et trafic

## 📚 Documentation technique

- [Architecture technique détaillée](./docs/architecture-technique.md)
- [Stratégie SEO & Cocon sémantique](./docs/strategie-seo-cocon.md)
- [Guide des composants](./src/components/README.md)
- [Standards de développement](./docs/standards-dev.md)

## 🤝 Contribution

### Standards de code
- **TypeScript strict** obligatoire
- **Tests unitaires** pour les composants critiques
- **Accessibilité** (WCAG 2.1 AA minimum)
- **Performance** (Lighthouse 90+ requis)
- **Mode clair uniquement** : Aucune classe `dark:` autorisée
- **CSS optimisé** : Variables et styles pour le mode clair uniquement

### Workflow
1. Créer une branche feature
2. Développer avec tests
3. Valider Lighthouse + accessibilité
4. Pull Request avec review
5. Merge après validation

---

**Laurent Serre Développement** - Expert commercial PME depuis 20 ans  
Construit avec Next.js 15, TypeScript et Tailwind CSS
