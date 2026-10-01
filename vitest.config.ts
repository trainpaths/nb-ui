import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// separate from vite.config.ts, whose root is the playground
export default defineConfig({
	plugins: [vue()],
	test: { environment: 'happy-dom', include: ['tests/**/*.test.ts'] },
})
