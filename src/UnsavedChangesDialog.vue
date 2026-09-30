<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Button from './Button.vue'

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
const dialog = ref<HTMLElement | null>(null)

onMounted(() => dialog.value?.focus())
</script>

<template>
	<Teleport to="body">
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-16 font-sans"
			@click.self="emit('cancel')"
			@keydown.esc="emit('cancel')"
		>
			<div
				ref="dialog"
				role="alertdialog"
				aria-modal="true"
				aria-labelledby="unsaved-title"
				tabindex="-1"
				class="w-full max-w-sm rounded-lg bg-white p-20 shadow-xl outline-hidden"
				data-testid="unsaved-dialog"
			>
				<h2
					id="unsaved-title"
					class="m-0 text-base font-semibold text-gray-900"
				>
					Do you want to save the changes?
				</h2>
				<p class="mb-0 mt-8 text-sm text-gray-600">
					{{ canSave ? 'Your changes will be lost if you don’t save them.' : blockedHint }}
				</p>
				<div class="mt-20 flex flex-wrap justify-end gap-8">
					<Button
						variant="ghost"
						text="primary"
						data-testid="unsaved-cancel"
						@click="emit('cancel')"
					>
						Cancel
					</Button>
					<Button
						variant="outline"
						text="danger"
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
				</div>
			</div>
		</div>
	</Teleport>
</template>
