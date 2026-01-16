/**
 * Validateur et sanitiseur d'inputs pour l'API Chat Gemini
 * Sécurise les entrées utilisateur contre les attaques
 */

import DOMPurify from 'isomorphic-dompurify';

export interface ValidationConfig {
  maxMessageLength: number;
  maxFileSize: number;
  allowedMimeTypes: string[];
  maxFilesPerRequest: number;
  allowHtml?: boolean;
  allowMarkdown?: boolean;
  blockedPatterns?: RegExp[];
  requiredFields?: string[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedName?: string;
}

export class InputValidator {
  private config: ValidationConfig;
  private suspiciousPatterns: RegExp[];
  private sqlInjectionPatterns: RegExp[];
  private xssPatterns: RegExp[];
  private commandInjectionPatterns: RegExp[];

  constructor(config: ValidationConfig) {
    this.config = {
      allowHtml: false,
      allowMarkdown: true,
      blockedPatterns: [],
      requiredFields: [],
      ...config,
    };

    // Patterns de détection d'attaques
    this.suspiciousPatterns = [
      /javascript:/gi,
      /data:text\/html/gi,
      /vbscript:/gi,
      /onload\s*=/gi,
      /onerror\s*=/gi,
      /onclick\s*=/gi,
      /<iframe/gi,
      /<object/gi,
      /<embed/gi,
      /<applet/gi,
    ];

    this.sqlInjectionPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/gi,
      /(\b(OR|AND)\s+\d+\s*=\s*\d+)/gi,
      /('|(\\')|(;)|(--)|(\|)|(\*)|(%27)|(%3D)|(%3B)|(%2D%2D))/gi,
      /(\b(WAITFOR|DELAY)\b)/gi,
    ];

