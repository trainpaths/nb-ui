<script setup lang="ts">
import { computed } from 'vue'
import { type Color, borderColor } from './colors'

/** Spinning ring. `color` is a theme token; `current` follows the text colour (e.g. inside a Button). */
const props = withDefaults(defineProps<{ size?: 'sm' | 'md' | 'lg'; color?: Color | 'current'; label?: string }>(), {
	size: 'md',
	color: 'accent-dark',
	label: undefined,
})

const sizeClasses = { sm: 'size-12 border-2', md: 'size-16 border-2', lg: 'size-32 border-3' }

const classes = computed(() => {
	const color = props.color === 'current' ? 'border-current' : borderColor(props.color)
	return `inline-block shrink-0 animate-spin rounded-full border-r-transparent! border-b-transparent! motion-reduce:animate-[spin_1.5s_linear_infinite] ${sizeClasses[props.size]} ${color}`
})
</script>

<template>
	<span
		:class="classes"
		:role="label ? 'status' : undefined"
		:aria-label="label"
		:aria-hidden="label ? undefined : 'true'"
	/>
</template>
