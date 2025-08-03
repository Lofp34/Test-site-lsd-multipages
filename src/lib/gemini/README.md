# Gemini Chat Multimodal Support

Ce module implémente le support multimodal pour le chat Gemini, permettant aux utilisateurs d'envoyer des images, vidéos et fichiers audio avec leurs messages.

## Architecture

### Services Principaux

#### FileService
- **Localisation** : `src/lib/gemini/file-service.ts`
- **Responsabilité** : Gestion de l'upload et validation des fichiers
- **Fonctionnalités** :
  - Validation des types de fichiers (images, vidéos, audio)
  - Vérification des limites de taille (10MB max)
  - Conversion en base64 pour l'API Gemini
  - Gestion d'erreurs détaillée

#### MultimodalService
- **Localisation** : `src/lib/gemini/multimodal-service.ts`
- **Responsabilité** : Intégration des contenus multimodaux dans les messages
- **Fonctionnalités** :
  - Création de contenus multimodaux compatibles avec l'API Gemini
  - Support des fichiers en base64 et URIs
  - Gestion de l'historique de conversation
  - Optimisation de la mémoire

### Composants UI

#### FileUploader
- **Localisation** : `src/components/chat/FileUploader.tsx`
- **Responsabilité** : Interface d'upload de fichiers
- **Fonctionnalités** :
  - Drag & drop
  - Sélection multiple
  - Validation en temps réel
  - Indicateurs de progression

#### FilePreview
- **Localisation** : `src/components/chat/FilePreview.tsx`
- **Responsabilité** : Prévisualisation des fichiers uploadés
- **Fonctionnalités** :
  - Prévisualisation d'images
  - Contrôles vidéo/audio
  - Informations sur les fichiers
  - Actions de suppression

#### MultimodalChatExample
- **Localisation** : `src/components/chat/MultimodalChatExample.tsx`
- **Responsabilité** : Exemple d'implémentation complète
- **Fonctionnalités** :
  - Interface de chat complète
  - Intégration des composants
  - Gestion des états

### Hook Personnalisé

#### useMultimodalChat
- **Localisation** : `src/hooks/useMultimodalChat.ts`
- **Responsabilité** : Logique métier du chat multimodal
- **Fonctionnalités** :
  - Gestion des états de fichiers
  - Upload automatique
  - Validation des messages
  - Intégration avec l'API

## Types et Interfaces

### Types Principaux
```typescript
interface UploadedFile {
  id: string;
  name: string;
  uri: string;
  mimeType: string;
  size: number;
  uploadedAt: Date;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  files?: UploadedFile[];
  metadata?: {
    tokens?: number;
    processingTime?: number;
    confidence?: number;
  };
}
```

## Utilisation

### Exemple Basique
```typescript
import { FileService } from '@/lib/gemini/file-service';
import { MultimodalService } from '@/lib/gemini/multimodal-service';

const fileService = new FileService(apiKey);
const multimodalService = new MultimodalService(apiKey);

// Upload d'un fichier
const uploadedFile = await fileService.uploadFile(file);

// Création d'un message multimodal
const content = multimodalService.createMultimodalContent({
  text: "Analysez cette image",
  files: [uploadedFile]
});
```

### Avec le Hook
```typescript
import { useMultimodalChat } from '@/hooks/useMultimodalChat';

function ChatComponent() {
  const {
    uploadedFiles,
    addFiles,
    sendMultimodalMessage,
    isUploading
  } = useMultimodalChat(apiKey);

  const handleSend = async () => {
    await sendMultimodalMessage("Votre message");
  };

  return (
    // Interface de chat
  );
}
```

## Configuration

### Types de Fichiers Supportés
- **Images** : JPEG, PNG, GIF, WebP, BMP, SVG
- **Vidéos** : MP4, MPEG, QuickTime, WebM, AVI
- **Audio** : MP3, WAV, OGG, MP4, WebM

### Limites
- **Taille maximum** : 10MB par fichier
- **Nombre de fichiers** : Configurable (défaut: 5)
- **Types MIME** : Validation stricte

## Tests

### Tests Unitaires
- `src/__tests__/lib/gemini/file-service.test.ts` : Tests du service de fichiers
- `src/__tests__/lib/gemini/multimodal-service.test.ts` : Tests du service multimodal

### Couverture
- Validation des fichiers
- Upload et gestion d'erreurs
- Création de contenus multimodaux
- Gestion de l'historique
- Optimisation de la mémoire

## Sécurité

### Validation
- Vérification des types MIME
- Contrôle de la taille des fichiers
- Validation des URIs
- Sanitisation des données

### Gestion des Erreurs
- Messages d'erreur localisés
- Codes d'erreur typés
- Récupération gracieuse
- Logging des erreurs

## Performance

### Optimisations
- Conversion base64 asynchrone
- Gestion de la mémoire pour l'historique
- Lazy loading des composants
- Cache intelligent des réponses

### Métriques
- Temps d'upload
- Taille des fichiers
- Utilisation de la mémoire
- Performances de rendu

## Intégration avec l'API Gemini

### Format des Messages
```typescript
// Message avec fichier base64
{
  role: 'user',
  parts: [
    { text: 'Analysez cette image' },
    {
      inlineData: {
        mimeType: 'image/jpeg',
        data: 'base64_data_here'
      }
    }
  ]
}

// Message avec URI de fichier
{
  role: 'user',
  parts: [
    { text: 'Analysez cette image' },
    {
      fileData: {
        mimeType: 'image/jpeg',
        fileUri: 'https://example.com/file.jpg'
      }
    }
  ]
}
```

## Roadmap

### Améliorations Futures
- [ ] Support des fichiers PDF
- [ ] Compression automatique des images
- [ ] Upload en chunks pour gros fichiers
- [ ] Cache des fichiers uploadés
- [ ] Prévisualisation avancée
- [ ] Métadonnées EXIF pour images
- [ ] Support des playlists audio/vidéo

### Intégrations
- [ ] Intégration avec le système de chat principal
- [ ] Analytics des uploads
- [ ] Monitoring des performances
- [ ] Alertes de sécurité