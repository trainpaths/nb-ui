<script setup lang="ts">
import { ref } from 'vue'
import { Button, FormField, Icon, Input, Popover } from '../../index'
import Info from '../Info.vue'
import Variant from '../Variant.vue'

const name = ref('Untitled')
const open = ref(false)
</script>

<template>
	<Variant label="form in a popover ([autofocus] gets focus; Esc / outside click / Tab out close)">
		<Popover label="Rename">
			<template #trigger="{ props }">
				<Button variant="outline" v-bind="props"><Icon name="edit" />Rename</Button>
			</template>
			<template #default="{ close }">
				<form class="flex w-240 flex-col gap-8" @submit.prevent="close()">
					<FormField label="Name">
						<Input v-model="name" autofocus />
					</FormField>
					<Button type="submit" block>Save</Button>
				</form>
			</template>
		</Popover>
		<Info>name: {{ name }}</Info>
	</Variant>
	<Variant label="placement top, align end, v-model:open">
		<Popover v-model:open="open" placement="top" align="end" class="w-200 text-sm">
			<template #trigger="{ props }">
				<Button v-bind="props">Info</Button>
			</template>
			Popovers hold any content: text, forms, pickers.
		</Popover>
		<Info>open: {{ open }}</Info>
	</Variant>
</template>
