<script setup lang="ts">
import { Button, EmptyState, Icon } from '../../index'
import Variant from '../Variant.vue'
</script>

<template>
	<Variant label="title / description / icon / action slot">
		<div class="w-full max-w-480 rounded-lg border border-dashed border-gray-300">
			<EmptyState title="No media yet" description="Upload images to use them in your pages.">
				<template #action><Button><Icon name="plus" />Upload</Button></template>
			</EmptyState>
		</div>
		<div class="w-full max-w-320 rounded-lg border border-dashed border-gray-300">
			<EmptyState icon="search" title="No results" description="Try a different search term." />
		</div>
	</Variant>
</template>
