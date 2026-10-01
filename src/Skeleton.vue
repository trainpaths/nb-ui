<script setup lang="ts">
/**
 * Grey pulsing placeholder for content that is loading. `lines` renders a text block (last line shorter);
 * otherwise size it with `width`/`height` (any CSS length) or classes.
 */
withDefaults(
	defineProps<{ width?: string; height?: string; rounded?: 'sm' | 'md' | 'full'; lines?: number }>(),
	{ width: undefined, height: '16px', rounded: 'md', lines: 0 },
)

const roundedClasses = { sm: 'rounded-sm', md: 'rounded-md', full: 'rounded-full' }
</script>

<template>
	<div
		v-if="lines"
		class="flex flex-col gap-8"
		aria-hidden="true"
	>
		<span
			v-for="n in lines"
			:key="n"
			class="block animate-pulse bg-gray-200 motion-reduce:animate-none"
			:class="roundedClasses[rounded]"
			:style="{ height, width: n === lines && lines > 1 ? '60%' : (width ?? '100%') }"
		/>
	</div>
	<span
		v-else
		class="block animate-pulse bg-gray-200 motion-reduce:animate-none"
		:class="roundedClasses[rounded]"
		:style="{ height, width: width ?? '100%' }"
		aria-hidden="true"
	/>
</template>
