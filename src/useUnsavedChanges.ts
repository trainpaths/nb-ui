import { ref, type Ref } from 'vue'

export type UnsavedChoice = 'save' | 'discard' | 'cancel'

/**
 * Drives `UnsavedChangesDialog`: `confirmLeave()` resolves true right away when nothing is dirty, else opens
 * the dialog and resolves once answered (save → `save()` must succeed, discard → true, cancel → false).
 * Render `<UnsavedChangesDialog v-if="prompting" @save="answer('save')" ...>`.
 */
export function useUnsavedChanges(dirty: Ref<boolean>, save: () => Promise<boolean>) {
	const prompting = ref(false)
	let resolve: ((choice: UnsavedChoice) => void) | null = null

	function answer(choice: UnsavedChoice) {
		resolve?.(choice)
	}

	async function confirmLeave(): Promise<boolean> {
		if (!dirty.value) return true
		prompting.value = true
		const choice = await new Promise<UnsavedChoice>((r) => (resolve = r))
		try {
			if (choice === 'save') return await save()
			return choice === 'discard'
		} finally {
			resolve = null
			prompting.value = false
		}
	}

	return { prompting, answer, confirmLeave }
}
