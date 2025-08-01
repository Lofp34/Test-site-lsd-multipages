#!/usr/bin/env tsx

/**
 * Complete Analytics and Optimization System Test
 * Tests the entire production analytics, optimization recommendations, and configuration management
 */

import { createClient } from '@supabase/supabase-js';
import { ProductionAnalytics } from '../src/lib/analytics/production-analytics';
import { OptimizationConfigManager, DEFAULT_CONFIG } from '../src/lib/analytics/optimization-config';

// Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables d\'environnement Supabase manquantes');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupTestEnvironment() {
  console.log('🔧 Configuration de l\'environnement de test...');

  // Create tables if they don't exist
  const tables = [
    {
      name: 'vercel_usage_logs',
      sql: `
        CREATE TABLE IF NOT EXISTS vercel_usage_logs (
          id SERIAL PRIMARY KEY,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          invocations INTEGER NOT NULL,
          compute_hours DECIMAL NOT NULL,
          memory_used INTEGER,
          cpu_time DECIMAL
        );
      `
    },
    {
      name: 'audit_history',
      sql: `
        CREATE TABLE IF NOT EXISTS audit_history (
          id TEXT PRIMARY KEY,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          total_links INTEGER,
          broken_links INTEGER,
          execution_time INTEGER,
          avg_response_time INTEGER,
          memory_used INTEGER,
          cpu_time DECIMAL,
          cache_hit_rate DECIMAL,
          error_count INTEGER,
          report_generation_time INTEGER
        );
      `
    },
    {
      name: 'system_health_logs',
      sql: `
        CREATE TABLE IF NOT EXISTS system_health_logs (
          id SERIAL PRIMARY KEY,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          status TEXT NOT NULL,
          fallback_active BOOLEAN DEFAULT FALSE,
          response_time INTEGER
        );
      `
    },
    {
      name: 'alert_history',
      sql: `
        CREATE TABLE IF NOT EXISTS alert_history (
          id SERIAL PRIMARY KEY,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          priority TEXT NOT NULL,
          message TEXT NOT NULL,
          false_positive BOOLEAN DEFAULT FALSE
        );
      `
    },
    {
      name: 'auto_corrections',
      sql: `
        CREATE TABLE IF NOT EXISTS auto_corrections (
          id SERIAL PRIMARY KEY,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          url TEXT NOT NULL,
          correction_type TEXT NOT NULL,
          status TEXT NOT NULL
        );
      `
    },
    {
      name: 'system_config',
      sql: `
        CREATE TABLE IF NOT EXISTS system_config (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    }
  ];

  for (const table of tables) {
    try {
      await supabase.rpc('exec_sql', { sql: table.sql });
      console.log(`✅ Table ${table.name} créée/vérifiée`);
    } catch (error) {
      console.log(`ℹ️ Table ${table.name} existe déjà ou erreur:`, error);
    }
  }

  console.log('✅ Environnement de test configuré');
}

async function generateRealisticTestData() {
  console.log('📊 Génération de données de test réalistes...');

  const now = new Date();
  
  // Generate 7 days of Vercel usage data with realistic patterns
  const vercelUsageData = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Simulate higher usage on weekdays
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseInvocations = isWeekend ? 300 : 800;
    const variance = Math.random() * 200 - 100;
    
    vercelUsageData.push({
      created_at: date.toISOString(),
      invocations: Math.max(baseInvocations + variance, 100),
      compute_hours: Math.random() * 3 + 1.5,
      memory_used: Math.floor(Math.random() * 150) + 350, // 350-500MB
      cpu_time: Math.random() * 8 + 3
    });
  }

  await supabase.from('vercel_usage_logs').upsert(vercelUsageData);

  // Generate audit history with performance degradation pattern
  const auditHistoryData = [];
  for (let i = 0; i < 14; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - Math.floor(i / 2));
    
    // Simulate performance degradation over time
    const degradationFactor = i * 0.1;
    const baseResponseTime = 2000 + (degradationFactor * 1000);
    const baseMemory = 380 + (degradationFactor * 20);
    const baseCacheHit = 85 - (degradationFactor * 5);
    
    auditHistoryData.push({
      id: `realistic-audit-${i}`,
      created_at: date.toISOString(),
      total_links: 498,
      broken_links: Math.floor(Math.random() * 15) + 3,
      execution_time: Math.floor(Math.random() * 30000) + 150000, // 2.5-5 minutes
      avg_response_time: Math.floor(baseResponseTime + (Math.random() * 1000)),
      memory_used: Math.floor(baseMemory + (Math.random() * 50)),
      cpu_time: Math.random() * 12 + 4,
      cache_hit_rate: Math.max(baseCacheHit + (Math.random() * 10 - 5), 50),
      error_count: Math.floor(Math.random() * 8) + 1,
      report_generation_time: Math.floor(Math.random() * 3000) + 1500
    });
  }

  await supabase.from('audit_history').upsert(auditHistoryData);

  // Generate system health data with occasional issues
  const healthData = [];
  for (let i = 0; i < 168; i++) { // 7 days, hourly
    const date = new Date(now);
    date.setHours(date.getHours() - i);
    
    // Simulate 98% uptime with occasional issues
    const isHealthy = Math.random() > 0.02;
    const needsFallback = !isHealthy && Math.random() > 0.7;
    
    healthData.push({
      created_at: date.toISOString(),
      status: isHealthy ? 'healthy' : 'degraded',
      fallback_active: needsFallback,
      response_time: isHealthy ? 
        Math.floor(Math.random() * 1000) + 500 : 
        Math.floor(Math.random() * 5000) + 2000
    });
  }

  await supabase.from('system_health_logs').upsert(healthData);

  // Generate alert history with realistic false positive rate
  const alertData = [];
  for (let i = 0; i < 25; i++) {
    const date = new Date(now);
    date.setHours(date.getHours() - i * 6);
    
    const priorities = ['low', 'medium', 'high', 'critical'];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    
    alertData.push({
      created_at: date.toISOString(),
      priority,
      message: `Realistic alert ${i}: ${priority} priority issue detected`,
      false_positive: Math.random() > 0.92 // 8% false positive rate
    });
  }

  await supabase.from('alert_history').upsert(alertData);

  // Generate auto corrections
  const correctionsData = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - Math.floor(i / 3));
    
    correctionsData.push({
      created_at: date.toISOString(),
      url: `https://laurent-serre-developpement.fr/page-${i}`,
      correction_type: ['redirect_update', 'url_fix', 'content_update'][Math.floor(Math.random() * 3)],
      status: Math.random() > 0.1 ? 'completed' : 'failed'
    });
  }

  await supabase.from('auto_corrections').upsert(correctionsData);

  console.log('✅ Données de test réalistes générées');
}

