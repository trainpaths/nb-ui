<script setup lang="ts">
import { ref } from 'vue'
import { TagInput } from '../../index'
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
</template>
