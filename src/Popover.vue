<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'

// attrs (class, data-testid, listeners) go on the panel
defineOptions({ inheritAttrs: false })

/**
 * Click-to-open floating panel. Trigger: `<template #trigger="{ props }"><Button v-bind="props">…</Button></template>`.
 * Closes on Esc, outside click or focus leaving it; the default slot gets `close`. Optional `v-model:open`.
 * Absolutely positioned, so an `overflow: hidden` ancestor clips it.
 */
const props = withDefaults(
	defineProps<{
		align?: 'start' | 'end'
		placement?: 'bottom' | 'top'
		padding?: 'none' | 'sm' | 'md'
		/** aria-label of the panel */
		label?: string
		role?: 'dialog' | 'menu'
		/** panel id, defaults to a generated one */
		id?: string
	}>(),
	{ align: 'start', placement: 'bottom', padding: 'md', label: undefined, role: 'dialog', id: undefined },
)

const open = defineModel<boolean>('open', { default: false })

const root = ref<HTMLElement | null>(null)
const panel = ref<HTMLElement | null>(null)
const autoId = `popover-${useId()}`
const panelId = computed(() => props.id ?? autoId)

const paddings = { none: '', sm: 'p-4', md: 'p-12' }

const positions = {
	bottom: { start: 'top-full left-0 mt-4 origin-top-left', end: 'top-full right-0 mt-4 origin-top-right' },
	top: { start: 'bottom-full left-0 mb-4 origin-bottom-left', end: 'bottom-full right-0 mb-4 origin-bottom-right' },
}

function close(refocus = true) {
	open.value = false
	if (refocus) root.value?.querySelector<HTMLElement>(`[aria-controls="${panelId.value}"]`)?.focus()
}

function onKeydown(e: KeyboardEvent) {
	if (e.key !== 'Escape' || !open.value) return
	e.stopPropagation()
	close()
}

// null target = window blur or click on nothing focusable: outside click handles that
function onFocusout(e: FocusEvent) {
	const to = e.relatedTarget as Node | null
	if (open.value && to && !root.value?.contains(to)) close(false)
}

function onOutside(e: PointerEvent) {
	if (!root.value?.contains(e.target as Node)) close(false)
}

watch(
	open,
	async (o) => {
		if (!o) return document.removeEventListener('pointerdown', onOutside)
		document.addEventListener('pointerdown', onOutside)
		await nextTick()
		if (panel.value?.contains(document.activeElement)) return
		;(panel.value?.querySelector<HTMLElement>('[autofocus]') ?? panel.value)?.focus()
	},
	{ immediate: true },
)
onBeforeUnmount(() => document.removeEventListener('pointerdown', onOutside))

const triggerProps = computed(() => ({
	'aria-haspopup': props.role,
	'aria-expanded': open.value,
	'aria-controls': panelId.value,
	onClick: () => (open.value ? close() : (open.value = true)),
}))
</script>

<template>
	<div
		ref="root"
		class="relative inline-block"
		@keydown="onKeydown"
		@focusout="onFocusout"
	>
		<slot
			name="trigger"
			:props="triggerProps"
			:open="open"
		/>
		<Transition
			enter-active-class="transition duration-100 ease-out motion-reduce:transition-none"
			enter-from-class="opacity-0 scale-95"
			leave-active-class="transition duration-75 ease-in motion-reduce:transition-none"
			leave-to-class="opacity-0 scale-95"
		>
			<div
				v-if="open"
				:id="panelId"
				ref="panel"
				:role="role"
				tabindex="-1"
				:aria-label="label"
				:class="[
					'absolute z-40 rounded-md border border-gray-200 bg-white font-sans shadow-lg outline-hidden',
					paddings[padding],
					positions[placement][align],
				]"
				v-bind="$attrs"
			>
				<slot :close="close" />
			</div>
		</Transition>
	</div>
</template>
