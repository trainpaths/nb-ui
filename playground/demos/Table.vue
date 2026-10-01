<script setup lang="ts">
import { computed, ref } from 'vue'
import { Badge, Dropdown, EmptyState, Pagination, Table, type TableColumn } from '../../index'
import Variant from '../Variant.vue'

const columns: TableColumn[] = [
	{ key: 'title', label: 'Title' },
	{ key: 'status', label: 'Status', width: '120px' },
	{ key: 'views', label: 'Views', align: 'right', width: '100px' },
	{ key: 'actions', label: '', align: 'right', width: '56px' },
]
const all = Array.from({ length: 47 }, (_, i) => ({
	id: i + 1,
	title: `Page ${i + 1}`,
	status: i % 3 === 0 ? 'draft' : 'published',
	views: (i * 137) % 1000,
}))
const page = ref(1)
const rows = computed(() => all.slice((page.value - 1) * 5, page.value * 5))
const bigPage = ref(10)
</script>

<template>
	<Variant label="Table with cell slots + Pagination">
		<div class="flex w-full flex-col gap-12">
			<Table :columns="columns" :rows="rows" caption="Pages">
				<template #cell-status="{ value }">
					<Badge dot :color="value === 'draft' ? 'warning' : 'success'">{{ value }}</Badge>
				</template>
				<template #cell-actions>
					<Dropdown align="end" :items="[{ label: 'Edit' }, { label: 'Delete', danger: true }]" />
				</template>
			</Table>
			<Pagination v-model:page="page" :total="all.length" :page-size="5" />
		</div>
	</Variant>
	<Variant label="striped + dense / empty slot">
		<div class="w-full max-w-480">
			<Table :columns="columns.slice(0, 3)" :rows="all.slice(0, 4)" striped dense />
		</div>
		<div class="w-full max-w-480">
			<Table :columns="columns.slice(0, 3)" :rows="[]">
				<template #empty><EmptyState title="No pages yet" description="Create your first page to see it here." /></template>
			</Table>
		</div>
	</Variant>
	<Variant label="Pagination: many pages (ellipsis)">
		<Pagination v-model:page="bigPage" :total="500" />
	</Variant>
</template>
