import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
  SocialShareGenerator, 
  socialPlatforms, 
  keyQuotes,
  trackSocialShare,
  copyToClipboard,
  isNativeShareAvailable,
  nativeShare
} from '../social-sharing';
import { NegotiationTechnique } from '@/types/negotiation-technique';

// Mock technique data
const mockTechnique: NegotiationTechnique = {
  id: 'ne-jamais-couper-la-poire-en-deux',
  slug: 'ne-jamais-couper-la-poire-en-deux',
  title: 'Ne jamais couper la poire en deux',
  author: 'Chris Voss',
  origin: 'FBI',
  category: 'closing',
  difficultyLevel: 'intermediate',
  description: 'Technique de négociation FBI pour éviter les compromis destructeurs',
  psychologyPrinciples: ['Empathie tactique', 'Refus créatif'],
  businessApplications: ['Négociation commerciale', 'Closing B2B'],
  laurentVision: 'En 20 ans d\'accompagnement PME, j\'ai vu trop d\'entrepreneurs céder sur leurs prix par peur de perdre le client.',
  pmeAdaptation: 'Adaptation française avec empathie et courtoisie',
  successMetrics: [
    { metric: 'Préservation des marges', value: '85%', context: 'négociations PME' }
  ],
  stepByStepGuide: [],
  caseStudies: [],
  commonMistakes: [],
  relatedTechniques: [],
  downloadableResources: [],
  seoMetadata: {
    title: 'Test',
    description: 'Test',
    keywords: [],
    canonicalUrl: 'test'
  },
  trackingEvents: []
};

describe('SocialShareGenerator', () => {
  let generator: SocialShareGenerator;

  beforeEach(() => {
    generator = new SocialShareGenerator(mockTechnique);
  });

  describe('generateShareData', () => {
    it('should generate LinkedIn share data correctly', () => {
      const shareData = generator.generateShareData('linkedin', {
        quoteId: 'main-principle',
        includeStats: true,
        includeHashtags: true
      });

      expect(shareData.title).toContain('Ne jamais couper la poire en deux');
      expect(shareData.text).toContain('💡');
      expect(shareData.text).toContain('85% de préservation des marges');
      expect(shareData.url).toContain('/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux');
      expect(shareData.hashtags).toContain('négociation');
      expect(shareData.hashtags).toContain('PME');
    });

    it('should generate Twitter share data with length constraints', () => {
      const shareData = generator.generateShareData('twitter', {
        quoteId: 'main-principle',
        includeStats: true,
        includeHashtags: true
      });

      expect(shareData.text.length).toBeLessThanOrEqual(280);
      expect(shareData.text).toContain('🎯');
      expect(shareData.hashtags).toBeDefined();
    });

    it('should generate Facebook share data without hashtags', () => {
      const shareData = generator.generateShareData('facebook', {
        quoteId: 'main-principle'
      });

      expect(shareData.hashtags).toBeUndefined();
      expect(shareData.text).toContain('Découvrez la technique');
    });

    it('should handle section-specific URLs', () => {
      const shareData = generator.generateShareData('linkedin', {
        section: 'expertise'
      });

      expect(shareData.url).toContain('#expertise');
    });

    it('should handle custom text override', () => {
      const customText = 'Custom quote for testing';
      const shareData = generator.generateShareData('linkedin', {
        customText: customText
      });

      expect(shareData.text).toContain(customText);
    });
  });

  describe('generateOpenGraphData', () => {
    it('should generate basic Open Graph data', () => {
      const ogData = generator.generateOpenGraphData();

      expect(ogData['og:title']).toContain('Ne jamais couper la poire en deux');
      expect(ogData['og:description']).toBeDefined();
      expect(ogData['og:url']).toContain('/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux');
      expect(ogData['og:type']).toBe('article');
      expect(ogData['og:image']).toContain('.jpg');
    });

    it('should generate section-specific Open Graph data', () => {
      const ogData = generator.generateOpenGraphData('expertise');

      expect(ogData['og:title']).toContain('Vision Laurent Serre');
      expect(ogData['og:url']).toContain('#expertise');
      expect(ogData['og:image']).toContain('-expertise');
    });
  });

  describe('generateTwitterCardData', () => {
    it('should generate Twitter Card data', () => {
      const twitterData = generator.generateTwitterCardData();

      expect(twitterData['twitter:card']).toBe('summary_large_image');
      expect(twitterData['twitter:site']).toBe('@laurent_serre');
      expect(twitterData['twitter:title']).toContain('Ne jamais couper la poire en deux');
      expect(twitterData['twitter:image']).toBeDefined();
    });

    it('should handle section-specific Twitter Cards', () => {
      const twitterData = generator.generateTwitterCardData('guide');

      expect(twitterData['twitter:title']).toContain('guide');
      expect(twitterData['twitter:url']).toContain('#guide');
    });
  });
});

