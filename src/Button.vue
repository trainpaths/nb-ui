<script setup lang="ts">
import { computed } from 'vue'
import { type Color, bgColor, borderColor, textColor } from './colors'

interface Props {
	bg?: Color
	border?: Color
	text?: Color
	variant?: 'solid' | 'outline' | 'ghost'
	size?: 'sm' | 'md' | 'lg'
	loading?: boolean
	disabled?: boolean
	as?: 'button' | 'a'
}

const props = withDefaults(defineProps<Props>(), {
	bg: 'primary',
	border: 'primary',
	text: 'white',
	variant: 'solid',
	size: 'md',
	loading: false,
	disabled: false,
	as: 'button',
})

const sizeClasses: Record<string, string> = {
	sm: 'px-12 py-4 text-xs',
	md: 'px-16 py-6 text-sm',
	lg: 'px-20 py-8 text-base',
}

const classes = computed(() => {
	const base =
		'inline-flex items-center justify-center gap-6 rounded font-medium cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
	const size = sizeClasses[props.size]

	let colorClasses = ''
	if (props.variant === 'solid') {
		// The theme's primary gets its darker hover shade; other colours just dim slightly.
		const hover = props.bg === 'primary' ? 'hover:bg-primary-dark hover:border-primary-dark' : 'hover:opacity-90'
		colorClasses = `${bgColor(props.bg)} ${textColor(props.text)} border ${borderColor(props.border)} ${hover}`
	} else if (props.variant === 'outline') {
		colorClasses = `bg-white border ${borderColor(props.border)} ${textColor(props.text)} hover:bg-gray-50`
	} else {
		colorClasses = `bg-transparent border-none ${textColor(props.text)} hover:underline`
	}

	return `${base} ${size} ${colorClasses}`
})

const isDisabled = computed(() => props.disabled || props.loading)
</script>

<template>
	<component
		:is="as"
		:class="classes"
		:disabled="isDisabled"
	>
		<slot v-if="!loading" />
		<span v-else>Loading...</span>
	</component>
</template>
