# Documentation du Générateur de Rapports d'Audit

## Vue d'ensemble

Le système de génération de rapports d'audit fournit une solution complète pour analyser, visualiser et exporter les résultats d'audit des liens morts. Il génère des rapports détaillés en trois formats : JSON, HTML interactif et CSV.

## Architecture

### Composants principaux

1. **ReportGenerator** - Générateur principal qui orchestre la création des rapports
2. **HTMLReportGenerator** - Génère des rapports HTML interactifs avec CSS et JavaScript intégrés
3. **CSVExportGenerator** - Crée des exports CSV flexibles avec différentes vues

## Fonctionnalités

### 1. Génération de Rapport JSON

```typescript
const reportGenerator = new ReportGenerator();
const report = await reportGenerator.generateReport(
  validationResults,
  scannedLinks,
  corrections
);

// Export JSON
const jsonPath = await reportGenerator.exportToJSON(report);
```

**Contenu du rapport JSON :**
- Résumé exécutif avec métriques clés
- Analyse détaillée des liens morts
- Impact SEO calculé
- Corrections appliquées
- Recommandations d'actions
- Statistiques des demandes de ressources

### 2. Rapport HTML Interactif

```typescript
const htmlPath = await reportGenerator.exportToHTML(report);
```

**Fonctionnalités du rapport HTML :**
- Interface responsive avec design moderne
- Filtres interactifs (priorité, type, recherche)
- Tableaux triables
- Graphiques de visualisation
- Export CSV intégré
- Score de santé visuel
- Actions suggérées détaillées

**Sections du rapport HTML :**
- 📊 Résumé Exécutif
- 🎯 Impact SEO
- ❌ Liens Morts (avec filtres)
- 🔧 Corrections Appliquées
- 📧 Demandes de Ressources
- 💡 Recommandations
- 📈 Visualisations

### 3. Exports CSV Multiples

```typescript
const csvGenerator = new CSVExportGenerator();

// Export complet
const completeCsv = await csvGenerator.exportToCSV(report);

// Export par priorité
const criticalCsv = await csvGenerator.exportByPriorityToCSV(
  brokenLinks, 
  'critical'
);

// Export par type
const internalCsv = await csvGenerator.exportByTypeToCSV(
  brokenLinks, 
  'internal'
);

// Export par page source
const byPageCsv = await csvGenerator.exportByPageToCSV(brokenLinks);

// Export avec options personnalisées
const customCsv = await csvGenerator.exportBrokenLinksToCSV(
  brokenLinks,
  'custom-export.csv',
  {
    delimiter: ';',
    dateFormat: 'iso',
    includeHeaders: true
  }
);
```

**Types d'exports CSV disponibles :**
- **Complet** : Toutes les données du rapport
- **Liens morts** : Détails des liens cassés
- **Corrections** : Historique des corrections
- **Statistiques** : Métriques de performance
- **Par priorité** : Filtré par niveau de priorité
- **Par type** : Filtré par type de lien
- **Par page** : Groupé par page source

## Métriques et Analyses

### Score de Santé SEO

Le score de santé SEO est calculé selon la formule :
```
Score = ((liens_valides + liens_corrigés) / total_liens) * 100
```

### Impact SEO des Liens Morts

L'impact SEO est calculé en fonction de :
- **Type de lien** : interne (8), download (6), externe (3), anchor (4)
- **Priorité** : low (×1), medium (×1.5), high (×2), critical (×3)
- **Occurrences** : multiplicateur basé sur le nombre d'occurrences

### Estimation de Perte de Trafic

```
Perte estimée = min(impact_total * 0.5, 25%)
```

## Configuration et Options

### Options CSV

```typescript
interface CSVExportOptions {
  includeHeaders?: boolean;    // Inclure les en-têtes (défaut: true)
  delimiter?: string;          // Délimiteur (défaut: ',')
  encoding?: BufferEncoding;   // Encodage (défaut: 'utf-8')
  dateFormat?: 'iso' | 'fr' | 'us'; // Format de date (défaut: 'fr')
}
```

### Variables d'Environnement Requises

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Utilisation Avancée

### Génération de Tous les Formats

```typescript
const allFormats = await reportGenerator.generateAllFormats(report);

console.log('Fichiers générés:');
console.log('JSON:', allFormats.json);
console.log('HTML:', allFormats.html);
console.log('CSV complet:', allFormats.csv.complete);
console.log('CSV par priorité:', allFormats.csv.byPriority);
console.log('CSV par type:', allFormats.csv.byType);
```

### Rapport de Tendances

```typescript
const trendReport = await reportGenerator.generateTrendReport(30); // 30 derniers jours
```

### Export Multiple CSV

```typescript
const multipleExports = await csvGenerator.generateMultipleExports(
  report,
  'reports/export-batch'
);
```

## Structure des Données

### AuditReport

```typescript
interface AuditReport {
  timestamp: Date;
  summary: {
    totalLinks: number;
    validLinks: number;
    brokenLinks: number;
    correctedLinks: number;
    pendingLinks: number;
    seoHealthScore: number;
  };
  brokenLinks: BrokenLinkDetail[];
  corrections: CorrectionResult[];
  recommendations: string[];
  seoImpact: SEOImpactAnalysis;
  resourceRequests: {
    totalRequests: number;
    mostRequested: { url: string; count: number }[];
  };
}
```

