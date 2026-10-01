<script setup lang="ts">
import { computed } from 'vue'
import { type Color, bgColor, borderColor } from './colors'

interface Props {
	padding?: 'none' | 'sm' | 'md' | 'lg'
	bg?: Color
	border?: Color
	/** heading shown in the header (or use the `header` slot) */
	title?: string
	/** lines between header / body / footer */
	divided?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	padding: 'md',
	bg: 'white',
	border: undefined,
	title: undefined,
	divided: false,
})

const paddingClasses = {
	none: '',
	sm: 'p-8',
	md: 'p-16',
	lg: 'p-32',
}
const headerGap = { none: '', sm: 'pb-8 mb-8', md: 'pb-16 mb-16', lg: 'pb-24 mb-24' }
const footerGap = { none: '', sm: 'pt-8 mt-8', md: 'pt-16 mt-16', lg: 'pt-24 mt-24' }

const classes = computed(() => {
	const border = props.border ? borderColor(props.border) : 'border-gray-200'
	return `rounded-lg border shadow-xs ${paddingClasses[props.padding]} ${bgColor(props.bg)} ${border}`
})

// divided: padding below the header + rule; otherwise just a margin
const headerClass = computed(() => (props.divided ? `border-b border-gray-200 ${headerGap[props.padding]}` : 'mb-16'))
const footerClass = computed(() => (props.divided ? `border-t border-gray-200 ${footerGap[props.padding]}` : 'mt-16'))
</script>

<template>
	<div :class="classes">
		<div
			v-if="$slots.header || title"
			:class="headerClass"
		>
			<slot name="header">
				<h3 class="m-0 text-base font-semibold text-black">{{ title }}</h3>
			</slot>
		</div>
		<slot />
		<div
			v-if="$slots.footer"
			:class="footerClass"
		>
			<slot name="footer" />
		</div>
	</div>
</template>
