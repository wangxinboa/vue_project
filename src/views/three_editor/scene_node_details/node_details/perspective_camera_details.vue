<template>
	<div class="perspective_camera_details">
		<v-details_item_vector3
			:vector3="camera.position"
			title="position"/>

		<v-details_item_vector3
			:vector3="camera.rotation"
			:title="'rotation('+camera.rotation._order+')'"/>

		<v-details_item_vector3
			:vector3="camera.scale"
			title="scale"/>
	</div>
</template>

<script>
	import DetailsItemVector3 from '../details_attribute/details_item_vector3.vue';

	export default {
		components: {
			'v-details_item_vector3': DetailsItemVector3,
		},
		props: {
			camera: {
				type: Object,
				default: null,
			}
		}
	}
</script>


<style lang="less">
	.perspective_camera_details{
		width: 100%;
	}
</style>