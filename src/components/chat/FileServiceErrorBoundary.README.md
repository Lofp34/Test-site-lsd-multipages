# FileServiceErrorBoundary

Error Boundary spécialisé pour capturer les erreurs de chargement de modules du FileService et fournir des fallbacks gracieux.

## 🎯 Objectif

Résoudre l'erreur webpack "Cannot read properties of undefined (reading 'call')" qui se produit lors du chargement du FileService côté client, en fournissant une récupération gracieuse et des alternatives fonctionnelles.

## 📋 Fonctionnalités

### ✅ Capture d'erreurs spécialisée
- **Erreurs Webpack** : Module loading, chunk loading failures
- **Erreurs de modules** : Import failures, dynamic import errors  
- **Erreurs de service** : FileService initialization failures
- **Erreurs runtime** : Execution errors

### 🔄 Mécanismes de récupération
- **Retry automatique** : Tentatives automatiques avec backoff exponentiel
- **Retry manuel** : Bouton pour relancer manuellement
- **Mode fallback** : Mode simplifié quand le service complet échoue
- **Actualisation de page** : Option de dernier recours

### 🎨 Interface utilisateur
- **Messages contextuels** : Messages d'erreur adaptés au type d'erreur
- **Suggestions de résolution** : Actions recommandées pour chaque type d'erreur
- **Détails techniques** : Stack traces en mode développement
- **Informations de contact** : Liens vers le support

## 🚀 Utilisation

### Utilisation basique

```tsx
import FileServiceErrorBoundary from '@/components/chat/FileServiceErrorBoundary';
import FileUploader from '@/components/chat/FileUploader';

function MyComponent() {
  return (
    <FileServiceErrorBoundary>
      <FileUploader
        onFileSelect={(files) => console.log(files)}
        acceptedTypes={['image/*', 'video/*']}
        maxFileSize={10 * 1024 * 1024}
        maxFiles={5}
      />
    </FileServiceErrorBoundary>
  );
}
```

### Utilisation avec callbacks

```tsx
<FileServiceErrorBoundary
  onError={(error, errorInfo, errorType) => {
    console.error('Erreur capturée:', { error, errorInfo, errorType });
    // Envoyer à un service de monitoring
  }}
  onRetry={() => {
    console.log('Tentative de récupération');
    // Actions de récupération personnalisées
  }}
  maxAutoRetries={3}
  retryDelay={2000}
>
  <FileUploader {...props} />
</FileServiceErrorBoundary>
```

### Wrapper simplifié

```tsx
import { SimpleFileServiceErrorBoundary } from '@/components/chat/FileServiceErrorBoundary';

function SimpleUsage() {
  return (
    <SimpleFileServiceErrorBoundary
      onError={(error) => console.error(error)}
    >
      <FileUploader {...props} />
    </SimpleFileServiceErrorBoundary>
  );
}
```

### HOC (Higher-Order Component)

```tsx
import { withFileServiceErrorBoundary } from '@/components/chat/FileServiceErrorBoundary';

const ProtectedFileUploader = withFileServiceErrorBoundary(FileUploader, {
  customErrorMessage: 'Service temporairement indisponible',
  maxAutoRetries: 2
});

function HOCUsage() {
  return <ProtectedFileUploader {...props} />;
}
```

## ⚙️ Configuration

### Props principales

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Composants à protéger |
| `onError` | `(error, errorInfo, errorType) => void` | - | Callback d'erreur |
| `onRetry` | `() => void` | - | Callback de retry |
| `maxAutoRetries` | `number` | `2` | Nombre de tentatives automatiques |
| `retryDelay` | `number` | `2000` | Délai entre tentatives (ms) |
| `disableFallback` | `boolean` | `false` | Désactive le mode fallback |
| `customErrorMessage` | `string` | - | Message d'erreur personnalisé |
| `showTechnicalDetails` | `boolean` | `false` | Affiche les détails techniques |

### Types d'erreurs détectés

```typescript
type ErrorType = 
  | 'webpack'              // Erreurs webpack/bundling
  | 'module_loading'       // Erreurs de chargement de modules
  | 'service_initialization' // Erreurs d'init du service
  | 'runtime'              // Erreurs d'exécution
  | 'unknown';             // Erreurs non classifiées
```

## 🔧 Intégration avec le FileService

### Problème résolu

L'erreur webpack `Cannot read properties of undefined (reading 'call')` se produit quand :

