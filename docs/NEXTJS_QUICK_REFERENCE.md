# Next.js - Aide-Mémoire de Récupération

## 🚨 Erreur ERR_INVALID_PACKAGE_CONFIG

### Solution Express (2 minutes)
```bash
npm run recovery:quick
```

### Solution Complète (5 minutes)
```bash
npm run recovery:full
```

## 📋 Commandes Essentielles

| Commande | Description | Durée |
|----------|-------------|-------|
| `npm run diagnose` | Diagnostic rapide | 30s |
| `npm run clean:environment` | Nettoyage complet | 1min |
| `npm run fresh:install` | Installation propre | 2-3min |
| `npm run maintenance:nextjs` | Maintenance complète | 5min |
| `npm run health:check` | Vérification santé | 10s |

## 🔧 Maintenance Préventive

### Quotidienne
```bash
npm run health:check
```

### Hebdomadaire
```bash
npm run maintenance:weekly
```

### En cas de problème
```bash
npm run maintenance:nextjs
```

## 🆘 Dépannage Rapide

### Le serveur ne démarre pas
1. `npm run diagnose` - Identifier le problème
2. `npm run recovery:quick` - Solution rapide
3. `npm run dev` - Tester

### Erreurs de modules
1. `npm run clean:environment` - Nettoyer
2. `npm run fresh:install` - Réinstaller
3. `npm run maintenance:nextjs:verify` - Vérifier

### Performance dégradée
1. `npm run maintenance:nextjs:diagnose` - Analyser
2. `npm run maintenance:weekly` - Maintenance complète

## 📞 Support

- 📖 Guide complet: `docs/NEXTJS_RECOVERY_GUIDE.md`
- 🔍 Diagnostic: `npm run diagnose:save`
- 🧪 Test: `npm run maintenance:nextjs:test`

## ⚡ Raccourcis Clavier (VS Code)

Ajoutez à vos tasks.json :
```json
{
  "label": "Next.js Recovery",
  "type": "shell",
  "command": "npm run recovery:quick",
  "group": "build"
}
```

---
**Dernière mise à jour:** $(date)