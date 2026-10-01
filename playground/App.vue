<script setup lang="ts">
import { onMounted, ref, type Component } from 'vue'
import { ConfirmDialog, ToastContainer } from '../index'

/** Every `demos/<Name>.vue` becomes a section + nav entry; add a file to showcase a new component. */
const demos = Object.entries(import.meta.glob<{ default: Component }>('./demos/*.vue', { eager: true }))
	.map(([path, mod]) => ({ name: path.slice('./demos/'.length, -'.vue'.length), component: mod.default }))
	.sort((a, b) => a.name.localeCompare(b.name))

const tokens = ['primary', 'primary-dark', 'secondary', 'accent', 'accent-dark', 'danger', 'success', 'warning', 'error', 'white', 'black']
const colors = ref<Record<string, string>>({})
const defaults: Record<string, string> = {}

onMounted(() => {
	const style = getComputedStyle(document.documentElement)
	for (const t of tokens) defaults[t] = style.getPropertyValue(`--color-${t}`).trim()
	colors.value = { ...defaults }
})

// inline var on <html> beats the @theme value, so edits apply live everywhere
function setColor(token: string, value: string) {
	colors.value[token] = value
	document.documentElement.style.setProperty(`--color-${token}`, value)
}

const rounded = ref(true)

function setRounded(on: boolean) {
	rounded.value = on
	document.documentElement.style.setProperty('--nb-rounded', on ? '1' : '0')
}

function resetColors() {
	for (const t of tokens) document.documentElement.style.removeProperty(`--color-${t}`)
	colors.value = { ...defaults }
}
</script>

<template>
	<div class="flex min-h-screen">
		<nav class="sticky top-0 hidden h-screen w-200 shrink-0 overflow-y-auto border-r border-gray-200 bg-white p-16 md:block">
			<p class="m-0 mb-12 text-sm font-semibold">nb-ui</p>
			<a
				v-for="demo in demos"
				:key="demo.name"
				:href="`#${demo.name}`"
				class="block rounded-sm px-8 py-4 text-sm text-gray-700 no-underline hover:bg-gray-100"
			>
				{{ demo.name }}
			</a>
		</nav>

		<main class="min-w-0 flex-1 p-16 md:p-32">
			<section class="mb-32 rounded-lg border border-gray-200 bg-white p-16">
				<div class="mb-12 flex items-center">
					<h2 class="m-0 text-sm font-semibold">Theme</h2>
					<label class="ml-auto mr-16 flex cursor-pointer items-center gap-6 text-xs text-gray-600">
						<input
							type="checkbox"
							:checked="rounded"
							@change="setRounded(($event.target as HTMLInputElement).checked)"
						/>
						Rounded corners (<code>--nb-rounded</code>)
					</label>
					<button
						type="button"
						class="border-none bg-transparent text-xs text-gray-500 hover:text-black"
						@click="resetColors"
					>
						Reset
					</button>
				</div>
				<div class="flex flex-wrap gap-12">
					<label
						v-for="t in tokens"
						:key="t"
						class="flex items-center gap-6 text-xs text-gray-600"
					>
						<input
							type="color"
							:value="colors[t]"
							class="size-24 cursor-pointer rounded-sm border border-gray-300 p-0"
							@input="setColor(t, ($event.target as HTMLInputElement).value)"
						/>
						{{ t }}
					</label>
				</div>
			</section>

			<section
				v-for="demo in demos"
				:id="demo.name"
				:key="demo.name"
				class="mb-32 scroll-mt-16"
			>
				<h2 class="m-0 mb-12 text-lg font-semibold">{{ demo.name }}</h2>
				<div class="flex flex-col gap-16 rounded-lg border border-gray-200 bg-white p-16">
					<component :is="demo.component" />
				</div>
			</section>
		</main>
	</div>
	<ToastContainer />
	<ConfirmDialog />
</template>
