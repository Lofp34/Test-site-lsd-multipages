# Script de Diagnostic Préventif Next.js

## Description

Le script `diagnose-environment.ts` effectue un diagnostic complet de l'environnement de développement Next.js pour identifier les problèmes potentiels avant qu'ils ne causent des erreurs de démarrage comme `ERR_INVALID_PACKAGE_CONFIG`.

## Utilisation

### Commandes disponibles

```bash
# Diagnostic standard avec affichage console
npm run diagnose

# Diagnostic avec sortie JSON
npm run diagnose:json

# Diagnostic avec sauvegarde du rapport
npm run diagnose:save
```

### Exécution directe

```bash
# Avec tsx
tsx scripts/diagnose-environment.ts

# Avec options
tsx scripts/diagnose-environment.ts --json
tsx scripts/diagnose-environment.ts --save
tsx scripts/diagnose-environment.ts --json --save
```

## Vérifications effectuées

### 1. Versions des outils
- **Node.js** : Vérifie la compatibilité avec Next.js 15 (Node 16+ requis, 18+ recommandé)
- **npm** : Contrôle la version du gestionnaire de packages
- **Next.js** : Détecte la version installée
- **React/TypeScript** : Vérifie les versions des dépendances principales

### 2. Fichiers critiques
- `package.json` : Présence et intégrité
- `next.config.js/ts` : Configuration Next.js
- `tsconfig.json` : Configuration TypeScript
- `tailwind.config.ts` : Configuration Tailwind CSS

### 3. Dépendances
- **Dépendances critiques** : next, react, react-dom
- **Lock files** : Détection de conflits entre package-lock.json et yarn.lock
- **Intégrité** : Vérification de la cohérence du package.json

### 4. Node Modules
- **Présence** : Vérification de l'existence du dossier node_modules
- **Modules critiques** : Contrôle de l'installation des packages essentiels
- **Intégrité Next.js** : Vérification spécifique du module Next.js

### 5. Caches
- **Cache Next.js** : Âge et état du dossier .next
- **Cache npm** : Accessibilité du cache npm

### 6. Permissions
- **Accès fichiers** : Vérification des permissions de lecture
- **Dossiers critiques** : Contrôle d'accès aux répertoires essentiels

## Interprétation des résultats

### Statuts
- ✅ **Succès** : Tout fonctionne correctement
- ⚠️ **Avertissement** : Problème mineur, optimisation possible
- ❌ **Erreur** : Problème critique nécessitant une action

### Score de santé
Le script calcule un score de santé global (0-100%) basé sur le ratio succès/total des vérifications.

### Actions recommandées

#### En cas d'erreurs
1. **Versions incompatibles** : Mettez à jour Node.js/npm
2. **Dépendances manquantes** : `npm install`
3. **Modules corrompus** : `rm -rf node_modules package-lock.json && npm install`
4. **Permissions** : Vérifiez les droits d'accès aux fichiers

#### En cas d'avertissements
1. **Caches anciens** : `rm -rf .next && npm cache clean --force`
2. **Versions anciennes** : Planifiez une mise à jour
3. **Conflits de gestionnaires** : Choisissez npm OU yarn

## Intégration CI/CD

Le script peut être intégré dans des pipelines CI/CD :

```yaml
# GitHub Actions exemple
- name: Environment Diagnostic
  run: npm run diagnose:json
```

## Rapport JSON

Le format JSON permet l'intégration avec d'autres outils :

```json
{
  "timestamp": "2025-01-06T09:38:38.578Z",
  "projectRoot": "/path/to/project",
  "summary": {
    "total": 17,
    "success": 17,
    "warnings": 0,
    "errors": 0
  },
  "results": [...],
  "healthScore": 100
}
```

## Maintenance préventive

Recommandations d'utilisation :

- **Quotidien** : Avant de démarrer le développement
- **Après installation** : Après `npm install` ou mise à jour
- **Debugging** : En cas de problèmes de démarrage
- **CI/CD** : Dans les pipelines de déploiement

## Dépannage

### Le script ne s'exécute pas
```bash
# Vérifiez les permissions
chmod +x scripts/diagnose-environment.ts

# Installez tsx si nécessaire
npm install -g tsx
```

### Erreurs de modules
```bash
# Réinstallez les dépendances
npm install

# Nettoyage complet
rm -rf node_modules package-lock.json .next
npm cache clean --force
npm install
```

## Contribution

Pour ajouter de nouvelles vérifications :

1. Ajoutez une méthode `checkXXX()` dans la classe `EnvironmentDiagnostic`
2. Appelez-la dans `runDiagnostics()`
3. Utilisez `addResult()` pour enregistrer les résultats
4. Testez avec différents scénarios d'erreur

## Historique

- **v1.0** : Diagnostic de base pour Next.js 15
- Vérifications des versions, fichiers, dépendances
- Support JSON et sauvegarde de rapports
- Intégration npm scripts