<template>
	<div class="component-header">
		<div
			v-if="icon"
			:class="'iconfont icon-' + icon"
			:style="{
				cursor: $listeners['iconMouswDown'] ? 'pointer': null
			}"
			v-on:mousedown="$emit('iconMouswDown')"></div>
		<div class="title">{{title}}</div>
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
				default: '请输入标题'
			}
		}
	}
</script>

<style lang="less">
	.component-header{
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
</style>