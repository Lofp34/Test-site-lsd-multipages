# Guide de Récupération Next.js - Erreur ERR_INVALID_PACKAGE_CONFIG

## 🚨 Diagnostic Rapide

Si vous rencontrez l'erreur `ERR_INVALID_PACKAGE_CONFIG`, suivez ce guide étape par étape pour résoudre le problème.

### Symptômes Courants

- ❌ `npm run dev` échoue avec `ERR_INVALID_PACKAGE_CONFIG`
- ❌ Erreur dans `node_modules/next/dist/compiled/conf/package.json`
- ❌ Le serveur Next.js ne démarre pas
- ❌ Messages d'erreur liés à `node:internal/modules/package_json_reader`

## 🔧 Solution Rapide (5 minutes)

### Étape 1: Diagnostic Automatique
```bash
npm run diagnose
```

### Étape 2: Nettoyage Complet
```bash
npm run clean:environment
```

### Étape 3: Réinstallation Propre
```bash
npm run fresh:install
```

### Étape 4: Vérification
```bash
npm run dev
```

## 📋 Procédure Détaillée

### 1. Diagnostic de l'Environnement

Avant toute intervention, diagnostiquez l'état actuel :

```bash
# Diagnostic complet avec rapport
npm run diagnose

# Diagnostic avec sortie JSON
npm run diagnose:json

# Sauvegarder le diagnostic
npm run diagnose:save
```

**Ce que vérifie le diagnostic :**
- ✅ Versions Node.js et npm
- ✅ Intégrité des dépendances critiques
- ✅ État des caches
- ✅ Présence des lock files
- ✅ Permissions des fichiers

### 2. Nettoyage de l'Environnement

#### Option A: Nettoyage Automatique (Recommandé)
```bash
npm run clean:environment
```

#### Option B: Nettoyage Manuel
```bash
# Supprimer node_modules
rm -rf node_modules

# Supprimer les caches Next.js
rm -rf .next

# Nettoyer le cache npm
npm cache clean --force

# Supprimer les lock files
rm -f package-lock.json
rm -f yarn.lock

# Nettoyer les caches système (macOS)
rm -rf ~/Library/Caches/npm
rm -rf ~/.npm
```

### 3. Réinstallation des Dépendances

#### Option A: Installation Automatique (Recommandé)
```bash
npm run fresh:install
```

#### Option B: Installation Manuelle
```bash
# Vérifier les versions
node --version
npm --version

# Installation propre
npm install

# Ou avec cache temporaire
npm ci --cache /tmp/empty-cache
```

### 4. Vérification Post-Installation

```bash
# Test de démarrage
npm run dev

# Vérification de santé
npm run health:check

# Tests complets
npm run test:run
```

## 🛠️ Scripts de Maintenance Préventive

### Scripts Disponibles

| Script | Description | Usage |
|--------|-------------|-------|
| `npm run diagnose` | Diagnostic complet | Quotidien |
| `npm run clean:environment` | Nettoyage automatique | En cas de problème |
| `npm run fresh:install` | Réinstallation propre | Après nettoyage |
| `npm run health:check` | Vérification santé | Avant développement |
| `npm run maintenance:weekly` | Maintenance hebdomadaire | Automatique |

### Maintenance Préventive

#### Quotidienne
```bash
# Vérification rapide avant de commencer
npm run health:check
```

#### Hebdomadaire
```bash
# Maintenance complète
npm run maintenance:weekly
```

#### Mensuelle
```bash
# Nettoyage et réinstallation complète
npm run clean:environment && npm run fresh:install
```

## 🔍 Diagnostic Avancé

### Vérification Manuelle des Modules Critiques

```bash
# Vérifier Next.js
node -e "console.log(require('next/package.json').version)"

# Vérifier React
node -e "console.log(require('react/package.json').version)"

# Vérifier l'intégrité des modules compilés
ls -la node_modules/next/dist/compiled/conf/
```

### Analyse des Logs d'Erreur

```bash
# Démarrage avec logs détaillés
DEBUG=* npm run dev

# Logs npm détaillés
npm run dev --loglevel verbose
```

## 🚨 Cas d'Urgence

### Si le Problème Persiste

1. **Vérifier les permissions** :
   ```bash
   sudo chown -R $(whoami) node_modules
   chmod -R 755 node_modules
   ```

2. **Réinstaller Node.js** :
   - Utiliser nvm pour changer de version
   - Réinstaller npm : `npm install -g npm@latest`

3. **Nettoyer complètement** :
   ```bash
   # Supprimer tout
   rm -rf node_modules package-lock.json .next
   
   # Nettoyer les caches globaux
   npm cache clean --force
   npx clear-npx-cache
   
   # Réinstaller
   npm install
   ```

### Restauration depuis Backup

Si vous avez des backups :

```bash
# Restaurer node_modules depuis backup
cp -r backup/node_modules ./

# Restaurer package-lock.json
cp backup/package-lock.json ./
```

## 📊 Métriques de Succès

Après la récupération, vérifiez :

- ✅ `npm run dev` démarre sans erreur
- ✅ Application accessible sur http://localhost:3000
- ✅ Hot reload fonctionne
- ✅ Build de production réussit : `npm run build`
- ✅ Tests passent : `npm run test:run`

## 🔄 Prévention Future

### Bonnes Pratiques

1. **Utilisez les lock files** : Toujours commiter `package-lock.json`
2. **Versions fixes** : Évitez les ranges trop larges dans package.json
3. **Maintenance régulière** : Lancez `npm run maintenance:weekly`
4. **Monitoring** : Utilisez `npm run health:check` avant de développer

### Configuration Recommandée

Ajoutez à votre `.gitignore` :
```
# Dossiers à ne jamais commiter
node_modules/
.next/
.npm/

# Mais gardez les lock files
!package-lock.json
```

### Hooks Git (Optionnel)

Créez `.git/hooks/pre-commit` :
```bash
#!/bin/sh
npm run health:check
```

## 📞 Support

Si le problème persiste après avoir suivi ce guide :

1. Exécutez `npm run diagnose:save` pour créer un rapport
2. Vérifiez les issues GitHub du projet Next.js
3. Consultez la documentation officielle Next.js
4. Contactez l'équipe de développement avec le rapport de diagnostic

## 📚 Ressources Utiles

- [Documentation Next.js](https://nextjs.org/docs)
- [Troubleshooting npm](https://docs.npmjs.com/troubleshooting)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

**Dernière mise à jour :** $(date)
**Version du guide :** 1.0.0