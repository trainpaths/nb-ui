<script setup lang="ts">
import { nextTick, ref, useId } from 'vue'
import Button from './Button.vue'
import Icon, { type IconName } from './Icon.vue'
import Popover from './Popover.vue'
import { focusRing } from './styles'

export interface DropdownItem {
	label: string
	icon?: IconName
	danger?: boolean
	disabled?: boolean
	/** draws a line above this item */
	divider?: boolean
	onSelect?: () => void
}

/**
 * Action menu on a Popover. Custom trigger: `<template #trigger="{ props }"><Button v-bind="props">…</Button></template>`
 * (spreads aria + handlers). Absolutely positioned under the trigger, so an `overflow: hidden` ancestor clips it.
 */
withDefaults(defineProps<{ items: DropdownItem[]; align?: 'start' | 'end'; label?: string }>(), {
	align: 'start',
	label: 'Actions',
})

const emit = defineEmits<{ select: [item: DropdownItem] }>()

const open = ref(false)
const menuId = `menu-${useId()}`

const menuItems = () => [
	...(document.getElementById(menuId)?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])') ?? []),
]

async function show(focus: 'first' | 'last') {
	open.value = true
	await nextTick()
	const items = menuItems()
	items[focus === 'first' ? 0 : items.length - 1]?.focus()
}

function select(item: DropdownItem, close: () => void) {
	if (item.disabled) return
	close()
	item.onSelect?.()
	emit('select', item)
}

function onMenuKeydown(e: KeyboardEvent) {
	const items = menuItems()
	const i = items.indexOf(document.activeElement as HTMLElement)
	const move: Record<string, number> = {
		ArrowDown: (i + 1) % items.length,
		ArrowUp: (i - 1 + items.length) % items.length,
		Home: 0,
		End: items.length - 1,
	}
	if (!(e.key in move)) return
	e.preventDefault()
	items[move[e.key]!]?.focus()
}

function triggerProps(popover: Record<string, unknown> & { onClick: () => void }) {
	return {
		...popover,
		onClick: () => (open.value ? popover.onClick() : show('first')),
		onKeydown: (e: KeyboardEvent) => {
			if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
			e.preventDefault()
			show(e.key === 'ArrowDown' ? 'first' : 'last')
		},
	}
}
</script>

<template>
	<Popover
		:id="menuId"
		v-model:open="open"
		role="menu"
		padding="sm"
		:align="align"
		:label="label"
		class="flex min-w-160 flex-col"
		@keydown="onMenuKeydown"
	>
		<template #trigger="{ props: popover }">
			<slot
				name="trigger"
				:props="triggerProps(popover)"
				:open="open"
			>
				<Button
					variant="ghost"
					square
					:aria-label="label"
					v-bind="triggerProps(popover)"
				>
					<Icon name="more" />
				</Button>
			</slot>
		</template>
		<template #default="{ close }">
			<template
				v-for="(item, i) in items"
				:key="`${i}-${item.label}`"
			>
				<hr
					v-if="item.divider"
					class="my-4 border-0 border-t border-gray-200"
					role="separator"
				/>
				<button
					type="button"
					role="menuitem"
					tabindex="-1"
					:disabled="item.disabled"
					:class="[
						'flex w-full cursor-pointer items-center gap-8 rounded-sm border-none bg-transparent px-8 py-6 text-left text-sm whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50',
						item.danger ? 'text-danger hover:bg-danger/10 focus:bg-danger/10' : 'text-black hover:bg-accent/20 focus:bg-accent/20',
						focusRing,
					]"
					@click="select(item, close)"
				>
					<Icon
						v-if="item.icon"
						:name="item.icon"
					/>
					{{ item.label }}
				</button>
			</template>
		</template>
	</Popover>
</template>
