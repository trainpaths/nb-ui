<script setup lang="ts">
import { computed } from 'vue'

interface Props {
	divided?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	divided: true,
})

const classes = computed(() => {
	const base = 'flex flex-col'
	return props.divided ? `${base} divide-y divide-primary/15` : base
})
</script>

<template>
	<dl :class="classes">
		<slot />
	</dl>
</template>
