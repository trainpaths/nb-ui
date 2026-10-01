<script setup lang="ts">
import { ref } from 'vue'
import { Alert, Button } from '../../index'
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
	<Variant label="title / dismissible">
		<div class="w-full max-w-480">
			<Alert v-if="shown" type="warning" title="Unpublished changes" dismissible @dismiss="shown = false">
				This page has edits that are not live yet.
			</Alert>
			<Button v-else size="sm" variant="ghost" @click="shown = true">Show again</Button>
		</div>
	</Variant>
</template>
