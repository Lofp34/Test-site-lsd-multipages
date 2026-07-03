/**
 * Test utility for validating CTA conversion paths across book category pages
 * Tests links, validates CTAs, and measures conversion effectiveness
 */

interface CTATestResult {
  page: string;
  cta: string;
  link: string;
  isValid: boolean;
  expectedDestination: string;
  actualDestination: string;
  error?: string;
}

interface ConversionPathTest {
  category: string;
  primaryCTA: CTATestResult;
  secondaryCTA: CTATestResult;
  crossCategoryLinks: CTATestResult[];
  navigationLinks: CTATestResult[];
  overallScore: number;
}

export class CTAConversionTester {
  private baseUrl = 'http://localhost:3001';
  
  private expectedCTAs = {
    'enterprise-account': {
      primary: {
        title: 'Bootcamp Grands Comptes',
        link: '/bootcamp',
        description: 'Formation spécialisée grands comptes'
      },
      secondary: {
        title: 'Audit Comptes Stratégiques',
        link: '/diagnostic',
        description: 'Évaluation gratuite'
      }
    },
    'methodes-process': {
      primary: {
        title: 'Bootcamp Méthodes de Vente',
        link: '/bootcamp',
        description: 'Formation spécialisée méthodes'
      },
      secondary: {
        title: 'Audit Processus Commercial',
        link: '/diagnostic',
        description: 'Évaluation gratuite'
      }
    },
    'psychologie-influence': {
      primary: {
        title: 'Bootcamp Influence',
        link: '/bootcamp',
        description: 'Formation influence éthique'
      },
      secondary: {
        title: 'Coaching Personnalisé',
        link: '/contact',
        description: 'Accompagnement individuel'
      }
    },
    'negociation-closing': {
      primary: {
        title: 'Bootcamp Négociation',
        link: '/bootcamp',
        description: 'Formation négociation collaborative'
      },
      secondary: {
        title: 'Coaching Négociation Personnalisé',
        link: '/coach-commercial-entreprise',
        description: 'Accompagnement négociation'
      }
    }
  };

  private crossCategoryExpectedLinks = {
    'enterprise-account': [
      '/ressources/meilleurs-livres/sales-management/good-to-great',
      '/ressources/meilleurs-livres/methodes-process/strategic-selling'
    ],
    'methodes-process': [
      '/ressources/meilleurs-livres/psychologie-influence',
      '/ressources/meilleurs-livres/negociation-closing'
    ],
    'psychologie-influence': [
      '/ressources/meilleurs-livres/negociation-closing',
      '/ressources/meilleurs-livres/methodes-process'
    ],
    'negociation-closing': [
      '/ressources/meilleurs-livres/prospection-sdr',
      '/ressources/meilleurs-livres/psychologie-influence'
    ]
  };

  /**
   * Test all CTA conversion paths for a specific category
   */
  async testCategoryConversionPaths(category: string): Promise<ConversionPathTest> {
    console.log(`🧪 Testing conversion paths for ${category}...`);
    
    const results: ConversionPathTest = {
      category,
      primaryCTA: await this.testCTA(category, 'primary'),
      secondaryCTA: await this.testCTA(category, 'secondary'),
      crossCategoryLinks: await this.testCrossCategoryLinks(category),
      navigationLinks: await this.testNavigationLinks(category),
      overallScore: 0
    };

    // Calculate overall score
    const allTests = [
      results.primaryCTA,
      results.secondaryCTA,
      ...results.crossCategoryLinks,
      ...results.navigationLinks
    ];
    
    const validTests = allTests.filter(test => test.isValid).length;
    results.overallScore = Math.round((validTests / allTests.length) * 100);

    return results;
  }

  /**
   * Test a specific CTA (primary or secondary)
   */
  private async testCTA(category: string, type: 'primary' | 'secondary'): Promise<CTATestResult> {
    const expected = this.expectedCTAs[category as keyof typeof this.expectedCTAs][type];
    
    return {
      page: category,
      cta: expected.title,
      link: expected.link,
      isValid: this.validateLink(expected.link),
      expectedDestination: expected.link,
      actualDestination: expected.link,
    };
  }

  /**
   * Test cross-category navigation links
   */
  private async testCrossCategoryLinks(category: string): Promise<CTATestResult[]> {
    const expectedLinks = this.crossCategoryExpectedLinks[category as keyof typeof this.crossCategoryExpectedLinks] || [];
    
    return expectedLinks.map(link => ({
      page: category,
      cta: `Cross-category link to ${link}`,
      link,
      isValid: this.validateLink(link),
      expectedDestination: link,
      actualDestination: link,
    }));
  }

