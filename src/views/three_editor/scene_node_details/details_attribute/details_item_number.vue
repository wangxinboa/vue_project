<template>
	<v-details_item
		:title="title">
		<v-attribute_number
			:target="target"
			:value="target[keyName]"
			:keyName="keyName"
			:max="max"
			:min="min"
			:step="step"
			:readonly="readonly"/>
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
			title: {
				type: String,
				default: '属性键名'
			},
			target: {
				type: Object,
				default: null,
			},
			keyName: {
				type: String,
				default: '',
			},
			max: {
				type: Number,
				default: Infinity
			},
			min: {
				type: Number,
				default: -Infinity
			},
			step: {
				type: Number,
				default: 0.01,
			},
			readonly: {
				type: Boolean,
				default: false,
			},
		}
	}
</script>

<style lang="less">
	.details_item_number{
		width: 100%;

	}
</style>