### BrokenLinkDetail

```typescript
interface BrokenLinkDetail {
  url: string;
  sourceFiles: string[];
  linkType: 'internal' | 'external' | 'download' | 'anchor';
  priority: 'critical' | 'high' | 'medium' | 'low';
  error: string;
  suggestedActions: string[];
  seoImpact: number;
  lastWorking?: Date;
}
```

### SEOImpactAnalysis

```typescript
interface SEOImpactAnalysis {
  criticalIssues: number;
  estimatedTrafficLoss: number;
  affectedPages: string[];
  priorityActions: string[];
  linkHealthScore: number;
}
```

## Tests et Validation

### Exécution des Tests

```bash
npx tsx scripts/test-report-generator.ts
```

### Tests Inclus

1. **Test de génération complète** - Vérifie la création du rapport principal
2. **Test export HTML** - Valide la génération du rapport interactif
3. **Test exports CSV** - Teste tous les types d'exports CSV
4. **Test avec données mock** - Fonctionne sans base de données

## Intégration avec la Base de Données

Le générateur utilise Supabase pour :
- Récupérer l'historique des validations
- Sauvegarder les rapports d'audit
- Obtenir les statistiques des demandes de ressources
- Calculer les tendances temporelles

### Tables Utilisées

- `validation_results` - Historique des validations
- `audit_history` - Historique des audits
- `resource_requests` - Demandes de ressources utilisateurs

## Personnalisation

### Thème Visuel HTML

Le rapport HTML utilise les couleurs de la charte graphique Laurent Serre :
- Primary: `#1B365D` (Bleu encre)
- Accent: `#00BDA4` (Vert menthe)
- Danger: `#EF4444` (Rouge)
- Warning: `#F59E0B` (Orange)
- Success: `#10B981` (Vert)

### Ajout de Nouvelles Métriques

Pour ajouter de nouvelles métriques :

1. Étendre l'interface `AuditReport`
2. Modifier `calculateSummary()` dans `ReportGenerator`
3. Mettre à jour les templates HTML et CSV
4. Ajouter les tests correspondants

## Performance et Optimisation

### Recommandations

- Les rapports sont générés de manière asynchrone
- Les exports CSV utilisent des streams pour les gros volumes
- Les graphiques HTML sont générés côté client
- La base de données utilise des index optimisés

### Limites

- Export CSV limité à 10 000 liens par défaut
- Rapport HTML optimisé pour < 1000 liens morts
- Historique des tendances limité à 365 jours

## Maintenance

### Mise à Jour des Templates

Les templates HTML et CSS sont intégrés dans le code pour faciliter le déploiement. Pour les modifier :

1. Éditer `HTMLReportGenerator.generateCSS()`
2. Modifier `HTMLReportGenerator.generateJavaScript()`
3. Tester avec `scripts/test-report-generator.ts`

### Monitoring

Le système enregistre automatiquement :
- Temps d'exécution des rapports
- Nombre de liens traités
- Erreurs de génération
- Utilisation des exports

## Exemples d'Utilisation

### Script d'Audit Complet

```typescript
import { ReportGenerator } from './src/lib/audit/report-generator';
import { LinkScanner } from './src/lib/audit/link-scanner';
import { LinkValidator } from './src/lib/audit/link-validator';

async function runFullAudit() {
  // Scanner les liens
  const scanner = new LinkScanner();
  const scannedLinks = await scanner.scanSite({
    baseUrl: 'https://laurentserre.com',
    maxDepth: 3,
    includeExternal: true,
    excludePatterns: ['/admin/', '/api/'],
    followRedirects: true
  });

  // Valider les liens
  const validator = new LinkValidator();
  const validationResults = await validator.validateBatch(
    scannedLinks.map(link => link.url),
    {
      timeout: 5000,
      retryAttempts: 2,
      userAgent: 'Laurent Serre Audit Bot',
      followRedirects: true,
      checkAnchors: true,
      batchSize: 10,
      rateLimitDelay: 100
    }
  );

  // Générer le rapport
  const reportGenerator = new ReportGenerator();
  const report = await reportGenerator.generateReport(
    validationResults,
    scannedLinks
  );

  // Exporter tous les formats
  const exports = await reportGenerator.generateAllFormats(report);
  
  console.log('Audit terminé !');
  console.log('Rapport HTML:', exports.html);
  console.log('Score de santé:', report.summary.seoHealthScore + '%');
}
```

### Intégration avec GitHub Actions

```yaml
name: Audit des Liens
on:
  schedule:
    - cron: '0 2 * * *'  # Tous les jours à 2h

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Audit des liens
        run: npx tsx scripts/audit-main.ts
      - name: Upload des rapports
        uses: actions/upload-artifact@v2
        with:
          name: audit-reports
          path: reports/
```

Ce système de génération de rapports offre une solution complète et professionnelle pour le monitoring et l'analyse des liens morts, avec des exports flexibles et une interface utilisateur moderne.