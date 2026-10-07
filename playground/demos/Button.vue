<script setup lang="ts">
import { ref } from 'vue'
import { Button, Icon } from '../../index'
import Variant from '../Variant.vue'

const loading = ref(false)
function fakeSave() {
	loading.value = true
	setTimeout(() => (loading.value = false), 1500)
}
</script>

<template>
	<Variant label="variant (accent default)">
		<Button>Solid</Button>
		<Button variant="outline">Outline</Button>
		<Button variant="ghost">Ghost</Button>
	</Variant>
	<Variant label="size">
		<Button size="sm">Small</Button>
		<Button size="md">Medium</Button>
		<Button size="lg">Large</Button>
	</Variant>
	<Variant label="bg (text picks a readable colour)">
		<Button bg="primary">Primary</Button>
		<Button bg="secondary">Secondary</Button>
		<Button bg="danger">Danger</Button>
		<Button bg="success">Success</Button>
		<Button bg="warning">Warning</Button>
		<Button variant="outline" border="primary">Outline primary</Button>
		<Button variant="outline" border="danger">Outline danger</Button>
		<Button variant="ghost" text="danger">Ghost danger</Button>
	</Variant>
	<Variant label="with icon / square / block">
		<Button><Icon name="plus" />New page</Button>
		<Button square aria-label="More"><Icon name="more" /></Button>
		<Button square variant="outline" aria-label="Search"><Icon name="search" /></Button>
		<div class="w-240"><Button block bg="primary">Full width</Button></div>
	</Variant>
	<Variant label="state (loading keeps the width)">
		<Button :loading="loading" @click="fakeSave">Save changes</Button>
		<Button loading variant="outline">Saving</Button>
		<Button disabled>Disabled</Button>
		<Button as="a" href="#Button">As link</Button>
		<Button as="a" href="#Button" disabled>Disabled link</Button>
		<Button to="/settings" variant="outline">Router link</Button>
	</Variant>
</template>
