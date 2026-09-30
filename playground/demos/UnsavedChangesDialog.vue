<script setup lang="ts">
import { ref } from 'vue'
import { Button, UnsavedChangesDialog, useToast, useUnsavedChanges } from '../../index'
import Variant from '../Variant.vue'

const dirty = ref(true)
const canSave = ref(true)
const { toast } = useToast()
const { prompting, answer, confirmLeave } = useUnsavedChanges(dirty, async () => {
	await new Promise((r) => setTimeout(r, 600))
	return true
})

async function leave() {
	toast(`confirmLeave() → ${await confirmLeave()}`)
}
</script>

<template>
	<Variant label="useUnsavedChanges(dirty, save).confirmLeave()">
		<Button @click="leave">Leave page</Button>
		<label class="flex items-center gap-4 text-sm"><input v-model="dirty" type="checkbox" /> dirty</label>
		<label class="flex items-center gap-4 text-sm"><input v-model="canSave" type="checkbox" /> canSave</label>
	</Variant>
	<UnsavedChangesDialog
		v-if="prompting"
		:can-save="canSave"
		@save="answer('save')"
		@discard="answer('discard')"
		@cancel="answer('cancel')"
	/>
</template>
