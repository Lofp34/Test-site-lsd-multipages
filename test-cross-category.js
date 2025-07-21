// Simple test script for cross-category navigation
const fs = require('fs');
const path = require('path');

// Read the cross-category-suggestions.ts file
const filePath = path.join(__dirname, 'src/utils/cross-category-suggestions.ts');
const content = fs.readFileSync(filePath, 'utf8');

console.log('🧪 Testing cross-category suggestions...\n');

// Test 1: Check if all 4 categories have breadcrumb suggestions
const categories = ['enterprise-account', 'methodes-process', 'psychologie-influence', 'negociation-closing'];
let allCategoriesHaveSuggestions = true;

categories.forEach(category => {
  const regex = new RegExp(`'${category}':\\s*\\[`, 'g');
  const matches = content.match(regex);
  
  if (matches && matches.length > 0) {
    console.log(`✅ ${category}: Breadcrumb suggestions found`);
  } else {
    console.log(`❌ ${category}: No breadcrumb suggestions found`);
    allCategoriesHaveSuggestions = false;
  }
});

console.log('');

// Test 2: Check bidirectional relationships
const bidirectionalPairs = [
  ['enterprise-account', 'negociation-closing'],
  ['enterprise-account', 'methodes-process'],
  ['methodes-process', 'psychologie-influence'],
  ['negociation-closing', 'psychologie-influence']
];

let allBidirectionalFound = true;

bidirectionalPairs.forEach(([cat1, cat2]) => {
  // Check if cat1 suggests cat2
  const regex1 = new RegExp(`'${cat1}':\\s*{[\\s\\S]*?'${cat2}':\\s*\\[`, 'g');
  const match1 = content.match(regex1);
  
  // Check if cat2 suggests cat1
  const regex2 = new RegExp(`'${cat2}':\\s*{[\\s\\S]*?'${cat1}':\\s*\\[`, 'g');
  const match2 = content.match(regex2);
  
  if (match1 && match2) {
    console.log(`✅ Bidirectional relationship: ${cat1} ↔ ${cat2}`);
  } else {
    console.log(`❌ Missing bidirectional relationship: ${cat1} ↔ ${cat2}`);
    allBidirectionalFound = false;
  }
});

console.log('');

// Test 3: Check if contextual CTAs are defined
const ctaCategories = categories;
let allCTAsFound = true;

ctaCategories.forEach(category => {
  const regex = new RegExp(`case '${category}':`);
  const match = content.match(regex);
  
  if (match) {
    console.log(`✅ ${category}: Contextual CTAs defined`);
  } else {
    console.log(`❌ ${category}: No contextual CTAs found`);
    allCTAsFound = false;
  }
});

console.log('');

// Final result
const allTestsPassed = allCategoriesHaveSuggestions && allBidirectionalFound && allCTAsFound;

if (allTestsPassed) {
  console.log('🎉 All cross-category navigation tests passed!');
} else {
  console.log('❌ Some tests failed. Check the errors above.');
}

process.exit(allTestsPassed ? 0 : 1);