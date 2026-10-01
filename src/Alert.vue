<script setup lang="ts">
import { computed } from 'vue'
import CloseButton from './CloseButton.vue'
import Icon, { type IconName } from './Icon.vue'

interface Props {
	type?: 'success' | 'warning' | 'error' | 'info'
	title?: string
	dismissible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	type: 'info',
	title: undefined,
	dismissible: false,
})

const emit = defineEmits<{
	dismiss: []
}>()

// tinted bg + coloured edge/icon; text stays black (type colours are too light for body text)
const typeClasses = {
	success: { box: 'bg-success/10 border-success', icon: 'text-success' },
	warning: { box: 'bg-warning/15 border-warning', icon: 'text-warning' },
	error: { box: 'bg-error/10 border-error', icon: 'text-error' },
	info: { box: 'bg-accent/15 border-accent', icon: 'text-accent-dark' },
}

const icons: Record<NonNullable<Props['type']>, IconName> = {
	success: 'check-circle',
	warning: 'alert-triangle',
	error: 'alert-circle',
	info: 'info',
}

const classes = computed(
	() => `flex items-start gap-10 rounded-md border-l-4 px-14 py-10 text-sm text-black ${typeClasses[props.type].box}`,
)

// Errors/warnings are assertive; success/info are polite status updates.
const role = computed(() => (props.type === 'error' || props.type === 'warning' ? 'alert' : 'status'))
</script>

<template>
	<div
		:class="classes"
		:role="role"
	>
		<Icon
			:name="icons[type]"
			:size="18"
			:class="['mt-1', typeClasses[type].icon]"
		/>
		<div class="flex-1">
			<p
				v-if="title"
				class="m-0 mb-2 font-semibold"
			>
				{{ title }}
			</p>
			<slot />
		</div>
		<CloseButton
			v-if="dismissible"
			label="Dismiss"
			@click="emit('dismiss')"
		/>
	</div>
</template>
