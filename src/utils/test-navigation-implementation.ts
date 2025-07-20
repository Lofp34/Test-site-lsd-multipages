// Test implementation of the cross-category navigation system
import { 
  categoryBreadcrumbSuggestions, 
  generateIntelligentRecommendations,
  generateContextualLinks,
  generateCrossCategorySuggestions
} from './cross-category-suggestions';

// Mock book data for testing
const mockBook = {
  slug: 'test-book',
  title: 'Test Book',
  author: 'Test Author',
  year: 2024,
  cover: '',
  tagline: 'Test tagline',
  summary: 'Test summary',
  category: 'prospection-sdr'
};

/**
 * Test the cross-category navigation system implementation
 */
export function testNavigationImplementation() {
  console.log('🧪 Testing Cross-Category Navigation Implementation\n');
  
  const results = {
    breadcrumbSuggestions: 0,
    intelligentRecommendations: 0,
    contextualLinks: 0,
    crossCategorySuggestions: 0,
    errors: [] as string[]
  };

  // Test 1: Breadcrumb suggestions for all categories
  console.log('1️⃣ Testing Breadcrumb Suggestions:');
  const categories = [
    'digital-ai', 'sales-management', 'mindset-performance',
    'prospection-sdr', 'negotiation-closing', 'psychology-influence', 'methods-processes'
  ];

  categories.forEach(category => {
    try {
      const suggestions = categoryBreadcrumbSuggestions[category];
      if (suggestions && suggestions.length > 0) {
        console.log(`   ✅ ${category}: ${suggestions.length} suggestions`);
        results.breadcrumbSuggestions++;
        
        // Validate suggestion structure
        suggestions.forEach(suggestion => {
          if (!suggestion.title || !suggestion.href || !suggestion.icon || !suggestion.description) {
            results.errors.push(`Incomplete breadcrumb suggestion in ${category}`);
          }
        });
      } else {
        console.log(`   ❌ ${category}: No suggestions found`);
        results.errors.push(`No breadcrumb suggestions for ${category}`);
      }
    } catch (error) {
      results.errors.push(`Error testing breadcrumb for ${category}: ${error}`);
    }
  });

  // Test 2: Intelligent recommendations
  console.log('\n2️⃣ Testing Intelligent Recommendations:');
  categories.forEach(category => {
    try {
      const recommendations = generateIntelligentRecommendations(category);
      if (recommendations.length > 0) {
        console.log(`   ✅ ${category}: ${recommendations.length} intelligent recommendations`);
        results.intelligentRecommendations++;
        
        // Validate recommendation structure
        recommendations.forEach(rec => {
          if (!rec.targetCategory || !rec.targetCategoryTitle || !rec.businessValue || !rec.complementarityReason) {
            results.errors.push(`Incomplete intelligent recommendation in ${category}`);
          }
        });
      } else {
        console.log(`   ⚠️  ${category}: No intelligent recommendations`);
      }
    } catch (error) {
      results.errors.push(`Error testing intelligent recommendations for ${category}: ${error}`);
    }
  });

  // Test 3: Contextual links
  console.log('\n3️⃣ Testing Contextual Links:');
  categories.forEach(category => {
    try {
      const links = generateContextualLinks(category);
      if (links.length > 0) {
        console.log(`   ✅ ${category}: ${links.length} contextual links`);
        results.contextualLinks++;
        
        // Validate link structure
        links.forEach(link => {
          if (!link.title || !link.href || !link.description || !link.icon) {
            results.errors.push(`Incomplete contextual link in ${category}`);
          }
        });
      } else {
        console.log(`   ❌ ${category}: No contextual links`);
        results.errors.push(`No contextual links for ${category}`);
      }
    } catch (error) {
      results.errors.push(`Error testing contextual links for ${category}: ${error}`);
    }
  });

  // Test 4: Cross-category book suggestions
  console.log('\n4️⃣ Testing Cross-Category Book Suggestions:');
  categories.forEach(category => {
    try {
      const suggestions = generateCrossCategorySuggestions(mockBook, category, 2);
      if (suggestions.length > 0) {
        console.log(`   ✅ ${category}: ${suggestions.length} book suggestions`);
        results.crossCategorySuggestions++;
        
        // Validate suggestion structure
        suggestions.forEach(suggestion => {
          if (!suggestion.book || !suggestion.category || !suggestion.categoryTitle || !suggestion.reason) {
            results.errors.push(`Incomplete cross-category suggestion in ${category}`);
          }
        });
      } else {
        console.log(`   ⚠️  ${category}: No book suggestions`);
      }
    } catch (error) {
      results.errors.push(`Error testing cross-category suggestions for ${category}: ${error}`);
    }
  });

  // Summary
  console.log('\n📊 Test Results Summary:');
  console.log(`   Categories with breadcrumb suggestions: ${results.breadcrumbSuggestions}/${categories.length}`);
  console.log(`   Categories with intelligent recommendations: ${results.intelligentRecommendations}/${categories.length}`);
  console.log(`   Categories with contextual links: ${results.contextualLinks}/${categories.length}`);
  console.log(`   Categories with book suggestions: ${results.crossCategorySuggestions}/${categories.length}`);
  
  if (results.errors.length > 0) {
    console.log('\n⚠️  Issues Found:');
    results.errors.forEach(error => console.log(`   - ${error}`));
  } else {
    console.log('\n✅ All tests passed successfully!');
  }

  // Calculate overall score
  const totalTests = categories.length * 4; // 4 tests per category
  const passedTests = results.breadcrumbSuggestions + results.intelligentRecommendations + 
                     results.contextualLinks + results.crossCategorySuggestions;
  const score = Math.round((passedTests / totalTests) * 100);
  
  console.log(`\n🎯 Overall Implementation Score: ${score}%`);
  
  return {
    score,
    results,
    errors: results.errors
  };
}

