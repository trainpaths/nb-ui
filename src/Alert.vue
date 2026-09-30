<script setup lang="ts">
import { computed } from 'vue'

interface Props {
	type?: 'success' | 'warning' | 'error' | 'info'
	dismissible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	type: 'info',
	dismissible: false,
})

const emit = defineEmits<{
	dismiss: []
}>()

const typeClasses: Record<string, string> = {
	success: 'border-green-200 bg-green-50 text-green-700',
	warning: 'border-yellow-200 bg-yellow-50 text-yellow-800',
	error: 'border-red-200 bg-red-50 text-red-700',
	info: 'border-blue-200 bg-blue-50 text-blue-700',
}

const classes = computed(() => {
	const base = 'flex items-center justify-between gap-8 rounded-md border px-16 py-8 text-sm'
	return `${base} ${typeClasses[props.type]}`
})

// Errors/warnings are assertive; success/info are polite status updates.
const role = computed(() => (props.type === 'error' || props.type === 'warning' ? 'alert' : 'status'))
</script>

<template>
	<div
		:class="classes"
		:role="role"
	>
		<span>
			<slot />
		</span>
		<button
			v-if="dismissible"
			type="button"
			class="cursor-pointer opacity-70 hover:opacity-100"
			@click="emit('dismiss')"
		>
			&times;
		</button>
	</div>
</template>
