'use client';

import { NegotiationTechnique } from '@/types/negotiation-technique';

export interface ShareData {
  title: string;
  text: string;
  url: string;
  hashtags?: string[];
  image?: string;
}

export interface SocialPlatformConfig {
  name: string;
  color: string;
  icon: string;
  shareUrl: (data: ShareData) => string;
  maxTextLength?: number;
  supportsHashtags?: boolean;
  supportsImage?: boolean;
}

// Configuration des plateformes sociales
export const socialPlatforms: Record<string, SocialPlatformConfig> = {
  linkedin: {
    name: 'LinkedIn',
    color: '#0077B5',
    icon: 'linkedin',
    shareUrl: (data: ShareData) => {
      const url = new URL('https://www.linkedin.com/sharing/share-offsite/');
      url.searchParams.set('url', data.url);
      return url.toString();
    },
    maxTextLength: 3000,
    supportsHashtags: true,
    supportsImage: true
  },
  twitter: {
    name: 'Twitter',
    color: '#1DA1F2',
    icon: 'twitter',
    shareUrl: (data: ShareData) => {
      const url = new URL('https://twitter.com/intent/tweet');
      url.searchParams.set('text', data.text);
      url.searchParams.set('url', data.url);
      if (data.hashtags && data.hashtags.length > 0) {
        url.searchParams.set('hashtags', data.hashtags.join(','));
      }
      return url.toString();
    },
    maxTextLength: 280,
    supportsHashtags: true,
    supportsImage: true
  },
  facebook: {
    name: 'Facebook',
    color: '#1877F2',
    icon: 'facebook',
    shareUrl: (data: ShareData) => {
      const url = new URL('https://www.facebook.com/sharer/sharer.php');
      url.searchParams.set('u', data.url);
      if (data.text) {
        url.searchParams.set('quote', data.text);
      }
      return url.toString();
    },
    maxTextLength: 63206,
    supportsHashtags: false,
    supportsImage: true
  },
  whatsapp: {
    name: 'WhatsApp',
    color: '#25D366',
    icon: 'whatsapp',
    shareUrl: (data: ShareData) => {
      const url = new URL('https://wa.me/');
      const text = `${data.text}\n\n${data.url}`;
      url.searchParams.set('text', text);
      return url.toString();
    },
    maxTextLength: 65536,
    supportsHashtags: false,
    supportsImage: false
  },
  telegram: {
    name: 'Telegram',
    color: '#0088CC',
    icon: 'telegram',
    shareUrl: (data: ShareData) => {
      const url = new URL('https://t.me/share/url');
      url.searchParams.set('url', data.url);
      url.searchParams.set('text', data.text);
      return url.toString();
    },
    maxTextLength: 4096,
    supportsHashtags: true,
    supportsImage: false
  }
};

// Citations clés prédéfinies pour le partage
export const keyQuotes = [
  {
    id: 'main-principle',
    text: '"Un bon accord ne peut pas naître d\'un mauvais compromis" - Chris Voss, FBI',
    context: 'Principe fondamental de la technique',
    category: 'principle'
  },
  {
    id: 'laurent-vision',
    text: '"En 20 ans d\'accompagnement PME, j\'ai vu trop d\'entrepreneurs céder sur leurs prix par peur de perdre le client."',
    context: 'Vision Laurent Serre',
    category: 'expertise'
  },
  {
    id: 'empathy-refusal',
    text: '"Je comprends que le budget soit votre préoccupation principale. Cependant, couper notre prix en deux nous empêcherait de vous livrer exactement ce pourquoi vous nous avez choisis."',
    context: 'Exemple de refus empathique',
    category: 'script'
  },
  {
    id: 'creative-alternatives',
    text: '"Au lieu de couper la poire en deux, créez de la valeur nouvelle. Agrandissez le gâteau plutôt que de le diviser."',
    context: 'Alternatives créatives',
    category: 'strategy'
  },
  {
    id: 'results',
    text: '85% de préservation des marges, 92% de satisfaction client maintenue - Résultats mesurés sur 500+ négociations PME',
    context: 'Résultats concrets',
    category: 'results'
  },
  {
    id: 'fbi-origin',
    text: '"Cette technique a été développée par Chris Voss lors de négociations de vie ou de mort au FBI. Elle fonctionne aussi en business."',
    context: 'Origine FBI',
    category: 'credibility'
  },
  {
    id: 'pme-adaptation',
    text: '"J\'ai adapté cette technique FBI au contexte PME français : même fermeté, mais avec l\'empathie et la courtoisie qui préservent les relations."',
    context: 'Adaptation PME française',
    category: 'adaptation'
  }
];

