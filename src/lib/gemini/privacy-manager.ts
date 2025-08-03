/**
 * Gestionnaire de confidentialité pour le chat Gemini
 * Gère les contrôles de vie privée et la suppression des données
 */

import { ConversationManager } from './conversation-manager';
import { ChatHistoryService } from './chat-history';

export interface PrivacySettings {
  allowDataCollection: boolean;
  allowAnalytics: boolean;
  allowCookies: boolean;
  autoDeleteAfterDays: number;
  requireExplicitConsent: boolean;
  anonymizeData: boolean;
}

export interface DataExportOptions {
  includeMetadata: boolean;
  includeTimestamps: boolean;
  format: 'json' | 'txt' | 'csv';
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface PrivacyAuditResult {
  totalConversations: number;
  totalMessages: number;
  oldestData: Date | null;
  dataSize: number; // en bytes
  hasPersonalData: boolean;
  complianceStatus: 'compliant' | 'warning' | 'violation';
  recommendations: string[];
}

export class PrivacyManager {
  private static readonly STORAGE_KEY = 'gemini_privacy_settings';
  private static readonly CONSENT_KEY = 'gemini_user_consent';
  private static readonly DEFAULT_SETTINGS: PrivacySettings = {
    allowDataCollection: false,
    allowAnalytics: false,
    allowCookies: false,
    autoDeleteAfterDays: 7,
    requireExplicitConsent: true,
    anonymizeData: true,
  };

  private conversationManager: ConversationManager;
  private settings: PrivacySettings;

  constructor() {
    this.conversationManager = new ConversationManager();
    this.settings = this.loadSettings();
  }

  /**
   * Récupère les paramètres de confidentialité
   */
  getSettings(): PrivacySettings {
    return { ...this.settings };
  }

  /**
   * Met à jour les paramètres de confidentialité
   */
  updateSettings(newSettings: Partial<PrivacySettings>): void {
    this.settings = {
      ...this.settings,
      ...newSettings,
    };
    this.saveSettings();

    // Appliquer les nouveaux paramètres
    this.applySettings();
  }

  /**
   * Vérifie si l'utilisateur a donné son consentement
   */
  hasUserConsent(): boolean {
    if (typeof window === 'undefined') return false;

    try {
      const consent = localStorage.getItem(PrivacyManager.CONSENT_KEY);
      if (!consent) return false;

      const consentData = JSON.parse(consent);
      return consentData.granted === true && new Date(consentData.timestamp) > new Date(Date.now() - 365 * 24 * 60 * 60 * 1000); // Valide 1 an
    } catch (error) {
      console.error('Erreur lors de la vérification du consentement:', error);
      return false;
    }
  }

  /**
   * Enregistre le consentement de l'utilisateur
   */
  recordUserConsent(granted: boolean, details?: any): void {
    if (typeof window === 'undefined') return;

    const consentData = {
      granted,
      timestamp: new Date().toISOString(),
      details: details || {},
      version: '1.0', // Version de la politique de confidentialité
    };

    localStorage.setItem(PrivacyManager.CONSENT_KEY, JSON.stringify(consentData));

    // Si le consentement est refusé, nettoyer les données
    if (!granted) {
      this.deleteAllUserData();
    }
  }

  /**
   * Supprime toutes les données utilisateur
   */
  deleteAllUserData(): {
    deletedConversations: number;
    deletedSettings: boolean;
    deletedConsent: boolean;
    errors: string[];
  } {
    const result = {
      deletedConversations: 0,
      deletedSettings: false,
      deletedConsent: false,
      errors: [] as string[],
    };

    if (typeof window === 'undefined') {
      result.errors.push('Environnement non supporté');
      return result;
    }

    try {
      // Supprimer les conversations
      const conversations = this.conversationManager.getAllConversations();
      result.deletedConversations = conversations.length;
      ChatHistoryService.clearAllConversations();

      // Supprimer les paramètres
      localStorage.removeItem(PrivacyManager.STORAGE_KEY);
      result.deletedSettings = true;

      // Supprimer le consentement
      localStorage.removeItem(PrivacyManager.CONSENT_KEY);
      result.deletedConsent = true;

      // Supprimer les backups
      this.deleteAllBackups();

      // Supprimer les données analytics si présentes
      this.deleteAnalyticsData();

      console.log('Toutes les données utilisateur ont été supprimées');
    } catch (error) {
      result.errors.push(`Erreur lors de la suppression: ${error}`);
    }

    return result;
  }

