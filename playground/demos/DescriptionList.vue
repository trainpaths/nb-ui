<script setup lang="ts">
import { DescriptionItem, DescriptionList } from '../../index'
import Variant from '../Variant.vue'
</script>

<template>
	<Variant label="divided (default) + DescriptionItem">
		<div class="w-320">
			<DescriptionList>
				<DescriptionItem label="Name">Ada Lovelace</DescriptionItem>
				<DescriptionItem label="Email">ada@example.com</DescriptionItem>
				<DescriptionItem>
					<template #label>Custom label slot</template>
					Value
				</DescriptionItem>
			</DescriptionList>
		</div>
		<div class="w-320">
			<DescriptionList :divided="false">
				<DescriptionItem label="Not divided">Value</DescriptionItem>
				<DescriptionItem label="Second">Value</DescriptionItem>
			</DescriptionList>
		</div>
	</Variant>
</template>
