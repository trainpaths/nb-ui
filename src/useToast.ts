import { ref } from 'vue'

export type ToastType = 'success' | 'warning' | 'error' | 'info'

export interface ToastMessage {
	id: string
	message: string
	type?: ToastType
	/** ms until auto-dismiss, 0 = stays until closed */
	duration?: number
}

type ToastOptions = Omit<ToastMessage, 'id'>

const toasts = ref<ToastMessage[]>([])
const DEFAULT_DURATION = 4000

// timer state lives outside the reactive list: pausing must not re-render
const timers = new Map<string, { handle?: ReturnType<typeof setTimeout>; remaining: number; started: number }>()

const generateId = () => Math.random().toString(36).slice(2, 9)

function dismiss(id: string) {
	const timer = timers.get(id)
	if (timer) clearTimeout(timer.handle)
	timers.delete(id)
	const index = toasts.value.findIndex((t) => t.id === id)
	if (index > -1) toasts.value.splice(index, 1)
}

function start(id: string) {
	const timer = timers.get(id)
	if (!timer) return
	timer.started = Date.now()
	timer.handle = setTimeout(() => dismiss(id), timer.remaining)
}

/** Stops the auto-dismiss countdown (toast hovered/focused). */
function pause(id: string) {
	const timer = timers.get(id)
	if (!timer?.handle) return
	clearTimeout(timer.handle)
	timer.handle = undefined
	timer.remaining -= Date.now() - timer.started
}

/** Continues the countdown where `pause` left it. */
function resume(id: string) {
	const timer = timers.get(id)
	if (timer && !timer.handle) start(id)
}

function dismissAll() {
	for (const timer of timers.values()) clearTimeout(timer.handle)
	timers.clear()
	toasts.value = []
}

function show(options: ToastOptions | string): string {
	const opts = typeof options === 'string' ? { message: options } : options
	const id = generateId()
	const duration = opts.duration ?? DEFAULT_DURATION

	toasts.value.push({ id, message: opts.message, type: opts.type, duration })

	if (duration > 0) {
		timers.set(id, { remaining: duration, started: 0 })
		start(id)
	}
	return id
}

type Shorthand = (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) => string
const shorthand =
	(type: ToastType): Shorthand =>
	(message, options) =>
		show({ ...options, message, type })

/** `toast('Saved')`, `toast({ message, type, duration })` or `toast.success('Saved')`. */
const toast = Object.assign(show, {
	success: shorthand('success'),
	error: shorthand('error'),
	warning: shorthand('warning'),
	info: shorthand('info'),
})

/** Global toast queue; render it once with `<ToastContainer />`. */
export function useToast() {
	return { toasts, toast, dismiss, dismissAll, pause, resume }
}
