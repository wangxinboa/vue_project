<template>
	<div class="details_item_sphere" v-if="sphere">

		<v-details_item_vector3
			:vector3="sphere.center"
			:title="title + '.center'"
			:readonly="readonly"/>

		<v-details_item
			:title="title + '.radius'">

			<div class="details_item_sphere_attribute">
				<v-attribute_number
					:target="sphere"
					:value="sphere.radius"
					keyName="radius"
					:readonly="readonly"/>
			</div>
		</v-details_item>
	</div>
	<div v-else>
		null
	</div>
</template>

<script>
	import DetailsItem from './details_item.vue';
	import DetailsItemVector3 from '../details_attribute/details_item_vector3.vue';
	import AttributeNumber from './attribute_number.vue';

	export default {
		components: {
			'v-details_item': DetailsItem,
			'v-details_item_vector3': DetailsItemVector3,
			'v-attribute_number': AttributeNumber,
		},
		props: {
			sphere: {
				type: Object,
				default: null
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
	.details_item_sphere{
		padding: 0.02rem 0 0 0;
		width: 100%;
		.details_item_sphere_attribute{
			width: 100%;
		}
		.details_item_sphere_attribute:not(:first-of-type){
			margin: 0.04rem 0 0 0;
		}
	}
</style>