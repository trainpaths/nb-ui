<script setup lang="ts">
import { CloseButton, Icon, type IconName } from '../../index'
import Variant from '../Variant.vue'

const names: IconName[] = ['x', 'check', 'minus', 'plus', 'chevron-down', 'chevron-up', 'chevron-left', 'chevron-right', 'info', 'alert-triangle', 'alert-circle', 'check-circle', 'more', 'search', 'inbox', 'masonry', 'file', 'list-tree', 'image', 'settings', 'user', 'exit', 'menu']
</script>

<template>
	<Variant label="built-in icons (currentColor)">
		<span v-for="n in names" :key="n" class="flex flex-col items-center gap-4 text-accent-dark" :title="n">
			<Icon :name="n" :size="20" />
			<span class="font-mono text-[10px] text-black/50">{{ n }}</span>
		</span>
	</Variant>
	<Variant label="CloseButton">
		<CloseButton />
		<CloseButton :size="12" label="Remove" />
	</Variant>
</template>