describe('Social Platform Configurations', () => {
  it('should have correct LinkedIn configuration', () => {
    const linkedin = socialPlatforms.linkedin;
    
    expect(linkedin.name).toBe('LinkedIn');
    expect(linkedin.color).toBe('#0077B5');
    expect(linkedin.supportsHashtags).toBe(true);
    expect(linkedin.maxTextLength).toBe(3000);
  });

  it('should have correct Twitter configuration', () => {
    const twitter = socialPlatforms.twitter;
    
    expect(twitter.name).toBe('Twitter');
    expect(twitter.maxTextLength).toBe(280);
    expect(twitter.supportsHashtags).toBe(true);
  });

  it('should generate correct share URLs', () => {
    const shareData = {
      title: 'Test Title',
      text: 'Test text',
      url: 'https://example.com',
      hashtags: ['test', 'example']
    };

    const linkedinUrl = socialPlatforms.linkedin.shareUrl(shareData);
    expect(linkedinUrl).toContain('linkedin.com/sharing/share-offsite');
    expect(linkedinUrl).toContain('url=https%3A%2F%2Fexample.com');

    const twitterUrl = socialPlatforms.twitter.shareUrl(shareData);
    expect(twitterUrl).toContain('twitter.com/intent/tweet');
    expect(twitterUrl).toContain('hashtags=test%2Cexample');
  });
});

describe('Key Quotes', () => {
  it('should have predefined key quotes', () => {
    expect(keyQuotes).toHaveLength(7);
    expect(keyQuotes[0].id).toBe('main-principle');
    expect(keyQuotes[0].text).toContain('Chris Voss');
    expect(keyQuotes[0].category).toBe('principle');
  });

  it('should have quotes for different categories', () => {
    const categories = keyQuotes.map(q => q.category);
    expect(categories).toContain('principle');
    expect(categories).toContain('expertise');
    expect(categories).toContain('script');
    expect(categories).toContain('results');
  });
});

