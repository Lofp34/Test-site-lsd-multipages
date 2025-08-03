import { ChatConfiguration, ChatErrorType } from './types';

// Instructions système Laurent Serre
export const LAURENT_SERRE_SYSTEM_INSTRUCTION = `
Tu es l'assistant IA de Laurent Serre, expert en développement commercial pour PME avec 20 ans d'expérience terrain à Montpellier.

IDENTITÉ ET EXPERTISE :
- Expert reconnu en développement commercial PME (10-100 salariés)
- Formateur et coach spécialisé en transformation commerciale
- Approche pragmatique, sans bullshit, axée résultats concrets
- Basé à Montpellier, Occitanie

DOMAINES DE COMPÉTENCE :
- Prospection et génération de leads
- Négociation et closing
- Management d'équipes commerciales
- Transformation digitale commerciale
- Formation et coaching terrain

STYLE DE COMMUNICATION :
- Ton expert mais accessible
- Exemples concrets de PME
- Conseils actionnables immédiatement
- Références aux outils et méthodes éprouvées
- Orientation vers les services Laurent Serre quand pertinent

OBJECTIFS :
- Qualifier les besoins commerciaux du visiteur
- Démontrer l'expertise par des conseils de valeur
- Orienter naturellement vers les formations/coaching
- Générer des leads qualifiés

Si une question dépasse ton expertise commerciale, redirige vers les domaines de compétence de Laurent Serre.
`;

// Configuration par défaut du chat
export const DEFAULT_CHAT_CONFIG: ChatConfiguration = {
  gemini: {
    model: 'gemini-2.5-flash',
    apiKey: process.env.GEMINI_API_KEY || '',
    temperature: 0.7,
    thinkingBudget: 0, // Désactivé pour la performance
    maxTokens: 2048,
  },
  
  systemInstruction: LAURENT_SERRE_SYSTEM_INSTRUCTION,
  
  ui: {
    theme: 'laurent-serre',
    position: 'bottom-right',
    maxHeight: '600px',
    maxWidth: '400px',
    animationDuration: 300,
  },
  
  limits: {
    maxMessagesPerSession: 50,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedFileTypes: ['image/*', 'video/*', 'audio/*'],
    rateLimitPerMinute: 20,
  },
};

// Messages d'erreur utilisateur
export const ERROR_MESSAGES = {
  [ChatErrorType.API_UNAVAILABLE]: {
    title: "Service temporairement indisponible",
    message: "Notre assistant IA est momentanément indisponible. Vous pouvez me contacter directement via le formulaire de contact.",
    action: "Contacter Laurent Serre"
  },
  [ChatErrorType.RATE_LIMIT]: {
    title: "Trop de messages",
    message: "Merci de patienter quelques instants avant d'envoyer un nouveau message.",
    action: "Réessayer dans 30s"
  },
  [ChatErrorType.FILE_TOO_LARGE]: {
    title: "Fichier trop volumineux",
    message: "Veuillez sélectionner un fichier de moins de 10MB.",
    action: "Choisir un autre fichier"
  },
  [ChatErrorType.UNSUPPORTED_FILE]: {
    title: "Type de fichier non supporté",
    message: "Seuls les fichiers image, vidéo et audio sont acceptés.",
    action: "Choisir un autre fichier"
  },
  [ChatErrorType.NETWORK_ERROR]: {
    title: "Erreur de connexion",
    message: "Vérifiez votre connexion internet et réessayez.",
    action: "Réessayer"
  },
  [ChatErrorType.QUOTA_EXCEEDED]: {
    title: "Limite atteinte",
    message: "Vous avez atteint la limite d'utilisation. Contactez-nous pour plus d'informations.",
    action: "Contacter le support"
  }
};

// Configuration par environnement
export const getChatConfig = (): ChatConfiguration => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return {
    ...DEFAULT_CHAT_CONFIG,
    gemini: {
      ...DEFAULT_CHAT_CONFIG.gemini,
      thinkingBudget: isDevelopment ? 1000 : 0, // Activé en dev pour debug
    }
  };
};

// Validation de la configuration
export const validateChatConfig = (config: ChatConfiguration): boolean => {
  if (!config.gemini.apiKey) {
    console.error('GEMINI_API_KEY is required');
    return false;
  }
  
  if (!config.systemInstruction) {
    console.error('System instruction is required');
    return false;
  }
  
  return true;
};