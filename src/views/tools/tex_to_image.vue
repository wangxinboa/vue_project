<template>
	<div id="tex_to_image">
		<v-header
			class="header"
			icon="fsux_tubiao_gongshi_jisuan"
			title="数学公式 mathjax"
			v-on:iconMouswDown="$router.push(paths.index)" />
			
	</div>
</template>

<script>

	export default {

	}
</script>

<style lang="less">
	#tex_to_image{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>