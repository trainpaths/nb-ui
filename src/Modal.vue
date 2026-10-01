<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'
import CloseButton from './CloseButton.vue'
import { lockScroll, unlockScroll } from './scrollLock'

// attrs (data-testid, class) go on the panel, not the teleported backdrop
defineOptions({ inheritAttrs: false })

/**
 * Dialog over a dimmed backdrop. `v-model:open`; Esc / backdrop / ✕ close unless `persistent`. Focus moves into
 * the dialog (`[autofocus]` element first), Tab stays inside, and focus returns to the opener on close.
 */
const props = withDefaults(
	defineProps<{
		open: boolean
		title?: string
		size?: 'sm' | 'md' | 'lg'
		/** no Esc / backdrop close (e.g. while saving) */
		persistent?: boolean
		role?: 'dialog' | 'alertdialog'
		hideClose?: boolean
	}>(),
	{ title: undefined, size: 'md', persistent: false, role: 'dialog', hideClose: false },
)

const emit = defineEmits<{ 'update:open': [value: boolean]; close: [] }>()

const panel = ref<HTMLElement | null>(null)
const titleId = `modal-${useId()}`
let opener: HTMLElement | null = null

const sizes = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-2xl' }

const FOCUSABLE =
	'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function close() {
	emit('update:open', false)
	emit('close')
}

function dismiss() {
	if (!props.persistent) close()
}

function focusables(): HTMLElement[] {
	return [...(panel.value?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])].filter((el) => el.offsetParent !== null)
}

function onKeydown(e: KeyboardEvent) {
	if (e.key === 'Escape') {
		e.stopPropagation()
		dismiss()
	} else if (e.key === 'Tab') {
		const items = focusables()
		if (!items.length) return e.preventDefault()
		const first = items[0]!
		const last = items[items.length - 1]!
		if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.value)) {
			e.preventDefault()
			last.focus()
		} else if (!e.shiftKey && document.activeElement === last) {
			e.preventDefault()
			first.focus()
		}
	}
}

let locked = false
function setLocked(on: boolean) {
	if (on === locked) return
	locked = on
	if (on) lockScroll()
	else unlockScroll()
}

watch(
	() => props.open,
	async (open) => {
		setLocked(open)
		if (open) {
			opener = document.activeElement as HTMLElement | null
			await nextTick()
			const target = panel.value?.querySelector<HTMLElement>('[autofocus]') ?? panel.value
			target?.focus()
		} else {
			opener?.focus()
			opener = null
		}
	},
	{ immediate: true },
)

// parent v-if removing an open modal
onBeforeUnmount(() => {
	setLocked(false)
	opener?.focus()
})
</script>

<template>
	<Teleport to="body">
		<!-- backdrop fades, panel ([data-panel]) scales in with it -->
		<Transition
			enter-active-class="transition-opacity duration-200 ease-out motion-reduce:transition-none"
			enter-from-class="opacity-0 [&_[data-panel]]:scale-95"
			leave-active-class="transition-opacity duration-150 ease-in motion-reduce:transition-none"
			leave-to-class="opacity-0 [&_[data-panel]]:scale-95"
		>
			<div
				v-if="open"
				class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-16 font-sans"
				@click.self="dismiss"
				@keydown="onKeydown"
			>
				<div
					ref="panel"
					data-panel
					:role="role"
					aria-modal="true"
					:aria-labelledby="title || $slots.header ? titleId : undefined"
					tabindex="-1"
					:class="[
						'my-auto flex max-h-full w-full flex-col rounded-lg bg-white shadow-xl outline-hidden transition-transform duration-200 motion-reduce:transition-none',
						sizes[size],
					]"
					v-bind="$attrs"
				>
					<div
						v-if="title || $slots.header || !hideClose"
						class="flex items-start justify-between gap-12 px-20 pt-16"
						:class="title || $slots.header ? 'pb-4' : 'pb-0'"
					>
						<h2
							:id="titleId"
							class="m-0 text-base font-semibold text-black"
						>
							<slot name="header">{{ title }}</slot>
						</h2>
						<CloseButton
							v-if="!hideClose"
							:disabled="persistent"
							@click="close"
						/>
					</div>
					<div class="overflow-y-auto px-20 py-12 text-sm text-black/80">
						<slot />
					</div>
					<div
						v-if="$slots.footer"
						class="flex flex-wrap justify-end gap-8 px-20 pt-4 pb-16"
					>
						<slot name="footer" />
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>
