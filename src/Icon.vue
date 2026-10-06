<script setup lang="ts">
/**
 * Small built-in stroke icon set (24×24, `currentColor`), so components need no icon dependency.
 * Decorative by default (`aria-hidden`); pass `label` to expose it to screen readers.
 * Directional shapes exist once, pointing left (`chevron`, `arrow`, `panel`); `rotate` (degrees, clockwise) turns them:
 * 90 up, 180 right, 270 down.
 */
import { computed } from 'vue'

export type IconName =
	| 'x'
	| 'check'
	| 'minus'
	| 'plus'
	| 'chevron'
	| 'info'
	| 'alert-triangle'
	| 'alert-circle'
	| 'check-circle'
	| 'more'
	| 'search'
	| 'inbox'
	| 'masonry'
	| 'file'
	| 'list-tree'
	| 'image'
	| 'settings'
	| 'user'
	| 'exit'
	| 'menu'
	| 'duplicate'
	| 'download'
	| 'upload'
	| 'trash'
	| 'edit'
	| 'save'
	| 'grip'
	| 'eye'
	| 'external-link'
	| 'arrow'
	| 'panel'

const props = withDefaults(defineProps<{ name: IconName; size?: number; label?: string; rotate?: number }>(), {
	size: 16,
	label: undefined,
	rotate: 0,
})

// string = path at the default stroke width
type IconPath = string | { d: string; width: number }

const paths: Record<IconName, IconPath[]> = {
	x: ['M18 6 6 18', 'M6 6l12 12'],
	check: ['M20 6 9 17l-5-5'],
	minus: ['M5 12h14'],
	plus: ['M12 5v14', 'M5 12h14'],
	chevron: ['m15 18-6-6 6-6'],
	info: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 16v-4', 'M12 8h.01'],
	'alert-triangle': [
		'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z',
		'M12 9v4',
		'M12 17h.01',
	],
	'alert-circle': ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 8v4', 'M12 16h.01'],
	'check-circle': ['M22 11.08V12a10 10 0 1 1-5.93-9.14', 'm9 11 3 3L22 4'],
	more: ['M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z', 'M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z', 'M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'],
	search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'm21 21-4.3-4.3'],
	inbox: [
		'M22 12h-6l-2 3h-4l-2-3H2',
		'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
	],
	// uneven tiles: short/tall left, tall/short right
	masonry: [
		'M4 3h5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z',
		'M4 12h5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z',
		'M15 3h5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z',
		'M15 15h5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z',
	],
	// page with image square + text lines
	file: [
		'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z',
		'M14 2v4a2 2 0 0 0 2 2h4',
		'M8 10h4v4H8z',
		'M15 11h1',
		'M15 14h1',
		'M8 18h8',
	],
	// tree lines ending in a dot at each item's left end; tree thinner than the items
	'list-tree': [
		'M8 6h13',
		'M11 12h10',
		'M11 18h10',
		{ d: 'M4 6v11a1 1 0 0 0 1 1h2', width: 1.25 },
		{ d: 'M4 11a1 1 0 0 0 1 1h2', width: 1.25 },
		{ d: 'M4 6h.01', width: 2.5 },
		{ d: 'M7.5 12h.01', width: 2.5 },
		{ d: 'M7.5 18h.01', width: 2.5 },
	],
	image: [
		'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z',
		'M9 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
		'm21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21',
	],
	settings: [
		'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z',
		'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
	],
	user: ['M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'],
	exit: ['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'm16 17 5-5-5-5', 'M21 12H9'],
	menu: ['M4 6h16', 'M4 12h16', 'M4 18h16'],
	duplicate: [
		'M10 8h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z',
		'M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2',
	],
	download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'm7 10 5 5 5-5', 'M12 15V3'],
	upload: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'm17 8-5-5-5 5', 'M12 3v12'],
	trash: ['M3 6h18', 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6', 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'],
	edit: ['M12 20h9', 'M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z'],
	save: [
		'M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z',
		'M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7',
		'M7 3v4a1 1 0 0 0 1 1h7',
	],
	// 2×3 dots, drag handle
	grip: ['M9 5h.01', 'M15 5h.01', 'M9 12h.01', 'M15 12h.01', 'M9 19h.01', 'M15 19h.01'].map((d) => ({ d, width: 3 })),
	eye: [
		'M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0',
		'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
	],
	'external-link': ['M15 3h6v6', 'M10 14 21 3', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'],
	arrow: ['M19 12H5', 'm12 19-7-7 7-7'],
	// sidebar on the left; rotate 180 = right
	panel: ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M9 3v18'],
}

const d = computed(() => paths[props.name].map((p) => (typeof p === 'string' ? { d: p, width: undefined } : p)))
</script>

<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		:width="size"
		:height="size"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="shrink-0"
		:style="rotate ? { rotate: `${rotate}deg` } : undefined"
		:aria-hidden="label ? undefined : 'true'"
		:aria-label="label"
		:role="label ? 'img' : undefined"
	>
		<path
			v-for="p in d"
			:key="p.d"
			:d="p.d"
			:stroke-width="p.width"
		/>
	</svg>
</template>
