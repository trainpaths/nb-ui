<script setup lang="ts">
import { ref } from 'vue'
import { Button, FormField, Input, Modal, Switch, useConfirm, useToast } from '../../index'
import Variant from '../Variant.vue'

const basic = ref(false)
const form = ref(false)
const persistent = ref(false)
const large = ref(false)
const published = ref(true)
const { confirm } = useConfirm()
const { toast } = useToast()

async function remove() {
	const ok = await confirm({
		title: 'Delete page?',
		message: '“About us” and its history will be removed. This can’t be undone.',
		confirmText: 'Delete',
		danger: true,
	})
	if (ok) toast.success('Page deleted')
	else toast.info('Kept it')
}
</script>

<template>
	<Variant label="Modal: basic / form / persistent / size lg">
		<Button @click="basic = true">Open modal</Button>
		<Button variant="outline" @click="form = true">Edit page</Button>
		<Button variant="outline" @click="persistent = true">Persistent</Button>
		<Button variant="ghost" @click="large = true">Large</Button>
	</Variant>
	<Variant label="useConfirm() → ConfirmDialog">
		<Button bg="danger" @click="remove">Delete page</Button>
		<Button variant="outline" @click="confirm('Publish now?').then((ok) => toast(ok ? 'Published' : 'Cancelled'))">
			Simple confirm
		</Button>
	</Variant>

	<Modal v-model:open="basic" title="Hello">
		Esc, the backdrop and ✕ close this. Tab stays inside, focus returns to the button afterwards.
		<template #footer>
			<Button @click="basic = false">Got it</Button>
		</template>
	</Modal>

	<Modal v-model:open="form" title="About us">
		<form id="page-form" class="flex flex-col gap-16" @submit.prevent="form = false">
			<FormField label="Slug">
				<Input model-value="about-us" autofocus><template #prefix>/</template></Input>
			</FormField>
			<Switch v-model="published" label="Published" :description="published ? 'Live at /about-us' : 'Draft'" />
		</form>
		<template #footer>
			<Button variant="ghost" @click="form = false">Cancel</Button>
			<Button type="submit" form="page-form">Save</Button>
		</template>
	</Modal>

	<Modal v-model:open="persistent" title="Saving…" persistent>
		Esc and backdrop are ignored while <code>persistent</code>.
		<template #footer>
			<Button @click="persistent = false">Done</Button>
		</template>
	</Modal>

	<Modal v-model:open="large" title="Large modal" size="lg">
		<p v-for="n in 30" :key="n" class="m-0 mb-8">Line {{ n }}: long content scrolls inside the dialog body.</p>
	</Modal>
</template>
