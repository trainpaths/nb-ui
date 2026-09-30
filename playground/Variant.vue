<script setup lang="ts">
/** Labelled row inside a demo. */
defineProps<{ label: string }>()
</script>

<template>
	<div class="flex flex-col gap-8">
		<p class="m-0 font-mono text-xs text-gray-400">{{ label }}</p>
		<div class="flex flex-wrap items-start gap-12">
			<slot />
		</div>
	</div>
</template>
