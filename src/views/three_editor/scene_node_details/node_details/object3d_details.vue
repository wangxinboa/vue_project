<template>
	<div class="object3d_details">
		<v-details_panel
			title="objectMessage"
			:defaultShow="true"
			>
			<v-details_item_number
				title="id"
				:target="object3d"
				keyName="id"
				:readonly="true"/>
			<v-details_item_text
				title="uuid"
				:target="object3d"
				keyName="uuid"
				:readonly="true"/>
			<v-details_item_vector3
				:vector3="object3d.up"
				title="up"/>
			<v-details_item_number
				title="layersMask"
				:target="object3d.layers"
				keyName="mask"
				/>
			<v-details_item_bool
				title="castShadow"
				:target="object3d"
				keyName="castShadow"/>
			<v-details_item_bool
				title="receiveShadow"
				:target="object3d"
				keyName="receiveShadow"/>
			<v-details_item_bool
				title="frustumCulled"
				:target="object3d"
				keyName="frustumCulled"/>
			<v-details_item_number
				title="renderOrder"
				:target="object3d"
				keyName="renderOrder"
				/>
		</v-details_panel>

		<v-details_panel
			title="modelView"
			:defaultShow="true"
			>
			<v-details_item_vector3
				:vector3="object3d.position"
				title="position"/>

			<v-details_item_vector3
				:vector3="object3d.rotation"
				:title="'rotation('+object3d.rotation._order+')'"/>

			<v-details_item_vector3
				:vector3="object3d.scale"
				title="scale"/>
		</v-details_panel>
	</div>
</template>

<script>
	import DetailsPanel from '../details_attribute/details_panel.vue';
	import DetailsItemBool from '../details_attribute/details_item_bool.vue';
	import DetailsItemNumber from '../details_attribute/details_item_number.vue';
	import DetailsItemText from '../details_attribute/details_item_text.vue';
	import DetailsItemVector3 from '../details_attribute/details_item_vector3.vue';

	export default {
		components: {
			'v-details_panel': DetailsPanel,
			'v-details_item_bool': DetailsItemBool,
			'v-details_item_number': DetailsItemNumber,
			'v-details_item_text': DetailsItemText,
			'v-details_item_vector3': DetailsItemVector3,
		},
		props: {
			object3d: {
				type: Object,
				default: null,
			}
		}
	}
</script>


<style lang="less">
	.object3d_details{
		width: 100%;
	}
</style>