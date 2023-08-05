<template>
	<div class="example-side">
		<side>
			ddd
		</side>
		<div class="c">
			c
		</div>
	</div>
</template>

<script>
	import side from './side_panel.vue'
	export default {
		components: {
			side
		}
	}
</script>

<style lang="less">
	.example-side{
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100%;
		>.c{
			flex: 1;
			background-color: yellow;
		}
	}
</style>