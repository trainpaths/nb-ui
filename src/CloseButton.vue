<script setup lang="ts">
import Icon from './Icon.vue'
import { focusRing } from './styles'

/** ✕ button for dismissing toasts, alerts, dialogs, chips. Inherits the surrounding text colour. */
withDefaults(defineProps<{ label?: string; size?: number }>(), {
	label: 'Close',
	size: 16,
})
</script>

<template>
	<button
		type="button"
		:aria-label="label"
		:class="[
			'inline-flex shrink-0 cursor-pointer items-center justify-center rounded border-none bg-transparent p-2 text-inherit opacity-70 transition-opacity hover:opacity-100 active:opacity-50',
			focusRing,
		]"
	>
		<Icon
			name="x"
			:size="size"
		/>
	</button>
</template>
