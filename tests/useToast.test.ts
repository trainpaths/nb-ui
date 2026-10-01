import { afterEach, describe, expect, it, vi } from 'vitest'
import { useToast } from '../src/useToast'

describe('useToast', () => {
	const { toasts, toast, pause, resume, dismissAll } = useToast()

	afterEach(() => {
		dismissAll()
		vi.useRealTimers()
	})

	it('auto-dismisses after the duration', () => {
		vi.useFakeTimers()
		toast({ message: 'hi', duration: 1000 })
		expect(toasts.value).toHaveLength(1)
		vi.advanceTimersByTime(1000)
		expect(toasts.value).toHaveLength(0)
	})

	it('duration 0 stays', () => {
		vi.useFakeTimers()
		toast({ message: 'sticky', duration: 0 })
		vi.advanceTimersByTime(60_000)
		expect(toasts.value).toHaveLength(1)
	})

	it('pause keeps the remaining time, resume continues it', () => {
		vi.useFakeTimers()
		const id = toast({ message: 'p', duration: 1000 })
		vi.advanceTimersByTime(600)
		pause(id)
		vi.advanceTimersByTime(5000)
		expect(toasts.value).toHaveLength(1)
		resume(id)
		vi.advanceTimersByTime(399)
		expect(toasts.value).toHaveLength(1)
		vi.advanceTimersByTime(1)
		expect(toasts.value).toHaveLength(0)
	})

	it('shorthands set the type', () => {
		toast.error('boom')
		toast.success('yay', { duration: 0 })
		expect(toasts.value.map((t) => [t.type, t.message, t.duration])).toEqual([
			['error', 'boom', 4000],
			['success', 'yay', 0],
		])
	})
})
