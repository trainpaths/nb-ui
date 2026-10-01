<script setup lang="ts">
import { ref } from 'vue'
import { Button, Dropdown, Icon, type DropdownItem } from '../../index'
import Variant from '../Variant.vue'

const last = ref('')
const items: DropdownItem[] = [
	{ label: 'Edit', icon: 'plus' },
	{ label: 'Duplicate' },
	{ label: 'Archived', disabled: true },
	{ label: 'Delete', icon: 'x', danger: true, divider: true },
]
</script>

<template>
	<Variant label="default trigger / custom trigger / align end (click or ArrowDown, then arrows/Home/End/Esc)">
		<Dropdown :items="items" @select="last = $event.label" />
		<Dropdown :items="items" @select="last = $event.label">
			<template #trigger="{ props, open }">
				<Button variant="outline" v-bind="props">
					Actions <Icon :name="open ? 'chevron-up' : 'chevron-down'" />
				</Button>
			</template>
		</Dropdown>
		<Dropdown :items="items" align="end" @select="last = $event.label">
			<template #trigger="{ props }">
				<Button v-bind="props">Align end</Button>
			</template>
		</Dropdown>
		<p class="m-0 font-mono text-xs">selected: {{ last }}</p>
	</Variant>
</template>
