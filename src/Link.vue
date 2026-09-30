<script setup lang="ts">
import { computed } from 'vue'
import { type Color, textColor } from './colors'

interface Props {
	to?: string
	href?: string
	text?: Color
	underline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	text: 'primary',
	underline: false,
})

const classes = computed(() => {
	const base = 'cursor-pointer'
	return `${base} ${textColor(props.text)} ${props.underline ? 'underline' : 'no-underline hover:underline'}`
})
</script>

<template>
	<router-link
		v-if="to"
		:to="to"
		:class="classes"
	>
		<slot />
	</router-link>
	<a
		v-else
		:href="href"
		:class="classes"
	>
		<slot />
	</a>
</template>
