import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { 
  trackCTAClick, 
  trackMicroConversion, 
  trackSectionView,
  conversionGoals,
  ctaToGoalMapping,
  CTATrackingData
} from '../cta-tracking';

// Mock window.gtag
const mockGtag = vi.fn();
Object.defineProperty(window, 'gtag', {
  value: mockGtag,
  writable: true
});

// Mock sessionStorage
const mockSessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};
Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
  writable: true
});

describe('CTA Tracking System', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSessionStorage.getItem.mockReturnValue('test-session-id');
  });

  describe('trackCTAClick', () => {
    it('should track basic CTA click event', () => {
      const ctaData: CTATrackingData = {
        ctaId: 'test-cta',
        ctaText: 'Test Button',
        ctaType: 'primary',
        section: 'hero',
        destination: '/test',
        position: 1
      };

      trackCTAClick(ctaData);

      expect(mockGtag).toHaveBeenCalledWith('event', 'cta_click', expect.objectContaining({
        event_category: 'cta_engagement',
        event_label: 'test-cta',
        cta_id: 'test-cta',
        cta_text: 'Test Button',
        cta_type: 'primary',
        cta_section: 'hero',
        cta_destination: '/test',
        cta_position: 1
      }));
    });

    it('should track conversion goal when CTA is mapped', () => {
      const ctaData: CTATrackingData = {
        ctaId: 'hero-bootcamp',
        ctaText: 'Bootcamp Button',
        ctaType: 'primary',
        section: 'hero',
        destination: '/bootcamp'
      };

      trackCTAClick(ctaData);

      // Should track the conversion goal
      expect(mockGtag).toHaveBeenCalledWith('event', 'conversion', expect.objectContaining({
        event_category: 'conversion',
        goal_id: 'bootcamp_signup',
        value: 100
      }));
    });

    it('should track bootcamp-specific events', () => {
      const ctaData: CTATrackingData = {
        ctaId: 'conversion-bootcamp',
        ctaText: 'Bootcamp CTA',
        ctaType: 'primary',
        section: 'conversion_ctas',
        destination: '/bootcamp'
      };

      trackCTAClick(ctaData);

      expect(mockGtag).toHaveBeenCalledWith('event', 'bootcamp_interest', expect.objectContaining({
        event_category: 'business_priority',
        bootcamp_source: 'conversion_ctas',
        value: 75
      }));
    });

    it('should track resource-specific events', () => {
      const ctaData: CTATrackingData = {
        ctaId: 'resource-specific',
        ctaText: 'Download Resource',
        ctaType: 'secondary',
        section: 'resources',
        destination: '/resource'
      };

      trackCTAClick(ctaData);

      expect(mockGtag).toHaveBeenCalledWith('event', 'resource_interest', expect.objectContaining({
        event_category: 'lead_nurturing',
        resource_type: 'specific',
        value: 20
      }));
    });

    it('should handle missing gtag gracefully', () => {
      // Mock gtag as undefined
      const originalGtag = window.gtag;
      (window as any).gtag = undefined;

      const ctaData: CTATrackingData = {
        ctaId: 'test-cta',
        ctaText: 'Test',
        ctaType: 'primary',
        section: 'test',
        destination: '/test'
      };

      expect(() => trackCTAClick(ctaData)).not.toThrow();

      // Restore gtag
      window.gtag = originalGtag;
    });
  });

  describe('trackMicroConversion', () => {
    it('should track micro conversion events', () => {
      trackMicroConversion('hover', 'test-element', 'test-section');

      expect(mockGtag).toHaveBeenCalledWith('event', 'micro_conversion', {
        event_category: 'micro_engagement',
        event_label: 'hover_test-element',
        micro_action: 'hover',
        micro_element: 'test-element',
        micro_section: 'test-section'
      });
    });
  });

  describe('trackSectionView', () => {
    it('should track section view events', () => {
      trackSectionView('hero-section', 5000);

      expect(mockGtag).toHaveBeenCalledWith('event', 'section_view', {
        event_category: 'engagement',
        event_label: 'hero-section',
        section_name: 'hero-section',
        time_spent: 5000,
        engagement_type: 'section_view'
      });
    });

    it('should handle missing time spent parameter', () => {
      trackSectionView('hero-section');

      expect(mockGtag).toHaveBeenCalledWith('event', 'section_view', expect.objectContaining({
        time_spent: 0
      }));
    });
  });

  describe('Conversion Goals Configuration', () => {
    it('should have all required conversion goals', () => {
      const requiredGoals = [
        'bootcamp_signup',
        'diagnostic_start',
        'contact_form',
        'resources_download',
        'guide_download'
      ];

      requiredGoals.forEach(goalId => {
        expect(conversionGoals[goalId]).toBeDefined();
        expect(conversionGoals[goalId].goalName).toBeTruthy();
        expect(conversionGoals[goalId].goalValue).toBeGreaterThan(0);
        expect(conversionGoals[goalId].goalCategory).toBeTruthy();
      });
    });

    it('should have proper CTA to goal mapping', () => {
      const testMappings = [
        { ctaId: 'hero-bootcamp', expectedGoal: 'bootcamp_signup' },
        { ctaId: 'problem-diagnostic', expectedGoal: 'diagnostic_start' },
        { ctaId: 'resources-contact', expectedGoal: 'contact_exchange' }
      ];

      testMappings.forEach(({ ctaId, expectedGoal }) => {
        expect(ctaToGoalMapping[ctaId]).toBe(expectedGoal);
      });
    });
  });

  describe('Session Management', () => {
    it('should generate session ID when not present', () => {
      mockSessionStorage.getItem.mockReturnValue(null);
      
      const ctaData: CTATrackingData = {
        ctaId: 'test-cta',
        ctaText: 'Test',
        ctaType: 'primary',
        section: 'test',
        destination: '/test'
      };

      trackCTAClick(ctaData);

      expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
        'ls_session_id',
        expect.stringMatching(/^session_\d+_[a-z0-9]+$/)
      );
    });

    it('should use existing session ID when present', () => {
      const existingSessionId = 'existing-session-123';
      mockSessionStorage.getItem.mockReturnValue(existingSessionId);

      const ctaData: CTATrackingData = {
        ctaId: 'test-cta',
        ctaText: 'Test',
        ctaType: 'primary',
        section: 'test',
        destination: '/test'
      };

      trackCTAClick(ctaData);

      expect(mockGtag).toHaveBeenCalledWith('event', 'cta_click', expect.objectContaining({
        session_id: existingSessionId
      }));
    });
  });

  describe('Funnel Tracking', () => {
    it('should track funnel steps correctly', () => {
      const ctaData: CTATrackingData = {
        ctaId: 'test-cta',
        ctaText: 'Test',
        ctaType: 'primary',
        section: 'hero',
        destination: '/bootcamp'
      };

      trackCTAClick(ctaData);

      expect(mockGtag).toHaveBeenCalledWith('event', 'funnel_step', expect.objectContaining({
        event_category: 'conversion_funnel',
        funnel_step: 3, // /bootcamp should be step 3
        funnel_destination: '/bootcamp',
        value: 75
      }));
    });
  });

  describe('Development Mode Logging', () => {
    it('should log in development mode', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      const ctaData: CTATrackingData = {
        ctaId: 'test-cta',
        ctaText: 'Test',
        ctaType: 'primary',
        section: 'test',
        destination: '/test'
      };

      trackCTAClick(ctaData);

      expect(consoleSpy).toHaveBeenCalledWith(
        'CTA Tracking Enhanced:',
        expect.objectContaining({
          event: 'cta_click',
          data: ctaData
        })
      );

      consoleSpy.mockRestore();
      process.env.NODE_ENV = originalEnv;
    });
  });
});