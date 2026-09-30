import { existsSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// real path of the installed package (pnpm symlinks resolve to it, like Vite's importers)
const pkgDir = fileURLToPath(new URL('.', import.meta.url))

/**
 * Vite plugin for nb-ui: a `<dir>/<Name>.vue` in the app replaces the library's `<Name>.vue`
 * everywhere, including imports inside the library (e.g. the `Button` in `UnsavedChangesDialog`).
 * An override can still wrap the original: `import Base from '@trainpaths/nb-ui/src/Button.vue'`.
 * Adding or removing an override file needs a dev server restart.
 *
 * @param {{ dir?: string }} [options] override folder, relative to the Vite root (default `src/lib/nbUI`)
 * @returns {import('vite').Plugin}
 */
export function nbUi({ dir = 'src/lib/nbUI' } = {}) {
	let overrides = ''
	return {
		name: 'nb-ui-overrides',
		enforce: 'pre',
		// raw .vue/.ts source: the dep pre-bundler can't compile it, Vite's own pipeline does
		config: () => ({ optimizeDeps: { exclude: ['@trainpaths/nb-ui'] } }),
		configResolved(config) {
			overrides = resolve(config.root, dir)
		},
		resolveId(source, importer) {
			if (!importer?.startsWith(pkgDir) || !source.endsWith('.vue')) return
			const local = resolve(overrides, basename(source))
			if (existsSync(local)) return local
		},
	}
}
