<template>
	<div class="details_attribute_panel">
		<div class="details_attribute_panel_header"
			v-on:mousedown="setPanelShow">
			<div :class="{
					expand: true,
					expanded: isShow,
				}"
				v-on:mousedown=""> › </div>
			<div class="title">{{title}}</div>
		</div>
		<div class="details_attribute_panel_body"
			v-show="isShow">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '面板标题',
			},
			defaultShow: {
				type: Boolean,
				default: true,
			}
		},
		data(){
			return {
				isShow: this.defaultShow,
			}
		},
		methods: {
			setPanelShow(){
				this.isShow = !this.isShow;
			}
		}
	}
</script>

<style lang="less">
	.details_attribute_panel{
		width: 100%;

		>.details_attribute_panel_header{

			padding: 0 0 0 0.1rem;
			display: flex;
			width: 100%;
			height: 0.3rem;
			line-height: 0.3rem;
			color: #ffffff;
			font-size: 0.14rem;
			background-color: #333333;
			>.expand{
				cursor: pointer;
				transition: color .3s ease-in-out;
			}
			>.expand.expanded{
				transform: rotate(90deg);
			}
			>.title{
				padding: 0 0 0 0.1rem;
				font-weight: bolder;
			}
			&:hover{
				>.expand{
					color: #000000;
				}
			}
		}

		>.details_attribute_panel_body{
			padding: 0.02rem 0.1rem 0.06rem 0.1rem;
			width: 100%;
		}
	}
</style>