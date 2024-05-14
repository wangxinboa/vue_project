<template>
	<v-details_item
		:title="title">
		<v-attribute_bool
			:target="target"
			:value="target[keyName]"
			:keyName="keyName"
			:readonly="readonly"/>
	</v-details_item>
</template>

<script>
	import DetailsItem from './details_item.vue';
	import AttributeBool from './attribute_bool.vue';

	export default {
		components: {
			'v-details_item': DetailsItem,
			'v-attribute_bool': AttributeBool,
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
