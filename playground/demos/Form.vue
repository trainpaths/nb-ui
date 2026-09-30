<script setup lang="ts">
import { ref } from 'vue'
import { Button, Form, FormField, Input, useToast } from '../../index'
import Variant from '../Variant.vue'

const name = ref('')
const { toast } = useToast()
</script>

<template>
	<Variant label="submit → toast">
		<div class="w-280">
			<Form @submit="toast({ message: `Hello ${name || 'there'}`, type: 'success' })">
				<FormField label="Name">
					<Input v-model="name" />
				</FormField>
				<Button type="submit">Submit</Button>
			</Form>
		</div>
	</Variant>
</template>