  /**
   * Exporte les données utilisateur
   */
  exportUserData(options: DataExportOptions = {
    includeMetadata: true,
    includeTimestamps: true,
    format: 'json'
  }): string {
    const conversations = this.conversationManager.getAllConversations();
    const settings = this.getSettings();
    const consent = this.getUserConsentData();

    const exportData = {
      exportDate: new Date().toISOString(),
      version: '1.0',
      settings: options.includeMetadata ? settings : undefined,
      consent: options.includeMetadata ? consent : undefined,
      conversations: conversations.map(conv => {
        const conversationData = this.conversationManager.getConversation(conv.id);
        if (!conversationData) return null;

        return {
          id: conv.id,
          title: conv.title,
          createdAt: options.includeTimestamps ? conv.createdAt : undefined,
          lastUpdated: options.includeTimestamps ? conv.lastUpdated : undefined,
          messageCount: conv.messageCount,
          messages: conversationData.messages.map(msg => ({
            role: msg.role,
            content: msg.content,
            timestamp: options.includeTimestamps ? msg.timestamp : undefined,
            files: msg.files?.map(file => ({
              name: file.name,
              mimeType: file.mimeType,
              size: file.size,
            })),
          })),
        };
      }).filter(Boolean),
    };

    // Filtrer par date si spécifié
    if (options.dateRange) {
      exportData.conversations = exportData.conversations.filter(conv => {
        const convDate = new Date(conv.createdAt || 0);
        return convDate >= options.dateRange!.start && convDate <= options.dateRange!.end;
      });
    }

    // Formater selon le format demandé
    switch (options.format) {
      case 'txt':
        return this.formatAsText(exportData);
      case 'csv':
        return this.formatAsCSV(exportData);
      default:
        return JSON.stringify(exportData, null, 2);
    }
  }

  /**
   * Effectue un audit de confidentialité
   */
  performPrivacyAudit(): PrivacyAuditResult {
    const conversations = this.conversationManager.getAllConversations();
    const stats = this.conversationManager.getGlobalStats();

    const totalMessages = conversations.reduce((sum, conv) => sum + conv.messageCount, 0);
    const oldestData = stats.oldestConversation ? new Date(stats.oldestConversation) : null;

    // Calculer la taille approximative des données
    const dataSize = this.calculateDataSize();

    // Détecter les données personnelles potentielles
    const hasPersonalData = this.detectPersonalData();

    // Évaluer la conformité
    const complianceStatus = this.evaluateCompliance();

    // Générer des recommandations
    const recommendations = this.generateRecommendations();

    return {
      totalConversations: conversations.length,
      totalMessages,
      oldestData,
      dataSize,
      hasPersonalData,
      complianceStatus,
      recommendations,
    };
  }

  /**
   * Anonymise les données existantes
   */
  anonymizeExistingData(): {
    processedConversations: number;
    anonymizedMessages: number;
    errors: string[];
  } {
    const result = {
      processedConversations: 0,
      anonymizedMessages: 0,
      errors: [] as string[],
    };

    try {
      const conversations = this.conversationManager.getAllConversations();

      for (const convSummary of conversations) {
        const conversation = this.conversationManager.getConversation(convSummary.id);
        if (!conversation) continue;

        let messageCount = 0;
        const anonymizedMessages = conversation.messages.map(msg => {
          const anonymizedContent = this.anonymizeText(msg.content);
          if (anonymizedContent !== msg.content) {
            messageCount++;
          }

          return {
            ...msg,
            content: anonymizedContent,
            metadata: {
              ...msg.metadata,
              anonymized: true,
            },
          };
        });

        if (messageCount > 0) {
          this.conversationManager.saveConversation({
            ...conversation,
            messages: anonymizedMessages,
          });

          result.processedConversations++;
          result.anonymizedMessages += messageCount;
        }
      }
    } catch (error) {
      result.errors.push(`Erreur lors de l'anonymisation: ${error}`);
    }

    return result;
  }

  /**
   * Nettoie automatiquement les anciennes données
   */
  performAutoCleanup(): void {
    if (!this.settings.autoDeleteAfterDays) return;

    const maxAge = this.settings.autoDeleteAfterDays * 24 * 60 * 60 * 1000;
    const conversations = this.conversationManager.getAllConversations();
    const now = new Date();

    for (const conv of conversations) {
      const age = now.getTime() - conv.lastUpdated.getTime();
      if (age > maxAge) {
        this.conversationManager.deleteConversation(conv.id);
      }
    }
  }

  /**
   * Charge les paramètres depuis le stockage
   */
  private loadSettings(): PrivacySettings {
    if (typeof window === 'undefined') {
      return { ...PrivacyManager.DEFAULT_SETTINGS };
    }

    try {
      const stored = localStorage.getItem(PrivacyManager.STORAGE_KEY);
      if (!stored) return { ...PrivacyManager.DEFAULT_SETTINGS };

      const settings = JSON.parse(stored);
      return {
        ...PrivacyManager.DEFAULT_SETTINGS,
        ...settings,
      };
    } catch (error) {
      console.error('Erreur lors du chargement des paramètres:', error);
      return { ...PrivacyManager.DEFAULT_SETTINGS };
    }
  }

  /**
   * Sauvegarde les paramètres
   */
  private saveSettings(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(PrivacyManager.STORAGE_KEY, JSON.stringify(this.settings));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des paramètres:', error);
    }
  }

  /**
   * Applique les paramètres actuels
   */
  private applySettings(): void {
    // Si la collecte de données est désactivée, nettoyer
    if (!this.settings.allowDataCollection) {
      this.deleteAllUserData();
    }

    // Configurer le nettoyage automatique
    if (this.settings.autoDeleteAfterDays > 0) {
      this.performAutoCleanup();
    }
  }