/**
 * Test the navigation coherence across all categories
 */
export function testNavigationCoherence() {
  console.log('🔄 Testing Navigation Coherence:\n');
  
  const categories = [
    'digital-ai', 'sales-management', 'mindset-performance',
    'prospection-sdr', 'negotiation-closing', 'psychology-influence', 'methods-processes'
  ];
  
  const coherenceIssues: string[] = [];
  
  // Test bidirectional links
  categories.forEach(fromCategory => {
    const suggestions = categoryBreadcrumbSuggestions[fromCategory];
    if (!suggestions) return;
    
    suggestions.forEach(suggestion => {
      // Extract target category from href
      const hrefParts = suggestion.href.split('/');
      const targetCategory = hrefParts[hrefParts.length - 1];
      
      // Check if target category has a back-link
      const targetSuggestions = categoryBreadcrumbSuggestions[targetCategory];
      if (targetSuggestions) {
        const hasBackLink = targetSuggestions.some(s => s.href.includes(fromCategory));
        if (!hasBackLink) {
          coherenceIssues.push(`Missing back-link: ${targetCategory} → ${fromCategory}`);
        }
      }
    });
  });
  
  if (coherenceIssues.length === 0) {
    console.log('✅ Navigation coherence test passed - all links are bidirectional');
  } else {
    console.log('⚠️  Navigation coherence issues found:');
    coherenceIssues.forEach(issue => console.log(`   - ${issue}`));
  }
  
  return coherenceIssues;
}

/**
 * Generate a comprehensive navigation report
 */
export function generateNavigationReport() {
  console.log('📋 Comprehensive Navigation Report\n');
  
  const implementationResults = testNavigationImplementation();
  console.log('\n' + '='.repeat(50) + '\n');
  const coherenceIssues = testNavigationCoherence();
  
  const report = {
    implementationScore: implementationResults.score,
    totalErrors: implementationResults.errors.length,
    coherenceIssues: coherenceIssues.length,
    status: implementationResults.score >= 80 && coherenceIssues.length === 0 ? 'PASS' : 'NEEDS_IMPROVEMENT'
  };
  
  console.log('\n🎯 Final Navigation System Status:');
  console.log(`   Implementation Score: ${report.implementationScore}%`);
  console.log(`   Total Errors: ${report.totalErrors}`);
  console.log(`   Coherence Issues: ${report.coherenceIssues}`);
  console.log(`   Overall Status: ${report.status}`);
  
  return report;
}