<template>
	<div class="component-header">
		<div class="title">{{title}}</div>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '请输入标题'
			}
		}
	}
</script>

<style lang="less">
	.component-header{
		width: 100%;
		height: 0.5rem;
		background-color: #24292f;
	}
</style>