  /**
   * Récupère les données de consentement
   */
  private getUserConsentData(): any {
    if (typeof window === 'undefined') return null;

    try {
      const consent = localStorage.getItem(PrivacyManager.CONSENT_KEY);
      return consent ? JSON.parse(consent) : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Supprime tous les backups
   */
  private deleteAllBackups(): void {
    if (typeof window === 'undefined') return;

    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith('chat_backup_')) {
        localStorage.removeItem(key);
      }
    }
  }

  /**
   * Supprime les données analytics
   */
  private deleteAnalyticsData(): void {
    if (typeof window === 'undefined') return;

    // Supprimer les clés analytics connues
    const analyticsKeys = [
      'gemini_analytics',
      'chat_analytics',
      'user_metrics',
    ];

    for (const key of analyticsKeys) {
      localStorage.removeItem(key);
    }
  }

  /**
   * Calcule la taille approximative des données
   */
  private calculateDataSize(): number {
    if (typeof window === 'undefined') return 0;

    let totalSize = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('gemini_') || key.startsWith('chat_'))) {
        const value = localStorage.getItem(key);
        if (value) {
          totalSize += key.length + value.length;
        }
      }
    }

    return totalSize * 2; // Approximation en bytes (UTF-16)
  }

  /**
   * Détecte les données personnelles potentielles
   */
  private detectPersonalData(): boolean {
    const conversations = this.conversationManager.getAllConversations();

    const personalDataPatterns = [
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // Email
      /\b\d{2}[.\-\s]?\d{2}[.\-\s]?\d{2}[.\-\s]?\d{2}[.\-\s]?\d{2}\b/, // Téléphone français
      /\b\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}\b/, // Date de naissance
    ];

    for (const conv of conversations) {
      const conversation = this.conversationManager.getConversation(conv.id);
      if (!conversation) continue;

      for (const message of conversation.messages) {
        for (const pattern of personalDataPatterns) {
          if (pattern.test(message.content)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  /**
   * Évalue la conformité RGPD
   */
  private evaluateCompliance(): 'compliant' | 'warning' | 'violation' {
    const hasConsent = this.hasUserConsent();
    const hasPersonalData = this.detectPersonalData();
    const dataAge = this.conversationManager.getGlobalStats().oldestConversation;

    // Violation si données personnelles sans consentement
    if (hasPersonalData && !hasConsent) {
      return 'violation';
    }

    // Avertissement si données anciennes
    if (dataAge && (Date.now() - dataAge) > 365 * 24 * 60 * 60 * 1000) {
      return 'warning';
    }

    return 'compliant';
  }

  /**
   * Génère des recommandations de confidentialité
   */
  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    const audit = this.performPrivacyAudit();

    if (!this.hasUserConsent()) {
      recommendations.push('Obtenir le consentement explicite de l\'utilisateur');
    }

    if (audit.hasPersonalData && !this.settings.anonymizeData) {
      recommendations.push('Activer l\'anonymisation automatique des données');
    }

    if (audit.dataSize > 1024 * 1024) { // > 1MB
      recommendations.push('Considérer la compression ou l\'archivage des anciennes données');
    }

    if (this.settings.autoDeleteAfterDays > 30) {
      recommendations.push('Réduire la période de rétention des données');
    }

    return recommendations;
  }

  /**
   * Anonymise un texte en masquant les données personnelles
   */
  private anonymizeText(text: string): string {
    return text
      .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL_MASQUÉ]')
      .replace(/\b\d{2}[.\-\s]?\d{2}[.\-\s]?\d{2}[.\-\s]?\d{2}[.\-\s]?\d{2}\b/g, '[TÉLÉPHONE_MASQUÉ]')
      .replace(/\b\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}\b/g, '[DATE_MASQUÉE]');
  }

  /**
   * Formate les données en texte
   */
  private formatAsText(data: any): string {
    let text = `Export des données - ${data.exportDate}\n\n`;

    for (const conv of data.conversations) {
      text += `Conversation: ${conv.title}\n`;
      text += `Créée le: ${conv.createdAt}\n`;
      text += `Messages: ${conv.messageCount}\n\n`;

      for (const msg of conv.messages) {
        text += `[${msg.role.toUpperCase()}] ${msg.content}\n`;
        if (msg.timestamp) {
          text += `  Timestamp: ${msg.timestamp}\n`;
        }
        text += '\n';
      }

      text += '---\n\n';
    }

    return text;
  }

  /**
   * Formate les données en CSV
   */
  private formatAsCSV(data: any): string {
    let csv = 'ConversationId,Role,Content,Timestamp\n';

    for (const conv of data.conversations) {
      for (const msg of conv.messages) {
        const content = msg.content.replace(/"/g, '""');
        csv += `"${conv.id}","${msg.role}","${content}","${msg.timestamp || ''}"\n`;
      }
    }

    return csv;
  }
}