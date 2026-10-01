<script setup lang="ts">
import { computed, ref } from 'vue'
import CloseButton from './CloseButton.vue'

/**
 * Chips + text input for a list of single-word tags. Enter, comma and Space add (the highlighted suggestion or
 * the typed word); pasted text is split on whitespace/commas. Backspace on an empty input removes the last chip,
 * typing filters `suggestions` into a dropdown. `popular` renders as one-click chips under the input. Values pass
 * through `normalize` before adding.
 */
const props = withDefaults(
	defineProps<{
		modelValue: string[]
		suggestions?: string[]
		popular?: string[]
		max?: number
		maxLength?: number
		normalize?: (value: string) => string
		placeholder?: string
		label?: string
		testId?: string
	}>(),
	{
		suggestions: () => [],
		popular: () => [],
		max: Infinity,
		maxLength: undefined,
		normalize: (value: string) => value.trim(),
		placeholder: 'Add tag…',
		label: 'Tags',
		testId: 'tag-input',
	},
)
const emit = defineEmits<{ 'update:modelValue': [value: string[]] }>()

const text = ref('')
const open = ref(false)
const highlighted = ref(-1)
const input = ref<HTMLInputElement | null>(null)
const listId = `tag-list-${Math.random().toString(36).slice(2, 8)}`

const full = computed(() => props.modelValue.length >= props.max)
const matches = computed(() => {
	// only while typing: the popular row covers the empty input
	const query = props.normalize(text.value)
	if (!query) return []
	return props.suggestions
		.filter((s) => !props.modelValue.includes(s) && s.includes(query))
		.slice(0, 8)
})

/** Adds each word (one emit, so several words don't overwrite each other). */
function add(...raw: string[]) {
	text.value = ''
	highlighted.value = -1
	const next = [...props.modelValue]
	for (const tag of raw.map(props.normalize)) {
		if (!tag || next.length >= props.max || next.includes(tag)) continue
		if (props.maxLength && tag.length > props.maxLength) continue
		next.push(tag)
	}
	if (next.length > props.modelValue.length) emit('update:modelValue', next)
}

// paste / autocorrect can bring separators in: complete words become tags, the last part stays typed
function onInput() {
	open.value = true
	highlighted.value = -1
	if (!/[\s,]/.test(text.value)) return
	const parts = text.value.split(/[\s,]+/)
	const rest = parts.pop() ?? ''
	add(...parts)
	text.value = rest
}

function remove(tag: string) {
	emit(
		'update:modelValue',
		props.modelValue.filter((t) => t !== tag),
	)
}

function onKeydown(e: KeyboardEvent) {
	if (e.key === 'Enter' || e.key === ',' || e.key === ' ') {
		e.preventDefault()
		const pick = matches.value[highlighted.value]
		add(open.value && pick ? pick : text.value)
	} else if (e.key === 'Backspace' && !text.value && props.modelValue.length) {
		remove(props.modelValue[props.modelValue.length - 1]!)
	} else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
		e.preventDefault()
		open.value = true
		const n = matches.value.length
		const h = highlighted.value
		if (n) highlighted.value = e.key === 'ArrowDown' ? (h + 1) % n : h <= 0 ? n - 1 : h - 1
	} else if (e.key === 'Escape' && open.value) {
		// only closes the dropdown, not a surrounding dialog
		e.stopPropagation()
		open.value = false
	}
}

function onBlur() {
	open.value = false
	if (text.value.trim()) add(text.value)
}
</script>

<template>
	<div
		class="relative font-sans"
		:data-testid="testId"
	>
		<div
			class="flex min-h-32 cursor-text flex-wrap items-center gap-4 rounded-sm border border-gray-300 bg-white px-6 py-4 focus-within:border-accent-dark focus-within:ring-1 focus-within:ring-accent-dark"
			@click="input?.focus()"
		>
			<span
				v-for="tag in modelValue"
				:key="tag"
				class="inline-flex items-center gap-2 rounded-pill bg-accent/20 py-2 pl-8 pr-4 text-xs text-black"
				data-testid="tag-chip"
			>
				{{ tag }}
				<CloseButton
					:size="12"
					:label="`Remove tag ${tag}`"
					class="rounded-pill"
					@click.stop="remove(tag)"
				/>
			</span>
			<input
				ref="input"
				v-model="text"
				type="text"
				class="min-w-80 flex-1 border-none bg-transparent px-2 py-2 text-sm outline-hidden"
				:placeholder="full ? `Max ${max} tags` : placeholder"
				:disabled="full"
				:maxlength="maxLength"
				:aria-label="label"
				role="combobox"
				:aria-expanded="open && matches.length > 0"
				:aria-controls="listId"
				aria-autocomplete="list"
				data-testid="tag-text"
				@focus="open = true"
				@input="onInput"
				@keydown="onKeydown"
				@blur="onBlur"
			/>
		</div>
		<ul
			v-if="open && matches.length"
			:id="listId"
			role="listbox"
			class="absolute left-0 right-0 z-20 m-0 mt-2 max-h-200 list-none overflow-y-auto rounded-sm border border-gray-200 bg-white p-4 shadow-lg"
		>
			<li
				v-for="(match, index) in matches"
				:key="match"
				role="option"
				:aria-selected="index === highlighted"
				class="cursor-pointer rounded-sm px-8 py-4 text-sm"
				:class="index === highlighted ? 'bg-accent/20 text-black' : 'text-gray-700 hover:bg-gray-100'"
				data-testid="tag-suggestion"
				@mousedown.prevent="add(match)"
			>
				{{ match }}
			</li>
		</ul>
		<p
			v-if="popular.length"
			class="m-0 mt-6 flex flex-wrap items-center gap-4 text-xs text-gray-500"
			data-testid="tag-popular"
		>
			Popular:
			<button
				v-for="tag in popular"
				:key="tag"
				type="button"
				class="cursor-pointer rounded-pill border border-gray-200 bg-white px-8 py-1 text-xs text-gray-600 hover:border-accent-dark hover:text-accent-dark disabled:cursor-default disabled:border-transparent disabled:bg-gray-100 disabled:text-gray-400"
				:disabled="modelValue.includes(tag) || full"
				@mousedown.prevent
				@click="add(tag)"
			>
				{{ tag }}
			</button>
		</p>
	</div>
</template>
