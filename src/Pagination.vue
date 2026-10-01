<script setup lang="ts">
import { computed } from 'vue'
import Icon from './Icon.vue'
import { pageRange } from './pageRange'
import { focusRing } from './styles'

/** Page links for a list of `total` items. `v-model:page` is 1-based. */
const props = withDefaults(defineProps<{ page: number; total: number; pageSize?: number; siblings?: number }>(), {
	pageSize: 10,
	siblings: 1,
})

const emit = defineEmits<{ 'update:page': [page: number] }>()

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
const pages = computed(() => pageRange(props.page, pageCount.value, props.siblings))

function go(page: number) {
	if (page >= 1 && page <= pageCount.value && page !== props.page) emit('update:page', page)
}

const btn = `inline-flex h-32 min-w-32 cursor-pointer items-center justify-center rounded border px-8 text-sm transition-[color,background-color,opacity] duration-150 not-disabled:active:opacity-70 disabled:cursor-not-allowed disabled:opacity-40 ${focusRing}`
</script>

<template>
	<nav
		aria-label="Pagination"
		class="flex flex-wrap items-center gap-4 font-sans"
	>
		<button
			type="button"
			:class="[btn, 'border-transparent bg-transparent text-black hover:bg-accent/20']"
			:disabled="page <= 1"
			aria-label="Previous page"
			@click="go(page - 1)"
		>
			<Icon name="chevron-left" />
		</button>
		<template
			v-for="(p, i) in pages"
			:key="`${p}-${i}`"
		>
			<span
				v-if="p === '…'"
				class="inline-flex h-32 min-w-32 items-center justify-center text-sm text-black/50"
				aria-hidden="true"
				>…</span
			>
			<button
				v-else
				type="button"
				:class="[
					btn,
					p === page
						? 'border-accent-dark bg-accent-dark font-semibold text-white'
						: 'border-transparent bg-transparent text-black hover:bg-accent/20',
				]"
				:aria-current="p === page ? 'page' : undefined"
				:aria-label="`Page ${p}`"
				@click="go(p)"
			>
				{{ p }}
			</button>
		</template>
		<button
			type="button"
			:class="[btn, 'border-transparent bg-transparent text-black hover:bg-accent/20']"
			:disabled="page >= pageCount"
			aria-label="Next page"
			@click="go(page + 1)"
		>
			<Icon name="chevron-right" />
		</button>
	</nav>
</template>
