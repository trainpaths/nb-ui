<script setup lang="ts">
import { Button } from '../../index'
import Variant from '../Variant.vue'
</script>

<template>
	<Variant label="variant">
		<Button>Solid</Button>
		<Button variant="outline" text="primary">Outline</Button>
		<Button variant="ghost" text="primary">Ghost</Button>
	</Variant>
	<Variant label="size">
		<Button size="sm">Small</Button>
		<Button size="md">Medium</Button>
		<Button size="lg">Large</Button>
	</Variant>
	<Variant label="bg / border / text">
		<Button bg="danger" border="danger">Danger</Button>
		<Button bg="success" border="success">Success</Button>
		<Button bg="warning" border="warning" text="black">Warning</Button>
		<Button bg="secondary" border="secondary">Secondary</Button>
		<Button variant="outline" border="danger" text="danger">Outline danger</Button>
	</Variant>
	<Variant label="state">
		<Button loading>Save</Button>
		<Button disabled>Disabled</Button>
		<Button as="a" href="#Button">As link</Button>
	</Variant>
</template>
