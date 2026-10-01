<script setup lang="ts">
import { Button, Icon, Tooltip } from '../../index'
import Variant from '../Variant.vue'
</script>

<template>
	<Variant label="placement (hover or Tab to a button)">
		<Tooltip v-for="p in ['top', 'bottom', 'left', 'right'] as const" :key="p" :text="`Tooltip ${p}`" :placement="p">
			<Button variant="outline">{{ p }}</Button>
		</Tooltip>
	</Variant>
	<Variant label="icon button / content slot">
		<Tooltip text="More actions">
			<Button square variant="ghost" aria-label="More"><Icon name="more" /></Button>
		</Tooltip>
		<Tooltip>
			<Button variant="ghost">Rich</Button>
			<template #content><strong>Bold</strong> tooltip content</template>
		</Tooltip>
	</Variant>
</template>
