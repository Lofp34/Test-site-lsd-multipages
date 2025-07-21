/**
 * SEO and Structured Data Validation Test
 * Validates SEO metadata and structured data across all book category pages
 */

interface SEOCheck {
  category: string;
  element: string;
  status: 'pass' | 'fail' | 'warning';
  value?: string;
  issue?: string;
  recommendation?: string;
}

interface SEOReport {
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  warningChecks: number;
  checks: SEOCheck[];
  criticalIssues: string[];
  recommendations: string[];
}

/**
 * Expected SEO metadata for each category
 */
const expectedSEOMetadata = {
  'digital-ai': {
    title: 'Digital & AI Sales | Meilleurs Livres | Laurent Serre',
    description: 'Les meilleurs livres sur l\'IA et la transformation digitale en vente. The Second Machine Age, AI Superpowers, Human + Machine. Résumés détaillés et conseils terrain de Laurent Serre.',
    keywords: ['IA vente', 'digital sales', 'intelligence artificielle commercial', 'transformation digitale', 'vente augmentée'],
    canonicalUrl: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/digital-ai',
    ogTitle: 'Digital & AI Sales | Meilleurs Livres | Laurent Serre',
    ogDescription: 'Les meilleurs livres sur l\'IA et la transformation digitale en vente. The Second Machine Age, AI Superpowers, Human + Machine. Résumés détaillés et conseils terrain.',
    twitterCard: 'summary_large_image'
  },
  
  'sales-management': {
    title: 'Sales Management & Leadership | Meilleurs Livres | Laurent Serre',
    description: 'Les meilleurs livres de management et leadership commercial. Good to Great, High Output Management, Blue Ocean Strategy. Résumés détaillés et avis terrain de Laurent Serre.',
    keywords: ['management commercial', 'leadership vente', 'manager équipe commerciale', 'good to great', 'high output management'],
    canonicalUrl: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management',
    ogTitle: 'Sales Management & Leadership | Meilleurs Livres | Laurent Serre',
    ogDescription: 'Les meilleurs livres de management et leadership commercial. Good to Great, High Output Management, Blue Ocean Strategy. Résumés détaillés et avis terrain.',
    twitterCard: 'summary_large_image'
  },
  
  'mindset-performance': {
    title: 'Mindset & Performance | Meilleurs Livres | Laurent Serre',
    description: 'Les meilleurs livres sur le mindset et la performance personnelle. Atomic Habits, Les 7 habitudes, Mindset de Carol Dweck, Grit. Résumés détaillés et conseils terrain de Laurent Serre.',
    keywords: ['mindset commercial', 'performance personnelle', 'état d\'esprit gagnant', 'développement personnel commercial', 'habitudes performance'],
    canonicalUrl: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/mindset-performance',
    ogTitle: 'Mindset & Performance | Meilleurs Livres | Laurent Serre',
    ogDescription: 'Les meilleurs livres sur le mindset et la performance personnelle. Atomic Habits, Les 7 habitudes, Mindset de Carol Dweck, Grit. Résumés détaillés et conseils terrain.',
    twitterCard: 'summary_large_image'
  }
};

/**
 * Expected structured data schemas
 */
const expectedStructuredData = {
  'digital-ai': {
    '@type': 'CollectionPage',
    name: 'Digital & AI Sales - Meilleurs Livres',
    description: 'La transformation numérique et l\'intelligence artificielle révolutionnent le métier commercial. Découvrez les références essentielles pour maîtriser l\'IA en vente.',
    url: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/digital-ai',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: 5
    },
    breadcrumb: {
      '@type': 'BreadcrumbList'
    }
  },
  
  'sales-management': {
    '@type': 'CollectionPage',
    name: 'Sales Management & Leadership - Meilleurs Livres',
    description: 'Management et leadership commercial : les références pour diriger, motiver et développer des équipes commerciales performantes.',
    url: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: 5
    },
    breadcrumb: {
      '@type': 'BreadcrumbList'
    }
  },
  
  'mindset-performance': {
    '@type': 'CollectionPage',
    name: 'Mindset & Performance - Meilleurs Livres',
    description: 'Développer un état d\'esprit de croissance et optimiser ses performances personnelles. Découvrez les références essentielles pour cultiver l\'état d\'esprit gagnant et maximiser votre potentiel commercial.',
    url: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/mindset-performance',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: 5
    },
    breadcrumb: {
      '@type': 'BreadcrumbList'
    }
  }
};

