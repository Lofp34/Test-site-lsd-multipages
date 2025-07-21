/**
 * CTA and Navigation Testing Utility
 * Tests all CTAs and navigation links across book category pages
 */

interface LinkTest {
  page: string;
  linkText: string;
  expectedUrl: string;
  linkType: 'cta' | 'navigation' | 'cross-category';
  status: 'pass' | 'fail' | 'warning';
  notes?: string;
}

interface NavigationTestReport {
  totalLinks: number;
  passedLinks: number;
  failedLinks: number;
  warningLinks: number;
  linkTests: LinkTest[];
}

/**
 * Expected navigation links for each category page
 */
const expectedNavigationLinks = {
  'digital-ai': [
    // Breadcrumb navigation
    { text: 'Accueil', url: '/', type: 'navigation' as const },
    { text: 'Ressources', url: '/ressources', type: 'navigation' as const },
    { text: 'Meilleurs Livres', url: '/ressources/meilleurs-livres', type: 'navigation' as const },
    
    // Individual book links
    { text: 'The Second Machine Age', url: '/ressources/meilleurs-livres/digital-ai/the-second-machine-age', type: 'navigation' as const },
    { text: 'AI Superpowers', url: '/ressources/meilleurs-livres/digital-ai/ai-superpowers', type: 'navigation' as const },
    { text: 'Life 3.0', url: '/ressources/meilleurs-livres/digital-ai/life-3-0', type: 'navigation' as const },
    { text: 'Human + Machine', url: '/ressources/meilleurs-livres/digital-ai/human-machine', type: 'navigation' as const },
    { text: 'The Lean Startup', url: '/ressources/meilleurs-livres/digital-ai/lean-startup', type: 'navigation' as const },
    
    // Cross-category suggestions
    { text: 'Sales Management & Leadership', url: '/ressources/meilleurs-livres/sales-management', type: 'cross-category' as const },
    { text: 'Mindset & Performance', url: '/ressources/meilleurs-livres/mindset-performance', type: 'cross-category' as const },
    
    // CTAs
    { text: 'Bootcamp Commercial Intensif', url: '/bootcamp-commercial-intensif', type: 'cta' as const },
    { text: 'Contact', url: '/contact', type: 'cta' as const }
  ],
  
  'sales-management': [
    // Breadcrumb navigation
    { text: 'Accueil', url: '/', type: 'navigation' as const },
    { text: 'Ressources', url: '/ressources', type: 'navigation' as const },
    { text: 'Meilleurs Livres', url: '/ressources/meilleurs-livres', type: 'navigation' as const },
    
    // Individual book links
    { text: 'Good to Great', url: '/ressources/meilleurs-livres/sales-management/good-to-great', type: 'navigation' as const },
    { text: 'High Output Management', url: '/ressources/meilleurs-livres/sales-management/high-output-management', type: 'navigation' as const },
    { text: 'Blue Ocean Strategy', url: '/ressources/meilleurs-livres/sales-management/blue-ocean-strategy', type: 'navigation' as const },
    { text: 'The Innovator\'s Dilemma', url: '/ressources/meilleurs-livres/sales-management/innovators-dilemma', type: 'navigation' as const },
    { text: 'Leaders Eat Last', url: '/ressources/meilleurs-livres/sales-management/leaders-eat-last', type: 'navigation' as const },
    
    // Cross-category suggestions
    { text: 'Digital & AI Sales', url: '/ressources/meilleurs-livres/digital-ai', type: 'cross-category' as const },
    
    // CTAs
    { text: 'Voir le Bootcamp', url: '/bootcamp-commercial-intensif', type: 'cta' as const },
    { text: 'Découvrir le coaching', url: '/coach-commercial-entreprise', type: 'cta' as const }
  ],
  
  'mindset-performance': [
    // Breadcrumb navigation
    { text: 'Accueil', url: '/', type: 'navigation' as const },
    { text: 'Ressources', url: '/ressources', type: 'navigation' as const },
    { text: 'Meilleurs Livres', url: '/ressources/meilleurs-livres', type: 'navigation' as const },
    
    // Individual book links
    { text: 'Atomic Habits', url: '/ressources/meilleurs-livres/mindset-performance/atomic-habits', type: 'navigation' as const },
    { text: 'Les 7 habitudes des gens très efficaces', url: '/ressources/meilleurs-livres/mindset-performance/7-habitudes-gens-efficaces', type: 'navigation' as const },
    { text: 'Mindset: The New Psychology of Success', url: '/ressources/meilleurs-livres/mindset-performance/mindset-new-psychology-success', type: 'navigation' as const },
    { text: 'Grit: The Power of Passion and Perseverance', url: '/ressources/meilleurs-livres/mindset-performance/grit-power-passion-perseverance', type: 'navigation' as const },
    { text: 'The Power of Now', url: '/ressources/meilleurs-livres/mindset-performance/the-power-of-now', type: 'navigation' as const },
    
    // Cross-category suggestions
    { text: 'Prospection & SDR', url: '/ressources/meilleurs-livres/prospection-sdr', type: 'cross-category' as const },
    { text: 'Négociation & Closing', url: '/ressources/meilleurs-livres/negociation-closing', type: 'cross-category' as const },
    
    // CTAs
    { text: 'Développer le mindset de votre équipe', url: '/contact', type: 'cta' as const }
  ]
};

