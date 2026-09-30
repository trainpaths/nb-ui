<script setup lang="ts">
/** Spinner + label for data that is still loading. `fullscreen` centres it in the viewport. */
withDefaults(defineProps<{ label?: string; fullscreen?: boolean }>(), {
	label: 'Loading…',
	fullscreen: false,
})
</script>

<template>
	<div
		class="flex items-center justify-center gap-8 font-sans text-sm text-gray-400"
		:class="fullscreen ? 'h-screen' : 'py-32'"
		role="status"
		data-testid="loading"
	>
		<span class="size-16 animate-spin rounded-full border-2 border-gray-200 border-t-primary" />
		{{ label }}
	</div>
</template>
