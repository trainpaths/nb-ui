<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { type Color, bgColor, onColor, textColor } from './colors'

/** Round user image; falls back to initials of `name` (stable colour per name) when no/broken `src`. */
const props = withDefaults(
	defineProps<{ src?: string; name?: string; size?: 'sm' | 'md' | 'lg' | 'xl'; color?: Color }>(),
	{ src: undefined, name: '', size: 'md', color: undefined },
)

const failed = ref(false)
watch(
	() => props.src,
	() => (failed.value = false),
)

const sizes = { sm: 'size-24 text-[10px]', md: 'size-32 text-xs', lg: 'size-48 text-base', xl: 'size-64 text-xl' }
const palette = ['primary', 'accent', 'secondary', 'success', 'accent-dark', 'primary-dark']

const initials = computed(() => {
	const parts = props.name.trim().split(/\s+/).filter(Boolean)
	if (!parts.length) return '?'
	const first = parts[0]![0] ?? ''
	const last = parts.length > 1 ? (parts[parts.length - 1]![0] ?? '') : ''
	return (first + last).toUpperCase()
})

const fill = computed(() => {
	if (props.color) return props.color
	let hash = 0
	for (const ch of props.name) hash = (hash * 31 + ch.charCodeAt(0)) | 0
	return palette[Math.abs(hash) % palette.length]!
})
</script>

<template>
	<img
		v-if="src && !failed"
		:src="src"
		:alt="name"
		:class="['inline-block shrink-0 rounded-full object-cover', sizes[size]]"
		@error="failed = true"
	/>
	<span
		v-else
		role="img"
		:aria-label="name || 'User'"
		:class="[
			'inline-flex shrink-0 items-center justify-center rounded-full font-semibold select-none',
			sizes[size],
			bgColor(fill),
			textColor(onColor(fill)),
		]"
	>
		{{ initials }}
	</span>
</template>
