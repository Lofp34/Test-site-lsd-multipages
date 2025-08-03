'use client';

// Simple A/B testing utility - fallback version
export interface ABTestVariant {
  id: string;
  text: string;
  metadata?: {
    colorClass?: string;
    [key: string]: any;
  };
}

export interface ABTestResult {
  variant: ABTestVariant | null;
  isActive: boolean;
  trackConversion: () => void;
}

export function useABTest(testId: string): ABTestResult {
  // Simple fallback - no A/B testing active
  return {
    variant: null,
    isActive: false,
    trackConversion: () => {
      console.log(`A/B Test conversion tracked: ${testId}`);
    }
  };
}

export function trackABTestConversion(testId: string, variantId: string) {
  console.log(`A/B Test conversion: ${testId} - ${variantId}`);
}