<script setup lang="ts">
import { useToast } from './useToast'
import Toast from './Toast.vue'

const { toasts, dismiss } = useToast()
</script>

<template>
	<Teleport to="body">
		<div class="fixed top-16 right-16 z-50 flex flex-col gap-8">
			<TransitionGroup name="toast">
				<Toast
					v-for="toast in toasts"
					:key="toast.id"
					:message="toast.message"
					:type="toast.type"
					@dismiss="dismiss(toast.id)"
				/>
			</TransitionGroup>
		</div>
	</Teleport>
</template>
