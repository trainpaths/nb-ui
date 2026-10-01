import { describe, expect, it } from 'vitest'
import { useConfirm } from '../src/useConfirm'

describe('useConfirm', () => {
	const { confirm, pending, answer } = useConfirm()

	it('resolves with the answer and clears', async () => {
		const result = confirm({ title: 'Delete?', danger: true })
		expect(pending.value?.title).toBe('Delete?')
		answer(true)
		expect(await result).toBe(true)
		expect(pending.value).toBeNull()
	})

	it('a new confirm cancels the open one', async () => {
		const first = confirm('First?')
		const second = confirm('Second?')
		expect(await first).toBe(false)
		expect(pending.value?.title).toBe('Second?')
		answer(false)
		expect(await second).toBe(false)
	})
})
