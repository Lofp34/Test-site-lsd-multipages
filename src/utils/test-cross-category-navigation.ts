/**
 * Test script for cross-category navigation functionality
 * Tests the bidirectional suggestions and CTA optimization
 */

import { categoryBreadcrumbSuggestions, generateContextualCTAs } from './cross-category-suggestions';

// Test categories that should have suggestions
const testCategories = [
  'enterprise-account',
  'methodes-process', 
  'psychologie-influence',
  'negociation-closing'
];

console.log('🧪 Testing Cross-Category Navigation Implementation\n');

// Test 1: Verify all 4 categories have breadcrumb suggestions
console.log('📋 Test 1: CategoryBreadcrumb Suggestions');
testCategories.forEach(category => {
  const suggestions = categoryBreadcrumbSuggestions[category];
  if (suggestions && suggestions.length > 0) {
    console.log(`✅ ${category}: ${suggestions.length} suggestions`);
    suggestions.forEach(suggestion => {
      console.log(`   → ${suggestion.title} (${suggestion.icon})`);
    });
  } else {
    console.log(`❌ ${category}: No suggestions found`);
  }
  console.log('');
});

// Test 2: Verify bidirectional relationships
console.log('🔄 Test 2: Bidirectional Relationships');
const relationships = [
  ['enterprise-account', 'methodes-process'],
  ['enterprise-account', 'negociation-closing'],
  ['methodes-process', 'psychologie-influence'],
  ['negociation-closing', 'psychologie-influence']
];

relationships.forEach(([cat1, cat2]) => {
  const cat1Suggestions = categoryBreadcrumbSuggestions[cat1] || [];
  const cat2Suggestions = categoryBreadcrumbSuggestions[cat2] || [];
  
  const cat1HasCat2 = cat1Suggestions.some(s => s.href.includes(cat2));
  const cat2HasCat1 = cat2Suggestions.some(s => s.href.includes(cat1));
  
  if (cat1HasCat2 && cat2HasCat1) {
    console.log(`✅ ${cat1} ↔ ${cat2}: Bidirectional relationship confirmed`);
  } else if (cat1HasCat2 || cat2HasCat1) {
    console.log(`⚠️  ${cat1} ↔ ${cat2}: Unidirectional relationship (${cat1HasCat2 ? cat1 : cat2} → ${cat1HasCat2 ? cat2 : cat1})`);
  } else {
    console.log(`❌ ${cat1} ↔ ${cat2}: No relationship found`);
  }
});

// Test 3: Verify CTA optimization per domain
console.log('\n🎯 Test 3: CTA Optimization per Domain');
const mockBook = { title: 'Test Book', slug: 'test-book' };

testCategories.forEach(category => {
  const ctas = generateContextualCTAs(mockBook as any, category);
  console.log(`\n${category.toUpperCase()}:`);
  
  // Check for domain-specific bootcamp CTAs
  const bootcampCTA = ctas.find(cta => 
    cta.title.toLowerCase().includes('bootcamp') || 
    cta.title.toLowerCase().includes('formation')
  );
  
  if (bootcampCTA) {
    console.log(`✅ Bootcamp CTA: "${bootcampCTA.title}"`);
    
    // Verify domain-specific naming
    const expectedBootcampNames = {
      'enterprise-account': ['grands comptes', 'account management'],
      'methodes-process': ['méthodes de vente', 'méthodes'],
      'psychologie-influence': ['influence', 'psychologie'],
      'negociation-closing': ['négociation', 'closing']
    };
    
    const expectedNames = expectedBootcampNames[category as keyof typeof expectedBootcampNames] || [];
    const hasExpectedName = expectedNames.some(name => 
      bootcampCTA.title.toLowerCase().includes(name) ||
      bootcampCTA.description.toLowerCase().includes(name)
    );
    
    if (hasExpectedName) {
      console.log(`✅ Domain-specific naming confirmed`);
    } else {
      console.log(`⚠️  Generic naming detected`);
    }
  } else {
    console.log(`❌ No bootcamp/formation CTA found`);
  }
  
  console.log(`   Total CTAs: ${ctas.length}`);
});

console.log('\n🎉 Cross-Category Navigation Test Complete!');