<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '../../index'
import Variant from '../Variant.vue'

const published = ref(true)
const dark = ref(false)
</script>

<template>
	<Variant label="label + description / size / disabled">
		<div class="w-320"><Switch v-model="published" class="w-full" label="Published" :description="published ? 'Live at /about' : 'Draft: only staff can see it'" /></div>
		<Switch v-model="dark" size="sm" label="Small" />
		<Switch disabled label="Disabled" />
		<Switch disabled :model-value="true" label="Disabled on" />
	</Variant>
</template>
