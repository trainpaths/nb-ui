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
	<Variant label="useToast() → ToastContainer (top right)">
		<Button v-for="t in types" :key="t" size="sm" @click="toast({ message: `A ${t} toast`, type: t })">
			{{ t }}
		</Button>
		<Button size="sm" variant="outline" text="primary" @click="toast({ message: 'Sticky until closed', duration: 0 })">
			duration 0
		</Button>
		<Button size="sm" variant="ghost" text="primary" @click="dismissAll">dismiss all</Button>
	</Variant>
</template>
