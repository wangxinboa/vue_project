<template>
	<iframe class="scene_iframe"
		ref="sceneIframe"
		:src="threeEditorController.iframeSrc"
		v-on:mousedown="handleMouseDownIframe"
		v-on:load="handleSceneIframeLoad">
	</iframe>
</template>

<script>
	import Vue from 'vue';

	export default {
		inject: ['threeEditorController'],

		methods: {
			handleSceneIframeLoad( e ){

				const iframe = e.currentTarget.contentWindow

				this.threeEditorController.initIframe( e.currentTarget.contentWindow );

				this.threeEditorController.refreshScenes();

				e.currentTarget.contentWindow.onmousedown = this.handleMouseDownIframe;

				// 方便测试
				setTimeout(()=>{
					this.threeEditorController.stopRender = true;
				}, 8000);
			},

			handleMouseDownIframe( e ){

				this.threeEditorController.intersectScene(e);
			}
		},
	}
</script>

<style lang="less">
	.scene_iframe{
		width: 100%;
		height: 0;
		flex: 1;
	}
</style>