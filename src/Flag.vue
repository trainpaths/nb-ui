<script setup lang="ts">
/**
 * Language flag (3:2, `size` = width). Takes a language code or tag (`de`, `de-CH`); renders nothing for a language
 * without a flag (`hasFlag` tells beforehand). Decorative by default; pass `label` to expose it to screen readers.
 */
import { computed, useId } from 'vue'
import { flagOf } from './flags'

const props = withDefaults(defineProps<{ code: string; size?: number; label?: string }>(), {
	size: 20,
	label: undefined,
})

const flag = computed(() => flagOf(props.code))
// per instance: several Union Jacks on a page
const id = useId()
</script>

<template>
	<svg
		v-if="flag"
		xmlns="http://www.w3.org/2000/svg"
		:width="size"
		:height="Math.round((size * 2) / 3)"
		:viewBox="flag === 'en' ? '0 0 60 30' : '0 0 3 2'"
		preserveAspectRatio="xMidYMid slice"
		class="shrink-0 rounded-xs shadow-[0_0_0_1px_rgb(0_0_0/0.1)]"
		:aria-hidden="label ? undefined : 'true'"
		:aria-label="label"
		:role="label ? 'img' : undefined"
	>
		<template v-if="flag === 'en'">
			<clipPath :id="`${id}-t`">
				<path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
			</clipPath>
			<path
				d="M0 0h60v30H0z"
				fill="#012169"
			/>
			<path
				d="M0 0l60 30m0-30L0 30"
				stroke="#fff"
				stroke-width="6"
			/>
			<path
				d="M0 0l60 30m0-30L0 30"
				:clip-path="`url(#${id}-t)`"
				stroke="#c8102e"
				stroke-width="4"
			/>
			<path
				d="M30 0v30M0 15h60"
				stroke="#fff"
				stroke-width="10"
			/>
			<path
				d="M30 0v30M0 15h60"
				stroke="#c8102e"
				stroke-width="6"
			/>
		</template>
		<template v-else-if="flag === 'de'">
			<path
				d="M0 0h3v.67H0z"
				fill="#000"
			/>
			<path
				d="M0 .67h3v.67H0z"
				fill="#d00"
			/>
			<path
				d="M0 1.33h3V2H0z"
				fill="#ffce00"
			/>
		</template>
		<template v-else>
			<path
				d="M0 0h1v2H0z"
				:fill="flag === 'it' ? '#009246' : '#0055a4'"
			/>
			<path
				d="M1 0h1v2H1z"
				fill="#fff"
			/>
			<path
				d="M2 0h1v2H2z"
				:fill="flag === 'it' ? '#ce2b37' : '#ef4135'"
			/>
		</template>
	</svg>
</template>
