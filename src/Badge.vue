<script setup lang="ts">
import { computed } from 'vue'
import { type Color, onColor } from './colors'
import CloseButton from './CloseButton.vue'

/** Small status / tag label. `removable` adds an ✕ that emits `remove`. */
const props = withDefaults(
	defineProps<{
		color?: Color
		variant?: 'soft' | 'solid' | 'outline'
		size?: 'sm' | 'md'
		/** leading coloured dot */
		dot?: boolean
		removable?: boolean
	}>(),
	{ color: 'accent', variant: 'soft', size: 'md', dot: false, removable: false },
)

const emit = defineEmits<{ remove: [] }>()

// soft/outline use black text: most tokens are too light for small coloured text on a tint
const classes = computed(() => {
	const size = props.size === 'sm' ? 'px-6 py-0 text-[11px]' : 'px-8 py-2 text-xs'
	const variant = {
		soft: `bg-${props.color}/20 text-black border-transparent`,
		solid: `bg-${props.color} text-${onColor(props.color)} border-transparent`,
		outline: `bg-transparent text-black border-${props.color}`,
	}[props.variant]
	return `inline-flex items-center gap-4 rounded-pill border font-medium leading-normal whitespace-nowrap ${size} ${variant}`
})
</script>

<template>
	<span :class="classes">
		<span
			v-if="dot"
			class="size-6 rounded-full"
			:class="variant === 'solid' ? 'bg-current' : `bg-${color}`"
			aria-hidden="true"
		/>
		<slot />
		<CloseButton
			v-if="removable"
			:size="12"
			label="Remove"
			class="-mr-4 rounded-pill p-0!"
			@click="emit('remove')"
		/>
	</span>
</template>
