import type { IconName } from './Icon.vue'

export type Status = 'success' | 'warning' | 'error' | 'info'

export const statusIcons: Record<Status, IconName> = {
	success: 'check-circle',
	warning: 'alert-triangle',
	error: 'alert-circle',
	info: 'info',
}