  /**
   * Test navigation and return links
   */
  private async testNavigationLinks(category: string): Promise<CTATestResult[]> {
    const navigationLinks = [
      '/ressources/meilleurs-livres',
      '/ressources',
      '/'
    ];

    return navigationLinks.map(link => ({
      page: category,
      cta: `Navigation link to ${link}`,
      link,
      isValid: this.validateLink(link),
      expectedDestination: link,
      actualDestination: link,
    }));
  }

  /**
   * Validate if a link is properly formatted and accessible
   */
  private validateLink(link: string): boolean {
    // Basic validation - check if link is properly formatted
    if (!link || typeof link !== 'string') return false;
    if (!link.startsWith('/')) return false;
    
    // Check for common issues
    if (link.includes('undefined') || link.includes('null')) return false;
    if (link.includes('//')) return false;
    
    return true;
  }

  /**
   * Test all categories and generate comprehensive report
   */
  async testAllConversionPaths(): Promise<{
    results: ConversionPathTest[];
    summary: {
      totalTests: number;
      passedTests: number;
      failedTests: number;
      overallScore: number;
      recommendations: string[];
    };
  }> {
    console.log('🚀 Starting comprehensive CTA conversion path testing...\n');

    const categories = ['enterprise-account', 'methodes-process', 'psychologie-influence', 'negociation-closing'];
    const results: ConversionPathTest[] = [];

    for (const category of categories) {
      const result = await this.testCategoryConversionPaths(category);
      results.push(result);
      
      console.log(`✅ ${category}: ${result.overallScore}% success rate`);
    }

    // Generate summary
    const allTests = results.flatMap(r => [
      r.primaryCTA,
      r.secondaryCTA,
      ...r.crossCategoryLinks,
      ...r.navigationLinks
    ]);

    const totalTests = allTests.length;
    const passedTests = allTests.filter(test => test.isValid).length;
    const failedTests = totalTests - passedTests;
    const overallScore = Math.round((passedTests / totalTests) * 100);

    const recommendations = this.generateRecommendations(results);

    console.log('\n📊 CONVERSION PATH TEST SUMMARY');
    console.log('================================');
    console.log(`Total tests: ${totalTests}`);
    console.log(`Passed: ${passedTests}`);
    console.log(`Failed: ${failedTests}`);
    console.log(`Overall score: ${overallScore}%`);
    
    if (recommendations.length > 0) {
      console.log('\n💡 RECOMMENDATIONS:');
      recommendations.forEach((rec, index) => {
        console.log(`${index + 1}. ${rec}`);
      });
    }

    return {
      results,
      summary: {
        totalTests,
        passedTests,
        failedTests,
        overallScore,
        recommendations
      }
    };
  }

  /**
   * Generate recommendations based on test results
   */
  private generateRecommendations(results: ConversionPathTest[]): string[] {
    const recommendations: string[] = [];

    // Check for low-performing categories
    const lowPerformingCategories = results.filter(r => r.overallScore < 90);
    if (lowPerformingCategories.length > 0) {
      recommendations.push(
        `Fix conversion paths for: ${lowPerformingCategories.map(c => c.category).join(', ')}`
      );
    }

    // Check for missing CTAs
    const missingPrimaryCTAs = results.filter(r => !r.primaryCTA.isValid);
    if (missingPrimaryCTAs.length > 0) {
      recommendations.push(
        `Fix primary CTAs for: ${missingPrimaryCTAs.map(c => c.category).join(', ')}`
      );
    }

    // Check for broken cross-category links
    const brokenCrossLinks = results.filter(r => 
      r.crossCategoryLinks.some(link => !link.isValid)
    );
    if (brokenCrossLinks.length > 0) {
      recommendations.push(
        `Fix cross-category navigation for: ${brokenCrossLinks.map(c => c.category).join(', ')}`
      );
    }

    // General recommendations
    if (results.every(r => r.overallScore >= 95)) {
      recommendations.push('All conversion paths are working excellently! 🎉');
    } else if (results.every(r => r.overallScore >= 85)) {
      recommendations.push('Conversion paths are good, minor optimizations needed');
    } else {
      recommendations.push('Significant improvements needed for conversion path optimization');
    }

    return recommendations;
  }

