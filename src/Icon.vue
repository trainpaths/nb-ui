<script setup lang="ts">
/**
 * Small built-in stroke icon set (24×24, `currentColor`), so components need no icon dependency.
 * Decorative by default (`aria-hidden`); pass `label` to expose it to screen readers.
 */
import { computed } from 'vue'

export type IconName =
	| 'x'
	| 'check'
	| 'minus'
	| 'plus'
	| 'chevron-down'
	| 'chevron-up'
	| 'chevron-left'
	| 'chevron-right'
	| 'info'
	| 'alert-triangle'
	| 'alert-circle'
	| 'check-circle'
	| 'more'
	| 'search'
	| 'inbox'

const props = withDefaults(defineProps<{ name: IconName; size?: number; label?: string }>(), {
	size: 16,
	label: undefined,
})

const paths: Record<IconName, string[]> = {
	x: ['M18 6 6 18', 'M6 6l12 12'],
	check: ['M20 6 9 17l-5-5'],
	minus: ['M5 12h14'],
	plus: ['M12 5v14', 'M5 12h14'],
	'chevron-down': ['m6 9 6 6 6-6'],
	'chevron-up': ['m18 15-6-6-6 6'],
	'chevron-left': ['m15 18-6-6 6-6'],
	'chevron-right': ['m9 18 6-6-6-6'],
	info: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 16v-4', 'M12 8h.01'],
	'alert-triangle': [
		'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z',
		'M12 9v4',
		'M12 17h.01',
	],
	'alert-circle': ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 8v4', 'M12 16h.01'],
	'check-circle': ['M22 11.08V12a10 10 0 1 1-5.93-9.14', 'm9 11 3 3L22 4'],
	more: ['M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z', 'M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z', 'M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'],
	search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'm21 21-4.3-4.3'],
	inbox: [
		'M22 12h-6l-2 3h-4l-2-3H2',
		'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
	],
}

const d = computed(() => paths[props.name])
</script>

<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		:width="size"
		:height="size"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="shrink-0"
		:aria-hidden="label ? undefined : 'true'"
		:aria-label="label"
		:role="label ? 'img' : undefined"
	>
		<path
			v-for="p in d"
			:key="p"
			:d="p"
		/>
	</svg>
</template>
