<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { inputFocus } from './styles'
import { useControlAttrs, useField } from './useField'

/** Multi-line Input. `autoResize` grows with the content; `counter` shows length / maxlength. */
const props = withDefaults(
	defineProps<{
		modelValue?: string
		placeholder?: string
		rows?: number
		autoResize?: boolean
		maxlength?: number
		counter?: boolean
		disabled?: boolean
		invalid?: boolean
		id?: string
	}>(),
	{
		modelValue: '',
		placeholder: '',
		rows: 3,
		autoResize: false,
		maxlength: undefined,
		counter: false,
		disabled: false,
		invalid: false,
		id: undefined,
	},
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const field = useField(props)

defineOptions({ inheritAttrs: false })
const { root: rootAttrs, control: controlAttrs } = useControlAttrs()
const el = ref<HTMLTextAreaElement | null>(null)

const classes = computed(() => {
	const border = field.invalid.value ? 'border-error' : 'border-gray-300'
	return `block w-full rounded-md border bg-white px-12 py-6 text-sm text-black outline-hidden placeholder:text-black/40 ${border} ${inputFocus} ${props.autoResize ? 'resize-none overflow-hidden' : 'resize-y'} disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-70`
})

function resize() {
	if (!props.autoResize || !el.value) return
	el.value.style.height = 'auto'
	el.value.style.height = `${el.value.scrollHeight + 2}px` // + top/bottom border
}

onMounted(resize)
watch(
	() => props.modelValue,
	() => nextTick(resize),
)
</script>

<template>
	<div v-bind="rootAttrs">
		<textarea
			v-bind="controlAttrs"
			ref="el"
			:id="field.id.value"
			:value="modelValue"
			:placeholder="placeholder"
			:rows="rows"
			:maxlength="maxlength"
			:disabled="disabled"
			:aria-invalid="field.invalid.value || undefined"
			:aria-describedby="field.describedBy.value"
			:class="classes"
			@input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
		/>
		<p
			v-if="counter"
			class="m-0 mt-4 text-right text-xs text-black/50"
			aria-live="polite"
		>
			{{ modelValue.length }}<template v-if="maxlength"> / {{ maxlength }}</template>
		</p>
	</div>
</template>
