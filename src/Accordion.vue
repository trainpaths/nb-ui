<script setup lang="ts">
import { useId } from 'vue'
import Icon from './Icon.vue'
import { focusRing } from './styles'

export interface AccordionItem {
	key: string
	label: string
	disabled?: boolean
}

/**
 * Collapsible sections. Each panel is the slot named after its key (`#general`). Optional `v-model`: the open keys.
 * Without `multiple`, opening one closes the others. Closed panels stay mounted (form state survives).
 */
const props = withDefaults(defineProps<{ items: AccordionItem[]; multiple?: boolean }>(), { multiple: false })

const open = defineModel<string[]>({ default: () => [] })

const base = `accordion-${useId()}`

const isOpen = (key: string) => open.value.includes(key)

function toggle(key: string) {
	if (isOpen(key)) open.value = open.value.filter((k) => k !== key)
	else open.value = props.multiple ? [...open.value, key] : [key]
}
</script>

<template>
	<div class="divide-y divide-gray-200 rounded-md border border-gray-200 bg-white">
		<div
			v-for="item in items"
			:key="item.key"
		>
			<h3 class="m-0">
				<button
					:id="`${base}-button-${item.key}`"
					type="button"
					:aria-expanded="isOpen(item.key)"
					:aria-controls="`${base}-panel-${item.key}`"
					:disabled="item.disabled"
					:class="[
						'flex w-full cursor-pointer items-center justify-between gap-12 rounded-md border-none bg-transparent px-16 py-12 text-left text-sm font-medium text-black transition-colors not-disabled:hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-50',
						focusRing,
					]"
					@click="toggle(item.key)"
				>
					{{ item.label }}
					<Icon
						name="chevron"
						:rotate="isOpen(item.key) ? 90 : 270"
						class="shrink-0 text-black/50 transition-[rotate] duration-150 motion-reduce:transition-none"
					/>
				</button>
			</h3>
			<div
				v-show="isOpen(item.key)"
				:id="`${base}-panel-${item.key}`"
				role="region"
				:aria-labelledby="`${base}-button-${item.key}`"
				class="px-16 pb-16 text-sm text-black/80"
			>
				<slot :name="item.key" />
			</div>
		</div>
	</div>
</template>
