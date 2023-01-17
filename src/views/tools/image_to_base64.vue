<template>
	<div id="image_to_base64">
		<v-header
			class="header"
			icon="tupian"
			title="图片转换 base64"
			v-on:iconMouswDown="$router.push(paths.index)" />
			
	</div>
</template>

<script>
	export default {

	}
</script>

<style lang="less">
	#image_to_base64{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>