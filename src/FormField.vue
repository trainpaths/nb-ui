<script setup lang="ts">
import { computed, provide, useId } from 'vue'
import { FIELD_KEY } from './useField'

/** Label + control + hint/error. The control inside picks up id, invalid state and aria-describedby. */
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

const autoId = useId()
const fieldId = computed(() => props.id || `field-${autoId}`)
const messageId = computed(() => `${fieldId.value}-msg`)
const hasError = computed(() => !!props.error)

provide(FIELD_KEY, {
	id: fieldId,
	invalid: hasError,
	describedBy: computed(() => (props.error || props.hint ? messageId.value : undefined)),
})
</script>

<template>
	<div class="flex flex-col gap-4">
		<label
			v-if="label"
			:for="fieldId"
			class="text-sm font-medium text-black"
		>
			{{ label }}<span v-if="required" class="ml-2 text-error" aria-hidden="true">*</span>
		</label>
		<slot />
		<p
			v-if="error"
			:id="messageId"
			class="m-0 text-sm text-error"
		>
			{{ error }}
		</p>
		<p
			v-else-if="hint"
			:id="messageId"
			class="m-0 text-sm text-black/60"
		>
			{{ hint }}
		</p>
	</div>
</template>
