import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import Button from '../src/Button.vue'
import Checkbox from '../src/Checkbox.vue'
import Dropdown from '../src/Dropdown.vue'
import FormField from '../src/FormField.vue'
import Icon from '../src/Icon.vue'
import Input from '../src/Input.vue'
import Modal from '../src/Modal.vue'
import Popover from '../src/Popover.vue'
import TagInput from '../src/TagInput.vue'
import Tabs from '../src/Tabs.vue'
import Tooltip from '../src/Tooltip.vue'

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

	it('renders a router-link for `to`; disabled takes it out of the Tab order', () => {
		const RouterLink = defineComponent({
			props: { to: String },
			setup: (props, { slots }) => () => h('a', { href: props.to }, slots.default?.()),
		})
		const w = mount(Button, {
			props: { to: '/settings', disabled: true },
			global: { components: { RouterLink } },
		})
		expect(w.element.tagName).toBe('A')
		expect(w.attributes('href')).toBe('/settings')
		expect(w.attributes('type')).toBeUndefined()
		expect(w.attributes('aria-disabled')).toBe('true')
		expect(w.attributes('tabindex')).toBe('-1')
		expect(w.classes()).toContain('bg-accent')
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

	it('emits an empty string, not 0, when a number input is cleared', async () => {
		const w = mount(Input, { props: { type: 'number', modelValue: 5 } })
		await w.find('input').setValue('')
		await w.find('input').setValue('7')
		expect(w.emitted('update:modelValue')).toEqual([[''], [7]])
	})
})

describe('TagInput', () => {
	it('takes label, error and invalid state from FormField', () => {
		const w = mount(FormField, {
			props: { label: 'Topics', error: 'Required' },
			slots: { default: () => h(TagInput, { modelValue: [] }) },
		})
		const input = w.find('input')
		expect(w.find('label').attributes('for')).toBe(input.attributes('id'))
		expect(input.attributes('aria-label')).toBeUndefined()
		expect(input.attributes('aria-invalid')).toBe('true')
		expect(w.find(`#${input.attributes('aria-describedby')}`).text()).toBe('Required')
	})

	it('keeps an aria-label standalone and takes testId', () => {
		const w = mount(TagInput, { props: { modelValue: [], testId: 'topics' } })
		expect(w.find('input').attributes('aria-label')).toBe('Tags')
		expect(w.attributes('data-testid')).toBe('topics')
	})
})

describe('Tooltip', () => {
	it('adds its id to the child\'s aria-describedby and removes it on unmount', () => {
		const w = mount(Tooltip, {
			props: { text: 'Hint' },
			slots: { default: () => h('button', { 'aria-describedby': 'field-msg' }) },
		})
		const tip = w.find('[role="tooltip"]').attributes('id')
		expect(w.find('button').attributes('aria-describedby')).toBe(`field-msg ${tip}`)
		const button = w.find('button').element
		w.unmount()
		expect(button.getAttribute('aria-describedby')).toBe('field-msg')
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

describe('Popover', () => {
	const mountPopover = () =>
		mount(Popover, {
			attachTo: document.body,
			slots: {
				trigger: ({ props }: { props: Record<string, unknown> }) => h('button', { ...props, id: 'trigger' }, 'Open'),
				default: () => h('input', { autofocus: true }),
			},
		})

	it('opens on trigger click, focuses [autofocus], Esc closes and refocuses the trigger', async () => {
		const w = mountPopover()
		await w.find('#trigger').trigger('click')
		await nextTick()
		const panel = w.find('[role="dialog"]')
		expect(w.find('#trigger').attributes('aria-expanded')).toBe('true')
		expect(w.find('#trigger').attributes('aria-controls')).toBe(panel.attributes('id'))
		expect(document.activeElement).toBe(w.find('input').element)
		await w.find('input').trigger('keydown', { key: 'Escape' })
		expect(w.find('[role="dialog"]').exists()).toBe(false)
		expect(document.activeElement).toBe(w.find('#trigger').element)
		w.unmount()
	})

	it('closes on an outside pointerdown', async () => {
		const w = mountPopover()
		await w.find('#trigger').trigger('click')
		document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }))
		await nextTick()
		expect(w.find('[role="dialog"]').exists()).toBe(false)
		w.unmount()
	})
})

describe('Dropdown', () => {
	it('focuses the first item on open, arrows move, select closes and emits', async () => {
		const items = [{ label: 'Edit' }, { label: 'Off', disabled: true }, { label: 'Delete' }]
		const w = mount(Dropdown, { props: { items }, attachTo: document.body })
		await w.find('[aria-haspopup="menu"]').trigger('click')
		await nextTick()
		const buttons = w.findAll('[role="menuitem"]')
		expect(document.activeElement).toBe(buttons[0]!.element)
		await w.find('[role="menu"]').trigger('keydown', { key: 'ArrowDown' })
		expect(document.activeElement).toBe(buttons[2]!.element)
		await buttons[2]!.trigger('click')
		expect(w.emitted('select')).toEqual([[items[2]]])
		expect(w.find('[role="menu"]').exists()).toBe(false)
		w.unmount()
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

	// overflow-x-auto makes overflow-y auto too: a -mb-px tab would poke out and add a scrollbar
	it('tabs have no negative bottom margin', () => {
		const w = mount(Tabs, { props: { tabs: [{ key: 'a', label: 'A' }], modelValue: 'a' } })
		expect(w.find('[role=tab]').classes()).not.toContain('-mb-px')
	})
})

describe('Icon', () => {
	it('keeps the svg stroke width unless a path sets its own', () => {
		const paths = mount(Icon, { props: { name: 'list-tree' } }).findAll('path')
		expect(paths[0].attributes('stroke-width')).toBeUndefined()
		expect(paths.some((p) => p.attributes('stroke-width') === '1.25')).toBe(true)
	})

	it('rotates only when asked', () => {
		expect(mount(Icon, { props: { name: 'arrow' } }).attributes('style')).toBeUndefined()
		expect(mount(Icon, { props: { name: 'arrow', rotate: 180 } }).attributes('style')).toContain('rotate: 180deg')
	})
})
