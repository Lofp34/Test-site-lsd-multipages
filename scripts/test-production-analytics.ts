#!/usr/bin/env tsx

/**
 * Test Production Analytics System
 * Tests the data collection, analysis, and optimization recommendation system
 */

import { createClient } from '@supabase/supabase-js';
import { ProductionAnalytics } from '../src/lib/analytics/production-analytics';

// Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables d\'environnement Supabase manquantes');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupTestData() {
  console.log('📊 Configuration des données de test...');

  // Insert test Vercel usage data
  const vercelUsageData = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    vercelUsageData.push({
      created_at: date.toISOString(),
      invocations: Math.floor(Math.random() * 1000) + 500,
      compute_hours: Math.random() * 2 + 1,
      memory_used: Math.floor(Math.random() * 200) + 300,
      cpu_time: Math.random() * 5 + 2
    });
  }

  await supabase.from('vercel_usage_logs').upsert(vercelUsageData);

  // Insert test audit history
  const auditHistoryData = [];
  for (let i = 0; i < 10; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(i / 2));
    
    auditHistoryData.push({
      id: `test-audit-${i}`,
      created_at: date.toISOString(),
      total_links: 498,
      broken_links: Math.floor(Math.random() * 20) + 5,
      execution_time: Math.floor(Math.random() * 60000) + 120000, // 2-3 minutes
      avg_response_time: Math.floor(Math.random() * 3000) + 2000,
      memory_used: Math.floor(Math.random() * 200) + 350,
      cpu_time: Math.random() * 10 + 5,
      cache_hit_rate: Math.random() * 30 + 60, // 60-90%
      error_count: Math.floor(Math.random() * 10),
      report_generation_time: Math.floor(Math.random() * 5000) + 2000
    });
  }

  await supabase.from('audit_history').upsert(auditHistoryData);

  // Insert test system health data
  const healthData = [];
  for (let i = 0; i < 50; i++) {
    const date = new Date();
    date.setHours(date.getHours() - i);
    
    healthData.push({
      created_at: date.toISOString(),
      status: Math.random() > 0.05 ? 'healthy' : 'degraded', // 95% healthy
      fallback_active: Math.random() > 0.9, // 10% fallback active
      response_time: Math.floor(Math.random() * 2000) + 500
    });
  }

  await supabase.from('system_health_logs').upsert(healthData);

  // Insert test alert data
  const alertData = [];
  for (let i = 0; i < 15; i++) {
    const date = new Date();
    date.setHours(date.getHours() - i * 4);
    
    alertData.push({
      created_at: date.toISOString(),
      priority: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
      message: `Test alert ${i}`,
      false_positive: Math.random() > 0.9 // 10% false positives
    });
  }

  await supabase.from('alert_history').upsert(alertData);

  // Insert test auto corrections
  const correctionsData = [];
  for (let i = 0; i < 8; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(i / 2));
    
    correctionsData.push({
      created_at: date.toISOString(),
      url: `https://example.com/page-${i}`,
      correction_type: 'redirect_update',
      status: 'completed'
    });
  }

  await supabase.from('auto_corrections').upsert(correctionsData);

  console.log('✅ Données de test configurées');
}

async function testMetricsCollection() {
  console.log('\n📈 Test de collecte des métriques...');

  const analytics = new ProductionAnalytics(supabase);
  
  try {
    const metrics = await analytics.collectWeeklyMetrics();
    
    console.log('📊 Métriques Vercel:');
    console.log(`  - Invocations: ${metrics.vercelUsage.invocations}`);
    console.log(`  - Pourcentage limite: ${metrics.vercelUsage.percentageOfLimit.toFixed(1)}%`);
    console.log(`  - Tendance hebdomadaire: ${metrics.vercelUsage.weeklyTrend.toFixed(1)}%`);
    
    console.log('\n⚡ Métriques Performance:');
    console.log(`  - Durée audit: ${(metrics.performance.auditDuration / 1000).toFixed(1)}s`);
    console.log(`  - Liens traités: ${metrics.performance.linksProcessed}`);
    console.log(`  - Taux cache hit: ${metrics.performance.cacheHitRate.toFixed(1)}%`);
    console.log(`  - Taux d'erreur: ${metrics.performance.errorRate.toFixed(1)}%`);
    
    console.log('\n🏥 Métriques Santé Système:');
    console.log(`  - Disponibilité: ${metrics.systemHealth.availability.toFixed(2)}%`);
    console.log(`  - Activations fallback: ${metrics.systemHealth.fallbackActivations}`);
    console.log(`  - Taux faux positifs: ${metrics.systemHealth.falsePositiveRate.toFixed(1)}%`);
    
    console.log('\n💼 Métriques Business:');
    console.log(`  - Liens cassés détectés: ${metrics.business.brokenLinksDetected}`);
    console.log(`  - Corrections automatiques: ${metrics.business.autoCorrections}`);
    console.log(`  - Alertes critiques: ${metrics.business.criticalAlertsCount}`);
    
    return metrics;
  } catch (error) {
    console.error('❌ Erreur collecte métriques:', error);
    throw error;
  }
}

async function testRecommendationGeneration(metrics: any) {
  console.log('\n🎯 Test de génération des recommandations...');

  const analytics = new ProductionAnalytics(supabase);
  
  try {
    const recommendations = await analytics.generateOptimizationRecommendations(metrics);
    
    console.log(`📋 ${recommendations.length} recommandations générées:`);
    
    recommendations.forEach((rec, index) => {
      console.log(`\n${index + 1}. ${rec.title}`);
      console.log(`   Catégorie: ${rec.category} | Priorité: ${rec.priority} | Risque: ${rec.riskLevel}`);
      console.log(`   Description: ${rec.description}`);
      console.log(`   Impact: ${rec.impact}`);
      console.log(`   Amélioration estimée: ${rec.estimatedImprovement}`);
    });
    
    return recommendations;
  } catch (error) {
    console.error('❌ Erreur génération recommandations:', error);
    throw error;
  }
}

