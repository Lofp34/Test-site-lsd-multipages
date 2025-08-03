#!/bin/bash

# Script pour nettoyer les secrets de l'historique Git
# ATTENTION: Ce script réécrit l'historique Git

echo "🔒 Nettoyage des secrets de l'historique Git..."

# Sauvegarder la branche actuelle
CURRENT_BRANCH=$(git branch --show-current)
echo "Branche actuelle: $CURRENT_BRANCH"

# Supprimer le fichier de l'historique Git
echo "Suppression du fichier scripts/test-gemini-chat.ts de l'historique..."
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch scripts/test-gemini-chat.ts' \
  --prune-empty --tag-name-filter cat -- --all

# Nettoyer les références
echo "Nettoyage des références..."
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo "✅ Nettoyage terminé"
echo "⚠️  IMPORTANT: Vous devez forcer le push avec --force-with-lease"
echo "⚠️  ATTENTION: Cela réécrit l'historique Git - coordonnez avec votre équipe"

echo ""
echo "Commandes à exécuter:"
echo "git push origin $CURRENT_BRANCH --force-with-lease"
echo ""
echo "🔑 N'oubliez pas de:"
echo "1. Révoquer l'ancienne clé API Google"
echo "2. Générer une nouvelle clé API"
echo "3. Mettre à jour vos variables d'environnement"