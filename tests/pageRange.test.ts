import { describe, expect, it } from 'vitest'
import { pageRange } from '../src/pageRange'

describe('pageRange', () => {
	it('shows every page when few', () => {
		expect(pageRange(1, 5)).toEqual([1, 2, 3, 4, 5])
		expect(pageRange(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7])
	})

	it('collapses both sides around the current page', () => {
		expect(pageRange(10, 50)).toEqual([1, '…', 9, 10, 11, '…', 50])
	})

	it('keeps the visible count stable at the edges', () => {
		expect(pageRange(1, 50)).toEqual([1, 2, 3, 4, 5, '…', 50])
		expect(pageRange(3, 50)).toEqual([1, 2, 3, 4, 5, '…', 50])
		expect(pageRange(50, 50)).toEqual([1, '…', 46, 47, 48, 49, 50])
	})

	it('never hides a single page behind an ellipsis', () => {
		for (let page = 1; page <= 20; page++) {
			const range = pageRange(page, 20)
			range.forEach((p, i) => {
				if (p !== '…') return
				const before = range[i - 1] as number
				const after = range[i + 1] as number
				expect(after - before).toBeGreaterThan(2)
			})
		}
	})

	it('handles empty', () => {
		expect(pageRange(1, 0)).toEqual([])
	})
})
