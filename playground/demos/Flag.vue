<script setup lang="ts">
import { Flag, flagCodes } from '../../index'
import Variant from '../Variant.vue'
</script>

<template>
	<Variant label="flagCodes (en = UK), code or tag (de-CH), size = width">
		<Flag v-for="code in flagCodes" :key="code" :code="code" />
		<Flag code="de-CH" :size="32" />
	</Variant>
</template>
