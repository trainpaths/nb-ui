<script setup lang="ts">
import { ref, watch } from 'vue'
import Button from './Button.vue'
import Modal from './Modal.vue'
import { type ConfirmOptions, useConfirm } from './useConfirm'

/** Renders `useConfirm()` prompts. Mount once, next to ToastContainer. */
const { pending, answer } = useConfirm()

// keep the last options while the leave animation runs (pending is already null then)
const shown = ref<ConfirmOptions>({ title: '' })
watch(pending, (p) => {
	if (p) shown.value = p
})
</script>

<template>
	<!-- destructive: focus starts on Cancel so a stray Enter doesn't delete -->
	<Modal
		:open="!!pending"
		role="alertdialog"
		size="sm"
		:title="shown.title"
		hide-close
		data-testid="confirm-dialog"
		@close="answer(false)"
	>
		<template v-if="shown.message">{{ shown.message }}</template>
		<template #footer>
			<Button
				variant="ghost"
				:autofocus="shown.danger || undefined"
				data-testid="confirm-cancel"
				@click="answer(false)"
			>
				{{ shown.cancelText ?? 'Cancel' }}
			</Button>
			<Button
				:bg="shown.danger ? 'danger' : 'accent'"
				:autofocus="!shown.danger || undefined"
				data-testid="confirm-ok"
				@click="answer(true)"
			>
				{{ shown.confirmText ?? 'Confirm' }}
			</Button>
		</template>
	</Modal>
</template>
