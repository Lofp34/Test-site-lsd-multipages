# Guide de dépannage - Système d'audit des liens morts

## 🚨 Problèmes courants et solutions

### ❌ Erreur : "SendGrid API Key Invalid"

**Symptômes :**
```
Error: HTTP Error 401: Unauthorized
The provided authorization grant is invalid, expired, or revoked
```

**Causes possibles :**
1. Clé API incorrecte ou expirée
2. Permissions insuffisantes
3. Variable d'environnement mal configurée

**Solutions :**

1. **Vérifier la clé API**
```bash
# Vérifiez que la clé commence par SG.
echo $SENDGRID_API_KEY
# Doit afficher : SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

2. **Régénérer une nouvelle clé**
   - Allez dans SendGrid Dashboard → Settings → API Keys
   - Créez une nouvelle clé avec permissions "Mail Send"
   - Mettez à jour `SENDGRID_API_KEY` dans Vercel

3. **Tester la configuration**
```bash
npm run test:sendgrid-config
```

### ❌ Erreur : "Supabase Connection Failed"

**Symptômes :**
```
Error: supabaseUrl is required
Error: Invalid JWT
```

**Solutions :**

1. **Vérifier les variables Supabase**
```bash
# Variables requises
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

2. **Tester la connexion**
```bash
npm run test:audit-infrastructure
```

3. **Vérifier les politiques RLS**
   - Connectez-vous à Supabase Dashboard
   - Vérifiez que les tables ont les bonnes politiques
   - Exécutez `npm run setup-audit-db` si nécessaire

### ❌ Erreur : "Too Many Requests" (Rate Limiting)

**Symptômes :**
```
Error: HTTP Error 429: Too Many Requests
Rate limit exceeded
```

**Solutions :**

1. **Ajuster la configuration**
```javascript
// audit.config.js
module.exports = {
  validator: {
    batchSize: 10,        // Réduire de 20 à 10
    rateLimitDelay: 500,  // Augmenter de 100ms à 500ms
    maxConcurrent: 3      // Réduire de 5 à 3
  }
}
```

2. **Utiliser des exclusions**
```javascript
excludePatterns: [
  'https://slow-external-site.com/**',
  'https://rate-limited-api.com/**'
]
```

### ❌ Erreur : "Memory Limit Exceeded"

**Symptômes :**
```
Error: JavaScript heap out of memory
Process killed (OOM)
```

**Solutions :**

1. **Augmenter la limite mémoire**
```json
// package.json
{
  "scripts": {
    "audit:full": "node --max-old-space-size=2048 scripts/audit-cli.ts audit"
  }
}
```

2. **Optimiser le traitement par lots**
```javascript
// Réduire la taille des batches
validator: {
  batchSize: 5,  // Au lieu de 20
  maxConcurrent: 2  // Au lieu de 5
}
```

3. **Nettoyer régulièrement**
```bash
npm run maintenance:clean --retention-days 7
```

## 🔍 Diagnostic des performances

### Audit lent (> 10 minutes)

**Diagnostic :**
```bash
# Vérifier les métriques
npm run audit:cli status --verbose

# Identifier les liens lents
npm run audit:cli analyze --slow-links
```

**Solutions :**

1. **Identifier les goulots d'étranglement**
```typescript
// Ajouter du logging détaillé
const startTime = Date.now()
const result = await linkValidator.validateLink(url)
const duration = Date.now() - startTime

if (duration > 5000) {
  console.warn(`Lien lent détecté: ${url} (${duration}ms)`)
}
```

2. **Exclure les domaines problématiques**
```javascript
excludePatterns: [
  'https://very-slow-site.com/**',
  'https://timeout-prone-api.com/**'
]
```

3. **Ajuster les timeouts**
```javascript
validator: {
  timeout: 15000,  // 15 secondes au lieu de 10
  retryAttempts: 1  // 1 tentative au lieu de 3
}
```

### Trop de faux positifs

**Diagnostic :**
```bash
# Analyser les résultats récents
npm run audit:cli report --false-positives

# Vérifier les patterns d'exclusion
npm run audit:cli config --show-exclusions
```

**Solutions :**

1. **Ajuster le seuil de confiance**
```javascript
corrector: {
  confidenceThreshold: 0.9,  // Plus strict
  autoApply: false  // Désactiver l'auto-correction
}
```

2. **Améliorer les exclusions**
```javascript
excludePatterns: [
  '*.test.*',
  'node_modules/**',
  '.next/**',
  'coverage/**',
  // Ajouter des patterns spécifiques
  'https://external-api.com/webhook/**',
  '/admin/internal-tools/**'
]
```

## 🛠️ Outils de diagnostic

### Script de diagnostic complet