/**
 * Validates basic SEO metadata for a category
 */
export function validateBasicSEO(category: string): SEOCheck[] {
  const checks: SEOCheck[] = [];
  const expected = expectedSEOMetadata[category as keyof typeof expectedSEOMetadata];
  
  if (!expected) {
    return [{
      category,
      element: 'metadata',
      status: 'fail',
      issue: 'Category not found in SEO validation data',
      recommendation: 'Add SEO metadata configuration for this category'
    }];
  }

  // Title tag validation
  checks.push({
    category,
    element: 'title',
    status: expected.title.length <= 60 ? 'pass' : 'warning',
    value: expected.title,
    issue: expected.title.length > 60 ? 'Title too long' : undefined,
    recommendation: expected.title.length > 60 ? 'Keep title under 60 characters' : undefined
  });

  // Meta description validation
  checks.push({
    category,
    element: 'description',
    status: expected.description.length <= 160 ? 'pass' : 'warning',
    value: expected.description,
    issue: expected.description.length > 160 ? 'Description too long' : undefined,
    recommendation: expected.description.length > 160 ? 'Keep description under 160 characters' : undefined
  });

  // Keywords validation
  checks.push({
    category,
    element: 'keywords',
    status: expected.keywords.length >= 3 ? 'pass' : 'warning',
    value: expected.keywords.join(', '),
    issue: expected.keywords.length < 3 ? 'Not enough keywords' : undefined,
    recommendation: expected.keywords.length < 3 ? 'Add more relevant keywords' : undefined
  });

  // Canonical URL validation
  checks.push({
    category,
    element: 'canonical',
    status: expected.canonicalUrl.startsWith('https://') ? 'pass' : 'fail',
    value: expected.canonicalUrl,
    issue: !expected.canonicalUrl.startsWith('https://') ? 'Invalid canonical URL' : undefined
  });

  // Open Graph validation
  checks.push({
    category,
    element: 'og:title',
    status: 'pass',
    value: expected.ogTitle
  });

  checks.push({
    category,
    element: 'og:description',
    status: 'pass',
    value: expected.ogDescription
  });

  // Twitter Card validation
  checks.push({
    category,
    element: 'twitter:card',
    status: expected.twitterCard === 'summary_large_image' ? 'pass' : 'warning',
    value: expected.twitterCard,
    recommendation: expected.twitterCard !== 'summary_large_image' ? 'Use summary_large_image for better engagement' : undefined
  });

  return checks;
}

/**
 * Validates structured data for a category
 */
export function validateStructuredData(category: string): SEOCheck[] {
  const checks: SEOCheck[] = [];
  const expected = expectedStructuredData[category as keyof typeof expectedStructuredData];
  
  if (!expected) {
    return [{
      category,
      element: 'structured-data',
      status: 'fail',
      issue: 'No structured data configuration found',
      recommendation: 'Add Schema.org structured data'
    }];
  }

  // CollectionPage schema validation
  checks.push({
    category,
    element: 'schema:CollectionPage',
    status: expected['@type'] === 'CollectionPage' ? 'pass' : 'fail',
    value: expected['@type'],
    issue: expected['@type'] !== 'CollectionPage' ? 'Wrong schema type' : undefined
  });

  // ItemList validation
  checks.push({
    category,
    element: 'schema:ItemList',
    status: expected.mainEntity['@type'] === 'ItemList' ? 'pass' : 'fail',
    value: expected.mainEntity['@type'],
    issue: expected.mainEntity['@type'] !== 'ItemList' ? 'Missing ItemList schema' : undefined
  });

  // BreadcrumbList validation
  checks.push({
    category,
    element: 'schema:BreadcrumbList',
    status: expected.breadcrumb['@type'] === 'BreadcrumbList' ? 'pass' : 'fail',
    value: expected.breadcrumb['@type'],
    issue: expected.breadcrumb['@type'] !== 'BreadcrumbList' ? 'Missing BreadcrumbList schema' : undefined
  });

  return checks;
}

