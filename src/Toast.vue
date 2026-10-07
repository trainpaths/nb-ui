<script setup lang="ts">
import { computed } from 'vue'
import type { ToastType } from './useToast'
import CloseButton from './CloseButton.vue'
import Icon from './Icon.vue'
import { statusIcons } from './status'

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
	success: 'bg-success text-white',
	warning: 'bg-warning text-black',
	error: 'bg-error text-white',
	info: 'bg-accent text-black',
}

// fixed width: the leave animation takes it out of flow (absolute), which must not resize it
const classes = computed(
	() =>
		`flex w-320 max-w-[calc(100vw-32px)] items-start gap-10 rounded-md px-14 py-10 text-sm shadow-lg ${colorMap[props.type]}`,
)
</script>

<template>
	<div
		:class="classes"
		:role="type === 'error' ? 'alert' : 'status'"
	>
		<Icon
			:name="statusIcons[type]"
			:size="18"
			class="mt-1"
		/>
		<span class="flex-1 break-words">{{ message }}</span>
		<CloseButton
			label="Dismiss"
			@click="emit('dismiss')"
		/>
	</div>
</template>
