#!/bin/bash

# Script d'installation propre des dépendances Next.js
# À utiliser après cleanup-environment.sh

set -e  # Arrêter en cas d'erreur

echo "🚀 Démarrage de l'installation propre des dépendances..."
echo "====================================================="

# Fonction pour afficher les étapes
log_step() {
    echo ""
    echo "📋 $1"
    echo "----------------------------------------"
}

# Fonction pour vérifier les prérequis
check_prerequisites() {
    log_step "Vérification des prérequis"
    
    # Vérifier Node.js
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js n'est pas installé!"
        exit 1
    fi
    
    NODE_VERSION=$(node --version)
    echo "✅ Node.js version: $NODE_VERSION"
    
    # Vérifier npm
    if ! command -v npm &> /dev/null; then
        echo "❌ npm n'est pas installé!"
        exit 1
    fi
    
    NPM_VERSION=$(npm --version)
    echo "✅ npm version: $NPM_VERSION"
    
    # Vérifier package.json
    if [ ! -f "package.json" ]; then
        echo "❌ package.json introuvable!"
        echo "   Assurez-vous d'être dans le répertoire racine du projet"
        exit 1
    fi
    echo "✅ package.json trouvé"
    
    # Vérifier que node_modules n'existe pas
    if [ -d "node_modules" ]; then
        echo "⚠️  node_modules existe déjà!"
        echo "   Lancez d'abord 'npm run clean:environment'"
        read -p "   Continuer quand même? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# Fonction pour vérifier les versions recommandées
check_versions() {
    log_step "Vérification des versions recommandées"
    
    # Extraire la version Node.js (enlever le 'v')
    NODE_MAJOR=$(echo $NODE_VERSION | sed 's/v//' | cut -d. -f1)
    
    if [ "$NODE_MAJOR" -lt 18 ]; then
        echo "⚠️  Node.js $NODE_VERSION détecté"
        echo "   Version recommandée: Node.js 18+ pour Next.js 15"
        echo "   Considérez une mise à jour avec nvm"
    else
        echo "✅ Version Node.js compatible"
    fi
    
    # Vérifier npm
    NPM_MAJOR=$(echo $NPM_VERSION | cut -d. -f1)
    if [ "$NPM_MAJOR" -lt 8 ]; then
        echo "⚠️  npm $NPM_VERSION détecté"
        echo "   Version recommandée: npm 8+"
        echo "   Mise à jour: npm install -g npm@latest"
    else
        echo "✅ Version npm compatible"
    fi
}

# Fonction pour installer les dépendances
install_dependencies() {
    log_step "Installation des dépendances"
    
    echo "📦 Installation en cours..."
    echo "   Cela peut prendre quelques minutes..."
    
    # Créer un cache temporaire pour éviter les conflits
    TEMP_CACHE="/tmp/npm-cache-$(date +%s)"
    
    # Installation avec cache temporaire
    if npm ci --cache "$TEMP_CACHE" --prefer-offline=false --no-audit --progress=true; then
        echo "✅ Installation réussie avec npm ci"
    else
        echo "⚠️  npm ci a échoué, tentative avec npm install..."
        if npm install --cache "$TEMP_CACHE" --prefer-offline=false --no-audit --progress=true; then
            echo "✅ Installation réussie avec npm install"
        else
            echo "❌ Échec de l'installation!"
            echo "   Vérifiez votre connexion internet et les logs ci-dessus"
            exit 1
        fi
    fi
    
    # Nettoyer le cache temporaire
    rm -rf "$TEMP_CACHE" 2>/dev/null || true
}

# Fonction pour vérifier l'installation
verify_installation() {
    log_step "Vérification de l'installation"
    
    # Vérifier que node_modules existe
    if [ ! -d "node_modules" ]; then
        echo "❌ node_modules n'a pas été créé!"
        exit 1
    fi
    echo "✅ node_modules créé"
    
    # Vérifier les modules critiques
    CRITICAL_MODULES=("next" "react" "react-dom")
    
    for module in "${CRITICAL_MODULES[@]}"; do
        if [ -d "node_modules/$module" ]; then
            VERSION=$(node -e "console.log(require('./node_modules/$module/package.json').version)" 2>/dev/null || echo "unknown")
            echo "✅ $module@$VERSION installé"
        else
            echo "❌ $module manquant!"
            exit 1
        fi
    done
    
    # Vérifier le module conf de Next.js (source du problème original)
    CONF_PATH="node_modules/next/dist/compiled/conf"
    if [ -d "$CONF_PATH" ]; then
        if [ -f "$CONF_PATH/package.json" ]; then
            echo "✅ Module conf de Next.js présent et valide"
        else
            echo "⚠️  Module conf présent mais package.json manquant"
        fi
    else
        echo "⚠️  Module conf de Next.js non trouvé (peut être normal selon la version)"
    fi
}

# Fonction pour tester le démarrage
test_startup() {
    log_step "Test de démarrage (optionnel)"
    
    read -p "Voulez-vous tester le démarrage de Next.js? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🧪 Test de démarrage en cours..."
        echo "   (Le serveur se fermera automatiquement après 10 secondes)"
        
        # Démarrer Next.js en arrière-plan
        timeout 10s npm run dev &
        DEV_PID=$!
        
        # Attendre un peu pour que le serveur démarre
        sleep 5
        
        # Tester la connexion
        if curl -f http://localhost:3000 >/dev/null 2>&1; then
            echo "✅ Serveur Next.js démarré avec succès!"
        else
            echo "⚠️  Serveur démarré mais pas de réponse sur localhost:3000"
            echo "   Cela peut être normal selon votre configuration"
        fi
        
        # Arrêter le serveur
        kill $DEV_PID 2>/dev/null || true
        wait $DEV_PID 2>/dev/null || true
        
        echo "🛑 Serveur de test arrêté"
    fi
}

# Fonction pour afficher le résumé
show_summary() {
    echo ""
    echo "🎉 Installation terminée avec succès!"
    echo "====================================================="
    echo ""
    echo "📋 Résumé:"
    echo "   • Dépendances installées dans node_modules/"
    echo "   • Modules critiques vérifiés (next, react, react-dom)"
    echo "   • package-lock.json généré"
    echo ""
    echo "🚀 Prochaines étapes:"
    echo "   • Lancez 'npm run dev' pour démarrer le serveur"
    echo "   • Testez votre application sur http://localhost:3000"
    echo "   • Lancez 'npm run build' pour vérifier la production"
    echo ""
    echo "🔧 Commandes utiles:"
    echo "   • npm run diagnose     - Diagnostic de l'environnement"
    echo "   • npm run health:check - Vérification de santé"
    echo "   • npm run test:run     - Lancer les tests"
    echo ""
    echo "✨ Environnement prêt pour le développement!"
}

# Exécution du script
main() {
    check_prerequisites
    check_versions
    install_dependencies
    verify_installation
    test_startup
    show_summary
}

# Gestion des erreurs
trap 'echo "❌ Erreur durant l'\''installation! Vérifiez les logs ci-dessus."' ERR

# Lancer le script principal
main