/**
 * Comprehensive Test Runner for Book Pages Optimization
 * Task 16: Finaliser l'intégration et la validation
 */

import { runCompleteValidation, generateValidationReport } from './book-pages-validation';
import { runNavigationTests, generateNavigationReport } from './cta-navigation-test';
import { runSEOValidation, generateSEOReport, getSEOScore } from './seo-validation-test';

interface ComprehensiveReport {
  timestamp: string;
  overallScore: number;
  validation: ReturnType<typeof runCompleteValidation>;
  navigation: ReturnType<typeof runNavigationTests>;
  seo: ReturnType<typeof runSEOValidation>;
  criticalIssues: string[];
  recommendations: string[];
  nextSteps: string[];
}

/**
 * Runs all validation tests
 */
export function runComprehensiveTests(): ComprehensiveReport {
  console.log('🔍 Running comprehensive validation tests...\n');
  
  const validation = runCompleteValidation();
  const navigation = runNavigationTests();
  const seo = runSEOValidation();
  
  // Calculate overall score
  const validationScore = (validation.summary.passed / validation.summary.totalChecks) * 100;
  const navigationScore = (navigation.passedLinks / navigation.totalLinks) * 100;
  const seoScore = getSEOScore();
  const overallScore = Math.round((validationScore + navigationScore + seoScore) / 3);
  
  // Identify critical issues
  const criticalIssues: string[] = [];
  
  // Add validation errors
  validation.visualConsistency
    .filter(result => result.status === 'error')
    .forEach(result => {
      criticalIssues.push(`Visual Consistency: ${result.category} - ${result.message}`);
    });
  
  // Add navigation failures
  navigation.linkTests
    .filter(test => test.status === 'fail')
    .forEach(test => {
      criticalIssues.push(`Navigation: ${test.page} - ${test.linkText} link broken`);
    });
  
  // Add SEO failures
  seo.criticalIssues.forEach(issue => {
    criticalIssues.push(`SEO: ${issue}`);
  });
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  // Visual consistency recommendations
  validation.visualConsistency
    .filter(result => result.status === 'warning')
    .forEach(result => {
      if (result.details) {
        result.details.forEach(detail => {
          recommendations.push(`${result.category}: Add ${detail}`);
        });
      }
    });
  
  // SEO recommendations
  seo.recommendations.forEach(rec => {
    recommendations.push(`SEO: ${rec}`);
  });
  
  // Define next steps based on results
  const nextSteps: string[] = [];
  
  if (criticalIssues.length > 0) {
    nextSteps.push('🚨 Fix critical issues immediately');
  }
  
  if (overallScore < 80) {
    nextSteps.push('📈 Improve overall score to 80%+');
  }
  
  if (validation.summary.warnings > 0) {
    nextSteps.push('⚠️ Address visual consistency warnings');
  }
  
  if (seo.warningChecks > 0) {
    nextSteps.push('🔍 Optimize SEO elements with warnings');
  }
  
  nextSteps.push('✅ Run final validation before deployment');
  
  return {
    timestamp: new Date().toISOString(),
    overallScore,
    validation,
    navigation,
    seo,
    criticalIssues,
    recommendations,
    nextSteps
  };
}

/**
 * Generates comprehensive report
 */
