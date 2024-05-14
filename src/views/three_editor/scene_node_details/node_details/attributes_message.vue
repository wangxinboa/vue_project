<template>
	<div class="attributes_message">
		<div class="attribute">
			<div class="title attr_name">name</div>
			<div class="title item_size">size</div>
			<div class="title type">type</div>
		</div>
		<v-attribute_message v-for="(attr, attrName) in attributes" :key="attrName" :attr="attr" :attrName="attrName"/>
	</div>
</template>

<script>
	import AttributeMessage from './attribute_message.vue';

	export default {
		components: {
			'v-attribute_message': AttributeMessage
		},
		props: {
			attributes: {
				type: Object,
			}
		}
	}
</script>

<style lang="less">
	.attributes_message{
		padding: 0.04rem 0 0 0;
		width: 100%;
		>.attribute{
			display: flex;
			font-size: 0.12rem;
			>.title{
				padding: 0 0 0.04rem 0;
				color: #eeeeee;
			}
			>.attr_name{
				width: 0.6rem;
			}
			>.item_size{
				width: 0.4rem;
			}
			>.type{
				width: 0;
				flex: 1;
			}
		}
	}
</style>