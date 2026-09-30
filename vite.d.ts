import type { Plugin } from 'vite'

/** Local `<dir>/<Name>.vue` overrides the library's `<Name>.vue` (default dir `src/lib/nbUI`). */
export function nbUi(options?: { dir?: string }): Plugin
