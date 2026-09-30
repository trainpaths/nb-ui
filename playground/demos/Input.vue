<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '../../index'
import Variant from '../Variant.vue'

const text = ref('')
const count = ref(3)
</script>

<template>
	<Variant label="type">
		<div class="w-240"><Input v-model="text" placeholder="Text" /></div>
		<div class="w-240"><Input type="email" placeholder="name@example.com" /></div>
		<div class="w-240"><Input type="password" placeholder="Password" /></div>
		<div class="w-240"><Input v-model="count" type="number" /></div>
	</Variant>
	<Variant label="state">
		<div class="w-240"><Input placeholder="Invalid" invalid /></div>
		<div class="w-240"><Input placeholder="Disabled" disabled /></div>
		<div class="w-240"><Input placeholder="border=accent" border="accent" /></div>
	</Variant>
</template>
