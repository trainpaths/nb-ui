<script setup lang="ts">
import { Button, Card } from '../../index'
import Variant from '../Variant.vue'
</script>

<template>
	<Variant label="padding">
		<Card v-for="p in ['none', 'sm', 'md', 'lg'] as const" :key="p" :padding="p">padding="{{ p }}"</Card>
	</Variant>
	<Variant label="title / footer / divided / border">
		<div class="w-320">
			<Card title="Card title">
				Body content of the card.
				<template #footer><Button size="sm">Action</Button></template>
			</Card>
		</div>
		<div class="w-320">
			<Card title="Divided" divided border="accent">
				Body content of the card.
				<template #footer>
					<div class="flex justify-end gap-8">
						<Button size="sm" variant="ghost">Cancel</Button>
						<Button size="sm">Save</Button>
					</div>
				</template>
			</Card>
		</div>
	</Variant>
</template>
