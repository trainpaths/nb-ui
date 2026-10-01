<script setup lang="ts">
import { ref } from 'vue'
import { FormField, Select } from '../../index'
import Variant from '../Variant.vue'

const fruit = ref<string | null>(null)
const size = ref(2)
const sizes = [
	{ value: 1, label: 'Small' },
	{ value: 2, label: 'Medium' },
	{ value: 3, label: 'Large', disabled: true },
]
</script>

<template>
	<Variant label="string options + placeholder / object options (number values)">
		<div class="w-240"><Select v-model="fruit" :options="['Apple', 'Banana', 'Cherry']" placeholder="Pick a fruit" /></div>
		<div class="w-240"><Select v-model="size" :options="sizes" /></div>
		<p class="m-0 font-mono text-xs">{{ fruit }} / {{ size }} ({{ typeof size }})</p>
	</Variant>
	<Variant label="in FormField / invalid / disabled / size">
		<div class="w-240">
			<FormField label="Tag" error="Required">
				<Select :options="['news', 'blog']" placeholder="All tags" />
			</FormField>
		</div>
		<div class="w-180"><Select :options="['Disabled']" :model-value="'Disabled'" disabled /></div>
		<div class="w-180"><Select :options="['Small']" :model-value="'Small'" size="sm" /></div>
	</Variant>
</template>
