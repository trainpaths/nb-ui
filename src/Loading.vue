<script setup lang="ts">
import Spinner from './Spinner.vue'

/** Spinner + label for data that is still loading. `fullscreen` centres it in the viewport. */
withDefaults(defineProps<{ label?: string; fullscreen?: boolean }>(), {
	label: 'Loading…',
	fullscreen: false,
})
</script>

<template>
	<div
		class="flex items-center justify-center gap-8 font-sans text-sm text-black/60"
		:class="fullscreen ? 'h-screen' : 'py-32'"
		role="status"
		data-testid="loading"
	>
		<Spinner />
		{{ label }}
	</div>
</template>
