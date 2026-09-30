<script setup lang="ts">
import { Button, Card } from '../../index'
import Variant from '../Variant.vue'
</script>

<template>
	<Variant label="padding">
		<Card v-for="p in ['none', 'sm', 'md', 'lg'] as const" :key="p" :padding="p">padding="{{ p }}"</Card>
	</Variant>
	<Variant label="header / footer slots, border">
		<div class="w-320">
			<Card border="primary">
				<template #header><h3 class="m-0 text-base font-semibold">Card title</h3></template>
				Body content of the card.
				<template #footer><Button size="sm">Action</Button></template>
			</Card>
		</div>
	</Variant>
</template>