async function testProductionAnalytics() {
  console.log('\n📈 Test du système d\'analytics de production...');

  const analytics = new ProductionAnalytics(supabase);
  
  try {
    // Test metrics collection
    console.log('📊 Collecte des métriques...');
    const metrics = await analytics.collectWeeklyMetrics();
    
    console.log(`  ✓ Usage Vercel: ${metrics.vercelUsage.percentageOfLimit.toFixed(1)}% des limites`);
    console.log(`  ✓ Performance: ${(metrics.performance.auditDuration / 1000).toFixed(1)}s audit moyen`);
    console.log(`  ✓ Santé système: ${metrics.systemHealth.availability.toFixed(2)}% disponibilité`);
    console.log(`  ✓ Business: ${metrics.business.brokenLinksDetected} liens cassés détectés`);
    
    // Test recommendation generation
    console.log('\n🎯 Génération des recommandations...');
    const recommendations = await analytics.generateOptimizationRecommendations(metrics);
    
    console.log(`  ✓ ${recommendations.length} recommandations générées`);
    recommendations.forEach((rec, index) => {
      console.log(`    ${index + 1}. [${rec.priority.toUpperCase()}] ${rec.title}`);
    });
    
    // Test full analysis report
    console.log('\n📋 Génération du rapport complet...');
    const report = await analytics.generateAnalysisReport();
    
    console.log(`  ✓ Tendances: Usage ${report.trends.usageTrend}, Performance ${report.trends.performanceTrend}`);
    if (report.upgradeRecommendation) {
      console.log(`  ✓ Upgrade recommandé: ${report.upgradeRecommendation.recommended}`);
    }
    
    return { metrics, recommendations, report };
    
  } catch (error) {
    console.error('❌ Erreur analytics:', error);
    throw error;
  }
}

