# CLAUDE.md — nb-ui

Vue 3 + Tailwind v4 component library, installed by apps from git tags (`github:trainpaths/nb-ui#vX.Y.Z`).
**No build step**: raw `.vue`/`.ts` is shipped, the consuming app's Vite compiles it.

- `src/` components + composables; `index.ts` barrel (every public export goes here)
- `theme.css` imports self-hosted Roboto (`@fontsource-variable/roboto`, a real dependency) + `--font-sans` + colour tokens + `--spacing: 1px` + `@source './src'` (Tailwind skips node_modules otherwise) + an
  `@source inline` safelist for classes built at runtime (`bg-${name}`, `bg-${name}/20`, `hover:bg-${name}/10`…).
  New token → add to the `@theme` block, every safelist line, and `tokens` in `playground/App.vue`.
- Corners: `--nb-rounded` (1/0, in `@layer base`) multiplies the `--radius-*` scale in `theme.css`. Never use bare
  `rounded`/`rounded-t`/`rounded-full` for corners (fixed values, ignore the toggle): `rounded-sm…lg`, `rounded-pill`
  for pills; `rounded-full` only for true circles (radio, avatar, spinner, dots).
- `vite-plugin.js` (+ hand-written `.d.ts`; exported as `./vite`; not named `vite.js`: Windows would run it for `vite`) override plugin: an import of `*.vue` from inside this package resolves to
  the app's `src/lib/nbUI/<basename>` if it exists. Plain JS on purpose: Node won't strip types in node_modules and
  Vite's config loader externalizes deps. Also excludes the package from `optimizeDeps`.
- Shared building blocks (reuse, don't re-roll): `styles.ts` (`focusRing`, `peerFocusRing`, `inputFocus`, `inputFocusWithin`, `inputSizes`, `inputBorder()`, `inputDisabled`), `status.ts` (`statusIcons` for Alert/Toast), `colors.ts`
  (`bgColor()`… + `onColor(bg)` = readable text token on a fill), `Icon.vue` (built-in inline SVG set, add paths there; a path may be `{ d, width }` for its own stroke width; directional shapes (`chevron`, `arrow`, `panel`) are drawn once pointing left + `rotate` prop (90 up, 180 right, 270 down), never add `-right`/`-up` copies),
  `CloseButton.vue`, `Spinner.vue`, `useField.ts` (`useField` wires a control to `FormField` via inject: id,
  aria-invalid, aria-describedby; `useControlAttrs` + `inheritAttrs: false` sends non-class attrs to the native control
  when the root is a wrapper div), `scrollLock.ts` (shared Modal counter).
- Colour rule: `accent` is too light for text → text/rings/hover use `accent-dark`; light fills get black text (`onColor`).
- Global hosts: `ToastContainer` (`useToast`) and `ConfirmDialog` (`useConfirm`) hold module-level state, mounted once by the app.
- Overlays: `Modal` (Teleport, focus trap/restore, `inheritAttrs: false` → attrs on the panel); `UnsavedChangesDialog`
  and `ConfirmDialog` are built on it. `Popover` (trigger slot props, Esc/outside click/focus-out close); `Dropdown` is built on it.
  `Popover`/`Dropdown`/`Tooltip` position absolutely (no floating-ui): clipped by `overflow: hidden`.
- Animations use Tailwind classes on `<Transition>`/`<TransitionGroup>` props, always with `motion-reduce:transition-none`.
  Tailwind v4 `translate-*`/`scale-*` set the CSS `translate`/`scale` properties, not `transform`.
- Tests: `tests/*.test.ts`, Vitest + @vue/test-utils + happy-dom (`vitest.config.ts`, separate from the playground's
  `vite.config.ts`). CI runs typecheck → test → build.
- Gotcha: after adding a new file in `src/`, restart `pnpm dev`; the running Tailwind plugin doesn't scan new files,
  so their utilities are silently missing.
- `playground/` dev-only showcase (`pnpm dev`): `demos/<Name>.vue` auto-globbed into sections, `Variant.vue` rows,
  theme colour pickers set CSS vars on `<html>`. Memory router so `Link to=` works and `#anchors` stay free.
  Deployed to GitHub Pages on push to `main` (`.github/workflows/pages.yml`, built with `--base=/nb-ui/`).
- Style: tabs, `<script setup lang="ts">`, spacing utilities are px (`p-16`), colours via theme token names.
  Comments: almost none, only for really unclear logic, terse caveman style.
- Release: automatic on push to `main` (`.github/workflows/release.yml`): Conventional Commits since last tag → bump
  (`!`/`BREAKING CHANGE` major, `feat` minor, else patch; docs/chore/ci/test/style/build only → none), commits
  `chore(release): vX.Y.Z` on the tag only (never pushed to `main`, so `package.json` version there is stale), GitHub
  release. Manual run can force the bump.
  Apps then bump the tag in their dependency.
