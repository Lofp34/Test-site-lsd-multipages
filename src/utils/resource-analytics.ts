/**
 * Utilitaires de tracking analytics pour les ressources
 * 
 * Ce module gère le tracking des interactions avec les pages ressources :
 * - Vues de pages
 * - Clics sur les aperçus
 * - Soumissions de formulaires
 * - Téléchargements réussis
 * - Erreurs de téléchargement
 */

import { trackEvent, trackPageView } from '@/components/GoogleAnalytics';

// Types pour les événements de ressources
export interface ResourceTrackingEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export interface ResourcePageData {
  resourceId: string;
  resourceTitle: string;
  resourceUrl: string;
  category: string;
}

export interface FormSubmissionData {
  resourceId: string;
  userEmail: string;
  deliveryMethod: 'email' | 'download' | 'both';
  formFields: string[];
  source: string;
}

export interface DownloadData {
  resourceId: string;
  resourceUrl: string;
  userEmail: string;
  downloadMethod: 'direct' | 'email';
  fileSize?: string;
  fileFormat?: string;
}

/**
 * Classe principale pour le tracking des ressources
 */
export class ResourceAnalytics {
  private static instance: ResourceAnalytics;
  private isEnabled: boolean = false;

  constructor() {
    // Vérifier si Google Analytics est disponible
    this.isEnabled = typeof window !== 'undefined' && typeof window.gtag === 'function';
  }

  static getInstance(): ResourceAnalytics {
    if (!ResourceAnalytics.instance) {
      ResourceAnalytics.instance = new ResourceAnalytics();
    }
    return ResourceAnalytics.instance;
  }

