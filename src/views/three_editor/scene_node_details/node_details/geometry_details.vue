<template>
	<v-details_panel
		:title="'geometry-'+geometry.type"
		:defaultShow="true"
		>
		<div class="geometry_details">
			<template v-if="Object.keys(geometry.attributes).length > 0">
				<div class="title">attributes</div>
				<v-attributes_message
					:attributes="geometry.attributes"/>
			</template>

			<template v-if="Object.keys(geometry.morphAttributes).length > 0">
				<div class="title">morphAttributes</div>
				<v-attributes_message
					:attributes="geometry.morphAttributes"/>
			</template>

			<template v-if="geometry.index">
				<div class="title">index</div>
				<v-attribute_message
					:attr="geometry.index"
					:attrName="'index'"/>
			</template>

			<div class="title">drawRange</div>
			<div class="draw_range ">
				<div class="item">
					<div class="key">start: </div>
					<div class="value">{{geometry.drawRange.start}}</div>
				</div>
				<div class="item">
					<div class="key">count: </div>
					<div class="value">{{geometry.drawRange.count}}</div>
				</div>
			</div>

			<div class="title">boundingBox</div>
			<v-details_item_box3 v-if="geometry.boundingBox" title="box" :box3="geometry.boundingBox" :readonly="true"/>

			<div class="title">boundingSphere</div>
			<v-details_item_sphere v-if="geometry.boundingSphere" title="sphere" :sphere="geometry.boundingSphere" :readonly="true"/>
		</div>
	</v-details_panel>
</template>


<script>
	import DetailsPanel from '../details_attribute/details_panel.vue';
	import DetailsItemBox3 from '../details_attribute/details_item_box3.vue';
	import DetailsItemSphere from '../details_attribute/details_item_sphere.vue';
	import AttributesMessage from './attributes_message.vue';
	import AttributeMessage from './attribute_message.vue';

	export default {
		components: {
			'v-details_panel': DetailsPanel,
			'v-details_item_box3': DetailsItemBox3,
			'v-details_item_sphere': DetailsItemSphere,
			'v-attributes_message': AttributesMessage,
			'v-attribute_message': AttributeMessage
		},
		props: {
			geometry: {
				type: Object,
				default: null,
			}
		}

	}
</script>

<style lang="less">
	.geometry_details{
		width: 100%;
		>.title{
			padding: 0.04rem 0 0.04rem 0;
			font-size: 0.14rem;
			color: #ffffff;
	    border-bottom: 0.01rem solid #000000;
		}
		>.draw_range{
			display: flex;
			padding: 0.04rem 0 0 0;
			width: 100%;
			>.item{
				display: flex;
				width: 50%;
				font-size: 0.12rem;
				color: #cccccc;
				>.key{
					width: 0.4rem;
				}
				>.value{
					padding: 0 0 0 0.1rem;
					width: 0;
					flex: 1;
				}
			}
		}
	}
</style>