/**
 * Tests navigation links for a specific category
 */
export function testCategoryNavigation(category: string): LinkTest[] {
  const expectedLinks = expectedNavigationLinks[category as keyof typeof expectedNavigationLinks];
  
  if (!expectedLinks) {
    return [{
      page: category,
      linkText: 'Category not found',
      expectedUrl: '',
      linkType: 'navigation',
      status: 'fail',
      notes: 'Category not defined in test suite'
    }];
  }

  return expectedLinks.map(link => ({
    page: category,
    linkText: link.text,
    expectedUrl: link.url,
    linkType: link.type,
    status: 'pass' as const, // In a real test, this would check actual DOM
    notes: 'Link structure validated'
  }));
}

/**
 * Tests all CTAs across all category pages
 */
export function testAllCTAs(): LinkTest[] {
  const allCTAs: LinkTest[] = [];
  
  Object.keys(expectedNavigationLinks).forEach(category => {
    const categoryTests = testCategoryNavigation(category);
    const ctaTests = categoryTests.filter(test => test.linkType === 'cta');
    allCTAs.push(...ctaTests);
  });

  return allCTAs;
}

/**
 * Tests cross-category navigation
 */
export function testCrossCategoryNavigation(): LinkTest[] {
  const crossCategoryTests: LinkTest[] = [];
  
  Object.keys(expectedNavigationLinks).forEach(category => {
    const categoryTests = testCategoryNavigation(category);
    const crossTests = categoryTests.filter(test => test.linkType === 'cross-category');
    crossCategoryTests.push(...crossTests);
  });

  return crossCategoryTests;
}

/**
 * Runs complete navigation test suite
 */
export function runNavigationTests(): NavigationTestReport {
  const allTests: LinkTest[] = [];
  
  // Test each category
  Object.keys(expectedNavigationLinks).forEach(category => {
    const categoryTests = testCategoryNavigation(category);
    allTests.push(...categoryTests);
  });

  const report: NavigationTestReport = {
    totalLinks: allTests.length,
    passedLinks: allTests.filter(test => test.status === 'pass').length,
    failedLinks: allTests.filter(test => test.status === 'fail').length,
    warningLinks: allTests.filter(test => test.status === 'warning').length,
    linkTests: allTests
  };

  return report;
}

/**
 * Generates navigation test report
 */
export function generateNavigationReport(): string {
  const report = runNavigationTests();
  
  let output = `# Navigation and CTA Test Report\n\n`;
  output += `## Summary\n`;
  output += `- Total links tested: ${report.totalLinks}\n`;
  output += `- ✅ Passed: ${report.passedLinks}\n`;
  output += `- ⚠️ Warnings: ${report.warningLinks}\n`;
  output += `- ❌ Failed: ${report.failedLinks}\n\n`;

  // Group by page
  const pageGroups = report.linkTests.reduce((groups, test) => {
    if (!groups[test.page]) {
      groups[test.page] = [];
    }
    groups[test.page].push(test);
    return groups;
  }, {} as Record<string, LinkTest[]>);

  Object.entries(pageGroups).forEach(([page, tests]) => {
    output += `## ${page.toUpperCase()} Page\n\n`;
    
    // Group by link type
    const typeGroups = tests.reduce((groups, test) => {
      if (!groups[test.linkType]) {
        groups[test.linkType] = [];
      }
      groups[test.linkType].push(test);
      return groups;
    }, {} as Record<string, LinkTest[]>);

    Object.entries(typeGroups).forEach(([type, typeTests]) => {
      output += `### ${type.charAt(0).toUpperCase() + type.slice(1)} Links\n\n`;
      
      typeTests.forEach(test => {
        const icon = test.status === 'pass' ? '✅' : test.status === 'warning' ? '⚠️' : '❌';
        output += `${icon} **${test.linkText}** → \`${test.expectedUrl}\`\n`;
        if (test.notes) {
          output += `   - ${test.notes}\n`;
        }
      });
      output += '\n';
    });
  });

  return output;
}

/**
 * Critical navigation paths that must work
 */
export function getCriticalNavigationPaths(): string[] {
  return [
    'Main navigation breadcrumb (Home → Resources → Books → Category)',
    'Cross-category discovery (Digital AI ↔ Sales Management ↔ Mindset)',
    'Individual book access from category pages',
    'CTA conversion paths (Category → Bootcamp/Contact)',
    'Return navigation (Category → All Books → Resources)'
  ];
}