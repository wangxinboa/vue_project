<template>
	<v-details_item
		:title="title">
		<v-attribute_text
			:target="target"
			:value="target[keyName]"
			:keyName="keyName"
			:readonly="readonly"/>
	</v-details_item>
</template>

<script>
	import DetailsItem from './details_item.vue';
	import AttributeText from './attribute_text.vue';

	export default {
		components: {
			'v-details_item': DetailsItem,
			'v-attribute_text': AttributeText,
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
			readonly: {
				type: Boolean,
				default: false,
			},
		}
	}
</script>

<style lang="less">
	.details_item_text{
		width: 100%;

	}
</style>