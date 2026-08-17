# TODO — Refonte Hero + Police Groote

## Étapes
- [x] 1. Extraire la police Groote dans `src/assets/fonts/` (déjà fait via unzip)
- [x] 2. Ajouter `@font-face` pour "Groote" dans `src/styles.css`
- [x] 3. Remplacer `--font-display` et `--font-sans` par "Groote" dans `src/styles.css`
- [x] 4. Décaler le texte Hero vers la droite (`pl-16` dans `Hero.tsx`)
- [x] 5. Aligner le logo avec le texte (`left-16` dans `index.tsx`)
- [x] 6. Réduire la taille du titre h1 dans `Hero.tsx`
- [x] 7. Tester le build/dev server

## Retour utilisateur
- [x] 8. Uniformiser la taille de tous les titres de sections à `clamp(1.6rem,4.2vw,3.6rem)` (identique au titre Hero)
- [x] 9. Augmenter l'espacement des lignes (line-height 0.95 → 1.15) pour éviter l'effet "touffu"
