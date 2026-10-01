<script setup lang="ts">
import { ref } from 'vue'
import { Button, ProgressBar, Skeleton, Spinner } from '../../index'
import Variant from '../Variant.vue'

const progress = ref(40)
</script>

<template>
	<Variant label="Spinner: size / color">
		<Spinner size="sm" />
		<Spinner />
		<Spinner size="lg" />
		<Spinner color="primary" />
		<Spinner color="danger" />
	</Variant>
	<Variant label="Skeleton: lines / shapes">
		<div class="flex w-320 items-start gap-12">
			<Skeleton width="40px" height="40px" rounded="full" />
			<div class="flex-1"><Skeleton :lines="3" height="12px" /></div>
		</div>
		<Skeleton width="160px" height="96px" />
	</Variant>
	<Variant label="ProgressBar: value / indeterminate / color / size">
		<div class="flex w-320 flex-col gap-12">
			<ProgressBar :value="progress" />
			<ProgressBar />
			<ProgressBar :value="75" color="success" size="sm" />
		</div>
		<Button size="sm" variant="outline" @click="progress = (progress + 20) % 120">+20</Button>
	</Variant>
</template>
