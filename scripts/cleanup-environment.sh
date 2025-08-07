#!/bin/bash

# Script de nettoyage de l'environnement Next.js
# Résout les erreurs ERR_INVALID_PACKAGE_CONFIG

set -e  # Arrêter en cas d'erreur

echo "🧹 Démarrage du nettoyage de l'environnement Next.js..."
echo "=================================================="

# Fonction pour afficher les étapes
log_step() {
    echo ""
    echo "📋 $1"
    echo "----------------------------------------"
}

# Fonction pour vérifier si un dossier existe avant de le supprimer
safe_remove() {
    if [ -d "$1" ] || [ -f "$1" ]; then
        echo "🗑️  Suppression de $1"
        rm -rf "$1"
    else
        echo "ℹ️  $1 n'existe pas (déjà supprimé)"
    fi
}

# Étape 1: Arrêter les processus Next.js en cours
log_step "Arrêt des processus Next.js en cours"
pkill -f "next dev" || echo "ℹ️  Aucun processus Next.js en cours"
pkill -f "next start" || echo "ℹ️  Aucun processus Next.js start en cours"

# Étape 2: Supprimer node_modules
log_step "Suppression du dossier node_modules"
safe_remove "node_modules"

# Étape 3: Supprimer les fichiers de build Next.js
log_step "Suppression des fichiers de build Next.js"
safe_remove ".next"
safe_remove "out"
safe_remove ".swc"

# Étape 4: Supprimer les lock files
log_step "Suppression des lock files"
safe_remove "package-lock.json"
safe_remove "yarn.lock"
safe_remove "pnpm-lock.yaml"

# Étape 5: Nettoyer les caches npm
log_step "Nettoyage des caches npm"
npm cache clean --force 2>/dev/null || echo "⚠️  Impossible de nettoyer le cache npm"

# Étape 6: Nettoyer les caches système (macOS/Linux)
log_step "Nettoyage des caches système"
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    safe_remove "$HOME/Library/Caches/npm"
    safe_remove "$HOME/.npm"
    echo "🍎 Caches macOS nettoyés"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    safe_remove "$HOME/.cache/npm"
    safe_remove "$HOME/.npm"
    echo "🐧 Caches Linux nettoyés"
fi

# Étape 7: Nettoyer les caches npx
log_step "Nettoyage des caches npx"
npx clear-npx-cache 2>/dev/null || echo "ℹ️  Pas de cache npx à nettoyer"

# Étape 8: Nettoyer les logs npm
log_step "Nettoyage des logs npm"
safe_remove "$HOME/.npm/_logs"

# Étape 9: Vérifier l'espace disque libéré
log_step "Vérification de l'espace disque"
if command -v du &> /dev/null; then
    echo "📊 Espace dans le répertoire actuel:"
    du -sh . 2>/dev/null || echo "ℹ️  Impossible de calculer la taille"
fi

# Étape 10: Résumé
echo ""
echo "✅ Nettoyage terminé avec succès!"
echo "=================================================="
echo ""
echo "📋 Résumé des actions effectuées:"
echo "   • node_modules supprimé"
echo "   • Fichiers de build Next.js supprimés (.next, out, .swc)"
echo "   • Lock files supprimés (package-lock.json, yarn.lock, pnpm-lock.yaml)"
echo "   • Caches npm nettoyés"
echo "   • Caches système nettoyés"
echo "   • Caches npx nettoyés"
echo ""
echo "🚀 Prochaine étape: Lancez 'npm run fresh:install' pour réinstaller les dépendances"
echo ""

# Vérifier si package.json existe
if [ ! -f "package.json" ]; then
    echo "⚠️  ATTENTION: package.json introuvable!"
    echo "   Assurez-vous d'être dans le bon répertoire du projet"
    exit 1
fi

echo "✨ Environnement prêt pour une installation propre!"