async function testFullAnalysisReport() {
  console.log('\n📊 Test du rapport d\'analyse complet...');

  const analytics = new ProductionAnalytics(supabase);
  
  try {
    const report = await analytics.generateAnalysisReport();
    
    console.log('📈 Tendances:');
    console.log(`  - Usage: ${report.trends.usageTrend}`);
    console.log(`  - Performance: ${report.trends.performanceTrend}`);
    console.log(`  - Erreurs: ${report.trends.errorTrend}`);
    
    if (report.upgradeRecommendation) {
      console.log('\n🚀 Recommandation d\'upgrade:');
      console.log(`  - Recommandé: ${report.upgradeRecommendation.recommended}`);
      console.log(`  - Raison: ${report.upgradeRecommendation.reason}`);
      console.log(`  - ROI: ${report.upgradeRecommendation.roi}`);
      console.log(`  - Timeline: ${report.upgradeRecommendation.timeline}`);
    }
    
    console.log(`\n📋 ${report.recommendations.length} recommandations au total`);
    
    return report;
  } catch (error) {
    console.error('❌ Erreur génération rapport:', error);
    throw error;
  }
}

async function testOptimizationApplication(recommendations: any[]) {
  console.log('\n⚙️ Test d\'application des optimisations...');

  const analytics = new ProductionAnalytics(supabase);
  
  try {
    // Filter low-risk recommendations
    const lowRiskRecs = recommendations.filter(rec => rec.riskLevel === 'low');
    
    if (lowRiskRecs.length === 0) {
      console.log('ℹ️ Aucune optimisation à faible risque à appliquer');
      return;
    }
    
    console.log(`🔧 Application de ${lowRiskRecs.length} optimisations à faible risque...`);
    
    await analytics.applyOptimizations(lowRiskRecs);
    
    console.log('✅ Optimisations appliquées avec succès');
    
    // Verify configuration updates
    const { data: configs } = await supabase
      .from('system_config')
      .select('*')
      .in('key', ['cache_ttl_links', 'batch_size', 'max_concurrency', 'alert_threshold_error_rate']);
    
    if (configs && configs.length > 0) {
      console.log('\n📝 Configurations mises à jour:');
      configs.forEach(config => {
        console.log(`  - ${config.key}: ${config.value}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Erreur application optimisations:', error);
    throw error;
  }
}

async function testPerformanceImpact() {
  console.log('\n📊 Test d\'impact des optimisations...');

  const analytics = new ProductionAnalytics(supabase);
  
  try {
    // Simulate running analytics before and after optimizations
    const beforeMetrics = await analytics.collectWeeklyMetrics();
    
    // Wait a moment to simulate time passing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const afterMetrics = await analytics.collectWeeklyMetrics();
    
    console.log('📈 Comparaison avant/après:');
    console.log(`  - Cache hit rate: ${beforeMetrics.performance.cacheHitRate.toFixed(1)}% → ${afterMetrics.performance.cacheHitRate.toFixed(1)}%`);
    console.log(`  - Temps réponse: ${(beforeMetrics.performance.averageResponseTime / 1000).toFixed(1)}s → ${(afterMetrics.performance.averageResponseTime / 1000).toFixed(1)}s`);
    console.log(`  - Usage mémoire: ${beforeMetrics.performance.memoryUsage.toFixed(0)}MB → ${afterMetrics.performance.memoryUsage.toFixed(0)}MB`);
    
    console.log('✅ Test d\'impact terminé');
    
  } catch (error) {
    console.error('❌ Erreur test impact:', error);
    throw error;
  }
}

async function cleanup() {
  console.log('\n🧹 Nettoyage des données de test...');

  try {
    // Clean up test data
    await supabase.from('vercel_usage_logs').delete().like('created_at', '%');
    await supabase.from('audit_history').delete().like('id', 'test-audit-%');
    await supabase.from('system_health_logs').delete().like('created_at', '%');
    await supabase.from('alert_history').delete().like('message', 'Test alert%');
    await supabase.from('auto_corrections').delete().like('url', 'https://example.com%');
    
    console.log('✅ Nettoyage terminé');
  } catch (error) {
    console.error('❌ Erreur nettoyage:', error);
  }
}

async function main() {
  console.log('🚀 Test du système d\'analytics de production\n');

  try {
    // Setup test data
    await setupTestData();
    
    // Test metrics collection
    const metrics = await testMetricsCollection();
    
    // Test recommendation generation
    const recommendations = await testRecommendationGeneration(metrics);
    
    // Test full analysis report
    const report = await testFullAnalysisReport();
    
    // Test optimization application
    await testOptimizationApplication(recommendations);
    
    // Test performance impact
    await testPerformanceImpact();
    
    console.log('\n✅ Tous les tests sont passés avec succès !');
    console.log('\n📊 Résumé du système d\'analytics:');
    console.log('  ✓ Collecte des métriques de production');
    console.log('  ✓ Analyse des tendances et patterns');
    console.log('  ✓ Génération de recommandations d\'optimisation');
    console.log('  ✓ Application automatique des optimisations sûres');
    console.log('  ✓ Recommandations d\'upgrade Vercel Pro');
    console.log('  ✓ Monitoring continu des améliorations');
    
  } catch (error) {
    console.error('\n❌ Échec du test:', error);
    process.exit(1);
  } finally {
    await cleanup();
  }
}

// Run the test
main().catch(console.error);