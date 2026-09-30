import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// dev playground only; the package itself ships as source, no build
export default defineConfig({
	root: 'playground',
	plugins: [vue(), tailwindcss()],
	build: { outDir: '../dist', emptyOutDir: true },
})
