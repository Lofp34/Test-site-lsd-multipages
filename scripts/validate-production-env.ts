#!/usr/bin/env tsx

/**
 * Script de validation des variables d'environnement pour la production
 * Vérifie que toutes les variables requises sont présentes et valides
 */

import { config } from 'dotenv';
import { existsSync } from 'fs';
import { resolve } from 'path';

// Charger les variables d'environnement
config();

interface EnvValidation {
  name: string;
  required: boolean;
  type: 'string' | 'number' | 'boolean' | 'url' | 'email' | 'api_key';
  description: string;
  validator?: (value: string) => boolean;
  defaultValue?: string;
}

const ENV_VALIDATIONS: EnvValidation[] = [
  // Variables Gemini (critiques)
  {
    name: 'GEMINI_API_KEY',
    required: true,
    type: 'api_key',
    description: 'Clé API Google Gemini',
    validator: (value) => value.startsWith('AIza') && value.length > 30
  },
  
  // Variables Next.js (critiques)
  {
    name: 'NEXT_PUBLIC_BASE_URL',
    required: true,
    type: 'url',
    description: 'URL de base de l\'application',
    validator: (value) => /^https?:\/\/.+/.test(value)
  },
  {
    name: 'NODE_ENV',
    required: true,
    type: 'string',
    description: 'Environnement d\'exécution',
    validator: (value) => ['development', 'production', 'test'].includes(value)
  },
  
  // Variables Supabase (importantes)
  {
    name: 'NEXT_PUBLIC_SUPABASE_URL',
    required: true,
    type: 'url',
    description: 'URL Supabase',
    validator: (value) => value.includes('supabase.co')
  },
  {
    name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    required: true,
    type: 'api_key',
    description: 'Clé anonyme Supabase',
    validator: (value) => value.startsWith('eyJ') && value.length > 100
  },
  {
    name: 'SUPABASE_SERVICE_ROLE_KEY',
    required: true,
    type: 'api_key',
    description: 'Clé service role Supabase',
    validator: (value) => value.startsWith('eyJ') && value.length > 100
  },
  
  // Variables SendGrid (importantes pour notifications)
  {
    name: 'SENDGRID_API_KEY',
    required: true,
    type: 'api_key',
    description: 'Clé API SendGrid',
    validator: (value) => value.startsWith('SG.') && value.length > 50
  },
  {
    name: 'SENDGRID_FROM_EMAIL',
    required: true,
    type: 'email',
    description: 'Email expéditeur SendGrid',
    validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  },
  {
    name: 'ADMIN_EMAIL',
    required: true,
    type: 'email',
    description: 'Email administrateur',
    validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  },
  
  // Variables optionnelles mais recommandées
  {
    name: 'GITHUB_TOKEN',
    required: false,
    type: 'api_key',
    description: 'Token GitHub pour fallback',
    validator: (value) => value.startsWith('ghp_') || value.startsWith('github_pat_')
  },
  {
    name: 'VERCEL_API_TOKEN',
    required: false,
    type: 'api_key',
    description: 'Token Vercel pour monitoring',
    validator: (value) => value.length > 20
  },
  
  // Variables de configuration
  {
    name: 'AUDIT_SCHEDULE_ENABLED',
    required: false,
    type: 'boolean',
    description: 'Activation des audits programmés',
    defaultValue: 'true'
  },
  {
    name: 'AUDIT_MAX_REQUESTS_PER_DAY',
    required: false,
    type: 'number',
    description: 'Limite quotidienne des requêtes d\'audit',
    defaultValue: '100'
  }
];

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  missing: string[];
  summary: {
    total: number;
    valid: number;
    invalid: number;
    missing: number;
    warnings: number;
  };
}

