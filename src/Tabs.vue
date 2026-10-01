<script setup lang="ts">
import { nextTick, ref, useId } from 'vue'
import { focusRing } from './styles'

export interface TabItem {
	key: string
	label: string
	disabled?: boolean
}

/**
 * Tab bar + panels. `v-model` is the active key; each panel is the slot named after its key (`#general`).
 * Arrow keys / Home / End move and activate (roving tabindex), so only the active tab is in the Tab order.
 */
const props = defineProps<{ tabs: TabItem[]; modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [key: string] }>()

const base = `tabs-${useId()}`
const list = ref<HTMLElement | null>(null)

async function select(tab: TabItem, focus = false) {
	if (tab.disabled) return
	emit('update:modelValue', tab.key)
	if (focus) {
		await nextTick()
		list.value?.querySelector<HTMLElement>(`#${base}-tab-${tab.key}`)?.focus()
	}
}

function onKeydown(e: KeyboardEvent) {
	const enabled = props.tabs.filter((t) => !t.disabled)
	const i = enabled.findIndex((t) => t.key === props.modelValue)
	const target: Record<string, number> = {
		ArrowRight: (i + 1) % enabled.length,
		ArrowLeft: (i - 1 + enabled.length) % enabled.length,
		Home: 0,
		End: enabled.length - 1,
	}
	if (!(e.key in target)) return
	e.preventDefault()
	select(enabled[target[e.key]!]!, true)
}
</script>

<template>
	<div>
		<div
			ref="list"
			role="tablist"
			class="flex gap-4 overflow-x-auto border-b border-gray-200"
			@keydown="onKeydown"
		>
			<button
				v-for="tab in tabs"
				:id="`${base}-tab-${tab.key}`"
				:key="tab.key"
				type="button"
				role="tab"
				:aria-selected="tab.key === modelValue"
				:aria-controls="`${base}-panel-${tab.key}`"
				:tabindex="tab.key === modelValue ? 0 : -1"
				:disabled="tab.disabled"
				:class="[
					'-mb-px cursor-pointer rounded-t-sm border-0 border-b-2 bg-transparent px-12 py-8 text-sm font-medium whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-50',
					tab.key === modelValue
						? 'border-accent-dark text-accent-dark'
						: 'border-transparent text-black/60 hover:border-gray-300 hover:text-black',
					focusRing,
				]"
				@click="select(tab)"
			>
				{{ tab.label }}
			</button>
		</div>
		<div
			v-for="tab in tabs"
			v-show="tab.key === modelValue"
			:id="`${base}-panel-${tab.key}`"
			:key="tab.key"
			role="tabpanel"
			:aria-labelledby="`${base}-tab-${tab.key}`"
			tabindex="0"
			:class="['pt-16 outline-hidden', focusRing]"
		>
			<slot :name="tab.key" />
		</div>
	</div>
</template>
