<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useId } from 'vue'

/**
 * Short hint on hover / keyboard focus of the wrapped element (which gets `aria-describedby`).
 * Not for essential info: touch users can't hover.
 */
const props = withDefaults(
	defineProps<{ text?: string; placement?: 'top' | 'bottom' | 'left' | 'right'; delay?: number }>(),
	{ text: undefined, placement: 'top', delay: 300 },
)

const visible = ref(false)
const root = ref<HTMLElement | null>(null)
const tipId = `tip-${useId()}`
let timer: ReturnType<typeof setTimeout> | undefined

function show() {
	clearTimeout(timer)
	timer = setTimeout(() => (visible.value = true), props.delay)
}

function hide() {
	clearTimeout(timer)
	visible.value = false
}

function onKeydown(e: KeyboardEvent) {
	if (e.key === 'Escape' && visible.value) hide()
}

onMounted(() => {
	root.value?.firstElementChild?.setAttribute('aria-describedby', tipId)
	document.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
	clearTimeout(timer)
	document.removeEventListener('keydown', onKeydown)
})

const placements = {
	top: 'bottom-full left-1/2 mb-6 -translate-x-1/2',
	bottom: 'top-full left-1/2 mt-6 -translate-x-1/2',
	left: 'right-full top-1/2 mr-6 -translate-y-1/2',
	right: 'left-full top-1/2 ml-6 -translate-y-1/2',
}
</script>

<template>
	<span
		ref="root"
		class="relative inline-flex"
		@mouseenter="show"
		@mouseleave="hide"
		@focusin="show"
		@focusout="hide"
	>
		<slot />
		<span
			:id="tipId"
			role="tooltip"
			:class="[
				'pointer-events-none absolute z-40 w-max max-w-240 rounded bg-black px-8 py-4 font-sans text-xs text-white shadow-md transition-opacity duration-100 motion-reduce:transition-none',
				placements[placement],
				visible ? 'opacity-100' : 'invisible opacity-0',
			]"
		>
			<slot name="content">{{ text }}</slot>
		</span>
	</span>
</template>
