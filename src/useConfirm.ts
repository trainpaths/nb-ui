import { ref } from 'vue'

export interface ConfirmOptions {
	title: string
	message?: string
	confirmText?: string
	cancelText?: string
	/** red confirm button, for destructive actions */
	danger?: boolean
}

interface Pending extends ConfirmOptions {
	resolve: (ok: boolean) => void
}

const pending = ref<Pending | null>(null)

/** Answers the open confirm (ConfirmDialog calls this). */
function answer(ok: boolean) {
	pending.value?.resolve(ok)
	pending.value = null
}

/** Opens the shared ConfirmDialog; resolves true on confirm, false on cancel/Esc. A new call cancels an open one. */
function confirm(options: ConfirmOptions | string): Promise<boolean> {
	if (pending.value) answer(false)
	const opts = typeof options === 'string' ? { title: options } : options
	return new Promise((resolve) => (pending.value = { ...opts, resolve }))
}

/** `if (await confirm({ title: 'Delete page?', danger: true })) …`. Render `<ConfirmDialog />` once in the app. */
export function useConfirm() {
	return { confirm, pending, answer }
}