// Générateur de contenu de partage optimisé par plateforme
export class SocialShareGenerator {
  private technique: NegotiationTechnique;
  private baseUrl: string;

  constructor(technique: NegotiationTechnique, baseUrl: string = 'https://www.laurentserre.com') {
    this.technique = technique;
    this.baseUrl = baseUrl;
  }

  generateShareData(
    platform: keyof typeof socialPlatforms,
    options: {
      section?: string;
      quoteId?: string;
      customText?: string;
      includeStats?: boolean;
      includeHashtags?: boolean;
    } = {}
  ): ShareData {
    const config = socialPlatforms[platform];
    const pageUrl = `${this.baseUrl}/ressources/techniques-de-negociation/${this.technique.slug}`;
    const sectionUrl = options.section ? `${pageUrl}#${options.section}` : pageUrl;
    
    // Sélection de la citation
    const selectedQuote = options.quoteId 
      ? keyQuotes.find(q => q.id === options.quoteId)
      : keyQuotes[0];
    
    const quote = options.customText || selectedQuote?.text || '';
    
    // Génération du titre
    const baseTitle = `${this.technique.title} | Technique FBI de ${this.technique.author}`;
    
    // Génération du texte selon la plateforme
    let shareText = '';
    
    switch (platform) {
      case 'linkedin':
        shareText = this.generateLinkedInText(quote, options);
        break;
      case 'twitter':
        shareText = this.generateTwitterText(quote, options);
        break;
      case 'facebook':
        shareText = this.generateFacebookText(quote, options);
        break;
      case 'whatsapp':
        shareText = this.generateWhatsAppText(quote, options);
        break;
      case 'telegram':
        shareText = this.generateTelegramText(quote, options);
        break;
      default:
        shareText = quote;
    }

    // Troncature si nécessaire
    if (config.maxTextLength && shareText.length > config.maxTextLength) {
      shareText = shareText.substring(0, config.maxTextLength - 3) + '...';
    }

    // Hashtags
    const hashtags = options.includeHashtags && config.supportsHashtags 
      ? this.generateHashtags(platform)
      : undefined;

    return {
      title: baseTitle,
      text: shareText,
      url: sectionUrl,
      hashtags,
      image: `${this.baseUrl}/images/og-technique-${this.technique.slug}.jpg`
    };
  }

  private generateLinkedInText(quote: string, options: any): string {
    const parts = [];
    
    if (quote) {
      parts.push(`💡 ${quote}`);
      parts.push('');
    }
    
    parts.push('🎯 Technique de négociation FBI adaptée aux PME françaises par Laurent Serre');
    parts.push('');
    
    if (options.includeStats !== false) {
      parts.push('✅ 85% de préservation des marges');
      parts.push('✅ 92% de satisfaction client maintenue');
      parts.push('✅ Guide complet avec scripts et cas concrets');
      parts.push('');
    }
    
    parts.push('👉 Découvrez la méthode complète avec cas PME réels');
    
    return parts.join('\n');
  }

  private generateTwitterText(quote: string, options: any): string {
    const parts = [];
    
    if (quote) {
      // Version courte pour Twitter
      const shortQuote = quote.length > 100 ? quote.substring(0, 97) + '...' : quote;
      parts.push(`💡 ${shortQuote}`);
      parts.push('');
    }
    
    parts.push('🎯 Technique FBI pour PME');
    
    if (options.includeStats !== false) {
      parts.push('✅ 85% de préservation des marges');
    }
    
    parts.push('');
    parts.push('Guide complet 👇');
    
    return parts.join('\n');
  }

