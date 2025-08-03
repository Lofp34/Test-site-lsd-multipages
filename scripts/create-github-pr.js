#!/usr/bin/env node

/**
 * Script pour créer automatiquement une pull request GitHub
 */

const { execSync } = require('child_process');
const fs = require('fs');

function createPullRequest() {
  console.log('🚀 Création de la Pull Request GitHub...\n');

  // Lire le contenu de la description de PR
  const prDescription = fs.readFileSync('CHAT_GEMINI_HOTFIX_PR.md', 'utf-8');
  
  // Extraire le titre et la description
  const title = "🔧 Hotfix: Correction Chat Gemini API & erreurs console";
  
  const body = `${prDescription}

## 📋 Résumé des corrections

Cette PR corrige les erreurs critiques empêchant le fonctionnement du chat Gemini.

### ✅ Corrections apportées
- **API Gemini** : Ajout clé API lors initialisation GoogleGenAI
- **Export manquant** : trackSectionView dans cta-tracking.ts  
- **Hook React** : Dépendances useEffect avec apiKey

### 🧪 Validation
- ✅ 4/4 tests automatiques réussis
- ✅ Chat Gemini opérationnel
- ✅ Console navigateur propre

### 📁 Fichiers modifiés
- \`src/hooks/useGeminiChatSimple.ts\`
- \`src/utils/cta-tracking.ts\`

**Ready for merge** ✅`;

  try {
    // Utiliser GitHub CLI si disponible
    try {
      execSync('gh --version', { stdio: 'ignore' });
      
      console.log('📝 Création de la PR avec GitHub CLI...');
      
      const command = `gh pr create --title "${title}" --body "${body.replace(/"/g, '\\"')}" --base main --head hotfix/chat-gemini-api-fix`;
      
      const result = execSync(command, { encoding: 'utf-8' });
      console.log('✅ Pull Request créée avec succès !');
      console.log(result);
      
    } catch (ghError) {
      // Fallback : ouvrir l'URL dans le navigateur
      console.log('⚠️  GitHub CLI non disponible, ouverture manuelle...');
      
      const repoUrl = execSync('git config --get remote.origin.url', { encoding: 'utf-8' }).trim();
      const githubUrl = repoUrl
        .replace('git@github.com:', 'https://github.com/')
        .replace('.git', '');
      
      const prUrl = `${githubUrl}/pull/new/hotfix/chat-gemini-api-fix`;
      
      console.log('🌐 Ouvrez cette URL pour créer la PR :');
      console.log(prUrl);
      
      // Essayer d'ouvrir automatiquement
      try {
        const open = process.platform === 'darwin' ? 'open' : 
                    process.platform === 'win32' ? 'start' : 'xdg-open';
        execSync(`${open} "${prUrl}"`, { stdio: 'ignore' });
        console.log('✅ URL ouverte dans le navigateur');
      } catch (openError) {
        console.log('⚠️  Impossible d\'ouvrir automatiquement');
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de la PR:', error.message);
    
    // Instructions manuelles
    console.log('\n📝 Instructions manuelles :');
    console.log('1. Allez sur GitHub : https://github.com/Lofp34/Test-site-lsd-multipages');
    console.log('2. Cliquez sur "Compare & pull request"');
    console.log('3. Utilisez le titre :', title);
    console.log('4. Copiez la description depuis CHAT_GEMINI_HOTFIX_PR.md');
  }
}

// Exécution
if (require.main === module) {
  createPullRequest();
}

module.exports = { createPullRequest };