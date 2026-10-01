<script setup lang="ts" generic="T extends string | number">
import { computed } from 'vue'
import Icon from './Icon.vue'
import { inputFocus } from './styles'
import { useControlAttrs, useField } from './useField'

export interface SelectOption<V = string | number> {
	value: V
	label: string
	disabled?: boolean
}

/** Native `<select>` styled like Input. `options` as values or `{ value, label }`, or `<option>`s in the slot. */
const props = withDefaults(
	defineProps<{
		modelValue?: T | null
		options?: (T | SelectOption<T>)[]
		/** first, unselectable entry shown while nothing is picked */
		placeholder?: string
		disabled?: boolean
		invalid?: boolean
		id?: string
		size?: 'sm' | 'md' | 'lg'
	}>(),
	{
		modelValue: null,
		options: () => [],
		placeholder: undefined,
		disabled: false,
		invalid: false,
		id: undefined,
		size: 'md',
	},
)

const emit = defineEmits<{ 'update:modelValue': [value: T] }>()
const field = useField(props)

defineOptions({ inheritAttrs: false })
const { root: rootAttrs, control: controlAttrs } = useControlAttrs()

const normalized = computed(() =>
	props.options.map((o) => (typeof o === 'object' ? o : { value: o, label: String(o), disabled: false })),
)

const sizeClasses = { sm: 'py-4 text-xs', md: 'py-6 text-sm', lg: 'py-8 text-base' }

const classes = computed(() => {
	const border = field.invalid.value ? 'border-error' : 'border-gray-300'
	const empty = props.modelValue === null || props.modelValue === '' ? 'text-black/40' : 'text-black'
	return `w-full cursor-pointer appearance-none rounded-md border bg-white pl-12 pr-32 outline-hidden ${border} ${empty} ${inputFocus} ${sizeClasses[props.size]} disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-70`
})

// <select> only yields strings: map back to the original (number) value
function onChange(event: Event) {
	const raw = (event.target as HTMLSelectElement).value
	const match = normalized.value.find((o) => String(o.value) === raw)
	emit('update:modelValue', (match ? match.value : raw) as T)
}
</script>

<template>
	<div
		class="relative"
		v-bind="rootAttrs"
	>
		<select
			v-bind="controlAttrs"
			:id="field.id.value"
			:value="modelValue ?? ''"
			:disabled="disabled"
			:aria-invalid="field.invalid.value || undefined"
			:aria-describedby="field.describedBy.value"
			:class="classes"
			@change="onChange"
		>
			<option
				v-if="placeholder"
				value=""
				disabled
			>
				{{ placeholder }}
			</option>
			<option
				v-for="o in normalized"
				:key="String(o.value)"
				:value="o.value"
				:disabled="o.disabled"
				class="text-black"
			>
				{{ o.label }}
			</option>
			<slot />
		</select>
		<Icon
			name="chevron-down"
			class="pointer-events-none absolute top-1/2 right-10 -translate-y-1/2 text-black/50"
		/>
	</div>
</template>