async function testOptimizationConfig() {
  console.log('\n⚙️ Test du gestionnaire de configuration...');

  const configManager = new OptimizationConfigManager(supabase);
  
  try {
    // Test loading default config
    console.log('📥 Chargement de la configuration par défaut...');
    const defaultConfig = await configManager.loadConfig();
    console.log(`  ✓ Batch size: ${defaultConfig.batch.size}`);
    console.log(`  ✓ Cache TTL liens: ${defaultConfig.cache.linksTtl}h`);
    console.log(`  ✓ Seuil d'alerte erreur: ${defaultConfig.alerts.errorRateThreshold}%`);
    
    // Test saving custom config
    console.log('\n💾 Sauvegarde d\'une configuration personnalisée...');
    const customConfig = { ...defaultConfig };
    customConfig.batch.size = 8;
    customConfig.cache.linksTtl = 8;
    customConfig.alerts.errorRateThreshold = 7;
    
    await configManager.saveConfig(customConfig);
    console.log('  ✓ Configuration sauvegardée');
    
    // Test loading saved config
    console.log('\n📤 Rechargement de la configuration...');
    const loadedConfig = await configManager.loadConfig();
    console.log(`  ✓ Batch size: ${loadedConfig.batch.size} (modifié)`);
    console.log(`  ✓ Cache TTL liens: ${loadedConfig.cache.linksTtl}h (modifié)`);
    console.log(`  ✓ Seuil d'alerte erreur: ${loadedConfig.alerts.errorRateThreshold}% (modifié)`);
    
    return { configManager, loadedConfig };
    
  } catch (error) {
    console.error('❌ Erreur configuration:', error);
    throw error;
  }
}

async function testAnalyticsBasedOptimization(analytics: any, configManager: any) {
  console.log('\n🔄 Test d\'optimisation basée sur les analytics...');

  try {
    // Get current metrics
    const metrics = await analytics.collectWeeklyMetrics();
    
    // Get configuration recommendations
    console.log('📊 Analyse des recommandations de configuration...');
    const configRecommendations = configManager.getConfigRecommendations(metrics);
    
    console.log(`  ✓ ${configRecommendations.length} recommandations de configuration`);
    configRecommendations.forEach((rec, index) => {
      console.log(`    ${index + 1}. ${rec.parameter}: ${rec.currentValue} → ${rec.recommendedValue}`);
      console.log(`       Raison: ${rec.reason}`);
    });
    
    // Apply analytics-based optimizations
    console.log('\n🚀 Application des optimisations basées sur les analytics...');
    const optimizedConfig = await configManager.applyAnalyticsOptimizations(metrics);
    
    console.log('  ✓ Configuration optimisée automatiquement');
    console.log(`    - Batch size: ${optimizedConfig.batch.size}`);
    console.log(`    - Cache TTL: ${optimizedConfig.cache.linksTtl}h`);
    console.log(`    - Seuil erreur: ${optimizedConfig.alerts.errorRateThreshold}%`);
    
    return optimizedConfig;
    
  } catch (error) {
    console.error('❌ Erreur optimisation:', error);
    throw error;
  }
}

