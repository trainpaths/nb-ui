# nb-ui

Vue 3 + Tailwind CSS v4 components, shipped as source: your app's Vite compiles them, and any component can be
replaced by a file of the same name in your app.

## Install

Needs Vue 3.5+, Vite and Tailwind v4 (`@tailwindcss/vite`). vue-router only if you use `to` on `Link`/`Button`.

```bash
pnpm add github:trainpaths/nb-ui#semver:^1.0.0
```

`pnpm update @trainpaths/nb-ui` picks up new releases within that range.

## Setup

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { nbUi } from '@trainpaths/nb-ui/vite'

export default defineConfig({
	plugins: [vue(), tailwindcss(), nbUi()],
})
```

```css
/* main stylesheet */
@import 'tailwindcss';
@import '@trainpaths/nb-ui/theme.css';
```

Mount the global hosts once, e.g. in `App.vue`, for `useToast()` and `useConfirm()`:

```vue
<template>
	<RouterView />
	<ToastContainer />
	<ConfirmDialog />
</template>
```

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button, Form, FormField, Input, useConfirm, useToast } from '@trainpaths/nb-ui'

const email = ref('')
const { toast } = useToast()
const { confirm } = useConfirm()

async function remove() {
	if (await confirm({ title: 'Delete account?', confirmText: 'Delete', danger: true })) toast.success('Deleted')
}
</script>

<template>
	<Form @submit="toast.success('Saved')">
		<FormField label="Email" hint="We never share it." required>
			<Input v-model="email" type="email" />
		</FormField>
		<Button type="submit">Save</Button>
		<Button variant="outline" border="danger" @click="remove">Delete account</Button>
	</Form>
</template>
```

| Group | Components |
|---|---|
| Actions | `Button`, `Link`, `Icon`, `CloseButton` |
| Forms | `Form`, `FormField`, `Input`, `Select`, `Textarea`, `Checkbox`, `Switch`, `RadioGroup`, `TagInput` |
| Overlays | `Modal`, `ConfirmDialog` + `useConfirm()`, `UnsavedChangesDialog` + `useUnsavedChanges()`, `Popover`, `Dropdown`, `Tooltip` |
| Feedback | `Alert`, `Toast`, `ToastContainer` + `useToast()`, `Spinner`, `Loading`, `Skeleton`, `ProgressBar` |
| Display | `Card`, `Badge`, `Avatar`, `Tabs`, `Accordion`, `Table`, `Pagination`, `EmptyState`, `DescriptionList`, `DescriptionItem` |

Every component with all its props: [live playground](https://trainpaths.github.io/nb-ui/), or clone the repo and run `pnpm dev`.

## Theming

Colour props (`bg`, `border`, `text`, `color`) take theme token names. Override tokens after the import:

```css
@theme {
	--color-primary: #0f766e;
	--color-primary-dark: #115e59;
}
```

| Token | Default | Used for |
|---|---|---|
| `primary` / `primary-dark` | `#6A428A` / `#54356E` | brand fills, their hover |
| `secondary` | `#4A4D50` | neutral fills |
| `accent` | `#86BBBD` | default `Button`, tints, info |
| `accent-dark` | `#3A7679` | accent-coloured text, links, focus rings |
| `danger`, `error`, `success`, `warning` | | states |
| `white`, `black` | `#F4F5F6` / `#131B23` | surfaces, text |

`accent` is too light for text, so text uses `accent-dark`. Keep that contrast if you change them.

Sharp corners everywhere (or on any subtree):

```css
:root {
	--nb-rounded: 0;
}
```

Good to know:

- `theme.css` sets `--spacing: 1px`, so all spacing utilities in your app are px (`p-16` = 16px).
- Font is self-hosted Roboto. Change it with `--font-sans` in your `@theme`.
- `Popover`, `Dropdown` and `Tooltip` are absolutely positioned, so an `overflow: hidden` ancestor clips them.

## Overriding a component

Put `src/lib/nbUI/<Name>.vue` in your app. It replaces the library's `<Name>.vue` everywhere, including inside other
components (an overridden `Button` is also used by the dialogs). Restart the dev server after adding or removing one.
Keep its props compatible with the original.

```vue
<!-- src/lib/nbUI/Button.vue -->
<script setup lang="ts">
import Base from '@trainpaths/nb-ui/src/Button.vue'
</script>

<template>
	<Base class="uppercase tracking-wide"><slot /></Base>
</template>
```

Other folder: `nbUi({ dir: 'src/components/ui' })`.

## Development

```bash
pnpm install
pnpm dev         # playground
pnpm typecheck
pnpm test
```

New component: add it to `src/`, export it from `index.ts`, add a `playground/demos/<Name>.vue`.
Try it in an app before release with `pnpm link ../nb-ui`.

Releases are automatic on push to `main`, from Conventional Commits: `feat` → minor, `fix` and others → patch,
`!` or `BREAKING CHANGE` → major, only `docs`/`chore`/`ci`/`test`/`style`/`build` → no release.
