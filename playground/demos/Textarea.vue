<script setup lang="ts">
import { ref } from 'vue'
import { FormField, Textarea } from '../../index'
import Variant from '../Variant.vue'

const bio = ref('')
const notes = ref('Type more lines\nand it grows.')
</script>

<template>
	<Variant label="counter + maxlength / autoResize">
		<div class="w-320">
			<FormField label="Bio" hint="Shown on your profile.">
				<Textarea v-model="bio" :maxlength="160" counter placeholder="A few words about you" />
			</FormField>
		</div>
		<div class="w-320"><Textarea v-model="notes" auto-resize :rows="2" /></div>
	</Variant>
	<Variant label="invalid / disabled">
		<div class="w-240"><Textarea invalid placeholder="Invalid" /></div>
		<div class="w-240"><Textarea disabled placeholder="Disabled" /></div>
	</Variant>
</template>
