<script setup lang="ts">
import { Loading } from '../../index'
import Variant from '../Variant.vue'
</script>

<template>
	<Variant label="default / custom label (fullscreen fills the viewport, not shown)">
		<Loading />
		<Loading label="Fetching pages…" />
	</Variant>
</template>
