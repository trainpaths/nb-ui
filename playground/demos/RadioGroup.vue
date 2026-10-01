<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup } from '../../index'
import Variant from '../Variant.vue'

const visibility = ref<string | null>('public')
const size = ref<string | null>('md')
</script>

<template>
	<Variant label="options with description / horizontal / invalid">
		<RadioGroup
			v-model="visibility"
			legend="Visibility"
			:options="[
				{ value: 'public', label: 'Public', description: 'Anyone with the link' },
				{ value: 'staff', label: 'Staff only', description: 'Signed-in staff' },
				{ value: 'secret', label: 'Hidden', disabled: true },
			]"
		/>
		<RadioGroup v-model="size" legend="Size" orientation="horizontal" :options="['sm', 'md', 'lg']" />
		<RadioGroup legend="Required" invalid :options="['yes', 'no']" />
	</Variant>
</template>
