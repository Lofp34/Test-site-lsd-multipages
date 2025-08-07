# Tests d'intégration pour les composants Chat

## FileUploader.integration.test.tsx

Ce fichier contient les tests d'intégration pour le composant `FileUploader`, créé dans le cadre de la tâche 9 du spec "correction-erreur-chat-webpack".

### Objectifs des tests

Les tests vérifient les requirements suivants :

- **Requirement 1.1** : Absence d'erreurs webpack lors du chargement du composant
- **Requirement 1.2** : Fonctionnement complet de l'upload de fichiers
- **Requirement 3.3** : Validation end-to-end du processus d'upload

### Structure des tests

#### 1. Intégration avec le service de fichiers
- Rendu sans erreurs webpack
- Utilisation correcte du FileService
- Validation des fichiers via le service
- Gestion des erreurs de validation
- Upload de fichiers valides
- Upload de fichiers multiples
- Affichage de la progression d'upload

#### 2. Gestion des erreurs de service
- Erreurs d'instanciation du service
- Erreurs des méthodes du service
- Échecs d'upload gracieux

#### 3. Interface utilisateur et interactions
- Support du drag and drop
- Gestion des erreurs utilisateur
- Affichage des informations de limites
- État désactivé

#### 4. Compatibilité navigateur et environnement
- Fonctionnement côté client
- Gestion des APIs manquantes

#### 5. Performance et optimisations
- Prévention des fuites mémoire
- Gestion des sélections rapides

#### 6. Tests spécifiques aux requirements
- **Requirement 1.1** : Vérification de l'absence d'erreurs webpack
- **Requirement 1.2** : Workflow complet d'upload
- **Requirement 3.3** : Validation du parcours utilisateur end-to-end

### Mocks utilisés

- **FileService** : Service de gestion des fichiers mocké
- **useMobileOptimization** : Hook d'optimisation mobile mocké
- **APIs navigateur** : FileReader, URL, Blob mockés pour les tests

### Configuration

Les tests utilisent :
- **Vitest** comme framework de test
- **@testing-library/react** pour le rendu et les interactions
- **@testing-library/user-event** pour les événements utilisateur
- **jsdom** comme environnement de test

### Exécution

```bash
# Exécuter tous les tests d'intégration du chat
npm run test src/__tests__/components/chat/

# Exécuter uniquement les tests FileUploader
npm run test src/__tests__/components/chat/FileUploader.integration.test.tsx

# Exécuter avec couverture
npm run test:coverage src/__tests__/components/chat/FileUploader.integration.test.tsx
```

### Notes importantes

1. **État actuel** : Les tests sont conçus pour fonctionner avec l'implémentation actuelle du FileUploader qui utilise directement le FileService, pas encore le hook useFileService.

2. **Évolution future** : Quand la tâche 5 (refactoring du FileUploader pour utiliser useFileService) sera complétée, les tests devront être mis à jour pour tester l'intégration avec le hook.

3. **Webpack** : Les tests vérifient spécifiquement l'absence d'erreurs webpack comme "Cannot read properties of undefined (reading 'call')" qui était le problème original.

4. **Environnement** : Les tests simulent un environnement navigateur complet avec toutes les APIs nécessaires.

### Couverture

Les tests couvrent :
- ✅ Rendu du composant sans erreurs
- ✅ Intégration avec le service de fichiers
- ✅ Validation des fichiers
- ✅ Upload de fichiers
- ✅ Gestion d'erreurs
- ✅ Interface utilisateur
- ✅ Drag and drop
- ✅ États de chargement
- ✅ Compatibilité navigateur
- ✅ Performance et nettoyage