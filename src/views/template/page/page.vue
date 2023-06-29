<template>
	<div class="template-page">
		<div class="template-page-header">
			<div
				v-if="icon"
				:class="'iconfont icon-' + icon"
				:style="{
					cursor: isToIndex ? 'pointer': null
				}"
				v-on:mousedown="iconMouswDown"></div>
			<div class="title">{{title}}</div>
		</div>
		<div class="template-page-body">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			icon: {
				type: String,
				default: null
			},
			title: {
				type: String,
				default: '标题为空'
			},
			isToIndex: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			iconMouswDown(){
				if( this.isToIndex ){
					this.$router.push(this.paths.index);
				}
			}
		}
	}
</script>

<style lang="less">
	.template-page{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		min-height: 0.5rem;
		>.template-page-header{
			display: flex;
			padding-left: 0.1rem;
			width: 100%;
			height: 0.5rem;
			background-color: #24292f;
			>.iconfont{
				font-size: 0.16rem;
				color: #ffffff;
				line-height: 0.5rem;
			}
			>.title{
				padding-left: 0.08rem;
				color: #ffffff;
				line-height: 0.5rem;
				font-size: 0.14rem;
			}
		}
		>.template-page-body{
			width: 100%;
			height: 0;
			flex: 1;
			overflow: auto;
		}
	}
</style>