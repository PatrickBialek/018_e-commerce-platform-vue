<template>
	<div id="app">
		<Nav />
		<router-view />
	</div>
</template>

<script>
import Nav from "@/components/nav/Nav.vue";

export default {
	data() {
		return {};
	},
	components: {
		Nav
	}
};
</script>

<style lang="scss">
@import "@/assets/styles/_main.scss";
</style>
