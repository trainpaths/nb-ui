<script setup lang="ts">
interface Props {
	label?: string
}

defineProps<Props>()
</script>

<template>
	<div class="flex items-center justify-between gap-16 py-8">
		<dt class="text-sm font-medium text-black opacity-60">
			<slot name="label">{{ label }}</slot>
		</dt>
		<dd class="text-right text-black">
			<slot />
		</dd>
	</div>
</template>
