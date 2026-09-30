# CLAUDE.md — nb-ui

Vue 3 + Tailwind v4 component library, installed by apps from git tags (`github:trainpaths/nb-ui#vX.Y.Z`).
**No build step**: raw `.vue`/`.ts` is shipped, the consuming app's Vite compiles it.

- `src/` components + composables; `index.ts` barrel (every public export goes here)
- `theme.css` colour tokens + `--spacing: 1px` + `@source './src'` (Tailwind skips node_modules otherwise) + an
  `@source inline` safelist for classes built at runtime (`colors.ts`: `bg-${name}` etc.). New token → add to both.
- `vite.js` (+ hand-written `vite.d.ts`) override plugin: an import of `*.vue` from inside this package resolves to
  the app's `src/lib/nbUI/<basename>` if it exists. Plain JS on purpose: Node won't strip types in node_modules and
  Vite's config loader externalizes deps. Also excludes the package from `optimizeDeps`.
- `playground/` dev-only showcase (`pnpm dev`): `demos/<Name>.vue` auto-globbed into sections, `Variant.vue` rows,
  theme colour pickers set CSS vars on `<html>`. Memory router so `Link to=` works and `#anchors` stay free.
- Style: tabs, `<script setup lang="ts">`, spacing utilities are px (`p-16`), colours via theme token names.
- Release: bump `package.json` version, tag `vX.Y.Z`, push tags; apps bump the tag in their dependency.
