<script setup lang="ts">
import { useField } from './useField'
import { focusRing } from './styles'

/** On/off toggle (`role="switch"`) for settings that apply immediately. Label on the left, track on the right. */
const props = withDefaults(
	defineProps<{
		modelValue?: boolean
		label?: string
		description?: string
		disabled?: boolean
		id?: string
		size?: 'sm' | 'md'
	}>(),
	{ modelValue: false, label: undefined, description: undefined, disabled: false, id: undefined, size: 'md' },
)

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()
const field = useField(props)

const track = { sm: 'h-16 w-28', md: 'h-20 w-36' }
const thumb = { sm: 'size-12', md: 'size-16' }
const shift = { sm: 'translate-x-12', md: 'translate-x-16' }
</script>

<template>
	<label
		class="inline-flex items-center justify-between gap-12 text-sm text-black"
		:class="disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'"
	>
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
		<button
			:id="field.id.value"
			type="button"
			role="switch"
			:aria-checked="modelValue"
			:aria-describedby="field.describedBy.value"
			:disabled="disabled"
			:class="[
				'relative inline-flex shrink-0 cursor-[inherit] items-center rounded-full border-none p-2 transition-colors',
				track[size],
				modelValue ? 'bg-accent-dark' : 'bg-gray-300',
				focusRing,
			]"
			@click="emit('update:modelValue', !modelValue)"
		>
			<span
				:class="[
					'rounded-full bg-white shadow-sm transition-transform motion-reduce:transition-none',
					thumb[size],
					modelValue ? shift[size] : 'translate-x-0',
				]"
			/>
		</button>
	</label>
</template>
