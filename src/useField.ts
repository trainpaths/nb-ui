import { computed, inject, type ComputedRef, type Ref } from 'vue'

/** What `FormField` provides to the control inside it. */
export interface FieldContext {
	id: Ref<string>
	invalid: Ref<boolean>
	describedBy: Ref<string | undefined>
}

export const FIELD_KEY = Symbol('nb-ui-field')

/**
 * Wires a form control to a surrounding `FormField`: label `for`, `aria-invalid`, `aria-describedby` (hint/error).
 * Own props win over the field's, so controls also work standalone.
 */
export function useField(props: { id?: string; invalid?: boolean }): {
	id: ComputedRef<string | undefined>
	invalid: ComputedRef<boolean>
	describedBy: ComputedRef<string | undefined>
} {
	const field = inject<FieldContext | null>(FIELD_KEY, null)
	return {
		id: computed(() => props.id ?? field?.id.value),
		invalid: computed(() => !!props.invalid || !!field?.invalid.value),
		describedBy: computed(() => field?.describedBy.value),
	}
}