  private generateFacebookText(quote: string, options: any): string {
    const parts = [];
    
    if (quote) {
      parts.push(quote);
      parts.push('');
    }
    
    parts.push(`Découvrez la technique de négociation FBI "${this.technique.title}" adaptée aux PME françaises par Laurent Serre.`);
    
    if (options.includeStats !== false) {
      parts.push('');
      parts.push('Résultats prouvés :');
      parts.push('• 85% de préservation des marges');
      parts.push('• 92% de satisfaction client maintenue');
      parts.push('• Guide avec scripts et cas concrets');
    }
    
    return parts.join('\n');
  }

  private generateWhatsAppText(quote: string, options: any): string {
    const parts = [];
    
    parts.push(`🔥 Technique de négociation FBI : "${this.technique.title}"`);
    parts.push('');
    
    if (quote) {
      parts.push(`💡 ${quote}`);
      parts.push('');
    }
    
    parts.push('🎯 Adaptée aux PME françaises par Laurent Serre');
    
    if (options.includeStats !== false) {
      parts.push('✅ 85% de préservation des marges');
      parts.push('✅ Scripts et cas concrets inclus');
    }
    
    parts.push('');
    parts.push('👉 Guide complet ici :');
    
    return parts.join('\n');
  }

  private generateTelegramText(quote: string, options: any): string {
    const parts = [];
    
    parts.push(`🎯 <b>${this.technique.title}</b>`);
    parts.push('Technique FBI adaptée aux PME françaises');
    parts.push('');
    
    if (quote) {
      parts.push(`💡 <i>${quote}</i>`);
      parts.push('');
    }
    
    if (options.includeStats !== false) {
      parts.push('📊 <b>Résultats mesurés :</b>');
      parts.push('• 85% de préservation des marges');
      parts.push('• 92% de satisfaction client');
      parts.push('');
    }
    
    parts.push('👨‍💼 Par Laurent Serre, expert développement commercial PME');
    
    return parts.join('\n');
  }

  private generateHashtags(platform: keyof typeof socialPlatforms): string[] {
    const baseHashtags = [
      'négociation',
      'PME',
      'commercial',
      'FBI',
      'ChrisVoss',
      'LaurentSerre'
    ];

    switch (platform) {
      case 'linkedin':
        return [
          ...baseHashtags,
          'développementcommercial',
          'formationcommerciale',
          'closing',
          'B2B',
          'entrepreneuriat',
          'leadership'
        ];
      case 'twitter':
        return [
          ...baseHashtags,
          'business',
          'sales',
          'entrepreneur'
        ];
      case 'telegram':
        return [
          ...baseHashtags,
          'business',
          'formation'
        ];
      default:
        return baseHashtags;
    }
  }

  // Génération d'Open Graph optimisé pour une section spécifique
  generateOpenGraphData(section?: string): Record<string, string> {
    const baseUrl = `${this.baseUrl}/ressources/techniques-de-negociation/${this.technique.slug}`;
    const sectionUrl = section ? `${baseUrl}#${section}` : baseUrl;
    
    const sectionTitles: Record<string, string> = {
      'hero': 'Introduction et Principe Fondamental',
      'expertise': 'Vision Laurent Serre et Adaptation PME',
      'guide': 'Guide Pratique Étape par Étape',
      'cases': 'Cas Clients PME et Résultats',
      'tools': 'Outils et Ressources Téléchargeables',
      'mistakes': 'Pièges à Éviter et Solutions'
    };

    const sectionTitle = section && sectionTitles[section] 
      ? `${sectionTitles[section]} | ${this.technique.title}`
      : `${this.technique.title} | Technique FBI de ${this.technique.author}`;

    const sectionDescription = section && sectionTitles[section]
      ? `Découvrez "${sectionTitles[section]}" dans la technique FBI "${this.technique.title}" adaptée aux PME françaises par Laurent Serre.`
      : `Maîtrisez la technique de négociation FBI "${this.technique.title}" avec les conseils terrain de Laurent Serre. 85% de préservation des marges, cas PME concrets.`;

    return {
      'og:title': sectionTitle,
      'og:description': sectionDescription,
      'og:url': sectionUrl,
      'og:type': 'article',
      'og:image': `${this.baseUrl}/images/og-technique-${this.technique.slug}${section ? `-${section}` : ''}.jpg`,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': `${sectionTitle} - Laurent Serre Expert Négociation`,
      'og:site_name': 'Laurent Serre',
      'og:locale': 'fr_FR',
      'article:author': 'Laurent Serre',
      'article:section': 'Techniques de Négociation',
      'article:tag': 'négociation commerciale, technique FBI, Chris Voss, PME',
      'article:published_time': '2025-01-27T10:00:00+01:00',
      'article:modified_time': '2025-01-27T10:00:00+01:00'
    };
  }

