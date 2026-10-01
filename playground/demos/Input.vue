<script setup lang="ts">
import { ref } from 'vue'
import { Icon, Input } from '../../index'
import Variant from '../Variant.vue'

const text = ref('')
const count = ref(3)
const slug = ref('about-us')
</script>

<template>
	<Variant label="type">
		<div class="w-240"><Input v-model="text" placeholder="Text" /></div>
		<div class="w-240"><Input type="email" placeholder="name@example.com" /></div>
		<div class="w-240"><Input type="password" placeholder="Password" /></div>
		<div class="w-240"><Input v-model="count" type="number" /></div>
	</Variant>
	<Variant label="size">
		<div class="w-180"><Input size="sm" placeholder="Small" /></div>
		<div class="w-180"><Input placeholder="Medium" /></div>
		<div class="w-180"><Input size="lg" placeholder="Large" /></div>
	</Variant>
	<Variant label="prefix / suffix slots">
		<div class="w-240">
			<Input v-model="slug"><template #prefix>/</template></Input>
		</div>
		<div class="w-240">
			<Input type="search" placeholder="Search…"><template #prefix><Icon name="search" /></template></Input>
		</div>
		<div class="w-240">
			<Input type="number" :model-value="250"><template #suffix>px</template></Input>
		</div>
	</Variant>
	<Variant label="state">
		<div class="w-240"><Input placeholder="Invalid" invalid /></div>
		<div class="w-240"><Input placeholder="Disabled" disabled /></div>
		<div class="w-240"><Input placeholder="border=accent" border="accent" /></div>
	</Variant>
</template>
