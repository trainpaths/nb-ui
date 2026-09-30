# nb-ui

Vue 3 + Tailwind CSS v4 UI components, shipped as **source** (no build step): your app's Vite compiles them.
Any component can be overridden by dropping a file with the same name into your project.

Components: `Alert`, `Button`, `Card`, `DescriptionList`, `DescriptionItem`, `Form`, `FormField`, `Input`, `Link`,
`Loading`, `TagInput`, `Toast`, `ToastContainer`, `UnsavedChangesDialog`; composables `useToast()`,
`useUnsavedChanges()`.

## Install

Requires Vue 3.5+, Vite and Tailwind v4 (`@tailwindcss/vite`). `Link` renders `<router-link>` when given `to`,
so that needs vue-router.

```bash
pnpm add github:trainpaths/nb-ui#v0.1.0
```

```ts
// vite.config.ts
import { nbUi } from '@trainpaths/nb-ui/vite'

export default defineConfig({
	plugins: [vue(), tailwindcss(), nbUi()],
})
```

```css
/* your main stylesheet */
@import 'tailwindcss';
@import '@trainpaths/nb-ui/theme.css';
```

```ts
import { Button, useToast } from '@trainpaths/nb-ui'
```

Update: bump the tag (`pnpm add github:trainpaths/nb-ui#v0.2.0`).

## Theming

`theme.css` defines the colour tokens (`--color-primary`, `-primary-dark`, `-secondary`, `-accent`, `-danger`,
`-success`, `-warning`, `-error`, `-white`, `-black`). Redefine any of them after the import:

```css
@theme {
	--color-primary: #0f766e;
	--color-primary-dark: #115e59;
}
```

Colour props (`bg`, `border`, `text` on `Button`, `Card`, `Input`, `Link`) take these token names.

> **Font:** `theme.css` sets `--font-sans` to Roboto, self-hosted via `@fontsource-variable/roboto` (the woff2
> files are bundled by your Vite build, so a `font-src 'self'` CSP works). Override `--font-sans` in your `@theme` to change it.

> **Note:** `theme.css` sets `--spacing: 1px`, so every Tailwind spacing utility in your app is in px
> (`p-16` = 16px). The components are written that way.

## Overriding a component

Create `src/lib/nbUI/<Name>.vue` in your app. The Vite plugin serves it instead of the library's `<Name>.vue`,
everywhere: in your imports from `@trainpaths/nb-ui` *and* inside the library (e.g. an overridden `Button` is also
used by `UnsavedChangesDialog`). Restart the dev server after adding or removing an override file.

Start from a copy of the original, or wrap it:

```vue
<!-- src/lib/nbUI/Button.vue -->
<script setup lang="ts">
import Base from '@trainpaths/nb-ui/src/Button.vue'
</script>

<template>
	<!-- props/attrs fall through to Base -->
	<Base class="uppercase tracking-wide"><slot /></Base>
</template>
```

A different folder: `nbUi({ dir: 'src/components/ui' })`. Type-checking still sees the library's props, so keep an
override's props compatible with the original.

## Developing

```bash
pnpm install
pnpm dev         # playground: every component + live theme colour pickers
pnpm typecheck
```

Each `playground/demos/<Name>.vue` is one section of the playground (auto-discovered): add one for every new
component, and export the component from `index.ts`.

To try changes in an app before tagging: `pnpm link ../nb-ui` in the app, `pnpm unlink` afterwards.

### Releases

Automatic: every push to `main` runs `.github/workflows/release.yml` (typecheck + build, then bump
`package.json`, tag `vX.Y.Z`, GitHub release). The bump comes from the Conventional Commits since the last tag:

| Commits contain | Bump |
|---|---|
| `feat!:` / `fix(ui)!:` (any type with `!`) or a `BREAKING CHANGE:` footer | major |
| `feat:` | minor |
| anything else (`fix:`, `refactor:`, non-conventional messages, ...) | patch |
| only `docs` / `chore` / `ci` / `test` / `style` / `build` | no release |

Force a bump: Actions → Release → Run workflow → `patch` / `minor` / `major`.
Pull `main` after a push: the workflow adds a `chore(release)` commit.