1. Le FileService tente d'importer des modules non disponibles côté client
2. Les dépendances webpack ne sont pas correctement résolues
3. Les modules dynamiques échouent à se charger

### Solution apportée

```tsx
// Avant (erreur webpack)
function ProblematicComponent() {
  return <FileUploader />; // ❌ Crash si FileService échoue
}

// Après (avec error boundary)
function SafeComponent() {
  return (
    <FileServiceErrorBoundary>
      <FileUploader /> {/* ✅ Fallback gracieux si erreur */}
    </FileServiceErrorBoundary>
  );
}
```

## 🎨 Interface utilisateur

### États d'affichage

#### 1. Fonctionnement normal
- Rendu transparent des composants enfants
- Aucune interface visible

#### 2. Erreur capturée
```
⚠️ Service de fichiers indisponible
Type d'erreur: webpack

Erreur de chargement des modules. Le service de fichiers 
ne peut pas être initialisé correctement.

💡 Solutions suggérées:
• Actualisez la page pour recharger les modules
• Vérifiez que JavaScript est activé
• Essayez de vider le cache du navigateur

[🔄 Réessayer (0/3)] [🛠️ Mode simplifié] [🔄 Actualiser la page]
```

#### 3. Mode fallback
```
📁 Mode simplifié

Le service de fichiers fonctionne en mode limité. 
Certaines fonctionnalités avancées peuvent ne pas être disponibles.

[🔄 Réessayer le mode complet]
```

## 🧪 Tests et debugging

### Composant de test

```tsx
import { ErrorBoundaryTestComponent } from '@/components/chat/FileServiceErrorBoundary.example';

// En mode développement uniquement
function DevTools() {
  return <ErrorBoundaryTestComponent />;
}
```

### Types d'erreurs testables

- **Webpack** : `Cannot read properties of undefined (reading 'call')`
- **Module** : `Loading chunk 1 failed`
- **Service** : `FileService initialization failed`
- **Runtime** : `Runtime execution error`

## 📊 Monitoring et analytics

### Intégration avec Sentry

```tsx
<FileServiceErrorBoundary
  onError={(error, errorInfo, errorType) => {
    if (window.Sentry) {
      window.Sentry.captureException(error, {
        tags: { component: 'FileService', errorType },
        extra: { componentStack: errorInfo.componentStack }
      });
    }
  }}
>
  <FileUploader />
</FileServiceErrorBoundary>
```

### Intégration avec Google Analytics

```tsx
<FileServiceErrorBoundary
  onError={(error, errorInfo, errorType) => {
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: `FileService ${errorType}: ${error.message}`,
        fatal: false
      });
    }
  }}
>
  <FileUploader />
</FileServiceErrorBoundary>
```

## 🔄 Stratégies de récupération

### 1. Retry automatique
- Activé pour les erreurs `webpack` et `module_loading`
- Backoff exponentiel : 2s, 4s, 8s...
- Maximum 3 tentatives par défaut

### 2. Mode fallback
- Service simplifié sans fonctionnalités avancées
- Validation basique côté client uniquement
- Interface utilisateur adaptée

### 3. Actualisation de page
- Option de dernier recours
- Recharge complète de l'application
- Perte de l'état actuel

## 🚨 Gestion des erreurs critiques

### Erreurs non récupérables
- Erreurs de sécurité
- Corruptions de mémoire
- Erreurs de réseau persistantes

### Actions recommandées
1. Log détaillé pour investigation
2. Notification à l'équipe technique
3. Fallback vers interface minimale
4. Message utilisateur informatif

## 📝 Bonnes pratiques

### ✅ À faire
- Wrapper tous les composants utilisant FileService
- Configurer des callbacks de monitoring
- Tester les différents types d'erreurs
- Personnaliser les messages selon le contexte

### ❌ À éviter
- Ignorer les erreurs capturées
- Désactiver le mode fallback sans alternative
- Afficher des détails techniques en production
- Retry infini sans limite

## 🔗 Liens utiles

- [React Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
- [Webpack Module Loading](https://webpack.js.org/concepts/modules/)
- [FileService Documentation](../lib/gemini/file-service-interface.ts)
- [useFileService Hook](../../hooks/useFileService.ts)

## 📞 Support

En cas de problème persistant :
- 📧 Email: contact@laurent-serre-developpement.fr
- 🌐 FAQ: Section ressources du site
- ⏰ Délai de réponse: 24h en moyenne