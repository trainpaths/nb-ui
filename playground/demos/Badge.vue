<script setup lang="ts">
import { ref } from 'vue'
import { Avatar, Badge } from '../../index'
import Variant from '../Variant.vue'

const tags = ref(['news', 'events', 'blog'])
// inline image: playground stays offline-friendly
const photo = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><defs><linearGradient id="g"><stop offset="0" stop-color="#86bbbd"/><stop offset="1" stop-color="#6a428a"/></linearGradient></defs><rect width="48" height="48" fill="url(#g)"/><circle cx="24" cy="19" r="8" fill="#fff" opacity=".9"/><ellipse cx="24" cy="42" rx="15" ry="11" fill="#fff" opacity=".9"/></svg>')}`
const colors = ['accent', 'primary', 'secondary', 'success', 'warning', 'danger'] as const
</script>

<template>
	<Variant label="Badge: soft (default) / solid / outline">
		<div class="flex flex-col gap-8">
			<div v-for="v in ['soft', 'solid', 'outline'] as const" :key="v" class="flex flex-wrap gap-6">
				<Badge v-for="c in colors" :key="c" :color="c" :variant="v">{{ c }}</Badge>
			</div>
		</div>
	</Variant>
	<Variant label="dot / size sm / removable">
		<Badge dot color="success">Published</Badge>
		<Badge dot color="warning">Draft</Badge>
		<Badge size="sm">sm</Badge>
		<Badge v-for="t in tags" :key="t" removable @remove="tags = tags.filter((x) => x !== t)">{{ t }}</Badge>
	</Variant>
	<Variant label="Avatar: initials (stable colour per name) / sizes / image / broken image">
		<Avatar name="Ada Lovelace" size="sm" />
		<Avatar name="Grace Hopper" />
		<Avatar name="Alan Turing" size="lg" />
		<Avatar name="Margaret Hamilton" size="xl" />
		<Avatar :src="photo" name="Photo user" size="lg" />
		<Avatar src="/missing.png" name="Broken Image" size="lg" />
	</Variant>
</template>
