<script setup lang="ts">
const emit = defineEmits<{
	submit: [event: SubmitEvent]
}>()
</script>

<template>
	<form
		class="flex flex-col gap-8"
		@submit.prevent="emit('submit', $event)"
	>
		<slot />
	</form>
</template>
