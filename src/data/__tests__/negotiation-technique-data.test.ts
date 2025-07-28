import { describe, it, expect } from 'vitest';
import { NegotiationTechnique } from '@/types/negotiation-technique';
import { negotiationTechniqueData } from '../negotiation-technique-data';

describe('Negotiation Technique Data Model', () => {
  const technique = negotiationTechniqueData;

  it('should have valid technique structure', () => {
    expect(technique).toBeDefined();
    expect(technique.id).toBe('ne-jamais-couper-la-poire-en-deux');
    expect(technique.slug).toBe('ne-jamais-couper-la-poire-en-deux');
    expect(technique.title).toBe('Ne jamais couper la poire en deux');
    expect(technique.author).toBe('Chris Voss');
    expect(technique.origin).toBe('FBI - Négociateur en chef');
  });

  it('should have required content fields', () => {
    expect(technique.description).toBeTruthy();
    expect(technique.psychologyPrinciples).toHaveLength(6);
    expect(technique.businessApplications).toHaveLength(4);
    expect(technique.laurentVision).toBeTruthy();
    expect(technique.pmeAdaptation).toBeTruthy();
  });

  it('should have success metrics', () => {
    expect(technique.successMetrics).toHaveLength(3);
    technique.successMetrics.forEach(metric => {
      expect(metric.metric).toBeTruthy();
      expect(metric.value).toBeTruthy();
      expect(metric.context).toBeTruthy();
    });
  });

  it('should have step-by-step guide', () => {
    expect(technique.stepByStepGuide).toHaveLength(5);
    technique.stepByStepGuide.forEach((step, index) => {
      expect(step.step).toBe(index + 1);
      expect(step.title).toBeTruthy();
      expect(step.description).toBeTruthy();
      expect(step.script).toBeTruthy();
      expect(step.example).toBeTruthy();
      expect(step.tips).toBeInstanceOf(Array);
      expect(step.tips.length).toBeGreaterThan(0);
    });
  });

  it('should have case studies', () => {
    expect(technique.caseStudies).toHaveLength(3);
    technique.caseStudies.forEach(caseStudy => {
      expect(caseStudy.industry).toBeTruthy();
      expect(caseStudy.challenge).toBeTruthy();
      expect(caseStudy.application).toBeTruthy();
      expect(caseStudy.results).toBeTruthy();
      expect(caseStudy.metrics).toBeTruthy();
      expect(typeof caseStudy.metrics).toBe('object');
    });
  });

  it('should have common mistakes', () => {
    expect(technique.commonMistakes).toHaveLength(6);
    technique.commonMistakes.forEach(mistake => {
      expect(mistake.mistake).toBeTruthy();
      expect(mistake.consequence).toBeTruthy();
      expect(mistake.solution).toBeTruthy();
    });
  });

  it('should have downloadable resources', () => {
    expect(technique.downloadableResources).toHaveLength(3);
    technique.downloadableResources.forEach(resource => {
      expect(resource.title).toBeTruthy();
      expect(resource.type).toBeTruthy();
      expect(resource.url).toBeTruthy();
      expect(resource.url).toMatch(/^\/ressources\/downloads\//);
    });
  });

  it('should have SEO metadata', () => {
    expect(technique.seoMetadata.title).toBeTruthy();
    expect(technique.seoMetadata.description).toBeTruthy();
    expect(technique.seoMetadata.keywords).toBeInstanceOf(Array);
    expect(technique.seoMetadata.keywords.length).toBeGreaterThan(0);
    expect(technique.seoMetadata.canonicalUrl).toBeTruthy();
  });

  it('should have tracking events', () => {
    expect(technique.trackingEvents).toHaveLength(4);
    technique.trackingEvents.forEach(event => {
      expect(event.event).toBeTruthy();
      expect(event.category).toBeTruthy();
      expect(event.action).toBeTruthy();
    });
  });

  it('should have valid category and difficulty', () => {
    expect(['closing', 'psychology', 'preparation', 'objection-handling']).toContain(technique.category);
    expect(['beginner', 'intermediate', 'advanced']).toContain(technique.difficultyLevel);
  });

  it('should have related techniques', () => {
    expect(technique.relatedTechniques).toBeInstanceOf(Array);
    expect(technique.relatedTechniques.length).toBeGreaterThan(0);
  });
});

describe('Data Model Type Validation', () => {
  it('should conform to NegotiationTechnique interface', () => {
    const technique = negotiationTechniqueData;
    
    // TypeScript compilation will catch type errors
    const validateType = (t: NegotiationTechnique) => t;
    expect(() => validateType(technique)).not.toThrow();
  });

  it('should have all required properties', () => {
    const technique = negotiationTechniqueData;
    const requiredProps = [
      'id', 'slug', 'title', 'author', 'origin', 'category', 'difficultyLevel',
      'description', 'psychologyPrinciples', 'businessApplications', 'laurentVision',
      'pmeAdaptation', 'successMetrics', 'stepByStepGuide', 'caseStudies',
      'commonMistakes', 'relatedTechniques', 'downloadableResources',
      'seoMetadata', 'trackingEvents'
    ];

    requiredProps.forEach(prop => {
      expect(technique).toHaveProperty(prop);
    });
  });

  it('should have valid URLs in resources', () => {
    const technique = negotiationTechniqueData;
    
    technique.downloadableResources.forEach(resource => {
      expect(resource.url).toMatch(/^\/ressources\/downloads\/.+\.(pdf|docx|xlsx)$/);
    });

    expect(technique.seoMetadata.canonicalUrl).toMatch(/^\/ressources\/techniques-de-negociation\/.+$/);
  });
});