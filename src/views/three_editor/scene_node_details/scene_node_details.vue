<template>
	<div class="scene_node_details">
		<div class="scene_node_details_header prevent_text_overflow">
			{{ node ? node?.type + (node?.name ? ': ' + node?.name : '') : '未选择节点'}}
		</div>
		<div class="scene_node_details_content">
			<v-object3d_details
				v-if="node?.isObject3D"
				:object3d="node"/>

			<v-mesh_details
				v-if="node?.isMesh"
				:mesh="node"/>

			<v-materials_details
				v-if="node?.isMaterial"
				:material="node"/>

		</div>
	</div>
</template>

<script>
	import materialsDetails from './node_details/materials_details/materials_details.vue';
	import meshDetails from './node_details/mesh_details.vue';
	import Object3D from './node_details/object3d_details.vue';
	import PerspectiveCameraDetails from './node_details/perspective_camera_details.vue';
	import sceneDetails from './node_details/scene_details.vue';

	export default {
		components: {
			'v-materials_details': materialsDetails,
			'v-mesh_details': meshDetails,
			'v-object3d_details': Object3D,
			'v-perspective_camera_details': PerspectiveCameraDetails,
			'v-scene_details': sceneDetails,
		},
		props: {
			node: {
				type: Object,
				default: null,
			}
		},
		watch: {
			node(newVal, oldVal){
				console.log('newVal:', newVal);
				window.node = newVal;
			}
		}

	}
</script>

<style lang="less">
	.scene_node_details{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		>.scene_node_details_header{
			padding: 0 0 0 0.1rem;
			width: 100%;
			height: 0.3rem;
			line-height: 0.3rem;
			font-size: 0.18rem;
			font-weight: bolder;
			background-color: #202020;
			color: #ffffff;
		}
		>.scene_node_details_content{
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 0;
			flex: 1;
			overflow: auto;
		}
	}
</style>