<script setup lang="ts">
import { computed, provide } from 'vue'

interface Props {
	label?: string
	error?: string
	hint?: string
	required?: boolean
	id?: string
}

const props = withDefaults(defineProps<Props>(), {
	required: false,
})

const fieldId = computed(() => props.id || `field-${Math.random().toString(36).slice(2, 9)}`)
const hasError = computed(() => !!props.error)

provide('fieldId', fieldId)
provide('fieldInvalid', hasError)
</script>

<template>
	<div class="flex flex-col gap-4">
		<label
			v-if="label"
			:for="fieldId"
			class="text-sm font-medium text-gray-700"
		>
			{{ label }}<span v-if="required" class="text-error ml-2">*</span>
		</label>
		<slot />
		<p v-if="error" class="text-sm text-error">{{ error }}</p>
		<p v-else-if="hint" class="text-sm text-black opacity-60">{{ hint }}</p>
	</div>
</template>
