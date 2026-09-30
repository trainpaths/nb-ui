<script setup lang="ts">
import { FormField, Input } from '../../index'
import Variant from '../Variant.vue'
</script>

<template>
	<Variant label="label / hint / error / required">
		<div class="w-280">
			<FormField label="Email" hint="We never share it." required>
				<Input type="email" />
			</FormField>
		</div>
		<div class="w-280">
			<FormField label="Password" error="At least 8 characters.">
				<Input type="password" invalid />
			</FormField>
		</div>
	</Variant>
</template>
