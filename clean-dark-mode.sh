#!/bin/bash

# Script to clean all dark mode residues from the codebase
echo "🧹 Cleaning dark mode residues..."

# Find all TypeScript/JavaScript files and clean dark: classes
find src -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" | while read file; do
    if grep -q "dark:" "$file"; then
        echo "Cleaning $file..."
        # Remove dark: classes using sed
        sed -i.bak 's/ dark:[a-zA-Z0-9_\/-]*//g' "$file"
        # Clean up backup files
        rm "${file}.bak" 2>/dev/null || true
    fi
done

echo "✅ Dark mode classes cleaned!"

# Search for any remaining dark: patterns
echo "🔍 Checking for remaining dark: patterns..."
remaining=$(find src -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" | xargs grep -l "dark:" 2>/dev/null || true)

if [ -n "$remaining" ]; then
    echo "⚠️  Still found dark: patterns in:"
    echo "$remaining"
else
    echo "✅ No remaining dark: patterns found!"
fi

echo "🔍 Checking for prefers-color-scheme: dark patterns..."
prefers_remaining=$(find . -name "*.css" -o -name "*.scss" -o -name "*.tsx" -o -name "*.ts" | xargs grep -l "prefers-color-scheme: dark" 2>/dev/null || true)

if [ -n "$prefers_remaining" ]; then
    echo "⚠️  Still found prefers-color-scheme: dark patterns in:"
    echo "$prefers_remaining"
else
    echo "✅ No remaining prefers-color-scheme: dark patterns found!"
fi

echo "🎉 Dark mode cleanup completed!"