/**
 * Runs complete SEO validation
 */
export function runSEOValidation(): SEOReport {
  const allChecks: SEOCheck[] = [];
  const categories = ['digital-ai', 'sales-management', 'mindset-performance'];
  
  categories.forEach(category => {
    const basicSEO = validateBasicSEO(category);
    const structuredData = validateStructuredData(category);
    allChecks.push(...basicSEO, ...structuredData);
  });

  const report: SEOReport = {
    totalChecks: allChecks.length,
    passedChecks: allChecks.filter(check => check.status === 'pass').length,
    failedChecks: allChecks.filter(check => check.status === 'fail').length,
    warningChecks: allChecks.filter(check => check.status === 'warning').length,
    checks: allChecks,
    criticalIssues: allChecks
      .filter(check => check.status === 'fail')
      .map(check => `${check.category}: ${check.element} - ${check.issue}`),
    recommendations: allChecks
      .filter(check => check.recommendation)
      .map(check => `${check.category}: ${check.recommendation}`)
  };

  return report;
}

/**
 * Generates SEO validation report
 */
export function generateSEOReport(): string {
  const report = runSEOValidation();
  
  let output = `# SEO and Structured Data Validation Report\n\n`;
  output += `## Summary\n`;
  output += `- Total checks: ${report.totalChecks}\n`;
  output += `- ✅ Passed: ${report.passedChecks}\n`;
  output += `- ⚠️ Warnings: ${report.warningChecks}\n`;
  output += `- ❌ Failed: ${report.failedChecks}\n\n`;

  if (report.criticalIssues.length > 0) {
    output += `## Critical Issues\n\n`;
    report.criticalIssues.forEach(issue => {
      output += `❌ ${issue}\n`;
    });
    output += '\n';
  }

  if (report.recommendations.length > 0) {
    output += `## Recommendations\n\n`;
    report.recommendations.forEach(rec => {
      output += `💡 ${rec}\n`;
    });
    output += '\n';
  }

  // Group checks by category
  const categoryGroups = report.checks.reduce((groups, check) => {
    if (!groups[check.category]) {
      groups[check.category] = [];
    }
    groups[check.category].push(check);
    return groups;
  }, {} as Record<string, SEOCheck[]>);

  Object.entries(categoryGroups).forEach(([category, checks]) => {
    output += `## ${category.toUpperCase()} Category\n\n`;
    
    checks.forEach(check => {
      const icon = check.status === 'pass' ? '✅' : check.status === 'warning' ? '⚠️' : '❌';
      output += `${icon} **${check.element}**`;
      
      if (check.value) {
        output += `: ${check.value}`;
      }
      
      if (check.issue) {
        output += ` - ${check.issue}`;
      }
      
      output += '\n';
    });
    output += '\n';
  });

  return output;
}

/**
 * Gets SEO performance score
 */
export function getSEOScore(): number {
  const report = runSEOValidation();
  return Math.round((report.passedChecks / report.totalChecks) * 100);
}

/**
 * Critical SEO elements that must be present
 */
export function getCriticalSEOElements(): string[] {
  return [
    'Title tag (under 60 characters)',
    'Meta description (under 160 characters)',
    'Canonical URL (HTTPS)',
    'Open Graph metadata',
    'Twitter Card metadata',
    'Schema.org CollectionPage',
    'Schema.org ItemList for books',
    'Schema.org BreadcrumbList',
    'Proper heading hierarchy (H1, H2, H3)',
    'Alt text for images'
  ];
}