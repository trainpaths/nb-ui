/** Languages `Flag` draws (`en` = UK). */
export const flagCodes = ['en', 'de', 'it', 'fr'] as const
export type FlagCode = (typeof flagCodes)[number]

/** Primary subtag of a language code or tag (`de-CH` → `de`), if it has a flag. */
export function flagOf(code: string): FlagCode | undefined {
	const primary = code.split('-')[0]!.toLowerCase()
	return (flagCodes as readonly string[]).includes(primary) ? (primary as FlagCode) : undefined
}

export const hasFlag = (code: string) => flagOf(code) !== undefined
