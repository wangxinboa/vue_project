<template>
	<v-details_item
		:title="title">

		<div class="details_item_vector4">
			<div class="details_item_vector4_attribute">
				<v-attribute_number
					:target="vector4"
					:value="vector4.x"
					keyName="x"
					:readonly="readonly"/>
				<div class="attr">x</div>
			</div>

			<div class="details_item_vector4_attribute">

				<v-attribute_number
					:target="vector4"
					:value="vector4.y"
					keyName="y"
					:readonly="readonly"/>
				<div class="attr">y</div>
			</div>

			<div class="details_item_vector4_attribute">

				<v-attribute_number
					:target="vector4"
					:value="vector4.z"
					keyName="z"
					:readonly="readonly"/>
				<div class="attr">z</div>
			</div>

			<div class="details_item_vector4_attribute">

				<v-attribute_number
					:target="vector4"
					:value="vector4.w"
					keyName="w"
					:readonly="readonly"/>
				<div class="attr">w</div>
			</div>
		</div>
	</v-details_item>
</template>

<script>
	import DetailsItem from './details_item.vue';
	import AttributeNumber from './attribute_number.vue';

	export default {
		components: {
			'v-details_item': DetailsItem,
			'v-attribute_number': AttributeNumber,
		},
		props: {
			vector4: {
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
	.details_item_vector4{
		width: 100%;
		>.details_item_vector4_attribute{
			position: relative;
			width: 100%;
			>.attr{
				position: absolute;
				top: 0;
				right: 0.06rem;
				line-height: 0.22rem;
				color: #829193;
				pointer-events: none;
				font-size: 0.12rem;
				transition: opacity 0.3s;
			}
			&:hover{
				>.attr{
					opacity: 0;
				}
			}
		}
		>.details_item_vector4_attribute:not(:first-of-type){
			margin: 0.04rem 0 0 0;
		}
	}
</style>