class EnvironmentValidator {
  private results: ValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
    missing: [],
    summary: {
      total: 0,
      valid: 0,
      invalid: 0,
      missing: 0,
      warnings: 0
    }
  };

  /**
   * Valide toutes les variables d'environnement
   */
  validate(): ValidationResult {
    console.log('🔍 Validation des variables d\'environnement...\n');

    for (const validation of ENV_VALIDATIONS) {
      this.validateVariable(validation);
    }

    this.generateSummary();
    this.displayResults();

    return this.results;
  }

  /**
   * Valide une variable d'environnement spécifique
   */
  private validateVariable(validation: EnvValidation): void {
    this.results.summary.total++;
    
    const value = process.env[validation.name];

    // Vérifier si la variable est présente
    if (!value) {
      if (validation.required) {
        this.results.errors.push(
          `❌ ${validation.name}: Variable requise manquante - ${validation.description}`
        );
        this.results.missing.push(validation.name);
        this.results.summary.missing++;
        this.results.valid = false;
      } else {
        this.results.warnings.push(
          `⚠️  ${validation.name}: Variable optionnelle manquante - ${validation.description}`
        );
        this.results.summary.warnings++;
        
        // Utiliser la valeur par défaut si disponible
        if (validation.defaultValue) {
          process.env[validation.name] = validation.defaultValue;
          console.log(`📝 ${validation.name}: Utilisation de la valeur par défaut: ${validation.defaultValue}`);
        }
      }
      return;
    }

    // Valider le type et le format
    const isValid = this.validateType(value, validation);
    
    if (isValid) {
      this.results.summary.valid++;
      console.log(`✅ ${validation.name}: Valide`);
    } else {
      this.results.errors.push(
        `❌ ${validation.name}: Format invalide - ${validation.description}`
      );
      this.results.summary.invalid++;
      this.results.valid = false;
    }
  }

  /**
   * Valide le type et le format d'une valeur
   */
  private validateType(value: string, validation: EnvValidation): boolean {
    // Validation personnalisée si fournie
    if (validation.validator) {
      return validation.validator(value);
    }

    // Validations par type
    switch (validation.type) {
      case 'string':
        return value.length > 0;
      
      case 'number':
        return !isNaN(Number(value));
      
      case 'boolean':
        return ['true', 'false', '1', '0'].includes(value.toLowerCase());
      
      case 'url':
        try {
          new URL(value);
          return true;
        } catch {
          return false;
        }
      
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      
      case 'api_key':
        return value.length > 10 && !value.includes(' ');
      
      default:
        return true;
    }
  }

  /**
   * Génère le résumé des résultats
   */
  private generateSummary(): void {
    // Vérifications supplémentaires pour la production
    if (process.env.NODE_ENV === 'production') {
      this.validateProductionSpecific();
    }

    // Vérifier la cohérence des URLs
    this.validateUrlConsistency();
    
    // Vérifier les permissions de fichiers sensibles
    this.validateFilePermissions();
  }

  /**
   * Validations spécifiques à la production
   */
  private validateProductionSpecific(): void {
    // Vérifier que les URLs utilisent HTTPS
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (baseUrl && !baseUrl.startsWith('https://')) {
      this.results.errors.push(
        '❌ NEXT_PUBLIC_BASE_URL: Doit utiliser HTTPS en production'
      );
      this.results.valid = false;
    }

    // Vérifier que les clés API ne sont pas des valeurs de développement
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey && (geminiKey.includes('test') || geminiKey.includes('dev'))) {
      this.results.warnings.push(
        '⚠️  GEMINI_API_KEY: Semble être une clé de développement'
      );
      this.results.summary.warnings++;
    }

    // Vérifier la configuration de sécurité
    if (!process.env.SENDGRID_API_KEY) {
      this.results.warnings.push(
        '⚠️  Notifications par email désactivées (SENDGRID_API_KEY manquante)'
      );
      this.results.summary.warnings++;
    }
  }

  /**
   * Valide la cohérence des URLs
   */
  private validateUrlConsistency(): void {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (baseUrl && supabaseUrl) {
      const baseDomain = new URL(baseUrl).hostname;
      const supabaseDomain = new URL(supabaseUrl).hostname;

      // Vérifier que les domaines sont cohérents (même environnement)
      if (baseDomain.includes('localhost') !== supabaseDomain.includes('localhost')) {
        this.results.warnings.push(
          '⚠️  Incohérence entre BASE_URL et SUPABASE_URL (environnements différents)'
        );
        this.results.summary.warnings++;
      }
    }
  }

  /**
   * Valide les permissions des fichiers sensibles
   */
  private validateFilePermissions(): void {
    const sensitiveFiles = ['.env', '.env.local', '.env.production'];
    
    for (const file of sensitiveFiles) {
      const filePath = resolve(process.cwd(), file);
      if (existsSync(filePath)) {
        // En production, vérifier que les fichiers .env ne sont pas accessibles publiquement
        // Cette vérification est simplifiée - en réalité, il faudrait vérifier les permissions système
        console.log(`📁 Fichier sensible détecté: ${file}`);
      }
    }
  }

  /**
   * Affiche les résultats de validation
   */
  private displayResults(): void {
    console.log('\n' + '='.repeat(60));
    console.log('📊 RÉSUMÉ DE LA VALIDATION');
    console.log('='.repeat(60));
    
    console.log(`Total des variables vérifiées: ${this.results.summary.total}`);
    console.log(`✅ Valides: ${this.results.summary.valid}`);
    console.log(`❌ Invalides: ${this.results.summary.invalid}`);
    console.log(`❓ Manquantes: ${this.results.summary.missing}`);
    console.log(`⚠️  Avertissements: ${this.results.summary.warnings}`);

    if (this.results.errors.length > 0) {
      console.log('\n🚨 ERREURS:');
      this.results.errors.forEach(error => console.log(error));
    }

    if (this.results.warnings.length > 0) {
      console.log('\n⚠️  AVERTISSEMENTS:');
      this.results.warnings.forEach(warning => console.log(warning));
    }

    if (this.results.missing.length > 0) {
      console.log('\n📝 VARIABLES MANQUANTES:');
      this.results.missing.forEach(missing => {
        const validation = ENV_VALIDATIONS.find(v => v.name === missing);
        console.log(`- ${missing}: ${validation?.description || 'Description non disponible'}`);
      });
    }

    console.log('\n' + '='.repeat(60));
    
    if (this.results.valid) {
      console.log('🎉 VALIDATION RÉUSSIE - Toutes les variables critiques sont présentes et valides');
    } else {
      console.log('💥 VALIDATION ÉCHOUÉE - Des variables critiques sont manquantes ou invalides');
      console.log('🔧 Corrigez les erreurs avant de déployer en production');
    }
    
    console.log('='.repeat(60));
  }

  /**
   * Génère un fichier de configuration d'exemple
   */
  generateExampleEnv(): void {
    console.log('\n📝 Génération du fichier .env.example...');
    
    const exampleContent = ENV_VALIDATIONS.map(validation => {
      const comment = `# ${validation.description}${validation.required ? ' (REQUIS)' : ' (OPTIONNEL)'}`;
      const value = validation.defaultValue || 
                   (validation.type === 'api_key' ? 'your_api_key_here' :
                    validation.type === 'url' ? 'https://example.com' :
                    validation.type === 'email' ? 'admin@example.com' :
                    'your_value_here');
      
      return `${comment}\n${validation.name}=${value}`;
    }).join('\n\n');

    console.log('Contenu du .env.example:');
    console.log('-'.repeat(40));
    console.log(exampleContent);
    console.log('-'.repeat(40));
  }
}

// Exécution du script
async function main() {
  const validator = new EnvironmentValidator();
  const results = validator.validate();

  // Générer l'exemple si demandé
  if (process.argv.includes('--generate-example')) {
    validator.generateExampleEnv();
  }

  // Sortir avec le code d'erreur approprié
  process.exit(results.valid ? 0 : 1);
}

// Exécuter seulement si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { EnvironmentValidator, ENV_VALIDATIONS };
export type { ValidationResult, EnvValidation };