<script setup lang="ts">
import Icon, { type IconName } from './Icon.vue'

/** Placeholder for an empty list / search without results. Put a call-to-action in the `#action` slot. */
withDefaults(defineProps<{ title: string; description?: string; icon?: IconName }>(), {
	description: undefined,
	icon: 'inbox',
})
</script>

<template>
	<div class="flex flex-col items-center justify-center gap-8 px-16 py-40 text-center font-sans">
		<span class="mb-4 flex size-48 items-center justify-center rounded-full bg-accent/20 text-accent-dark">
			<slot name="icon">
				<Icon
					:name="icon"
					:size="24"
				/>
			</slot>
		</span>
		<p class="m-0 text-base font-semibold text-black">{{ title }}</p>
		<p
			v-if="description || $slots.default"
			class="m-0 max-w-360 text-sm text-black/60"
		>
			<slot>{{ description }}</slot>
		</p>
		<div
			v-if="$slots.action"
			class="mt-8"
		>
			<slot name="action" />
		</div>
	</div>
</template>
