<script setup lang="ts">
import { computed } from 'vue'
import { type Color, bgColor } from './colors'

/** Horizontal progress bar. Without `value` it is indeterminate (sliding stripe). */
const props = withDefaults(
	defineProps<{ value?: number; max?: number; color?: Color; size?: 'sm' | 'md'; label?: string }>(),
	{ value: undefined, max: 100, color: 'accent-dark', size: 'md', label: 'Progress' },
)

const indeterminate = computed(() => props.value === undefined)
const percent = computed(() => Math.min(100, Math.max(0, ((props.value ?? 0) / props.max) * 100)))
</script>

<template>
	<div
		role="progressbar"
		:aria-label="label"
		aria-valuemin="0"
		:aria-valuemax="max"
		:aria-valuenow="indeterminate ? undefined : value"
		class="relative w-full overflow-hidden rounded-full bg-gray-200"
		:class="size === 'sm' ? 'h-4' : 'h-8'"
	>
		<div
			v-if="indeterminate"
			class="nb-progress-indeterminate absolute inset-y-0 w-1/3 rounded-full motion-reduce:animate-pulse"
			:class="bgColor(color)"
		/>
		<div
			v-else
			class="h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none"
			:class="bgColor(color)"
			:style="{ width: `${percent}%` }"
		/>
	</div>
</template>

<style>
@keyframes nb-progress-slide {
	from {
		left: -33%;
	}
	to {
		left: 100%;
	}
}
.nb-progress-indeterminate {
	animation: nb-progress-slide 1.2s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
	.nb-progress-indeterminate {
		animation: none;
		left: 0;
		width: 100%;
	}
}
</style>
