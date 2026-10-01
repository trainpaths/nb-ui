<script setup lang="ts">
import { computed } from 'vue'
import Icon from './Icon.vue'
import { useField } from './useField'

/**
 * Checkbox with label. `v-model` as boolean, or as an array together with `value` (checked = array contains it).
 * A real (visually hidden) native input keeps keyboard, forms and screen readers working.
 */
const props = withDefaults(
	defineProps<{
		modelValue?: boolean | unknown[]
		value?: unknown
		label?: string
		description?: string
		indeterminate?: boolean
		disabled?: boolean
		invalid?: boolean
		id?: string
	}>(),
	{
		modelValue: false,
		value: undefined,
		label: undefined,
		description: undefined,
		indeterminate: false,
		disabled: false,
		invalid: false,
		id: undefined,
	},
)

const emit = defineEmits<{ 'update:modelValue': [value: boolean | unknown[]] }>()
const field = useField(props)

const checked = computed(() =>
	Array.isArray(props.modelValue) ? props.modelValue.includes(props.value) : props.modelValue,
)

function onChange(event: Event) {
	const on = (event.target as HTMLInputElement).checked
	if (!Array.isArray(props.modelValue)) return emit('update:modelValue', on)
	emit('update:modelValue', on ? [...props.modelValue, props.value] : props.modelValue.filter((v) => v !== props.value))
}

const boxClasses = computed(() => {
	const filled = checked.value || props.indeterminate
	const state = filled ? 'border-accent-dark bg-accent-dark text-white' : 'bg-white text-transparent'
	const border = field.invalid.value && !filled ? 'border-error' : filled ? '' : 'border-gray-400'
	return `mt-2 flex size-16 shrink-0 items-center justify-center rounded-sm border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-dark ${state} ${border}`
})
</script>

<template>
	<label
		class="inline-flex items-start gap-8 text-sm text-black"
		:class="disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'"
	>
		<input
			:id="field.id.value"
			type="checkbox"
			class="peer sr-only"
			:checked="checked"
			:indeterminate="indeterminate"
			:disabled="disabled"
			:aria-invalid="field.invalid.value || undefined"
			:aria-describedby="field.describedBy.value"
			@change="onChange"
		/>
		<span
			:class="boxClasses"
			aria-hidden="true"
		>
			<Icon
				:name="indeterminate ? 'minus' : 'check'"
				:size="12"
				class="stroke-3"
			/>
		</span>
		<span
			v-if="label || description || $slots.default"
			class="flex flex-col"
		>
			<span><slot>{{ label }}</slot></span>
			<span
				v-if="description"
				class="text-xs text-black/60"
				>{{ description }}</span
			>
		</span>
	</label>
</template>
