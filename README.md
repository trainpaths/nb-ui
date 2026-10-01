# nb-ui

Vue 3 + Tailwind CSS v4 UI components, shipped as **source** (no build step): your app's Vite compiles them.
Any component can be overridden by dropping a file with the same name into your project.

| Group | Components |
|---|---|
| Actions & text | `Button`, `Link`, `Icon`, `CloseButton` |
| Forms | `Form`, `FormField`, `Input`, `Select`, `Textarea`, `Checkbox`, `Switch`, `RadioGroup`, `TagInput` |
| Overlays | `Modal`, `ConfirmDialog` + `useConfirm()`, `UnsavedChangesDialog` + `useUnsavedChanges()`, `Dropdown`, `Tooltip` |
| Feedback | `Alert`, `Toast`, `ToastContainer` + `useToast()`, `Spinner`, `Loading`, `Skeleton`, `ProgressBar` |
| Display & navigation | `Card`, `Badge`, `Avatar`, `Tabs`, `Table`, `Pagination`, `EmptyState`, `DescriptionList`, `DescriptionItem` |

Run `pnpm dev` for a playground with every component and its props.

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

Mount the global hosts once (e.g. in `App.vue`) to use `useToast()` and `useConfirm()`:

```vue
<ToastContainer />
<ConfirmDialog />
```

```ts
const { toast } = useToast()
toast.success('Saved') // also .error / .warning / .info, or toast({ message, type, duration })

const { confirm } = useConfirm()
if (await confirm({ title: 'Delete page?', confirmText: 'Delete', danger: true })) remove()
```

Update: bump the tag (`pnpm add github:trainpaths/nb-ui#v0.2.0`).

## Theming

`theme.css` defines the colour tokens. Redefine any of them after the import:

| Token | Default | Used for |
|---|---|---|
| `primary` / `primary-dark` | `#6A428A` / `#54356E` | brand fills (`bg="primary"`), its hover |
| `secondary` | `#4A4D50` | neutral fills |
| `accent` | `#86BBBD` | default `Button` fill, tints (alerts, badges, hover), info toast |
| `accent-dark` | `#3A7679` | accent-coloured **text** (`Link`, outline/ghost buttons), focus rings, accent hover |
| `danger`, `error`, `success`, `warning` | | states |
| `white`, `black` | `#F4F5F6`, `#131B23` | surfaces, text |

`accent` is a light colour (~2:1 on white), so components never put text *in* accent: links and outline buttons use
`accent-dark` (≥4.5:1 on `white`), and solid fills on light tokens (`accent`, `warning`, `white`) get black text
automatically. Keep that relationship if you override them.

```css
@theme {
	--color-primary: #0f766e;
	--color-primary-dark: #115e59;
}
```

Colour props (`bg`, `border`, `text`, `color` on `Button`, `Card`, `Input`, `Link`, `Badge`, `Spinner`, …) take these token names.

### Corners

`--nb-rounded` switches every component between rounded (`1`, default) and sharp (`0`) corners:

```css
:root {
	--nb-rounded: 0;
}
```

It scales Tailwind's `--radius-*` tokens, so your app's own `rounded-sm/md/lg…` classes follow it too (like
`--spacing`). Set it on any element to switch just that subtree. Pill shapes (badges, switch, progress bar, tags) use
the extra `rounded-pill` utility and go square. True circles (radio, avatar, spinner) stay round. Bare `rounded` and
`rounded-t` are fixed values in Tailwind v4 and ignore the toggle: use `rounded-sm`/`rounded-t-sm`.

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
pnpm test        # Vitest (happy-dom): composables + component behaviour
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
