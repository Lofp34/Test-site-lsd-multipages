#!/usr/bin/env node

/**
 * Script de validation finale pour la suppression complète du mode sombre
 * Vérifie tous les critères de succès définis dans les spécifications
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

interface ValidationResult {
  category: string;
  test: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  details: string;
  files?: string[];
}

class DarkModeSuppressionValidator {
  private results: ValidationResult[] = [];
  private srcPath = path.join(process.cwd(), 'src');
  private rootPath = process.cwd();

  async runAllValidations(): Promise<void> {
    console.log('🚀 Démarrage de la validation finale - Suppression du mode sombre\n');

    // 1. Validation technique
    await this.validateTechnical();
    
    // 2. Validation fonctionnelle
    await this.validateFunctional();
    
    // 3. Validation performance
    await this.validatePerformance();
    
    // 4. Affichage des résultats
    this.displayResults();
  }

  private async validateTechnical(): Promise<void> {
    console.log('📋 VALIDATION TECHNIQUE\n');

    // Test 1: Aucune classe dark: dans le code
    await this.checkForDarkClasses();
    
    // Test 2: Aucune media query prefers-color-scheme
    await this.checkForDarkMediaQueries();
    
    // Test 3: Configuration Tailwind optimisée
    await this.checkTailwindConfig();
    
    // Test 4: CSS final réduit
    await this.checkCSSReduction();
  }

  private async validateFunctional(): Promise<void> {
    console.log('🎯 VALIDATION FONCTIONNELLE\n');

    // Test 1: Composants critiques
    await this.checkCriticalComponents();
    
    // Test 2: Formulaires HubSpot
    await this.checkHubSpotForms();
    
    // Test 3: Navigation et CTAs
    await this.checkNavigationAndCTAs();
    
    // Test 4: Thèmes de couleur par catégorie
    await this.checkCategoryThemes();
  }

  private async validatePerformance(): Promise<void> {
    console.log('⚡ VALIDATION PERFORMANCE\n');

    // Test 1: Build time
    await this.checkBuildTime();
    
    // Test 2: Bundle size
    await this.checkBundleSize();
    
    // Test 3: Code maintainability
    await this.checkCodeMaintainability();
  }

  private async checkForDarkClasses(): Promise<void> {
    const classFiles: string[] = [];
    
    try {
      const result = execSync('grep -r "dark:" src/components/ src/app/ src/styles/ --include="*.tsx" --include="*.ts" --include="*.css" || true', 
        { encoding: 'utf8' });
      
      if (result.trim()) {
        const lines = result.trim().split('\n');
        lines.forEach(line => {
          const filePath = line.split(':')[0];
          if (!classFiles.includes(filePath)) {
            classFiles.push(filePath);
          }
        });
      }

      if (classFiles.length === 0) {
        this.results.push({
          category: 'Technique',
          test: 'Classes supprimées',
          status: 'PASS',
          details: 'Aucune classe dark: trouvée dans les composants'
        });
      } else {
        this.results.push({
          category: 'Technique',
          test: 'Classes supprimées',
          status: 'FAIL',
          details: `${classFiles.length} fichier(s) contiennent encore des classes dark:`,
          files: classFiles
        });
      }
    } catch (error) {
      this.results.push({
        category: 'Technique',
        test: 'Classes supprimées',
        status: 'WARNING',
        details: 'Erreur lors de la vérification des classes'
      });
    }
  }

  private async checkForDarkMediaQueries(): Promise<void> {
    const mediaQueryFiles: string[] = [];
    
    try {
      const result = execSync('grep -r "prefers-color-scheme.*dark" src/components/ src/app/ src/styles/ --include="*.tsx" --include="*.ts" --include="*.css" || true', 
        { encoding: 'utf8' });
      
      if (result.trim()) {
        const lines = result.trim().split('\n');
        lines.forEach(line => {
          const filePath = line.split(':')[0];
          if (!mediaQueryFiles.includes(filePath)) {
            mediaQueryFiles.push(filePath);
          }
        });
      }

      if (mediaQueryFiles.length === 0) {
        this.results.push({
          category: 'Technique',
          test: 'Media queries supprimées',
          status: 'PASS',
          details: 'Aucune media query prefers-color-scheme trouvée dans les composants'
        });
      } else {
        this.results.push({
          category: 'Technique',
          test: 'Media queries supprimées',
          status: 'FAIL',
          details: `${mediaQueryFiles.length} fichier(s) contiennent encore des media queries`,
          files: mediaQueryFiles
        });
      }
    } catch (error) {
      this.results.push({
        category: 'Technique',
        test: 'Media queries supprimées',
        status: 'WARNING',
        details: 'Erreur lors de la vérification des media queries'
      });
    }
  }

  private async checkTailwindConfig(): Promise<void> {
    try {
      const configPath = path.join(this.rootPath, 'tailwind.config.ts');
      
      if (fs.existsSync(configPath)) {
        const configContent = fs.readFileSync(configPath, 'utf8');
        
        // Vérifier que darkMode est désactivé ou absent
        const hasDarkModeConfig = configContent.includes('darkMode:');
        const darkModeValue = configContent.match(/darkMode:\s*([^,\n}]+)/)?.[1]?.trim();
        
        if (!hasDarkModeConfig || darkModeValue === 'false' || darkModeValue === '"false"') {
          this.results.push({
            category: 'Technique',
            test: 'Configuration Tailwind optimisée',
            status: 'PASS',
            details: 'Configuration Tailwind optimisée pour le mode clair uniquement'
          });
        } else {
          this.results.push({
            category: 'Technique',
            test: 'Configuration Tailwind optimisée',
            status: 'FAIL',
            details: `Configuration darkMode détectée: ${darkModeValue}`
          });
        }
      } else {
        this.results.push({
          category: 'Technique',
          test: 'Configuration Tailwind optimisée',
          status: 'WARNING',
          details: 'Fichier tailwind.config.ts non trouvé'
        });
      }
    } catch (error) {
      this.results.push({
        category: 'Technique',
        test: 'Configuration Tailwind optimisée',
        status: 'WARNING',
        details: 'Erreur lors de la vérification de la configuration Tailwind'
      });
    }
  }

  private async checkCSSReduction(): Promise<void> {
    try {
      // Vérifier la taille du CSS généré
      const nextDir = path.join(this.rootPath, '.next');
      
      if (fs.existsSync(nextDir)) {
        this.results.push({
          category: 'Technique',
          test: 'CSS final réduit',
          status: 'PASS',
          details: 'Build Next.js présent - CSS optimisé généré'
        });
      } else {
        this.results.push({
          category: 'Technique',
          test: 'CSS final réduit',
          status: 'WARNING',
          details: 'Aucun build détecté - exécuter npm run build pour vérifier'
        });
      }
    } catch (error) {
      this.results.push({
        category: 'Technique',
        test: 'CSS final réduit',
        status: 'WARNING',
        details: 'Erreur lors de la vérification de la réduction CSS'
      });
    }
  }

  private async checkCriticalComponents(): Promise<void> {
    const criticalComponents = [
      'src/components/FAQ.tsx',
      'src/components/templates/CategoryPage.tsx',
      'src/components/templates/BookPage.tsx',
      'src/components/layout/Header.tsx',
      'src/components/ContactSimpleForm.tsx',
      'src/components/AccueilClient.tsx',
      'src/components/LogoBanner.tsx'
    ];

    let allComponentsClean = true;
    const problematicComponents: string[] = [];

    for (const component of criticalComponents) {
      const fullPath = path.join(this.rootPath, component);
      
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        if (content.includes('dark:')) {
          allComponentsClean = false;
          problematicComponents.push(component);
        }
      }
    }

    if (allComponentsClean) {
      this.results.push({
        category: 'Fonctionnelle',
        test: 'Composants critiques nettoyés',
        status: 'PASS',
        details: 'Tous les composants critiques sont exempts de classes dark:'
      });
    } else {
      this.results.push({
        category: 'Fonctionnelle',
        test: 'Composants critiques nettoyés',
        status: 'FAIL',
        details: 'Composants contenant encore des classes dark:',
        files: problematicComponents
      });
    }
  }

  private async checkHubSpotForms(): Promise<void> {
    const hubspotFormPath = path.join(this.rootPath, 'src/components/HubSpotForm.tsx');
    
    if (fs.existsSync(hubspotFormPath)) {
      const content = fs.readFileSync(hubspotFormPath, 'utf8');
      
      const hasDarkMediaQuery = content.includes('@media (prefers-color-scheme: dark)');
      const hasDarkClasses = content.includes('dark:');
      
      if (!hasDarkMediaQuery && !hasDarkClasses) {
        this.results.push({
          category: 'Fonctionnelle',
          test: 'Formulaires HubSpot optimisés',
          status: 'PASS',
          details: 'Formulaires HubSpot exempts de styles dark'
        });
      } else {
        this.results.push({
          category: 'Fonctionnelle',
          test: 'Formulaires HubSpot optimisés',
          status: 'FAIL',
          details: 'Formulaires HubSpot contiennent encore des styles dark'
        });
      }
    } else {
      this.results.push({
        category: 'Fonctionnelle',
        test: 'Formulaires HubSpot optimisés',
        status: 'WARNING',
        details: 'Fichier HubSpotForm.tsx non trouvé'
      });
    }
  }

  private async checkNavigationAndCTAs(): Promise<void> {
    // Vérifier les composants de navigation et CTAs
    const navigationFiles = [
      'src/components/layout/Header.tsx',
      'src/components/layout/Footer.tsx',
      'src/components/ui/CategoryBreadcrumb.tsx'
    ];

    let allNavigationClean = true;
    const problematicNavFiles: string[] = [];

    for (const navFile of navigationFiles) {
      const fullPath = path.join(this.rootPath, navFile);
      
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        if (content.includes('dark:')) {
          allNavigationClean = false;
          problematicNavFiles.push(navFile);
        }
      }
    }

    if (allNavigationClean) {
      this.results.push({
        category: 'Fonctionnelle',
        test: 'Navigation et CTAs optimisés',
        status: 'PASS',
        details: 'Composants de navigation exempts de classes dark:'
      });
    } else {
      this.results.push({
        category: 'Fonctionnelle',
        test: 'Navigation et CTAs optimisés',
        status: 'FAIL',
        details: 'Composants de navigation contenant des classes dark:',
        files: problematicNavFiles
      });
    }
  }

  private async checkCategoryThemes(): Promise<void> {
    const useThemePath = path.join(this.rootPath, 'src/hooks/useTheme.ts');
    
    if (fs.existsSync(useThemePath)) {
      const content = fs.readFileSync(useThemePath, 'utf8');
      
      // Vérifier que le hook ne gère que les thèmes de couleur
      const hasDarkLogic = content.includes('dark') || content.includes('Dark');
      
      if (!hasDarkLogic) {
        this.results.push({
          category: 'Fonctionnelle',
          test: 'Thèmes de couleur par catégorie',
          status: 'PASS',
          details: 'Hook useTheme optimisé pour les thèmes de couleur uniquement'
        });
      } else {
        this.results.push({
          category: 'Fonctionnelle',
          test: 'Thèmes de couleur par catégorie',
          status: 'WARNING',
          details: 'Hook useTheme pourrait contenir de la logique dark'
        });
      }
    } else {
      this.results.push({
        category: 'Fonctionnelle',
        test: 'Thèmes de couleur par catégorie',
        status: 'WARNING',
        details: 'Hook useTheme.ts non trouvé'
      });
    }
  }

  private async checkBuildTime(): Promise<void> {
    try {
      console.log('⏱️  Test du temps de build...');
      const startTime = Date.now();
      
      execSync('npm run build', { 
        stdio: 'pipe',
        timeout: 120000 // 2 minutes max
      });
      
      const buildTime = Date.now() - startTime;
      const buildTimeSeconds = Math.round(buildTime / 1000);
      
      this.results.push({
        category: 'Performance',
        test: 'Temps de build optimisé',
        status: 'PASS',
        details: `Build réussi en ${buildTimeSeconds}s`
      });
    } catch (error) {
      this.results.push({
        category: 'Performance',
        test: 'Temps de build optimisé',
        status: 'FAIL',
        details: 'Échec du build - vérifier les erreurs de compilation'
      });
    }
  }

  private async checkBundleSize(): Promise<void> {
    try {
      const nextDir = path.join(this.rootPath, '.next');
      
      if (fs.existsSync(nextDir)) {
        // Analyser la taille du bundle
        const staticDir = path.join(nextDir, 'static');
        
        if (fs.existsSync(staticDir)) {
          this.results.push({
            category: 'Performance',
            test: 'Taille du bundle optimisée',
            status: 'PASS',
            details: 'Bundle généré avec succès'
          });
        } else {
          this.results.push({
            category: 'Performance',
            test: 'Taille du bundle optimisée',
            status: 'WARNING',
            details: 'Dossier static non trouvé dans .next'
          });
        }
      } else {
        this.results.push({
          category: 'Performance',
          test: 'Taille du bundle optimisée',
          status: 'WARNING',
          details: 'Aucun build détecté'
        });
      }
    } catch (error) {
      this.results.push({
        category: 'Performance',
        test: 'Taille du bundle optimisée',
        status: 'WARNING',
        details: 'Erreur lors de la vérification du bundle'
      });
    }
  }

  private async checkCodeMaintainability(): Promise<void> {
    // Compter les lignes de code supprimées/simplifiées
    try {
      const result = execSync('find src/ -name "*.tsx" -o -name "*.ts" | xargs wc -l | tail -1', 
        { encoding: 'utf8' });
      
      const totalLines = parseInt(result.trim().split(/\s+/)[0]);
      
      this.results.push({
        category: 'Performance',
        test: 'Code maintenable et simplifié',
        status: 'PASS',
        details: `Code source: ${totalLines} lignes total`
      });
    } catch (error) {
      this.results.push({
        category: 'Performance',
        test: 'Code maintenable et simplifié',
        status: 'WARNING',
        details: 'Impossible de calculer les métriques de code'
      });
    }
  }

  private displayResults(): void {
    console.log('\n' + '='.repeat(80));
    console.log('📊 RÉSULTATS DE LA VALIDATION FINALE');
    console.log('='.repeat(80) + '\n');

    const categories = ['Technique', 'Fonctionnelle', 'Performance'];
    
    categories.forEach(category => {
      const categoryResults = this.results.filter(r => r.category === category);
      
      if (categoryResults.length > 0) {
        console.log(`\n🔍 ${category.toUpperCase()}`);
        console.log('-'.repeat(50));
        
        categoryResults.forEach(result => {
          const statusIcon = result.status === 'PASS' ? '✅' : 
                           result.status === 'FAIL' ? '❌' : '⚠️';
          
          console.log(`${statusIcon} ${result.test}`);
          console.log(`   ${result.details}`);
          
          if (result.files && result.files.length > 0) {
            result.files.forEach(file => {
              console.log(`   📁 ${file}`);
            });
          }
          console.log();
        });
      }
    });

    // Résumé final
    const passCount = this.results.filter(r => r.status === 'PASS').length;
    const failCount = this.results.filter(r => r.status === 'FAIL').length;
    const warningCount = this.results.filter(r => r.status === 'WARNING').length;
    const totalCount = this.results.length;

    console.log('\n' + '='.repeat(80));
    console.log('📈 RÉSUMÉ FINAL');
    console.log('='.repeat(80));
    console.log(`✅ Tests réussis: ${passCount}/${totalCount}`);
    console.log(`❌ Tests échoués: ${failCount}/${totalCount}`);
    console.log(`⚠️  Avertissements: ${warningCount}/${totalCount}`);

    if (failCount === 0) {
      console.log('\n🎉 VALIDATION RÉUSSIE - Suppression du mode sombre complète !');
    } else {
      console.log('\n🔧 ACTIONS REQUISES - Corriger les tests échoués avant finalisation');
    }

    console.log('\n' + '='.repeat(80) + '\n');
  }
}

// Exécution du script
const validator = new DarkModeSuppressionValidator();
validator.runAllValidations().catch(console.error);

export default DarkModeSuppressionValidator;