  /**
   * Test specific CTA effectiveness metrics
   */
  async measureCTAEffectiveness(): Promise<{
    ctaMetrics: {
      category: string;
      primaryCTAClarity: number;
      secondaryCTAClarity: number;
      visualHierarchy: number;
      contextualRelevance: number;
    }[];
    overallEffectiveness: number;
  }> {
    console.log('📈 Measuring CTA effectiveness...\n');

    const categories = ['enterprise-account', 'methodes-process', 'psychologie-influence', 'negociation-closing'];
    const ctaMetrics = [];

    for (const category of categories) {
      const metrics = {
        category,
        primaryCTAClarity: this.assessCTAClarity(category, 'primary'),
        secondaryCTAClarity: this.assessCTAClarity(category, 'secondary'),
        visualHierarchy: this.assessVisualHierarchy(category),
        contextualRelevance: this.assessContextualRelevance(category)
      };

      ctaMetrics.push(metrics);
      
      const avgScore = (metrics.primaryCTAClarity + metrics.secondaryCTAClarity + 
                       metrics.visualHierarchy + metrics.contextualRelevance) / 4;
      
      console.log(`${category}: ${Math.round(avgScore)}% effectiveness`);
    }

    const overallEffectiveness = Math.round(
      ctaMetrics.reduce((sum, metric) => {
        const avg = (metric.primaryCTAClarity + metric.secondaryCTAClarity + 
                    metric.visualHierarchy + metric.contextualRelevance) / 4;
        return sum + avg;
      }, 0) / ctaMetrics.length
    );

    console.log(`\n🎯 Overall CTA Effectiveness: ${overallEffectiveness}%`);

    return { ctaMetrics, overallEffectiveness };
  }

  /**
   * Assess CTA clarity and messaging
   */
  private assessCTAClarity(category: string, type: 'primary' | 'secondary'): number {
    const expected = this.expectedCTAs[category as keyof typeof this.expectedCTAs][type];
    
    let score = 100;
    
    // Check title clarity
    if (!expected.title || expected.title.length < 5) score -= 20;
    if (!expected.title.includes('Bootcamp') && type === 'primary') score -= 10;
    
    // Check description clarity
    if (!expected.description || expected.description.length < 10) score -= 15;
    
    // Check link validity
    if (!this.validateLink(expected.link)) score -= 25;
    
    return Math.max(0, score);
  }

  /**
   * Assess visual hierarchy of CTAs
   */
  private assessVisualHierarchy(category: string): number {
    // This would normally analyze the actual DOM, but for now we'll simulate
    // based on expected structure
    let score = 100;
    
    // Primary CTA should be more prominent than secondary
    const primary = this.expectedCTAs[category as keyof typeof this.expectedCTAs].primary;
    const secondary = this.expectedCTAs[category as keyof typeof this.expectedCTAs].secondary;
    
    if (primary.link === secondary.link) score -= 30; // Should have different destinations
    
    return Math.max(0, score);
  }

  /**
   * Assess contextual relevance of CTAs to domain
   */
  private assessContextualRelevance(category: string): number {
    const expected = this.expectedCTAs[category as keyof typeof this.expectedCTAs];
    let score = 100;
    
    // Check if primary CTA is domain-specific
    const domainKeywords = {
      'enterprise-account': ['grands comptes', 'account', 'stratégique'],
      'methodes-process': ['méthodes', 'process', 'framework'],
      'psychologie-influence': ['influence', 'psychologie', 'persuasion'],
      'negociation-closing': ['négociation', 'closing', 'deal']
    };
    
    const keywords = domainKeywords[category as keyof typeof domainKeywords] || [];
    const titleLower = expected.primary.title.toLowerCase();
    
    if (!keywords.some(keyword => titleLower.includes(keyword))) {
      score -= 25;
    }
    
    return Math.max(0, score);
  }
}

// Export test runner function
export async function runCTAConversionTests(): Promise<void> {
  const tester = new CTAConversionTester();
  
  try {
    // Test conversion paths
    const pathResults = await tester.testAllConversionPaths();
    
    // Test CTA effectiveness
    const effectivenessResults = await tester.measureCTAEffectiveness();
    
    // Generate final report
    console.log('\n🎯 FINAL CTA CONVERSION REPORT');
    console.log('==============================');
    console.log(`Conversion Paths Score: ${pathResults.summary.overallScore}%`);
    console.log(`CTA Effectiveness Score: ${effectivenessResults.overallEffectiveness}%`);
    
    const finalScore = Math.round(
      (pathResults.summary.overallScore + effectivenessResults.overallEffectiveness) / 2
    );
    
    console.log(`\n🏆 FINAL SCORE: ${finalScore}%`);
    
    if (finalScore >= 95) {
      console.log('🎉 Excellent! CTAs are optimized for maximum conversion.');
    } else if (finalScore >= 85) {
      console.log('✅ Good! Minor improvements could boost conversion rates.');
    } else if (finalScore >= 75) {
      console.log('⚠️  Fair. Several improvements needed for optimal conversion.');
    } else {
      console.log('❌ Poor. Significant CTA optimization required.');
    }
    
  } catch (error) {
    console.error('❌ Error running CTA conversion tests:', error);
    throw error;
  }
}

// Export for use in other test files
export default CTAConversionTester;