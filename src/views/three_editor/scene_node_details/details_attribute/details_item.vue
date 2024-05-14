<template>
	<div class="details_attribute_item">
		<div class="details_attribute_item_key prevent_text_overflow"
			:title="title"
			v-on:mousedown="copyTitleText">
			{{title}}:
		</div>
		<div class="details_attribute_item_value">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import copyText from '@utils/copy_text.js';

	export default {
		props: {
			title: {
				type: String,
				default: '属性键名',
			},
		},
		methods: {
			copyTitleText(){

				copyText( this.title );
			}
		}
	}
</script>

<style lang="less">
	.details_attribute_item{
		display: flex;
		margin: 0.04rem 0 0 0;
		width: 100%;
		height: fit-content;
		>.details_attribute_item_key{
			width: 1rem;
			font-size: 0.12rem;
			line-height: 0.24rem;
			color: #cccccc;
			cursor: pointer;
		}
		>.details_attribute_item_value{
			width: 0;
			flex: 1;
		}
	}
</style>