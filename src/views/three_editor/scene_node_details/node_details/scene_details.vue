<template>
	<div class="scene_details">

	</div>
</template>

<script>
	import DetailsItemVector3 from '../details_attribute/details_item_vector3.vue';

	export default {
		components: {
			'v-details_item_vector3': DetailsItemVector3,
		},
		props: {
			scene: {
				type: Object,
				default: null,
			}
		}
	}
</script>


<style lang="less">
	.scene_details{
		width: 100%;
	}
</style>