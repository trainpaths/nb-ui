<script setup lang="ts">
import { Link } from '../../index'
import Variant from '../Variant.vue'
</script>

<template>
	<Variant label="href / to (router-link) / underline / text">
		<Link href="#Link">href link</Link>
		<Link to="/somewhere">router link</Link>
		<Link href="#Link" underline>underlined</Link>
		<Link href="#Link" text="danger">danger</Link>
	</Variant>
</template>
