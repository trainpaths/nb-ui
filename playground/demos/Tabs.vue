<script setup lang="ts">
import { ref } from 'vue'
import { Tabs, type TabItem } from '../../index'
import Variant from '../Variant.vue'

const tab = ref('general')
const tabs: TabItem[] = [
	{ key: 'general', label: 'General' },
	{ key: 'seo', label: 'SEO' },
	{ key: 'advanced', label: 'Advanced' },
	{ key: 'billing', label: 'Billing', disabled: true },
]
</script>

<template>
	<Variant label="v-model + panel slots (arrow keys / Home / End)">
		<div class="w-full max-w-480">
			<Tabs v-model="tab" :tabs="tabs">
				<template #general><p class="m-0 text-sm">General settings panel.</p></template>
				<template #seo><p class="m-0 text-sm">Title, description, social image.</p></template>
				<template #advanced><p class="m-0 text-sm">Danger zone.</p></template>
			</Tabs>
		</div>
	</Variant>
</template>