  /**
   * Activer/désactiver le tracking
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  /**
   * Envoyer un événement de tracking
   */
  private sendEvent(event: ResourceTrackingEvent): void {
    if (!this.isEnabled) {
      console.log('Analytics disabled - Event:', event);
      return;
    }

    try {
      trackEvent(event.action, event.category, event.label, event.value);
      
      // Log en mode développement
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Analytics Event:', event);
      }
    } catch (error) {
      console.warn('Erreur lors de l\'envoi de l\'événement analytics:', error);
    }
  }

  /**
   * Tracker la vue d'une page ressource
   */
  trackResourcePageView(data: ResourcePageData): void {
    // Événement de vue de page
    this.sendEvent({
      event: `${data.resourceId}_page_view`,
      category: 'Resource',
      action: 'View Resource Page',
      label: data.resourceTitle
    });

    // Tracker la page vue pour les SPA
    if (typeof window !== 'undefined') {
      trackPageView(data.resourceUrl, `${data.resourceTitle} | Laurent Serre`);
    }

    // Événement spécifique à la catégorie
    this.sendEvent({
      event: `resource_category_view`,
      category: 'Resource Category',
      action: 'View Category Page',
      label: data.category
    });
  }

  /**
   * Tracker le clic sur un aperçu de ressource
   */
  trackPreviewClick(resourceId: string, resourceTitle: string, previewType: 'image' | 'document' | 'demo'): void {
    this.sendEvent({
      event: `${resourceId}_preview_click`,
      category: 'Engagement',
      action: 'Click Preview',
      label: `${resourceTitle} (${previewType})`
    });

    // Événement générique pour les aperçus
    this.sendEvent({
      event: 'resource_preview_interaction',
      category: 'User Engagement',
      action: 'Preview Interaction',
      label: previewType,
      value: 1
    });
  }

  /**
   * Tracker la soumission d'un formulaire de ressource
   */
  trackFormSubmission(data: FormSubmissionData): void {
    // Événement spécifique à la ressource
    this.sendEvent({
      event: `${data.resourceId}_form_submit`,
      category: 'Conversion',
      action: 'Submit Download Form',
      label: data.deliveryMethod,
      value: 5 // Valeur de conversion
    });

    // Événement générique de lead
    this.sendEvent({
      event: 'resource_lead_generated',
      category: 'Lead Generation',
      action: 'Form Submission',
      label: data.resourceId,
      value: 5
    });

    // Tracker les champs de formulaire utilisés
    this.sendEvent({
      event: 'form_fields_usage',
      category: 'Form Analytics',
      action: 'Fields Used',
      label: data.formFields.join(',')
    });

    // Tracker la source de la soumission
    this.sendEvent({
      event: 'conversion_source',
      category: 'Attribution',
      action: 'Form Source',
      label: data.source
    });
  }

  /**
   * Tracker un téléchargement réussi
   */
  trackDownloadSuccess(data: DownloadData): void {
    // Événement spécifique à la ressource
    this.sendEvent({
      event: `${data.resourceId}_download_success`,
      category: 'Conversion',
      action: 'Successful Download',
      label: data.downloadMethod,
      value: 10 // Valeur élevée pour un téléchargement réussi
    });

    // Événement générique de téléchargement
    this.sendEvent({
      event: 'resource_downloaded',
      category: 'Resource Usage',
      action: 'Download Completed',
      label: data.resourceId,
      value: 10
    });

    // Tracker le format de fichier si disponible
    if (data.fileFormat) {
      this.sendEvent({
        event: 'file_format_download',
        category: 'File Analytics',
        action: 'Format Downloaded',
        label: data.fileFormat
      });
    }

    // Tracker la taille de fichier si disponible
    if (data.fileSize) {
      this.sendEvent({
        event: 'file_size_download',
        category: 'File Analytics',
        action: 'Size Downloaded',
        label: data.fileSize
      });
    }
  }

  /**
   * Tracker une erreur de téléchargement
   */
  trackDownloadError(resourceId: string, errorType: string, errorMessage?: string): void {
    this.sendEvent({
      event: `${resourceId}_download_error`,
      category: 'Error',
      action: 'Download Failed',
      label: errorType
    });

    // Événement générique d'erreur
    this.sendEvent({
      event: 'resource_error',
      category: 'System Error',
      action: 'Download Error',
      label: `${resourceId}: ${errorType}`
    });

    // Log détaillé pour le debugging
    if (errorMessage && process.env.NODE_ENV === 'development') {
      console.error('Download Error:', {
        resourceId,
        errorType,
        errorMessage,
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Tracker l'interaction avec les CTAs de ressources
   */
  trackResourceCTA(ctaType: 'coaching' | 'formation' | 'diagnostic' | 'contact', resourceId: string, ctaText: string): void {
    this.sendEvent({
      event: 'resource_cta_click',
      category: 'CTA Interaction',
      action: 'Click Resource CTA',
      label: `${ctaType} from ${resourceId}`,
      value: 3
    });

    // Événement spécifique au type de CTA
    this.sendEvent({
      event: `${ctaType}_cta_click`,
      category: 'Service Interest',
      action: 'CTA Click',
      label: ctaText,
      value: 3
    });
  }

  /**
   * Tracker le temps passé sur une page ressource
   */
  trackTimeOnPage(resourceId: string, timeSpent: number): void {
    // Seulement tracker si le temps est significatif (plus de 30 secondes)
    if (timeSpent < 30) return;

    this.sendEvent({
      event: 'resource_engagement_time',
      category: 'User Engagement',
      action: 'Time on Page',
      label: resourceId,
      value: Math.round(timeSpent)
    });

    // Catégoriser le niveau d'engagement
    let engagementLevel = 'low';
    if (timeSpent > 300) engagementLevel = 'high'; // Plus de 5 minutes
    else if (timeSpent > 120) engagementLevel = 'medium'; // Plus de 2 minutes

    this.sendEvent({
      event: 'engagement_level',
      category: 'User Behavior',
      action: 'Engagement Level',
      label: `${resourceId}: ${engagementLevel}`
    });
  }

  /**
   * Tracker les erreurs de formulaire
   */
  trackFormError(resourceId: string, fieldName: string, errorType: string): void {
    this.sendEvent({
      event: 'form_validation_error',
      category: 'Form Error',
      action: 'Validation Failed',
      label: `${resourceId}: ${fieldName} (${errorType})`
    });
  }

  /**
   * Tracker les abandons de formulaire
   */
  trackFormAbandonment(resourceId: string, fieldsCompleted: string[], abandonmentPoint: string): void {
    this.sendEvent({
      event: 'form_abandonment',
      category: 'Form Analytics',
      action: 'Form Abandoned',
      label: `${resourceId} at ${abandonmentPoint}`,
      value: fieldsCompleted.length
    });
  }

  /**
   * Tracker les partages de ressources
   */
  trackResourceShare(resourceId: string, shareMethod: 'email' | 'linkedin' | 'twitter' | 'copy-link'): void {
    this.sendEvent({
      event: 'resource_shared',
      category: 'Social Sharing',
      action: 'Share Resource',
      label: `${resourceId} via ${shareMethod}`,
      value: 2
    });
  }
}

// Instance singleton
export const resourceAnalytics = ResourceAnalytics.getInstance();

// Fonctions utilitaires pour un usage simple
export const trackResourcePageView = (data: ResourcePageData) => 
  resourceAnalytics.trackResourcePageView(data);

export const trackPreviewClick = (resourceId: string, resourceTitle: string, previewType: 'image' | 'document' | 'demo') => 
  resourceAnalytics.trackPreviewClick(resourceId, resourceTitle, previewType);

export const trackFormSubmission = (data: FormSubmissionData) => 
  resourceAnalytics.trackFormSubmission(data);

export const trackDownloadSuccess = (data: DownloadData) => 
  resourceAnalytics.trackDownloadSuccess(data);

export const trackDownloadError = (resourceId: string, errorType: string, errorMessage?: string) => 
  resourceAnalytics.trackDownloadError(resourceId, errorType, errorMessage);

export const trackResourceCTA = (ctaType: 'coaching' | 'formation' | 'diagnostic' | 'contact', resourceId: string, ctaText: string) => 
  resourceAnalytics.trackResourceCTA(ctaType, resourceId, ctaText);

// Hook pour tracker automatiquement le temps passé sur une page
export const useResourcePageTracking = (resourceData: ResourcePageData) => {
  if (typeof window === 'undefined') return;

  let startTime = Date.now();
  let isTracked = false;

  // Tracker la vue de page au chargement
  resourceAnalytics.trackResourcePageView(resourceData);

  // Tracker le temps passé lors du déchargement de la page
  const handleBeforeUnload = () => {
    if (!isTracked) {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      resourceAnalytics.trackTimeOnPage(resourceData.resourceId, timeSpent);
      isTracked = true;
    }
  };

  // Tracker le temps passé lors de la perte de focus (changement d'onglet)
  const handleVisibilityChange = () => {
    if (document.hidden && !isTracked) {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      resourceAnalytics.trackTimeOnPage(resourceData.resourceId, timeSpent);
      isTracked = true;
    }
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Cleanup
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
};

export default resourceAnalytics;