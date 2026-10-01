<script setup lang="ts">
import Button from './Button.vue'
import Modal from './Modal.vue'

/**
 * "Do you want to save the changes?" modal for leaving a form with unsaved changes. The parent decides what
 * each answer does (see `useUnsavedChanges`). `canSave` false disables Save and shows `blockedHint`.
 */
withDefaults(defineProps<{ saving?: boolean; canSave?: boolean; blockedHint?: string }>(), {
	saving: false,
	canSave: true,
	blockedHint: 'Fix the highlighted fields to save.',
})
const emit = defineEmits<{ save: []; discard: []; cancel: [] }>()
</script>

<template>
	<!-- mounted with v-if by the parent: always open, Esc/backdrop = cancel -->
	<Modal
		:open="true"
		role="alertdialog"
		size="sm"
		title="Do you want to save the changes?"
		hide-close
		data-testid="unsaved-dialog"
		@close="emit('cancel')"
	>
		{{ canSave ? 'Your changes will be lost if you don’t save them.' : blockedHint }}
		<template #footer>
			<Button
				variant="ghost"
				data-testid="unsaved-cancel"
				@click="emit('cancel')"
			>
				Cancel
			</Button>
			<Button
				variant="outline"
				border="danger"
				data-testid="unsaved-discard"
				@click="emit('discard')"
			>
				Don’t save
			</Button>
			<Button
				:loading="saving"
				:disabled="!canSave"
				data-testid="unsaved-save"
				@click="emit('save')"
			>
				Save
			</Button>
		</template>
	</Modal>
</template>
