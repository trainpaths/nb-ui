<script setup lang="ts">
import { computed } from 'vue'
import { type Color, bgColor, borderColor, onColor, textColor } from './colors'
import { focusRing } from './styles'
import Spinner from './Spinner.vue'

interface Props {
	bg?: Color
	/** defaults to `bg` */
	border?: Color
	/** defaults by variant: readable on `bg` for solid, accent-dark for outline/ghost */
	text?: Color
	variant?: 'solid' | 'outline' | 'ghost'
	size?: 'sm' | 'md' | 'lg'
	loading?: boolean
	disabled?: boolean
	as?: 'button' | 'a'
	/** full width */
	block?: boolean
	/** equal padding, for icon-only buttons (give them an aria-label) */
	square?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	bg: 'accent',
	border: undefined,
	text: undefined,
	variant: 'solid',
	size: 'md',
	loading: false,
	disabled: false,
	as: 'button',
	block: false,
	square: false,
})

const sizeClasses = {
	sm: 'px-12 py-4 text-xs',
	md: 'px-16 py-6 text-sm',
	lg: 'px-20 py-8 text-base',
}
const squareClasses = { sm: 'p-4 text-xs', md: 'p-6 text-sm', lg: 'p-8 text-base' }

// tokens with a darker sibling hover to it; the rest darken via filter
const darker: Record<string, string> = {
	primary: 'hover:bg-primary-dark hover:border-primary-dark',
	accent: 'hover:bg-accent-dark hover:border-accent-dark hover:text-white',
}

const border = computed(() => props.border ?? props.bg)

const classes = computed(() => {
	const base = `relative inline-flex items-center justify-center gap-6 rounded border font-medium cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-not-allowed aria-disabled:opacity-60 aria-disabled:pointer-events-none ${focusRing}`
	const size = props.square ? squareClasses[props.size] : sizeClasses[props.size]
	const width = props.block ? 'w-full' : ''

	let colorClasses: string
	if (props.variant === 'solid') {
		const hover = darker[props.bg] ?? 'hover:brightness-95'
		colorClasses = `${bgColor(props.bg)} ${borderColor(border.value)} ${textColor(props.text ?? onColor(props.bg))} ${hover}`
	} else {
		const tint = `hover:bg-${props.variant === 'outline' ? border.value : (props.text ?? 'accent-dark')}/10`
		const frame = props.variant === 'outline' ? `bg-white ${borderColor(border.value)}` : 'bg-transparent border-transparent'
		// outline/ghost on accent: accent-dark text, since accent itself is unreadable on white
		const fallback = border.value === 'accent' ? 'accent-dark' : border.value
		colorClasses = `${frame} ${textColor(props.text ?? (props.variant === 'outline' ? fallback : 'accent-dark'))} ${tint}`
	}

	return `${base} ${size} ${width} ${colorClasses}`
})

const isDisabled = computed(() => props.disabled || props.loading)
</script>

<template>
	<component
		:is="as"
		:class="classes"
		:disabled="as === 'button' ? isDisabled : undefined"
		:aria-disabled="as === 'a' && isDisabled ? 'true' : undefined"
		:aria-busy="loading ? 'true' : undefined"
		:type="as === 'button' ? 'button' : undefined"
	>
		<!-- type="button" default: a fallthrough type="submit" overrides it -->
		<!-- label stays in the layout (invisible) so the width doesn't jump while loading -->
		<span
			class="inline-flex items-center gap-6"
			:class="{ invisible: loading }"
		>
			<slot />
		</span>
		<span
			v-if="loading"
			class="absolute inset-0 flex items-center justify-center"
		>
			<Spinner
				size="sm"
				color="current"
				label="Loading"
			/>
		</span>
	</component>
</template>
