<script setup lang="ts">
import { Link } from '../../index'
import Variant from '../Variant.vue'
</script>

<template>
	<Variant label="href / to (router-link) / underline / external / text">
		<Link href="#Link">href link</Link>
		<Link to="/somewhere">router link</Link>
		<Link href="#Link" underline>underlined</Link>
		<Link href="https://example.com" external>external ↗</Link>
		<Link href="#Link" text="primary">primary</Link>
		<Link href="#Link" text="danger">danger</Link>
	</Variant>
	<Variant label="inline in text">
		<p class="m-0 max-w-480 text-sm">
			Read the <Link href="#Link">getting started guide</Link> before you <Link href="#Link" underline>publish</Link> a page.
		</p>
	</Variant>
</template>
