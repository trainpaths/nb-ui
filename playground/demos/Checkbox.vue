<script setup lang="ts">
import { computed, ref } from 'vue'
import { Checkbox } from '../../index'
import Info from '../Info.vue'
import Variant from '../Variant.vue'

const agree = ref(false)
const all = ['Pages', 'Media', 'Menus']
const picked = ref<unknown[]>(['Pages'])
const allChecked = computed(() => picked.value.length === all.length)
const some = computed(() => picked.value.length > 0 && !allChecked.value)
</script>

<template>
	<Variant label="boolean / description / invalid / disabled">
		<Checkbox v-model="agree" label="I agree" />
		<Checkbox label="Newsletter" description="One mail a month, no spam." />
		<Checkbox label="Invalid" invalid />
		<Checkbox label="Disabled" disabled />
		<Checkbox label="Disabled on" disabled :model-value="true" />
	</Variant>
	<Variant label="array model + indeterminate parent">
		<div class="flex flex-col gap-6">
			<Checkbox
				label="All sections"
				:model-value="allChecked"
				:indeterminate="some"
				@update:model-value="picked = $event ? [...all] : []"
			/>
			<div class="flex flex-col gap-6 pl-24">
				<Checkbox v-for="s in all" :key="s" v-model="picked" :value="s" :label="s" />
			</div>
		</div>
		<Info>v-model: {{ picked }}</Info>
	</Variant>
</template>
