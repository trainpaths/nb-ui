<script setup lang="ts" generic="Row extends Record<string, unknown>">
export interface TableColumn {
	key: string
	label: string
	align?: 'left' | 'center' | 'right'
	/** CSS width, e.g. '120px' or '20%' */
	width?: string
}

/**
 * Data table. Cells show `row[column.key]` unless a `#cell-<key>="{ row, value }"` slot is given; `#empty` when
 * there are no rows. Wrapped in a horizontal scroller for narrow screens.
 */
withDefaults(
	defineProps<{
		columns: TableColumn[]
		rows: Row[]
		/** row → unique key; defaults to `row.id`, then the index */
		rowKey?: (row: Row, index: number) => string | number
		striped?: boolean
		hoverable?: boolean
		dense?: boolean
		caption?: string
	}>(),
	{
		rowKey: (row: Row, index: number) => (row.id as string | number | undefined) ?? index,
		striped: false,
		hoverable: true,
		dense: false,
		caption: undefined,
	},
)

const alignClass = { left: 'text-left', center: 'text-center', right: 'text-right' }
</script>

<template>
	<div class="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white">
		<table class="w-full border-collapse text-sm text-black">
			<caption
				v-if="caption"
				class="sr-only"
			>
				{{ caption }}
			</caption>
			<thead class="bg-gray-50">
				<tr>
					<th
						v-for="col in columns"
						:key="col.key"
						scope="col"
						:style="col.width ? { width: col.width } : undefined"
						:class="[
							'border-b border-gray-200 px-12 text-xs font-semibold tracking-wide text-black/60 uppercase',
							dense ? 'py-6' : 'py-10',
							alignClass[col.align ?? 'left'],
						]"
					>
						<slot
							:name="`head-${col.key}`"
							:column="col"
							>{{ col.label }}</slot
						>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(row, i) in rows"
					:key="rowKey(row, i)"
					:class="[
						'border-b border-gray-100 last:border-b-0',
						striped && i % 2 === 1 ? 'bg-gray-50' : '',
						hoverable ? 'hover:bg-accent/10' : '',
					]"
				>
					<td
						v-for="col in columns"
						:key="col.key"
						:class="['px-12', dense ? 'py-6' : 'py-10', alignClass[col.align ?? 'left']]"
					>
						<slot
							:name="`cell-${col.key}`"
							:row="row"
							:value="row[col.key]"
							>{{ row[col.key] }}</slot
						>
					</td>
				</tr>
				<tr v-if="!rows.length">
					<td
						:colspan="columns.length"
						class="px-12 py-24 text-center text-black/50"
					>
						<slot name="empty">No data</slot>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
