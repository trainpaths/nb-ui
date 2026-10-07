/** Keyboard focus outline shared by every interactive component (mouse clicks don't show it). */
export const focusRing =
	'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark'

/** Same, on a custom box drawn next to a visually hidden `peer` input (checkbox, radio). */
export const peerFocusRing =
	'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-dark'

/** Same, for inputs: ring on any focus (typing target should always be visible). */
export const inputFocus = 'focus:border-accent-dark focus:ring-1 focus:ring-accent-dark'

/** Same, on a wrapper that draws the frame around an input (prefix/suffix, chips). */
export const inputFocusWithin = 'focus-within:border-accent-dark focus-within:ring-1 focus-within:ring-accent-dark'

export const inputSizes = { sm: 'py-4 text-xs', md: 'py-6 text-sm', lg: 'py-8 text-base' }

export const inputBorder = (invalid: boolean) => (invalid ? 'border-error' : 'border-gray-300')

export const inputDisabled = 'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-70'
