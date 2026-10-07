<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'
import Button from './Button.vue'
import Icon, { type IconName } from './Icon.vue'
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
 * Action menu. Custom trigger: `<template #trigger="{ props }"><Button v-bind="props">…</Button></template>`
 * (spreads aria + handlers). Absolutely positioned under the trigger, so an `overflow: hidden` ancestor clips it.
 */
const props = withDefaults(defineProps<{ items: DropdownItem[]; align?: 'start' | 'end'; label?: string }>(), {
	align: 'start',
	label: 'Actions',
})

const emit = defineEmits<{ select: [item: DropdownItem] }>()

const open = ref(false)
const root = ref<HTMLElement | null>(null)
const menu = ref<HTMLElement | null>(null)
const menuId = `menu-${useId()}`

const menuItems = () => [...(menu.value?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])') ?? [])]

async function show(focus: 'first' | 'last' | 'none' = 'none') {
	open.value = true
	await nextTick()
	const items = menuItems()
	if (focus === 'first') items[0]?.focus()
	else if (focus === 'last') items[items.length - 1]?.focus()
	else menu.value?.focus()
}

function hide(refocus = true) {
	open.value = false
	if (refocus) root.value?.querySelector<HTMLElement>('[aria-haspopup]')?.focus()
}

function select(item: DropdownItem) {
	if (item.disabled) return
	hide()
	item.onSelect?.()
	emit('select', item)
}

function onTriggerKeydown(e: KeyboardEvent) {
	if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
		e.preventDefault()
		show(e.key === 'ArrowDown' ? 'first' : 'last')
	}
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
	if (e.key in move) {
		e.preventDefault()
		items[move[e.key]!]?.focus()
	} else if (e.key === 'Escape') {
		e.stopPropagation()
		hide()
	} else if (e.key === 'Tab') {
		hide(false)
	}
}

function onOutside(e: PointerEvent) {
	if (!root.value?.contains(e.target as Node)) hide(false)
}

watch(open, (o) => {
	if (o) document.addEventListener('pointerdown', onOutside)
	else document.removeEventListener('pointerdown', onOutside)
})
onBeforeUnmount(() => document.removeEventListener('pointerdown', onOutside))

const triggerProps = computed(() => ({
	'aria-haspopup': 'menu' as const,
	'aria-expanded': open.value,
	'aria-controls': menuId,
	onClick: () => (open.value ? hide() : show('first')),
	onKeydown: onTriggerKeydown,
}))
</script>

<template>
	<div
		ref="root"
		class="relative inline-block"
	>
		<slot
			name="trigger"
			:props="triggerProps"
			:open="open"
		>
			<Button
				variant="ghost"
				square
				:aria-label="label"
				v-bind="triggerProps"
			>
				<Icon name="more" />
			</Button>
		</slot>
		<Transition
			enter-active-class="transition duration-100 ease-out motion-reduce:transition-none"
			enter-from-class="opacity-0 scale-95"
			leave-active-class="transition duration-75 ease-in motion-reduce:transition-none"
			leave-to-class="opacity-0 scale-95"
		>
			<div
				v-if="open"
				:id="menuId"
				ref="menu"
				role="menu"
				tabindex="-1"
				:aria-label="label"
				:class="[
					'absolute top-full z-40 mt-4 flex min-w-160 flex-col rounded-md border border-gray-200 bg-white p-4 font-sans shadow-lg outline-hidden',
					align === 'end' ? 'right-0 origin-top-right' : 'left-0 origin-top-left',
				]"
				@keydown="onMenuKeydown"
			>
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
						@click="select(item)"
					>
						<Icon
							v-if="item.icon"
							:name="item.icon"
						/>
						{{ item.label }}
					</button>
				</template>
			</div>
		</Transition>
	</div>
</template>
