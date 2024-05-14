<template>
	<v-details_item
		:title="title">
		<v-attribute_color
			:target="target"
			:value="target[keyName]"
			:keyName="keyName"
			:readonly="readonly"/>
	</v-details_item>
</template>

<script>
	import DetailsItem from './details_item.vue';
	import AttributeColor from './attribute_color.vue';

	export default {
		components: {
			'v-details_item': DetailsItem,
			'v-attribute_color': AttributeColor,
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
