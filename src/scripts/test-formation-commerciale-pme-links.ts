#!/usr/bin/env tsx

/**
 * Script de test pour valider tous les liens de la page formation-commerciale-pme
 * Vérifie que tous les liens corrigés fonctionnent correctement
 */

import { JSDOM } from 'jsdom';

const BASE_URL = 'http://localhost:3000';

// Liste des liens à tester depuis la page formation-commerciale-pme
const LINKS_TO_TEST = [
  // Liens dans la section Formation Prospection Avancée
  '/ressources/scripts-prospection',
  '/ressources/linkedin-prospection', 
  '/ressources/systeme-suivi-prospects',
  
  // Liens dans la section Management Commercial
  '/ressources/techniques-motivation-equipe',
  '/ressources/guide-recrutement-commercial',
  
  // Autres liens importants de la page
  '/ressources/guide-prospection',
  '/ressources/guide-closing',
  '/ressources/outil-preparation-rdv',
  '/bootcamp',
  '/diagnostic',
  '/expert-developpement-commercial-pme',
  '/formateur-vente-pme',
  '/management-equipe-commerciale',
  '/suivi-performance'
];

interface TestResult {
  url: string;
  status: number;
  success: boolean;
  error?: string;
}

async function testLink(url: string): Promise<TestResult> {
  try {
    const fullUrl = `${BASE_URL}${url}`;
    console.log(`Testing: ${fullUrl}`);
    
    const response = await fetch(fullUrl);
    const success = response.status === 200;
    
    return {
      url,
      status: response.status,
      success,
      error: success ? undefined : `HTTP ${response.status}`
    };
  } catch (error) {
    return {
      url,
      status: 0,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function testFormationCommercialePMEPage(): Promise<void> {
  console.log('🔍 Testing formation-commerciale-pme page navigation...\n');
  
  // Test de la page principale
  console.log('Testing main page...');
  const mainPageResult = await testLink('/formation-commerciale-pme');
  
  if (!mainPageResult.success) {
    console.error(`❌ Main page failed: ${mainPageResult.error}`);
    return;
  }
  
  console.log('✅ Main page accessible\n');
  
  // Test de tous les liens
  console.log('Testing all links from the page...');
  const results: TestResult[] = [];
  
  for (const link of LINKS_TO_TEST) {
    const result = await testLink(link);
    results.push(result);
    
    if (result.success) {
      console.log(`✅ ${link}`);
    } else {
      console.log(`❌ ${link} - ${result.error}`);
    }
    
    // Petit délai pour éviter de surcharger le serveur
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Résumé
  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;
  
  console.log(`\n📊 Results Summary:`);
  console.log(`✅ Successful: ${successCount}/${totalCount}`);
  console.log(`❌ Failed: ${totalCount - successCount}/${totalCount}`);
  
  if (successCount === totalCount) {
    console.log('\n🎉 All links are working correctly!');
  } else {
    console.log('\n⚠️  Some links need attention:');
    results.filter(r => !r.success).forEach(result => {
      console.log(`   - ${result.url}: ${result.error}`);
    });
  }
}

// Fonction pour tester la présence des liens dans le HTML
async function testLinksInHTML(): Promise<void> {
  console.log('\n🔍 Checking if links are present in HTML...\n');
  
  try {
    const response = await fetch(`${BASE_URL}/formation-commerciale-pme`);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Vérifier la présence des liens spécifiques
    const linksToCheck = [
      { href: '/ressources/scripts-prospection', text: 'Scripts IMPACT et AIDA+' },
      { href: '/ressources/linkedin-prospection', text: 'LinkedIn et réseaux sociaux' },
      { href: '/ressources/systeme-suivi-prospects', text: 'Système de suivi efficace' },
      { href: '/ressources/techniques-motivation-equipe', text: 'Motivation et coaching' },
      { href: '/ressources/guide-recrutement-commercial', text: 'Recrutement commercial' }
    ];
    
    for (const linkCheck of linksToCheck) {
      const linkElement = document.querySelector(`a[href="${linkCheck.href}"]`);
      if (linkElement) {
        console.log(`✅ Found link: ${linkCheck.href} - "${linkCheck.text}"`);
      } else {
        console.log(`❌ Missing link: ${linkCheck.href} - "${linkCheck.text}"`);
      }
    }
    
  } catch (error) {
    console.error('Error checking HTML:', error);
  }
}

async function main() {
  console.log('🚀 Starting formation-commerciale-pme links validation...\n');
  
  // Attendre que le serveur soit prêt
  console.log('Waiting for server to be ready...');
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  await testLinksInHTML();
  await testFormationCommercialePMEPage();
  
  console.log('\n✨ Test completed!');
}

// Run the main function
main().catch(console.error);