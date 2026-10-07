<script setup lang="ts">
import { ref } from 'vue'
import { FormField, TagInput } from '../../index'
import Variant from '../Variant.vue'

const tags = ref(['vue', 'tailwind'])
const limited = ref<string[]>([])
const suggestions = ['vue', 'vite', 'tailwind', 'typescript', 'pinia', 'router', 'design', 'docs']
</script>

<template>
	<Variant label="suggestions + popular (type 'v')">
		<div class="w-360">
			<TagInput v-model="tags" :suggestions="suggestions" :popular="['design', 'docs', 'pinia']" />
		</div>
	</Variant>
	<Variant label="max=3, maxLength=10, lowercase normalize">
		<div class="w-360">
			<TagInput
				v-model="limited"
				:max="3"
				:max-length="10"
				:normalize="(v: string) => v.trim().toLowerCase()"
			/>
		</div>
	</Variant>
	<Variant label="in a FormField (label, hint, error)">
		<div class="w-360">
			<FormField label="Topics" hint="Up to 5.">
				<TagInput v-model="tags" :max="5" />
			</FormField>
		</div>
		<div class="w-360">
			<FormField label="Topics" error="Add at least one topic.">
				<TagInput v-model="limited" />
			</FormField>
		</div>
	</Variant>
</template>