export function generateComprehensiveReport(): string {
  const report = runComprehensiveTests();
  
  let output = `# Book Pages Optimization - Comprehensive Validation Report\n\n`;
  output += `**Generated:** ${new Date(report.timestamp).toLocaleString()}\n\n`;
  
  // Executive Summary
  output += `## Executive Summary\n\n`;
  output += `**Overall Score: ${report.overallScore}%**\n\n`;
  
  const scoreColor = report.overallScore >= 90 ? '🟢' : report.overallScore >= 70 ? '🟡' : '🔴';
  output += `${scoreColor} **Status:** ${
    report.overallScore >= 90 ? 'Excellent' : 
    report.overallScore >= 70 ? 'Good' : 'Needs Improvement'
  }\n\n`;
  
  // Scores breakdown
  output += `### Scores Breakdown\n`;
  output += `- Visual Consistency: ${Math.round((report.validation.summary.passed / report.validation.summary.totalChecks) * 100)}%\n`;
  output += `- Navigation & CTAs: ${Math.round((report.navigation.passedLinks / report.navigation.totalLinks) * 100)}%\n`;
  output += `- SEO & Structured Data: ${report.seo.passedChecks}/${report.seo.totalChecks} (${Math.round((report.seo.passedChecks / report.seo.totalChecks) * 100)}%)\n\n`;
  
  // Critical Issues
  if (report.criticalIssues.length > 0) {
    output += `## 🚨 Critical Issues (${report.criticalIssues.length})\n\n`;
    report.criticalIssues.forEach((issue, index) => {
      output += `${index + 1}. ${issue}\n`;
    });
    output += '\n';
  }
  
  // Recommendations
  if (report.recommendations.length > 0) {
    output += `## 💡 Recommendations (${report.recommendations.length})\n\n`;
    report.recommendations.slice(0, 10).forEach((rec, index) => {
      output += `${index + 1}. ${rec}\n`;
    });
    if (report.recommendations.length > 10) {
      output += `... and ${report.recommendations.length - 10} more\n`;
    }
    output += '\n';
  }
  
  // Next Steps
  output += `## 🎯 Next Steps\n\n`;
  report.nextSteps.forEach((step, index) => {
    output += `${index + 1}. ${step}\n`;
  });
  output += '\n';
  
  // Detailed Reports
  output += `## 📊 Detailed Reports\n\n`;
  
  // Visual Consistency Details
  output += `### Visual Consistency\n`;
  report.validation.visualConsistency.forEach(result => {
    const icon = result.status === 'success' ? '✅' : result.status === 'warning' ? '⚠️' : '❌';
    output += `${icon} **${result.category}**: ${result.message}\n`;
  });
  output += '\n';
  
  // Navigation Summary
  output += `### Navigation & CTAs\n`;
  output += `- Total links tested: ${report.navigation.totalLinks}\n`;
  output += `- Passed: ${report.navigation.passedLinks}\n`;
  output += `- Failed: ${report.navigation.failedLinks}\n`;
  output += `- Warnings: ${report.navigation.warningLinks}\n\n`;
  
  // SEO Summary
  output += `### SEO & Structured Data\n`;
  output += `- Total checks: ${report.seo.totalChecks}\n`;
  output += `- Passed: ${report.seo.passedChecks}\n`;
  output += `- Failed: ${report.seo.failedChecks}\n`;
  output += `- Warnings: ${report.seo.warningChecks}\n\n`;
  
  // Implementation Status
  output += `## 📋 Implementation Status\n\n`;
  output += `### Completed ✅\n`;
  output += `- Digital AI Sales page (reference standard)\n`;
  output += `- Sales Management page (fully optimized)\n`;
  output += `- Mindset Performance page (complete structure)\n`;
  output += `- Core components (DomainInsight, CaseStudyGrid, etc.)\n`;
  output += `- SEO metadata and structured data\n`;
  output += `- Cross-category navigation system\n\n`;
  
  output += `### In Progress ⚠️\n`;
  output += `- Prospection SDR page optimization\n`;
  output += `- Négociation Closing page enhancement\n`;
  output += `- Psychologie Influence page completion\n\n`;
  
  output += `### Pending ❌\n`;
  output += `- Méthodes Processus page creation\n`;
  output += `- Enterprise Account page optimization\n`;
  output += `- Final performance testing\n\n`;
  
  return output;
}

/**
 * Gets deployment readiness status
 */
export function getDeploymentReadiness(): {
  ready: boolean;
  score: number;
  blockers: string[];
  warnings: string[];
} {
  const report = runComprehensiveTests();
  
  const blockers = report.criticalIssues;
  const warnings = report.recommendations.slice(0, 5);
  
  return {
    ready: blockers.length === 0 && report.overallScore >= 75,
    score: report.overallScore,
    blockers,
    warnings
  };
}

/**
 * Validates specific requirements from task 16
 */
export function validateTask16Requirements(): {
  visualConsistency: boolean;
  ctaNavigation: boolean;
  seoValidation: boolean;
  userExperience: boolean;
  overallComplete: boolean;
} {
  const report = runComprehensiveTests();
  
  return {
    visualConsistency: report.validation.summary.errors === 0,
    ctaNavigation: report.navigation.failedLinks === 0,
    seoValidation: report.seo.failedChecks === 0,
    userExperience: report.validation.userExperience.every(ux => ux.status !== 'error'),
    overallComplete: report.overallScore >= 80 && report.criticalIssues.length === 0
  };
}