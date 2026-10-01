<script setup lang="ts">
import { computed } from 'vue'
import { type Color, borderColor, bgColor, textColor } from './colors'
import { inputFocus } from './styles'
import { useField } from './useField'

interface Props {
	type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'
	modelValue?: string | number
	placeholder?: string
	disabled?: boolean
	id?: string
	border?: Color
	bg?: Color
	text?: Color
	invalid?: boolean
	size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
	type: 'text',
	modelValue: '',
	placeholder: '',
	disabled: false,
	id: undefined,
	border: undefined,
	bg: 'white',
	text: 'black',
	invalid: false,
	size: 'md',
})

const emit = defineEmits<{
	'update:modelValue': [value: string | number]
}>()

const slots = defineSlots<{ prefix?(): unknown; suffix?(): unknown }>()
const field = useField(props)

const sizeClasses = { sm: 'py-4 text-xs', md: 'py-6 text-sm', lg: 'py-8 text-base' }

const borderClass = computed(() => {
	if (field.invalid.value) return borderColor('error')
	return props.border ? borderColor(props.border) : 'border-gray-300'
})

// with prefix/suffix the wrapper draws the frame and takes the focus ring
const framed = computed(() => !!(slots.prefix || slots.suffix))

const frameClasses = computed(
	() =>
		`rounded-md border transition-colors ${bgColor(props.bg)} ${borderClass.value} ${textColor(props.text)} has-disabled:bg-gray-50 has-disabled:opacity-70`,
)

const inputClasses = computed(() => {
	const base = `w-full min-w-0 px-12 outline-hidden placeholder:text-black/40 ${sizeClasses[props.size]}`
	if (framed.value) return `${base} border-none bg-transparent`
	return `${base} ${frameClasses.value} ${inputFocus} disabled:cursor-not-allowed`
})

const onInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	emit('update:modelValue', props.type === 'number' ? Number(target.value) : target.value)
}
</script>

<template>
	<div
		v-if="framed"
		:class="[
			frameClasses,
			'flex items-center focus-within:border-accent-dark focus-within:ring-1 focus-within:ring-accent-dark',
		]"
	>
		<span
			v-if="slots.prefix"
			class="flex shrink-0 items-center pl-12 text-black/50"
			:class="sizeClasses[size]"
		>
			<slot name="prefix" />
		</span>
		<input
			:type="type"
			:value="modelValue"
			:placeholder="placeholder"
			:disabled="disabled"
			:id="field.id.value"
			:aria-invalid="field.invalid.value || undefined"
			:aria-describedby="field.describedBy.value"
			:class="[inputClasses, slots.prefix ? 'pl-4!' : '', slots.suffix ? 'pr-4!' : '']"
			@input="onInput"
		/>
		<span
			v-if="slots.suffix"
			class="flex shrink-0 items-center pr-12 text-black/50"
			:class="sizeClasses[size]"
		>
			<slot name="suffix" />
		</span>
	</div>
	<input
		v-else
		:type="type"
		:value="modelValue"
		:placeholder="placeholder"
		:disabled="disabled"
		:id="field.id.value"
		:aria-invalid="field.invalid.value || undefined"
		:aria-describedby="field.describedBy.value"
		:class="inputClasses"
		@input="onInput"
	/>
</template>