```typescript
// scripts/diagnose-audit-system.ts
import { LinkScanner } from '@/lib/audit/link-scanner'
import { LinkValidator } from '@/lib/audit/link-validator'
import { SendGridEmailService } from '@/lib/email/sendgrid-service'

async function runDiagnostics() {
  console.log('🔍 Diagnostic du système d\'audit...\n')
  
  // 1. Test de configuration
  console.log('1. Configuration...')
  const configValid = await testConfiguration()
  console.log(configValid ? '✅ Configuration OK' : '❌ Problème de configuration')
  
  // 2. Test de connectivité
  console.log('\n2. Connectivité...')
  const connectivityOK = await testConnectivity()
  console.log(connectivityOK ? '✅ Connectivité OK' : '❌ Problème de connectivité')
  
  // 3. Test de performance
  console.log('\n3. Performance...')
  const performanceOK = await testPerformance()
  console.log(performanceOK ? '✅ Performance OK' : '❌ Problème de performance')
  
  // 4. Test des emails
  console.log('\n4. Emails...')
  const emailsOK = await testEmails()
  console.log(emailsOK ? '✅ Emails OK' : '❌ Problème d\'emails')
  
  // Résumé
  const allOK = configValid && connectivityOK && performanceOK && emailsOK
  console.log(`\n${allOK ? '🎉' : '⚠️'} Diagnostic ${allOK ? 'réussi' : 'avec problèmes'}`)
}

async function testConfiguration(): Promise<boolean> {
  try {
    const requiredEnvVars = [
      'SENDGRID_API_KEY',
      'NEXT_PUBLIC_SUPABASE_URL',
      'SUPABASE_SERVICE_ROLE_KEY',
      'ADMIN_EMAIL'
    ]
    
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        console.error(`❌ Variable manquante: ${envVar}`)
        return false
      }
    }
    
    return true
  } catch (error) {
    console.error('❌ Erreur de configuration:', error)
    return false
  }
}

async function testConnectivity(): Promise<boolean> {
  try {
    // Test Supabase
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    
    const { error } = await supabase.from('scanned_links').select('count').limit(1)
    if (error) {
      console.error('❌ Erreur Supabase:', error.message)
      return false
    }
    
    // Test SendGrid
    const emailService = new SendGridEmailService({
      apiKey: process.env.SENDGRID_API_KEY!,
      fromEmail: process.env.SENDGRID_FROM_EMAIL!,
      fromName: 'Test',
      adminEmail: process.env.ADMIN_EMAIL!
    })
    
    // Test simple (ne pas envoyer réellement)
    return true
  } catch (error) {
    console.error('❌ Erreur de connectivité:', error)
    return false
  }
}

async function testPerformance(): Promise<boolean> {
  try {
    const startTime = Date.now()
    
    // Test de validation sur quelques liens
    const validator = new LinkValidator()
    const testUrls = [
      'https://google.com',
      'https://github.com',
      '/non-existent-page'
    ]
    
    const results = await validator.validateBatch(testUrls, {
      timeout: 5000,
      retryAttempts: 1,
      userAgent: 'Test Bot',
      followRedirects: true,
      checkAnchors: false,
      batchSize: 3,
      rateLimitDelay: 100
    })
    
    const duration = Date.now() - startTime
    console.log(`   Temps pour 3 liens: ${duration}ms`)
    
    return duration < 10000 && results.length === 3
  } catch (error) {
    console.error('❌ Erreur de performance:', error)
    return false
  }
}

async function testEmails(): Promise<boolean> {
  try {
    // Test en mode sandbox (ne pas envoyer réellement)
    process.env.SENDGRID_SANDBOX_MODE = 'true'
    
    const emailService = new SendGridEmailService({
      apiKey: process.env.SENDGRID_API_KEY!,
      fromEmail: process.env.SENDGRID_FROM_EMAIL!,
      fromName: 'Test System',
      adminEmail: process.env.ADMIN_EMAIL!
    })
    
    const testRequest = {
      userEmail: 'test@example.com',
      resourceUrl: '/test-resource.pdf',
      sourceUrl: 'https://test.com',
      message: 'Test diagnostic',
      requestCount: 1
    }
    
    const success = await emailService.sendResourceRequest(testRequest)
    return success
  } catch (error) {
    console.error('❌ Erreur d\'emails:', error)
    return false
  }
}

// Exécuter le diagnostic
runDiagnostics().catch(console.error)
```

### Commande de diagnostic

```bash
# Ajouter au package.json
"scripts": {
  "diagnose": "tsx scripts/diagnose-audit-system.ts",
  "health-check": "npm run diagnose && npm run maintenance:health"
}
```

## 📊 Monitoring et alertes

### Métriques à surveiller

