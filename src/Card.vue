<script setup lang="ts">
import { computed } from 'vue'
import { type Color, bgColor, borderColor } from './colors'

interface Props {
	padding?: 'none' | 'sm' | 'md' | 'lg'
	bg?: Color
	border?: Color
}

const props = withDefaults(defineProps<Props>(), {
	padding: 'md',
	bg: 'white',
	border: undefined,
})

const paddingClasses: Record<string, string> = {
	none: '',
	sm: 'p-8',
	md: 'p-16',
	lg: 'p-32',
}

const classes = computed(() => {
	const base = 'rounded-lg border shadow-xs'
	const border = props.border ? borderColor(props.border) : 'border-gray-200'
	return `${base} ${paddingClasses[props.padding]} ${bgColor(props.bg)} ${border}`
})
</script>

<template>
	<div :class="classes">
		<div v-if="$slots.header" class="mb-16">
			<slot name="header" />
		</div>
		<slot />
		<div v-if="$slots.footer" class="mt-16">
			<slot name="footer" />
		</div>
	</div>
</template>
