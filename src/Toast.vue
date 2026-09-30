<script setup lang="ts">
import { computed } from 'vue'
import type { ToastType } from './useToast'

interface Props {
	message: string
	type?: ToastType
}

const props = withDefaults(defineProps<Props>(), {
	type: 'info',
})

const emit = defineEmits<{
	dismiss: []
}>()

const colorMap: Record<ToastType, string> = {
	success: 'bg-success',
	warning: 'bg-warning',
	error: 'bg-error',
	info: 'bg-accent',
}

const textMap: Record<ToastType, string> = {
	success: 'text-white',
	warning: 'text-black',
	error: 'text-white',
	info: 'text-white',
}

const classes = computed(() => {
	const base = 'rounded px-16 py-8 flex items-center justify-between gap-16 min-w-[280px] shadow-lg'
	return `${base} ${colorMap[props.type]} ${textMap[props.type]}`
})
</script>

<template>
	<div :class="classes">
		<span>{{ message }}</span>
		<button
			class="cursor-pointer bg-transparent border-none text-inherit opacity-70 hover:opacity-100"
			@click="emit('dismiss')"
		>
			✕
		</button>
	</div>
</template>