```typescript
// scripts/monitor-system-health.ts
interface SystemHealth {
  auditExecutionTime: number    // < 300 secondes
  memoryUsage: number          // < 500 MB
  errorRate: number            // < 5%
  emailDeliveryRate: number    // > 95%
  databaseConnections: number  // < 10 actives
}

async function checkSystemHealth(): Promise<SystemHealth> {
  const health: SystemHealth = {
    auditExecutionTime: await getAverageExecutionTime(),
    memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024,
    errorRate: await getErrorRate(),
    emailDeliveryRate: await getEmailDeliveryRate(),
    databaseConnections: await getActiveConnections()
  }
  
  // Alertes automatiques
  if (health.auditExecutionTime > 300) {
    await sendAlert('Audit trop lent', `${health.auditExecutionTime}s`)
  }
  
  if (health.errorRate > 5) {
    await sendAlert('Taux d\'erreur élevé', `${health.errorRate}%`)
  }
  
  return health
}
```

### Dashboard de santé

```typescript
// app/api/system-health/route.ts
export async function GET() {
  const health = await checkSystemHealth()
  
  return NextResponse.json({
    status: health.errorRate < 5 ? 'healthy' : 'degraded',
    metrics: health,
    timestamp: new Date().toISOString()
  })
}
```

## 🔧 Maintenance préventive

### Script de maintenance quotidienne

```bash
#!/bin/bash
# scripts/daily-maintenance.sh

echo "🧹 Maintenance quotidienne du système d'audit..."

# 1. Nettoyer les anciens rapports
npm run maintenance:clean --retention-days 30

# 2. Vérifier la santé du système
npm run maintenance:health

# 3. Optimiser la base de données
npm run maintenance:optimize-db

# 4. Vérifier l'espace disque
df -h | grep -E "/$|/tmp"

# 5. Tester la configuration
npm run test:audit-config

echo "✅ Maintenance terminée"
```

### Cron job pour maintenance

```bash
# Ajouter au crontab
0 3 * * * /path/to/project/scripts/daily-maintenance.sh >> /var/log/audit-maintenance.log 2>&1
```

## 🚨 Procédures d'urgence

### Système complètement en panne

1. **Diagnostic rapide**
```bash
npm run diagnose
npm run health-check
```

2. **Vérifier les logs**
```bash
# Logs Vercel
vercel logs --follow

# Logs locaux
tail -f logs/audit-system.log
```

3. **Rollback si nécessaire**
```bash
# Annuler les dernières corrections
npm run audit:cli rollback --date today

# Restaurer la configuration précédente
git checkout HEAD~1 -- src/lib/audit/config.ts
```

### Emails non envoyés

1. **Vérifier SendGrid**
   - Status page : https://status.sendgrid.com
   - Activity feed dans le dashboard
   - Quotas et limites

2. **Mode de récupération**
```typescript
// Activer le mode de récupération
process.env.EMAIL_FALLBACK_MODE = 'true'

// Les emails seront sauvés localement
// au lieu d'être envoyés
```

3. **Renvoyer les emails manqués**
```bash
npm run email:retry --date yesterday
```

### Base de données corrompue

1. **Sauvegarde d'urgence**
```bash
# Export des données critiques
npm run db:export --tables scanned_links,validation_results
```

2. **Réinitialisation**
```bash
# Recréer les tables
npm run setup-audit-db --force

# Restaurer les données
npm run db:import --file backup-YYYY-MM-DD.sql
```

## 📞 Escalade et support

### Niveaux de support

1. **Niveau 1** : Auto-diagnostic
   - Exécuter `npm run diagnose`
   - Consulter la FAQ
   - Vérifier les logs

2. **Niveau 2** : Support technique
   - Créer une issue GitHub avec :
     - Logs détaillés
     - Configuration (sans clés sensibles)
     - Étapes de reproduction

3. **Niveau 3** : Urgence critique
   - Contact direct : `ls@laurentserre.com`
   - Inclure le diagnostic complet
   - Préciser l'impact business

### Informations à fournir

```bash
# Générer un rapport de diagnostic complet
npm run generate-support-report

# Le rapport inclut :
# - Configuration système
# - Logs récents
# - Métriques de performance
# - État des services externes
```

## 📋 Checklist de dépannage

### Avant de commencer
- [ ] Identifier les symptômes précis
- [ ] Vérifier l'heure de début du problème
- [ ] Consulter les logs récents
- [ ] Tester avec des données simples

### Pendant le dépannage
- [ ] Documenter chaque étape
- [ ] Tester après chaque modification
- [ ] Sauvegarder avant les changements majeurs
- [ ] Monitorer les métriques système

### Après résolution
- [ ] Vérifier que le problème est résolu
- [ ] Documenter la solution
- [ ] Mettre à jour la FAQ si nécessaire
- [ ] Planifier des mesures préventives

---

## 📚 Ressources supplémentaires

- **Logs système** : `/var/log/audit-system.log`
- **Métriques** : `/admin/system-health`
- **Documentation** : `docs/AUDIT_SYSTEM_TECHNICAL_GUIDE.md`
- **Tests** : `npm run test:audit`

---

*Guide de dépannage v1.0 - 30 juillet 2025*