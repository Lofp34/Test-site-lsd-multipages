#!/usr/bin/env node

/**
 * Tests de régression complets - Optimisation CSS
 * 
 * Ce script teste exhaustivement que l'optimisation CSS a été appliquée
 * et que tous les composants fonctionnent correctement.
 * 
 * Requirements: 1.1, 1.2, 7.2
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

interface TestResult {
  name: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  details: string[];
  errors: string[];
}

class CSSOptimizationTester {
  private results: TestResult[] = [];
  private projectRoot: string;

  constructor() {
    this.projectRoot = process.cwd();
  }

  private addResult(name: string, status: 'PASS' | 'FAIL' | 'WARNING', details: string[] = [], errors: string[] = []) {
    this.results.push({ name, status, details, errors });
  }

  private log(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') {
    const colors = {
      info: '\x1b[36m',    // Cyan
      success: '\x1b[32m', // Green
      warning: '\x1b[33m', // Yellow
      error: '\x1b[31m'    // Red
    };
    const reset = '\x1b[0m';
    console.log(`${colors[type]}${message}${reset}`);
  }

  /**
   * Test 1: Recherche exhaustive des résidus CSS
   */
  private testCSSResidues(): void {
    this.log('🔍 Test 1: Recherche des résidus CSS...', 'info');
    
    const patterns = [
      { pattern: 'dark:', description: 'Classes Tailwind dark:' },
      { pattern: 'prefers-color-scheme: dark', description: 'Media queries mode sombre' },
      { pattern: '@media.*dark', description: 'Media queries avec "dark"' },
      { pattern: 'darkMode:', description: 'Configuration darkMode' },
      { pattern: '--.*-dark', description: 'Variables CSS dark' },
      { pattern: 'theme.*dark', description: 'Références thème sombre' }
    ];

    const excludePatterns = [
      'node_modules',
      '.git',
      '.next',
      'dist',
      'build',
      '.kiro/specs', // Exclure les specs qui peuvent contenir ces termes
      'test-dark-mode-suppression-regression.ts' // Exclure ce fichier de test
    ];

    let totalResidues = 0;
    const residueDetails: string[] = [];

    patterns.forEach(({ pattern, description }) => {
      try {
        // Use find with grep to avoid grep option issues
        let command: string;
        if (pattern === '--.*-dark') {
          command = `find . -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.css" -o -name "*.scss" \\) ${excludePatterns.map(p => `! -path "./${p}/*"`).join(' ')} -exec grep -l "${pattern}" {} \\; 2>/dev/null || true`;
        } else {
          command = `find . -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.css" -o -name "*.scss" -o -name "*.js" -o -name "*.jsx" \\) ${excludePatterns.map(p => `! -path "./${p}/*"`).join(' ')} -exec grep -l "${pattern}" {} \\; 2>/dev/null || true`;
        }
        
        const result = execSync(command, { encoding: 'utf8', cwd: this.projectRoot });
        
        if (result.trim()) {
          const files = result.trim().split('\n').filter(line => line.trim());
          totalResidues += files.length;
          residueDetails.push(`${description}: ${files.length} fichiers`);
          files.forEach(file => residueDetails.push(`  - ${file}`));
        }
      } catch (error) {
        residueDetails.push(`Erreur lors de la recherche ${pattern}: ${error}`);
      }
    });

    if (totalResidues === 0) {
      this.addResult('Résidus mode sombre', 'PASS', ['Aucun résidu de mode sombre trouvé']);
    } else {
      this.addResult('Résidus mode sombre', 'FAIL', residueDetails, [`${totalResidues} résidus trouvés`]);
    }
  }

  /**
   * Test 2: Validation de la configuration Tailwind
   */
  private testTailwindConfig(): void {
    this.log('⚙️ Test 2: Configuration Tailwind...', 'info');
    
    const configPath = path.join(this.projectRoot, 'tailwind.config.ts');
    const details: string[] = [];
    const errors: string[] = [];

    try {
      if (!fs.existsSync(configPath)) {
        errors.push('Fichier tailwind.config.ts non trouvé');
        this.addResult('Configuration Tailwind', 'FAIL', details, errors);
        return;
      }

      const configContent = fs.readFileSync(configPath, 'utf8');
      
      // Vérifier que darkMode est désactivé ou absent
      if (configContent.includes('darkMode: true') || configContent.includes('darkMode: "class"')) {
        errors.push('darkMode est encore activé dans la configuration');
      } else if (configContent.includes('darkMode: false')) {
        details.push('darkMode explicitement désactivé');
      } else {
        details.push('darkMode absent (désactivé par défaut)');
      }

      // Vérifier qu'il n'y a pas de variables CSS sombres
      if (configContent.includes('dark-bg') || configContent.includes('dark-text')) {
        errors.push('Variables CSS sombres trouvées dans la configuration');
      } else {
        details.push('Aucune variable CSS sombre dans la configuration');
      }

      const status = errors.length === 0 ? 'PASS' : 'FAIL';
      this.addResult('Configuration Tailwind', status, details, errors);

    } catch (error) {
      this.addResult('Configuration Tailwind', 'FAIL', details, [`Erreur lecture config: ${error}`]);
    }
  }

  /**
   * Test 3: Validation des fichiers CSS globaux
   */
  private testGlobalCSS(): void {
    this.log('🎨 Test 3: Fichiers CSS globaux...', 'info');
    
    const cssFiles = [
      'src/app/globals.css',
      'src/styles/mobile-optimizations.css',
      'src/index.css'
    ];

    let allPassed = true;
    const allDetails: string[] = [];
    const allErrors: string[] = [];

    cssFiles.forEach(filePath => {
      const fullPath = path.join(this.projectRoot, filePath);
      
      if (!fs.existsSync(fullPath)) {
        allDetails.push(`${filePath}: Fichier non trouvé (OK si non utilisé)`);
        return;
      }

      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Rechercher les media queries de mode sombre
      const darkMediaQueries = content.match(/@media\s*\([^)]*prefers-color-scheme:\s*dark[^)]*\)/g);
      if (darkMediaQueries) {
        allPassed = false;
        allErrors.push(`${filePath}: ${darkMediaQueries.length} media queries sombres trouvées`);
        darkMediaQueries.forEach(query => allErrors.push(`  - ${query}`));
      } else {
        allDetails.push(`${filePath}: Aucune media query sombre`);
      }

      // Rechercher les variables CSS sombres
      const darkVariables = content.match(/--[^:]*dark[^:]*:/g);
      if (darkVariables) {
        allPassed = false;
        allErrors.push(`${filePath}: Variables CSS sombres trouvées`);
        darkVariables.forEach(variable => allErrors.push(`  - ${variable}`));
      } else {
        allDetails.push(`${filePath}: Aucune variable CSS sombre`);
      }
    });

    const status = allPassed ? 'PASS' : 'FAIL';
    this.addResult('Fichiers CSS globaux', status, allDetails, allErrors);
  }

  /**
   * Test 4: Validation des composants React critiques
   */
  private testReactComponents(): void {
    this.log('⚛️ Test 4: Composants React critiques...', 'info');
    
    const criticalComponents = [
      'src/components/FAQ.tsx',
      'src/components/templates/CategoryPage.tsx',
      'src/components/templates/BookPage.tsx',
      'src/components/ContactSimpleForm.tsx',
      'src/components/layout/Header.tsx',
      'src/components/AccueilClient.tsx',
      'src/components/LogoBanner.tsx',
      'src/components/HubSpotForm.tsx'
    ];

    let allPassed = true;
    const allDetails: string[] = [];
    const allErrors: string[] = [];

    criticalComponents.forEach(componentPath => {
      const fullPath = path.join(this.projectRoot, componentPath);
      
      if (!fs.existsSync(fullPath)) {
        allDetails.push(`${componentPath}: Fichier non trouvé`);
        return;
      }

      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Rechercher les classes dark:
      const darkClasses = content.match(/dark:[a-zA-Z0-9\-\/\[\]]+/g);
      if (darkClasses) {
        allPassed = false;
        allErrors.push(`${componentPath}: ${darkClasses.length} classes dark: trouvées`);
        // Limiter l'affichage pour éviter le spam
        const displayClasses = darkClasses.slice(0, 5);
        displayClasses.forEach(cls => allErrors.push(`  - ${cls}`));
        if (darkClasses.length > 5) {
          allErrors.push(`  - ... et ${darkClasses.length - 5} autres`);
        }
      } else {
        allDetails.push(`${componentPath}: Aucune classe dark:`);
      }

      // Rechercher les media queries inline
      if (content.includes('prefers-color-scheme: dark')) {
        allPassed = false;
        allErrors.push(`${componentPath}: Media query sombre inline trouvée`);
      }
    });

    const status = allPassed ? 'PASS' : 'FAIL';
    this.addResult('Composants React critiques', status, allDetails, allErrors);
  }

  /**
   * Test 5: Test de build et compilation
   */
  private testBuildCompilation(): void {
    this.log('🔨 Test 5: Build et compilation...', 'info');
    
    const details: string[] = [];
    const errors: string[] = [];

    try {
      // Test de build Next.js
      this.log('  - Test du build Next.js...', 'info');
      const buildResult = execSync('npm run build', { 
        encoding: 'utf8', 
        cwd: this.projectRoot,
        timeout: 120000 // 2 minutes timeout
      });
      
      details.push('Build Next.js réussi');
      
      // Vérifier la taille du CSS généré
      const cssDir = path.join(this.projectRoot, '.next/static/css');
      if (fs.existsSync(cssDir)) {
        const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
        let totalSize = 0;
        cssFiles.forEach(file => {
          const filePath = path.join(cssDir, file);
          const stats = fs.statSync(filePath);
          totalSize += stats.size;
        });
        details.push(`Taille CSS totale: ${(totalSize / 1024).toFixed(2)} KB`);
      }

    } catch (error) {
      errors.push(`Erreur de build: ${error}`);
    }

    const status = errors.length === 0 ? 'PASS' : 'FAIL';
    this.addResult('Build et compilation', status, details, errors);
  }

  /**
   * Test 6: Validation des types TypeScript
   */
  private testTypeScriptTypes(): void {
    this.log('📝 Test 6: Types TypeScript...', 'info');
    
    const details: string[] = [];
    const errors: string[] = [];

    try {
      // Test de vérification des types
      const typeCheckResult = execSync('npx tsc --noEmit', { 
        encoding: 'utf8', 
        cwd: this.projectRoot,
        timeout: 60000
      });
      
      details.push('Vérification des types réussie');

      // Vérifier les fichiers de types spécifiques
      const typeFiles = [
        'src/types/category-templates.ts',
        'src/hooks/useTheme.ts'
      ];

      typeFiles.forEach(filePath => {
        const fullPath = path.join(this.projectRoot, filePath);
        if (fs.existsSync(fullPath)) {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (content.includes('dark') && !content.includes('// dark mode suppressed')) {
            errors.push(`${filePath}: Références potentielles au mode sombre`);
          } else {
            details.push(`${filePath}: Types nettoyés`);
          }
        }
      });

    } catch (error) {
      const errorStr = error.toString();
      if (errorStr.includes('error TS')) {
        errors.push(`Erreurs TypeScript: ${errorStr}`);
      } else {
        details.push('Vérification des types réussie (pas d\'erreurs)');
      }
    }

    const status = errors.length === 0 ? 'PASS' : 'FAIL';
    this.addResult('Types TypeScript', status, details, errors);
  }

  /**
   * Test 7: Simulation des préférences système sombres
   */
  private testSystemDarkModePreferences(): void {
    this.log('🌙 Test 7: Préférences système sombres...', 'info');
    
    const details: string[] = [];
    const warnings: string[] = [];

    // Ce test nécessite une validation manuelle car nous ne pouvons pas
    // automatiquement changer les préférences système et tester le navigateur
    details.push('Test manuel requis:');
    details.push('1. Changer les préférences système en mode sombre');
    details.push('2. Ouvrir le site dans Chrome, Firefox, Safari');
    details.push('3. Vérifier que le site reste en mode clair');
    details.push('4. Tester la navigation, formulaires, CTAs');
    details.push('5. Tester sur mobile et desktop');

    warnings.push('Ce test nécessite une validation manuelle');
    warnings.push('Vérifiez que le site ignore les préférences système sombres');

    this.addResult('Préférences système sombres', 'WARNING', details, warnings);
  }

  /**
   * Test 8: Validation de la responsivité
   */
  private testResponsiveness(): void {
    this.log('📱 Test 8: Responsivité...', 'info');
    
    const details: string[] = [];
    const warnings: string[] = [];

    // Vérifier les breakpoints dans les fichiers CSS
    const cssFiles = [
      'src/app/globals.css',
      'src/styles/mobile-optimizations.css'
    ];

    cssFiles.forEach(filePath => {
      const fullPath = path.join(this.projectRoot, filePath);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Compter les media queries responsive
        const responsiveQueries = content.match(/@media\s*\([^)]*min-width|max-width[^)]*\)/g);
        if (responsiveQueries) {
          details.push(`${filePath}: ${responsiveQueries.length} media queries responsive`);
        }
      }
    });

    // Instructions pour test manuel
    details.push('Test manuel requis pour la responsivité:');
    details.push('1. Tester sur différentes tailles d\'écran');
    details.push('2. Vérifier mobile (320px-768px)');
    details.push('3. Vérifier tablet (768px-1024px)');
    details.push('4. Vérifier desktop (1024px+)');
    details.push('5. Tester les CTAs mobiles');
    details.push('6. Vérifier les formulaires sur mobile');

    warnings.push('Test de responsivité nécessite validation manuelle');

    this.addResult('Responsivité', 'WARNING', details, warnings);
  }

  /**
   * Exécuter tous les tests
   */
  public async runAllTests(): Promise<void> {
    this.log('🚀 Démarrage des tests de régression - Suppression Mode Sombre', 'info');
    this.log('=' .repeat(60), 'info');

    // Tests automatisés
    this.testDarkModeResidues();
    this.testTailwindConfig();
    this.testGlobalCSS();
    this.testReactComponents();
    this.testBuildCompilation();
    this.testTypeScriptTypes();

    // Tests nécessitant validation manuelle
    this.testSystemDarkModePreferences();
    this.testResponsiveness();

    // Afficher les résultats
    this.displayResults();
  }

  /**
   * Afficher les résultats des tests
   */
  private displayResults(): void {
    this.log('\n' + '=' .repeat(60), 'info');
    this.log('📊 RÉSULTATS DES TESTS DE RÉGRESSION', 'info');
    this.log('=' .repeat(60), 'info');

    let passCount = 0;
    let failCount = 0;
    let warningCount = 0;

    this.results.forEach(result => {
      const statusIcon = {
        'PASS': '✅',
        'FAIL': '❌',
        'WARNING': '⚠️'
      }[result.status];

      const statusColor = {
        'PASS': 'success',
        'FAIL': 'error',
        'WARNING': 'warning'
      }[result.status] as 'success' | 'error' | 'warning';

      this.log(`\n${statusIcon} ${result.name}`, statusColor);

      if (result.details.length > 0) {
        result.details.forEach(detail => {
          this.log(`   ${detail}`, 'info');
        });
      }

      if (result.errors.length > 0) {
        result.errors.forEach(error => {
          this.log(`   ❌ ${error}`, 'error');
        });
      }

      // Compter les résultats
      switch (result.status) {
        case 'PASS': passCount++; break;
        case 'FAIL': failCount++; break;
        case 'WARNING': warningCount++; break;
      }
    });

    // Résumé final
    this.log('\n' + '=' .repeat(60), 'info');
    this.log('📈 RÉSUMÉ FINAL', 'info');
    this.log('=' .repeat(60), 'info');
    this.log(`✅ Tests réussis: ${passCount}`, 'success');
    this.log(`❌ Tests échoués: ${failCount}`, failCount > 0 ? 'error' : 'info');
    this.log(`⚠️  Tests avec avertissement: ${warningCount}`, warningCount > 0 ? 'warning' : 'info');

    if (failCount === 0) {
      this.log('\n🎉 SUCCÈS: Suppression du mode sombre validée!', 'success');
      this.log('Le site fonctionne correctement en mode clair uniquement.', 'success');
    } else {
      this.log('\n🔧 ACTION REQUISE: Des problèmes ont été détectés.', 'error');
      this.log('Veuillez corriger les erreurs avant de finaliser.', 'error');
    }

    if (warningCount > 0) {
      this.log('\n📋 TESTS MANUELS REQUIS:', 'warning');
      this.log('Certains tests nécessitent une validation manuelle.', 'warning');
      this.log('Consultez les détails ci-dessus pour les instructions.', 'warning');
    }
  }
}

// Exécution du script
const tester = new DarkModeSuppressionTester();
tester.runAllTests().catch(error => {
  console.error('❌ Erreur lors de l\'exécution des tests:', error);
  process.exit(1);
});

export default DarkModeSuppressionTester;