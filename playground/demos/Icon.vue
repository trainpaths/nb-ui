<script setup lang="ts">
import { CloseButton, Icon, type IconName } from '../../index'
import Variant from '../Variant.vue'

const names: IconName[] = ['x', 'check', 'minus', 'plus', 'chevron', 'info', 'alert-triangle', 'alert-circle', 'check-circle', 'more', 'search', 'inbox', 'masonry', 'file', 'list-tree', 'image', 'settings', 'user', 'exit', 'menu', 'duplicate', 'download', 'upload', 'trash', 'edit', 'save', 'grip', 'eye', 'external-link', 'arrow', 'panel']
</script>

<template>
	<Variant label="built-in icons (currentColor)">
		<span v-for="n in names" :key="n" class="flex flex-col items-center gap-4 text-accent-dark" :title="n">
			<Icon :name="n" :size="20" />
			<span class="font-mono text-[10px] text-black/50">{{ n }}</span>
		</span>
	</Variant>
	<Variant label="rotate (chevron, arrow, panel; 0 / 90 / 180 / 270)">
		<template v-for="n in (['chevron', 'arrow', 'panel'] as const)" :key="n">
			<Icon v-for="r in [0, 90, 180, 270]" :key="`${n}${r}`" :name="n" :size="20" :rotate="r" class="text-accent-dark" />
		</template>
	</Variant>
	<Variant label="CloseButton">
		<CloseButton />
		<CloseButton :size="12" label="Remove" />
	</Variant>
</template>
