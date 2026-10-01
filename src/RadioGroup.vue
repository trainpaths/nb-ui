<script setup lang="ts" generic="T extends string | number">
import { useId } from 'vue'
import { useField } from './useField'

export interface RadioOption<V = string | number> {
	value: V
	label: string
	description?: string
	disabled?: boolean
}

/** Group of native radios in a fieldset (arrow keys move between them natively). */
const props = withDefaults(
	defineProps<{
		modelValue?: T | null
		options: (T | RadioOption<T>)[]
		/** fieldset legend; omit when a surrounding FormField labels it */
		legend?: string
		orientation?: 'vertical' | 'horizontal'
		disabled?: boolean
		invalid?: boolean
		id?: string
		name?: string
	}>(),
	{ modelValue: null, legend: undefined, orientation: 'vertical', disabled: false, invalid: false, id: undefined, name: undefined },
)

const emit = defineEmits<{ 'update:modelValue': [value: T] }>()
const field = useField(props)
const groupName = props.name ?? `radio-${useId()}`

const normalize = (o: T | RadioOption<T>): RadioOption<T> =>
	typeof o === 'object' ? o : { value: o, label: String(o) }
</script>

<template>
	<fieldset
		:id="field.id.value"
		class="m-0 min-w-0 border-none p-0"
		:aria-invalid="field.invalid.value || undefined"
		:aria-describedby="field.describedBy.value"
		:disabled="disabled"
	>
		<legend
			v-if="legend"
			class="mb-8 p-0 text-sm font-medium text-black"
		>
			{{ legend }}
		</legend>
		<div
			class="flex gap-8"
			:class="orientation === 'horizontal' ? 'flex-row flex-wrap gap-x-20' : 'flex-col'"
		>
			<label
				v-for="o in options.map(normalize)"
				:key="String(o.value)"
				class="inline-flex items-start gap-8 text-sm text-black"
				:class="disabled || o.disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'"
			>
				<input
					type="radio"
					class="peer sr-only"
					:name="groupName"
					:value="o.value"
					:checked="modelValue === o.value"
					:disabled="o.disabled"
					@change="emit('update:modelValue', o.value)"
				/>
				<span
					aria-hidden="true"
					class="mt-2 flex size-16 shrink-0 items-center justify-center rounded-full border bg-white transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-dark"
					:class="modelValue === o.value ? 'border-accent-dark' : field.invalid.value ? 'border-error' : 'border-gray-400'"
				>
					<span
						class="size-8 rounded-full bg-accent-dark transition-transform motion-reduce:transition-none"
						:class="modelValue === o.value ? 'scale-100' : 'scale-0'"
					/>
				</span>
				<span class="flex flex-col">
					<span>{{ o.label }}</span>
					<span
						v-if="o.description"
						class="text-xs text-black/60"
						>{{ o.description }}</span
					>
				</span>
			</label>
		</div>
	</fieldset>
</template>
