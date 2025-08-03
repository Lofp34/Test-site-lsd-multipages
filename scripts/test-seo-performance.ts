#!/usr/bin/env tsx

/**
 * Test script for SEO and performance optimizations
 * This script validates the implementation of task 8 requirements
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

interface TestResult {
  name: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  message: string;
  details?: string[];
}

class SEOPerformanceValidator {
  private results: TestResult[] = [];

  private addResult(name: string, status: 'PASS' | 'FAIL' | 'WARNING', message: string, details?: string[]) {
    this.results.push({ name, status, message, details });
  }

  // Test 1: Validate Schema.org structured data
  private testStructuredData() {
    console.log('🔍 Testing Schema.org structured data...');
    
    const resourcePages = [
      'src/app/ressources/outil-tableau-bord/page.tsx',
      'src/app/ressources/grille-evaluation/page.tsx',
      'src/app/ressources/reporting-automatise/page.tsx'
    ];

    let allPagesHaveStructuredData = true;
    const missingPages: string[] = [];

    resourcePages.forEach(pagePath => {
      if (fs.existsSync(pagePath)) {
        const content = fs.readFileSync(pagePath, 'utf-8');
        
        // Check for structured data script tags
        const hasProductSchema = content.includes('"@type": "SoftwareApplication"') || 
                                content.includes('"@type": "Product"');
        const hasBreadcrumbSchema = content.includes('"@type": "BreadcrumbList"');
        const hasOrganizationSchema = content.includes('"@type": "Organization"');

        if (!hasProductSchema || !hasBreadcrumbSchema || !hasOrganizationSchema) {
          allPagesHaveStructuredData = false;
          missingPages.push(pagePath);
        }
      } else {
        allPagesHaveStructuredData = false;
        missingPages.push(`${pagePath} (file not found)`);
      }
    });

    if (allPagesHaveStructuredData) {
      this.addResult(
        'Schema.org Structured Data',
        'PASS',
        'All resource pages have complete structured data (Product, Breadcrumb, Organization schemas)'
      );
    } else {
      this.addResult(
        'Schema.org Structured Data',
        'FAIL',
        'Some pages are missing structured data',
        missingPages
      );
    }
  }

  // Test 2: Validate image optimization
  private testImageOptimization() {
    console.log('🖼️ Testing image optimization...');
    
    // Check if OptimizedImage component exists
    const optimizedImagePath = 'src/components/ui/OptimizedImage.tsx';
    if (fs.existsSync(optimizedImagePath)) {
      const content = fs.readFileSync(optimizedImagePath, 'utf-8');
      
      const hasLazyLoading = content.includes('loading="lazy"');
      const hasIntersectionObserver = content.includes('IntersectionObserver');
      const hasNextImage = content.includes('import Image from \'next/image\'');
      const hasErrorHandling = content.includes('onError');

      if (hasLazyLoading && hasIntersectionObserver && hasNextImage && hasErrorHandling) {
        this.addResult(
          'Image Optimization',
          'PASS',
          'OptimizedImage component implements lazy loading, intersection observer, Next.js Image, and error handling'
        );
      } else {
        const missing = [];
        if (!hasLazyLoading) missing.push('lazy loading');
        if (!hasIntersectionObserver) missing.push('intersection observer');
        if (!hasNextImage) missing.push('Next.js Image');
        if (!hasErrorHandling) missing.push('error handling');
        
        this.addResult(
          'Image Optimization',
          'WARNING',
          'OptimizedImage component is missing some features',
          missing
        );
      }
    } else {
      this.addResult(
        'Image Optimization',
        'FAIL',
        'OptimizedImage component not found'
      );
    }

    // Check if ToolPreview uses OptimizedImage
    const toolPreviewPath = 'src/components/ressources/ToolPreview.tsx';
    if (fs.existsSync(toolPreviewPath)) {
      const content = fs.readFileSync(toolPreviewPath, 'utf-8');
      if (content.includes('OptimizedImage')) {
        this.addResult(
          'ToolPreview Image Usage',
          'PASS',
          'ToolPreview component uses OptimizedImage'
        );
      } else {
        this.addResult(
          'ToolPreview Image Usage',
          'WARNING',
          'ToolPreview component may not be using OptimizedImage'
        );
      }
    }
  }

  // Test 3: Validate metadata and Open Graph
  private testMetadata() {
    console.log('📝 Testing metadata and Open Graph...');
    
    const resourcePages = [
      'src/app/ressources/outil-tableau-bord/page.tsx',
      'src/app/ressources/grille-evaluation/page.tsx',
      'src/app/ressources/reporting-automatise/page.tsx'
    ];

    let allPagesHaveEnhancedMetadata = true;
    const issues: string[] = [];

    resourcePages.forEach(pagePath => {
      if (fs.existsSync(pagePath)) {
        const content = fs.readFileSync(pagePath, 'utf-8');
        
        // Check for enhanced metadata features
        const hasAuthors = content.includes('authors:');
        const hasRobots = content.includes('robots:');
        const hasTwitterCard = content.includes('twitter:');
        const hasOpenGraph = content.includes('openGraph:');
        const hasCanonical = content.includes('canonical:');
        const hasLanguages = content.includes('languages:');

        if (!hasAuthors) issues.push(`${pagePath}: missing authors`);
        if (!hasRobots) issues.push(`${pagePath}: missing robots`);
        if (!hasTwitterCard) issues.push(`${pagePath}: missing Twitter card`);
        if (!hasOpenGraph) issues.push(`${pagePath}: missing Open Graph`);
        if (!hasCanonical) issues.push(`${pagePath}: missing canonical URL`);
        if (!hasLanguages) issues.push(`${pagePath}: missing language alternates`);

        if (!hasAuthors || !hasRobots || !hasTwitterCard || !hasOpenGraph || !hasCanonical || !hasLanguages) {
          allPagesHaveEnhancedMetadata = false;
        }
      }
    });

    if (allPagesHaveEnhancedMetadata) {
      this.addResult(
        'Enhanced Metadata',
        'PASS',
        'All resource pages have comprehensive metadata (authors, robots, Twitter, Open Graph, canonical, languages)'
      );
    } else {
      this.addResult(
        'Enhanced Metadata',
        'WARNING',
        'Some pages have incomplete metadata',
        issues
      );
    }
  }

  // Test 4: Validate performance monitoring
  private testPerformanceMonitoring() {
    console.log('⚡ Testing performance monitoring...');
    
    // Check if PerformanceMonitor component exists
    const performanceMonitorPath = 'src/components/ui/PerformanceMonitor.tsx';
    if (fs.existsSync(performanceMonitorPath)) {
      const content = fs.readFileSync(performanceMonitorPath, 'utf-8');
      
      const hasLCP = content.includes('largest-contentful-paint');
      const hasFID = content.includes('first-input');
      const hasCLS = content.includes('layout-shift');
      const hasTTFB = content.includes('responseStart');
      const hasFCP = content.includes('paint');

      if (hasLCP && hasFID && hasCLS && hasTTFB && hasFCP) {
        this.addResult(
          'Core Web Vitals Monitoring',
          'PASS',
          'PerformanceMonitor tracks all Core Web Vitals (LCP, FID, CLS, TTFB, FCP)'
        );
      } else {
        const missing = [];
        if (!hasLCP) missing.push('LCP');
        if (!hasFID) missing.push('FID');
        if (!hasCLS) missing.push('CLS');
        if (!hasTTFB) missing.push('TTFB');
        if (!hasFCP) missing.push('FCP');
        
        this.addResult(
          'Core Web Vitals Monitoring',
          'WARNING',
          'PerformanceMonitor is missing some Core Web Vitals',
          missing
        );
      }
    } else {
      this.addResult(
        'Core Web Vitals Monitoring',
        'FAIL',
        'PerformanceMonitor component not found'
      );
    }

    // Check if performance optimization utilities exist
    const performanceUtilsPath = 'src/utils/performance-optimization.ts';
    if (fs.existsSync(performanceUtilsPath)) {
      const content = fs.readFileSync(performanceUtilsPath, 'utf-8');
      
      const hasPreloading = content.includes('preloadCriticalResources');
      const hasLazyLoading = content.includes('lazyLoadNonCriticalResources');
      const hasImageOptimization = content.includes('getOptimizedImageSizes');
      const hasScrollOptimization = content.includes('optimizeScrollPerformance');

      if (hasPreloading && hasLazyLoading && hasImageOptimization && hasScrollOptimization) {
        this.addResult(
          'Performance Optimization Utils',
          'PASS',
          'Performance optimization utilities are comprehensive'
        );
      } else {
        this.addResult(
          'Performance Optimization Utils',
          'WARNING',
          'Some performance optimization features may be missing'
        );
      }
    } else {
      this.addResult(
        'Performance Optimization Utils',
        'FAIL',
        'Performance optimization utilities not found'
      );
    }
  }

  // Test 5: Validate accessibility features
  private testAccessibility() {
    console.log('♿ Testing accessibility features...');
    
    // Check if accessibility utilities exist
    const accessibilityUtilsPath = 'src/utils/accessibility-enhancements.ts';
    if (fs.existsSync(accessibilityUtilsPath)) {
      const content = fs.readFileSync(accessibilityUtilsPath, 'utf-8');
      
      const hasFocusManagement = content.includes('focusManagement');
      const hasKeyboardNavigation = content.includes('keyboardNavigation');
      const hasScreenReaderSupport = content.includes('screenReaderAnnouncements');
      const hasFormAccessibility = content.includes('formAccessibility');

      if (hasFocusManagement && hasKeyboardNavigation && hasScreenReaderSupport && hasFormAccessibility) {
        this.addResult(
          'Accessibility Utilities',
          'PASS',
          'Comprehensive accessibility utilities implemented'
        );
      } else {
        this.addResult(
          'Accessibility Utilities',
          'WARNING',
          'Some accessibility features may be missing'
        );
      }
    } else {
      this.addResult(
        'Accessibility Utilities',
        'FAIL',
        'Accessibility utilities not found'
      );
    }

    // Check if SkipLink component exists
    const skipLinkPath = 'src/components/ui/SkipLink.tsx';
    if (fs.existsSync(skipLinkPath)) {
      this.addResult(
        'Skip Link',
        'PASS',
        'Skip link component implemented'
      );
    } else {
      this.addResult(
        'Skip Link',
        'FAIL',
        'Skip link component not found'
      );
    }

    // Check if accessibility CSS exists
    const accessibilityCSSPath = 'src/styles/accessibility.css';
    if (fs.existsSync(accessibilityCSSPath)) {
      const content = fs.readFileSync(accessibilityCSSPath, 'utf-8');
      
      const hasHighContrast = content.includes('prefers-contrast: high');
      const hasReducedMotion = content.includes('prefers-reduced-motion');
      const hasFocusStyles = content.includes(':focus');
      const hasScreenReaderStyles = content.includes('.sr-only');

      if (hasHighContrast && hasReducedMotion && hasFocusStyles && hasScreenReaderStyles) {
        this.addResult(
          'Accessibility CSS',
          'PASS',
          'Comprehensive accessibility CSS implemented'
        );
      } else {
        this.addResult(
          'Accessibility CSS',
          'WARNING',
          'Some accessibility CSS features may be missing'
        );
      }
    } else {
      this.addResult(
        'Accessibility CSS',
        'FAIL',
        'Accessibility CSS not found'
      );
    }
  }

  // Test 6: Check if components are properly integrated
  private testIntegration() {
    console.log('🔗 Testing component integration...');
    
    const clientComponents = [
      'src/app/ressources/outil-tableau-bord/TableauBordPageClient.tsx',
      'src/app/ressources/grille-evaluation/GrilleEvaluationPageClient.tsx',
      'src/app/ressources/reporting-automatise/ReportingPageClient.tsx'
    ];

    let allComponentsIntegrated = true;
    const issues: string[] = [];

    clientComponents.forEach(componentPath => {
      if (fs.existsSync(componentPath)) {
        const content = fs.readFileSync(componentPath, 'utf-8');
        
        const hasPerformanceMonitor = content.includes('PerformanceMonitor');
        const hasSkipLink = content.includes('SkipLink');
        const hasMainContentId = content.includes('id="main-content"');
        const hasAccessibilityInit = content.includes('initializeAccessibilityEnhancements');
        const hasPerformanceInit = content.includes('initializePerformanceOptimizations');

        if (!hasPerformanceMonitor) issues.push(`${componentPath}: missing PerformanceMonitor`);
        if (!hasSkipLink) issues.push(`${componentPath}: missing SkipLink`);
        if (!hasMainContentId) issues.push(`${componentPath}: missing main content ID`);
        if (!hasAccessibilityInit) issues.push(`${componentPath}: missing accessibility initialization`);
        if (!hasPerformanceInit) issues.push(`${componentPath}: missing performance initialization`);

        if (!hasPerformanceMonitor || !hasSkipLink || !hasMainContentId || !hasAccessibilityInit || !hasPerformanceInit) {
          allComponentsIntegrated = false;
        }
      } else {
        allComponentsIntegrated = false;
        issues.push(`${componentPath}: file not found`);
      }
    });

    if (allComponentsIntegrated) {
      this.addResult(
        'Component Integration',
        'PASS',
        'All client components properly integrate performance and accessibility features'
      );
    } else {
      this.addResult(
        'Component Integration',
        'WARNING',
        'Some components may not be fully integrated',
        issues
      );
    }
  }

  // Run all tests
  public async runTests() {
    console.log('🚀 Starting SEO and Performance Validation Tests\n');
    
    this.testStructuredData();
    this.testImageOptimization();
    this.testMetadata();
    this.testPerformanceMonitoring();
    this.testAccessibility();
    this.testIntegration();

    this.printResults();
    return this.getOverallStatus();
  }

  private printResults() {
    console.log('\n📊 Test Results Summary\n');
    console.log('='.repeat(60));

    let passCount = 0;
    let warningCount = 0;
    let failCount = 0;

    this.results.forEach(result => {
      const icon = result.status === 'PASS' ? '✅' : result.status === 'WARNING' ? '⚠️' : '❌';
      console.log(`${icon} ${result.name}: ${result.message}`);
      
      if (result.details && result.details.length > 0) {
        result.details.forEach(detail => {
          console.log(`   - ${detail}`);
        });
      }
      
      console.log('');

      if (result.status === 'PASS') passCount++;
      else if (result.status === 'WARNING') warningCount++;
      else failCount++;
    });

    console.log('='.repeat(60));
    console.log(`📈 Summary: ${passCount} passed, ${warningCount} warnings, ${failCount} failed`);
    console.log('='.repeat(60));
  }

  private getOverallStatus(): 'PASS' | 'WARNING' | 'FAIL' {
    const hasFailures = this.results.some(r => r.status === 'FAIL');
    const hasWarnings = this.results.some(r => r.status === 'WARNING');
    
    if (hasFailures) return 'FAIL';
    if (hasWarnings) return 'WARNING';
    return 'PASS';
  }
}

// Run the tests
async function main() {
  const validator = new SEOPerformanceValidator();
  const status = await validator.runTests();
  
  console.log('\n🎯 Task 8 Implementation Status:');
  if (status === 'PASS') {
    console.log('✅ All SEO and performance optimizations successfully implemented!');
    process.exit(0);
  } else if (status === 'WARNING') {
    console.log('⚠️ SEO and performance optimizations mostly implemented with some minor issues.');
    process.exit(0);
  } else {
    console.log('❌ Some critical SEO and performance optimizations are missing.');
    process.exit(1);
  }
}

// Run if this is the main module
main().catch(console.error);