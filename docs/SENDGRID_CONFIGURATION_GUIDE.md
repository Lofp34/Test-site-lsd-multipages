# Guide de configuration SendGrid

## 🚀 Configuration initiale SendGrid

### 1. Création du compte SendGrid

1. **Inscription** : Allez sur [sendgrid.com](https://sendgrid.com) et créez un compte
2. **Vérification** : Confirmez votre email et complétez la vérification
3. **Plan** : Choisissez le plan gratuit (100 emails/jour) ou payant selon vos besoins

### 2. Configuration du domaine d'envoi

#### Authentification du domaine

1. Dans SendGrid Dashboard → **Settings** → **Sender Authentication**
2. Cliquez sur **Authenticate Your Domain**
3. Sélectionnez votre DNS provider (ex: Cloudflare, OVH, etc.)
4. Entrez votre domaine : `laurentserre.com`
5. Copiez les enregistrements DNS fournis

#### Enregistrements DNS à ajouter

```dns
# CNAME Records
s1._domainkey.laurentserre.com → s1.domainkey.u123456.wl.sendgrid.net
s2._domainkey.laurentserre.com → s2.domainkey.u123456.wl.sendgrid.net

# MX Record (optionnel pour recevoir des emails)
mail.laurentserre.com → mx.sendgrid.net (priorité 10)
```

### 3. Création de la clé API

1. **Settings** → **API Keys** → **Create API Key**
2. **Nom** : `Laurent Serre Audit System`
3. **Permissions** : `Full Access` (ou `Mail Send` minimum)
4. **Copiez la clé** : `SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

⚠️ **Important** : Sauvegardez cette clé immédiatement, elle ne sera plus visible !

## 🔧 Configuration Vercel

### Variables d'environnement

Dans votre dashboard Vercel → **Settings** → **Environment Variables** :

```bash
# SendGrid Configuration
SENDGRID_API_KEY=SG.votre-cle-api-sendgrid
SENDGRID_FROM_EMAIL=noreply@laurentserre.com
SENDGRID_FROM_NAME=Système Audit - Laurent Serre
ADMIN_EMAIL=ls@laurentserre.com

# Configuration optionnelle
SENDGRID_TEMPLATE_ID_RESOURCE_REQUEST=d-xxxxxxxxxxxxxxxxx
SENDGRID_TEMPLATE_ID_AUDIT_ALERT=d-xxxxxxxxxxxxxxxxx
SENDGRID_TEMPLATE_ID_AUTO_RESPONSE=d-xxxxxxxxxxxxxxxxx
SENDGRID_TEMPLATE_ID_WEEKLY_REPORT=d-xxxxxxxxxxxxxxxxx
```

### Fichier .env.local (développement)

```bash
# .env.local
SENDGRID_API_KEY=SG.votre-cle-api-sendgrid
SENDGRID_FROM_EMAIL=noreply@laurentserre.com
SENDGRID_FROM_NAME=Système Audit - Laurent Serre
ADMIN_EMAIL=ls@laurentserre.com

# Test en développement
SENDGRID_SANDBOX_MODE=true
```

## 📧 Configuration des templates d'emails

### 1. Template de demande de ressource

**ID Template** : `d-resource-request-template`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle demande de ressource</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #1B365D, #00BDA4);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
        }
        .content {
            background: #F2F5F7;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #00BDA4;
        }
        .field {
            margin-bottom: 15px;
            padding: 10px;
            background: white;
            border-radius: 4px;
            border: 1px solid #e0e0e0;
        }
        .priority-badge {
            background: #00BDA4;
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚨 Nouvelle demande de ressource</h1>
            <p>Système d'audit automatique</p>
        </div>
        
        <div class="content">
            <div class="field">
                <strong>📧 Email du demandeur :</strong> {{userEmail}}
            </div>
            <div class="field">
                <strong>📄 Ressource demandée :</strong> {{resourceUrl}}
            </div>
            <div class="field">
                <strong>🌐 Page source :</strong> <a href="{{sourceUrl}}">{{sourceUrl}}</a>
            </div>
            <div class="field">
                <strong>📊 Nombre de demandes :</strong> {{requestCount}} fois
            </div>
            {{#if message}}
            <div class="field">
                <strong>💬 Message :</strong>
                <p style="font-style: italic;">{{message}}</p>
            </div>
            {{/if}}
        </div>
        
        <div style="text-align: center; margin: 20px 0;">
            <span class="priority-badge">PRIORITÉ {{priority}}</span>
        </div>
        
        <p style="text-align: center; color: #666; font-size: 12px;">
            Email généré automatiquement le {{timestamp}}
        </p>
    </div>
</body>
</html>
```

### 2. Template d'alerte liens morts

**ID Template** : `d-audit-alert-template`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Alerte - Liens morts détectés</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; }
        .alert-header { background: #EF4444; color: white; padding: 20px; text-align: center; }
        .broken-link { background: #FEF2F2; border-left: 4px solid #EF4444; padding: 15px; margin: 10px 0; }
        .critical { border-left-color: #DC2626; }
        .high { border-left-color: #F97316; }
        .medium { border-left-color: #EAB308; }
        .low { border-left-color: #6B7280; }
    </style>
</head>
<body>
    <div class="alert-header">
        <h1>🚨 {{brokenLinksCount}} liens morts détectés</h1>
        <p>Score de santé : {{healthScore}}%</p>
    </div>
    
    <div style="padding: 20px;">
        <h2>Liens critiques à corriger :</h2>
        
        {{#each criticalLinks}}
        <div class="broken-link {{priority}}">
            <strong>{{url}}</strong><br>
            <span style="color: #666;">{{error}} - Impact SEO: {{seoImpact}}/10</span><br>
            <small>Fichiers: {{sourceFiles}}</small>
        </div>
        {{/each}}
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="{{reportUrl}}" style="background: #00BDA4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                Voir le rapport complet
            </a>
        </div>
        
        <p style="color: #666; font-size: 12px; text-align: center;">
            Rapport généré le {{timestamp}}
        </p>
    </div>
</body>
</html>
```

### 3. Template de réponse automatique

**ID Template** : `d-auto-response-template`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Confirmation de votre demande</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #00BDA4, #059669); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #F2F5F7; margin: 20px 0; }
        .signature { background: #1B365D; color: white; padding: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>✅ Demande bien reçue !</h1>
        <p>Merci pour votre intérêt</p>
    </div>
    
    <div class="content">
        <p>Bonjour,</p>
        
        <p>Merci d'avoir manifesté votre intérêt pour une ressource sur <strong>Laurent Serre Développement</strong>.</p>
        
        <div style="background: #E8F5E8; border: 1px solid #00BDA4; padding: 15px; border-radius: 6px;">
            <p style="margin: 0; color: #059669; font-weight: bold;">
                ✅ Votre demande a été transmise à Laurent Serre et sera traitée dans les plus brefs délais.
            </p>
        </div>
        
        <div style="background: white; padding: 15px; border-radius: 6px; margin: 15px 0;">
            <h4 style="color: #1B365D; margin: 0 0 10px 0;">📄 Ressource demandée :</h4>
            <p style="margin: 0; word-break: break-all;">{{resourceUrl}}</p>
        </div>
        
        <p>En attendant, découvrez nos ressources disponibles :</p>
        <ul>
            <li><a href="https://laurentserre.com/formation-commerciale-pme">Formations commerciales</a></li>
            <li><a href="https://laurentserre.com/ressources">Ressources gratuites</a></li>
            <li><a href="https://laurentserre.com/bootcamp-commercial-intensif">Bootcamp intensif</a></li>
        </ul>
    </div>
    
    <div class="signature">
        <h3 style="color: #00BDA4;">Laurent Serre</h3>
        <p>Expert en développement commercial PME</p>
        <p style="font-size: 14px; opacity: 0.8;">20 ans d'expérience • +500 PME accompagnées</p>
    </div>
</body>
</html>
```

## 🧪 Tests et validation

### Test de configuration

Créez un script de test :

```typescript
// scripts/test-sendgrid-config.ts
import { SendGridEmailService } from '@/lib/email/sendgrid-service'

async function testSendGridConfig() {
  const emailService = new SendGridEmailService({
    apiKey: process.env.SENDGRID_API_KEY!,
    fromEmail: process.env.SENDGRID_FROM_EMAIL!,
    fromName: process.env.SENDGRID_FROM_NAME!,
    adminEmail: process.env.ADMIN_EMAIL!
  })

  // Test d'envoi simple
  const testRequest = {
    userEmail: 'test@example.com',
    resourceUrl: '/test-resource.pdf',
    sourceUrl: 'https://laurentserre.com/test',
    message: 'Test de configuration SendGrid',
    requestCount: 1
  }

  try {
    const success = await emailService.sendResourceRequest(testRequest)
    console.log(success ? '✅ Test réussi' : '❌ Test échoué')
  } catch (error) {
    console.error('❌ Erreur de configuration:', error)
  }
}

testSendGridConfig()
```

### Commande de test

```bash
# Test de la configuration
npm run test:sendgrid-config

# Test avec sandbox mode (ne pas envoyer réellement)
SENDGRID_SANDBOX_MODE=true npm run test:sendgrid-config
```

## 🔍 Monitoring et debugging

### Logs SendGrid

1. **Activity Feed** : Dashboard SendGrid → **Activity**
2. **Email Activity** : Voir les emails envoyés, ouverts, cliqués
3. **Suppressions** : Gérer les bounces et unsubscribes
4. **Statistics** : Métriques d'envoi et de délivrabilité

### Debugging courant

#### ❌ Erreur "Unauthorized"

```
Error: HTTP Error 401: Unauthorized
```

**Solutions :**
1. Vérifiez que `SENDGRID_API_KEY` commence par `SG.`
2. Confirmez les permissions de la clé API
3. Régénérez une nouvelle clé si nécessaire

#### ❌ Erreur "From address not verified"

```
Error: The from address does not match a verified Sender Identity
```

**Solutions :**
1. Vérifiez l'authentification du domaine
2. Utilisez une adresse email du domaine authentifié
3. Ajoutez l'adresse dans **Sender Authentication**

#### ❌ Emails en spam

**Solutions :**
1. Configurez SPF, DKIM, DMARC
2. Évitez les mots-clés spam dans le sujet
3. Maintenez une bonne réputation d'envoi
4. Utilisez des templates professionnels

### Enregistrements DNS complets

```dns
# SPF Record
laurentserre.com TXT "v=spf1 include:sendgrid.net ~all"

# DMARC Record  
_dmarc.laurentserre.com TXT "v=DMARC1; p=quarantine; rua=mailto:dmarc@laurentserre.com"

# DKIM Records (générés par SendGrid)
s1._domainkey.laurentserre.com CNAME s1.domainkey.u123456.wl.sendgrid.net
s2._domainkey.laurentserre.com CNAME s2.domainkey.u123456.wl.sendgrid.net
```

## 📊 Métriques et analytics

### Suivi des performances

```typescript
// Métriques SendGrid personnalisées
class SendGridAnalytics {
  static async trackEmailMetrics() {
    const stats = await sgMail.request({
      method: 'GET',
      url: '/v3/stats',
      qs: {
        start_date: '2025-07-01',
        end_date: '2025-07-31',
        aggregated_by: 'day'
      }
    })
    
    return {
      delivered: stats[0].stats.reduce((sum, day) => sum + day.metrics.delivered, 0),
      opens: stats[0].stats.reduce((sum, day) => sum + day.metrics.unique_opens, 0),
      clicks: stats[0].stats.reduce((sum, day) => sum + day.metrics.unique_clicks, 0),
      bounces: stats[0].stats.reduce((sum, day) => sum + day.metrics.bounces, 0)
    }
  }
}
```

### Dashboard personnalisé

Intégrez les métriques SendGrid dans votre dashboard admin :

```typescript
// components/admin/SendGridMetrics.tsx
export function SendGridMetrics() {
  const [metrics, setMetrics] = useState(null)
  
  useEffect(() => {
    fetch('/api/sendgrid-metrics')
      .then(res => res.json())
      .then(setMetrics)
  }, [])
  
  return (
    <div className="grid grid-cols-4 gap-4">
      <MetricCard title="Emails envoyés" value={metrics?.delivered} />
      <MetricCard title="Taux d'ouverture" value={`${metrics?.openRate}%`} />
      <MetricCard title="Taux de clic" value={`${metrics?.clickRate}%`} />
      <MetricCard title="Bounces" value={metrics?.bounces} />
    </div>
  )
}
```

## 🔒 Sécurité et bonnes pratiques

### Sécurisation des clés API

1. **Rotation régulière** : Changez les clés API tous les 3-6 mois
2. **Permissions minimales** : N'accordez que les permissions nécessaires
3. **Environnements séparés** : Clés différentes pour dev/staging/prod
4. **Monitoring** : Surveillez l'utilisation des clés API
5. **Stockage sécurisé** : Utilisez des gestionnaires de secrets (Vercel, AWS Secrets Manager)

### Configuration des webhooks

```typescript
// app/api/sendgrid-webhook/route.ts
import crypto from 'crypto';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('X-Twilio-Email-Event-Webhook-Signature');
  
  // Vérifier la signature du webhook
  const expectedSignature = crypto
    .createHmac('sha256', process.env.SENDGRID_WEBHOOK_SECRET!)
    .update(body)
    .digest('base64');
  
  if (signature !== expectedSignature) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  const events = JSON.parse(body);
  
  for (const event of events) {
    switch (event.event) {
      case 'bounce':
        await handleBounce(event);
        break;
      case 'unsubscribe':
        await handleUnsubscribe(event);
        break;
      case 'spam_report':
        await handleSpamReport(event);
        break;
      case 'delivered':
        await trackDelivery(event);
        break;
      case 'open':
        await trackOpen(event);
        break;
      case 'click':
        await trackClick(event);
        break;
    }
  }
  
  return new Response('OK');
}

async function handleBounce(event: any) {
  // Marquer l'email comme invalide dans la base de données
  await supabase
    .from('email_suppressions')
    .upsert({
      email: event.email,
      reason: 'bounce',
      bounce_type: event.type,
      created_at: new Date(event.timestamp * 1000)
    });
  
  console.log(`📧 Email bounced: ${event.email} (${event.reason})`);
}

async function handleUnsubscribe(event: any) {
  // Ajouter à la liste de suppression
  await supabase
    .from('email_suppressions')
    .upsert({
      email: event.email,
      reason: 'unsubscribe',
      created_at: new Date(event.timestamp * 1000)
    });
  
  console.log(`📧 Email unsubscribed: ${event.email}`);
}
```

### Configuration des listes de suppression

```typescript
// Vérifier avant envoi
async function isEmailSuppressed(email: string): Promise<boolean> {
  const { data } = await supabase
    .from('email_suppressions')
    .select('*')
    .eq('email', email)
    .single();
  
  return !!data;
}

// Nettoyer automatiquement les bounces temporaires
async function cleanupTemporaryBounces() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  await supabase
    .from('email_suppressions')
    .delete()
    .eq('reason', 'bounce')
    .eq('bounce_type', 'temporary')
    .lt('created_at', thirtyDaysAgo.toISOString());
}
```

### Conformité RGPD et réglementations

#### 1. Consentement et opt-in

```typescript
// Système de consentement
interface EmailConsent {
  email: string;
  consentType: 'explicit' | 'implicit' | 'legitimate_interest';
  consentDate: Date;
  ipAddress: string;
  userAgent: string;
  source: string;
}

async function recordConsent(consent: EmailConsent) {
  await supabase
    .from('email_consents')
    .insert(consent);
}
```

#### 2. Liens de désabonnement

```html
<!-- Template avec désabonnement -->
<div class="footer">
  <p>
    <a href="{{unsubscribeUrl}}" style="color: #6B7280;">
      Se désabonner de ces notifications
    </a>
  </p>
  <p style="font-size: 11px; color: #9CA3AF;">
    Conformément au RGPD, vous pouvez demander la suppression de vos données 
    en contactant <a href="mailto:ls@laurentserre.com">ls@laurentserre.com</a>
  </p>
</div>
```

#### 3. Gestion des données personnelles

```typescript
// API pour suppression RGPD
export async function DELETE(request: Request) {
  const { email } = await request.json();
  
  // Supprimer de toutes les tables
  await Promise.all([
    supabase.from('resource_requests').delete().eq('user_email', email),
    supabase.from('email_consents').delete().eq('email', email),
    supabase.from('email_suppressions').delete().eq('email', email)
  ]);
  
  // Ajouter à la liste de suppression SendGrid
  await sgMail.request({
    method: 'POST',
    url: '/v3/asm/suppressions/global',
    body: {
      recipient_emails: [email]
    }
  });
  
  return new Response('Data deleted', { status: 200 });
}
```

### Monitoring avancé et alertes

#### Dashboard de métriques

```typescript
// Métriques SendGrid en temps réel
class SendGridMetrics {
  static async getDailyStats() {
    const today = new Date().toISOString().split('T')[0];
    
    const stats = await sgMail.request({
      method: 'GET',
      url: '/v3/stats',
      qs: {
        start_date: today,
        end_date: today,
        aggregated_by: 'day'
      }
    });
    
    return {
      sent: stats[0]?.stats?.[0]?.metrics?.requests || 0,
      delivered: stats[0]?.stats?.[0]?.metrics?.delivered || 0,
      bounces: stats[0]?.stats?.[0]?.metrics?.bounces || 0,
      opens: stats[0]?.stats?.[0]?.metrics?.unique_opens || 0,
      clicks: stats[0]?.stats?.[0]?.metrics?.unique_clicks || 0,
      unsubscribes: stats[0]?.stats?.[0]?.metrics?.unsubscribes || 0,
      spam_reports: stats[0]?.stats?.[0]?.metrics?.spam_reports || 0
    };
  }
  
  static async getReputationScore() {
    const reputation = await sgMail.request({
      method: 'GET',
      url: '/v3/reputation'
    });
    
    return reputation.reputation;
  }
}
```

#### Alertes automatiques

```typescript
// Système d'alertes pour problèmes de délivrabilité
async function checkDeliverabilityHealth() {
  const stats = await SendGridMetrics.getDailyStats();
  const reputation = await SendGridMetrics.getReputationScore();
  
  // Alerte si taux de bounce > 5%
  const bounceRate = (stats.bounces / stats.sent) * 100;
  if (bounceRate > 5) {
    await sendAlert({
      type: 'high_bounce_rate',
      message: `Taux de bounce élevé: ${bounceRate.toFixed(2)}%`,
      severity: 'warning'
    });
  }
  
  // Alerte si réputation < 80
  if (reputation < 80) {
    await sendAlert({
      type: 'low_reputation',
      message: `Réputation SendGrid faible: ${reputation}`,
      severity: 'critical'
    });
  }
  
  // Alerte si taux de spam > 0.1%
  const spamRate = (stats.spam_reports / stats.sent) * 100;
  if (spamRate > 0.1) {
    await sendAlert({
      type: 'spam_reports',
      message: `Signalements spam: ${spamRate.toFixed(3)}%`,
      severity: 'warning'
    });
  }
}
```

### Optimisation de la délivrabilité

#### 1. Authentification complète

```dns
# Enregistrements DNS complets pour laurentserre.com

# SPF Record
laurentserre.com. TXT "v=spf1 include:sendgrid.net ~all"

# DMARC Record
_dmarc.laurentserre.com. TXT "v=DMARC1; p=quarantine; rua=mailto:dmarc@laurentserre.com; ruf=mailto:dmarc@laurentserre.com; fo=1"

# DKIM Records (générés par SendGrid)
s1._domainkey.laurentserre.com. CNAME s1.domainkey.u123456.wl.sendgrid.net.
s2._domainkey.laurentserre.com. CNAME s2.domainkey.u123456.wl.sendgrid.net.

# BIMI Record (optionnel, pour afficher le logo)
default._bimi.laurentserre.com. TXT "v=BIMI1; l=https://laurentserre.com/images/logo-bimi.svg"
```

#### 2. Réchauffement d'IP (si IP dédiée)

```typescript
// Plan de réchauffement progressif
const warmupPlan = [
  { day: 1, maxEmails: 50 },
  { day: 2, maxEmails: 100 },
  { day: 3, maxEmails: 200 },
  { day: 4, maxEmails: 400 },
  { day: 5, maxEmails: 800 },
  { day: 6, maxEmails: 1600 },
  { day: 7, maxEmails: 3200 }
];

async function sendWithWarmup(emails: string[], content: any) {
  const today = new Date();
  const daysSinceStart = Math.floor((today.getTime() - warmupStartDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const todayLimit = warmupPlan.find(p => p.day === daysSinceStart + 1)?.maxEmails || 5000;
  const emailsToSend = emails.slice(0, todayLimit);
  
  console.log(`📧 Envoi de ${emailsToSend.length} emails (limite: ${todayLimit})`);
  
  // Envoyer par petits lots
  for (let i = 0; i < emailsToSend.length; i += 50) {
    const batch = emailsToSend.slice(i, i + 50);
    await sendBatch(batch, content);
    await new Promise(resolve => setTimeout(resolve, 60000)); // 1 minute entre les lots
  }
}
```

#### 3. Segmentation et personnalisation

```typescript
// Segmentation des destinataires
interface EmailSegment {
  name: string;
  criteria: (email: string) => boolean;
  template: string;
  sendTime: string;
}

const segments: EmailSegment[] = [
  {
    name: 'high_engagement',
    criteria: (email) => getEngagementScore(email) > 80,
    template: 'premium-template.html',
    sendTime: '09:00'
  },
  {
    name: 'medium_engagement',
    criteria: (email) => getEngagementScore(email) > 40,
    template: 'standard-template.html',
    sendTime: '10:00'
  },
  {
    name: 'low_engagement',
    criteria: (email) => getEngagementScore(email) <= 40,
    template: 'simple-template.html',
    sendTime: '14:00'
  }
];

async function sendSegmentedEmails(emails: string[], content: any) {
  for (const segment of segments) {
    const segmentEmails = emails.filter(segment.criteria);
    
    if (segmentEmails.length > 0) {
      await scheduleEmail({
        emails: segmentEmails,
        template: segment.template,
        content,
        sendTime: segment.sendTime
      });
    }
  }
}
```

### Tests et validation avancés

#### Tests de délivrabilité

```typescript
// Test avec différents fournisseurs
const testEmails = [
  'test@gmail.com',
  'test@outlook.com',
  'test@yahoo.com',
  'test@orange.fr',
  'test@free.fr'
];

async function testDeliverability() {
  const results = [];
  
  for (const email of testEmails) {
    try {
      await sgMail.send({
        to: email,
        from: 'noreply@laurentserre.com',
        subject: 'Test de délivrabilité',
        html: '<p>Email de test pour vérifier la délivrabilité</p>'
      });
      
      results.push({ email, status: 'sent' });
    } catch (error) {
      results.push({ email, status: 'failed', error: error.message });
    }
  }
  
  return results;
}
```

#### Validation du contenu

```typescript
// Vérifier le score spam potentiel
async function checkSpamScore(content: string): Promise<number> {
  // Mots-clés à éviter
  const spamKeywords = [
    'gratuit', 'urgent', 'limité', 'offre spéciale',
    'cliquez ici', 'argent facile', 'garantie'
  ];
  
  let score = 0;
  const lowerContent = content.toLowerCase();
  
  spamKeywords.forEach(keyword => {
    const matches = (lowerContent.match(new RegExp(keyword, 'g')) || []).length;
    score += matches * 2;
  });
  
  // Vérifier le ratio texte/HTML
  const textLength = content.replace(/<[^>]*>/g, '').length;
  const htmlLength = content.length;
  const ratio = textLength / htmlLength;
  
  if (ratio < 0.3) score += 5; // Trop de HTML
  
  // Vérifier les liens
  const linkMatches = content.match(/<a[^>]*href/g) || [];
  if (linkMatches.length > 10) score += 3;
  
  return Math.min(score, 100);
}
```

### Intégration avec d'autres services

#### Synchronisation avec CRM

```typescript
// Synchroniser avec HubSpot
async function syncWithHubSpot(emailEvent: any) {
  const hubspotClient = new hubspot.Client({
    accessToken: process.env.HUBSPOT_ACCESS_TOKEN
  });
  
  try {
    await hubspotClient.crm.contacts.basicApi.update(
      emailEvent.contact_id,
      {
        properties: {
          last_email_open: emailEvent.timestamp,
          email_engagement_score: calculateEngagementScore(emailEvent)
        }
      }
    );
  } catch (error) {
    console.error('Erreur sync HubSpot:', error);
  }
}
```

#### Intégration avec analytics

```typescript
// Envoyer les métriques à Google Analytics
async function trackEmailMetrics(event: any) {
  const measurement_id = process.env.GA_MEASUREMENT_ID;
  const api_secret = process.env.GA_API_SECRET;
  
  await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`, {
    method: 'POST',
    body: JSON.stringify({
      client_id: event.email.replace('@', '_at_'),
      events: [{
        name: 'email_' + event.event,
        parameters: {
          email_template: event.template_name,
          email_subject: event.subject,
          engagement_time_msec: event.timestamp
        }
      }]
    })
  });
}

---

## 📞 Support et ressources

- **Documentation SendGrid** : [docs.sendgrid.com](https://docs.sendgrid.com)
- **Status Page** : [status.sendgrid.com](https://status.sendgrid.com)
- **Support** : Via le dashboard SendGrid
- **Community** : [community.sendgrid.com](https://community.sendgrid.com)

---

*Guide de configuration SendGrid v1.0 - 30 juillet 2025*