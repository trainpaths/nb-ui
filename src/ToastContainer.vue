<script setup lang="ts">
import { useToast } from './useToast'
import Toast from './Toast.vue'

const { toasts, dismiss, pause, resume } = useToast()

// absolute flex children lose their slot: pin the leaving toast where it was
function pin(el: Element) {
	const toast = el as HTMLElement
	toast.style.top = `${toast.offsetTop}px`
}
</script>

<template>
	<Teleport to="body">
		<!-- slide in from / out to the right; leaving toast goes absolute so the rest glide into its place -->
		<TransitionGroup
			tag="div"
			class="pointer-events-none fixed top-16 right-16 z-50 flex flex-col items-end gap-8 font-sans"
			enter-active-class="transition duration-300 ease-out motion-reduce:transition-none"
			enter-from-class="translate-x-[calc(100%+16px)] opacity-0"
			leave-active-class="absolute right-0 transition duration-200 ease-in motion-reduce:transition-none"
			leave-to-class="translate-x-[calc(100%+16px)] opacity-0"
			move-class="transition-transform duration-300 ease-out motion-reduce:transition-none"
			aria-live="polite"
			@before-leave="pin"
		>
			<Toast
				v-for="toast in toasts"
				:key="toast.id"
				class="pointer-events-auto"
				:message="toast.message"
				:type="toast.type"
				@dismiss="dismiss(toast.id)"
				@mouseenter="pause(toast.id)"
				@mouseleave="resume(toast.id)"
				@focusin="pause(toast.id)"
				@focusout="resume(toast.id)"
			/>
		</TransitionGroup>
	</Teleport>
</template>
