// shared across Modal instances: page scrolls again only when the last open one closes
let locks = 0

export function lockScroll() {
	if (locks++ === 0) document.body.style.overflow = 'hidden'
}

export function unlockScroll() {
	if (locks > 0 && --locks === 0) document.body.style.overflow = ''
}
