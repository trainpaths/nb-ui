import { ref } from 'vue'

export type ToastType = 'success' | 'warning' | 'error' | 'info'

export interface ToastMessage {
	id: string
	message: string
	type?: ToastType
	duration?: number
}

const toasts = ref<ToastMessage[]>([])
const DEFAULT_DURATION = 4000

const generateId = () => Math.random().toString(36).slice(2, 9)

export function useToast() {
	const toast = (options: Omit<ToastMessage, 'id'> | string) => {
		const opts = typeof options === 'string' ? { message: options } : options
		const id = generateId()
		const duration = opts.duration ?? DEFAULT_DURATION

		toasts.value.push({
			id,
			message: opts.message,
			type: opts.type,
			duration,
		})

		if (duration > 0) {
			setTimeout(() => dismiss(id), duration)
		}

		return id
	}

	const dismiss = (id: string) => {
		const index = toasts.value.findIndex((t) => t.id === id)
		if (index > -1) {
			toasts.value.splice(index, 1)
		}
	}

	const dismissAll = () => {
		toasts.value = []
	}

	return {
		toasts,
		toast,
		dismiss,
		dismissAll,
	}
}
