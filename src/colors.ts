export type Color = string

export const bgColor = (name?: Color): string =>
	name ? `bg-${name}` : ''

export const borderColor = (name?: Color): string =>
	name ? `border-${name}` : ''

export const textColor = (name?: Color): string =>
	name ? `text-${name}` : ''

// light fills where white text fails contrast
const LIGHT = new Set(['accent', 'warning', 'white'])

/** Readable text token on a solid `bg` fill: black on light tokens, white otherwise. */
export const onColor = (bg?: Color): Color => (bg && LIGHT.has(bg) ? 'black' : 'white')
