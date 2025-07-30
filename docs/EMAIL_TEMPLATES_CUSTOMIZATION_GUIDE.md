# Guide de personnalisation des templates d'emails

## 📧 Vue d'ensemble des templates

Le système d'audit utilise 4 types d'emails principaux :

1. **Demandes de ressources** → Admin (Laurent Serre)
2. **Alertes liens morts** → Admin (Laurent Serre)  
3. **Réponses automatiques** → Utilisateurs
4. **Rapports hebdomadaires** → Admin (Laurent Serre)

## 📁 Structure des templates

```
src/lib/email/templates/
├── resource-request.html     # Demande de ressource
├── audit-alert.html         # Alerte liens morts
├── auto-response.html        # Réponse automatique
└── weekly-report.html        # Rapport hebdomadaire
```

## 🎨 Charte graphique des emails

### Couleurs principales

```css
:root {
  --primary-bg: #F2F5F7;        /* Fond principal */
  --primary-title: #1B365D;     /* Bleu encre - Titres */
  --primary-accent: #00BDA4;    /* Vert menthe - Accents */
  --primary-secondary: #414141; /* Gris anthracite */
  --primary-emotion: #FFAA5C;   /* Orange doux - Émotions */
  
  /* Couleurs d'alerte */
  --alert-critical: #EF4444;    /* Rouge critique */
  --alert-warning: #F97316;     /* Orange avertissement */
  --alert-success: #10B981;     /* Vert succès */
}
```

### Typographie

```css
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
}

h1, h2, h3 {
  color: #1B365D;
  font-weight: bold;
}

.header {
  background: linear-gradient(135deg, #1B365D, #00BDA4);
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
```

## 📝 Template : Demande de ressource

### Variables disponibles

```typescript
interface ResourceRequestTemplateData {
  userEmail: string           // Email du demandeur
  resourceUrl: string         // URL de la ressource demandée
  sourceUrl: string          // Page où était le lien
  message?: string           // Message optionnel de l'utilisateur
  requestCount: number       // Nombre total de demandes pour cette ressource
  priority: string           // Priorité calculée (ÉLEVÉE, MOYENNE, FAIBLE)
  timestamp: string          // Date/heure de la demande
}
```

