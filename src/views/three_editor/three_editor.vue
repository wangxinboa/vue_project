<template>
	<div id="threeEditor">
		<div class="editor_header">
			<div class="editor_header_left">
				<div class="logo">three editor</div>
			</div>
		</div>
		<div class="editor_content">
			<div class="editor_tool_bar">
				<div class="iconfont icon-camera editor_button camera"
					v-on:mousedown="showCameraDetails"></div>

			</div>
			<div class="scene_node">
				<v-scene_nodes />
			</div>
			<div class="scene_content">
				<v-scene_iframe />
				<!-- <v-scene_model /> -->
				<!-- <v-scene_assets /> -->
			</div>
			<div class="scene_node_details">
				<v-scene_node_details
				:node="threeEditorController.selectedNodeShowDetails"/>
			</div>
		</div>
	</div>
</template>

<script>
	import WindowKeyEvent, { WindowKey } from '@utils/window_key_event.js';
	import ThreeEditorController from './controller/three_editor_controller.js';

	import SceneNodes from './scene_nodes.vue';
	import SceneIframe from './scene_iframe.vue';
	import SceneModel from './scene_model.vue';
	import SceneAssets from './scene_assets.vue';
	import SceneNodeDetails from './scene_node_details/scene_node_details.vue';

	export default {
		provide(){
			return {
				// threeEditorController: new ThreeEditorController(),
				threeEditorController: this.threeEditorController,
			}
		},
		data(){
			return {
				threeEditorController: new ThreeEditorController(),
				windowKeyEventOperations: WindowKeyEvent.addOperations('threeEditor'),
			}
		},
		components: {
			'v-scene_nodes': SceneNodes,
			'v-scene_assets': SceneAssets,
			'v-scene_iframe': SceneIframe,
			'v-scene_model': SceneModel,
			'v-scene_node_details': SceneNodeDetails,

		},
		mounted(){

			this.windowKeyEventOperations.addOperation( WindowKey.Space, ()=>{
				// console.log('Space');
				this.threeEditorController.stopRender = !this.threeEditorController.stopRender;
			} );
		},
		beforeDestroy(){
			console.log('beforeDestroy')
		},
		methods: {
			showCameraDetails(){

				this.threeEditorController.selectedNodeShowDetails = this.threeEditorController.camera;
			}
		},
	}
</script>

<style lang="less">
	#threeEditor{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		>.editor_header{
			display: flex;
			justify-content: space-between;
			padding: 0 0.1rem;
			width: 100%;
			height: 0.5rem;
			line-height: 0.5rem;
			background-color: #1e1e1e;
			color: #ffffff;
			>.editor_header_left{
				display: flex;
				>.logo{
					// padding: 0.1rem;
					// width: 0.5rem;
					// height: 0.5rem;
				}
			}
		}
		>.editor_content{
			display: flex;
			width: 100%;
			height: 0;
			flex: 1;
			>.editor_tool_bar{
				display: flex;
				flex-direction: column;
				width: 0.4rem;
				height: 100%;
				background-color: #494949;
				color: #ffffff;
				>.editor_button{
			    width: 0.4rem;
			    height: 0.4rem;
			    transition: background-color .3s;
			    &:hover{
						background-color: #313131;
			    }
				}
			}
			>.scene_node{
				display: flex;
				flex-direction: column;
				width: 3rem;
				height: 100%;
				background-color: #444444;
			}
			>.scene_content{
				display: flex;
				flex-direction: column;
				flex: 1;
				width: 0;
				height: 100%;
			}
			>.scene_node_details{
				width: 3.2rem;
				height: 100%;
				background-color: #444444;
			}
		}
	}
</style>