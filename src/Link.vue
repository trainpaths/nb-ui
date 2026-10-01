<script setup lang="ts">
import { computed } from 'vue'
import { type Color, textColor } from './colors'
import { focusRing } from './styles'

interface Props {
	to?: string
	href?: string
	text?: Color
	underline?: boolean
	/** opens in a new tab (`rel=noopener noreferrer`) */
	external?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	text: 'accent-dark',
	underline: false,
	external: false,
})

const classes = computed(() => {
	const line = props.underline ? 'underline' : 'no-underline hover:underline'
	return `cursor-pointer rounded-xs underline-offset-2 decoration-accent decoration-2 ${textColor(props.text)} ${line} ${focusRing}`
})

const externalAttrs = computed(() => (props.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}))
</script>

<template>
	<router-link
		v-if="to"
		:to="to"
		:class="classes"
		v-bind="externalAttrs"
	>
		<slot />
	</router-link>
	<a
		v-else
		:href="href"
		:class="classes"
		v-bind="externalAttrs"
	>
		<slot />
	</a>
</template>
