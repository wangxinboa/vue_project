<template>
	<div class="box3_details">
		<v-details_item_vector3
			:vector3="box3.min"
			:title="title + '.min'"
			:readonly="readonly"/>
		<v-details_item_vector3
			:vector3="box3.max"
			:title="title + '.max'"
			:readonly="readonly"/>
	</div>
</template>

<script>
	import DetailsItemVector from '../details_attribute/details_item_vector3.vue';


	export default {
		components: {
			'v-details_item_vector3': DetailsItemVector,
		},
		props: {
			box3: {
				type: Object,
				default: null,
			},
			title: {
				type: String,
				default: '属性键名'
			},
			readonly: {
				type: Boolean,
				default: false,
			}
		}

	}
</script>

<style lang="less">
	.box3_details{
		padding: 0.02rem 0 0 0;
		width: 100%;
	}
</style>