describe('Utility Functions', () => {
  beforeEach(() => {
    // Mock window.gtag
    global.window = {
      gtag: vi.fn()
    } as any;
  });

  describe('trackSocialShare', () => {
    it('should track social share events', () => {
      const mockGtag = vi.fn();
      global.window.gtag = mockGtag;

      trackSocialShare('LinkedIn', mockTechnique, 'expertise', 'main-principle');

      expect(mockGtag).toHaveBeenCalledWith('event', 'share', {
        method: 'LinkedIn',
        content_type: 'technique_section',
        content_id: 'ne-jamais-couper-la-poire-en-deux_expertise',
        custom_parameters: {
          technique_slug: 'ne-jamais-couper-la-poire-en-deux',
          section: 'expertise',
          quote_id: 'main-principle',
          platform: 'LinkedIn'
        }
      });
    });

    it('should handle full page tracking', () => {
      const mockGtag = vi.fn();
      global.window.gtag = mockGtag;

      trackSocialShare('Twitter', mockTechnique);

      expect(mockGtag).toHaveBeenCalledWith('event', 'share', {
        method: 'Twitter',
        content_type: 'technique',
        content_id: 'ne-jamais-couper-la-poire-en-deux',
        custom_parameters: {
          technique_slug: 'ne-jamais-couper-la-poire-en-deux',
          section: 'full-page',
          quote_id: 'none',
          platform: 'Twitter'
        }
      });
    });
  });

  describe('copyToClipboard', () => {
    it('should copy text to clipboard successfully', async () => {
      const mockWriteText = vi.fn().mockResolvedValue(undefined);
      const mockSuccessCallback = vi.fn();
      
      global.navigator = {
        clipboard: { writeText: mockWriteText }
      } as any;

      const result = await copyToClipboard('test text', mockSuccessCallback);

      expect(result).toBe(true);
      expect(mockWriteText).toHaveBeenCalledWith('test text');
      expect(mockSuccessCallback).toHaveBeenCalled();
    });

    it('should handle clipboard errors with fallback', async () => {
      const mockWriteText = vi.fn().mockRejectedValue(new Error('Clipboard error'));
      const mockErrorCallback = vi.fn();
      
      global.navigator = {
        clipboard: { writeText: mockWriteText }
      } as any;

      // Mock document methods for fallback
      const mockTextArea = {
        value: '',
        style: {},
        focus: vi.fn(),
        select: vi.fn()
      };
      
      global.document = {
        createElement: vi.fn().mockReturnValue(mockTextArea),
        body: {
          appendChild: vi.fn(),
          removeChild: vi.fn()
        },
        execCommand: vi.fn().mockReturnValue(true)
      } as any;

      const result = await copyToClipboard('test text', undefined, mockErrorCallback);

      expect(mockErrorCallback).toHaveBeenCalled();
      expect(result).toBe(true); // Fallback should work
    });
  });

  describe('isNativeShareAvailable', () => {
    it('should detect native share availability', () => {
      global.navigator = { share: vi.fn() } as any;
      expect(isNativeShareAvailable()).toBe(true);

      global.navigator = {} as any;
      expect(isNativeShareAvailable()).toBe(false);
    });
  });

  describe('nativeShare', () => {
    it('should use native share when available', async () => {
      const mockShare = vi.fn().mockResolvedValue(undefined);
      global.navigator = { share: mockShare } as any;

      const shareData = {
        title: 'Test',
        text: 'Test text',
        url: 'https://example.com'
      };

      const result = await nativeShare(shareData, mockTechnique, 'expertise');

      expect(result).toBe(true);
      expect(mockShare).toHaveBeenCalledWith({
        title: shareData.title,
        text: shareData.text,
        url: shareData.url
      });
    });

    it('should return false when native share is not available', async () => {
      global.navigator = {} as any;

      const shareData = {
        title: 'Test',
        text: 'Test text',
        url: 'https://example.com'
      };

      const result = await nativeShare(shareData, mockTechnique);

      expect(result).toBe(false);
    });
  });
});

describe('Text Generation', () => {
  let generator: SocialShareGenerator;

  beforeEach(() => {
    generator = new SocialShareGenerator(mockTechnique);
  });

  it('should generate appropriate text length for each platform', () => {
    const platforms = ['linkedin', 'twitter', 'facebook', 'whatsapp'] as const;
    
    platforms.forEach(platform => {
      const shareData = generator.generateShareData(platform, {
        includeStats: true
      });
      
      const maxLength = socialPlatforms[platform].maxTextLength;
      if (maxLength) {
        expect(shareData.text.length).toBeLessThanOrEqual(maxLength);
      }
    });
  });

  it('should include platform-specific formatting', () => {
    const linkedinData = generator.generateShareData('linkedin');
    expect(linkedinData.text).toContain('🎯');
    expect(linkedinData.text).toContain('✅');

    const twitterData = generator.generateShareData('twitter');
    expect(twitterData.text).toContain('👇');

    const whatsappData = generator.generateShareData('whatsapp');
    expect(whatsappData.text).toContain('🔥');
  });

  it('should handle stats inclusion/exclusion', () => {
    const withStats = generator.generateShareData('linkedin', { includeStats: true });
    expect(withStats.text).toContain('85%');

    const withoutStats = generator.generateShareData('linkedin', { includeStats: false });
    expect(withoutStats.text).not.toContain('85%');
  });
});