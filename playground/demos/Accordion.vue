<script setup lang="ts">
import { ref } from 'vue'
import { Accordion, Input, type AccordionItem } from '../../index'
import Info from '../Info.vue'
import Variant from '../Variant.vue'

const items: AccordionItem[] = [
	{ key: 'general', label: 'General' },
	{ key: 'seo', label: 'SEO' },
	{ key: 'billing', label: 'Billing', disabled: true },
]
const open = ref(['general'])
</script>

<template>
	<Variant label="one at a time (default) / multiple + v-model">
		<div class="w-full max-w-360">
			<Accordion :items="items">
				<template #general>Site name, language, time zone.</template>
				<template #seo>Title, description, social image.</template>
			</Accordion>
		</div>
		<div class="w-full max-w-360">
			<Accordion v-model="open" :items="items" multiple>
				<template #general><Input placeholder="Typed text survives closing" /></template>
				<template #seo>Title, description, social image.</template>
			</Accordion>
			<Info>open: {{ open }}</Info>
		</div>
	</Variant>
</template>
