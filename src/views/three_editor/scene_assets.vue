<template>
	<div class="scene_assets">
		<div class="scene_assets_header">assets</div>
		<div class="scene_assets_content"
			style="height: 200px;"
			ref="assetsContent">

		</div>
	</div>
</template>

<script>
	export default {

	}
</script>


<style lang="less">
	.scene_assets{
		width: 100%;
		>.scene_assets_header{
			padding: 0 0.08rem 0 0.08rem;
			width: 100%;
			height: 0.26rem;
			background-color: #272727;
			font-size: 0.16rem;
			font-weight: bolder;
			color: #ffffff;
		}
		>.scene_assets_content{
			background-color: #555555;
		}
	}
</style>