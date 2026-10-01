<script setup lang="ts">
import { Button, Toast, useToast } from '../../index'
import Variant from '../Variant.vue'

const { toast, dismissAll } = useToast()
const types = ['info', 'success', 'warning', 'error'] as const
</script>

<template>
	<Variant label="Toast (static)">
		<Toast v-for="t in types" :key="t" :type="t" :message="`${t} toast`" />
	</Variant>
	<Variant label="toast.<type>() → ToastContainer (slides in from / out to the right, hover pauses)">
		<Button v-for="t in types" :key="t" size="sm" @click="toast[t](`A ${t} toast`)">
			{{ t }}
		</Button>
		<Button size="sm" variant="outline" @click="toast({ message: 'Sticky until closed', duration: 0 })">
			duration 0
		</Button>
		<Button size="sm" variant="outline" @click="toast('A much longer message that wraps onto a second line so the toast grows in height.')">
			long
		</Button>
		<Button size="sm" variant="ghost" @click="dismissAll">dismiss all</Button>
	</Variant>
</template>