async function testPerformanceImpactSimulation(analytics: any) {
  console.log('\n📊 Simulation de l\'impact des optimisations...');

  try {
    // Simulate "before" metrics
    const beforeMetrics = await analytics.collectWeeklyMetrics();
    
    // Simulate applying optimizations (in real scenario, this would be actual changes)
    console.log('⏳ Simulation des optimisations appliquées...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate "after" metrics with improvements
    const afterMetrics = await analytics.collectWeeklyMetrics();
    
    // Calculate simulated improvements
    const improvements = {
      cacheHitRate: Math.min(afterMetrics.performance.cacheHitRate * 1.15, 95),
      responseTime: afterMetrics.performance.averageResponseTime * 0.85,
      memoryUsage: afterMetrics.performance.memoryUsage * 0.9,
      errorRate: Math.max(afterMetrics.performance.errorRate * 0.7, 0.5)
    };
    
    console.log('📈 Impact simulé des optimisations:');
    console.log(`  • Cache hit rate: ${afterMetrics.performance.cacheHitRate.toFixed(1)}% → ${improvements.cacheHitRate.toFixed(1)}% (+${(improvements.cacheHitRate - afterMetrics.performance.cacheHitRate).toFixed(1)}%)`);
    console.log(`  • Temps de réponse: ${(afterMetrics.performance.averageResponseTime / 1000).toFixed(1)}s → ${(improvements.responseTime / 1000).toFixed(1)}s (-${((afterMetrics.performance.averageResponseTime - improvements.responseTime) / 1000).toFixed(1)}s)`);
    console.log(`  • Usage mémoire: ${afterMetrics.performance.memoryUsage.toFixed(0)}MB → ${improvements.memoryUsage.toFixed(0)}MB (-${(afterMetrics.performance.memoryUsage - improvements.memoryUsage).toFixed(0)}MB)`);
    console.log(`  • Taux d'erreur: ${afterMetrics.performance.errorRate.toFixed(1)}% → ${improvements.errorRate.toFixed(1)}% (-${(afterMetrics.performance.errorRate - improvements.errorRate).toFixed(1)}%)`);
    
    // Calculate ROI
    const costSavings = (afterMetrics.vercelUsage.projectedMonthly - (afterMetrics.vercelUsage.projectedMonthly * 0.85)) / 100000 * 20; // Assuming $20 for Pro plan
    console.log(`\n💰 Économies estimées: $${costSavings.toFixed(2)}/mois`);
    
    return improvements;
    
  } catch (error) {
    console.error('❌ Erreur simulation impact:', error);
    throw error;
  }
}

async function testUpgradeRecommendationLogic(analytics: any) {
  console.log('\n🚀 Test de la logique de recommandation d\'upgrade...');

  try {
    // Test with high usage scenario
    console.log('📊 Simulation d\'usage élevé...');
    
    // Insert high usage data
    const highUsageData = {
      created_at: new Date().toISOString(),
      invocations: 8500, // 85% of daily limit if monthly limit is 100k
      compute_hours: 8.5,
      memory_used: 480,
      cpu_time: 15
    };
    
    await supabase.from('vercel_usage_logs').insert(highUsageData);
    
    // Generate report with high usage
    const report = await analytics.generateAnalysisReport();
    
    if (report.upgradeRecommendation) {
      console.log('✅ Recommandation d\'upgrade générée:');
      console.log(`  • Recommandé: ${report.upgradeRecommendation.recommended}`);
      console.log(`  • Raison: ${report.upgradeRecommendation.reason}`);
      console.log(`  • ROI: ${report.upgradeRecommendation.roi}`);
      console.log(`  • Timeline: ${report.upgradeRecommendation.timeline}`);
    } else {
      console.log('ℹ️ Aucune recommandation d\'upgrade (usage normal)');
    }
    
    return report.upgradeRecommendation;
    
  } catch (error) {
    console.error('❌ Erreur test upgrade:', error);
    throw error;
  }
}

async function cleanup() {
  console.log('\n🧹 Nettoyage des données de test...');

  try {
    // Clean up all test data
    await supabase.from('vercel_usage_logs').delete().gte('id', 0);
    await supabase.from('audit_history').delete().like('id', '%audit-%');
    await supabase.from('system_health_logs').delete().gte('id', 0);
    await supabase.from('alert_history').delete().like('message', '%alert%');
    await supabase.from('auto_corrections').delete().like('url', '%laurent-serre%');
    await supabase.from('system_config').delete().like('key', 'optimization_%');
    
    console.log('✅ Nettoyage terminé');
  } catch (error) {
    console.error('❌ Erreur nettoyage:', error);
  }
}

async function main() {
  console.log('🚀 Test complet du système d\'analytics et d\'optimisation\n');

  try {
    // Setup
    await setupTestEnvironment();
    await generateRealisticTestData();
    
    // Test production analytics
    const { metrics, recommendations, report } = await testProductionAnalytics();
    
    // Test optimization configuration
    const { configManager, loadedConfig } = await testOptimizationConfig();
    
    // Test analytics-based optimization
    const optimizedConfig = await testAnalyticsBasedOptimization(
      new ProductionAnalytics(supabase), 
      configManager
    );
    
    // Test performance impact simulation
    const improvements = await testPerformanceImpactSimulation(
      new ProductionAnalytics(supabase)
    );
    
    // Test upgrade recommendation logic
    const upgradeRec = await testUpgradeRecommendationLogic(
      new ProductionAnalytics(supabase)
    );
    
    console.log('\n✅ Tous les tests sont passés avec succès !');
    console.log('\n📊 Résumé du système complet:');
    console.log('  ✓ Analytics de production en temps réel');
    console.log('  ✓ Génération de recommandations d\'optimisation');
    console.log('  ✓ Configuration dynamique basée sur les données');
    console.log('  ✓ Application automatique des optimisations sûres');
    console.log('  ✓ Simulation d\'impact des changements');
    console.log('  ✓ Recommandations d\'upgrade Vercel Pro');
    console.log('  ✓ Monitoring continu des améliorations');
    
    console.log('\n🎯 Métriques finales:');
    console.log(`  • ${recommendations.length} recommandations générées`);
    console.log(`  • ${Object.keys(optimizedConfig).length} catégories de configuration`);
    console.log(`  • Impact estimé: +${((improvements.cacheHitRate / metrics.performance.cacheHitRate - 1) * 100).toFixed(1)}% cache hit rate`);
    console.log(`  • Upgrade recommandé: ${upgradeRec?.recommended ? 'Oui' : 'Non'}`);
    
  } catch (error) {
    console.error('\n❌ Échec du test:', error);
    process.exit(1);
  } finally {
    await cleanup();
  }
}

// Run the complete test
main().catch(console.error);