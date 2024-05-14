<template>
	<div class="shader_material_details">
		<v-details_panel
			title="uniforms"
			:defaultShow="true"
			>
			<div class="uniforms" v-for="(uniform, key) in material.uniforms">
				<v-details_item v-if="uniform?.value === null || uniform?.value === void 0"
					:title="key">
					<div class="warning" >数据为 {{uniform?.value + ''}}</div>
				</v-details_item>
				<v-details_item_number
					v-else-if="typeof uniform?.value === 'number'"
					:title="key"
					:target="uniform"
					keyName="value"/>
				<v-details_item_vector3
					v-else-if="uniform?.value.isVector3"
					:title="key"
					:vector3="uniform.value"/>
				<v-details_item_vector4
					v-else-if="uniform?.value.isVector4"
					:title="key"
					:vector4="uniform.value"/>
				<v-details_item_color
					v-else-if="uniform?.value.isColor"
					:title="key"
					:target="uniform"
					keyName="value"/>

				<v-details_item v-else
					:title="key">
					<div class="warning"
						v-on:mousedown="consoleUniform(uniform)">不知道的数据类型 {{ uniform?.value?.type }}</div>
				</v-details_item>
			</div>
		</v-details_panel>
	</div>
</template>

<script>
	import DetailsPanel from '../../details_attribute/details_panel.vue';
	import DetailsItem from '../../details_attribute/details_item.vue';
	import DetailsItemNumber from '../../details_attribute/details_item_number.vue';
	import DetailsItemVector3 from '../../details_attribute/details_item_vector3.vue';
	import DetailsItemVector4 from '../../details_attribute/details_item_vector4.vue';
	import DetailsItemColor from '../../details_attribute/details_item_color.vue';

	export default {
		components: {
			'v-details_panel': DetailsPanel,
			'v-details_item': DetailsItem,
			'v-details_item_number': DetailsItemNumber,
			'v-details_item_vector3': DetailsItemVector3,
			'v-details_item_vector4': DetailsItemVector4,
			'v-details_item_color': DetailsItemColor,
		},
		props: {
			material: {
				type: Object,
				default: null
			}
		},
		methods: {
			consoleUniform( uniform ){
				console.log( uniform.value );
			}
		}
	}
</script>

<style lang="less">
	.shader_material_details{
		width: 100%;
		.uniforms{
			display: flex;
			.warning{
				color: #fe8d59;
				font-size: 0.12rem;
				line-height: 0.24rem;
			}
		}
	}
</style>