/**
 * Page numbers to show: always first + last, `siblings` around the current one, `'…'` for gaps.
 * A gap of a single page shows that page instead (no "1 … 3").
 */
export function pageRange(page: number, pageCount: number, siblings = 1): (number | '…')[] {
	if (pageCount <= 0) return []
	// first + last + current + siblings + 2 gaps
	if (pageCount <= 2 * siblings + 5) return Array.from({ length: pageCount }, (_, i) => i + 1)

	const start = Math.max(2, Math.min(page - siblings, pageCount - 2 * siblings - 2))
	const end = Math.min(pageCount - 1, Math.max(page + siblings, 2 * siblings + 3))
	const middle = Array.from({ length: end - start + 1 }, (_, i) => start + i)

	return [1, ...(start > 2 ? ['…' as const] : []), ...middle, ...(end < pageCount - 1 ? ['…' as const] : []), pageCount]
}
