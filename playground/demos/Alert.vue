<script setup lang="ts">
import { ref } from 'vue'
import { Alert } from '../../index'
import Variant from '../Variant.vue'

const shown = ref(true)
</script>

<template>
	<Variant label="type">
		<div class="flex w-full max-w-480 flex-col gap-8">
			<Alert type="info">Info message</Alert>
			<Alert type="success">Success message</Alert>
			<Alert type="warning">Warning message</Alert>
			<Alert type="error">Error message</Alert>
		</div>
	</Variant>
	<Variant label="dismissible">
		<div class="w-full max-w-480">
			<Alert v-if="shown" type="info" dismissible @dismiss="shown = false">Close me</Alert>
			<button v-else type="button" class="text-xs" @click="shown = true">Show again</button>
		</div>
	</Variant>
</template>