  // Génération de Twitter Cards optimisées
  generateTwitterCardData(section?: string): Record<string, string> {
    const baseUrl = `${this.baseUrl}/ressources/techniques-de-negociation/${this.technique.slug}`;
    const sectionUrl = section ? `${baseUrl}#${section}` : baseUrl;
    
    const sectionTitle = section 
      ? `${section} | ${this.technique.title} | Laurent Serre`
      : `${this.technique.title} | Technique FBI | Laurent Serre`;

    return {
      'twitter:card': 'summary_large_image',
      'twitter:site': '@laurent_serre',
      'twitter:creator': '@laurent_serre',
      'twitter:title': sectionTitle,
      'twitter:description': 'Maîtrisez la technique de négociation FBI avec 85% de préservation des marges. Guide complet avec cas PME.',
      'twitter:image': `${this.baseUrl}/images/og-technique-${this.technique.slug}${section ? `-${section}` : ''}.jpg`,
      'twitter:image:alt': `${sectionTitle} - Expert Négociation`,
      'twitter:url': sectionUrl
    };
  }
}

// Fonction utilitaire pour le tracking des partages
export function trackSocialShare(
  platform: string,
  technique: NegotiationTechnique,
  section?: string,
  quoteId?: string
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'share', {
      method: platform,
      content_type: section ? 'technique_section' : 'technique',
      content_id: section ? `${technique.id}_${section}` : technique.id,
      custom_parameters: {
        technique_slug: technique.slug,
        section: section || 'full-page',
        quote_id: quoteId || 'none',
        platform: platform
      }
    });
  }

  // Tracking personnalisé pour Laurent Serre
  if (typeof window !== 'undefined' && (window as any).laurentSerreAnalytics) {
    (window as any).laurentSerreAnalytics.track('social_share', {
      technique: technique.slug,
      platform: platform,
      section: section,
      quote: quoteId,
      timestamp: new Date().toISOString()
    });
  }
}

// Fonction pour copier du contenu dans le presse-papiers avec feedback
export async function copyToClipboard(
  text: string,
  successCallback?: () => void,
  errorCallback?: (error: Error) => void
): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    if (successCallback) successCallback();
    return true;
  } catch (error) {
    console.error('Could not copy to clipboard:', error);
    if (errorCallback) errorCallback(error as Error);
    
    // Fallback pour les navigateurs plus anciens
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (result && successCallback) successCallback();
      return result;
    } catch (fallbackError) {
      console.error('Fallback copy failed:', fallbackError);
      if (errorCallback) errorCallback(fallbackError as Error);
      return false;
    }
  }
}

// Fonction pour détecter si le partage natif est disponible
export function isNativeShareAvailable(): boolean {
  return typeof navigator !== 'undefined' && 'share' in navigator;
}

// Fonction pour le partage natif
export async function nativeShare(
  data: ShareData,
  technique: NegotiationTechnique,
  section?: string
): Promise<boolean> {
  if (!isNativeShareAvailable()) {
    return false;
  }

  try {
    await navigator.share({
      title: data.title,
      text: data.text,
      url: data.url
    });
    
    trackSocialShare('native', technique, section);
    return true;
  } catch (error) {
    console.log('Native sharing cancelled or failed:', error);
    return false;
  }
}