    this.xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /<img[^>]+src[\s]*=[\s]*["']javascript:/gi,
      /<[^>]*\bon\w+\s*=/gi,
      /expression\s*\(/gi,
      /url\s*\(\s*javascript:/gi,
    ];

    this.commandInjectionPatterns = [
      /(\||&|;|\$\(|`)/g,
      /(rm\s|del\s|format\s|shutdown\s)/gi,
      /(wget\s|curl\s|nc\s|netcat\s)/gi,
      /(\.\.|\/etc\/|\/proc\/|\/sys\/)/gi,
    ];
  }

  /**
   * Valide une requête complète
   */
  validateRequest(request: {
    message: string;
    files: any[];
    config: any;
  }): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validation du message
    const messageValidation = this.validateMessage(request.message);
    if (!messageValidation.isValid) {
      errors.push(...messageValidation.errors);
    }
    warnings.push(...messageValidation.warnings);

    // Validation des fichiers
    if (request.files && request.files.length > 0) {
      const filesValidation = this.validateFiles(request.files);
      if (!filesValidation.isValid) {
        errors.push(...filesValidation.errors);
      }
      warnings.push(...filesValidation.warnings);
    }

    // Validation de la configuration
    const configValidation = this.validateConfig(request.config);
    if (!configValidation.isValid) {
      errors.push(...configValidation.errors);
    }
    warnings.push(...configValidation.warnings);

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Valide un message texte
   */
  validateMessage(message: string): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Vérification de base
    if (!message || typeof message !== 'string') {
      errors.push('Message requis et doit être une chaîne de caractères');
      return { isValid: false, errors, warnings };
    }

    // Longueur du message
    if (message.length > this.config.maxMessageLength) {
      errors.push(`Message trop long (max ${this.config.maxMessageLength} caractères)`);
    }

    if (message.length === 0) {
      errors.push('Message vide non autorisé');
    }

    // Détection de patterns suspects
    for (const pattern of this.suspiciousPatterns) {
      if (pattern.test(message)) {
        errors.push('Contenu suspect détecté');
        break;
      }
    }

    // Détection SQL injection
    for (const pattern of this.sqlInjectionPatterns) {
      if (pattern.test(message)) {
        warnings.push('Possible tentative d\'injection SQL détectée');
        break;
      }
    }

    // Détection XSS
    for (const pattern of this.xssPatterns) {
      if (pattern.test(message)) {
        errors.push('Contenu XSS détecté');
        break;
      }
    }

    // Détection command injection
    for (const pattern of this.commandInjectionPatterns) {
      if (pattern.test(message)) {
        warnings.push('Possible tentative d\'injection de commande détectée');
        break;
      }
    }

    // Patterns personnalisés bloqués
    for (const pattern of this.config.blockedPatterns || []) {
      if (pattern.test(message)) {
        errors.push('Contenu non autorisé détecté');
        break;
      }
    }

    // Vérification de caractères de contrôle dangereux
    if (/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(message)) {
      warnings.push('Caractères de contrôle détectés');
    }

    // Vérification d'encodage suspect
    if (/%[0-9a-fA-F]{2}/.test(message)) {
      const decoded = decodeURIComponent(message);
      if (decoded !== message) {
        // Re-valider le contenu décodé
        const decodedValidation = this.validateMessage(decoded);
        if (!decodedValidation.isValid) {
          errors.push('Contenu encodé suspect');
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Valide une liste de fichiers
   */
  validateFiles(files: any[]): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!Array.isArray(files)) {
      errors.push('Liste de fichiers invalide');
      return { isValid: false, errors, warnings };
    }

    // Nombre de fichiers
    if (files.length > this.config.maxFilesPerRequest) {
      errors.push(`Trop de fichiers (max ${this.config.maxFilesPerRequest})`);
    }

    // Validation individuelle
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileValidation = this.validateFile(file);
      
      if (!fileValidation.isValid) {
        errors.push(`Fichier ${i + 1}: ${fileValidation.error}`);
      }
    }

    // Taille totale
    const totalSize = files.reduce((sum, file) => sum + (file.size || 0), 0);
    if (totalSize > this.config.maxFileSize * files.length) {
      warnings.push('Taille totale des fichiers importante');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Valide un fichier individuel
   */
  validateFile(file: any): FileValidationResult {
    if (!file || typeof file !== 'object') {
      return {
        isValid: false,
        error: 'Fichier invalide',
      };
    }

    // Vérification des propriétés requises
    if (!file.name || !file.mimeType) {
      return {
        isValid: false,
        error: 'Propriétés de fichier manquantes (name, mimeType)',
      };
    }

    // Taille du fichier
    if (file.size && file.size > this.config.maxFileSize) {
      return {
        isValid: false,
        error: `Fichier trop volumineux (max ${this.config.maxFileSize / (1024 * 1024)}MB)`,
      };
    }

    // Type MIME
    if (!this.config.allowedMimeTypes.includes(file.mimeType)) {
      return {
        isValid: false,
        error: `Type de fichier non autorisé: ${file.mimeType}`,
      };
    }

    // Validation du nom de fichier
    const sanitizedName = this.sanitizeFileName(file.name);
    if (!sanitizedName) {
      return {
        isValid: false,
        error: 'Nom de fichier invalide',
      };
    }

    // Vérification d'extensions dangereuses
    const dangerousExtensions = [
      '.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.js', '.jar',
      '.php', '.asp', '.jsp', '.sh', '.ps1', '.py', '.rb', '.pl'
    ];

    const extension = sanitizedName.toLowerCase().substring(sanitizedName.lastIndexOf('.'));
    if (dangerousExtensions.includes(extension)) {
      return {
        isValid: false,
        error: 'Extension de fichier non autorisée',
      };
    }

    return {
      isValid: true,
      sanitizedName,
    };
  }

  /**
   * Valide la configuration
   */
  validateConfig(config: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!config || typeof config !== 'object') {
      return { isValid: true, errors, warnings }; // Config optionnelle
    }

    // Validation de la température
    if (config.temperature !== undefined) {
      if (typeof config.temperature !== 'number' || 
          config.temperature < 0 || 
          config.temperature > 1) {
        errors.push('Temperature doit être un nombre entre 0 et 1');
      }
    }

    // Validation des tokens
    if (config.maxTokens !== undefined) {
      if (typeof config.maxTokens !== 'number' || 
          config.maxTokens < 1 || 
          config.maxTokens > 8192) {
        errors.push('maxTokens doit être un nombre entre 1 et 8192');
      }
    }

    // Validation du modèle
    if (config.model !== undefined) {
      const allowedModels = ['gemini-2.5-flash', 'gemini-2.5-pro'];
      if (!allowedModels.includes(config.model)) {
        errors.push(`Modèle non autorisé: ${config.model}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Sanitise un message texte
   */
  sanitizeMessage(message: string): string {
    if (!message || typeof message !== 'string') {
      return '';
    }

    let sanitized = message;

    // Supprimer les caractères de contrôle
    sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

    // Limiter la longueur
    if (sanitized.length > this.config.maxMessageLength) {
      sanitized = sanitized.substring(0, this.config.maxMessageLength);
    }

    // Sanitisation HTML si nécessaire
    if (!this.config.allowHtml) {
      sanitized = DOMPurify.sanitize(sanitized, { 
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: [],
      });
    } else {
      // Sanitisation HTML permissive
      sanitized = DOMPurify.sanitize(sanitized, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li'],
        ALLOWED_ATTR: [],
      });
    }

    // Échapper les caractères spéciaux pour éviter l'injection
    sanitized = sanitized
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');

    // Normaliser les espaces
    sanitized = sanitized.replace(/\s+/g, ' ').trim();

    return sanitized;
  }

  /**
   * Sanitise un nom de fichier
   */
  sanitizeFileName(fileName: string): string {
    if (!fileName || typeof fileName !== 'string') {
      return '';
    }

    // Supprimer les caractères dangereux
    let sanitized = fileName.replace(/[<>:"/\\|?*\x00-\x1f]/g, '');
    
    // Supprimer les points en début/fin
    sanitized = sanitized.replace(/^\.+|\.+$/g, '');
    
    // Limiter la longueur
    if (sanitized.length > 255) {
      const extension = sanitized.substring(sanitized.lastIndexOf('.'));
      const name = sanitized.substring(0, sanitized.lastIndexOf('.'));
      sanitized = name.substring(0, 255 - extension.length) + extension;
    }

    // Vérifier que le nom n'est pas vide
    if (!sanitized) {
      return 'fichier_sans_nom';
    }

    return sanitized;
  }

  /**
   * Détecte les tentatives d'évasion d'encodage
   */
  detectEncodingEvasion(input: string): boolean {
    const encodingPatterns = [
      /%[0-9a-fA-F]{2}/g, // URL encoding
      /\\u[0-9a-fA-F]{4}/g, // Unicode escape
      /\\x[0-9a-fA-F]{2}/g, // Hex escape
      /&#\d+;/g, // HTML numeric entities
      /&#x[0-9a-fA-F]+;/g, // HTML hex entities
    ];

    for (const pattern of encodingPatterns) {
      if (pattern.test(input)) {
        try {
          const decoded = decodeURIComponent(input);
          if (decoded !== input) {
            // Vérifier si le contenu décodé contient des patterns suspects
            for (const suspiciousPattern of this.suspiciousPatterns) {
              if (suspiciousPattern.test(decoded)) {
                return true;
              }
            }
          }
        } catch (error) {
          // Erreur de décodage = suspect
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Génère un rapport de sécurité pour un input
   */
  generateSecurityReport(input: string): {
    riskLevel: 'low' | 'medium' | 'high';
    threats: string[];
    recommendations: string[];
  } {
    const threats: string[] = [];
    const recommendations: string[] = [];
    let riskLevel: 'low' | 'medium' | 'high' = 'low';

    // Analyse des patterns suspects
    for (const pattern of this.suspiciousPatterns) {
      if (pattern.test(input)) {
        threats.push('Contenu JavaScript/VBScript détecté');
        riskLevel = 'high';
        break;
      }
    }

    // Analyse XSS
    for (const pattern of this.xssPatterns) {
      if (pattern.test(input)) {
        threats.push('Tentative XSS détectée');
        riskLevel = 'high';
        break;
      }
    }

    // Analyse SQL injection
    for (const pattern of this.sqlInjectionPatterns) {
      if (pattern.test(input)) {
        threats.push('Possible injection SQL');
        if (riskLevel === 'low') riskLevel = 'medium';
        break;
      }
    }

    // Analyse command injection
    for (const pattern of this.commandInjectionPatterns) {
      if (pattern.test(input)) {
        threats.push('Possible injection de commande');
        if (riskLevel === 'low') riskLevel = 'medium';
        break;
      }
    }

    // Évasion d'encodage
    if (this.detectEncodingEvasion(input)) {
      threats.push('Tentative d\'évasion par encodage');
      if (riskLevel === 'low') riskLevel = 'medium';
    }

    // Recommandations basées sur les menaces
    if (threats.length > 0) {
      recommendations.push('Sanitiser l\'input avant traitement');
      recommendations.push('Valider côté serveur');
      recommendations.push('Logger la tentative d\'attaque');
    }

    if (riskLevel === 'high') {
      recommendations.push('Bloquer la requête');
      recommendations.push('Alerter l\'administrateur');
    }

    return {
      riskLevel,
      threats,
      recommendations,
    };
  }
}