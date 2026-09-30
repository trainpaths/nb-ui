export type Color = string

export const bgColor = (name?: Color): string =>
	name ? `bg-${name}` : ''

export const borderColor = (name?: Color): string =>
	name ? `border-${name}` : ''

export const textColor = (name?: Color): string =>
	name ? `text-${name}` : ''
