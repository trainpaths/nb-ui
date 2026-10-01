import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import Button from '../src/Button.vue'
import Checkbox from '../src/Checkbox.vue'
import FormField from '../src/FormField.vue'
import Input from '../src/Input.vue'
import Modal from '../src/Modal.vue'
import Tabs from '../src/Tabs.vue'

describe('Button', () => {
	it('defaults to accent with readable dark text', () => {
		const cls = mount(Button).classes()
		expect(cls).toContain('bg-accent')
		expect(cls).toContain('text-black')
	})

	it('picks white text on dark fills and accent-dark for outline', () => {
		expect(mount(Button, { props: { bg: 'primary' } }).classes()).toContain('text-white')
		expect(mount(Button, { props: { variant: 'outline' } }).classes()).toContain('text-accent-dark')
	})

	it('is type=button unless overridden', () => {
		expect(mount(Button).attributes('type')).toBe('button')
		expect(mount(Button, { attrs: { type: 'submit' } }).attributes('type')).toBe('submit')
	})
})

describe('Checkbox', () => {
	it('adds / removes its value in an array model', async () => {
		const w = mount(Checkbox, { props: { modelValue: ['a'], value: 'b' } })
		await w.find('input').setValue(true)
		expect(w.emitted('update:modelValue')![0]).toEqual([['a', 'b']])
		await w.setProps({ modelValue: ['a', 'b'] })
		await w.find('input').setValue(false)
		expect(w.emitted('update:modelValue')![1]).toEqual([['a']])
	})
})

describe('FormField + Input', () => {
	it('wires id, aria-invalid and aria-describedby into the control', () => {
		const w = mount(FormField, {
			props: { label: 'Email', error: 'Required' },
			slots: { default: () => h(Input) },
		})
		const input = w.find('input')
		const id = input.attributes('id')!
		expect(w.find('label').attributes('for')).toBe(id)
		expect(input.attributes('aria-invalid')).toBe('true')
		expect(w.find(`#${input.attributes('aria-describedby')}`).text()).toBe('Required')
	})

	it('puts non-class attrs on the input even with a prefix', () => {
		const w = mount(Input, { attrs: { name: 'slug', class: 'w-full' }, slots: { prefix: () => '/' } })
		expect(w.find('input').attributes('name')).toBe('slug')
		expect(w.classes()).toContain('w-full')
	})
})

describe('Modal', () => {
	it('closes on Escape unless persistent, and restores focus', async () => {
		const opener = document.createElement('button')
		document.body.appendChild(opener)
		opener.focus()

		const open = ref(false)
		const persistent = ref(false)
		const Host = defineComponent(() => () =>
			h(Modal, {
				open: open.value,
				persistent: persistent.value,
				title: 'T',
				'onUpdate:open': (v: boolean) => (open.value = v),
			}),
		)
		mount(Host, { attachTo: document.body })
		open.value = true
		await nextTick()
		await nextTick()
		const panel = document.querySelector<HTMLElement>('[data-panel]')!
		expect(document.activeElement).toBe(panel)
		expect(document.body.style.overflow).toBe('hidden')

		persistent.value = true
		await nextTick()
		panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
		expect(open.value).toBe(true)

		persistent.value = false
		await nextTick()
		panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
		expect(open.value).toBe(false)
		await nextTick()
		expect(document.activeElement).toBe(opener)
		expect(document.body.style.overflow).toBe('')
	})
})

describe('Tabs', () => {
	it('arrow keys skip disabled tabs and wrap', async () => {
		const tabs = [
			{ key: 'a', label: 'A' },
			{ key: 'b', label: 'B', disabled: true },
			{ key: 'c', label: 'C' },
		]
		const w = mount(Tabs, { props: { tabs, modelValue: 'a' } })
		await w.find('[role=tablist]').trigger('keydown', { key: 'ArrowRight' })
		expect(w.emitted('update:modelValue')![0]).toEqual(['c'])
		await w.setProps({ modelValue: 'c' })
		await w.find('[role=tablist]').trigger('keydown', { key: 'ArrowRight' })
		expect(w.emitted('update:modelValue')![1]).toEqual(['a'])
	})
})
