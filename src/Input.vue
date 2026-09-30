<script setup lang="ts">
import { computed } from 'vue'
import { type Color, borderColor, bgColor, textColor } from './colors'

interface Props {
	type?: 'text' | 'email' | 'password' | 'number'
	modelValue?: string | number
	placeholder?: string
	disabled?: boolean
	id?: string
	border?: Color
	bg?: Color
	text?: Color
	invalid?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	type: 'text',
	modelValue: '',
	placeholder: '',
	disabled: false,
	border: undefined,
	bg: 'white',
	text: 'black',
	invalid: false,
})

const emit = defineEmits<{
	'update:modelValue': [value: string | number]
}>()

const effectiveBorder = computed(() => (props.invalid ? 'error' : props.border))

const classes = computed(() => {
	const base =
		'w-full rounded-md border px-12 py-6 text-sm outline-hidden focus:border-primary focus:ring-1 focus:ring-primary disabled:bg-gray-50'
	const border = effectiveBorder.value ? borderColor(effectiveBorder.value) : 'border-gray-300'
	return `${base} ${bgColor(props.bg)} ${border} ${textColor(props.text)}`
})

const onInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	emit('update:modelValue', props.type === 'number' ? Number(target.value) : target.value)
}
</script>

<template>
	<input
		:type="type"
		:value="modelValue"
		:placeholder="placeholder"
		:disabled="disabled"
		:id="id"
		:class="classes"
		@input="onInput"
	/>
</template>