### Structure HTML

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle demande de ressource</title>
    <style>
        /* Styles CSS intégrés pour compatibilité email */
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; }
        .container { background: white; padding: 30px; border-radius: 10px; }
        .header { background: linear-gradient(135deg, #1B365D, #00BDA4); }
        .field { margin-bottom: 15px; padding: 10px; background: white; }
        .priority-badge { background: #00BDA4; color: white; padding: 5px 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚨 Nouvelle demande de ressource</h1>
            <p>Système d'audit automatique - Laurent Serre Développement</p>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="field-label">📧 Email du demandeur :</div>
                <div class="field-value">{{userEmail}}</div>
            </div>
            
            <div class="field">
                <div class="field-label">📄 Ressource demandée :</div>
                <div class="field-value">{{resourceUrl}}</div>
            </div>
            
            <!-- Plus de champs... -->
        </div>
        
        <div class="stats">
            <div class="stats-text">
                📈 Cette ressource a été demandée {{requestCount}} fois ce mois-ci.
                <span class="priority-badge">PRIORITÉ {{priority}}</span>
            </div>
        </div>
    </div>
</body>
</html>
```

### Personnalisation

Pour modifier le template :

1. **Éditez** `src/lib/email/templates/resource-request.html`
2. **Utilisez les variables** avec la syntaxe `{{variableName}}`
3. **Testez** avec `npm run test:sendgrid-service`
4. **Déployez** les changements

## 🚨 Template : Alerte liens morts

### Variables disponibles

```typescript
interface AuditAlertTemplateData {
  brokenLinksCount: number    // Nombre total de liens morts
  healthScore: number         // Score de santé (0-100%)
  healthScoreClass: string    // Classe CSS selon le score
  criticalLinks: BrokenLinkDetail[]  // Liens critiques uniquement
  reportUrl: string          // URL vers le rapport complet
  timestamp: string          // Date/heure de l'audit
}
```

### Priorités visuelles

```css
.broken-link {
  background: #FEF2F2;
  border-left: 4px solid #EF4444;
  padding: 15px;
  margin: 10px 0;
}

.critical { border-left-color: #DC2626; background: #FEF2F2; }
.high     { border-left-color: #F97316; background: #FFF7ED; }
.medium   { border-left-color: #EAB308; background: #FEFCE8; }
.low      { border-left-color: #6B7280; background: #F9FAFB; }
```

### Structure conditionnelle

```html
<div class="alert-header">
    <h1>🚨 {{brokenLinksCount}} liens morts détectés</h1>
    <p>Score de santé : <span class="{{healthScoreClass}}">{{healthScore}}%</span></p>
</div>

<div class="content">
    <h2>Liens critiques à corriger :</h2>
    
    {{#each criticalLinks}}
    <div class="broken-link {{priority}}">
        <strong>{{url}}</strong><br>
        <span class="error">{{error}} - Impact SEO: {{seoImpact}}/10</span><br>
        <small>Fichiers: {{sourceFiles}}</small>
        
        {{#if suggestedActions}}
        <div class="actions">
            <strong>Actions suggérées :</strong>
            <ul>
                {{#each suggestedActions}}
                <li>{{this}}</li>
                {{/each}}
            </ul>
        </div>
        {{/if}}
    </div>
    {{/each}}
</div>
```

## ✅ Template : Réponse automatique

### Variables disponibles

```typescript
interface AutoResponseTemplateData {
  resourceUrl: string         // Ressource demandée
  userFirstName?: string      // Prénom si disponible
  estimatedDelay?: string     // Délai estimé de création
  alternativeResources: Array<{
    title: string
    url: string
    description: string
  }>
}
```

### Ton et style

Le template de réponse automatique doit :
- ✅ **Rassurer** l'utilisateur
- 🎯 **Proposer des alternatives** pertinentes
- 📞 **Inviter au contact** direct
- 🏢 **Renforcer l'expertise** de Laurent Serre

### Structure personnalisée

```html
<div class="header">
    <h1>✅ Demande bien reçue !</h1>
    <p>Merci pour votre intérêt</p>
</div>

<div class="content">
    <p>{{#if userFirstName}}Bonjour {{userFirstName}}{{else}}Bonjour{{/if}},</p>
    
    <p>Merci d'avoir manifesté votre intérêt pour une ressource sur <strong>Laurent Serre Développement</strong>.</p>
    
    <div class="highlight-box">
        <p>✅ Votre demande a été transmise à Laurent Serre et sera traitée dans les plus brefs délais.</p>
    </div>
    
    <div class="resource-info">
        <h4>📄 Ressource demandée :</h4>
        <p>{{resourceUrl}}</p>
    </div>
    
    <p>En attendant, découvrez nos ressources disponibles :</p>
    
    <ul>
        {{#each alternativeResources}}
        <li>
            <strong>{{title}}</strong> : 
            <a href="{{url}}" style="color: #00BDA4;">{{description}}</a>
        </li>
        {{/each}}
    </ul>
</div>

<div class="signature">
    <h3>Laurent Serre</h3>
    <p>Expert en développement commercial PME</p>
    <p>20 ans d'expérience terrain • +500 PME accompagnées</p>
</div>
```

## 📊 Template : Rapport hebdomadaire

### Variables disponibles

```typescript
interface WeeklyReportTemplateData {
  weekPeriod: string          // "23-29 juillet 2025"
  summary: {
    totalLinks: number
    brokenLinks: number
    correctedLinks: number
    seoHealthScore: number
    healthScoreChange: number  // +/- par rapport à la semaine précédente
  }
  topIssues: BrokenLinkDetail[]
  corrections: CorrectionResult[]
  resourceRequests: {
    totalRequests: number
    mostRequested: Array<{
      url: string
      count: number
    }>
  }
  recommendations: string[]
  nextWeekActions: string[]
}
```

### Sections du rapport

```html
<div class="report-header">
    <h1>📊 Rapport hebdomadaire</h1>
    <p>Période : {{weekPeriod}}</p>
</div>

<!-- Section Résumé -->
<div class="summary-section">
    <h2>📈 Résumé de la semaine</h2>
    <div class="metrics-grid">
        <div class="metric">
            <span class="number">{{summary.totalLinks}}</span>
            <span class="label">Liens analysés</span>
        </div>
        <div class="metric">
            <span class="number">{{summary.brokenLinks}}</span>
            <span class="label">Liens morts</span>
        </div>
        <div class="metric">
            <span class="number">{{summary.correctedLinks}}</span>
            <span class="label">Corrections</span>
        </div>
        <div class="metric">
            <span class="number {{healthScoreClass}}">{{summary.seoHealthScore}}%</span>
            <span class="label">Score santé</span>
            {{#if summary.healthScoreChange}}
            <span class="change {{changeClass}}">
                {{#if summary.healthScoreChange > 0}}+{{/if}}{{summary.healthScoreChange}}%
            </span>
            {{/if}}
        </div>
    </div>
</div>

<!-- Section Problèmes principaux -->
{{#if topIssues}}
<div class="issues-section">
    <h2>🚨 Problèmes principaux</h2>
    {{#each topIssues}}
    <div class="issue-item">
        <strong>{{url}}</strong>
        <span class="priority-badge {{priority}}">{{priority}}</span>
        <p>{{error}} - Impact SEO: {{seoImpact}}/10</p>
    </div>
    {{/each}}
</div>
{{/if}}

<!-- Section Demandes de ressources -->
{{#if resourceRequests.totalRequests}}
<div class="requests-section">
    <h2>📧 Demandes de ressources</h2>
    <p>{{resourceRequests.totalRequests}} demandes reçues cette semaine</p>
    
    <h3>Ressources les plus demandées :</h3>
    <ul>
        {{#each resourceRequests.mostRequested}}
        <li><strong>{{url}}</strong> - {{count}} fois</li>
        {{/each}}
    </ul>
</div>
{{/if}}
```

## 🛠️ Outils de personnalisation

### Générateur de templates

Créez un script pour générer des templates personnalisés :

```typescript
// scripts/generate-email-template.ts
import fs from 'fs/promises'
import path from 'path'

interface TemplateConfig {
  name: string
  variables: Record<string, string>
  sections: string[]
  style: 'professional' | 'friendly' | 'urgent'
}

class EmailTemplateGenerator {
  async generateTemplate(config: TemplateConfig): Promise<string> {
    const baseTemplate = await this.loadBaseTemplate()
    const customizedTemplate = this.applyCustomizations(baseTemplate, config)
    
    const outputPath = path.join('src/lib/email/templates', `${config.name}.html`)
    await fs.writeFile(outputPath, customizedTemplate, 'utf-8')
    
    return outputPath
  }
  
  private applyCustomizations(template: string, config: TemplateConfig): string {
    // Logique de personnalisation
    return template
      .replace(/{{STYLE}}/g, this.getStyleForType(config.style))
      .replace(/{{SECTIONS}}/g, this.generateSections(config.sections))
  }
}
```

### Prévisualisation des templates

```typescript
// scripts/preview-email-template.ts
import { SendGridEmailService } from '@/lib/email/sendgrid-service'

async function previewTemplate(templateName: string, sampleData: any) {
  const emailService = new SendGridEmailService({
    apiKey: 'preview-mode',
    fromEmail: 'preview@example.com',
    fromName: 'Preview',
    adminEmail: 'preview@example.com'
  })
  
  const html = await emailService.renderTemplate(templateName, sampleData)
  
  // Sauvegarder pour prévisualisation
  await fs.writeFile(`preview-${templateName}.html`, html)
  console.log(`Prévisualisation sauvée : preview-${templateName}.html`)
}
```

## 🧪 Tests des templates

### Test de rendu

```typescript
// __tests__/email-templates.test.ts
describe('Email Templates', () => {
  it('should render resource request template correctly', () => {
    const data = {
      userEmail: 'test@example.com',
      resourceUrl: '/test-resource.pdf',
      requestCount: 5,
      priority: 'ÉLEVÉE'
    }
    
    const html = renderTemplate('resource-request', data)
    
    expect(html).toContain('test@example.com')
    expect(html).toContain('/test-resource.pdf')
    expect(html).toContain('5 fois')
    expect(html).toContain('PRIORITÉ ÉLEVÉE')
  })
})
```

### Test de compatibilité email

```bash
# Test avec différents clients email
npm run test:email-compatibility -- --template resource-request
npm run test:email-compatibility -- --template audit-alert
```

## 📱 Responsive design

### Media queries pour emails

```css
@media only screen and (max-width: 600px) {
  .container {
    width: 100% !important;
    padding: 15px !important;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr !important;
  }
  
  .field {
    padding: 8px !important;
    margin-bottom: 10px !important;
  }
  
  .priority-badge {
    display: block !important;
    text-align: center !important;
    margin-top: 10px !important;
  }
}
```

### Test sur appareils mobiles

Utilisez des outils comme :
- **Litmus** : Test multi-clients
- **Email on Acid** : Prévisualisation
- **Mailtrap** : Test en développement

## 🎨 Personnalisation avancée

### Variables CSS personnalisées

```css
:root {
  /* Couleurs de marque */
  --brand-primary: #1B365D;
  --brand-accent: #00BDA4;
  --brand-secondary: #414141;
  
  /* Espacements */
  --spacing-xs: 5px;
  --spacing-sm: 10px;
  --spacing-md: 15px;
  --spacing-lg: 20px;
  --spacing-xl: 30px;
  
  /* Typographie */
  --font-size-sm: 12px;
  --font-size-base: 14px;
  --font-size-lg: 16px;
  --font-size-xl: 18px;
  --font-size-2xl: 24px;
}
```

### Composants réutilisables

```html
<!-- Bouton CTA -->
<div class="cta-button">
  <a href="{{ctaUrl}}" style="
    background: var(--brand-accent);
    color: white;
    padding: 12px 24px;
    text-decoration: none;
    border-radius: 6px;
    display: inline-block;
    font-weight: bold;
  ">
    {{ctaText}}
  </a>
</div>

<!-- Badge de priorité -->
<span class="priority-badge priority-{{priority}}">
  {{priorityText}}
</span>

<!-- Section d'alerte -->
<div class="alert alert-{{type}}">
  <div class="alert-icon">{{icon}}</div>
  <div class="alert-content">{{content}}</div>
</div>
```

## 📋 Checklist de personnalisation

### Avant modification
- [ ] Sauvegarder les templates actuels
- [ ] Identifier les variables utilisées
- [ ] Tester le rendu actuel
- [ ] Préparer les données de test

### Pendant modification
- [ ] Respecter la charte graphique
- [ ] Maintenir la compatibilité mobile
- [ ] Utiliser les variables appropriées
- [ ] Tester sur différents clients email

### Après modification
- [ ] Valider le HTML/CSS
- [ ] Tester avec données réelles
- [ ] Vérifier l'accessibilité
- [ ] Déployer et monitorer

---

## 📞 Support

Pour toute question sur la personnalisation des templates :

1. **Documentation technique** : `docs/AUDIT_SYSTEM_TECHNICAL_GUIDE.md`
2. **Tests** : `npm run test:email-templates`
3. **Prévisualisation** : `npm run preview:email-templates`
4. **Support** : Créez une issue GitHub avec captures d'écran

---

*Guide de personnalisation des templates v1.0 - 30 juillet 2025*